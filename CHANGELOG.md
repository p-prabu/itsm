# Changelog

All notable changes to ITSM Register are documented here.

## 3.1.0 — 2026-04-28

- Replaced the side drawer with a fullscreen ticket editor workspace for incidents, requests, problems, and changes.
- Added weekday-only SLA target calculation so automatic `Response Due` and `Resolution Due` skip Saturdays and Sundays.
- Replaced the browser-native SLA datetime field with a custom calendar and time picker.
- Fixed dashboard approval drill-down so request and change approval queues no longer mismatch their KPI counts.
- Fixed terminal timestamp handling for `Rejected` and `Cancelled` outcomes.
- Fixed register filtering so explicit status filters can show resolved, fulfilled, completed, rejected, cancelled, and closed records even when open-queue presets are present.

## 3.0 — 2026-04-26

- Added first-class Problem and Change ticket types with `PRB` and `CHG` numbering.
- Added ITIL-lite workflows, linked-ticket references, and expanded dashboard coverage.
- Expanded import/export compatibility across all four ticket types.

## 2.0 — 2026-04-26

- Added SLA targets, breach indicators, assignment groups, audit activity, evidence links, saved views, and CSV export.
- Refreshed the UI with the 2050 theme and improved typography hierarchy.

## 1.1 — 2026-04-24

- Split the source into `index.html`, `styles.css`, and `app.jsx` for easier customization.

## 1.0 — 2026-04-24

- Initial release with dashboard, incidents, service requests, settings, JSON import/export, and GitHub Pages deployment support.
