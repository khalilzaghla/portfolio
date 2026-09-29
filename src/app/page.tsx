import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Minimal Navigation Shell */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-foreground">
            khalil.zaghla
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-foreground transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section — Grounded, Clean, Factual */}
      <section className="py-20 md:py-28 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          {/* Status Line */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-secondary/60 text-muted-foreground border border-border/60 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for End-of-Studies Internship (PFE) / Full-Time Roles</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Khalil Zaghla
          </h1>

          <p className="text-xl md:text-2xl font-medium text-foreground/90 mb-3">
            AI &amp; Data Engineering
          </p>

          <p className="text-sm md:text-base font-mono text-muted-foreground mb-6">
            Data Engineering · Computer Vision · Machine Learning · RAG
          </p>

          <p className="max-w-2xl text-muted-foreground text-base leading-relaxed mb-8">
            Final-year AI Engineering student at ENET&apos;Com (IDSD). Focused on high-throughput data
            platforms, spatio-temporal computer vision pipelines, and applied machine learning systems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a
              href="#projects"
              className="px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              View Projects ↓
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              Download CV
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* Structural Placeholders for Subsequent Phases */}
      <section id="projects" className="py-16 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Flagship technical case studies will be implemented in Phase 6. No unverified metrics will be included.
          </p>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Technical Skills</h2>
          <p className="text-sm text-muted-foreground">
            Pipeline lifecycle matrix will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="experience" className="py-16 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Experience &amp; Education</h2>
          <p className="text-sm text-muted-foreground">
            ENET&apos;Com engineering background and professional experience will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="contact" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-2">Contact</h2>
          <p className="text-sm text-muted-foreground">
            Verified direct contact details and communication channels.
          </p>
        </div>
      </section>

      <footer className="mt-auto border-t border-border/40 py-6 px-4 text-center text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} Khalil Zaghla · Engineering Portfolio
      </footer>
    </div>
  );
}
