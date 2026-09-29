import {
  ExperienceItem,
  ExperienceItemSchema,
  EducationItem,
  EducationItemSchema,
} from "@/lib/schemas/profile.schema";

const RAW_EXPERIENCES: readonly ExperienceItem[] = [
  {
    id: "anavid-internship",
    type: "internship",
    role: "Computer Vision Intern — Retail Loss Prevention",
    organization: "Anavid",
    location: "Sfax, Tunisia",
    period: "Summer 2026",
    badgeLabel: "R&D Internship",
    summary:
      "Formulated privacy-preserving video anomaly detection algorithms for retail surveillance streams within the R&D team.",
    bullets: [
      "Designed a privacy-preserving shoplifting detection pipeline using YOLO-Pose, ByteTrack, and robust temporal skeleton representations based on relative coordinates, torso normalization, interpolation, and smoothing.",
      "Developed and evaluated STG-NF, ST-LSTM, and Transformer models for behavioral anomaly detection, while benchmarking pose-estimation latency–performance trade-offs and tracking experiments with Weights & Biases.",
      "Decoupled skeletal motion trajectories from visual appearance features to mitigate camera perspective shifts and eliminate background shortcut bias.",
    ],
    technologies: [
      "YOLO-Pose",
      "ByteTrack",
      "STG-NF",
      "ST-GCN",
      "ST-LSTM",
      "Transformers",
      "PyTorch",
      "Weights & Biases",
    ],
  },
  {
    id: "crns-internship",
    type: "internship",
    role: "Computer Vision Intern — Marine Species Detection",
    organization: "Digital Research Center of Sfax (CRNS)",
    location: "Sfax, Tunisia",
    period: "Summer 2025",
    badgeLabel: "Vision Internship",
    summary:
      "Engineered an automated two-stage visual identification system for biological species classification.",
    bullets: [
      "Engineered an end-to-end two-stage vision pipeline using YOLOv8 detection and transfer-learned CNNs (ResNet, EfficientNet) for species and sex classification.",
      "Built custom dataset collection scripts, automated annotations, and configured domain-specific data augmentations in Roboflow.",
    ],
    technologies: [
      "YOLOv8",
      "ResNet",
      "EfficientNet",
      "Transfer Learning",
      "PyTorch",
      "Roboflow",
      "Python",
    ],
  },
  {
    id: "gdsc-lead",
    type: "leadership",
    role: "Machine Learning Lead",
    organization: "Google Developer Student Club (GDSC) — ENET'Com",
    location: "Sfax, Tunisia",
    period: "2025",
    badgeLabel: "Technical Leadership",
    summary:
      "Mentored student engineers in practical machine learning and designed competitive AI hackathon challenges.",
    bullets: [
      "Led 13+ technical sessions on machine learning, deep learning architectures, and generative AI for 40+ engineering students, delivering hands-on coding labs.",
      "Contributed to the technical challenge for the MindShift 2.0 AI Hackathon: formulated problem parameters, curated evaluation datasets, and mentored competing teams.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Transformers",
      "Generative AI",
    ],
  },
];

const RAW_EDUCATION: readonly EducationItem[] = [
  {
    id: "enetcom-degree",
    institution: "National School of Electronics and Telecommunications of Sfax (ENET'Com)",
    degree: "National Engineering Degree (Diplôme d'Ingénieur)",
    field: "Data Engineering and Decisional Systems (IDSD)",
    location: "Sfax, Tunisia",
    period: "2024 – Present (Final-Year)",
    details: [
      "Core training in distributed systems (Apache Spark, Kafka), relational and analytical database architectures, and data modeling.",
      "Specialized in applied machine learning, computer vision, video analytics, and decisional pipeline design.",
      "Seeking End-of-Studies graduation project (PFE) / full-time role starting early 2027.",
    ],
  },
  {
    id: "ipeis-prepa",
    institution: "Preparatory Institute for Engineering Studies of Sfax (IPEIS)",
    degree: "National Competitive Examination for Engineering Studies",
    field: "Physics and Chemistry Preparatory Program (PC)",
    location: "Sfax, Tunisia",
    period: "2021 – 2023",
    details: [
      "Two-year rigorous preparatory program with intensive training in advanced mathematics, physical sciences, and algorithmic computing.",
      "Ranked and admitted to the national engineering cycle at ENET'Com.",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = RAW_EXPERIENCES.map((exp) =>
  ExperienceItemSchema.parse(exp)
);

export const EDUCATION: EducationItem[] = RAW_EDUCATION.map((edu) =>
  EducationItemSchema.parse(edu)
);
