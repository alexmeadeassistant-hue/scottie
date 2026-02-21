const missionStats = [
  { label: "Active runs", value: "3", trend: "+2 vs. yesterday" },
  { label: "Open tasks", value: "11", trend: "4 due this week" },
  { label: "Content pieces", value: "6", trend: "2 ready for review" },
  { label: "Cron jobs", value: "7", trend: "Heartbeat OK" },
];

const taskColumns = [
  {
    name: "Scanning",
    items: [
      {
        title: "Inbox + mentions sweep",
        meta: "Scottie • 6:40 PM",
        detail: "Flagged 2 unreads for morning follow-up",
      },
    ],
  },
  {
    name: "In motion",
    items: [
      {
        title: "GripScript retail pack v2",
        meta: "Alex • due tonight",
        detail: "Need CTA + testimonials drop-in",
      },
      {
        title: "Mission Control UI shell",
        meta: "Scottie • live demo",
        detail: "Tabs + data wiring checklist",
      },
    ],
  },
  {
    name: "Review",
    items: [
      {
        title: "Press release edits",
        meta: "Christian • tomorrow",
        detail: "Incorporate South Shore quote",
      },
    ],
  },
];

const pipeline = [
  {
    stage: "Ideas",
    count: 12,
    highlight: "3 new this week",
  },
  {
    stage: "Script",
    count: 4,
    highlight: "Need B-roll notes",
  },
  {
    stage: "Publish",
    count: 1,
    highlight: "Newsletter draft ready",
  },
];

const upcoming = [
  {
    title: "Breakfast demo – RCC",
    detail: "Show Mission Control to Miles (Ops)",
    when: "Tomorrow • 8:00 AM ET",
  },
  {
    title: "GripScript retail sync",
    detail: "South Shore + NYC Golf Center",
    when: "Fri • 3:00 PM ET",
  },
];

const agents = [
  {
    name: "Scottie",
    role: "Command",
    status: "Live",
    note: "Watching cron + email",
  },
  {
    name: "Rory",
    role: "GripScript R&D",
    status: "Idle",
    note: "Ready for sourcing brief",
  },
  {
    name: "Atlas",
    role: "Data viz",
    status: "Queued",
    note: "Waiting for calendar export",
  },
];

const activity = [
  {
    time: "9:05 PM",
    label: "Cron",
    text: "Daily weather + commute summary sent",
  },
  {
    time: "8:47 PM",
    label: "Task",
    text: "Mission Control UI shell generated",
  },
  {
    time: "8:12 PM",
    label: "Signal",
    text: "Vic.ai meeting notes synced",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
            Mission Control · Preview 0.1
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                Alex & Scottie · Operating Room
              </h1>
              <p className="mt-3 text-lg text-zinc-400">
                Real-time glance at tasks, content, cron jobs, and agent status—purpose-built
                for a two-person command center.
              </p>
            </div>
            <div className="flex gap-3 text-sm text-zinc-400">
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 font-medium text-emerald-300">
                Live demo mode
              </span>
              <span className="rounded-full border border-zinc-800 px-4 py-2">
                Last sync · 9:07 PM ET
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {missionStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-wide text-zinc-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.trend}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {taskColumns.map((column) => (
            <div key={column.name} className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-wide text-zinc-400">{column.name}</p>
                <span className="text-xs text-zinc-500">{column.items.length} items</span>
              </div>
              <div className="mt-4 space-y-4">
                {column.items.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-base font-medium text-white">{item.title}</p>
                    <p className="text-sm text-zinc-400">{item.meta}</p>
                    <p className="mt-2 text-sm text-zinc-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-7">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-5 lg:col-span-4">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-zinc-400">Content Pipeline</p>
              <span className="text-xs text-zinc-500">Live from Convex</span>
            </div>
            <div className="mt-6 space-y-4">
              {pipeline.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-white">{stage.stage}</p>
                    <p className="text-zinc-400">{stage.highlight}</p>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      style={{ width: `${Math.min(stage.count / 12, 1) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-zinc-400">Upcoming</p>
              <span className="text-xs text-zinc-500">Next 3 days</span>
            </div>
            <div className="mt-4 space-y-4">
              {upcoming.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-base font-medium text-white">{item.title}</p>
                  <p className="text-sm text-zinc-400">{item.detail}</p>
                  <p className="mt-2 text-sm text-emerald-300">{item.when}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-zinc-400">Agents on deck</p>
              <span className="text-xs text-zinc-500">Status feed</span>
            </div>
            <div className="mt-4 space-y-4">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4">
                  <div>
                    <p className="text-base font-medium text-white">{agent.name}</p>
                    <p className="text-sm text-zinc-400">{agent.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-300">{agent.status}</p>
                    <p className="text-xs text-zinc-500">{agent.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-zinc-400">Activity log</p>
              <span className="text-xs text-zinc-500">Last hour</span>
            </div>
            <div className="mt-4 space-y-4">
              {activity.map((entry) => (
                <div key={entry.text} className="flex items-start gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-sm text-zinc-500">{entry.time}</div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-emerald-300">{entry.label}</p>
                    <p className="text-sm text-white">{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 pt-6 text-sm text-zinc-500">
          Built with Next.js + Convex · Placeholder data wired for demo · Hooks ready for OpenClaw events.
        </footer>
      </div>
    </div>
  );
}
