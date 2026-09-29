import { z } from "zod";

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(), // Exact verified value or "TBD"
  definition: z.string().optional(), // Metric definition and experimental context
  verified: z.boolean().default(false),
});

export const ProjectTypeSchema = z.enum([
  "internship",
  "academic",
  "prototype",
  "personal",
]);

export const ProjectCategorySchema = z.enum([
  "computer-vision",
  "data-engineering",
  "machine-learning",
  "rag",
]);

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  type: ProjectTypeSchema,
  typeLabel: z.string(), // e.g. "R&D Internship", "Academic Data Platform", "Applied Prototype"
  category: ProjectCategorySchema,
  domain: z.string(),
  summary: z.string().max(400),
  problem: z.string(),
  built: z.string(),
  technicalApproach: z.string(),
  keyArchitectureDecision: z.string().optional(),
  limitations: z.string().optional(),
  featured: z.boolean().default(false),
  technologies: z.array(z.string()),
  links: z.object({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    report: z.string().optional(),
  }),
  metrics: z.array(ProjectMetricSchema).default([]),
  status: z.enum(["completed", "in-progress", "experimental"]).default("completed"),
});

export type ProjectMeta = z.infer<typeof ProjectSchema>;
export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;
export type ProjectType = z.infer<typeof ProjectTypeSchema>;
export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
