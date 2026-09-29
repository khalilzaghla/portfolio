import { z } from "zod";

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(), // Exact verified value or "TBD"
  definition: z.string().optional(), // Metric definition and measurement context
  verified: z.boolean().default(false),
});

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  summary: z.string().max(300),
  category: z.enum([
    "computer-vision",
    "data-engineering",
    "machine-learning",
    "rag",
  ]),
  featured: z.boolean().default(false),
  technologies: z.array(z.string()),
  links: z.object({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    report: z.string().url().optional(),
  }),
  metrics: z.array(ProjectMetricSchema).default([]),
  keyArchitectureDecision: z.string().optional(),
  status: z.enum(["completed", "in-progress", "experimental"]).default("completed"),
});

export type ProjectMeta = z.infer<typeof ProjectSchema>;
export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;
