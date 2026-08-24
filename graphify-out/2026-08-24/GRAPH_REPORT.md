# Graph Report - website-v2  (2026-08-24)

## Corpus Check
- 56 files · ~249,218 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 478 nodes · 651 edges · 34 communities (29 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.83)
- Token cost: 59,259 input · 0 output

## Community Hubs (Navigation)
- Menu Item Pairings
- Holiday Banner & Footer
- Order Drawer / Cart
- Reservation Form
- Admin Menu Management
- Menu Browsing Page
- Build Tooling Config
- Runtime Dependencies
- Vike Framework Conventions
- TypeScript Config
- Menu Card Component
- Admin API Endpoints
- Menu Item Modal
- Job Application Form
- Allergen Matching Script
- Preorder API & Sharing
- SEO Head Metadata
- Image Optimization Script
- Vercel Deployment Config
- Vite Dev Server Config
- Strapi Image Migration Script
- Menu ID Reordering Script
- QGuard Recipes Auth
- Analytics App Setup
- Page Config
- Page Context
- Robots & Sitemap Config

## God Nodes (most connected - your core abstractions)
1. `Grote friet (4)` - 27 edges
2. `trackEvent()` - 21 edges
3. `useLang()` - 17 edges
4. `Huisbereide gerechten (category)` - 17 edges
5. `useOrder()` - 16 edges
6. `Snacks (category)` - 11 edges
7. `compilerOptions` - 10 edges
8. `Spuitwater (298)` - 10 edges
9. `Plus Files Convention` - 8 edges
10. `Pairings Proposal Document` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Pairings Proposal Document` --semantically_similar_to--> `QGuard Recipes API (/api/v1/recipes/{RecipeId})`  [INFERRED] [semantically similar]
  docs/pairings-proposal.md → qguard.md
- `handleClick()` --calls--> `trackEvent()`  [EXTRACTED]
  components/MenuCard.vue → composables/useAnalytics.ts
- `submit()` --calls--> `trackEvent()`  [EXTRACTED]
  components/ReservationForm.vue → composables/useAnalytics.ts
- `isOpenMap` --calls--> `getIsOpen()`  [EXTRACTED]
  pages/index/+Page.vue → composables/useIsOpen.ts
- `isOpenMap` --calls--> `getIsOpen()`  [EXTRACTED]
  pages/locaties/+Page.vue → composables/useIsOpen.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Plus Files Interface Group** — readme_config_ts, readme_page_vue, readme_data_ts, readme_layout_vue, readme_head_vue, readme_error_page, readme_page_transition [EXTRACTED 1.00]
- **Items Pairing with Grote Friet (hub)** — docs_pairings_proposal_grote_friet, docs_pairings_proposal_bell_burger, docs_pairings_proposal_bicky_natuur, docs_pairings_proposal_bicky_burger, docs_pairings_proposal_bicky_chicken, docs_pairings_proposal_bicky_fish, docs_pairings_proposal_bicky_veggie, docs_pairings_proposal_vleesbrochette, docs_pairings_proposal_kipfingers, docs_pairings_proposal_kippenboutjes, docs_pairings_proposal_loempia, docs_pairings_proposal_pepersaus_warm, docs_pairings_proposal_bearnaise_warm, docs_pairings_proposal_champignonsaus_warm, docs_pairings_proposal_stoofvleessaus, docs_pairings_proposal_stoofvleessaus_v_h_huis, docs_pairings_proposal_stoofvlees, docs_pairings_proposal_vol_au_vent, docs_pairings_proposal_half_haantje, docs_pairings_proposal_rundsbrochette, docs_pairings_proposal_scampi_met_zoete_roomsaus, docs_pairings_proposal_scampi_diabolique, docs_pairings_proposal_scampi_curry, docs_pairings_proposal_americain_preparee, docs_pairings_proposal_steak_tartare [INFERRED 0.85]
- **Items Pairing with Witte Wijn (hub)** — docs_pairings_proposal_witte_wijn, docs_pairings_proposal_vol_au_vent, docs_pairings_proposal_scampi_met_zoete_roomsaus, docs_pairings_proposal_tomaat_garnaal, docs_pairings_proposal_tomaat_tonijn, docs_pairings_proposal_salade_caesar, docs_pairings_proposal_salade_scampi, docs_pairings_proposal_salade_nicoise, docs_pairings_proposal_salade_garnaalkroketten [INFERRED 0.85]

## Communities (34 total, 5 thin omitted)

### Community 0 - "Menu Item Pairings"
Cohesion: 0.06
Nodes (67): 3 sauzen (48), Americain Préparé (202), Andalouse (27), Bearnaise koud (37), Bearnaise warm (70), BELL' Burger (97), Bicky burger (99), Bicky chicken (101) (+59 more)

### Community 1 - "Holiday Banner & Footer"
Cohesion: 0.06
Nodes (33): daysLabel, Holiday, holidays, { lang, t }, monthLabel, upcoming, navLinks, { t } (+25 more)

### Community 2 - "Order Drawer / Cart"
Cohesion: 0.08
Nodes (40): decreaseQty(), emit, handleClear(), handleShare(), increaseQty(), isMounted, { items, locationName, shareId, setQty, removeItem, clearOrder, shareOrder }, { lang, t } (+32 more)

### Community 3 - "Reservation Form"
Cohesion: 0.06
Nodes (29): calendarCursor, calendarDays, calendarMonthLabel, closePicker(), currentMinutes, errors, form, formatDateLabel() (+21 more)

### Community 4 - "Admin Menu Management"
Cohesion: 0.06
Nodes (23): activeLocation, addCatForm, addProductForm, allCategories, allLocations, authenticated, currentLoc, customCategories (+15 more)

### Community 5 - "Menu Browsing Page"
Cohesion: 0.07
Nodes (25): activeCategory, activeLocation, allergenLegend, availableCategories, canScrollLeft, canScrollRight, categoryScroller, catItemsMap (+17 more)

### Community 6 - "Build Tooling Config"
Cohesion: 0.09
Nodes (22): devDependencies, sharp, tailwindcss, @tailwindcss/vite, @types/express, typescript, vite, @vitejs/plugin-vue (+14 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): express, dependencies, express, pusher, pusher-js, @universal-middleware/core, vike, vike-vue (+11 more)

### Community 8 - "Vike Framework Conventions"
Cohesion: 0.14
Nodes (17): +config.ts, create-vike CLI scaffold command, +data.ts, Error Page (/pages/_error/+Page.vue), Filesystem Routing, +Head.vue, HTML Streaming, +Layout.vue (+9 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.12
Nodes (16): dist, DOM, DOM.Iterable, ESNext, vite/client, compilerOptions, esModuleInterop, lib (+8 more)

### Community 10 - "Menu Card Component"
Cohesion: 0.16
Nodes (14): containerEl, emit, fallbackColor, handleAdd(), handleClick(), { imgSrc, imgLoaded }, { lang, t }, popularLabel (+6 more)

### Community 11 - "Admin API Endpoints"
Cohesion: 0.24
Nodes (9): getIp(), handler(), redis(), EMPTY, getParam(), handler(), redis(), handler() (+1 more)

### Community 12 - "Menu Item Modal"
Cohesion: 0.18
Nodes (12): description, emit, handleAdd(), isMounted, itemAllergens, itemSides, { lang, t }, name (+4 more)

### Community 13 - "Job Application Form"
Cohesion: 0.17
Nodes (8): cvFile, cvFileName, errors, form, loading, submit(), submitted, validate()

### Community 14 - "Allergen Matching Script"
Cohesion: 0.22
Nodes (8): allergenes, findAllergens(), lookup, manualMap, menu, nlToKey, normalize(), unmatched

### Community 15 - "Preorder API & Sharing"
Cohesion: 0.42
Nodes (8): applyAction(), EMPTY, getParam(), getPusher(), handler(), readState(), redis(), writeState()

### Community 16 - "SEO Head Metadata"
Cohesion: 0.22
Nodes (8): canonicalUrl, ctx, jsonLd, PAGE_META, pageDescription, pageTitle, path, _rawGaId

### Community 17 - "Image Optimization Script"
Cohesion: 0.25
Nodes (6): dataDir, __dirname, EXTS, publicDir, renamedPaths, root

### Community 18 - "Vercel Deployment Config"
Cohesion: 0.29
Nodes (6): buildCommand, framework, headers, installCommand, outputDirectory, rewrites

### Community 20 - "Strapi Image Migration Script"
Cohesion: 0.40
Nodes (3): __dirname, IMAGES, outDir

### Community 21 - "Menu ID Reordering Script"
Cohesion: 0.40
Nodes (4): blockItems, blocks, data, oldToNew

### Community 22 - "QGuard Recipes Auth"
Cohesion: 0.50
Nodes (4): QGuard Cookie-based Auth Mechanism, QGuard Login Endpoint, QGuard Recipes API (/api/v1/recipes/{RecipeId}), recipes.csv (external recipe ID source)

## Knowledge Gaps
- **218 isolated node(s):** `EMPTY`, `EMPTY`, `{ lang, t }`, `Holiday`, `holidays` (+213 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLang()` connect `Holiday Banner & Footer` to `Order Drawer / Cart`, `Reservation Form`, `Menu Browsing Page`, `Menu Card Component`, `Menu Item Modal`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `trackEvent()` connect `Order Drawer / Cart` to `Holiday Banner & Footer`, `Menu Card Component`, `Reservation Form`, `Menu Browsing Page`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `useOrder()` connect `Order Drawer / Cart` to `Holiday Banner & Footer`, `Menu Browsing Page`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `useOrder()` (e.g. with `addItem()` and `clearOrder()`) actually correct?**
  _`useOrder()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `EMPTY`, `EMPTY`, `{ lang, t }` to the rest of the system?**
  _218 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Menu Item Pairings` be split into smaller, more focused modules?**
  _Cohesion score 0.06331976481230213 - nodes in this community are weakly interconnected._
- **Should `Holiday Banner & Footer` be split into smaller, more focused modules?**
  _Cohesion score 0.06105457909343201 - nodes in this community are weakly interconnected._