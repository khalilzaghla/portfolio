"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, FileText } from "lucide-react";
import { NAV_ITEMS, SITE_METADATA } from "@/lib/nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
        >
          {SITE_METADATA.handle}
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={SITE_METADATA.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-border bg-card hover:bg-secondary/60 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Download CV (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
}
