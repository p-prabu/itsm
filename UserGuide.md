# ITSM Register — User Guide

> A friendly, practical guide to using the ITSM Register — no ITIL certification required.

---

## Table of Contents

1. [What this app is for](#what-this-app-is-for)
2. [Incident vs. Service Request — when to use which](#incident-vs-service-request--when-to-use-which)
3. [Getting started](#getting-started)
4. [Raising an incident](#raising-an-incident)
5. [Submitting a service request](#submitting-a-service-request)
6. [Understanding Priority (Impact × Urgency)](#understanding-priority-impact--urgency)
7. [Status flows](#status-flows)
8. [Working a ticket](#working-a-ticket)
9. [The Dashboard](#the-dashboard)
10. [Searching, filtering, and sorting](#searching-filtering-and-sorting)
11. [Settings](#settings)
12. [Backing up your data](#backing-up-your-data)
13. [Sharing with a teammate](#sharing-with-a-teammate)
14. [Keyboard shortcuts](#keyboard-shortcuts)
15. [Tips & best practices](#tips--best-practices)
16. [Troubleshooting](#troubleshooting)
17. [Glossary](#glossary)

---

## What this app is for

ITSM Register gives you two simple registers that follow the **ITIL** way of tracking IT work:

- An **Incident Register** for when something is broken or not working the way it should.
- A **Service Request Register** for when you want something new.

Each ticket has the fields an ITIL-aligned team would expect — Impact, Urgency, Priority, Status, Assignee, Resolution, Work Notes — but it's all in one HTML file that runs in your browser. No login, no server, no subscription.

---

## Incident vs. Service Request — when to use which

The most common mistake in ITSM tools is logging everything as an incident. Use this simple test:

> **Was it working before, and now it isn't?**
> → **Incident** (something is broken — restore the service)
>
> **Is this a request for something new or different?**
> → **Service Request** (standard service delivery — fulfil the request)

### Examples

| Situation | Type | Why |
|---|---|---|
| My laptop won't turn on. | Incident | A working service (my laptop) has stopped working. |
| I need a new laptop for a new hire starting Monday. | Service Request | Brand-new provisioning. |
| I can't log in to SharePoint — it keeps saying "access denied". | Incident | I had access and now I don't; a working service is down for me. |
| I'd like access to the Finance SharePoint site. | Service Request | I never had access; I'm asking for new entitlement. |
| Outlook keeps crashing every time I open a meeting. | Incident | Outlook should work; it's failing. |
| Please install Visio on my laptop. | Service Request | I'm asking for new software. |
| The printer on Floor 3 is jammed. | Incident | A service (that printer) is not working. |
| Can we add a new printer on Floor 5? | Service Request | Net-new capability. |
| VPN keeps dropping every 10 minutes. | Incident | VPN is meant to stay connected. |
| Please set up VPN for our new contractor. | Service Request | New provisioning. |

If you're not sure, ask: *"What would 'done' look like?"*
If done = **service restored**, it's an incident.
If done = **new thing delivered**, it's a request.

---

## Getting started

The app is hosted on GitHub Pages, so there's nothing to install. Just open the URL your admin shared with you — it looks like:

```
https://<username>.github.io/<repo>/
```

You'll land on the **Dashboard** with some sample tickets loaded so you can see it in action. When you're ready to start fresh, go to **Settings → Clear all data**. From then on, everything you create is saved in your browser automatically.

No account to create. No password. Just use it.

> **One-time bookmark.** Add the site to your bookmarks bar so it's one click away. On first load your browser will cache React, Babel, and the DM Sans font — so subsequent loads are fast and work even if you briefly lose internet.

> **One browser = one dataset.** Your tickets live in *this browser's* storage. If you open the same URL in Incognito, or on a different computer, you'll see a separate (empty) register. Use *Settings → Export JSON* to move your data between devices.

---

## Raising an incident

1. Click **+ Raise Incident** in the sidebar (or press `I`).
2. Fill in the fields:

| Field | What to put here |
|---|---|
| **Title** | A short sentence describing the problem. *"VPN disconnects every 10 minutes for Chennai office users."* |
| **Description** | What you were doing when it broke, what you expected, what actually happened, any error messages, how to reproduce. Detail saves time later. |
| **Category** | Pick the closest — Hardware, Software, Network, Access, Email, etc. |
| **Affected Service** | Which service is broken — Email, VPN, SharePoint, Teams, etc. |
| **Impact** | How widely is this felt? (High = many users, Medium = one team, Low = one person) |
| **Urgency** | How soon does it need fixing? (High = business stopped, Medium = workaround exists, Low = cosmetic) |
| **Priority** | Auto-calculated from Impact × Urgency. You don't set this directly. |
| **Status** | Leave as **New** when raising. |
| **Reporter** | Who's raising the incident. |
| **Assignee** | Who will work on it (you can leave blank). |

3. Click **Raise Incident**. A ticket number like `INC00001` is assigned automatically and the ticket appears in the Incidents register.

---

## Submitting a service request

1. Click **+ New Request** in the sidebar (or press `R`).
2. Fill in the fields — these are like an incident, plus:

| Field | What to put here |
|---|---|
| **Request Type** | Access, Hardware, Software, Information, Change, Other. |
| **Approver** | Who needs to sign off (manager, service owner). Free text — just for the record. |
| **Fulfillment Notes** | Filled in later when the request is completed. |

3. Click **Submit Request**. A ticket number like `REQ00001` is assigned.

New requests usually start at **New** and move to **Pending Approval** once they reach someone who can approve.

---

## Understanding Priority (Impact × Urgency)

Priority isn't a guess — it's derived from two things:

- **Impact** — *How much of the business is affected?*
- **Urgency** — *How time-sensitive is the response?*

A server that's down for one person is *low impact, high urgency for them*. The same server down for the whole company is *high impact, high urgency for everyone*. Same problem, different priority.

The matrix:

| Impact \ Urgency | High | Medium | Low |
|---|---|---|---|
| **High** | 🔴 P1 Critical | 🔴 P1 Critical | 🟠 P2 High |
| **Medium** | 🟠 P2 High | 🟠 P2 High | 🟡 P3 Medium |
| **Low** | 🟡 P3 Medium | 🟡 P3 Medium | 🟢 P4 Low |

### Rough guide to picking Impact

- **High** — Whole company, multiple teams, or a critical business process stopped.
- **Medium** — One team or department affected, or a single key person doing critical work.
- **Low** — One person, or a nice-to-have that isn't blocking work.

### Rough guide to picking Urgency

- **High** — Business is stopped right now; there's no workaround.
- **Medium** — It's impacting work, but there's a workaround while we wait.
- **Low** — Not blocking; can wait for next business day or later.

---

## Status flows

### Incidents

```
  New ──► Assigned ──► In Progress ──► Resolved ──► Closed
                          │
                          └──► On Hold (waiting on user / vendor)
                          │
                          └──► Cancelled (raised in error, duplicate)
```

- **New** — Just raised, not yet picked up.
- **Assigned** — Owned by a specific team or person.
- **In Progress** — Someone is actively working it.
- **On Hold** — Waiting for something external (user to reply, vendor, parts).
- **Resolved** — The fix has been applied. Let the user confirm.
- **Closed** — User has confirmed, or time-based auto-close.
- **Cancelled** — Raised in error or duplicate of another ticket.

### Service Requests

```
  New ──► Pending Approval ──► Approved ──► In Progress ──► Fulfilled ──► Closed
                                                                │
  (Rejected at any stage)                                       └──► On Hold
```

- **New** — Just submitted.
- **Pending Approval** — Waiting on the Approver.
- **Approved** — Green-lit, ready to work.
- **In Progress** — Being provisioned.
- **On Hold** — Blocked (awaiting stock, info, etc.).
- **Fulfilled** — Delivered to the requester.
- **Rejected** — Approver said no, or doesn't meet policy.
- **Closed** — Confirmed done and archived.

---

## Working a ticket

Click any ticket in the Incidents or Service Requests table to open the drawer.

You can:

- **Update any field** — changes save when you click Save Changes.
- **Add work notes** — a timestamped journal entry showing what you did, who you spoke to, what you tried. The most valuable field in the whole app when you come back to a ticket three weeks later.
- **Change status** — when you mark as Resolved / Fulfilled / Closed, the timestamp is captured automatically.
- **Fill in Resolution / Fulfillment notes** — what actually fixed it / what was delivered. Future-you will thank present-you.
- **Delete** the ticket — permanent, no undo. Use with care; usually you want Cancelled or Closed instead.

---

## The Dashboard

The Dashboard gives you a one-glance status of your queue:

- **Five KPI tiles** — Open Incidents, Open Requests, Resolved Incidents, Fulfilled Requests, Total Tickets.
- **Priority bars** — How many open tickets sit at each priority (P1 through P4). A healthy queue has few P1s and P2s; a bar full of red is a signal to escalate.
- **Recent Activity** — The 10 most recently updated tickets across both registers. Click any row to open.

Click a KPI tile to jump to its register.

---

## Searching, filtering, and sorting

Each register table has:

- **Search box** — searches title, ticket number, description, assignee, and reporter/requester. Fast and forgiving.
- **Status filter** — narrow to a single status (e.g. *In Progress*).
- **Priority filter** — narrow to P1 only, etc.
- **Click any column header** — sort by that column. Click again to reverse the direction.

The filter row is sticky while you scroll the table.

---

## Settings

### Appearance

Three themes: **Light**, **Dark**, **Soft Dark**. Pick whichever is easier on your eyes. The setting persists.

### Data — Export / Import

- **Export JSON** — downloads a file `itsm-register-YYYY-MM-DD.json` with everything.
- **Import (Replace)** — load a JSON file and overwrite everything currently in the browser. Prompts for confirmation.
- **Import (Merge)** — load a JSON file and add only records that aren't already here. Good for combining two people's data.
- **Load sample data** — wipes current data and loads the built-in demo set. Useful for demos or training.
- **Clear all data** — wipes everything. Double-confirms.

### Services Catalog

The **Affected Service** dropdown on each ticket is editable here. Add services your org uses (e.g. "Salesforce", "Okta", "Confluence") and remove ones you don't. Deleting a service that's referenced by existing tickets doesn't delete those tickets — they'll just show the service name as a text value.

### ITIL Quick Reference

A short primer right inside Settings so you don't have to keep this guide open.

---

## Backing up your data

Your data lives in your browser's `localStorage`. That's robust for day-to-day use, but **anything that clears site data will wipe the register** — clearing browsing history, uninstalling the browser, reinstalling the OS, a browser profile reset, a privacy-cleaner extension, etc.

**Back up regularly:**

- For personal use — export JSON once a week.
- For a small team — export daily.
- Keep the JSON files somewhere safe — OneDrive, Google Drive, a folder in Dropbox, Git, wherever.

The exported JSON is plain text, very small, and imports perfectly back.

---

## Sharing with a teammate

Because data is per-browser and local, real multi-user editing isn't supported. But for a small team you can make it work:

**Option 1 — One central "register keeper":**
One person owns the register. Teammates email or chat you their ticket, and you enter it. You export JSON regularly as a team record.

**Option 2 — Team merge workflow:**
Everyone keeps their own register. Once a day, each person exports JSON and drops it in a shared folder. One designated person imports everyone's file with **Import (Merge)** into their master register and re-shares.

**Option 3 — If you've outgrown this:**
If you need more than 3–5 people editing in real time, you've outgrown a single-file tool. Migrate to ServiceNow, Jira Service Management, Freshservice, or similar. Export your JSON first.

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `I` | Raise a new incident |
| `R` | Submit a new service request |
| `1` | Go to Dashboard |
| `2` | Go to Incidents |
| `3` | Go to Service Requests |
| `Esc` | Close the ticket drawer |
| `Enter` (in work notes box) | Add the work note |

Shortcuts are off while you're typing in any input, so normal typing still works.

---

## Tips & best practices

- **Title should be searchable.** Say what's broken or needed; resist vague titles like "Help".
- **Fill in the description the first time.** You think you'll remember the details. You won't.
- **Log work notes as you go,** not at the end. Takes 10 seconds. Saves hours later.
- **Reassign rather than reopen.** If the first person can't solve it, change the Assignee — don't create a new ticket.
- **Use Cancelled for duplicates** instead of deleting. Keeps your audit trail intact.
- **Resolved ≠ Closed.** Resolved means *the fix is applied*; Closed means *the user has confirmed it's good*. Keep them separate.
- **Priority is not negotiable by mood.** Set Impact and Urgency honestly; let the matrix do its job.
- **Export before any risky action** — changing browsers, clearing cache, installing extensions, updating OS.

---

## Troubleshooting

**My data disappeared after I cleared browser history.**
`localStorage` counts as "browsing data". If you didn't export a backup, it's gone. Export regularly from now on.

**I opened the file from a different folder and my data is gone.**
Browsers treat each file path as its own origin. Move the file back to the original folder, or export from one location and import in the other.

**Import says "not a valid ITSM export".**
The JSON needs to have `incidents` and `requests` arrays. Open the file in a text editor and confirm the structure. If it's from an older version (e.g. just the array, no wrapper), wrap it manually.

**The app won't load — just a blank page.**
Most likely one of:
- The browser blocked React or Babel from loading (restrictive corporate firewall, or offline on first visit). The app needs to reach `unpkg.com` and `fonts.googleapis.com` once to cache the libraries; after that it works offline.
- JavaScript is disabled. Enable it.
- You opened `index.html` directly from your hard drive via `file://...`. The intended deployment is GitHub Pages — use the `https://...github.io/...` URL your admin shared.

**Everything looks wrong / misaligned.**
You're probably on an old browser. Open in Chrome, Edge, Firefox, or Safari (recent versions).

**Two people's data got mixed up.**
Use Import (Replace) to overwrite with a known-good export, or Import (Merge) to combine two exports. If things are really tangled, export what's there, open the JSON in a text editor, clean it up, then re-import.

---

## Glossary

| Term | Meaning |
|---|---|
| **ITIL** | The industry framework for managing IT services. ITIL 4 is the current version. |
| **ITSM** | Information Technology Service Management — the discipline ITIL codifies. |
| **Incident** | An unplanned interruption to a service. |
| **Service Request** | A formal request for something new — access, hardware, software, info. |
| **Impact** | How broadly something is felt (how many people, how critical the process). |
| **Urgency** | How quickly a fix or delivery is needed. |
| **Priority** | The resulting work order derived from Impact × Urgency. |
| **SLA** | Service Level Agreement — the promised response / resolution time. Not tracked in this app; tracked in enterprise ITSM tools. |
| **CI** | Configuration Item — a service or asset being managed. In this app, the Services Catalog is a flat CI list. |
| **Work Notes** | The running log of what has been done on a ticket. The audit trail. |
| **Resolution** | The final answer on an incident — what fixed it. |
| **Fulfillment** | The final answer on a service request — what was delivered. |

---

*Questions, ideas, or bugs? The code lives in `index.html` — open it in any editor and tinker. The entire app is one file, ~900 lines, and uses React from a CDN so you don't need a build step.*
