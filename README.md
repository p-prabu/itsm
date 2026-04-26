# ITSM Register — Technical Documentation

> A self-contained, offline-first ITIL-aligned register for Incidents, Service Requests, Problems, and Changes.
> Source is split into HTML / CSS / JSX for easy customisation. Data stays in your browser — no backend.

---

## Table of Contents

1. [Overview](#overview)
2. [ITIL Alignment](#itil-alignment)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Data Storage](#data-storage)
6. [Data Schema](#data-schema)
7. [Priority Matrix](#priority-matrix)
8. [Import / Export Format](#import--export-format)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [File Structure](#file-structure)
11. [Hosting Options](#hosting-options)
12. [Browser Compatibility](#browser-compatibility)
13. [Privacy & Security](#privacy--security)
14. [Backup & Portability](#backup--portability)
15. [Known Limitations](#known-limitations)
16. [Version History](#version-history)

---

## Overview

ITSM Register is a **client-side web application** built from three source files — `index.html`, `styles.css`, and `app.jsx`. There is no backend, no database server, no cloud dependency, and no build step required. Babel Standalone transpiles JSX in the browser at runtime.

It is designed for small IT teams (or individuals) to capture and track four kinds of records aligned with the ITIL framework:

- **Incidents** — unplanned interruptions to an existing service, raised when something that was working has stopped working.
- **Service Requests** — formal user requests for something new, raised when asking for access, hardware, software, or information that isn't currently provisioned.
- **Problems** — root-cause investigations used to track recurring or high-impact underlying issues behind one or more incidents.
- **Changes** — controlled requests to implement planned modifications to infrastructure, applications, access, or services.

**Key design principles:**
- Zero dependencies to install — React, ReactDOM, and Babel load from CDN
- Clean separation of HTML / CSS / JSX makes the layout easy to tweak
- Data stays on the user's own machine (browser `localStorage`)
- Each browser's data is independent — export/import JSON to move between machines

---

## ITIL Alignment

The app implements the core ITIL 4 distinction across four practical ticket types. The field sets and status flows are chosen to match the lightweight operational patterns most ITIL-aligned tools use out of the box.

| Concept | ITSM Register implementation |
|---|---|
| Incident | `type: "incident"` record with auto-numbered ID `INC00001`... |
| Service Request | `type: "request"` record with auto-numbered ID `REQ00001`... |
| Problem | `type: "problem"` record with auto-numbered ID `PRB00001`... |
| Change | `type: "change"` record with auto-numbered ID `CHG00001`... |
| Impact | Three levels — High / Medium / Low |
| Urgency | Three levels — High / Medium / Low |
| Priority | Auto-derived from a 3×3 Impact × Urgency matrix, P1–P4 |
| Incident status flow | New → Assigned → In Progress → On Hold → Resolved → Closed (plus Cancelled) |
| Request status flow | New → Pending Approval → Approved → In Progress → On Hold → Fulfilled → Closed (plus Rejected) |
| Work Notes | Timestamped operator notes added to each ticket |
| Activity Log | Automatic history for status, assignment, SLA, evidence, and ticket-link changes |
| Resolution / Fulfillment / Change plans | Free-text fields captured as workflow guardrails require |
| Categories | Incident, Request, Problem, and Change each have dedicated category lists in `app.jsx`. |
| Services (CI list) | User-editable list in Settings |
| Ticket relationships | Manual linked ticket references by ticket number (e.g. `INC00012`, `PRB00003`) |

What's intentionally **not** included (out of scope for a lightweight single-file tool):
- Knowledge / Release processes
- CMDB beyond the flat services list
- SLA clocks or automated escalation beyond local target/breach indicators
- Full CAB / approval engine automation
- Role-based access control

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| UI Framework | React | 18 (UMD) | Component-based UI rendering |
| JSX Transpiler | Babel Standalone | Latest | Transpiles JSX in the browser at runtime |
| Styling | React inline styles + CSS variables | — | Theme-aware surfaces with shared typography classes |
| Global CSS | `styles.css` | — | Layout, effects, table styling, drawer, futuristic theme |
| Fonts | Google Fonts (Orbitron, Space Grotesk, JetBrains Mono) | — | Display, UI, and data typography roles |
| Storage | `localStorage` | Browser native | Persistent data storage, no server needed |
| Data Interchange | JSON | — | Export / Import for backup and portability |

All external resources (React, ReactDOM, Babel, Google Fonts) are loaded from CDN. After the first page load, the app logic runs entirely in the browser.

---

## Architecture

ITSM Register follows a **single-page application (SPA)** pattern with all logic inside one React `App` component tree. Source is split across three files:

```
ITSM/
├── index.html        — Page shell: CDN script tags, stylesheet link, #root div, app.jsx
├── styles.css        — Global CSS (reset, pills, buttons, drawer, date picker, table)
├── app.jsx           — All React code, transpiled in-browser by Babel Standalone
│   ├── Constants         — THEMES, CATEGORIES, STATUSES, PRIORITY_MATRIX, SERVICES
│   ├── Helpers           — date formatting, ID/ticket-number generation, priority calc
│   ├── loadState /       — localStorage read/write
│   │   saveState
│   ├── PriorityPill      — coloured P1–P4 badge
│   ├── StatusPill        — coloured status badge
│   ├── DatePicker        — custom calendar component
│   ├── Input / Select /  — themed form primitives
│   │   Textarea / Btn
│   ├── Drawer            — slide-in form for create/edit
│   ├── Register          — table view with search, preset filters, saved views, SLA state
│   ├── Dashboard         — KPI stats, priority bars, recent activity
│   ├── Settings          — theme, services catalog, import/export, clear/reset
│   └── App               — Main app: sidebar, view router, shortcuts
├── README.md         — This file
└── UserGuide.md      — End-user guide and ITIL primer
```

### Where to edit what

| To change... | Edit |
|---|---|
| Layout, positioning, spacing, colours, fonts | `styles.css` (global rules) or inline styles in `app.jsx` (per-component) |
| Theme palette (Light / Dark / Soft Dark) | `THEMES` object at the top of `app.jsx` |
| Field sets (categories, statuses, request types) | The constants block in `app.jsx` |
| Priority matrix | `PRIORITY_MATRIX` in `app.jsx` |
| Page shell, CDN versions, page title | `index.html` |

After any edit, reload the browser tab. No build step, no restart of the dev server.

State shape:

```js
{
  incidents: Incident[],
  requests:  ServiceRequest[],
  problems:  Problem[],
  changes:   Change[],
  settings:  {
    theme,
    services,
    assignmentGroups,
    operatorName,
    incCounter,
    reqCounter,
    prbCounter,
    chgCounter,
    slaPolicy,
    savedViews
  }
}
```

State is persisted on every change via a `useEffect` that writes to `localStorage`.

---

## Data Storage

All data is stored in **browser `localStorage`** under a single key:

```
itsm-register-v3
```

The value is a JSON string containing the full app state (incidents, requests, problems, changes, and settings). Every state mutation triggers a re-serialization to `localStorage`, so data is durable across browser restarts.

**Storage characteristics:**
- Per-origin, per-browser (Chrome and Firefox have separate stores for the same file)
- Persists until the user manually clears site data
- ~5–10 MB quota per origin (far more than a typical ticket volume needs)
- Opening the file as `file://` — each local path is its own origin; moving the `.html` to a new folder starts a fresh store

**Storage is NOT shared** between different machines, different browsers on the same machine, or across incognito windows. Use JSON export/import to move data.

---

## Data Schema

### Shared operational fields

All four ticket types share:

```js
{
  id:               string,
  ticketNo:         string,
  type:             "incident" | "request" | "problem" | "change",
  title:            string,
  description:      string,
  category:         string,
  service:          string,
  impact:           "High" | "Medium" | "Low",
  urgency:          "High" | "Medium" | "Low",
  priority:         "P1" | "P2" | "P3" | "P4",
  status:           string,
  assignee:         string,
  assignmentGroup:  string,
  pendingReason:    string,
  dueDatesManual:   boolean,
  responseDueAt:    ISO 8601 string,
  resolutionDueAt:  ISO 8601 string,
  assignedAt:       ISO 8601 string | null,
  lastWorkedAt:     ISO 8601 string | null,
  createdAt:        ISO 8601 string,
  updatedAt:        ISO 8601 string,
  closedAt:         ISO 8601 string | null,
  linkedTickets:    string[],
  evidence:         { id: string, label: string, url: string, reference: string }[],
  workNotes:        { at: ISO string, by: string, note: string }[],
  activityLog:      { id: string, at: ISO string, action: string, note: string, meta: object }[]
}
```

### Incident record

```js
{
  type:        "incident",
  status:      "New" | "Assigned" | "In Progress" | "On Hold"
             | "Resolved" | "Closed" | "Cancelled",
  reporter:    string,
  resolution:  string,
  resolvedAt:  ISO 8601 string | null,
}
```

### Service Request record

```js
{
  type:              "request",
  requestType:       "Access" | "Hardware" | "Software" | "Information" | "Change" | "Other",
  status:            "New" | "Pending Approval" | "Approved" | "In Progress"
                   | "On Hold" | "Fulfilled" | "Rejected" | "Closed",
  requester:         string,
  approver:          string,
  fulfillmentNotes:  string,
  fulfilledAt:       ISO 8601 string | null,
}
```

### Problem record

```js
{
  type:              "problem",
  status:            "New" | "Under Investigation" | "Root Cause Identified"
                   | "Known Error" | "On Hold" | "Resolved" | "Closed",
  reporter:          string,
  rootCause:         string,
  workaround:        string,
  knownError:        string,
  resolution:        string,
  resolvedAt:        ISO 8601 string | null
}
```

### Change record

```js
{
  type:                "change",
  status:              "Draft" | "Pending Approval" | "Approved" | "Scheduled"
                     | "Implementation" | "Review" | "Completed"
                     | "Rejected" | "Cancelled",
  requester:           string,
  approver:            string,
  changeType:          "Standard" | "Normal" | "Emergency",
  reason:              string,
  implementationPlan:  string,
  backoutPlan:         string,
  testPlan:            string,
  implementationSummary: string,
  completedAt:         ISO 8601 string | null
}
```

---

## Priority Matrix

Priority is computed automatically whenever Impact or Urgency changes, using the standard ITIL 3×3 matrix:

| Impact \ Urgency | High | Medium | Low |
|---|---|---|---|
| **High**   | P1 · Critical | P1 · Critical | P2 · High |
| **Medium** | P2 · High     | P2 · High     | P3 · Medium |
| **Low**    | P3 · Medium   | P3 · Medium   | P4 · Low |

The derived priority is displayed as a read-only pill in the ticket form. Users cannot override it directly — they adjust Impact and Urgency, and priority follows.

---

## Import / Export Format

**Export** writes a file named `itsm-register-YYYY-MM-DD.json` containing:

```json
{
  "incidents": [ /* full incident records */ ],
  "requests":  [ /* full request records */ ],
  "problems":  [ /* full problem records */ ],
  "changes":   [ /* full change records */ ],
  "settings":  {
    "theme": "...",
    "services": [...],
    "assignmentGroups": [...],
    "operatorName": "...",
    "incCounter": N,
    "reqCounter": N,
    "prbCounter": N,
    "chgCounter": N,
    "slaPolicy": { "P1": { "responseHours": N, "resolutionHours": N } },
    "savedViews": [ /* per-register saved filters */ ]
  },
  "exportedAt": "2026-04-24T10:15:00.000Z",
  "version": 3
}
```

**Import (Replace)** — overwrites the entire local state with the imported file. Prompts for confirmation.

**Import (Merge)** — adds only records whose `id` is not already present locally. Useful for combining two people's registers without losing either side's data. Merge also recalculates the next `INC`, `REQ`, `PRB`, and `CHG` counters so future ticket numbers remain unique.

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `I` | Raise a new incident |
| `R` | Submit a new service request |
| `P` | Raise a new problem |
| `C` | Raise a new change request |
| `1` | Go to Dashboard |
| `2` | Go to Incidents |
| `3` | Go to Service Requests |
| `4` | Go to Problems |
| `5` | Go to Changes |
| `Esc` | Close the open ticket drawer |
| `Enter` (in work notes input) | Add the work note |

Shortcuts are suppressed while typing inside an input, textarea, or select, so you can still type letters like `i` and `r` in any field.

---

## Running it

Because the source is split into multiple files, modern browsers will refuse to load `app.jsx` and `styles.css` when you open `index.html` via `file://` (CORS policy on local files). The app needs to be served over HTTP or HTTPS. The intended deployment is **GitHub Pages** — see the next section for the 2-minute walkthrough.

If you want to preview locally before pushing, see [Local development](#local-development-optional) further down.

---

## Deploy to GitHub Pages

The app has no build step, so "deploy" just means *push the folder to GitHub and turn Pages on*.

### One-time setup

1. **Create the repo.** In the `ITSM` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial ITSM Register"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable Pages.** On GitHub → repo → **Settings** → **Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `root`
   - Click **Save**.

3. **Wait ~30–60 seconds.** GitHub builds and publishes. Your app will be live at:
   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   A green tick next to the commit means it's deployed.

### Every future update

```bash
git add .
git commit -m "tweak colours"
git push
```

Pages rebuilds automatically (takes ~30 seconds). Reload the tab to see changes.

### What's already configured for you

| File | Purpose |
|---|---|
| `.nojekyll` | Tells GitHub Pages *not* to run Jekyll processing. Important — without it, any future files starting with `_` would be silently ignored. |
| `.gitignore` | Keeps local OS files (`.DS_Store`), editor config, and exported JSON backups out of the repo. |

### Tips for a Pages deployment

- **Don't use private data in a public repo.** If you've exported JSON with real tickets and committed it, it's public. `.gitignore` excludes `itsm-register-*.json` by default; keep it that way.
- **Custom domain?** Settings → Pages → Custom domain. Add a `CNAME` file with your domain name (just the domain, no `http://`).
- **Private Pages.** Requires GitHub Pro / Team / Enterprise. Repo → Settings → Pages → "Private" visibility.
- **Every user's `localStorage` is separate**, even on the same Pages URL. Two teammates visiting the same site see separate data. Use Export / Import (Merge) JSON to share records.

---

## Local development (optional)

Only needed if you want to preview edits before pushing to Pages. `index.html` can't be opened directly via `file://` — use any static file server. Pick whichever you already have:

| Tool | Command (run in the `ITSM` folder) |
|---|---|
| Python (usually preinstalled) | `python3 -m http.server 8000` → open `http://localhost:8000` |
| Node | `npx serve` |
| VS Code | Install "Live Server" extension → right-click `index.html` → *Open with Live Server* |

Edit any source file, save, reload the browser tab. No build step needed.

The simplest workflow is often **skip local dev entirely** — push to a branch, GitHub Pages auto-deploys in ~30 seconds, and you can iterate straight on the live URL since nothing is user-visible until you share it.

---

## File Structure

```
ITSM/
├── index.html      — Page shell (CDN tags, links to styles.css and app.jsx)
├── styles.css      — All stylesheet rules
├── app.jsx         — All React application code
├── .nojekyll       — Tells GitHub Pages to skip Jekyll processing
├── .gitignore      — Keeps OS/editor junk and JSON backups out of the repo
├── README.md       — This file (technical documentation)
└── UserGuide.md    — End-user guide and ITIL primer
```

No build step, no `node_modules`, no config files. The browser does the JSX transpilation via Babel Standalone at page load.

---

## Hosting Options

GitHub Pages is the intended deployment — see [Deploy to GitHub Pages](#deploy-to-github-pages) above. Other static hosts work identically:

| Option | How | Notes |
|---|---|---|
| **GitHub Pages** (recommended) | `git push` then enable Pages in Settings | Free, HTTPS, auto-deploys on push. |
| Netlify / Vercel / Cloudflare Pages | Drag-and-drop the folder, or connect the repo | Free tier fine for a register this small. |
| S3 / Azure Blob / any static host | Upload the folder as a website | All users share an origin, but `localStorage` stays per-browser. |
| Internal web server | Drop the folder on IIS / nginx / Apache | Same behaviour. Best for internal-only data. |
| Docker | Any static-file image (nginx:alpine) pointing at the folder | Useful for internal deployment. |

For shared-team workflows where multiple people see the same tickets, use **Import (Merge)** regularly to consolidate — or migrate to a real ITSM tool.

---

## Browser Compatibility

Works in any modern evergreen browser:

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+

Requires JavaScript, `localStorage`, and CSS Grid. No IE support.

---

## Privacy & Security

- **No data leaves your browser.** There are no network requests after the initial CDN load except the CDN-hosted UI assets (React, ReactDOM, Babel, and fonts).
- **No analytics, no telemetry, no tracking.** The file is inert HTML.
- **No authentication.** Anyone who can open the file can read and edit the local store. If the machine is shared, consider using a per-user browser profile.
- **localStorage is readable** by other scripts running on the same origin. If you host this somewhere, do not load any untrusted third-party scripts on the same URL.
- Ticket data may contain sensitive information (staff names, access requests, incident details). Treat the exported JSON with the same care you would a spreadsheet of the same data.

---

## Backup & Portability

Browsers can clear `localStorage` without warning (site-data cleanup, profile reset, "clear browsing data"). **Export to JSON regularly** if your register contains anything you care about.

Recommended cadence:
- Weekly full export for personal use
- Daily export for a small team

The JSON files are plain text and diff cleanly in Git if you want to version-control your register.

---

## Known Limitations

- **Single-user per browser.** No real-time multi-user sync.
- **No binary attachments.** The app stores link/reference evidence only.
- **No email notifications.** There is no server to send from.
- **Reporting is lightweight.** Dashboard plus CSV export, but no dedicated analytics module.
- **No true multi-user audit identity.** Activity logs are local and rely on the configured operator name.
- **No role-based permissions.** Everyone who has the file can do everything.
- **Approval is still lightweight.** Status guardrails exist, but there is no CAB engine or approval inbox.
- **Storage quota.** ~5 MB per origin. Enough for tens of thousands of tickets, but keep an eye on it if you paste huge descriptions.

---

## Version History

| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-04-24 | Initial release — Dashboard, Incidents, Service Requests, Settings. |
| 1.1 | 2026-04-24 | Source split into `index.html` / `styles.css` / `app.jsx` for easier customisation. |
| 2.0 | 2026-04-26 | Added SLA targets, breach indicators, assignment groups, audit activity, evidence links, saved views, CSV export, and improved 2050 UI/typography. |
| 3.0 | 2026-04-26 | Added first-class Problem and Change ticket types, new counters `PRB`/`CHG`, ITIL-lite workflows, linked-ticket relationships, expanded dashboard coverage, and four-register import/export compatibility. |

---

*Built to share the WorkLog philosophy: no backend, your data stays on your machine, but source split into three files so the layout is easy to change.*
