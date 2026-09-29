import { SkillCategory, SkillCategorySchema } from "@/lib/schemas/profile.schema";

const RAW_SKILLS: readonly SkillCategory[] = [
  {
    id: "data-engineering",
    title: "Data Engineering",
    domainRole: "Ingestion, Processing & Storage Architecture",
    accent: "data",
    description:
      "Building scalable data pipelines, streaming ingestion layers, normalized schemas, and distributed analytical transformations.",
    skills: [
      "Python",
      "SQL (PostgreSQL / ClickHouse)",
      "Apache Spark / PySpark",
      "Apache Airflow",
      "Apache Kafka",
      "PostgreSQL",
      "ClickHouse",
      "Data Modeling (3NF / Medallion)",
      "ETL / ELT Pipelines",
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    domainRole: "Spatio-Temporal Tracking & Video Intelligence",
    accent: "cv",
    description:
      "Developing real-time detection, skeletal pose estimation, multi-target tracking, and temporal video action recognition pipelines.",
    skills: [
      "YOLO (v8, YOLO-Pose)",
      "ByteTrack",
      "OpenCV",
      "Pose Estimation",
      "ST-GCN / STG-NF",
      "SlowFast (3D CNN)",
      "3D RoIAlign",
      "VideoMAE",
      "Roboflow",
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning & Deep Learning",
    domainRole: "Representation Learning & Neural Architectures",
    accent: "graph",
    description:
      "Formulating deep neural architectures, graph representations on relational structures, and experimental tracking with rigorous evaluation.",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Graph Neural Networks (GraphSAGE / PyG)",
      "Transformers",
      "CNNs (ResNet, EfficientNet)",
      "Reinforcement Learning (PPO, Actor-Critic)",
      "Transfer Learning",
      "Weights & Biases (W&B)",
    ],
  },
  {
    id: "genai-rag",
    title: "GenAI & RAG Systems",
    domainRole: "Hybrid Search & LLM Orchestration",
    accent: "genai",
    description:
      "Constructing grounded retrieval pipelines combining dense embeddings and keyword indexing with vector databases and open-source LLMs.",
    skills: [
      "RAG Architectures",
      "Haystack",
      "Pinecone",
      "Mistral Models",
      "Dense & Hybrid Embeddings",
      "Vector Search",
    ],
  },
  {
    id: "systems-infrastructure",
    title: "Systems & Infrastructure",
    domainRole: "Containerization, APIs & Runtimes",
    accent: "system",
    description:
      "Deploying multi-threaded inference runtimes, containerized microservices, high-performance REST APIs, and caching layers.",
    skills: [
      "Docker / Docker Compose",
      "FastAPI / Flask",
      "Multithreading & Concurrency",
      "REST APIs",
      "Git & GitHub CI",
      "Linux Environments",
      "Redis",
      "MinIO / S3",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = RAW_SKILLS.map((category) =>
  SkillCategorySchema.parse(category)
);
