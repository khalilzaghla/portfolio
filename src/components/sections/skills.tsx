"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Database, Eye, Brain, Sparkles, Terminal, Layers } from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/data/skills";
import type { SkillCategory } from "@/lib/schemas/profile.schema";

const ACCENT_STYLES: Record<
  SkillCategory["accent"],
  {
    badge: string;
    iconBorder: string;
    dot: string;
    techBadge: string;
  }
> = {
  data: {
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    iconBorder: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    dot: "bg-emerald-400",
    techBadge: "hover:border-emerald-500/40 hover:text-emerald-300",
  },
  cv: {
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    iconBorder: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    dot: "bg-cyan-400",
    techBadge: "hover:border-cyan-500/40 hover:text-cyan-300",
  },
  graph: {
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    iconBorder: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    dot: "bg-amber-400",
    techBadge: "hover:border-amber-500/40 hover:text-amber-300",
  },
  genai: {
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    iconBorder: "border-violet-500/30 text-violet-400 bg-violet-500/5",
    dot: "bg-violet-400",
    techBadge: "hover:border-violet-500/40 hover:text-violet-300",
  },
  system: {
    badge: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    iconBorder: "border-sky-500/30 text-sky-400 bg-sky-500/5",
    dot: "bg-sky-400",
    techBadge: "hover:border-sky-500/40 hover:text-sky-300",
  },
};

function getDomainIcon(accent: SkillCategory["accent"]) {
  switch (accent) {
    case "data":
      return Database;
    case "cv":
      return Eye;
    case "graph":
      return Brain;
    case "genai":
      return Sparkles;
    case "system":
      return Terminal;
    default:
      return Layers;
  }
}

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 md:py-28 px-4 border-b border-border/40 scroll-mt-14"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="flex flex-col gap-10"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Pipeline Architecture &amp; Tooling
            </span>
            <h2
              id="skills-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Technical Skills &amp; Engineering Domains
            </h2>
            <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
              Structured around system lifecycle phases rather than arbitrary percentage ratings.
              Every tool and framework is grounded in verified academic implementations, research
              internships, or operational pipelines.
            </p>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = getDomainIcon(category.accent);
              const styles = ACCENT_STYLES[category.accent];
              const isWide = index === 0 || index === 1;

              return (
                <div
                  key={category.id}
                  className={`flex flex-col justify-between p-6 rounded-lg bg-card border border-border/60 hover:border-border transition-colors duration-150 ${
                    isWide ? "lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Top Meta: Icon + Domain Role */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`p-2 rounded-md border inline-flex items-center justify-center shrink-0 ${styles.iconBorder}`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground/80 truncate text-right">
                        {category.domainRole}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-base tracking-tight mb-2">
                      {category.title}
                    </h3>

                    {/* Architectural Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Tag Matrix */}
                  <div className="pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5" aria-label={`${category.title} tools`}>
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-secondary/50 text-foreground/90 border border-border/50 transition-colors ${styles.techBadge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
                            aria-hidden="true"
                          />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Engineering Integrity Callout */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              <span>Zero fabricated proficiency scores — all skills are backed by verifiable codebases.</span>
            </div>
            <a
              href="#projects"
              className="text-foreground hover:underline underline-offset-4 flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <span>Inspect Case Studies</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
