# Engineering Lab

Implement the requirements in docs/requirements-v2.md. Keep the site static: Jekyll/Liquid + YAML + native JS. Personal facts remain explicit placeholders until supplied; demo articles and images stay visibly labeled.

## Architecture and boundaries

Layouts compose pages; collections own bilingual Markdown content. _data owns profile, navigation and photography taxonomies/records. assets/js/gallery-core.mjs owns selection and proportional row geometry; gallery.mjs consumes that logic and owns the DOM/dialog. site.mjs owns preferences and article TOC. CSS variables are the source of theme colors.

Both language sections live in one Markdown file with markdown="1" and blank lines around containers. Headings in the inactive section must not enter the TOC. Language fallback preserves available text. Preference access must tolerate storage denial.

Every photograph has equal visual priority. Combine one category and one tag, sort on capture date, use ID for ties, and put undated photos last in both directions. Viewer order follows visible results. Preserve aspect ratio, keyboard focus, touch navigation and native dialog focus trapping.

## Verification

Use npm test for pure logic, bundle exec jekyll build --strict_front_matter for Liquid/Markdown, npm run check:site for generated links, and npm run test:browser for desktop/mobile interactions. Browser tests require a built _site and Playwright Chromium. See README for setup commands and docs/validation.md for recorded evidence.

Before reporting deployment, inspect actual workflow/deployment success or the live site. A commit alone proves no deployment. Keep original photos and coordinates private; the optimization pipeline strips metadata by default. Add content through collections and YAML rather than hard-coded HTML lists.

## Documentation synchronization

Any change affecting content management or user-facing configuration must be reflected in README.md.
