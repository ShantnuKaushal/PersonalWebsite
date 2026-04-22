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
    visualVideo: '/videos/projects/tweetcheck-demo.mp4',
    visualPoster: '/images/projects/tweetcheck-video-poster.jpg',
    visualAlt: 'TweetCheck dashboard demo',
    visualScale: '1.015',
    visualTranslateX: '0.9%',
  },
  {
    slug: 'resource',
    title: 'ReSource',
    summary:
      'Browser-first PDF retrieval workspace for grounded document question answering with local embeddings, persistent vector search, and conversation-level source selection.',
    detail:
      'The stack pairs a Flask ingestion and retrieval API with PostgreSQL plus pgvector, local all-MiniLM-L6-v2 embeddings, PDF parsing, and a Next.js interface that keeps answers tied to uploaded source material.',
    tags: ['RAG', 'pgvector', 'Local Embeddings', 'Flask'],
    githubUrl: 'https://github.com/ShantnuKaushal/ReSource',
    liveUrl: '',
    visualVideo: '/videos/projects/resource-demo.mp4',
    visualPoster: '/images/projects/resource-video-poster.jpg',
    visualAlt: 'ReSource document workspace demo',
    visualScale: '1.015',
    visualTranslateX: '0.9%',
  },
  {
    slug: 'airaware',
    title: 'AirAware',
    summary:
      'Aviation logistics and predictive maintenance platform that combines .NET microservices, gRPC communication, PostgreSQL state, and Redis caching for fleet health monitoring.',
    detail:
      'Structured around service orchestration, internal RPC flows, and operational data movement so fleet health signals stay queryable, responsive, and reliable across the wider platform.',
    tags: ['Microservices', 'Service Orchestration', 'gRPC', '.NET 8'],
    githubUrl: 'https://github.com/ShantnuKaushal/AirAware',
    liveUrl: '',
  },
  {
    slug: 'vcrts',
    title: 'VCRTS',
    summary:
      'Vehicular Cloud Real-Time System for allocating distributed compute jobs across contributed vehicles, with Java desktop workflows, persistence, validation, and live task coordination.',
    detail:
      'Designed as a systems research project focused on scheduling, validation, and real-time coordination between contributed nodes so compute jobs can be dispatched and tracked across the network.',
    tags: ['Vehicular Cloud', 'Resource Allocation', 'Scheduling', 'Java'],
    githubUrl: 'https://github.com/ShantnuKaushal/vcrts',
    liveUrl: '',
  },
];
