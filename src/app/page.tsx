import { SITE_METADATA } from "@/lib/nav";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Grounded, Clean, Factual */}
      <section className="py-20 md:py-28 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          {/* Status Line */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-secondary/60 text-muted-foreground border border-border/60 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{SITE_METADATA.statusLine}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            {SITE_METADATA.name}
          </h1>

          <p className="text-xl md:text-2xl font-medium text-foreground/90 mb-3">
            {SITE_METADATA.role}
          </p>

          <p className="text-sm md:text-base font-mono text-muted-foreground mb-6">
            {SITE_METADATA.subdisciplines}
          </p>

          <p className="max-w-2xl text-muted-foreground text-base leading-relaxed mb-8">
            Final-year AI Engineering student at ENET&apos;Com (IDSD). Focused on high-throughput data
            platforms, spatio-temporal computer vision pipelines, and applied machine learning systems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a
              href="#projects"
              className="px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Projects ↓
            </a>
            <a
              href={SITE_METADATA.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Download CV
            </a>
            <a
              href={SITE_METADATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub ↗
            </a>
            <a
              href={SITE_METADATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* Structural Placeholders for Subsequent Phases */}
      <section id="projects" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Flagship technical case studies will be implemented in Phase 6. No unverified metrics will be included.
          </p>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Technical Skills</h2>
          <p className="text-sm text-muted-foreground">
            Pipeline lifecycle matrix will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="experience" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Experience &amp; Education</h2>
          <p className="text-sm text-muted-foreground">
            ENET&apos;Com engineering background and professional experience will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Contact</h2>
          <p className="text-sm text-muted-foreground">
            Direct contact channels and communication details.
          </p>
        </div>
      </section>
    </div>
  );
}
