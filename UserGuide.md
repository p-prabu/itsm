# ITSM Register — User Guide

> A friendly, practical guide to using the ITSM Register — no ITIL certification required.

---

## Table of Contents

1. [What this app is for](#what-this-app-is-for)
2. [Which ticket type should I use?](#which-ticket-type-should-i-use)
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

ITSM Register gives you four lightweight registers that follow the **ITIL** way of tracking IT work:

- An **Incident Register** for when something is broken or not working the way it should.
- A **Service Request Register** for when someone needs something new or changed as a standard service.
- A **Problem Register** for root-cause investigation of recurring or high-impact issues.
- A **Change Register** for planned modifications that need approval, scheduling, implementation, and review.

Each ticket has the fields an ITIL-aligned team would expect — Impact, Urgency, Priority, Status, Assignee, SLA targets, evidence links, linked tickets, work notes, and activity history — but it still runs entirely in your browser. No login, no server, no subscription.

---

## Which ticket type should I use?

Use this simple test:

> **Was it working before, and now it isn't?**
> → **Incident**
>
> **Is this a request for something new, different, or approved as a standard service?**
> → **Service Request**
>
> **Are you investigating the underlying cause behind repeated or significant incidents?**
> → **Problem**
>
> **Are you planning to implement a controlled change to infrastructure, software, access, or service configuration?**
> → **Change**

### Examples

| Situation | Type | Why |
|---|---|---|
| My laptop won't turn on. | Incident | A working service (my laptop) has stopped working. |
| I need a new laptop for a new hire starting Monday. | Service Request | Brand-new provisioning. |
| I can't log in to SharePoint — it keeps saying "access denied". | Incident | I had access and now I don't; a working service is down for me. |
| I'd like access to the Finance SharePoint site. | Service Request | I never had access; I'm asking for new entitlement. |
| Outlook keeps crashing every time I open a meeting. | Incident | Outlook should work; it's failing. |
| Please install Visio on my laptop. | Service Request | I'm asking for new software. |
| We have had six VPN incidents this week and need to find the common cause. | Problem | This is root-cause analysis across related incidents. |
| We need to patch the VPN concentrator during Saturday maintenance. | Change | This is a planned modification with approval and scheduling. |
| The printer on Floor 3 is jammed. | Incident | A service (that printer) is not working. |
| Can we add a new printer on Floor 5? | Service Request | Net-new capability. |
| VPN keeps dropping every 10 minutes. | Incident | VPN is meant to stay connected. |
| Please set up VPN for our new contractor. | Service Request | New provisioning. |

If you're not sure, ask: *"What does done look like?"*

- If done = **service restored**, it's an incident.
- If done = **new thing delivered**, it's a request.
- If done = **root cause understood and documented**, it's a problem.
- If done = **planned change implemented and reviewed**, it's a change.

---

## Getting started

The app is hosted on GitHub Pages, so there's nothing to install. Just open the URL your admin shared with you — it looks like:

```
https://<username>.github.io/<repo>/
```

You'll land on the **Dashboard** with some sample tickets loaded so you can see it in action. When you're ready to start fresh, go to **Settings → Clear all data**. From then on, everything you create is saved in your browser automatically.

No account to create. No password. Just use it.

> **One-time bookmark.** Add the site to your bookmarks bar so it's one click away. On first load your browser will cache React, Babel, and the UI fonts — so subsequent loads are fast and work even if you briefly lose internet.

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

The app also calculates **response due** and **resolution due** targets from the ticket priority. If needed, these can be manually adjusted later in the drawer.

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

## Raising a problem

1. Click **+ New Problem** in the sidebar or press `P`.
2. Fill in the core fields like title, description, service, impact, urgency, and assignment.
3. Use **Linked Tickets** to connect the problem to related incidents or requests such as `INC00012`.
4. As the investigation progresses, capture:

| Field | What to put here |
|---|---|
| **Root Cause** | The technical or process cause behind the repeated issue. |
| **Workaround** | A temporary way to reduce impact until the permanent fix is ready. |
| **Known Error** | The documented known-error statement or vendor reference. |
| **Resolution** | The permanent corrective action once the problem is solved. |

Typical flow:
- **New** when the investigation is opened
- **Under Investigation** while analysis is in progress
- **Root Cause Identified** once the cause is known
- **Known Error** if a workaround or known-error record is established
- **Resolved** when the permanent fix is delivered
- **Closed** when the investigation is complete

The app will stop you from moving to certain statuses without the required fields. For example, you cannot mark a problem as **Root Cause Identified** without entering the root cause.

---

## Raising a change request

1. Click **+ New Change** in the sidebar or press `C`.
2. Enter the business reason, service, impact, urgency, assignee, and approver.
3. Fill in the delivery controls:

| Field | What to put here |
|---|---|
| **Change Type** | Standard, Normal, or Emergency. |
| **Reason** | Why the change is needed. |
| **Implementation Plan** | Step-by-step plan for carrying out the change. |
| **Test Plan** | How you will validate success. |
| **Backout Plan** | How to reverse the change if it fails. |
| **Linked Tickets** | Related incidents, problems, or requests such as `PRB00003` or `INC00012`. |

Typical flow:
- **Draft** while the change is being prepared
- **Pending Approval** while sign-off is awaited
- **Approved** once authorized
- **Scheduled** once the execution window is agreed
- **Implementation** during execution
- **Review** after implementation checks
- **Completed** once the change is successfully finished

Rejected and cancelled changes require confirmation. Completed changes also preserve the implementation history in the audit log.

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

### Problems

```
  New ──► Under Investigation ──► Root Cause Identified ──► Known Error ──► Resolved ──► Closed
                                   │
                                   └──► On Hold
```

- **New** — Investigation is opened.
- **Under Investigation** — Analysis is underway.
- **Root Cause Identified** — The underlying cause is known.
- **Known Error** — Workaround and known-error statement are documented.
- **On Hold** — Waiting on vendor input, logs, maintenance, or another dependency.
- **Resolved** — Permanent corrective action is implemented.
- **Closed** — Investigation is complete and records are finalized.

### Changes

```
  Draft ──► Pending Approval ──► Approved ──► Scheduled ──► Implementation ──► Review ──► Completed
      │               │
      └───────────────┴──► Rejected / Cancelled
```

- **Draft** — Change is being prepared.
- **Pending Approval** — Waiting for sign-off.
- **Approved** — Authorized to proceed.
- **Scheduled** — Planned into a maintenance window.
- **Implementation** — Work is actively being carried out.
- **Review** — Post-change verification and review.
- **Completed** — Work finished successfully.
- **Rejected / Cancelled** — Not going ahead.

---

## Working a ticket

Click any ticket in any register to open the drawer.

You can:

- **Update any field** — changes save when you click Save Changes.
- **Add work notes** — a timestamped journal entry showing what you did, who you spoke to, what you tried.
- **Change status** — milestone timestamps are captured automatically, and reopening a ticket clears stale terminal dates.
- **Manage linked tickets** — store lightweight references such as `INC00012`, `PRB00003`, or `CHG00007`.
- **Add evidence links** — attach URLs or reference text for documents, screenshots, vendor advisories, or approvals.
- **Review activity history** — status changes, assignment updates, SLA edits, evidence changes, and reopen events are logged automatically.
- **Fill in Resolution / Fulfillment / Implementation fields** — capture what actually fixed it, delivered it, or changed it.
- **Delete** the ticket — permanent, no undo. Use with care; usually you want Cancelled or Closed instead.

---

## The Dashboard

The Dashboard gives you a one-glance status of your queue:

- **KPI tiles** for open incidents, open requests, open problems, open changes, and tickets awaiting approval.
- **Priority bars** showing how many open tickets sit at each priority.
- **Recent Activity** across all four registers.
- **Queue intelligence** around breached tickets, scheduled changes, and ownership discipline.

Click a KPI tile to jump to its register.

---

## Searching, filtering, and sorting

Each register table has:

- **Search box** — searches title, ticket number, description, assignee, and reporter/requester. Fast and forgiving.
- **Status filter** — narrow to a single status (e.g. *In Progress*).
- **Priority filter** — narrow to P1 only, etc.
- **Breach filter** — switch between All, On Track, Due Soon, and Breached.
- **Saved views** — store common queue slices for each register.
- **Preset views** — examples include My Open, Breached, Unassigned, Awaiting Approval, Scheduled, and On Hold > 3 Days.

The filter row is sticky while you scroll the table.

---

## Settings

### Appearance

Three themes: **Light**, **Dark**, **Soft Dark**. Pick whichever is easier on your eyes. The setting persists.

### Team defaults

- **Operator name** — used for work notes, activity entries, and "My Open" filtering.
- **Assignment groups** — maintain the team list used in tickets.
- **Services catalog** — maintain the service list shown in ticket forms.

### SLA policy

For each priority `P1` to `P4`, you can configure:

- **Response hours**
- **Resolution hours**

New tickets inherit these targets automatically. If a particular ticket needs an exception, its due dates can be overridden in the drawer.

### Data — Export / Import

- **Export JSON** — downloads a file `itsm-register-YYYY-MM-DD.json` with everything.
- **Export CSV** — downloads a flat reporting snapshot for spreadsheet work.
- **Import (Replace)** — load a JSON file and overwrite everything currently in the browser. Prompts for confirmation.
- **Import (Merge)** — load a JSON file and add only records that aren't already here. Good for combining two people's data.
- **Load sample data** — wipes current data and loads the built-in demo set. Useful for demos or training.
- **Clear all data** — wipes everything. Double-confirms.

### Saved views and ITIL reference

Settings also keeps:

- your saved queue views
- an embedded ITIL quick reference
- all counters and policy settings carried in JSON export/import

---

## Backing up your data

Your data lives in your browser's `localStorage`. That's robust for day-to-day use, but **anything that clears site data will wipe the register** — clearing browsing history, uninstalling the browser, reinstalling the OS, a browser profile reset, a privacy-cleaner extension, etc.

**Back up regularly:**

- For personal use — export JSON once a week.
- For a small team — export daily.
- Keep the JSON files somewhere safe — OneDrive, Google Drive, a folder in Dropbox, Git, wherever.

The exported JSON preserves incidents, requests, problems, changes, SLA targets, saved views, evidence links, linked tickets, and activity history.

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
| `P` | Raise a new problem |
| `C` | Raise a new change request |
| `1` | Go to Dashboard |
| `2` | Go to Incidents |
| `3` | Go to Service Requests |
| `4` | Go to Problems |
| `5` | Go to Changes |
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
- **Use Problems for recurring incidents.** If you keep solving the symptom, open a problem and link the incidents.
- **Use Changes for planned risk.** If work needs approval, test planning, or rollback thinking, it should be a change.
- **Priority is not negotiable by mood.** Set Impact and Urgency honestly; let the matrix do its job.
- **Export before any risky action** — changing browsers, clearing cache, installing extensions, updating OS.

---

## Troubleshooting

**My data disappeared after I cleared browser history.**
`localStorage` counts as "browsing data". If you didn't export a backup, it's gone. Export regularly from now on.

**I opened the file from a different folder and my data is gone.**
Browsers treat each file path as its own origin. Move the file back to the original folder, or export from one location and import in the other.

**Import says "not a valid ITSM export".**
The JSON needs to contain the exported state wrapper with ticket arrays and settings. Older exports still import, but badly edited files may not.

**The app won't load — just a blank page.**
Most likely one of:
- The browser blocked React or Babel from loading (restrictive corporate firewall, or offline on first visit). The app needs to reach `unpkg.com` and `fonts.googleapis.com` once to cache the libraries; after that it works offline.
- JavaScript is disabled. Enable it.
- You opened `index.html` directly from your hard drive via `file://...`. The intended deployment is GitHub Pages — use the `https://...github.io/...` URL your admin shared.

**Everything looks wrong / misaligned.**
You're probably on an old browser. Open in Chrome, Edge, Firefox, or Safari (recent versions).

**Two people's data got mixed up.**
Use Import (Replace) to overwrite with a known-good export, or Import (Merge) to combine two exports. Merge keeps the highest ticket counters so new `INC`, `REQ`, `PRB`, and `CHG` numbers stay unique.

---

## Glossary

| Term | Meaning |
|---|---|
| **ITIL** | The industry framework for managing IT services. ITIL 4 is the current version. |
| **ITSM** | Information Technology Service Management — the discipline ITIL codifies. |
| **Incident** | An unplanned interruption to a service. |
| **Service Request** | A formal request for something new — access, hardware, software, info. |
| **Problem** | The record used to investigate and document the underlying cause of one or more incidents. |
| **Change** | A planned modification that is reviewed, approved, scheduled, implemented, and checked. |
| **Impact** | How broadly something is felt (how many people, how critical the process). |
| **Urgency** | How quickly a fix or delivery is needed. |
| **Priority** | The resulting work order derived from Impact × Urgency. |
| **SLA** | Service Level Agreement — the promised response / resolution time. This app tracks target dates and breach state locally. |
| **CI** | Configuration Item — a service or asset being managed. In this app, the Services Catalog is a flat CI list. |
| **Work Notes** | The running journal of what has been done on a ticket. |
| **Activity Log** | The automatic history of status, SLA, assignment, evidence, and linked-ticket changes. |
| **Resolution** | The final answer on an incident — what fixed it. |
| **Fulfillment** | The final answer on a service request — what was delivered. |

---

*Questions, ideas, or bugs? The code lives mainly in `app.jsx`, with `styles.css` and `index.html` supporting it. Open the files in any editor and tinker.*
