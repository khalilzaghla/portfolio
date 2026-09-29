"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";
import { NAV_ITEMS, SITE_METADATA } from "@/lib/nav";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press & handle focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open for keyboard accessibility
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const panelVariants = {
    closed: { x: shouldReduceMotion ? 0 : "100%", opacity: shouldReduceMotion ? 0 : 1 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog" aria-label="Mobile Navigation Menu">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-card border-l border-border/60 p-6 flex flex-col justify-between shadow-2xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: "spring", damping: 28, stiffness: 280 }
            }
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border/40">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Navigation
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile Menu Links">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 rounded-md text-base font-medium text-foreground/90 hover:text-foreground hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-muted-foreground/60">→</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Actions & Status */}
            <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
              <a
                href={SITE_METADATA.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href={SITE_METADATA.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href={SITE_METADATA.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Status Indicator */}
              <div className="mt-2 flex items-center gap-2 px-2 py-1 text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Available for PFE / Roles</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
