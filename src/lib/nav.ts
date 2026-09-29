export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const SITE_METADATA = {
  name: "Khalil Zaghla",
  handle: "khalil.zaghla",
  role: "AI & Data Engineering",
  subdisciplines: "Data Engineering · Computer Vision · Machine Learning · RAG",
  statusLine: "Available for End-of-Studies Internship (PFE) / Full-Time Roles",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    cv: "/resume.pdf",
  },
} as const;
