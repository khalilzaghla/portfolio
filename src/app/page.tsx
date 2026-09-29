import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Grounded, Technical, Factual */}
      <Hero />

      {/* About Section — ENET'Com Background, Data+AI Intersection, Practical Experience */}
      <About />

      {/* Structural Placeholders for Subsequent Phases */}
      <section id="projects" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Case Studies
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-1 mb-2">
            Projects
          </h2>
          <p className="text-sm text-muted-foreground">
            Flagship technical case studies will be implemented in Phase 6. No unverified metrics will be included.
          </p>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Pipeline Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-1 mb-2">
            Technical Skills
          </h2>
          <p className="text-sm text-muted-foreground">
            Five-stage pipeline lifecycle matrix will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="experience" className="py-16 px-4 border-b border-border/40 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Career &amp; Academics
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-1 mb-2">
            Experience &amp; Education
          </h2>
          <p className="text-sm text-muted-foreground">
            ENET&apos;Com engineering degree curriculum and professional history will be implemented in Phase 5.
          </p>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Communication
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-1 mb-2">
            Contact
          </h2>
          <p className="text-sm text-muted-foreground">
            Direct communication channels and verified contact coordinates.
          </p>
        </div>
      </section>
    </div>
  );
}
