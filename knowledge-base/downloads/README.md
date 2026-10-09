# Study downloads and live trackers

| Artifact | Contents | Use |
| --- | --- | --- |
| [Full knowledge-base PDF](mern-knowledge-base.pdf) | All 25 authored guides, 375 concept references, worked examples, exercises and answered guide prompts | Offline reading; use repository source for copying runnable code |
| [Knowledge tracker workbook](mern-knowledge-tracker.xlsx) | Summary, Concepts, Projects and Resources; 375 concept rows, 20 projects and 51 reviewed resource entries | Edit amber status/recall/evidence cells; summary formulas update |
| [Native Google Sheets knowledge tracker](https://docs.google.com/spreadsheets/d/1w5i9gPhJqu__SCB577arSWKpyzFM-OAhTCKK4UXDjqM/edit) | The same four tabs with native table dropdown chips and progress formulas | Owner's private connected account; repository readers can download the workbook and import a copy |
| [Interview PDF, Word plan, Excel and CSV files](../../interview-handbook/downloads/README.md) | Interview revision, answered bank and schedule/tracking documents | Focused interview preparation |
| [Native interview planner](https://docs.google.com/spreadsheets/d/1qv2QV0GggbD07a_JYlhir__9PxiIjKEQEbz103HR0H0/edit) | Earlier interview study tracker | Owner's private connected account |

Exports are dated 2026-10-09. Individual resource review dates remain their recorded dates. All project entries have core learning source; the [scope matrix](../../projects/interview-ready/mern-workspace/PRODUCT_LAB.md) identifies extensions. Concept depth labels are explicit: an original reference definition is different from a direct worked example.

Rebuild the PDF with `python scripts/export-knowledge-pdf.py` after installing [artifact requirements](../../scripts/requirements-artifacts.txt). The workbook uses `@oai/artifact-tool`; run `node scripts/build-knowledge-workbook.mjs` in an environment with that optional authoring library. Neither library is needed to download and use these files. Generate canonical source first with `npm run build:knowledge`. Native Google Sheets corrections use its connector and retain private sharing; editing a local workbook does not automatically sync the owner's live Sheet.
