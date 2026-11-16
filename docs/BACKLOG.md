# Engineering Lab task backlog

This backlog turns the independent repository, frontend, and content reviews into discrete changes. [Progress](../progress.json) records current status and verification evidence. Follow the [agent workflow](../AGENTS.md) for delegation, exclusive file ownership, independent review, and handoffs. Keep each change local unless the owner explicitly authorizes a commit, push, merge, or deployment. GitHub Pages settings require separate explicit approval.

Work in the phase order below. A listed prerequisite is a blocking dependency. Items listed as independent can be reviewed separately, and can be developed in parallel only when both file ownership and test outputs are isolated. Preserve existing article text, URLs, design, keyboard behavior, and both language modes except for the specific defect under review.

| Priority | Meaning |
| --- | --- |
| P1 | Deployment integrity or loss of access to core navigation |
| P2 | An observable usability, accessibility, content, or build defect |
| P3 | A latent edge case, performance improvement, or documentation correction |

## Phase 1 · Deployment investigation and approval

### PAGES-01 · Trace the current Pages publisher
**P1 · Investigation complete · Prerequisites: none**

- **Evidence:** A branch Pages run and the repository workflow both reported a successful deployment for the same commit. The branch run used Jekyll 3.10.0 while the repository workflow used Jekyll 4.4.1. See the [branch run](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791339) and [tested run](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791573). The deployment status identified the tested run as the pre-cutover publisher. The completed cutover confirmed GitHub Actions as the configured Source.
- **Acceptance:** Record the configured source and active artifact when evidence identifies them. Distinguish configuration, historical deployments, and content currently served. Record any confirmation that requires owner access. Present the [migration proposal](PAGES-MIGRATION.md) before changing a workflow or setting.
- **Validation:** Correlate Actions, deployment status, and available Pages source or production response evidence. Capture relevant run and commit identifiers. Use read-only requests.

### PAGES-02 · Move to one tested Pages deployment
**P1 · Complete · Prerequisites: PAGES-01 and owner approval (received)**

- **Acceptance:** The Pages source is GitHub Actions, and one pipeline publishes the artifact produced by the strict Jekyll build after unit, site, and browser checks succeed. PRs run checks without publishing. Existing site routes, articles, UI, both languages, and canonical URLs continue to work. The rollback procedure uses the known-good deployment and the authorized workflow.
- **Validation:** Run the [production checks](development.md#checks) and inspect [the workflow](../.github/workflows/pages.yml) before any release action. After the owner authorizes the release, verify the source setting, count successful deploy jobs for the cutover and first subsequent approved main push, match the deploy to the tested artifact, and smoke-check the live Home, Tech, Essays, Photography, and About pages.
- **Result:** Source set to GitHub Actions. Deployment `7813669149` succeeded through one rerun of the custom deploy job at `0e48b7a`, using the verified build artifact. See the [migration record](PAGES-MIGRATION.md#cutover-result) for smoke-test results and the future push verification.

### SETUP-01 · Publish the persistent workflow setup
**P1 · Release authorized on the updated base · Prerequisites: PAGES-02 and explicit release approval (received)**

- **Acceptance:** A fresh clone of `main` has the current `AGENTS.md`, all six native roles and their project config, `progress.json`, and the architecture, decisions, backlog, migration, and development docs. Jekyll omits internal project records and the local photo manifest.
- **Validation:** Compare the working tree, local Git tree at HEAD, and the GitHub main tree. Verify that the shared files are Git-tracked and that a trusted local Codex session discovers all six roles. Build the site and check that internal files stay out of the artifact. Validate and record any approved production release separately.
- **Release checkpoint:** The owner approved preserving the upstream bilingual essay at `b2552c8` and publishing the 16-file proposal on that base. Verify the combined tree and production deployment independently. See [the ledger](../progress.json).

## Phase 2 · Navigation and interaction

### A11Y-01 · Keep mobile navigation usable without JavaScript
**P1 · Queued · Prerequisites: none**

- **Acceptance:** At a 390px viewport, the main links remain visible and usable when JavaScript is disabled or fails before menu initialization. When JavaScript is ready, the menu retains its current appearance and works by keyboard and touch, with an accurate expanded state.
- **Validation:** Exercise the mobile navigation on `/tech/` with JavaScript disabled and enabled. Run `npm run test:browser` with coverage for both cases. See [navigation styles](../assets/css/main.css) and [site script](../assets/js/site.mjs).

### A11Y-02 · Preserve lightbox focus when changing photos
**P2 · Queued · Prerequisites: none**

- **Acceptance:** Arrow-key navigation from a photo tag keeps focus within the lightbox and places it on a meaningful control if that tag is removed. Photo position and title changes are announced without stealing focus. Escape returns focus to the photo that opened the lightbox.
- **Validation:** Reproduce from a tag in a multi-photo result set. Check Left/Right Arrow, Tab order, announcement text, and Escape. Run `npm run test:browser`. See the [gallery script](../assets/js/gallery.mjs).

### NAV-01 · Mark Essays active on essay detail routes
**P2 · Queued · Prerequisites: none**

- **Acceptance:** An essay detail route marks the Essays navigation item as current in both language modes. Tech and other active states remain correct.
- **Validation:** Build the site and check that a generated essay detail has the appropriate `aria-current`. Run `npm run check:site` and cover one essay and one Tech detail in `npm run test:browser`. See the [collection defaults](../_config.yml).

### A11Y-03 · Provide a Dot Wave pause
**P2 · Queued · Prerequisites: none**

- **Acceptance:** A keyboard-accessible, bilingual control can pause and resume the wave. System reduced-motion support and static fallback still work. The pause control preserves the animation geometry and heading layout.
- **Validation:** Verify visible canvas pixels stop changing after Pause and resume after Play. Exercise keyboard control, both languages, and reduced motion. Run `npm run test:browser`. See the [wave module](../assets/js/hero-wave.mjs).

## Phase 3 · Bilingual reading and content

### I18N-01 · Keep section links usable in either language
**P2 · Queued · Prerequisites: none**

- **Acceptance:** A direct URL with an existing English or Chinese section fragment reaches the corresponding visible section under either stored language preference. Language switching preserves the current section when a counterpart exists, retains existing external links, and keeps the TOC limited to visible headings. A missing translation still shows available content.
- **Validation:** In `npm run test:browser`, open an existing January fragment of `/essays/2027-reading-list/` with each preference, switch languages, and assert the target and TOC. Include a missing-translation fixture. See the [site script](../assets/js/site.mjs).

### I18N-02 · Expose the real content language and localize UI labels
**P2 · Queued · Prerequisites: none**

- **Acceptance:** Fallback copy declares the language actually displayed. Menu, TOC, lightbox, and other affected controls have localized accessible names. Localize the Essays backlink, current essay category labels, and browser tab title while retaining one canonical URL and the existing share-metadata policy.
- **Validation:** In `npm run test:browser`, inspect document and element language, accessible names, labels, and tab title in both modes, including a missing-translation fixture. Run `npm run check:site` for canonical metadata. See [bilingual template](../_includes/bilingual-copy.html), [article layout](../_layouts/article.html), and [Essays archive](../essays.html).

### CONTENT-01 · Correct the four Nvidia Way cover references
**P2 · Queued · Prerequisites: none**

- **Acceptance:** Each language version in both reading lists uses the publisher-confirmed ISBN `9781324086710` in its cover reference. Book text and destinations remain intact. Verify the resulting image or preserve a readable fallback if the cover service is unavailable. [Publisher record](https://wwnorton.co.uk/books/9781324086710-the-nvidia-way)
- **Validation:** Search the two source articles and their output for `9781324086719` and `9781324086710`. Confirm there are zero occurrences of the invalid ISBN and four corrected cover uses. Check the cover response and image or fallback in a browser. Record any network restriction, then run `npm run check:site`. See the [reading list](../_essays/2027-reading-list.md) and [technical taste essay](../_essays/technical-taste-and-foresight.md).

### DOC-01 · Correct the Home publishing guide
**P3 · Queued · Prerequisites: none**

- **Acceptance:** The guide describes the recent-posts selection and empty-state rules without a fixed claim about the current count or status of real articles.
- **Validation:** Compare the revised guide with the [recent posts include](../_includes/recent-posts.html), verify Markdown links, and run `git diff --check`. See the [publishing guide](publishing.md).

## Phase 4 · Build resilience and performance

### BUILD-01 · Render and test math without a CDN dependency
**P2 · Open, observed in production · Prerequisites: none**

- **Evidence:** The live Tech article exposed raw TeX before and after the Pages cutover. CI passed its renderer test, and the live failure cause remains unconfirmed. See the [article](https://kaetowjj.github.io/tech/reproducible-data-workflows/) and [smoke-test record](PAGES-MIGRATION.md#cutover-result).
- **Acceptance:** Math renders in both language modes when jsDelivr is blocked. Pin the local rendering dependency or use build-time rendering after reviewing the approach. Preserve existing math markup support and keep the formula assertion in the deployment-gating browser test.
- **Validation:** Run the [production checks](development.md#checks). In `npm run test:browser`, block the CDN and assert visible inline and display math in both languages, plus no unexpected external renderer request. See the [site layout](../_layouts/default.html) and [browser test](../tests/browser/site.spec.mjs).

### BUILD-02 · Exclude the photography import manifest from Jekyll output
**P2 · Verified locally, publication pending · Prerequisites: none**

- **Acceptance:** A local `photography-import.json` remains available to the owner after optimization, but is absent from deployable output. The generated-site check rejects output that includes it.
- **Validation:** Create a synthetic import manifest in an isolated test source directory, build it with the strict production command, and verify output omits the manifest. Separately verify `npm run check:site` fails with a synthetic leaked manifest in disposable output. Run `npm test` for the existing optimizer behavior. See [image optimizer](../scripts/optimize-images.mjs), [Jekyll config](../_config.yml), and [site check](../scripts/check-site.mjs).
- **Result:** The strict build retained a synthetic source manifest and excluded it from the generated site in an isolated fixture. The site checker rejected the same manifest when deliberately placed in disposable output. The exclusion and guard are local pending the approved setup release.

### PERF-01 · Choose gallery image sizes from rendered tiles
**P3 · Queued · Prerequisites: none**

- **Acceptance:** Responsive image requests reflect each rendered tile width and device pixel ratio. Tiles use a suitable available source while preserving aspect ratio, sharpness, filtering, and full-resolution lightbox behavior.
- **Validation:** Measure tile width and selected image URLs at 390px and 3× DPR, plus desktop and a viewport resize. Compare transferred bytes against the baseline with cache disabled. Run `npm run test:browser`. See the [gallery script](../assets/js/gallery.mjs).

### TAG-01 · Align Unicode archive tag matching across Ruby and JavaScript
**P3 · Queued · Prerequisites: none**

- **Acceptance:** Distinct canonical Unicode tags such as `i` and dotless `ı` remain distinct. Existing shared tag URLs, ASCII behavior, and keyboard filtering keep working.
- **Validation:** Add equivalent fixtures for Ruby build keys and JS lookup. Run `npm test`, the strict Jekyll build, and `npm run test:browser` with exact deep links to both tags. See the [build filter](../_plugins/tech_tags.rb) and [lookup logic](../assets/js/tech-core.mjs).
