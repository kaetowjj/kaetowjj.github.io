# Architecture

Jerry's Engineering Lab is a Jekyll site with no server-side application at runtime. Jekyll combines front matter, Markdown, Liquid, and `_data/` into files in `_site/`. Ruby provides Kramdown, Rouge, sitemap generation, and a local Liquid filter for Tech Blog tags. Browser-native modules handle behavior on the generated pages. Node and Sharp support development and image processing.

## Routes and composition

| Route | Entry and composition |
| --- | --- |
| `/` | [index.html](../index.html) renders the Home headline and short intro, About link, Recent Posts, and Tech Blog/Photography cards. [recent-posts.html](../_includes/recent-posts.html) merges Tech and Essays by publication date after excluding Demo entries. |
| `/tech/` and `/tech/:name/` | [tech.html](../tech.html) renders the archive. [Tech collection](../_tech/) entries use the shared article layout. [tech_tags.rb](../_plugins/tech_tags.rb) canonicalizes tag keys at build time. [tech.mjs](../assets/js/tech.mjs) filters the archive DOM from `?tag=` and updates browser history. |
| `/essays/` and `/essays/:name/` | [essays.html](../essays.html) generates Category and Tag filters and the archive. [Essays collection](../_essays/) entries use the shared article layout. [site.mjs](../assets/js/site.mjs) handles archive filtering. |
| `/photography/` | [photography.html](../photography.html) renders controls and a native lightbox dialog. It embeds photo records and taxonomy data as JSON. [gallery.mjs](../assets/js/gallery.mjs) owns controls, DOM and viewer navigation. [gallery-core.mjs](../assets/js/gallery-core.mjs) owns selection, date sorting and proportional row geometry. |
| `/about/` | [about.md](../about.md) assembles the bilingual profile, Exploring and Beyond Engineering prose, background and contact sections. [about-profile.html](../_includes/about-profile.html) and [about-avatar.mjs](../assets/js/about-avatar.mjs) handle the avatar and initials fallback. |
| `/404.html` | [404.html](../404.html) uses the standard page shell with a recovery link. |

[_config.yml](../_config.yml) declares the site URL, collection permalinks, default language, time zone, and layouts. [default.html](../_layouts/default.html) renders the page shell, including preference initialization, SEO metadata, header, navigation, and Footer. [article.html](../_layouts/article.html) adds the article header, dates, tags, TOC and optional changelog inside that shell. Articles that opt into math load MathJax 3.2.2 from jsDelivr.

Navigation is data-driven and uses native links, with the current section marked by `aria-current`. Theme colors and interactive states live in [main.css](../assets/css/main.css). The shared [hero-wave.html](../_includes/hero-wave.html), [dot-wave.css](../assets/css/dot-wave.css), and [hero-wave.mjs](../assets/js/hero-wave.mjs) layer Canvas into Home and existing page/article headings. The SVG provides a static fallback. The module respects reduced motion and visibility, and its debug panel is loopback-only.

Footer social links read the profile data. The layout embeds quotes as JSON and [thoughts.mjs](../assets/js/thoughts.mjs) selects one eligible record per page load. It preserves the quote's original language and localizes the source label when the interface language changes. See [Silly Thoughts](silly-thoughts.md) for eligibility and editing rules.

## Bilingual rendering and preferences

- Both languages share the same URL and canonical metadata. [_includes/preferences.html](../_includes/preferences.html) applies the initial language and resolved theme before paint, using site defaults or stored preferences. The default language is currently English. System theme follows `prefers-color-scheme`.
- Short labels from [bi.html](../_includes/bi.html) carry `data-en` and `data-zh`. Paired prose uses sibling `data-lang="en"` and `data-lang="zh"` blocks. Home and About prose passes through [bilingual-copy.html](../_includes/bilingual-copy.html). Authors keep the corresponding Markdown article sections in one file.
- `site.mjs` updates the root language, switches labels and visible blocks, falls back to available text, rebuilds the article TOC from visible headings, and dispatches `languagechange`. Gallery, Tech Blog and Footer modules use this event to update language-dependent UI. Theme and language use `lab-theme` and `lab-language` in local storage and continue to work for the session if storage is denied.

## Content and build boundaries

| Content | Source and owner workflow |
| --- | --- |
| Technical writing and essays | Markdown collections and front matter. See [publishing](publishing.md) and the [article template](templates/article.md). |
| Personal copy, profile, and navigation | `_data/home.yml`, `_data/about.yml`, `_data/profile.yml`, `_data/navigation.yml`. Education and work entries are in `about.md`. See [customization](customization.md). |
| Photos | JSON-compatible YAML in `_data/photography.yml`, `photo_categories.yml`, and `photo_tags.yml`, with WebP files under `assets/photography/`. The Sharp script reads private originals, strips image metadata, and produces derivatives and a reviewable import file. The author merges records and supplies missing metadata. See [photography](photography.md). |
| Curated quotes | `_data/quotes.yml` holds original wording, language and source. See [Silly Thoughts](silly-thoughts.md). |

The [Pages workflow](../.github/workflows/pages.yml) uses Ruby 3.3 and Node 22, runs unit tests, builds Jekyll in production mode, checks generated output, runs desktop and mobile Playwright projects, and deploys eligible builds from `main`. The build excludes contributor documentation and the agent progress ledger. See [development](development.md) for local commands and troubleshooting.
