// Portfolio Data for Bùi Gia Uy (Bui Gia Uy)
// AI Application Engineer & Full-Stack Developer

window.PORTFOLIO_DATA = {
  profile: {
    name: "Bùi Gia Uy",
    englishName: "Bui Gia Uy",
    title: "AI Application Engineer & Full-Stack Developer",
    status: "Open for AI & Full-Stack Opportunities",
    location: "TP. Hồ Chí Minh, Việt Nam",
    email: "giauy0987@gmail.com",
    phone: "0947879049",
    github: "https://github.com/BuiGiaUy",
    linkedin: "https://www.linkedin.com/in/uy-gia/",
    summary: "Kỹ sư ứng dụng AI & Lập trình viên Full-Stack chuyên sâu về kiến trúc Multi-Agent, Multi-stage RAG, LLMOps và phát triển hệ thống phần mềm doanh nghiệp hiệu năng cao. Sở hữu kinh nghiệm thực chiến với quy chuẩn SFIA quốc tế, thiết kế đường ống RAG thông minh đạt độ chính xác phân luồng 98.46% và hệ thống kiểm thử tự động 1.400+ test cases.",
    stats: [
      { label: "Automated Tests Passed", value: "1,400+", sub: "1,036 Python | 417 NestJS" },
      { label: "Router Accuracy (RAG)", value: "98.46%", sub: "Multi-stage Smart Intent Router" },
      { label: "Core Enterprise Projects", value: "4+", sub: "Vingroup / VinUni & E-Commerce" },
      { label: "SFIA Framework", value: "Level Aligned", sub: "VinUni AI Thực Chiến Certified" }
    ]
  },

  skills: {
    ai_genai: [
      { name: "LangGraph & Multi-Agent", level: 95, tag: "Expert", desc: "Stateful agentic workflows, cyclical graphs, human-in-the-loop" },
      { name: "LangChain & LlamaIndex", level: 92, tag: "Advanced", desc: "Chains, custom document loaders, semantic splitters" },
      { name: "Multi-stage RAG & Guardrails", level: 96, tag: "Expert", desc: "Evidence Gate, query rewriting, deterministic verifiers" },
      { name: "Vector Databases (pgvector, Qdrant)", level: 90, tag: "Advanced", desc: "HNSW indexing, hybrid search, pre-query authorization" },
      { name: "Evaluation & Tracing", level: 88, tag: "Advanced", desc: "Ragas, TruLens, LangSmith, Langfuse observability" },
      { name: "PyTorch & Fine-Tuning", level: 85, tag: "Proficient", desc: "LoRA, PEFT, acoustic TTS modeling, audio inference" },
      { name: "Prompt Engineering & Structured Output", level: 94, tag: "Expert", desc: "Pydantic output parsing, JSON schema enforcement, Few-shot" }
    ],
    backend: [
      { name: "NestJS / Node.js", level: 92, tag: "Advanced", desc: "Enterprise architecture, Dependency Injection, Guards, Microservices" },
      { name: "FastAPI / Python", level: 94, tag: "Expert", desc: "Asynchronous APIs, Pydantic v2, streaming responses, SSE" },
      { name: "PHP / Laravel 10", level: 88, tag: "Advanced", desc: "Eloquent ORM, Queues, Events, Payments, Blade & REST" },
      { name: "PostgreSQL & Redis", level: 90, tag: "Advanced", desc: "Complex queries, transactional integrity, caching, pub/sub" },
      { name: "RESTful APIs & WebSockets", level: 95, tag: "Expert", desc: "Real-time streaming, bi-directional audio/text communications" },
      { name: "Security & RBAC / JWT", level: 90, tag: "Advanced", desc: "Role-based access control, token refresh rotation, auth guards" }
    ],
    frontend: [
      { name: "React & Next.js", level: 90, tag: "Advanced", desc: "App Router, SSR, Server Components, State Management" },
      { name: "TypeScript / JavaScript ES6+", level: 92, tag: "Advanced", desc: "Strict type safety, generics, modern asynchronous patterns" },
      { name: "Vue.js", level: 82, tag: "Proficient", desc: "Composition API, Pinia, Vue Router, reactive components" },
      { name: "Flutter & Mobile", level: 80, tag: "Proficient", desc: "Cross-platform iOS/Android, provider/bloc state management" },
      { name: "Tailwind CSS & Modern UI", level: 95, tag: "Expert", desc: "Responsive design, dark/light themes, micro-interactions" }
    ],
    devops: [
      { name: "Docker & Containerization", level: 90, tag: "Advanced", desc: "Multi-stage builds, docker-compose, volume optimization" },
      { name: "CI/CD & GitHub Actions", level: 88, tag: "Advanced", desc: "Automated test suites, linting, semantic release, deployments" },
      { name: "MLOps & LLMOps", level: 86, tag: "Advanced", desc: "Model serving, latency profiling, token budget tracking" },
      { name: "Nginx & Linux Administration", level: 84, tag: "Proficient", desc: "Reverse proxy, SSL termination, systemd service management" }
    ]
  },

  projects: [
    {
      id: "hr-genie",
      title: "HR GENIE – AI-Powered HR Policy Assistant",
      subtitle: "Multi-Stage RAG Enterprise Assistant with Deterministic Verification",
      category: "ai",
      categoryLabel: "AI / GenAI & RAG",
      organization: "VinUni AI Thực Chiến - Vingroup",
      role: "Lead AI Engineer & System Architect",
      badge: "Flagship Project",
      status: "Production Ready",
      tech: ["Python", "FastAPI", "LangGraph", "LangChain", "NestJS", "Next.js", "PostgreSQL", "pgvector", "Docker"],
      overview: "Hệ thống trợ lý AI nội bộ phục vụ tra cứu chính sách nhân sự doanh nghiệp quy mô lớn, giải quyết triệt để bài toán ảo giác (hallucination) và phân quyền bảo mật dữ liệu nhân sự nhạy cảm theo chuẩn năng lực SFIA quốc tế.",
      metrics: [
        { label: "Smart Router Accuracy", val: "98.46%" },
        { label: "Automated Tests", val: "1,453 Total" },
        { label: "Python Unit/E2E Tests", val: "1,036 Tests" },
        { label: "NestJS Service Tests", val: "417 Tests" }
      ],
      highlights: [
        "Thiết kế Multi-Stage RAG Pipeline hoàn chỉnh: Smart Intent Router phân loại ý định người dùng đạt độ chính xác 98.46%.",
        "Pre-query Authorized Retrieval: Tích hợp RBAC đa tầng ngay tại lớp truy xuất vector (pgvector), đảm bảo nhân viên chỉ tiếp cận tài liệu chính sách được cấp quyền.",
        "Evidence Gate & Deterministic Answer Verifier: Cơ chế kép loại bỏ hoàn toàn hiện tượng sinh nội dung sai lệch bằng cách đối soát nghiêm ngặt câu trả lời với trích dẫn tài liệu gốc.",
        "Bộ test suite tự động đồ sộ với 1.400+ kịch bản kiểm thử (1.036 Python tests và 417 NestJS tests) đảm bảo độ tin cậy tuyệt đối cho môi trường doanh nghiệp.",
        "Xây dựng kiến trúc Hybrid Microservices: FastAPI xử lý AI inference & vector search, NestJS quản trị dữ liệu người dùng & audit logs, Next.js cung cấp UI trực quan."
      ],
      architectureDiagram: "hr_genie_rag_flow",
      github: "https://github.com/BuiGiaUy",
      demo: "#",
      featured: true
    },
    {
      id: "vieneu-tts",
      title: "VIENEU-TTS – Vietnamese Neural TTS & Voice Cloning",
      subtitle: "High-Fidelity Neural Speech Synthesis with Zero-Shot Voice Cloning",
      category: "ai",
      categoryLabel: "AI / GenAI & Audio",
      organization: "Personal & Open-Source Research",
      role: "AI & Deep Learning Engineer",
      badge: "Deep Learning",
      status: "Trained & Deployed",
      tech: ["Python", "PyTorch", "LoRA Fine-tuning", "FastAPI", "Gradio", "Docker", "WebSockets"],
      overview: "Hệ thống tổng hợp tiếng nói thần kinh tiếng Việt chất lượng cao kết hợp kỹ thuật Zero-Shot Voice Cloning, mang lại ngữ điệu tự nhiên, chân thực cho nhiều phương ngữ Bắc - Trung - Nam và suy luận thời gian thực với độ trễ siêu thấp.",
      metrics: [
        { label: "Reference Audio Required", val: "3 Seconds" },
        { label: "Inference Latency", val: "< 160ms" },
        { label: "Dialects Supported", val: "3 Regions" },
        { label: "Streaming Audio", val: "Chunked WS" }
      ],
      highlights: [
        "Huấn luyện và tinh chỉnh mô hình Neural Acoustic và Vocoder tiếng Việt sử dụng LoRA / PEFT, giảm thiểu tài nguyên tính toán nhưng vẫn đạt độ tự nhiên âm thanh tương đương người thật.",
        "Cơ chế Zero-Shot Voice Cloning: Chỉ cần mẫu âm thanh đối chiếu ngắn 3 giây để trích xuất đặc trưng âm sắc (speaker embeddings) và tái tạo giọng nói tương ứng.",
        "Đường ống Audio Streaming qua WebSockets: Tách nhỏ âm thanh thành các chunk nhỏ suy luận liên tục, giúp người nghe nhận diện phản hồi tức thì với độ trễ dưới 160ms.",
        "Giao diện thử nghiệm tương tác Gradio và API chuẩn RESTful/FastAPI đóng gói Dockerized sẵn sàng triển khai trên hạ tầng GPU đám mây."
      ],
      architectureDiagram: "vieneu_tts_flow",
      github: "https://github.com/BuiGiaUy",
      demo: "#",
      featured: true
    },
    {
      id: "wine-ecommerce",
      title: "WINE E-COMMERCE PLATFORM",
      subtitle: "Full-Stack Enterprise Commercial Platform with Real-Time Processing",
      category: "fullstack",
      categoryLabel: "Full-Stack & E-Commerce",
      organization: "Commercial Production Project",
      role: "Full-Stack Web Developer",
      badge: "E-Commerce",
      status: "Production Ready",
      tech: ["Laravel 10", "PHP 8.1", "MySQL", "Redis", "Bootstrap", "Vite", "Pusher", "VNPay"],
      overview: "Nền tảng thương mại điện tử chuyên biệt phân phối rượu cao cấp với giải pháp toàn diện: quản lý tồn kho đa kho, tích hợp cổng thanh toán trực tuyến VNPay an toàn và thông báo đơn hàng thời gian thực qua WebSockets.",
      metrics: [
        { label: "Payment Gateway", val: "VNPay IPN" },
        { label: "Realtime Engine", val: "Pusher WS" },
        { label: "Cache Layer", val: "Redis Key-Val" },
        { label: "Architecture", val: "Repository Pattern" }
      ],
      highlights: [
        "Xây dựng trên nền tảng Laravel 10 và PHP 8.1 theo kiến trúc Repository Pattern và Service Layer chuẩn mực, dễ dàng mở rộng và bảo trì.",
        "Tích hợp cổng thanh toán trực tuyến VNPay với cơ chế kiểm tra chữ ký số HMAC-SHA512, xử lý IPN webhook bất đồng bộ và tự động đối soát giao dịch an toàn.",
        "Hệ thống thông báo đẩy thời gian thực (Real-time Push Notifications) qua Pusher WebSockets khi có đơn hàng mới, cập nhật trạng thái vận chuyển và tồn kho tức thì.",
        "Tối ưu hóa hiệu năng bằng Redis Caching: lưu trữ danh mục sản phẩm, bộ lọc nâng cao và phiên giỏ hàng, giảm tải 70% truy vấn tới MySQL database.",
        "Giao diện người dùng mượt mà được đóng gói qua Vite, đảm bảo trải nghiệm mua sắm nhanh chóng và tối ưu SEO."
      ],
      architectureDiagram: "wine_ecommerce_flow",
      github: "https://github.com/BuiGiaUy",
      demo: "#",
      featured: true
    },
    {
      id: "colosseum-certus",
      title: "COLOSSEUM & CERTUS LABS",
      subtitle: "Multi-Agent Systems, MLOps, LLMOps & Evaluation Benchmark Suite",
      category: "ai",
      categoryLabel: "Multi-Agent & LLMOps",
      organization: "VinUni Track 2 Advanced",
      role: "AI Application Engineer & MLOps Lead",
      badge: "Track 2 Advanced",
      status: "Advanced Research & Implementation",
      tech: ["LangGraph", "Multi-Agent Systems", "LangSmith", "Langfuse", "Ragas", "TruLens", "Docker", "FastAPI"],
      overview: "Hệ thống nghiên cứu và thực thi các workflow Multi-Agent tự động phối hợp giải quyết tác vụ phức tạp, tích hợp toàn diện giải pháp quan sát (Observability), đo lường chi phí/token và đánh giá chất lượng mô hình tự động.",
      metrics: [
        { label: "Evaluation Frameworks", val: "Ragas & TruLens" },
        { label: "Observability Platform", val: "LangSmith & Langfuse" },
        { label: "Agent Orchestration", val: "Cyclical LangGraph" },
        { label: "Automated Benchmark", val: "Golden Dataset" }
      ],
      highlights: [
        "Thiết kế mạng lưới tác nhân tự quản (Autonomous Multi-Agent Network) với các vai trò phân định rõ: Planner, Researcher, Critic, và Executor kết nối bằng LangGraph.",
        "Tích hợp hệ thống giám sát phân tán (Distributed Tracing) với LangSmith và Langfuse: theo dõi toàn bộ dấu vết lời gọi LLM, tính toán chi phí token theo thời gian thực và đo độ trễ từng bước.",
        "Đường ống đánh giá chất lượng tự động hóa (Automated Evaluation Pipeline) sử dụng Ragas & TruLens: định lượng độ liên quan ngữ cảnh (Context Precision), độ trung thực (Faithfulness) và độ phủ câu trả lời (Answer Relevance).",
        "Triển khai bộ quy chuẩn MLOps/LLMOps hiện đại giúp phát hiện drift ngữ nghĩa và hồi quy chất lượng prompt trước khi cập nhật lên môi trường sản xuất."
      ],
      architectureDiagram: "colosseum_flow",
      github: "https://github.com/BuiGiaUy",
      demo: "#",
      featured: true
    },
    {
      id: "smart-tracker",
      title: "SMART ASSET & EXPENSE INTELLIGENCE",
      subtitle: "Cross-Platform Financial Tracking App with Offline-First Sync & Analytics",
      category: "mobile",
      categoryLabel: "Mobile & Cloud Systems",
      organization: "Independent Development",
      role: "Mobile & Backend Developer",
      badge: "Mobile Full-Stack",
      status: "Completed",
      tech: ["Flutter", "Dart", "Node.js", "Express", "PostgreSQL", "Docker", "REST API"],
      overview: "Ứng dụng quản lý chi tiêu và danh mục tài sản cá nhân đa nền tảng (iOS / Android), sở hữu kiến trúc Offline-First với SQLite đồng bộ đám mây và bảng điều khiển trực quan hóa tài chính hiện đại.",
      metrics: [
        { label: "Platforms", val: "iOS & Android" },
        { label: "Sync Engine", val: "Offline-First Sync" },
        { label: "Security", val: "Biometric Auth" },
        { label: "State Pattern", val: "BLoC / Provider" }
      ],
      highlights: [
        "Phát triển giao diện ứng dụng di động chuẩn Material 3 & Cupertino trên Flutter, đảm bảo 60fps mượt mà và tính nhất quán trải nghiệm.",
        "Kiến trúc Offline-First: Người dùng ghi nhận giao dịch tức thì khi không có internet qua SQLite, tự động hòa giải xung đột và đồng bộ khi kết nối mạng trở lại.",
        "Bảo mật sinh trắc học (Fingerprint / Face ID) và mã hóa dữ liệu cục bộ bảo vệ an toàn thông tin tài chính người dùng.",
        "REST API backend bằng Node.js & PostgreSQL, hỗ trợ thống kê phân tích biểu đồ trực quan và lập kế hoạch ngân sách thông minh."
      ],
      architectureDiagram: "smart_tracker_flow",
      github: "https://github.com/BuiGiaUy",
      demo: "#",
      featured: false
    }
  ],

  educationAndCerts: [
    {
      type: "education",
      title: "AI Thực Chiến (AITC) – Vingroup × VinUniversity",
      issuer: "VinUniversity & Vingroup",
      period: "Chương trình chuyên sâu",
      badge: "SFIA Standard",
      details: "Chương trình đào tạo kỹ sư AI tinh hoa theo tiêu chuẩn khung năng lực SFIA quốc tế, tập trung vào thiết kế hệ thống GenAI doanh nghiệp, Multi-Agent Systems, RAG tối ưu hóa và văn hóa kiểm thử tự động nghiêm ngặt.",
      highlights: [
        "Thực hiện dự án thực chiến HR GENIE và Colosseum Track 2 Advanced",
        "Huấn luyện chuyên sâu về LLMOps, Vector Databases, Retrieval Evaluation",
        "Tuân thủ phương pháp phát triển phần mềm chuẩn công nghiệp và SFIA Framework"
      ]
    },
    {
      type: "certification",
      title: "PHP Full-Stack Web Development Certification",
      issuer: "TechMaster Vietnam",
      period: "Chứng chỉ hoàn thành xuất sắc",
      badge: "Full-Stack Web",
      details: "Đào tạo bài bản kiến trúc phần mềm Backend PHP hiện đại (Laravel), cơ sở dữ liệu quan hệ nâng cao MySQL, Redis caching, bảo mật ứng dụng web và triển khai hệ thống thương mại điện tử thực tế.",
      highlights: [
        "Xây dựng kiến trúc MVC, Repository Pattern và Service Layer",
        "Tối ưu truy vấn cơ sở dữ liệu, phân trang, caching hiệu năng cao",
        "Tích hợp cổng thanh toán trực tuyến và bảo mật ứng dụng"
      ]
    },
    {
      type: "certification",
      title: "React.js Developer Certification",
      issuer: "W3Schools",
      period: "Chứng chỉ quốc tế",
      badge: "Frontend Development",
      details: "Chứng nhận năng lực lập trình giao diện người dùng hiện đại với React.js, bao gồm Hooks, State Management, Component Lifecycle, Tối ưu hiệu năng kết xuất và tương tác RESTful API.",
      highlights: [
        "Làm chủ kiến trúc component-driven và unidirectional data flow",
        "Sử dụng thành thạo Custom Hooks, Context API và SPA Routing",
        "Tối ưu hiệu năng re-render và trải nghiệm người dùng phản hồi cao"
      ]
    }
  ],

  aiAssistantKnowledge: [
    {
      question: "Kể cho tôi nghe về dự án HR GENIE và RAG pipeline?",
      keywords: ["hr genie", "rag", "vinuni", "router", "vingroup"],
      answer: "HR GENIE là trợ lý AI nội bộ phục vụ tra cứu chính sách nhân sự doanh nghiệp do Gia Uy phát triển tại chương trình AI Thực Chiến (Vingroup × VinUni). Điểm sáng của dự án là Multi-stage RAG Pipeline với Smart Router đạt độ chính xác 98.46%, lớp Pre-query Authorized Retrieval kết hợp pgvector đảm bảo bảo mật dữ liệu, Evidence Gate & Deterministic Answer Verifier ngăn chặn hoàn toàn ảo giác. Dự án có hơn 1.400 bài kiểm thử tự động (1.036 Python tests và 417 NestJS tests) tuân thủ chuẩn SFIA quốc tế."
    },
    {
      question: "Kinh nghiệm của Gia Uy về LangGraph và Multi-Agent Systems như thế nào?",
      keywords: ["langgraph", "multi-agent", "agent", "colosseum"],
      answer: "Gia Uy có chuyên môn sâu về kiến trúc Multi-Agent bằng LangGraph (stateful cyclical graphs) và LangChain. Trong dự án Colosseum & Certus Labs (VinUni Track 2 Advanced), Gia Uy đã thiết kế các mạng lưới Agent tự quản với các vai trò chuyên biệt (Planner, Researcher, Critic, Executor), tích hợp giải pháp quan sát toàn diện qua LangSmith/Langfuse và hệ thống đánh giá chất lượng tự động với Ragas & TruLens."
    },
    {
      question: "Dự án VIENEU-TTS có điểm gì nổi bật?",
      keywords: ["tts", "vieneu", "voice cloning", "giọng nói", "pytorch"],
      answer: "VIENEU-TTS là giải pháp tổng hợp tiếng nói thần kinh tiếng Việt và nhân bản giọng nói (Zero-Shot Voice Cloning) chất lượng cao do Gia Uy phát triển. Hệ thống tinh chỉnh mô hình qua LoRA/PEFT với PyTorch, cho phép sao chép âm sắc người nói chỉ từ 3 giây âm thanh mẫu, hỗ trợ 3 miền ngữ điệu Việt Nam và phát trực tiếp (audio streaming) qua WebSockets với độ trễ suy luận dưới 160ms."
    },
    {
      question: "Kỹ năng Backend và Full-Stack của Uy gồm những gì?",
      keywords: ["backend", "fullstack", "tech", "laravel", "nestjs", "fastapi"],
      answer: "Về Backend, Gia Uy thành thạo FastAPI (Python) cho các dịch vụ AI hiệu năng cao, NestJS (Node.js/TypeScript) cho kiến trúc doanh nghiệp chuẩn mực và Laravel (PHP 8.1) cho các nền tảng thương mại điện tử hoàn chỉnh. Uy am hiểu cơ sở dữ liệu quan hệ (PostgreSQL, MySQL), Redis Caching, pgvector, Docker, CI/CD GitHub Actions và các kiến trúc bảo mật RBAC/JWT."
    },
    {
      question: "Làm sao để liên hệ phỏng vấn hoặc hợp tác với Bùi Gia Uy?",
      keywords: ["liên hệ", "contact", "email", "phone", "tuyển dụng", "hợp tác"],
      answer: "Bạn có thể liên hệ trực tiếp với Bùi Gia Uy qua:\n• Email: giauy0987@gmail.com\n• Số điện thoại: 0947879049\n• Địa điểm: TP. Hồ Chí Minh, Việt Nam\n• LinkedIn: linkedin.com/in/uy-gia/\n• GitHub: github.com/BuiGiaUy\nUy luôn sẵn sàng trao đổi các cơ hội nghề nghiệp trong lĩnh vực AI Engineering và Full-Stack Development!"
    }
  ]
};
