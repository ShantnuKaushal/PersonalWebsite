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
  {
    slug: 'pneumora',
    title: 'Pneumora',
    summary:
      'Computer vision and machine learning application that uses TensorFlow to analyze chest X-ray images and return confidence-scored predictions through a web interface.',
    detail:
      'Built around a FastAPI orchestration layer with Pillow and NumPy preprocessing, TensorFlow model serving, and a containerized frontend flow for image upload, AI inference, and prediction delivery.',
    tags: ['TensorFlow', 'FastAPI', 'Computer Vision', 'NumPy'],
    githubUrl: '',
    liveUrl: '',
    statusText: 'Coming soon',
  },
];
