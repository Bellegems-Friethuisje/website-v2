import { readFileSync, writeFileSync } from 'fs'

const data = JSON.parse(readFileSync('./data/locations/bellegems.json', 'utf8'))

const oldToNew = new Map()
let nextId = 1
let currentCat = null
let prevWasSeparator = false

for (const item of data.menu) {
  const cat = item.category
  if (!cat) {
    prevWasSeparator = true
    continue
  }

  // Add gap when transitioning from one block to the next (after a separator)
  if (prevWasSeparator && currentCat !== null) {
    nextId += 20
  }
  prevWasSeparator = false
  currentCat = cat

  if (item.id !== undefined) {
    oldToNew.set(item.id, nextId)
    item.id = nextId
    nextId++
  }
}

// Update pairsWith references
for (const item of data.menu) {
  if (item.pairsWith?.length) {
    item.pairsWith = item.pairsWith.map(oldId => oldToNew.get(oldId) ?? oldId)
  }
}

writeFileSync('./data/locations/bellegems.json', JSON.stringify(data, null, 2), 'utf8')

// Print summary
let cur = null
let start = null
let end = null
const blocks = []
for (const [old, nw] of oldToNew) {
  // group by new ID range isn't straightforward, just print the mapping grouped by block
  blocks.push({ old, nw })
}

// Print block summary
console.log('\nBlock summary:')
let prevNew = null
let blockItems = []
for (const { old, nw } of blocks) {
  if (prevNew !== null && nw !== prevNew + 1) {
    console.log(`  IDs ${blockItems[0].nw}–${blockItems[blockItems.length-1].nw} (gap before: ${nw - prevNew - 1})`)
    blockItems = []
  }
  blockItems.push({ old, nw })
  prevNew = nw
}
if (blockItems.length) console.log(`  IDs ${blockItems[0].nw}–${blockItems[blockItems.length-1].nw}`)

console.log(`\nTotal items reassigned: ${oldToNew.size}`)
