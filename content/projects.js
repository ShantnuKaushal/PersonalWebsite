export const projects = [
  {
    slug: 'neura',
    title: 'Neura',
    summary:
      'Deep-sea organism detection app that fine-tunes a YOLOv8 model on underwater imagery, then returns confidence-scored species labels and bounding boxes for uploaded images.',
    detail:
      'Built with a TensorFlow 2.16 GPU training pipeline, KerasCV YOLOv8, COCO-format data loading, OpenCV/Pillow preprocessing, a FastAPI inference service, and a Next.js scan interface.',
    tags: ['TensorFlow', 'Computer Vision', 'YOLOV8', 'FastAPI'],
    githubUrl: 'https://github.com/ShantnuKaushal/Neura',
    liveUrl: '',
    videoSrc: '/videos/projects/neura-demo-fast.mp4',
    posterSrc: '/images/projects/neura-poster.jpg',
  },
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
    videoSrc: '/videos/projects/tweetcheck-demo.mp4',
    posterSrc: '/images/projects/tweetcheck-poster.jpg',
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
    posterSrc: '/images/projects/resource-poster.jpg',
  },
  {
    slug: 'skillscan',
    title: 'SkillScan',
    summary:
      'Job market intelligence platform that turns posting data into typo-tolerant search, normalized skill extraction, and interactive skill-demand graphs.',
    detail:
      'Built with a Django backend, Strawberry GraphQL API, Elasticsearch indexing, Neo4j job-company-skill relationships, and a Next.js Market Map interface for filtering postings by selected skills.',
    tags: ['Neo4j', 'Elasticsearch', 'GraphQL', 'spaCy', 'Django'],
    githubUrl: 'https://github.com/ShantnuKaushal/SkillScan',
    liveUrl: '',
    videoSrc: '/videos/projects/skillscan-demo.mov',
    posterSrc: '/images/projects/skillscan-poster.jpg',
  },
];
