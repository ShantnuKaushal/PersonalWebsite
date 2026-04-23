export const projects = [
  {
    slug: 'tweetcheck',
    title: 'TweetCheck',
    summary:
      'Distributed sentiment analysis platform that simulates a live tweet stream, classifies messages with a fine-tuned BERT model, and broadcasts real-time system state to an operator dashboard.',
    detail:
      'Built as an event-driven system with Go ingestion, Kafka transport, a Python inference worker, Redis-backed live state, FastAPI WebSocket updates, and a Next.js control surface packaged through Docker Compose.',
    tags: ['PyTorch', 'Go', 'Kafka', 'BERT', 'FastAPI'],
    githubUrl: 'https://github.com/ShantnuKaushal/TweetCheck',
    liveUrl: '',
    videoSrc: '/videos/projects/tweetcheck-demo.mov',
  },
  {
    slug: 'resource',
    title: 'ReSource',
    summary:
      'Browser-first PDF retrieval workspace for grounded document question answering with local embeddings, persistent vector search, and conversation-level source selection.',
    detail:
      'The stack pairs a Flask ingestion and retrieval API with PostgreSQL plus pgvector, local all-MiniLM-L6-v2 embeddings, PDF parsing, and a Next.js interface that keeps answers tied to uploaded source material.',
    tags: ['RAG', 'pgvector', 'Semantic Search', 'Flask'],
    githubUrl: 'https://github.com/ShantnuKaushal/ReSource',
    liveUrl: '',
    videoSrc: '/videos/projects/resource-demo.mov',
  },
  {
    slug: 'skillscan',
    title: 'SkillScan',
    summary:
      'AI-powered job intelligence platform that ingests large posting datasets, extracts canonical skill entities from unstructured descriptions, and combines typo-tolerant search with graph-based relationship discovery.',
    detail:
      'Built around a Django ingestion pipeline with spaCy enrichment, Elasticsearch retrieval, Neo4j relationship modeling, Redis caching, and a GraphQL layer that feeds a React search and graph exploration interface.',
    tags: ['Neo4j', 'Elasticsearch', 'Django', 'spaCy'],
    githubUrl: '',
    liveUrl: '',
    statusText: 'Coming soon',
  },
  {
    slug: 'pneumora',
    title: 'Pneumora',
    summary:
      'Educational chest X-ray inference pipeline that preprocesses medical images, routes them through a dedicated TensorFlow Serving runtime, and returns confidence-scored triage predictions through a web interface.',
    detail:
      'Structured as a FastAPI orchestration layer with Pillow and NumPy preprocessing, TensorFlow model serving, and a containerized frontend flow for upload, prediction, and visible research-use disclaimers.',
    tags: ['TensorFlow', 'FastAPI', 'Computer Vision', 'NumPy'],
    githubUrl: '',
    liveUrl: '',
    statusText: 'Coming soon',
  },
];
