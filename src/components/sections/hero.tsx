"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, ExternalLink, ArrowDown } from "lucide-react";
import { SITE_METADATA } from "@/lib/nav";

interface FocusArea {
  label: string;
  dotColor: string;
}

const FOCUS_AREAS: readonly FocusArea[] = [
  { label: "Data Engineering", dotColor: "bg-emerald-400" },
  { label: "Computer Vision", dotColor: "bg-cyan-400" },
  { label: "Machine Learning", dotColor: "bg-amber-400" },
  { label: "RAG / LLM Systems", dotColor: "bg-violet-400" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" aria-label="Hero" className="py-20 md:py-32 px-4 border-b border-border/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: "easeOut" }}
          className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 md:gap-12"
        >
          <div className="flex-1 flex flex-col items-start">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-secondary/50 text-muted-foreground border border-border/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden="true" />
              <span className="truncate">{SITE_METADATA.statusLine}</span>
            </div>

            {/* Name & Primary Positioning */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-3">
              {SITE_METADATA.name}
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-foreground/90 tracking-tight mb-4">
              {SITE_METADATA.role}
            </p>

            {/* Secondary Focus Areas */}
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Focus Disciplines">
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-secondary/40 text-muted-foreground border border-border/50"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${area.dotColor}`} aria-hidden="true" />
                  <span>{area.label}</span>
                </span>
              ))}
            </div>

            {/* Grounded Technical Narrative */}
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Final-year engineering student at ENET&apos;Com (IDSD). Focused on building robust data
              platforms, spatio-temporal computer vision pipelines, and production-oriented machine
              learning systems.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={SITE_METADATA.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-card hover:bg-secondary/50 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileText className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <a
                href={SITE_METADATA.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-border bg-card hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="GitHub Profile (opens in new tab)"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <a
                href={SITE_METADATA.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-border bg-card hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="shrink-0 relative group self-center md:self-auto">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-36 aspect-[4/5] sm:w-44 md:w-56 rounded-2xl overflow-hidden border border-border/80 bg-secondary/30 shadow-xl">
              <Image
                src="/image.png"
                alt={SITE_METADATA.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 224px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
