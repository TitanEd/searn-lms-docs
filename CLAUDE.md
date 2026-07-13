# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`searn-lms-docs` is a documentation-only repository — no application code, no test suite. It is a [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) site that publishes the SEARN Capacity Building Platform Pilot User Guide (end-user–facing docs for a customized Open edX deployment used for regulatory/competency training for health authorities), published to GitHub Pages at <https://docs.searn-lms.titaned.com/>. This repo is one of several independent repositories in the broader SEARN workspace; the platform code itself lives in sibling repos (`edx-platform`, `searn-custom-extensions`, the `mfes/*` micro-frontends, etc.), not here.

`SEARN_Pilot_User_Guide.docx` at the repo root is the original approved Word draft the site content was derived from. It is a legacy/reference artifact, not the live source — the actual, editable content is the Markdown under `docs/`. It's a binary zip archive; if you ever need to inspect it, extract `word/document.xml` (e.g. `unzip -p SEARN_Pilot_User_Guide.docx word/document.xml`) rather than reading it as plain text.

## Commands

```bash
pip install -r requirements.txt   # installs mkdocs-material (the only dependency)
mkdocs serve                      # local preview at http://127.0.0.1:8000, live-reloads on edits
mkdocs build --strict             # what CI runs; --strict turns warnings (e.g. broken internal links) into failures
```

There is no lint/test step beyond the strict build. Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs `mkdocs build --strict` and publishes the `site/` output to GitHub Pages via `actions/deploy-pages`. GitHub Pages must stay set to **Settings → Pages → Source: GitHub Actions** for this to work.

## Structure

- `mkdocs.yml` — site config: nav tree, theme, markdown extensions. **The `nav:` list is the source of truth for site structure** — a new page under `docs/` is invisible on the site until added here.
- `docs/*.md` — the actual guide content, one file per role/topic (`secretariat.md`, `nra-admin.md`, `nra-manager.md`, `nra-staff.md`, plus `index.md`, `before-you-begin.md`, `logging-in.md`, `how-tos.md`, `feedback.md`). This mirrors the platform's real RBAC roles defined in `role_assignment` within `searn-custom-extensions` — keep any new role-specific content consistent with that structure.
- `docs/img/logo.png` — site logo/favicon; `docs/stylesheets/extra.css` — custom brand styling on top of Material (SEARN blue `#2a3b8f`, re-skinned header/tabs to match Claude Code's docs look — see the comment at the top of the file for the rationale).
- `docs/img/<Role Name>/` — one screenshot subfolder per role page (e.g. `docs/img/NRA Admin/`, `docs/img/SEARN Secretariat/`), named to match the nav label, not the `.md` filename. Screenshots are named after the task they illustrate (e.g. `Add New User.png`) and referenced from Markdown with URL-encoded spaces, e.g. `![alt text](img/NRA%20Admin/Add%20New%20User.png)`. When adding a new screenshot, put it in the matching role folder and match this pattern.
- `docs/CNAME` — GitHub Pages custom domain (`docs.searn-lms.titaned.com`); copied into the built `site/` automatically by MkDocs since it lives in `docs/`. Don't remove it or Pages reverts to the default `*.github.io` domain (this happened before — see git history).
- Each guide page follows a fixed pattern for tasks: **The story** (why), **Navigation** (where to click), **Steps**, **Outcome**. Follow this pattern when adding new task documentation so pages stay consistent.
