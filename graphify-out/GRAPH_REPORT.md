# Graph Report - website-v2  (2026-08-24)

## Corpus Check
- 57 files · ~250,400 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 503 nodes · 694 edges · 37 communities (32 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6fa9abf4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Grote friet (4)
- useLang.ts
- OrderDrawer.vue
- ReservationForm.vue
- admin/+Page.vue
- menu/+Page.vue
- devDependencies
- dependencies
- Plus Files Convention
- compilerOptions
- MenuCard.vue
- server.ts
- MenuModal.vue
- SollicitatieForm.vue
- apply-allergens.mjs
- preorder.js
- +Head.vue
- optimize-images.js
- vercel.json
- vite.config.ts
- download-strapi-images.js
- reorder-ids.mjs
- QGuard Recipes API (/api/v1/recipes/{RecipeId})
- +onCreateApp.ts
- pages/+config.ts
- _error/+Page.vue
- robots.txt Configuration
- trackEvent
- PreorderInfoModal.vue
- @id/+Page.vue

## God Nodes (most connected - your core abstractions)
1. `Grote friet (4)` - 27 edges
2. `trackEvent()` - 26 edges
3. `useLang()` - 19 edges
4. `useOrder()` - 18 edges
5. `Huisbereide gerechten (category)` - 17 edges
6. `Snacks (category)` - 11 edges
7. `compilerOptions` - 10 edges
8. `Spuitwater (298)` - 10 edges
9. `Witte wijn (351)` - 8 edges
10. `Pairings Proposal Document` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Pairings Proposal Document` --semantically_similar_to--> `QGuard Recipes API (/api/v1/recipes/{RecipeId})`  [INFERRED] [semantically similar]
  docs/pairings-proposal.md → qguard.md
- `openInfo()` --calls--> `trackEvent()`  [EXTRACTED]
  components/OrderDrawer.vue → composables/useAnalytics.ts
- `openInfo()` --calls--> `trackEvent()`  [EXTRACTED]
  pages/bestelling/@id/+Page.vue → composables/useAnalytics.ts
- `handleClick()` --calls--> `trackEvent()`  [EXTRACTED]
  components/MenuCard.vue → composables/useAnalytics.ts
- `increaseQty()` --calls--> `trackEvent()`  [EXTRACTED]
  components/OrderDrawer.vue → composables/useAnalytics.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Plus Files Interface Group** — readme_config_ts, readme_page_vue, readme_data_ts, readme_layout_vue, readme_head_vue, readme_error_page, readme_page_transition [EXTRACTED 1.00]
- **Items Pairing with Grote Friet (hub)** — docs_pairings_proposal_grote_friet, docs_pairings_proposal_bell_burger, docs_pairings_proposal_bicky_natuur, docs_pairings_proposal_bicky_burger, docs_pairings_proposal_bicky_chicken, docs_pairings_proposal_bicky_fish, docs_pairings_proposal_bicky_veggie, docs_pairings_proposal_vleesbrochette, docs_pairings_proposal_kipfingers, docs_pairings_proposal_kippenboutjes, docs_pairings_proposal_loempia, docs_pairings_proposal_pepersaus_warm, docs_pairings_proposal_bearnaise_warm, docs_pairings_proposal_champignonsaus_warm, docs_pairings_proposal_stoofvleessaus, docs_pairings_proposal_stoofvleessaus_v_h_huis, docs_pairings_proposal_stoofvlees, docs_pairings_proposal_vol_au_vent, docs_pairings_proposal_half_haantje, docs_pairings_proposal_rundsbrochette, docs_pairings_proposal_scampi_met_zoete_roomsaus, docs_pairings_proposal_scampi_diabolique, docs_pairings_proposal_scampi_curry, docs_pairings_proposal_americain_preparee, docs_pairings_proposal_steak_tartare [INFERRED 0.85]
- **Items Pairing with Witte Wijn (hub)** — docs_pairings_proposal_witte_wijn, docs_pairings_proposal_vol_au_vent, docs_pairings_proposal_scampi_met_zoete_roomsaus, docs_pairings_proposal_tomaat_garnaal, docs_pairings_proposal_tomaat_tonijn, docs_pairings_proposal_salade_caesar, docs_pairings_proposal_salade_scampi, docs_pairings_proposal_salade_nicoise, docs_pairings_proposal_salade_garnaalkroketten [INFERRED 0.85]

## Communities (37 total, 5 thin omitted)

### Community 0 - "Grote friet (4)"
Cohesion: 0.06
Nodes (67): 3 sauzen (48), Americain Préparé (202), Andalouse (27), Bearnaise koud (37), Bearnaise warm (70), BELL' Burger (97), Bicky burger (99), Bicky chicken (101) (+59 more)

### Community 1 - "useLang.ts"
Cohesion: 0.06
Nodes (35): { lang, t }, { lastAdded }, message, visible, daysLabel, Holiday, holidays, { lang, t } (+27 more)

### Community 2 - "OrderDrawer.vue"
Cohesion: 0.08
Nodes (37): closeInfo(), decreaseQty(), emit, handleClear(), handleShare(), increaseQty(), isMounted, { items, locationName, shareId, introSeen, setQty, removeItem, clearOrder, shareOrder, markIntroSeen } (+29 more)

### Community 3 - "ReservationForm.vue"
Cohesion: 0.06
Nodes (29): calendarCursor, calendarDays, calendarMonthLabel, closePicker(), currentMinutes, errors, form, formatDateLabel() (+21 more)

### Community 4 - "admin/+Page.vue"
Cohesion: 0.06
Nodes (23): activeLocation, addCatForm, addProductForm, allCategories, allLocations, authenticated, currentLoc, customCategories (+15 more)

### Community 5 - "menu/+Page.vue"
Cohesion: 0.06
Nodes (26): activeCategory, activeLocation, allergenLegend, availableCategories, canScrollLeft, canScrollRight, categoryScroller, catItemsMap (+18 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (22): devDependencies, sharp, tailwindcss, @tailwindcss/vite, @types/express, typescript, vite, @vitejs/plugin-vue (+14 more)

### Community 7 - "dependencies"
Cohesion: 0.11
Nodes (19): express, dependencies, express, pusher, pusher-js, @universal-middleware/core, vike, vike-vue (+11 more)

### Community 8 - "Plus Files Convention"
Cohesion: 0.14
Nodes (17): +config.ts, create-vike CLI scaffold command, +data.ts, Error Page (/pages/_error/+Page.vue), Filesystem Routing, +Head.vue, HTML Streaming, +Layout.vue (+9 more)

### Community 9 - "compilerOptions"
Cohesion: 0.12
Nodes (16): dist, DOM, DOM.Iterable, ESNext, vite/client, compilerOptions, esModuleInterop, lib (+8 more)

### Community 10 - "MenuCard.vue"
Cohesion: 0.16
Nodes (14): containerEl, emit, fallbackColor, handleAdd(), handleClick(), { imgSrc, imgLoaded }, { lang, t }, popularLabel (+6 more)

### Community 11 - "server.ts"
Cohesion: 0.24
Nodes (9): getIp(), handler(), redis(), EMPTY, getParam(), handler(), redis(), handler() (+1 more)

### Community 12 - "MenuModal.vue"
Cohesion: 0.18
Nodes (12): description, emit, handleAdd(), isMounted, itemAllergens, itemSides, { lang, t }, name (+4 more)

### Community 13 - "SollicitatieForm.vue"
Cohesion: 0.17
Nodes (8): cvFile, cvFileName, errors, form, loading, submit(), submitted, validate()

### Community 14 - "apply-allergens.mjs"
Cohesion: 0.22
Nodes (8): allergenes, findAllergens(), lookup, manualMap, menu, nlToKey, normalize(), unmatched

### Community 15 - "preorder.js"
Cohesion: 0.42
Nodes (8): applyAction(), EMPTY, getParam(), getPusher(), handler(), readState(), redis(), writeState()

### Community 16 - "+Head.vue"
Cohesion: 0.22
Nodes (8): canonicalUrl, ctx, jsonLd, PAGE_META, pageDescription, pageTitle, path, _rawGaId

### Community 17 - "optimize-images.js"
Cohesion: 0.25
Nodes (6): dataDir, __dirname, EXTS, publicDir, renamedPaths, root

### Community 18 - "vercel.json"
Cohesion: 0.29
Nodes (6): buildCommand, framework, headers, installCommand, outputDirectory, rewrites

### Community 20 - "download-strapi-images.js"
Cohesion: 0.40
Nodes (3): __dirname, IMAGES, outDir

### Community 21 - "reorder-ids.mjs"
Cohesion: 0.40
Nodes (4): blockItems, blocks, data, oldToNew

### Community 22 - "QGuard Recipes API (/api/v1/recipes/{RecipeId})"
Cohesion: 0.50
Nodes (4): QGuard Cookie-based Auth Mechanism, QGuard Login Endpoint, QGuard Recipes API (/api/v1/recipes/{RecipeId}), recipes.csv (external recipe ID source)

### Community 34 - "trackEvent"
Cohesion: 0.21
Nodes (11): navLinks, { t }, gtag(), GtagFn, trackEvent(), addItem(), openDrawer(), addToOrder() (+3 more)

### Community 35 - "PreorderInfoModal.vue"
Cohesion: 0.33
Nodes (6): close(), emit, isMounted, points, props, { t }

### Community 36 - "@id/+Page.vue"
Cohesion: 0.29
Nodes (6): { load, joinShared, markIntroSeen }, openInfo(), pageContext, showInfo, status, { t }

## Knowledge Gaps
- **233 isolated node(s):** `EMPTY`, `EMPTY`, `{ lang, t }`, `{ lastAdded }`, `visible` (+228 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLang()` connect `useLang.ts` to `OrderDrawer.vue`, `PreorderInfoModal.vue`, `trackEvent`, `ReservationForm.vue`, `@id/+Page.vue`, `menu/+Page.vue`, `MenuCard.vue`, `MenuModal.vue`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `trackEvent()` connect `trackEvent` to `useLang.ts`, `OrderDrawer.vue`, `ReservationForm.vue`, `PreorderInfoModal.vue`, `@id/+Page.vue`, `menu/+Page.vue`, `MenuCard.vue`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `useOrder()` connect `OrderDrawer.vue` to `useLang.ts`, `trackEvent`, `@id/+Page.vue`, `menu/+Page.vue`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `useOrder()` (e.g. with `markIntroSeen()` and `addItem()`) actually correct?**
  _`useOrder()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `EMPTY`, `EMPTY`, `{ lang, t }` to the rest of the system?**
  _233 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Grote friet (4)` be split into smaller, more focused modules?**
  _Cohesion score 0.06331976481230213 - nodes in this community are weakly interconnected._
- **Should `useLang.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05782312925170068 - nodes in this community are weakly interconnected._