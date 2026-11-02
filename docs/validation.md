# Validation record — 2026-11-02

## Confirmed execution

- Local Jekyll 4.4.1 / Ruby 3.3 build succeeded and generated 10 HTML pages. This execution host needed an external Windows absolute-glob compatibility shim in work/; no shim is shipped with the website.
- GitHub Ubuntu runner built the same source with the normal unmodified command: bundle exec jekyll build --strict_front_matter --trace. Success is recorded at https://github.com/kaetowjj/kaetowjj.github.io/actions/runs/41424646677 .
- The same run passed 12 Node logic/image tests, the 10-page local-link/resource checker, and 14 Playwright browser tests (desktop 1280x900, mobile 390x844; 5.0 seconds). Both build and deploy jobs concluded success.
- HTTP GET https://kaetowjj.github.io/ returned 200 and Engineering Lab title.

## Additional review repairs

Independent code review found fallback TOC omission and responsive derivative filename collisions. Both were fixed. A regression test reproduced the collision before the fix; all 13 Node tests passed after repair. Browser coverage was expanded to 16 tests with actual MathJax output and fallback TOC assertions. See the latest Actions run for the final revision's results.

## Coverage and limits

Language persistence, theme persistence and OS changes, storage denial, category/tag intersection, empty results, both capture-date orders, undated items last, tie stability, viewer keyboard order, Escape/focus restoration, native dialog focus containment, mobile menu/tap navigation, proportions and overflow are automated. Image tests decode WebP files, check thumbnails/EXIF, and run the actual optimizer against EXIF-oriented inputs.

Mobile behavior is tested in Chromium touch emulation, not on a physical phone. The supplied photos are labeled abstract Demo placeholders with fictional metadata. MathJax is a fixed-version external CDN dependency and needs a network connection. The local Windows Playwright harness completed its assertions but did not terminate cleanly; the Linux CI browser job is the authoritative completed result.
