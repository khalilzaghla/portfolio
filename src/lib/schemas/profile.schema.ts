import { z } from "zod";

export const SkillCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  domainRole: z.string(),
  accent: z.enum(["data", "cv", "graph", "genai", "system"]),
  description: z.string(),
  skills: z.array(z.string()),
});

export const ExperienceTypeSchema = z.enum([
  "internship",
  "leadership",
  "academic",
  "project",
]);

export const ExperienceItemSchema = z.object({
  id: z.string(),
  type: ExperienceTypeSchema,
  role: z.string(),
  organization: z.string(),
  location: z.string(),
  period: z.string(),
  badgeLabel: z.string().optional(),
  summary: z.string().optional(),
  bullets: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  location: z.string(),
  period: z.string(),
  details: z.array(z.string()),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type ExperienceType = z.infer<typeof ExperienceTypeSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
