"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";
import { EXPERIENCES, EDUCATION } from "@/lib/data/experience";
import type { ExperienceItem } from "@/lib/schemas/profile.schema";

function getExperienceIcon(type: ExperienceItem["type"]) {
  switch (type) {
    case "internship":
      return Briefcase;
    case "leadership":
      return Users;
    default:
      return Briefcase;
  }
}

export function Experience() {
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
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 md:py-28 px-4 border-b border-border/40 scroll-mt-14"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="flex flex-col gap-12"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Career &amp; Academics
            </span>
            <h2
              id="experience-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Experience &amp; Education
            </h2>
            <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
              Documented research and engineering internships, national engineering degree
              curriculum, and student leadership in applied AI.
            </p>
          </div>

          {/* Part 1: Professional Experience & Internships */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <Briefcase className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Internships &amp; Technical Leadership
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              {EXPERIENCES.map((item) => {
                const Icon = getExperienceIcon(item.type);
                const isRnD = item.id === "anavid-internship";

                return (
                  <div
                    key={item.id}
                    className={`p-6 rounded-lg bg-card border transition-colors duration-150 flex flex-col gap-5 ${
                      isRnD
                        ? "border-cyan-500/30 bg-card/90"
                        : "border-border/60 hover:border-border"
                    }`}
                  >
                    {/* Header Row: Role, Organization, Period, Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-md border shrink-0 mt-0.5 ${
                            isRnD
                              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                              : "bg-secondary/50 border-border text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-foreground text-base tracking-tight">
                              {item.role}
                            </h4>
                            {item.badgeLabel && (
                              <span
                                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                                  isRnD
                                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                                    : "bg-secondary/60 text-muted-foreground border-border/60"
                                }`}
                              >
                                {item.badgeLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground/80 mt-0.5">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      {/* Meta: Period & Location */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs font-mono text-muted-foreground shrink-0 pl-11 sm:pl-0">
                        <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                          <span>{item.period}</span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground/70">
                          <MapPin className="w-3 h-3" aria-hidden="true" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    {item.summary && (
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed italic border-l-2 border-border/80 pl-3">
                        {item.summary}
                      </p>
                    )}

                    {/* Bullets */}
                    <ul className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-1">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Tag Row */}
                    <div className="pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-secondary/40 text-muted-foreground border border-border/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part 2: Academic Background & Degrees */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <GraduationCap className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Academic Degrees &amp; Preparatory Program
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-lg bg-card border border-border/60 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                          {edu.period}
                        </span>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base tracking-tight mt-0.5">
                          {edu.institution}
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground shrink-0">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        <span>{edu.location}</span>
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5 pt-2 border-t border-border/30">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-xs font-mono text-emerald-400">
                        {edu.field}
                      </p>
                    </div>

                    <ul className="flex flex-col gap-2 mt-2 text-xs text-muted-foreground leading-relaxed">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-muted-foreground/60 select-none">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
