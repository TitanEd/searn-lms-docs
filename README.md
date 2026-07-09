# searn-lms-docs

Documentation site for the SEARN Capacity Building Platform Pilot User Guide, built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and published to GitHub Pages.

All content is sourced from `SEARN_Pilot_User_Guide.docx` (the approved pilot user guide) and restructured for the web under `docs/`.

## Local preview

```bash
pip install mkdocs-material
mkdocs serve
```

Then open <http://127.0.0.1:8000>.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site with MkDocs and publishes it to GitHub Pages.

For this to work, GitHub Pages must be enabled for this repo: **Settings → Pages → Source: GitHub Actions**.

Once enabled, the site is live at <https://titaned.github.io/searn-lms-docs/>.
