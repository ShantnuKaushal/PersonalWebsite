export const featuredProjects = [
  {
    title: 'TweetCheck',
    summary:
      'Distributed sentiment analysis platform that simulates a live tweet stream, classifies messages with a fine-tuned BERT model, and broadcasts real-time system state to an operator dashboard.',
    detail:
      'Built as an event-driven system with Go ingestion, Kafka transport, a Python inference worker, Redis-backed live state, FastAPI WebSocket updates, and a Next.js control surface packaged through Docker Compose.',
    tags: ['Kafka', 'BERT', 'PyTorch', 'Go', 'FastAPI'],
    githubUrl: 'https://github.com/ShantnuKaushal/TweetCheck',
    liveUrl: '',
    branch: 'main',
    projectType: 'Distributed AI System',
    visualLabel: 'Live sentiment operations dashboard',
    visualImage: '/images/projects/light-tweet-source.jpg',
    visualAlt: 'Tweet project light source preview',
    visualImageDark: '/images/projects/light-tweet-source.jpg',
    visualPosition: '14% 50%',
    hideVisualOverlay: true,
  },
  {
    title: 'ReSource',
    summary:
      'Browser-first PDF retrieval workspace for grounded document question answering with local embeddings, persistent vector search, and conversation-level source selection.',
    detail:
      'The stack pairs a Flask ingestion and retrieval API with PostgreSQL plus pgvector, local all-MiniLM-L6-v2 embeddings, PDF parsing, and a Next.js interface that keeps answers tied to uploaded source material.',
    tags: ['Local Embeddings', 'RAG', 'pgvector', 'PDF Retrieval', 'Flask'],
    githubUrl: 'https://github.com/ShantnuKaushal/ReSource',
    liveUrl: '',
    branch: 'main',
    projectType: 'Retrieval Workspace',
    visualLabel: 'Document research workspace',
    visualImage: '/images/projects/light-resource.jpg',
    visualAlt: 'Resource preview in light theme',
    visualImageDark: '/images/projects/light-resource.jpg',
    visualPosition: '50% 55%',
    hideVisualOverlay: true,
  },
];

export const projectArchive = [
  {
    title: 'AirAware',
    summary:
      'Aviation logistics and predictive maintenance platform that combines .NET microservices, gRPC communication, PostgreSQL state, and Redis caching for fleet health monitoring.',
    tags: ['Microservices', 'Service Orchestration', 'gRPC', '.NET 8'],
    githubUrl: 'https://github.com/ShantnuKaushal/AirAware',
    liveUrl: '',
    projectType: 'Cloud-native Systems',
  },
  {
    title: 'VCRTS',
    summary:
      'Vehicular Cloud Real-Time System for allocating distributed compute jobs across contributed vehicles, with Java desktop workflows, persistence, validation, and live task coordination.',
    tags: ['Vehicular Cloud', 'Resource Allocation', 'Job Scheduling', 'Java'],
    githubUrl: 'https://github.com/ShantnuKaushal/vcrts',
    liveUrl: '',
    projectType: 'Systems Research',
  },
];
