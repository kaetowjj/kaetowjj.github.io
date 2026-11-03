# Engineering Lab

Implement the requirements in docs/requirements-v2.md. Keep the site static: Jekyll/Liquid + YAML + native JS. Personal facts remain explicit placeholders until supplied; demo articles and images stay visibly labeled.

## Architecture and boundaries

Layouts compose pages; collections own bilingual Markdown content. _data owns profile, navigation and photography taxonomies/records. assets/js/gallery-core.mjs owns selection and proportional row geometry; gallery.mjs consumes that logic and owns the DOM/dialog. site.mjs owns preferences and article TOC. CSS variables are the source of theme colors.

Both language sections live in one Markdown file with markdown="1" and blank lines around containers. Headings in the inactive section must not enter the TOC. Language fallback preserves available text. Preference access must tolerate storage denial.

Every photograph has equal visual priority. Combine one category and one tag, sort on capture date, use ID for ties, and put undated photos last in both directions. Viewer order follows visible results. Preserve aspect ratio, keyboard focus, touch navigation and native dialog focus trapping.

## Verification

Use npm test for pure logic, bundle exec jekyll build --strict_front_matter for Liquid/Markdown, npm run check:site for generated links, and npm run test:browser for desktop/mobile interactions. Browser tests require a built _site and Playwright Chromium. See docs/development.md for setup commands and docs/validation.md for historical evidence.

Before reporting deployment, inspect actual workflow/deployment success or the live site. A commit alone proves no deployment. Keep original photos and coordinates private; the optimization pipeline strips metadata by default. Add content through collections and YAML rather than hard-coded HTML lists.

## Documentation synchronization

Update the primary manual when its behavior, data structure or owner workflow changes:

- Article schema, publication and bilingual article content: [publishing.md](docs/publishing.md).
- Photography processing, metadata, taxonomy and import workflow: [photography.md](docs/photography.md).
- Homepage, About, profile, theme, language and navigation configuration: [customization.md](docs/customization.md).
- Quote collection, provenance and display behavior: [silly-thoughts.md](docs/silly-thoughts.md).
- Environment, build, tests and deployment: [development.md](docs/development.md).

Update README.md only when project positioning, core features or documentation navigation changes. Keep full procedures in their primary manual; cross-reference it from other manuals instead of copying instructions. Preserve requirements, historical validation records and article templates; label them as historical rather than treating them as current operating instructions.

Photography taxonomy IDs must use lowercase kebab-case and pass node scripts/check-photography.mjs (also included in check:site). Report invalid references instead of silently folding their case at runtime. Browser tests must use current real data rather than fixed Demo counts, IDs, titles or personal placeholders. Preserve photo files and unrelated metadata during taxonomy migrations.
