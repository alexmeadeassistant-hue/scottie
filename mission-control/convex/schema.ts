import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const statusEnum = v.union(
  v.literal("todo"),
  v.literal("in_progress"),
  v.literal("blocked"),
  v.literal("review"),
  v.literal("done")
);

const stageEnum = v.union(
  v.literal("idea"),
  v.literal("outline"),
  v.literal("script"),
  v.literal("thumbnail"),
  v.literal("production"),
  v.literal("published")
);

const jobStatusEnum = v.union(
  v.literal("scheduled"),
  v.literal("running"),
  v.literal("paused"),
  v.literal("completed"),
  v.literal("failed")
);

const agentStatusEnum = v.union(
  v.literal("idle"),
  v.literal("working"),
  v.literal("error"),
  v.literal("offline")
);

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: statusEnum,
    assigneeType: v.union(v.literal("human"), v.literal("agent")),
    assigneeName: v.optional(v.string()),
    source: v.optional(v.string()),
    sessionKey: v.optional(v.string()),
    priority: v.optional(v.number()),
    dueAt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdBy: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_session", ["sessionKey"])
    .index("by_assignee", ["assigneeName"]),

  contentItems: defineTable({
    title: v.string(),
    stage: stageEnum,
    owner: v.optional(v.string()),
    notes: v.optional(v.string()),
    assetUrls: v.optional(v.array(v.string())),
    relatedTaskId: v.optional(v.id("tasks")),
    updatedBy: v.optional(v.string()),
    updatedAt: v.string(),
  }).index("by_stage", ["stage"]),

  scheduledJobs: defineTable({
    label: v.string(),
    cronExpression: v.optional(v.string()),
    nextRunAt: v.optional(v.string()),
    status: jobStatusEnum,
    linkedSessionKey: v.optional(v.string()),
    metadata: v.optional(v.object({})),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_status", ["status"]),

  memories: defineTable({
    title: v.string(),
    summary: v.string(),
    topic: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    capturedAt: v.string(),
    sourcePath: v.optional(v.string()),
    rawContent: v.string(),
  })
    .index("by_topic", ["topic"])
    .index("by_capturedAt", ["capturedAt"]),

  agents: defineTable({
    name: v.string(),
    role: v.optional(v.string()),
    status: agentStatusEnum,
    skills: v.optional(v.array(v.string())),
    lastHeartbeatAt: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    defaultTools: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
  }).index("by_status", ["status"]),

  activityLogs: defineTable({
    actor: v.string(),
    actorType: v.union(v.literal("human"), v.literal("agent"), v.literal("system")),
    event: v.string(),
    message: v.optional(v.string()),
    taskId: v.optional(v.id("tasks")),
    sessionKey: v.optional(v.string()),
    payload: v.optional(v.object({})),
    createdAt: v.string(),
  })
    .index("by_actor", ["actor"])
    .index("by_task", ["taskId"])
    .index("by_session", ["sessionKey"]),
});
