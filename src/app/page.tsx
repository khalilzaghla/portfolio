import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Grounded, Technical, Factual */}
      <Hero />

      {/* About Section — ENET'Com Background, Data+AI Intersection, Practical Experience */}
      <About />

      {/* Flagship Projects Section — Technical Case Studies & Evidence */}
      <Projects />

      {/* Skills Section — 5-Domain Lifecycle Matrix */}
      <Skills />

      {/* Experience & Education Section — Documented Internships, Leadership & Degrees */}
      <Experience />

      {/* Contact Section Placeholder */}
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
