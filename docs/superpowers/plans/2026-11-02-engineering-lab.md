# Engineering Lab Implementation Plan

Goal: Implement the supplied V2 specification as a Jekyll site on GitHub Pages.
Architecture: YAML content, Liquid layouts, native ES modules. English and Chinese share Markdown documents. Gallery logic is a pure module used by accessible DOM controls.
Tech stack: Jekyll 4.4, Ruby 3.3, Node 22 for tests and image tooling.
Spec: docs/requirements-v2.md

## Constraints
Preserve all demo labels and personal placeholders. No selected photography. No backend. Publish only after tests; distinguish build from deployment evidence.

## Review focus
Missing dates sort last in both directions; ties use IDs. Translation falls back to available language. Storage denial must not break startup. Hidden language headings must not enter TOC. Gallery resizing must preserve proportions.

## Tasks
- [x] Phase 1: Configure Gemfile, Jekyll collections and Actions. Verify bundle exec jekyll build --strict_front_matter.
- [x] Phase 2: Add default/article/index layouts and six top-level pages, demo bilingual content. Validate internal links in generated HTML.
- [x] Phase 3: Add early preference initialization and runtime language/theme controls. Verify persistence, system changes and denied storage.
- [x] Phase 4: Test then implement selectPhotos and justifiedRows in assets/js/gallery-core.mjs. Add YAML gallery, composable filters and dialog viewer. Verify keyboard, touch and filtered order.
- [x] Phase 5: Add privacy-preserving Sharp pipeline, README, AGENTS and browser tests. Build and test in Actions, inspect actual deployment result.
