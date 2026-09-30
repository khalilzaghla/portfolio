import { PROJECTS } from "@/lib/data/projects";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { VideoGallery } from "@/components/ui/video-demo";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2, FileText, CheckCircle2, AlertTriangle, BookOpen, Server, Cpu, Video } from "lucide-react";
import { Metadata } from "next";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Khalil Zaghla`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const caseStudy = CASE_STUDIES[slug];

  if (!project) {
    notFound();
  }

  const getAccentColor = (category: string) => {
    switch (category) {
      case "computer-vision": return "var(--color-accent-cv)";
      case "data-engineering": return "var(--color-accent-data)";
      case "machine-learning": return "var(--color-accent-graph)";
      case "rag": return "var(--color-accent-genai)";
      default: return "var(--color-accent-system)";
    }
  };

  const accentColor = getAccentColor(project.category);

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-20 selection:bg-zinc-800 selection:text-zinc-100">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Return Path */}
        <div className="mb-12">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span 
              className="text-xs font-mono px-2.5 py-1 rounded-full border bg-zinc-900/50"
              style={{ color: accentColor, borderColor: `${accentColor}33` }}
            >
              {project.domain}
            </span>
            <span className="text-xs text-zinc-500 font-medium px-2 py-1 bg-zinc-900 rounded-md">
              {project.typeLabel}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-100 leading-tight mb-6 tracking-tight">
            {project.title}
          </h1>
          
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all">
                <Code2 className="w-4 h-4" />
                View on GitHub
              </a>
            )}
            {caseStudy?.videos && caseStudy.videos.length > 0 && (
              <a href="#demo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all">
                <Video className="w-4 h-4" />
                Watch Demo
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.links.report && (
              <a href={project.links.report} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all">
                <FileText className="w-4 h-4" />
                Technical Report
              </a>
            )}
          </div>
        </header>

        {/* Dynamic Deep Dive Content or Fallback */}
        {caseStudy ? (
          <article className="space-y-16">
            
            {/* Problem Statement */}
            <section>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-500/80" />
                The Problem
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                {caseStudy.problemStatement.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-blue-500/80" />
                System Architecture
              </h2>
              <p className="text-zinc-400 mb-8">{caseStudy.architecture.description}</p>
              <ArchitectureDiagram nodes={caseStudy.architecture.nodes} edges={caseStudy.architecture.edges} />
            </section>

            {/* Methodology */}
            <section>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-8 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-emerald-500/80" />
                Technical Methodology
              </h2>
              <div className="space-y-10">
                {caseStudy.methodology.map((section, idx) => (
                  <div key={idx} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 md:p-8">
                    <h3 className="text-xl font-medium text-zinc-200 mb-4">{section.title}</h3>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      {section.content.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Demonstration */}
            {caseStudy.videos && caseStudy.videos.length > 0 && (
              <section id="demo" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-3">
                  <Video className="w-6 h-6 text-pink-500/80" />
                  Video Demonstration
                </h2>
                <p className="text-zinc-400 mb-8">Representative inference outputs from the implemented YOLOv8 + ByteTrack and SlowFast pipeline.</p>
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 md:p-8">
                  <VideoGallery videos={caseStudy.videos} />
                </div>
              </section>
            )}

            {/* Results & Metrics */}
            <section>
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-500/80" />
                Results & Evaluation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.results.map((resultGroup, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-zinc-200 mb-2">{resultGroup.title}</h3>
                    <p className="text-sm text-zinc-500 mb-6 pb-4 border-b border-zinc-800">{resultGroup.context}</p>
                    <ul className="space-y-4">
                      {resultGroup.items.map((item, i) => (
                        <li key={i} className="flex flex-col gap-1">
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{item.label}</span>
                          <span className="text-zinc-200 font-medium">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">Limitations & Constraints</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-400">
                {caseStudy.limitations.map((limitation, i) => (
                  <li key={i} className="pl-2">{limitation}</li>
                ))}
              </ul>
            </section>

            {/* References */}
            {caseStudy.references && caseStudy.references.length > 0 && (
              <section className="pt-8 border-t border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-zinc-500" />
                  References
                </h2>
                <ul className="space-y-3">
                  {caseStudy.references.map((ref, i) => (
                    <li key={i}>
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                      >
                        {ref.title}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </article>
        ) : (
          <article className="space-y-12">
            {/* Fallback for projects without a deep-dive case study yet */}
            <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-medium text-zinc-200 mb-4">Project Overview</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">{project.problem}</p>
              
              <h3 className="text-lg font-medium text-zinc-200 mb-4">Technical Approach</h3>
              <p className="text-zinc-400 leading-relaxed mb-8">{project.technicalApproach}</p>

              {project.keyArchitectureDecision && (
                <>
                  <h3 className="text-lg font-medium text-zinc-200 mb-4">Key Architecture Decision</h3>
                  <p className="text-zinc-400 leading-relaxed">{project.keyArchitectureDecision}</p>
                </>
              )}
            </section>

            {project.metrics.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-zinc-400">{metric.label}</span>
                        {metric.verified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
                        )}
                      </div>
                      <div className="text-xl font-semibold text-zinc-100 mb-2">{metric.value}</div>
                      {metric.definition && (
                        <div className="text-xs text-zinc-500 leading-relaxed">{metric.definition}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}

      </div>
    </main>
  );
}
