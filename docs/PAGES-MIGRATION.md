# GitHub Pages migration record

**Complete.** The Pages Source is **GitHub Actions**. The repository's [Pages workflow](../.github/workflows/pages.yml) is the sole authorized production publisher. For normal releases, follow [the deployment guide](development.md#deploy) and the [approval policy](../AGENTS.md).

## Why publishing changed

Both the managed branch workflow and the repository workflow deployed commit `0e48b7a3de5b907d9cbc5ad40abb8f7b8b51bebd` on November 15, 2026. The managed build used Jekyll 3.10.0 and reported a Gemfile compatibility warning. The repository workflow used locked Jekyll 4.4.1 and ran the unit, site and browser tests before uploading its artifact. On an earlier commit the managed workflow deployed while the tested deployment was cancelled. The duplicate publishers made it possible to reach production without the repository's test gates. [Managed build log](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791339/job/132713781916) · [Tested run](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791573) · [Earlier managed run](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/42934558325) · [Cancelled custom run](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/42934558599)

## Cutover result

The owner approved a conditional Source switch and one deployment at the recorded SHA. The signed-in Settings → Pages page showed **Deploy from a branch**, with `main` and `/ (root)`. The owner saved **GitHub Actions** and the settings page confirmed the change. No automatic run started. The Coordinator checked that remote `main` still matched the approved SHA and no competing run was pending.

| Evidence | Result |
| --- | --- |
| Approved commit | `0e48b7a3de5b907d9cbc5ad40abb8f7b8b51bebd` |
| Workflow | [Build, test and deploy Engineering Lab, attempt 2](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791573/attempts/2) |
| Artifact | `github-pages` ID `14148876477`, reused from the tested build of that commit |
| Deploy job | [`133045530199`](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791573/job/133045530199), one successful job rerun |
| Environment deployment | [`7813669149`](https://api.github.com/repos/kaetowjj/kaetowjj.github.io/deployments/7813669149/statuses), successful at `2026-11-16T02:03:51Z` |
| Production | [Jerry's Engineering Lab](https://kaetowjj.github.io/) |

The deploy-only rerun reused the original tested artifact. The workflow file and its gates stayed intact. No new workflow dispatch or managed branch deployment appeared during the cutover. The earlier successful custom deployment was `7799155309`. [Prior deployment history](https://api.github.com/repos/kaetowjj/kaetowjj.github.io/deployments/7799155309/statuses)

## Validation

- The original artifact passed 33 unit tests, the strict Jekyll build, checks on 14 generated pages, and 135 Playwright tests with one skip. The deployment log matched the tested artifact ID and exact SHA. [Build job](https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/43681791573/job/132713781464)
- Post-cutover page checks loaded Home and its navigation links, a Tech Blog article and table of contents, the Essays index and reading list entry, Photography with both image tiles, and About. Bilingual switching and the lightbox passed in the pre-cutover smoke test on the same artifact. The post-cutover browser session could not repeat those interactions or directly open the Tech archive.
- The formula still appeared as raw TeX in a live Chrome check. The same symptom existed before the cutover. The cause remains unconfirmed. Keep `BUILD-01` open. [Live article](https://kaetowjj.github.io/tech/reproducible-data-workflows/) · [Backlog](BACKLOG.md)
- Native Tester `production_verifier` independently checked the workflow, test results and artifact. Native Reviewer `pages_outcome_reviewer` checked the approved SHA, lack of a second run and unchanged workflow. No recovery release was needed.
- On the next separately approved `main` push, verify that one custom production deployment follows the test gates. The job rerun already verified the cutover and live publisher; the future push exercises the automatic trigger.

## Recovery

If a run fails before deployment, inspect the failed step and confirm the active production deployment before retrying. For a regression, present a recovery plan through `.github/workflows/pages.yml` using the last known good tested artifact and its recorded SHA. If the artifact has expired, propose re-running all jobs of the eligible known-good `main` workflow run at its recorded SHA. If GitHub cannot rerun it, propose a separately approved recovery release on `main` through the same build and deployment gates. Obtain explicit owner approval for the recovery release, then verify the active SHA and artifact and smoke-test production. Keep the Pages Source on GitHub Actions throughout recovery.

See [the backlog](BACKLOG.md) for `PAGES-01` and `PAGES-02`.
