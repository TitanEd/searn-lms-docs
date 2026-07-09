# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`searn-lms-docs` is a documentation-only repository — there is no source code, build system, or test suite here. It holds end-user–facing documentation for the SEARN Capacity Building Platform (a customized Open edX deployment for regulatory/competency training for health authorities). This repo is one of several independent repositories that make up the broader SEARN workspace; the platform code itself lives in sibling repos (`edx-platform`, `searn-custom-extensions`, the `mfes/*` micro-frontends, etc.), not here.

Current contents:
- `SEARN_Pilot_User_Guide.docx` — the Pilot User Guide (Word document), covering platform walkthroughs for each user role during the NRA Pilot phase. As of the current draft (v1.1), it documents workflows for:
  - **SEARN Secretariat**: onboarding NRAs and training providers, managing competency frameworks, the training catalogue, countries, pending requests, users, roles/permissions, and org profiles.
  - **NRA Admin/Leadership**: managing users and roles, NRA-specific competency frameworks and training catalogues, uploading trainings, reviewing feedback.
  - Additional role-specific sections for NRA Manager and NRA Staff further in the document.
- `LICENSE` — MIT License (TitanEd Online Learning).
- `README.md` — placeholder (title only).

## Working in this repo

- There is nothing to build, lint, or test — changes here are purely documentation edits.
- `SEARN_Pilot_User_Guide.docx` is a binary Word document. It cannot be read or edited directly as text; to inspect its contents, extract `word/document.xml` from the zip archive (e.g. `unzip -p SEARN_Pilot_User_Guide.docx word/document.xml`) rather than trying to open it as plain text.
- When asked to update or reason about the guide's content, prefer making edits through a tool that can properly read/write `.docx` XML (or ask the user for a plain-text/Markdown source) rather than attempting freeform binary edits.
- If new documentation is added, keep it consistent with the existing guide's audience/role structure (SEARN Secretariat, NRA Admin/Leadership, NRA Manager, NRA Staff) since that mirrors the platform's actual RBAC roles defined in `role_assignment` within `searn-custom-extensions`.
