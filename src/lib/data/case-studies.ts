
export type ArchitectureNode = {
  id: string;
  label: string;
  type: "source" | "processing" | "storage" | "model" | "serving" | "client";
  domain?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type MethodologySection = {
  title: string;
  content: string[]; // Array of paragraphs to avoid long strings
};

export type ResultGroup = {
  title: string;
  context: string; // Experimental context, e.g. "Window-level evaluation on PoseLift benchmark (619 windows)"
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type Reference = {
  title: string;
  url: string;
};

export type CaseStudy = {
  slug: string;
  problemStatement: string[];
  architecture: {
    description: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  methodology: MethodologySection[];
  results: ResultGroup[];
  limitations: string[];
  references: Reference[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "retail-anomaly-detection": {
    slug: "retail-anomaly-detection",
    problemStatement: [
      "Commercial CCTV surveillance requires identifying subtle shoplifting behaviors within dense retail scenes. Traditional appearance-based RGB models face significant challenges:",
      "1. They incur heavy computational footprints for dense multi-person scenes.",
      "2. They inherently leak customer identities and biometrics, failing strict GDPR privacy compliance.",
      "3. They suffer from background shortcut learning, overfitting to specific store lighting, aisle colors, or customer clothing textures instead of the actual shoplifting behavior."
    ],
    architecture: {
      description: "A two-stage decoupled pipeline. Stage 1 extracts skeletal coordinates, throwing away all RGB data. Stage 2 evaluates the kinematic graph trajectory.",
      nodes: [
        { id: "rgb", label: "RGB Video Frame", type: "source" },
        { id: "yolo", label: "YOLO-Pose + ByteTrack", type: "processing", domain: "cv" },
        { id: "graph", label: "24-Frame Pose Graph (18 Joints)", type: "storage" },
        { id: "stgnf", label: "STG-NF", type: "model", domain: "ai" },
        { id: "nll", label: "NLL Score (Window)", type: "serving" },
        { id: "agg", label: "Temporal Triangular Aggregation", type: "processing" },
        { id: "out", label: "Frame Anomaly Score", type: "client" }
      ],
      edges: [
        { from: "rgb", to: "yolo", label: "Inference" },
        { from: "yolo", to: "graph", label: "Extract Kinematics" },
        { from: "graph", to: "stgnf", label: "Density Estimation" },
        { from: "stgnf", to: "nll", label: "Scoring" },
        { from: "nll", to: "agg", label: "Smoothing" },
        { from: "agg", to: "out", label: "Final Result" }
      ]
    },
    methodology: [
      {
        title: "Decoupled Pose Estimation",
        content: [
          "To guarantee privacy compliance and eliminate background shortcut learning, humans are abstracted into 18-joint skeletal coordinates (OpenPose layout converted from COCO-17).",
          "Tracked individuals are sampled as 24-frame pose graphs. Coordinates are normalized relative to the torso to ensure scale invariance across the camera's depth of field."
        ]
      },
      {
        title: "Normalizing Flows on Spatio-Temporal Graphs",
        content: [
          "Instead of a discriminative classifier, we use Spatio-Temporal Graph Normalizing Flows (STG-NF) to learn the probability density function of 'normal' shopping behavior. The model computes the Negative Log-Likelihood (NLL) over the kinematic trajectory.",
          "Anomaly detection becomes an unsupervised density estimation problem: out-of-distribution kinematics (e.g. rapid concealment) yield high NLL scores."
        ]
      },
      {
        title: "Temporal Aggregation",
        content: [
          "STG-NF produces one NLL score per 24-frame window. To derive per-frame scores, same-person overlapping windows are aggregated using a triangular weighted mean, which significantly improves end-to-end frame ranking compared to naive max-pooling."
        ]
      }
    ],
    results: [
      {
        title: "Direct Model Discrimination",
        context: "Window-level evaluation on the PoseLift benchmark (619 tracked windows, 311 normal / 308 anomaly). Evaluates raw STG-NF window NLL scores before post-processing.",
        items: [
          { label: "ROC-AUC", value: "0.6039" },
          { label: "PR-AUC", value: "0.6232" },
          { label: "Average Precision", value: "0.6257" }
        ]
      },
      {
        title: "End-to-End Pipeline Performance",
        context: "Frame-level evaluation after Triangular Weighted Mean temporal aggregation and multi-person multi-window coverage.",
        items: [
          { label: "ROC-AUC", value: "0.7710" },
          { label: "PR-AUC", value: "0.5945" },
          { label: "Average Precision", value: "0.5949" }
        ]
      }
    ],
    limitations: [
      "Severe occlusions (shopping carts, tall shelves) can cause joint dropouts and ByteTrack ID fragmentation.",
      "Direct pose-window separation for shoplifting remains limited (Window ROC-AUC ~0.60). Pose-only information lacks object interaction context (e.g. distinguishing holding a phone vs holding a store item).",
      "Subtle concealed actions without exaggerated kinematic velocity are difficult to separate from ordinary item inspection."
    ],
    references: [
      { title: "STG-NF: Spatio-Temporal Graph Normalizing Flows", url: "https://arxiv.org/abs/2112.01253" },
      { title: "YOLOv8 Pose Estimation", url: "https://docs.ultralytics.com/tasks/pose/" },
      { title: "ByteTrack: Multi-Object Tracking", url: "https://arxiv.org/abs/2110.06864" }
    ]
  },
  "tunisia-food-data-platform": {
    slug: "tunisia-food-data-platform",
    problemStatement: [
      "OpenFoodFacts provides crowdsourced grocery records, but the raw data is heavily unstructured, deeply nested, and difficult to query for analytics.",
      "Key issues include missing nutritional keys, duplicate barcodes across regions, and mixed French/Arabic text attributes.",
      "A purely relational database cannot ingest this raw format directly, while a document store fails to enforce the schema rigor required for aggregate analytics."
    ],
    architecture: {
      description: "A Medallion architecture using a staging strategy to decouple raw external API payloads from strict analytical schemas.",
      nodes: [
        { id: "api", label: "OpenFoodFacts API", type: "source" },
        { id: "airflow", label: "Apache Airflow", type: "processing", domain: "system" },
        { id: "raw", label: "Raw JSONB (Bronze)", type: "storage", domain: "data" },
        { id: "spark", label: "PySpark ETL", type: "processing", domain: "data" },
        { id: "staging", label: "Staging (Silver)", type: "storage", domain: "data" },
        { id: "prod", label: "3NF Relational (Gold)", type: "storage", domain: "data" }
      ],
      edges: [
        { from: "api", to: "airflow", label: "Fetch Batches" },
        { from: "airflow", to: "raw", label: "Append Immutable" },
        { from: "raw", to: "spark", label: "Read" },
        { from: "spark", to: "staging", label: "Clean & Deduplicate" },
        { from: "staging", to: "prod", label: "Idempotent Upsert" }
      ]
    },
    methodology: [
      {
        title: "Immutable Raw Layer",
        content: [
          "Ingestion services fetch product payloads and persist them directly as immutable JSONB columns in PostgreSQL along with an ingestion timestamp.",
          "This separates network I/O from data transformation, ensuring that rate-limited external API calls don't need to be repeated if transformation logic changes."
        ]
      },
      {
        title: "Relational Normalization",
        content: [
          "PySpark jobs parse nested arrays for ingredients and allergens, executing text normalization and handling multilingual entries.",
          "The data is staged and then idempotently upserted into a 3rd Normal Form (3NF) relational schema, strictly separating products, brands, categories, and nutrients."
        ]
      }
    ],
    results: [
      {
        title: "Data Quality Post-Ingestion",
        context: "Evaluation of the Gold relational layer after full pipeline execution.",
        items: [
          { label: "Schema Target", value: "3NF Relational" },
          { label: "Data Duplication", value: "Eliminated via composite barcode+region keys" },
          { label: "Orchestration", value: "DAG-based dependency resolution" }
        ]
      }
    ],
    limitations: [
      "API rate limiting on OpenFoodFacts demands rigorous backoff handling.",
      "Unstructured ingredient text still requires heuristic parsing for non-standard labeling formats, which may fail on novel edge cases."
    ],
    references: [
      { title: "Medallion Architecture", url: "https://www.databricks.com/glossary/medallion-architecture" },
      { title: "OpenFoodFacts API", url: "https://openfoodfacts.github.io/api-documentation/" }
    ]
  },
  "rag-hybrid-search": {
    slug: "rag-hybrid-search",
    problemStatement: [
      "Retrieval-Augmented Generation (RAG) models often hallucinate technical details when relying purely on dense semantic search.",
      "Standard vector embeddings might match the 'vibe' of a query but fail to return exact identifiers, function names, or specific error codes crucial for technical documentation.",
      "A pure dense strategy leads to poor context injection, resulting in confidently incorrect LLM responses."
    ],
    architecture: {
      description: "A directed acyclic graph (DAG) pipeline orchestrating both dense and lexical retrieval, followed by rank fusion and grounded generation.",
      nodes: [
        { id: "query", label: "User Query", type: "source" },
        { id: "haystack", label: "Haystack Pipeline", type: "processing", domain: "ai" },
        { id: "dense", label: "Dense Retriever (Pinecone)", type: "model", domain: "data" },
        { id: "lexical", label: "Keyword Retriever (BM25)", type: "model", domain: "data" },
        { id: "fusion", label: "Reciprocal Rank Fusion", type: "processing", domain: "ai" },
        { id: "llm", label: "Mistral Generator", type: "serving", domain: "ai" }
      ],
      edges: [
        { from: "query", to: "haystack", label: "Input" },
        { from: "haystack", to: "dense", label: "Embed & Search" },
        { from: "haystack", to: "lexical", label: "Token Search" },
        { from: "dense", to: "fusion", label: "Dense Hits" },
        { from: "lexical", to: "fusion", label: "Lexical Hits" },
        { from: "fusion", to: "llm", label: "Context Context" }
      ]
    },
    methodology: [
      {
        title: "Hybrid Retrieval",
        content: [
          "Incoming queries generate dense embeddings via sentence-transformers alongside a parallel BM25 lexical index search.",
          "Using hybrid retrieval rather than dense-only search ensures that exact technical terms and specific API endpoints are retrieved accurately without semantic hallucination."
        ]
      },
      {
        title: "Rank Fusion & Generation",
        content: [
          "The dual retrieval streams are merged using Reciprocal Rank Fusion (RRF), prioritizing documents that rank highly across both modalities.",
          "The fused context is injected into a strict prompt template, forcing the Mistral LLM to ground its synthesis exclusively on the provided context."
        ]
      }
    ],
    results: [
      {
        title: "Retrieval Design",
        context: "Pipeline architecture evaluation on curated technical documentation.",
        items: [
          { label: "Retrieval Strategy", value: "Hybrid Fusion (Dense + Lexical)" },
          { label: "Vector Indexing", value: "Pinecone Serverless" },
          { label: "LLM Backend", value: "Mistral Quantized" }
        ]
      }
    ],
    limitations: [
      "Currently a prototype evaluated on curated technical documentation sets.",
      "Context length limits restrict how much documentation can be injected before the LLM loses attention.",
      "Inference speed is bounded by external API rate limits and local model quantization constraints."
    ],
    references: [
      { title: "Haystack Documentation", url: "https://haystack.deepset.ai/" },
      { title: "Pinecone Vector Database", url: "https://www.pinecone.io/" }
    ]
  },
  "streaming-graph-fraud-detection": {
    slug: "streaming-graph-fraud-detection",
    problemStatement: [
      "Traditional tabular fraud detection evaluates financial transactions in isolation. This paradigm fails to detect coordinated fraud rings and multi-hop account money transfers.",
      "Fraudulent actors often use synthetic identities that look completely normal when viewed as independent rows in a database.",
      "Detecting these topological anomalies requires both high-throughput event processing and low-latency graph inference."
    ],
    architecture: {
      description: "An end-to-end streaming data architecture connected to an inductive Graph Neural Network.",
      nodes: [
        { id: "events", label: "Transaction Stream", type: "source" },
        { id: "kafka", label: "Apache Kafka", type: "storage", domain: "system" },
        { id: "spark", label: "Spark Structured Streaming", type: "processing", domain: "data" },
        { id: "clickhouse", label: "ClickHouse OLAP", type: "storage", domain: "data" },
        { id: "graphsage", label: "GraphSAGE Model", type: "model", domain: "ai" },
        { id: "out", label: "Fraud Score", type: "client" }
      ],
      edges: [
        { from: "events", to: "kafka", label: "Publish" },
        { from: "kafka", to: "spark", label: "Consume & Window" },
        { from: "spark", to: "clickhouse", label: "Sink Aggregates" },
        { from: "clickhouse", to: "graphsage", label: "Graph Snapshot" },
        { from: "graphsage", to: "out", label: "Inductive Inference" }
      ]
    },
    methodology: [
      {
        title: "Dynamic Bipartite Graphs",
        content: [
          "Transactions are modeled as a dynamic bipartite graph of Users and Merchants. This exposes relational multi-hop patterns that tabular gradient-boosted trees cannot identify.",
          "Event streams are processed via Kafka and Spark, dynamically updating node aggregates."
        ]
      },
      {
        title: "Inductive Graph Learning",
        content: [
          "A PyTorch Geometric GraphSAGE model evaluates topological node embeddings for fraud scoring.",
          "GraphSAGE was chosen specifically for its inductive capability, allowing it to generate embeddings for unseen nodes (new accounts/merchants) based on their local neighborhood, without needing to retrain the entire graph."
        ]
      }
    ],
    results: [
      {
        title: "System Latency & Scale",
        context: "End-to-end ingestion and persistence evaluation during peak simulation.",
        items: [
          { label: "Streaming Latency", value: "< 200ms (Kafka to ClickHouse)" },
          { label: "Data Sink", value: "ClickHouse Columnar Storage" },
          { label: "Model Architecture", value: "Inductive GraphSAGE" }
        ]
      }
    ],
    limitations: [
      "Graph expansion overhead exponentially increases the memory footprint on densely connected hub nodes.",
      "Requires aggressive neighbor sampling during inference to maintain low latency.",
      "Extreme class imbalance in fraudulent datasets requires specialized margin-based loss functions during training."
    ],
    references: [
      { title: "Inductive Representation Learning on Large Graphs (GraphSAGE)", url: "https://arxiv.org/abs/1706.02216" },
      { title: "PyTorch Geometric", url: "https://pytorch-geometric.readthedocs.io/" }
    ]
  },
  "marine-species-classification": {
    slug: "marine-species-classification",
    problemStatement: [
      "Automated ecological monitoring requires accurately classifying species and sex from varied field photography.",
      "Single-stage classifiers fail because of cluttered backgrounds, variable lighting conditions, and the extremely subtle morphological differences between species."
    ],
    architecture: {
      description: "A cascade pipeline that isolates the object before performing fine-grained classification.",
      nodes: [
        { id: "img", label: "Field Image", type: "source" },
        { id: "yolo", label: "YOLOv8 Detection", type: "processing", domain: "cv" },
        { id: "crop", label: "RoI Cropping", type: "processing" },
        { id: "cnn", label: "Fine-tuned CNN", type: "model", domain: "ai" },
        { id: "out", label: "Species & Sex Class", type: "client" }
      ],
      edges: [
        { from: "img", to: "yolo", label: "Full Frame" },
        { from: "yolo", to: "crop", label: "Bounding Box" },
        { from: "crop", to: "cnn", label: "Isolated Subject" },
        { from: "cnn", to: "out", label: "Prediction" }
      ]
    },
    methodology: [
      {
        title: "Decoupled Architecture",
        content: [
          "Stage 1 localizes the specimen using YOLOv8, completely ignoring species class. Stage 2 crops the Region of Interest and feeds it into a fine-tuned ResNet classifier.",
          "Decoupling object localization from morphological classification prevents background clutter (nets, hands, ship decks) from influencing fine-grained sex identification."
        ]
      }
    ],
    results: [
      {
        title: "Pipeline Structure",
        context: "Production inference pipeline architecture.",
        items: [
          { label: "Stage 1", value: "YOLOv8 Localization" },
          { label: "Stage 2", value: "ResNet/EfficientNet Classification" }
        ]
      }
    ],
    limitations: [
      "Dataset size was strictly constrained by field collection availability.",
      "Reflections on wet specimen surfaces required targeted photometric augmentation to prevent model hallucination."
    ],
    references: [
      { title: "YOLOv8", url: "https://docs.ultralytics.com/" }
    ]
  },
  "spatiotemporal-video-pipeline": {
    slug: "spatiotemporal-video-pipeline",
    problemStatement: [
      "Classifying multi-person activities in surveillance video requires isolating the dynamic temporal actions of individual actors without pooling extraneous background pixels."
    ],
    architecture: {
      description: "A multi-threaded processing queue connecting spatial detection with dual-pathway 3D convolutions.",
      nodes: [
        { id: "video", label: "Video Stream", type: "source" },
        { id: "yolo", label: "YOLO Tracker", type: "processing", domain: "cv" },
        { id: "roialign", label: "3D RoIAlign", type: "processing", domain: "cv" },
        { id: "slowfast", label: "SlowFast CNN", type: "model", domain: "ai" },
        { id: "flask", label: "Flask Dashboard", type: "serving", domain: "system" }
      ],
      edges: [
        { from: "video", to: "yolo", label: "Frames" },
        { from: "yolo", to: "roialign", label: "Actor Tubes" },
        { from: "roialign", to: "slowfast", label: "Cropped Temporal Windows" },
        { from: "slowfast", to: "flask", label: "Action Class" }
      ]
    },
    methodology: [
      {
        title: "Actor-Centric Temporal Tubes",
        content: [
          "Frames are buffered in a ring queue while YOLOv8 tracks actor bounding boxes. 3D RoIAlign extracts temporal tubes for each actor.",
          "Tracked actors are evaluated across dual Slow (stride 16) and Fast (stride 2) temporal pathways.",
          "Using 3D RoIAlign on tracked tubes guarantees actor-centric action evaluation, massively reducing background motion noise compared to full-frame 3D pooling."
        ]
      }
    ],
    results: [
      {
        title: "Temporal Processing",
        context: "Evaluation of the action classification backbone.",
        items: [
          { label: "Temporal Backbone", value: "SlowFast ResNet-50" },
          { label: "Pathways", value: "Slow (spatial context) + Fast (motion context)" }
        ]
      }
    ],
    limitations: [
      "3D CNN backbones have extremely high GPU memory requirements for dense multi-person scenes.",
      "Non-overlapping temporal windows require careful boundary handling to avoid missing split-second actions."
    ],
    references: [
      { title: "SlowFast Networks for Video Recognition", url: "https://arxiv.org/abs/1812.03982" }
    ]
  }
};
