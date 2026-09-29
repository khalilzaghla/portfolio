import { z } from "zod";

export const SkillCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  skills: z.array(z.string()),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string(),
  location: z.string(),
  period: z.string(),
  bullets: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const EducationItemSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  period: z.string(),
  details: z.array(z.string()),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
