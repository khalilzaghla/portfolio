import { ProjectMeta, ProjectSchema } from "@/lib/schemas/project.schema";

const RAW_PROJECTS: readonly ProjectMeta[] = [
  {
    slug: "retail-anomaly-detection",
    title: "Privacy-Preserving Retail Anomaly Detection via Spatio-Temporal Graph Normalizing Flows",
    type: "internship",
    typeLabel: "R&D Internship (ANAVID)",
    category: "computer-vision",
    domain: "Computer Vision · Spatio-Temporal AI",
    featured: true,
    summary:
      "Pose-centric unsupervised anomaly detection pipeline for retail surveillance, replacing appearance-heavy RGB models with skeletal kinematics to preserve customer privacy and eliminate background bias.",
    problem:
      "Commercial CCTV surveillance requires identifying subtle shoplifting behaviors within dense retail scenes. Appearance-based RGB models incur heavy computational footprints, leak customer identities, and suffer from background shortcut learning on store aesthetics.",
    built:
      "An unsupervised anomaly detection pipeline combining YOLO-Pose for 2D keypoint extraction, ByteTrack for temporal tracking, torso-normalized relative coordinates, and Spatio-Temporal Graph Normalizing Flows (STG-NF) for negative log-likelihood (NLL) scoring.",
    technicalApproach:
      "Decoupled 2D pose estimation from spatial-temporal graph density estimation. Tracked individuals are sampled as 24-frame pose graphs. STG-NF computes anomaly likelihood over kinematic trajectories, followed by temporal weighted aggregation and multi-person frame scoring.",
    keyArchitectureDecision:
      "Abstracting humans into skeletal joint coordinates rather than RGB pixels guarantees privacy compliance and prevents the model from overfitting to store lighting, aisle colors, or customer clothing textures.",
    limitations:
      "Severe occlusions (shopping carts, tall shelves) can cause joint dropouts and tracker fragmentation; subtle concealed actions without exaggerated kinematic velocity remain challenging to separate from ordinary item inspection.",
    technologies: [
      "PyTorch",
      "YOLO-Pose",
      "ByteTrack",
      "STG-NF",
      "ST-GCN",
      "OpenCV",
      "Weights & Biases",
    ],
    metrics: [
      {
        label: "PoseLift ROC-AUC",
        value: "0.6039",
        definition: "Window-level evaluation on PoseLift benchmark (619 tracked windows)",
        verified: true,
      },
      {
        label: "PoseLift PR-AUC",
        value: "0.6232",
        definition: "Precision-Recall AUC under balanced evaluation on PoseLift",
        verified: true,
      },
      {
        label: "RetailS Cam1 ROC-AUC",
        value: "0.5258",
        definition: "Evaluation on raw industrial RetailS Camera 1 footage (4,981 windows)",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "completed",
  },
  {
    slug: "tunisia-food-data-platform",
    title: "Tunisia Food Data Platform: Medallion Ingestion & 3NF Normalization",
    type: "academic",
    typeLabel: "Data Engineering Project",
    category: "data-engineering",
    domain: "Data Engineering · Distributed Pipelines",
    featured: true,
    summary:
      "End-to-end batch ingestion and transformation pipeline structuring heterogeneous, multilingual grocery product records from OpenFoodFacts into an analytical 3NF relational PostgreSQL store.",
    problem:
      "Crowdsourced grocery records from OpenFoodFacts contain deeply nested JSON schemas, missing nutritional keys, duplicate barcodes, and mixed French/Arabic text attributes that cannot be reliably queried in relational systems.",
    built:
      "A Medallion architecture (Raw JSONB to Staging to 3NF Normalized relational schema in PostgreSQL) featuring automated schema migration, batch ingestion, barcode deduplication, text normalization, and nutrient parsing.",
    technicalApproach:
      "Implemented Python ingestion services fetching product payloads, persisting immutable raw JSONB with ingestion timestamps, parsing ingredients and allergens, and executing idempotent upserts into normalized relational tables.",
    keyArchitectureDecision:
      "Separating raw JSONB persistence from relational transformation enables reprocessing and schema evolution without re-querying the rate-limited external API.",
    limitations:
      "API rate limiting on OpenFoodFacts requires backoff handling; unstructured ingredient text requires continuous heuristic parsing for non-standard labeling formats.",
    technologies: [
      "Python",
      "PostgreSQL",
      "SQL (3NF/DDL)",
      "PySpark",
      "Apache Airflow",
      "Docker",
      "REST APIs",
    ],
    metrics: [
      {
        label: "Schema Normalization",
        value: "3NF Relational",
        definition: "Separated products, brands, categories, ingredients, and nutrients tables",
        verified: true,
      },
      {
        label: "Ingestion Pattern",
        value: "Medallion Architecture",
        definition: "Raw JSONB immutable layer with idempotent staging and relational views",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "completed",
  },
  {
    slug: "rag-hybrid-search",
    title: "Hybrid Retrieval-Augmented Generation (RAG) Pipeline",
    type: "prototype",
    typeLabel: "Applied AI Prototype",
    category: "rag",
    domain: "Generative AI · Information Retrieval",
    featured: true,
    summary:
      "Grounded document question-answering architecture combining dense neural embeddings and keyword retrieval in a node-based pipeline powered by Mistral and Pinecone.",
    problem:
      "Purely dense vector retrieval struggles with rare domain keywords, exact acronyms, and product codes, while keyword search lacks semantic generalization across synonyms and complex queries.",
    built:
      "A modular RAG prototype orchestrating document chunking, dual dense/lexical retrieval, vector indexing in Pinecone, context reranking, and grounded answer synthesis via Mistral LLMs.",
    technicalApproach:
      "Constructed a directed node-based workflow using Haystack: incoming queries generate dense embeddings via sentence-transformers alongside lexical indices, merging results via reciprocal rank fusion before prompt injection.",
    keyArchitectureDecision:
      "Using hybrid retrieval rather than dense-only search ensures that exact technical terms and identifiers are retrieved accurately without semantic hallucination.",
    limitations:
      "Prototype stage: evaluated on curated technical documentation sets; context length and inference speed are subject to API rate limits and model quantization.",
    technologies: [
      "Haystack",
      "Pinecone",
      "Mistral LLMs",
      "Sentence-Transformers",
      "Python",
      "Vector Search",
    ],
    metrics: [
      {
        label: "Retrieval Strategy",
        value: "Hybrid Fusion",
        definition: "Dense semantic vector search merged with keyword indexing",
        verified: true,
      },
      {
        label: "Orchestration",
        value: "Haystack Nodes",
        definition: "Directed acyclic graph pipeline for reproducible component evaluation",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "experimental",
  },
  {
    slug: "streaming-graph-fraud-detection",
    title: "Real-Time Streaming Analytics & Graph Fraud Detection Platform",
    type: "academic",
    typeLabel: "Streaming & Graph ML",
    category: "machine-learning",
    domain: "Graph ML · Streaming Analytics",
    featured: false,
    summary:
      "Real-time event streaming pipeline processing financial transactions into ClickHouse, serving a GraphSAGE GNN model for topological anomaly detection under class imbalance.",
    problem:
      "Traditional tabular fraud detection evaluates transactions in isolation, failing to detect coordinated fraud rings and multi-hop account money transfers across synthetic identities.",
    built:
      "An end-to-end streaming data architecture using Apache Kafka, Apache Spark, and ClickHouse for low-latency analytical ingestion, connected to a PyTorch Geometric GraphSAGE classifier.",
    technicalApproach:
      "Transformed transaction logs into dynamic bipartite user-merchant graphs. Processed event streams via Kafka and Spark, persisting aggregates into ClickHouse with sub-200ms latency, and evaluated topological node embeddings for fraud scoring.",
    keyArchitectureDecision:
      "Modeling transactions as a graph structure exposes relational multi-hop patterns that tabular gradient-boosted trees cannot identify.",
    limitations:
      "Graph expansion overhead increases memory footprint on densely connected hub nodes, requiring neighbor sampling during inference.",
    technologies: [
      "Apache Kafka",
      "Apache Spark",
      "ClickHouse",
      "PyTorch Geometric",
      "GraphSAGE",
      "Apache Airflow",
      "Docker",
    ],
    metrics: [
      {
        label: "Streaming Latency",
        value: "sub-200ms",
        definition: "End-to-end event ingestion latency from Kafka stream into ClickHouse",
        verified: true,
      },
      {
        label: "Graph Model",
        value: "GraphSAGE",
        definition: "Inductive node representation learning over dynamic transaction graphs",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "completed",
  },
  {
    slug: "marine-species-classification",
    title: "Two-Stage Marine Species & Sex Classification Pipeline",
    type: "internship",
    typeLabel: "Computer Vision Internship (CRNS)",
    category: "computer-vision",
    domain: "Computer Vision · Object Detection",
    featured: false,
    summary:
      "Two-stage visual identification system combining YOLOv8 bounding-box detection with fine-grained transfer-learned CNN classifiers for marine biological specimens.",
    problem:
      "Automated ecological monitoring requires accurately classifying specimen species and sex from varied field photography with cluttered backgrounds and variable lighting conditions.",
    built:
      "A modular two-stage computer vision workflow: Stage 1 localizes specimen bounding boxes using YOLOv8; Stage 2 crops and feeds the region of interest into fine-tuned ResNet/EfficientNet classifiers for subtle morphological attribute prediction.",
    technicalApproach:
      "Curated and annotated custom imagery using Roboflow with domain-specific augmentations (geometric jitter, color adjustments). Trained YOLOv8 for localization and fine-tuned deep CNN backbones for fine-grained morphological classification.",
    keyArchitectureDecision:
      "Decoupling object localization from morphological classification prevents background clutter from influencing fine-grained sex identification.",
    limitations:
      "Dataset size was constrained by field collection availability; reflections on wet specimen surfaces required targeted photometric augmentation.",
    technologies: [
      "YOLOv8",
      "ResNet",
      "EfficientNet",
      "Transfer Learning",
      "PyTorch",
      "Roboflow",
      "Python",
    ],
    metrics: [
      {
        label: "Pipeline Architecture",
        value: "2-Stage Cascade",
        definition: "Stage 1 YOLOv8 Detection followed by Stage 2 CNN Classification",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "completed",
  },
  {
    slug: "spatiotemporal-video-pipeline",
    title: "Spatio-Temporal Video Action Recognition & Tracking Pipeline",
    type: "prototype",
    typeLabel: "Video Intelligence Prototype",
    category: "computer-vision",
    domain: "Computer Vision · Video Analytics",
    featured: false,
    summary:
      "Multi-stream video surveillance pipeline combining YOLOv8 tracking with SlowFast 3D ResNet-50 and 3D RoIAlign for actor-centric anomaly classification.",
    problem:
      "Classifying multi-person activities in surveillance video requires isolating dynamic temporal actions of individual actors without pooling extraneous background pixels.",
    built:
      "An asynchronous video processing pipeline linking YOLOv8 actor bounding boxes across time, cropping temporal tubes with 3D RoIAlign, and classifying actions with SlowFast ResNet-50, served via a Flask dashboard.",
    technicalApproach:
      "Integrated spatial detection and temporal 3D convolutions with multi-threading: frames are buffered in a ring queue, tracked actors are sampled across dual Slow (stride 16) and Fast (stride 2) temporal pathways, and anomaly scores are logged asynchronously.",
    keyArchitectureDecision:
      "Using 3D RoIAlign on tracked tubes allows actor-centric action evaluation rather than entire-frame pooling, reducing background motion noise.",
    limitations:
      "3D CNN backbones have high GPU memory requirements for dense multi-person scenes; non-overlapping temporal windows require careful boundary handling.",
    technologies: [
      "PyTorch",
      "YOLOv8",
      "SlowFast (3D CNN)",
      "3D RoIAlign",
      "OpenCV",
      "Flask",
      "Docker",
    ],
    metrics: [
      {
        label: "Temporal Backbone",
        value: "SlowFast ResNet-50",
        definition: "Dual-pathway 3D CNN (Slow spatial stride 16 + Fast temporal stride 2)",
        verified: true,
      },
    ],
    links: {
      github: "https://github.com/khalilzaghla",
    },
    status: "completed",
  },
];

export const PROJECTS: ProjectMeta[] = RAW_PROJECTS.map((project) =>
  ProjectSchema.parse(project)
);
