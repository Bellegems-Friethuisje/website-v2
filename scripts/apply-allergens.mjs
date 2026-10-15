import { readFileSync, writeFileSync } from 'fs'

const allergenes = JSON.parse(readFileSync('./data/allergenes.json', 'utf8'))
const menu = JSON.parse(readFileSync('./data/locations/bellegems.json', 'utf8'))

const nlToKey = {
  gluten:'gluten', tarwe:'gluten', gerst:'gluten', rogge:'gluten', haver:'gluten',
  spelt:'gluten', khorasantarwe:'gluten',
  schaaldieren:'crustaceans', ei:'eggs', vis:'fish', pinda:'peanuts', soja:'soy',
  melk:'milk', lactose:'milk',
  noten:'nuts', hazelnoten:'nuts', walnoten:'nuts', cashewnoten:'nuts',
  pistachenoten:'nuts', amandelen:'nuts', paranoten:'nuts', pecannoten:'nuts',
  macadamianoten:'nuts',
  selderij:'celery', mosterd:'mustard', sesam:'sesame', sulfiet:'sulphites',
  lupine:'lupin', weekdieren:'molluscs',
}

function parseAllergens(text) {
  if (!text || !text.trim()) return []
  const words = text.replace(/Bevat:\s*/, '').split(/[,.\s]+/).map(w => w.trim().toLowerCase()).filter(Boolean)
  return [...new Set(words.map(w => nlToKey[w]).filter(Boolean))].sort()
}

function normalize(s) {
  return s.trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[''`']/g, '')
    .replace(/[()\/\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Build lookup: normalized name → allergens
const lookup = new Map()
for (const item of allergenes) {
  const key = normalize(item.name)
  if (!lookup.has(key)) lookup.set(key, parseAllergens(item.allergens))
}

// Manual overrides for items where semantic matching is needed
const manualMap = {
  // SAFETY OVERRIDE (2026-10-15): supplier (Spuntini Deerlijk, article A00428
  // "merguez sate alro 30x110g") allergen declaration in QGuard only lists soy.
  // A reported gluten exposure incident means that declaration cannot be trusted
  // as-is. Forcing gluten here as a precaution until the supplier/physical
  // product label confirms the true ingredient list. Remove this override only
  // after that verification, and correct it to match the confirmed label.
  'merguez sate': ['gluten','soy'],
  // Frietjes — allergen-free
  'kinderfriet': [], 'kleine friet': [], 'middel friet': [], 'grote friet': [],
  // Sauzen — variant names in allergenes.json
  'mayonaise': ['eggs','milk','mustard','soy'],          // "Mayonnaise"
  'cocktail': ['eggs','mustard'],                         // "Coctail"
  'tartaar': ['celery','eggs','mustard'],                 // "Tartare"
  'toscane': ['eggs','mustard'],                          // "Toscaanse"
  'piccalilli': ['celery','mustard'],                     // "Pickels"
  // Snacks — variant names
  'mozzarellasticks': ['gluten','milk'],                  // "Mozarellasticks"
  'kaassouffle': ['gluten','milk'],                       // "Kaassoufflé"
  // Dishes
  'scampi met zoete roomsaus': ['crustaceans','milk','mustard'],
  'salade scampi': ['celery','crustaceans','eggs','gluten','soy','sulphites'],
  'bicky natuur': ['gluten','sesame'],
  'bicky alleen saus': ['celery','gluten','mustard','sesame','soy'],
  'tomaat garnaal': ['crustaceans','eggs','gluten','milk','soy'],
  'tomaat tonijn': ['eggs','fish','milk','mustard','soy'],
  'salade kaaskroketten': ['eggs','gluten','milk','soy'],
  'salade garnaalkroketten': ['celery','crustaceans','eggs','gluten','milk','soy'],
  'scampi diabolique': ['crustaceans','gluten','milk'],
  'scampi curry': ['crustaceans','gluten','milk','mustard','sulphites'],
  // Snacks without allergen data
  // NOTE (2026-10-15): "Dynamite" override removed — QGuard now has real data
  // for it (gluten, milk, soy), so it must flow through instead of being forced
  // to empty. Leaving the stale override here was the same failure pattern that
  // caused the merguez gluten miss.
  'artisanale kipbrochette': [],
  // Sauzen without allergen data / culinarily determined
  'loempiasaus': ['soy'],
  '3 sauzen': [], 'speciale saus': [],
  // Maaltijden
  'steak tartare': ['eggs', 'mustard'],
  // Drinks
  'paix dieu': ['gluten'], 'belle-vue': ['gluten'],
  'capri sun': [], 'fuze tea': [], 'fanta lemon': [],
  'tonnisteiner citroen': [], 'tonnisteiner orange': [],
  'plat water': [], 'spuitwater': [], 'minute maid': [],
  'agrum': [], 'tropico': [], 'gini': [],
  'ice tea green': [], 'ice tea': [],
  'coca-cola zero': [], 'coca-cola': [], 'sprite': [], 'fanta': [],
  'salade nicoise': ['eggs','fish'],
}

function findAllergens(name) {
  const norm = normalize(name)
  if (manualMap[norm] !== undefined) return manualMap[norm]
  if (lookup.has(norm)) return lookup.get(norm)

  // Partial match: all significant words of menu item appear in a lookup key
  const words = norm.split(' ').filter(w => w.length > 3)
  if (words.length > 0) {
    for (const [key, val] of lookup) {
      if (words.every(w => key.includes(w))) return val
    }
    // Or: all significant words of lookup key appear in menu item name
    for (const [key, val] of lookup) {
      const kWords = key.split(' ').filter(w => w.length > 3)
      if (kWords.length > 0 && kWords.every(w => norm.includes(w))) return val
    }
  }
  return null
}

let matched = 0, unmatched = [], changedCount = 0
const idToNewAllergens = new Map()
for (const item of menu.menu) {
  if (!item.nl?.name) continue
  const allergens = findAllergens(item.nl.name)
  if (allergens !== null) {
    matched++
    idToNewAllergens.set(item.id, { allergens, old: item.allergens || [] })
  } else {
    unmatched.push(item.nl.name)
  }
}

// Rewrite only each item's "allergens" line in place, rather than
// JSON.stringify-ing the whole file — that would reformat every array in the
// document (opening hours, pairsWith, ...) and bury the real diff in noise.
const rawText = readFileSync('./data/locations/bellegems.json', 'utf8')
const eol = rawText.includes('\r\n') ? '\r\n' : '\n'
const lines = rawText.split(/\r\n|\n/)
const idLineRe = /^(\s*)"id":\s*(\d+),\s*$/
const allergensLineRe = /^(\s*)"allergens":\s*\[[^\]]*\]\s*,?\s*$/

let currentId = null
for (let i = 0; i < lines.length; i++) {
  const idMatch = lines[i].match(idLineRe)
  if (idMatch) {
    currentId = Number(idMatch[2])
    continue
  }
  const allMatch = lines[i].match(allergensLineRe)
  if (allMatch && currentId !== null && idToNewAllergens.has(currentId)) {
    const { allergens, old } = idToNewAllergens.get(currentId)
    const trailingComma = /,\s*$/.test(lines[i]) ? ',' : ''
    const arr = allergens.length ? `[${allergens.map(a => JSON.stringify(a)).join(', ')}]` : '[]'
    lines[i] = `${allMatch[1]}"allergens": ${arr}${trailingComma}`
    if ([...old].sort().join(',') !== [...allergens].sort().join(',')) changedCount++
    currentId = null
  }
}

writeFileSync('./data/locations/bellegems.json', lines.join(eol), 'utf8')
console.log(`Matched: ${matched}, Unmatched: ${unmatched.length}, Changed: ${changedCount}`)
if (unmatched.length) console.log('Unmatched:\n' + unmatched.map(n => '  ' + n).join('\n'))
