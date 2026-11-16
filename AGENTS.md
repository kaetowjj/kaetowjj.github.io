# Jerry's Engineering Lab

A bilingual personal site for engineering writing, essays, and photography. Keep it static: Jekyll 4.4, Liquid, Kramdown/Markdown, YAML/JSON, CSS, and browser-native JavaScript modules. Node.js runs Sharp, validation scripts, and tests. GitHub Actions builds the site for GitHub Pages.

## Start or resume work

- Read this guide and the relevant project state before planning. After context compaction or when starting or recovering a session, reload the guide and applicable documents. Inspect Git status and reconcile the working tree with [the progress ledger](progress.json) and [the backlog](docs/BACKLOG.md). Preserve owner edits.
- Use backlog IDs, dependencies, and acceptance criteria to resume the next approved unfinished item within the owner's current scope. Continue through approved, unblocked items without seeking confirmation after each subtask. Reopen completed work only when evidence shows a regression.
- Read [Architecture](docs/ARCHITECTURE.md) for routes, shared layouts, content contracts, or browser behavior. Read [Decisions](docs/DECISIONS.md) before revisiting an established choice. Consult the owner manuals below. [Requirements V2](docs/requirements-v2.md), earlier plans, and [validation history](docs/validation.md) describe historical states.

## Repository map

| Path | Responsibility |
| --- | --- |
| `index.html`, `tech.html`, `essays.html`, `photography.html`, `about.md`, `404.html` | Public pages and route entry points |
| `_tech/`, `_essays/` | Bilingual articles, front matter, and dates |
| `_layouts/`, `_includes/`, `_plugins/` | Shared Liquid rendering and build-time Tech Blog tag keys |
| `_data/`, `assets/` | Editable site content and metadata, site/media assets, and browser modules |
| `scripts/`, `tests/`, `.github/workflows/pages.yml` | Image processing, checks, and publishing |
| `docs/`, `.codex/`, `progress.json` | Owner manuals, contributor guidance, project agent roles, and handoff state |

## Site conventions

- Use `_tech/` for all technical writing at `/tech/:name/` with optional lowercase-normalized tags. Preserve archive date ordering, shareable tag URLs and history, and independent tag links. Keep tag links outside article title links. Keep Essays separate. Keep sitemap and basic SEO. Reintroducing feeds, separate Notes or Projects collections, or required technical category/type fields needs an explicit owner request.
- Keep both article languages in one Markdown file with `markdown="1"` and blank lines around and inside each language container. Preserve fallback content, the visible-language TOC, and tolerance of denied storage access.
- Keep Home's headline and short intro in `_data/home.yml` and the full Exploring and Beyond Engineering copy in `_data/about.yml`. Preserve the complete bilingual paragraphs. Recent Posts excludes Demo items before sorting Tech and Essays by publication date and taking up to three. Keep the empty state and source labels.
- Preserve the current typography, layouts, accessible focus/hover behavior, theme variables, and shared Dot Wave fallback and motion controls unless the task calls for a change. Keep Footer social links independent of its randomly selected curated quote. Preserve the quote's original text, language, and provenance.
- Photography keeps equal visual priority and aspect ratio, combines one category and one tag, and sorts on capture date with undated images last in both directions and ID as the tie-breaker. The viewer follows visible results. Preserve keyboard and touch navigation, focus restoration, and native lightbox dialog focus trapping. Use lowercase kebab-case taxonomy IDs and run `node scripts/check-photography.mjs` for taxonomy changes. Report invalid references and preserve photo files and unrelated metadata. Keep original photos and coordinates private and retain metadata stripping in the image pipeline.
- Use data or collections for editable content. Preserve existing owner content, approved profile facts, and Demo labels. Keep unprovided personal facts as explicit placeholders. Keep real-data browser tests resilient to changes in content counts, IDs, titles, and profile values.

## Multi-agent workflow

For every non-trivial development task, the primary agent acts as **Coordinator** and delegates to actual native Codex subagents using the project roles under [`.codex/agents/`](.codex/agents/). Trivial content corrections may be handled directly. If native subagents are unavailable, notify the owner before any single-agent fallback. Report the actual agents and roles used, and identify any fallback. A single agent must never simulate subagents.

| Role | Assignment |
| --- | --- |
| `coordinator` | The primary decomposes work, assigns ownership, integrates changes, and verifies the result. A spawned coordinator advises the primary. |
| `architect` | Propose boundaries, tradeoffs, compatibility rules, and implementation order. |
| `explorer` | Trace existing behavior, dependencies, and repository evidence. |
| `developer` | Implement changes within assigned files and run focused checks. |
| `reviewer` | Independently review the integrated diff against requirements and project rules. |
| `tester` | Run assigned checks and report results, environmental failures, and coverage gaps. |

1. Assign each task an objective, baseline or prerequisites, read scope, exclusive writable paths or read-only status, explicit acceptance criteria, and expected evidence. Architect, Explorer, and Reviewer are read-only. Tester may write generated output in an assigned directory or slot. Assign test source edits to a Developer.
2. Run independent tasks in parallel only when their writes and generated outputs are isolated. A file has one writer at a time, including the Coordinator. Sequence overlapping work with an explicit handoff. Use isolated outputs or serialize commands that write to `_site/`, `.jekyll-cache/`, or Playwright outputs. Workers report out-of-scope changes and dependencies for reassignment. Start each new task batch with fresh subagents.
3. The primary integrates work, runs checks against the integrated diff, and requires independent review for significant changes. Review and testing may overlap on a stable diff. Rerun affected checks after fixes.
4. The primary is the sole writer of shared progress state. Save a checkpoint after each completed task by synchronizing the backlog and `progress.json` by task ID, verified status, and evidence. Record unfinished work and reproducible issues, and label optional improvements as proposals.

Codex loads the project roles from a trusted repository. Subagents operate within the parent session's permissions. Open a new session at the repository root after changing the guidance or agent catalog. See [Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).

### Failure handling and recovery

- For a recoverable failure, give the existing subagent targeted error evidence and request a correction. If the approach is fundamentally incorrect, end that assignment and give a fresh subagent a revised, self-contained task. Transfer file ownership before the replacement starts work.
- Limit automatic retries to two per task, including retries by a replacement agent. Request owner approval before retrying further. Record unresolved failures and blockers in the backlog and `progress.json`, and continue independent, approved work when safe. Keep the original acceptance criteria in force.

## Local validation and completion

Run checks from the repository root. See [development setup](docs/development.md) for Ruby 3.3 with Bundler, Node 22, Windows DevKit, and Chromium. In a fresh checkout, run `npm ci` and `bundle install`. Preview with `bundle exec jekyll serve --livereload`.

```powershell
npm test
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build --strict_front_matter --trace
npm run check:site
npx playwright install chromium
npm run test:browser
```

Playwright uses generated `_site/` and separate Jekyll fixtures. Use desktop and mobile checks for interaction or layout changes. Local work is done when acceptance criteria are met, relevant tests pass, required independent review is complete, and applicable documentation and progress are current. Report changed files, actual checks and results, and any failures, skips, or limitations. Local completion and production release are separate milestones.

## Git and production release

GitHub Pages Source is **GitHub Actions**. [`pages.yml`](.github/workflows/pages.yml) is the sole authorized production publisher. Keep branch-based publishing disabled and production publishing confined to this workflow. For migration evidence and rollback, see the [Pages migration record](docs/PAGES-MIGRATION.md).

Preserve the pipeline order. Install locked dependencies, run unit tests, build Jekyll in strict mode, check the generated site, and run Playwright. Upload the tested `_site` artifact and deploy that same artifact. Keep all gates required for deployment. Fix failures at their source. Never weaken checks to get a green deployment or edit tests solely to conceal implementation failures.

1. Keep implementation local. Obtain explicit owner approval for material architectural decisions, scope expansion, destructive actions, and changes to workflow files, deployment settings, or release procedures. Before requesting Git or release approval, review Git status and the proposed diff, complete the local checks and review above, and list the exact files proposed for commit along with known failures and outstanding risks.
2. Obtain explicit owner authorization before committing, pushing, merging, or manually deploying. Treat any action that can trigger production, including a push or merge to `main`, as a release action. Present proposed deployment changes before implementing them.
3. After an authorized release, confirm Actions succeeded, match the active deployment to the intended commit and tested artifact, and smoke-test the production site. Record the run, deployment outcome, and unresolved issues. Mark a production release complete only after these checks.

## Public repository hygiene

Include durable, non-sensitive instructions and engineering records in proposed commits when appropriate. Keep credentials, private execution logs, local machine paths, sensitive personal information, original photos and their metadata out of Git. Verify Jekyll excludes agent-only files and internal documentation from `_site/` before publication.

## Documentation synchronization

Update the primary manual when behavior or owner workflows change: [publishing](docs/publishing.md) for articles, [photography](docs/photography.md) for photos and import, [customization](docs/customization.md) for site and profile settings, [Silly Thoughts](docs/silly-thoughts.md) for quotes, and [development](docs/development.md) for tooling and deployment. Update Architecture when the system map or contracts change and record material decisions in Decisions with their rationale and evidence. Update README only for changes to project positioning, core features, or documentation navigation. Preserve historical records and article templates.
