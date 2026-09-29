import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { NAV_ITEMS, SITE_METADATA } from "@/lib/nav";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40 bg-card/20 py-12 px-4 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Identity & Copyright */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
              {SITE_METADATA.name}
            </span>
            <span className="text-xs text-muted-foreground/60">·</span>
            <span className="text-xs font-mono text-muted-foreground">
              {SITE_METADATA.role}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Final-year AI Engineering student at ENET&apos;Com (IDSD).
          </p>
          <p className="text-xs font-mono text-muted-foreground/70 mt-1">
            © {currentYear} Khalil Zaghla. All rights reserved.
          </p>
        </div>

        {/* Navigation & Social Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}

          <span className="hidden sm:inline text-muted-foreground/30">|</span>

          <Link
            href={SITE_METADATA.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <Link
            href={SITE_METADATA.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <a
            href={SITE_METADATA.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
          >
            <span>CV (PDF)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
