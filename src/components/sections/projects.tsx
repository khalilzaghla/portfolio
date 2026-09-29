"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Code2,
  ArrowUpRight,
  FileText
} from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data/projects";
import type { ProjectCategory } from "@/lib/schemas/project.schema";

const CATEGORY_FILTERS: readonly { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Systems", value: "all" },
  { label: "Computer Vision", value: "computer-vision" },
  { label: "Data Engineering", value: "data-engineering" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "GenAI & RAG", value: "rag" },
];

const ACCENT_STYLES: Record<
  ProjectCategory,
  {
    badge: string;
    border: string;
    dot: string;
    text: string;
    metricBorder: string;
  }
> = {
  "computer-vision": {
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
    text: "text-cyan-400",
    metricBorder: "border-cyan-500/20 bg-cyan-500/5",
  },
  "data-engineering": {
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    metricBorder: "border-emerald-500/20 bg-emerald-500/5",
  },
  "machine-learning": {
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    text: "text-amber-400",
    metricBorder: "border-amber-500/20 bg-amber-500/5",
  },
  rag: {
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    border: "border-violet-500/30",
    dot: "bg-violet-400",
    text: "text-violet-400",
    metricBorder: "border-violet-500/20 bg-violet-500/5",
  },
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
      id="projects"
      aria-labelledby="projects-heading"
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
              Technical Case Studies &amp; Implementations
            </span>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Engineering Systems &amp; Evidence
            </h2>
            <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
              Verifiable architectures across video intelligence, data ingestion platforms,
              streaming graph analytics, and retrieval-augmented search. Every system details the
              engineering constraints, architecture decisions, and experimental outcomes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2 pb-2 border-b border-border/40"
            role="tablist"
            aria-label="Filter projects by domain"
          >
            {CATEGORY_FILTERS.map((filter) => {
              const isActive = activeCategory === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(filter.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-border/50"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Projects List / Grid */}
          <div className="flex flex-col gap-8">
            {filteredProjects.map((project) => {
              const styles = ACCENT_STYLES[project.category];

              return (
                <article
                  key={project.slug}
                  id={project.slug}
                  className="p-6 sm:p-8 rounded-lg bg-card border border-border/60 hover:border-border transition-colors duration-150 flex flex-col gap-6"
                >
                  {/* Top Header: Meta, Domain, Classification, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-border/40">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono border ${styles.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}
                            aria-hidden="true"
                          />
                          <span>{project.typeLabel}</span>
                        </span>

                        <span className="text-xs font-mono text-muted-foreground/80">
                          {project.domain}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mt-1">
                        {project.title}
                      </h3>
                    </div>

                    {/* Links & Repository */}
                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Read case study for ${project.title}`}
                      >
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Case Study</span>
                      </Link>
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-secondary/50 hover:bg-secondary border border-border text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`View repository for ${project.title} (opens in new tab)`}
                        >
                          <Code2 className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                          <span>Code</span>
                          <ArrowUpRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  {/* Verified Experimental Evidence & Metrics */}
                  {project.metrics.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Documented Evidence &amp; Metrics
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {project.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-md border ${styles.metricBorder} flex flex-col gap-1`}
                          >
                            <span className="text-[11px] font-mono text-muted-foreground truncate">
                              {metric.label}
                            </span>
                            <span className={`text-base font-mono font-bold ${styles.text}`}>
                              {metric.value}
                            </span>
                            {metric.definition && (
                              <span className="text-[11px] text-muted-foreground/75 leading-tight">
                                {metric.definition}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies Used */}
                  <div className="pt-4 border-t border-border/40 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-muted-foreground mr-1">Stack:</span>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs font-mono bg-secondary/40 text-muted-foreground border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
