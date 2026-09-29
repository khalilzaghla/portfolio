"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Database, Eye, Network, GraduationCap, Building2, Calendar, MapPin } from "lucide-react";

interface FocusPillar {
  title: string;
  category: string;
  accentClass: string;
  icon: typeof Database;
  description: string;
  technologies: readonly string[];
}

const PILLARS: readonly FocusPillar[] = [
  {
    title: "Data Engineering & Platforms",
    category: "Data Systems",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    icon: Database,
    description:
      "Designing resilient ingestion pipelines, schema migrations, and structured storage. Modeled a Medallion architecture (Raw JSONB to 3NF Normalized relational schema in PostgreSQL) for heterogeneous food catalogs using PySpark and Apache Airflow.",
    technologies: ["PySpark", "Apache Airflow", "PostgreSQL", "SQL (3NF/DDL)", "Docker"],
  },
  {
    title: "Computer Vision & Spatio-Temporal AI",
    category: "Computer Vision",
    accentClass: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    icon: Eye,
    description:
      "Formulating pose-centric video anomaly detection for retail surveillance during research internship at ANAVID. Replaced raw pixel processing with skeletal keypoint trajectories (YOLO-Pose, ByteTrack) and Spatio-Temporal Graph Normalizing Flows (STG-NF) to preserve privacy and prevent background bias.",
    technologies: ["PyTorch", "OpenCV", "YOLO-Pose", "ByteTrack", "STG-NF", "Pose Estimation"],
  },
  {
    title: "Applied ML, Graphs & RAG Systems",
    category: "Machine Learning & RAG",
    accentClass: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    icon: Network,
    description:
      "Developing production-oriented inference pipelines. Implemented hybrid retrieval systems using Haystack, Pinecone, and Mistral LLMs for grounded document search, alongside graph representation learning with PyTorch Geometric (PyG) for structural pattern detection.",
    technologies: ["PyTorch Geometric", "Haystack", "Pinecone", "Mistral / LLMs", "Scikit-Learn"],
  },
];

export function About() {
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
      id="about"
      aria-labelledby="about-heading"
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
              Background &amp; Philosophy
            </span>
            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Engineering at the Intersection of Data &amp; AI
            </h2>
          </div>

          {/* Narrative Grid: Philosophy & Academic Background */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-base leading-relaxed text-muted-foreground">
            {/* Left Column: The Data + AI Thesis */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p>
                I am a final-year engineering student in{" "}
                <span className="text-foreground font-medium">
                  Data Engineering and Decisional Systems (IDSD)
                </span>{" "}
                at{" "}
                <span className="text-foreground font-medium">
                  ENET&apos;Com (École Nationale d&apos;Électronique et des Télécommunications de Sfax)
                </span>
                . My technical focus centers on bridging reliable data platforms with applied artificial intelligence systems.
              </p>
              <p>
                In production, machine learning models do not exist in isolation. Their stability,
                reproducibility, and inference accuracy depend directly on the structural integrity,
                throughput, and hygiene of the upstream data pipeline. Siloed models trained without
                rigorous data contracts inevitably break under distribution shifts and unhandled schema evolution.
              </p>
              <p>
                I treat data ingestion, normalization, and orchestration as first-class architectural
                concerns. Whether designing distributed transformations with PySpark, parsing live camera
                streams into skeletal coordinates, or configuring hybrid vector search pipelines, my
                goal is building maintainable, end-to-end systems grounded in clear constraints.
              </p>
            </div>

            {/* Right Column: Academic & Status Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-lg bg-card border border-border/60 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-4 border-b border-border/40">
                  <div className="p-2 rounded-md bg-secondary/60 text-foreground">
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      ENET&apos;Com — University of Sfax
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      National Engineering Degree (Diplôme d&apos;Ingénieur)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0 w-24">Field:</span>
                    <span className="text-foreground font-medium">
                      Data Engineering &amp; Decisional Systems (IDSD)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0 w-24">Location:</span>
                    <span className="text-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                      Sfax, Tunisia
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0 w-24">Internship:</span>
                    <span className="text-foreground flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                      ANAVID (Computer Vision R&amp;D)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0 w-24">Availability:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      PFE / Full-Time (Early 2027)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-border/40 text-xs text-muted-foreground">
                Rigorous grounding in distributed systems, relational databases, statistical modeling,
                and applied computer vision.
              </div>
            </div>
          </div>

          {/* Three Practical Pillars */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Practical Experience &amp; Focus Areas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PILLARS.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col justify-between p-5 rounded-lg bg-card/60 border border-border/60 hover:border-border transition-colors duration-150"
                  >
                    <div>
                      {/* Pillar Icon & Category */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-2 rounded-md border inline-flex items-center justify-center ${pillar.accentClass}`}
                        >
                          <IconComponent className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground/70 uppercase">
                          {pillar.category}
                        </span>
                      </div>

                      <h4 className="font-semibold text-foreground text-sm tracking-tight mb-2.5">
                        {pillar.title}
                      </h4>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
                      {pillar.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-secondary/40 text-muted-foreground/90 border border-border/40"
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
        </motion.div>
      </div>
    </section>
  );
}
