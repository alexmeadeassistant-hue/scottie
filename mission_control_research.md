# Mission Control Research (2026-02-18)

## Goal
Create a Mission Control dashboard similar to Alex Finn’s setup that lets Alex and Scottie track agent work, content pipelines, calendars, memory, team structure, and a visual “office,” without writing everything from scratch.

## Recommended Architecture

| Layer | Recommendation | Why |
| --- | --- | --- |
| Frontend | **Next.js 15 (App Router) + Tailwind + shadcn/ui + Framer Motion** | Matches Alex Finn’s pattern, strong component ecosystem, server actions for secure mutations, animations for office view. |
| Backend | **Convex** (real-time database + functions) | Provides automatic real-time sync, simple schema, built-in auth, and integrates well with OpenClaw webhooks (see manish-raana/openclaw-mission-control). |
| State sources | 1) Convex tables (tasks, content items, calendar events, team, office avatars) 2) Local API routes to read/write workspace files (e.g., `~/.openclaw/workspace/memory/`) when needed. | Keeps live UI in sync while still letting us surface existing markdown memory/history. |
| Integration | **OpenClaw internal hooks → Convex HTTP endpoint** plus optional `gog` (Gmail/Calendar) bridge. | Lets agent runs push status updates, tasks, errors, and log lines automatically into Mission Control. |
| Auth | Convex Auth + magic links, limited to Alex + fiancé. | Lightweight but secure; avoids managing passwords. |

## Reference Implementations
1. **manish-raana/openclaw-mission-control** – Convex + React example with webhook handler that ingests OpenClaw lifecycle events (start/progress/end). Shows data model for tasks, comments, resources, and agent roster.
2. **abhi1693/openclaw-mission-control** and **crshdn/mission-control** – Next.js dashboards that expose API routes for tasks/agents and proxy requests to the OpenClaw gateway.
3. **Jason Zhu Mission Control prompt (X.com/GoSailGlobal)** – Outlines pattern of fetching data from both Convex and local filesystem API routes to surface workspace knowledge (memories, logs) in UI.

These repos provide scaffolding (Convex schema, Next.js layout, Kanban components) that can be adapted instead of reinventing everything.

## Component-by-Component Plan

### 1. Tasks Board
- **Schema**: `tasks` table with `title`, `description`, `status`, `assignee` (`human` | `agent`), `source`, `sessionKey`, `priority`, `dueAt`.
- **Sync**: OpenClaw hook posts `start` events → create `In Progress` task; `end` → move to `Done`; `error` → `Review`.
- **Manual input**: UI form so Alex can add/assign tasks to Scottie; server action writes to Convex and optionally kicks off a new OpenClaw session via gateway API.

### 2. Content Pipeline
- **Schema**: `content_items` with stage enum (`idea`, `outline`, `script`, `thumbnail`, `filming`, `published`), `assetUrls`, `notes`.
- **Flows**: Add quick idea entry component; nightly cron (OpenClaw) reviews idea column, suggests scripts, and updates stage.
- **Attachments**: Use Convex file storage or S3; allow links to Google Drive/Notion.

### 3. Calendar / Scheduled Tasks
- **Data**: Combine Convex `scheduled_jobs` table + `gog calendar events list` (read-only) to show real events and agent cron jobs in one view.
- **Automation**: When we add cron jobs via `openclaw cron add`, simultaneously POST event to Convex so Mission Control stays aligned. Provide ICS export for validation.

### 4. Memory Screen
- **Indexing**: Build Convex `memories` table that mirrors `MEMORY.md` entries. Nightly script reads `memory/*.md`, parses headings, and upserts into the table.
- **UI**: Document viewer with global search (Convex full-text search or MiniSearch in browser). Offer filters (date, topic, person) and quick links back to source files.

### 5. Team Screen
- **Schema**: `agents` table (name, role, description, skills, default tools) + `subagents` relationships.
- **Usage**: Document recurring sub-agents (researcher, writer, engineer). Display status (= last heartbeat, running tasks) by subscribing to Convex updates created from OpenClaw hooks.

### 6. Office View
- **Data**: Derive from tasks + agent status; each avatar reflects `status` (idle, working, error). Use Framer Motion for animation.
- **Fun extras**: Display live log snippet when hovered, maybe background color per queue load.

## Implementation Steps
1. **Bootstrap project**
   ```bash
   npx create-next-app@latest mission-control --ts --tailwind --app
   npx convex dev
   ```
2. **Define Convex schema** for `tasks`, `content_items`, `scheduled_jobs`, `memories`, `agents`, `activity_logs`.
3. **Build webhook endpoint** (`/api/openclaw/event`) that validates shared secret and writes to Convex. Register via `~/.openclaw/config.jsonc` hooks and restart gateway.
4. **Create UI shells** for each tab (Tasks, Content, Calendar, Memory, Team, Office). Use Tabler/Lucide icons for clarity.
5. **Wire real-time queries** with Convex `useQuery` hooks; add optimistic server actions for updates.
6. **Integrate gog** if we want Gmail/Calendar context (requires `gog auth add ...`). Use Next.js route handlers to proxy to `gog` CLI or Gmail API for multi-user sharing.
7. **Deploy** (Convex deploy + Vercel). Restrict access via Convex Auth (email allowlist = Alex + fiancé).
8. **Iterate**: Add automation flows (e.g., button to spawn OpenClaw sub-agent from a task, script generator for content pipeline).

## Risks & Mitigations
- **Webhook Reliability**: Use queue + retry logic in handler; log failures to Convex `hook_errors` table.
- **Data Drift**: If tasks are created outside the dashboard, ensure we parse OpenClaw memory files nightly to reconcile.
- **Auth**: Keep Mission Control private; rotate tokens. Use Vercel environment variables for secret URLs.
- **Maintenance**: Document schema + scripts in repo; add tests for parser jobs.

## Next Actions
1. Confirm tech stack (Next.js + Convex). 
2. Clone starter repo (manish-raana) and adapt to Alex’s requirements.
3. Draft custom prompts/instructions for each component so Scottie can auto-generate updates.
4. Once MVP live, hook into cron + memory ingestion routines.
