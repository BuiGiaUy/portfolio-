// Portfolio content for Bui Gia Uy — AI Engineer & Full-Stack Web Developer.
// Two locales share the same structure. Edit the matching field in both `vi` and `en`.
// Technical terms (RAG, NestJS, deployment, ...) stay in English in both locales.

window.PORTFOLIO_DATA = {
  defaultLocale: "vi",

  locales: {
    vi: {
      ui: {
        meta: {
          title: "Bùi Gia Uy — AI Engineer & Full-Stack Web Developer",
          description:
            "Portfolio của Bùi Gia Uy — AI Engineer & Full-Stack Web Developer. RAG nhiều tầng, multi-agent, NestJS, Next.js, PostgreSQL và các hệ thống AI chạy thật trong production.",
          ogTitle: "Bùi Gia Uy — AI Engineer & Full-Stack Web Developer",
          ogDescription:
            "Mình xây hệ thống AI để chạy thật: RAG nhiều tầng, multi-agent, backend production và giao diện đủ rõ để tin.",
          ogLocale: "vi_VN"
        },
        a11y: {
          skip: "Bỏ qua điều hướng",
          theme: "Đổi giao diện sáng/tối",
          quickLinks: "Liên kết nhanh",
          metrics: "Số liệu nổi bật",
          filterProjects: "Lọc dự án",
          chatInput: "Câu hỏi cho trợ lý",
          closeCase: "Đóng dự án",
          language: "Chọn ngôn ngữ",
          mainNav: "Điều hướng chính",
          mobileNav: "Điều hướng trên thiết bị di động",
          home: "Bùi Gia Uy — về đầu trang",
          openMenu: "Mở menu",
          closeMenu: "Đóng menu"
        },
        nav: {
          work: "Dự án",
          experience: "Kinh nghiệm",
          stack: "Stack",
          ask: "Hỏi AI",
          contact: "Liên hệ"
        },
        header: {
          role: "AI Engineer",
          availability: "Đang mở cơ hội",
          cv: "Tải CV AI"
        },
        hero: {
          eyebrow: "AI Engineer · TP. Hồ Chí Minh",
          titleHtml:
            'Mình xây<br><span class="mark">hệ thống AI</span><br>để chạy thật<span class="accent-dot">.</span>',
          lede:
            "AI Engineer & Full-Stack Web Developer. Mình làm RAG nhiều tầng, multi-agent, backend production và những giao diện đủ rõ để người dùng tin.",
          ctaWork: "Xem dự án",
          ctaCv: "Tải CV AI",
          ctaCvFullStack: "CV Full-Stack Web",
          portraitAlt: "Ảnh chân dung Bùi Gia Uy",
          portraitTag: "đang mở cơ hội",
          portraitLoc: "TP. Hồ Chí Minh · Remote / Hybrid"
        },
        work: {
          index: "01 — Dự án tiêu biểu",
          titleHtml: "Dự án thực tế,<br>không phải danh sách công nghệ.",
          lede:
            "Mỗi thẻ là một bài toán thật: vấn đề, cách tiếp cận, số liệu và kiến trúc. Bấm vào để xem chi tiết và mã nguồn khi có.",
          filterAll: "Tất cả",
          filterAi: "AI / RAG",
          filterFullstack: "Full-Stack",
          empty: "Chưa có dự án trong nhóm này.",
          view: "Xem dự án"
        },
        experience: {
          index: "02 — Kinh nghiệm",
          titleHtml: "Đã làm gì,<br>ở đâu.",
          lede:
            "Kinh nghiệm production ở e-commerce và startup, cộng với chương trình AI engineering tập trung vào hệ thống chạy thật.",
          typeWork: "Công việc",
          typeProgram: "Chương trình"
        },
        stack: {
          index: "03 — Stack",
          titleHtml: "Công cụ mình dùng<br>để làm sản phẩm.",
          lede:
            "Không phải danh sách logo. Mỗi mục là một việc mình đã thực sự làm với công nghệ đó."
        },
        ask: {
          index: "04 — Hỏi AI của tôi",
          titleHtml: "Hỏi nhanh về<br>kinh nghiệm.",
          lede:
            "Demo offline: trả lời bằng đối chiếu từ khóa trên dữ liệu có sẵn trong portfolio, không gọi API bên ngoài.",
          greetingHtml:
            "Chào bạn! Mình là trợ lý demo của <strong>Bùi Gia Uy</strong>. Hỏi về RAG, multi-agent, kinh nghiệm, stack hoặc liên hệ nhé.",
          userAvatar: "Bạn",
          inputLabel: "Câu hỏi cho trợ lý",
          inputPlaceholder: "Hỏi về RAG, kinh nghiệm, stack...",
          send: "Gửi",
          asideKicker: "Demo này biết gì",
          know: [
            "HR GENIE, RAG pipeline, router 98.46% và 1,453 kiểm thử",
            "Multi-agent, LangGraph, Ragas/TruLens, tracing",
            "Kinh nghiệm tại Hoa Lan Cattleya, Propway, AI20K",
            "Stack backend, frontend, DevOps và cách liên hệ"
          ],
          noteStrong: "Không gọi API.",
          noteTextHtml:
            'Đây là demo trả lời từ dữ liệu tĩnh trong <code>assets/js/data.js</code>. Muốn bản AI thật? <a href="#contact">Trao đổi với mình</a>.',
          metaPrompts: "4 câu hỏi gợi ý",
          metaNetwork: "Không gửi yêu cầu qua mạng",
          metaAria: "ARIA live",
          fallback:
            "Mình chưa có dữ liệu cho câu này. Đây là demo offline trả lời từ nội dung có sẵn trong portfolio. Bạn thử hỏi về HR GENIE & RAG, multi-agent/LangGraph, kinh nghiệm, stack backend hoặc thông tin liên hệ nhé."
        },
        contact: {
          index: "05 — Liên hệ",
          titleHtml: "Bạn cần người<br>đưa AI vào production?",
          lede:
            "Mình đang mở cho vị trí AI Engineer và Full-Stack Web. Gửi một tin nhắn ngắn, mình phản hồi qua email.",
          phoneLabel: "Điện thoại",
          copyEmail: "Sao chép email",
          copyPhone: "Sao chép số điện thoại",
          nameLabel: 'Họ và tên <em aria-hidden="true">*</em>',
          emailLabel: 'Email <em aria-hidden="true">*</em>',
          subjectLabel: "Chủ đề",
          messageLabel: 'Nội dung <em aria-hidden="true">*</em>',
          namePlaceholder: "Nguyễn Văn A",
          emailPlaceholder: "name@company.com",
          subjectPlaceholder: "Vị trí AI Engineer / Full-Stack Web",
          messagePlaceholder: "Chia sẻ về vị trí, đội ngũ hoặc dự án bạn đang tuyển...",
          submit: "Gửi tin nhắn",
          subjectDefault: "Trao đổi cơ hội AI / Full-Stack",
          formNote:
            "Form gửi qua FormSubmit. Lần đầu cần bấm link kích hoạt trong email. Nếu lỗi, trang sẽ mở ứng dụng email để bạn gửi tay.",
          statusRequired: "Bạn nhập đủ tên, email và nội dung nhé.",
          statusEmail: "Email chưa đúng định dạng. Bạn kiểm tra lại nhé.",
          statusOpening: "Đang mở ứng dụng email của bạn…",
          statusSending: "Đang gửi tin nhắn…",
          statusSent: "Đã gửi! Mình sẽ phản hồi qua email của bạn.",
          statusFallback:
            "Chưa gửi trực tiếp được — đang mở ứng dụng email để bạn gửi tay.",
          toastSent: "Tin nhắn đã gửi. Cảm ơn bạn!",
          toastFallback: "Không gửi được từ trang, mình mở email giúp bạn.",
          sending: "Đang gửi…",
          mailName: "Họ tên",
          mailEmail: "Email",
          mailBody: "Nội dung liên hệ",
          mailSubject: "{subject} — từ {name}"
        },
        footer: {
          note: "© {year} Bùi Gia Uy. Xây bằng HTML, CSS và vanilla JS.",
          backTop: "Lên đầu ↑"
        },
        modal: {
          kicker: "Dự án",
          problem: "Vấn đề",
          approach: "Cách tiếp cận",
          architecture: "Kiến trúc",
          outcome: "Kết quả",
          stack: "Stack",
          discuss: "Trao đổi về dự án"
        },
        copy: {
          email: "email",
          phone: "số điện thoại",
          done: "Đã sao chép {label}: {value}",
          error: "Không sao chép được. Bạn chọn và copy thủ công nhé."
        },
        langLabel: "Chọn ngôn ngữ",
        theme: {
          toLight: "Chuyển sang giao diện sáng",
          toDark: "Chuyển sang giao diện tối"
        },
        trace: {
          plan: "truy xuất tài liệu chính sách HR",
          route: "policy · 98.46%",
          retrieve: "pgvector + RBAC filter",
          verify: "đã qua evidence gate",
          answer: "3 citation · đã trả lời"
        }
      },

      profile: {
        name: "Bùi Gia Uy",
        englishName: "Bui Gia Uy",
        role: "AI Engineer & Full-Stack Web Developer",
        shortRole: "AI Engineer",
        tagline: "Mình xây hệ thống AI để chạy thật, không chỉ demo.",
        summary:
          "AI Engineer & Full-Stack Web Developer tại TP. Hồ Chí Minh. Kinh nghiệm production với Next.js, NestJS, TypeScript và PostgreSQL; tập trung vào RAG nhiều tầng, multi-agent, guardrails và backend hiệu năng cao.",
        availability: "Đang tìm cơ hội AI / Full-Stack",
        location: "TP. Hồ Chí Minh · Remote / Hybrid",
        email: "giauy0987@gmail.com",
        phone: "0947879049",
        github: "https://github.com/BuiGiaUy",
        linkedin: "https://www.linkedin.com/in/uy-gia/",
        githubHandle: "BuiGiaUy",
        linkedinHandle: "in/uy-gia",
        cv: "assets/cv/Bui-Gia-Uy-CV.pdf",
        stats: [
          {
            value: "98.46%",
            label: "Độ chính xác intent routing",
            sub: "HR GENIE Smart Router"
          },
          {
            value: "1,453",
            label: "Kiểm thử tự động",
            sub: "1,036 Python · 417 NestJS"
          },
          {
            value: "70%",
            label: "Giảm tải database",
            sub: "Redis cache · Wine platform"
          },
          {
            value: "2 năm",
            label: "Kinh nghiệm web production",
            sub: "Next.js · NestJS · Laravel"
          }
        ]
      },

      contact: {
        endpoint: "https://formsubmit.co/ajax/giauy0987@gmail.com",
        note: "Form gửi qua FormSubmit. Lần đầu cần bấm link kích hoạt trong email."
      },

      experience: [
        {
          type: "work",
          company: "Hoa Lan Cattleya E-Commerce Co., Ltd",
          role: "Junior Full-Stack Developer",
          period: "03/2026 – 07/2026",
          location: "TP. Hồ Chí Minh",
          summary: "Ứng dụng web e-commerce chạy production.",
          bullets: [
            "Xây và bảo trì ứng dụng web production với Next.js, React, NestJS và TypeScript.",
            "Phát triển REST API và tính năng backend với NestJS, Prisma và PostgreSQL.",
            "Triển khai tính năng mới, xử lý lỗi production và cải thiện các flow hiện có.",
            "Phối hợp FE/BE để giữ tích hợp UI — API — database ổn định."
          ],
          tech: ["Next.js", "React", "NestJS", "TypeScript", "Prisma", "PostgreSQL"]
        },
        {
          type: "work",
          company: "Propway Vietnam",
          role: "Junior Full-Stack Developer · Web & Flutter",
          period: "06/2024 – 09/2025",
          location: "Startup Đài Loan · TP. Hồ Chí Minh",
          summary: "Ứng dụng mobile nội bộ và flow onboarding trên web.",
          bullets: [
            "Xây ứng dụng Flutter nội bộ, phát triển UI và tích hợp backend.",
            "Tích hợp Flutter với REST API (gồm các service Golang); tự tìm hiểu hành vi API khi tài liệu còn thiếu.",
            "Đóng góp cho web Vue.js: flow đăng ký và onboarding.",
            "Làm việc trong startup nhịp nhanh, xử lý lỗi và thích nghi công nghệ mới."
          ],
          tech: ["Flutter", "Dart", "Vue.js", "REST APIs", "Golang"]
        },
        {
          type: "program",
          company: "AI20K — AI Engineering & Product Build",
          role: "AI Engineer · Build Phase, Cohort 3",
          period: "08/2026 – Hiện tại",
          location: "Vingroup × VinUniversity",
          level: "Chương trình theo khung SFIA",
          summary: "Chương trình AI engineering thực chiến và capstone HR GENIE.",
          bullets: [
            "Backend Core & Testing cho HR GENIE: NestJS core, RBAC, audit log, ticket và CI.",
            "Tích hợp FastAPI/LangGraph agent sau NestJS API; viết integration test và kiểm chứng production.",
            "Docker, GitHub Actions, CI/CD, testing và kiểm chứng production."
          ],
          tech: ["RAG", "LLM", "LangGraph", "NestJS", "Next.js", "PostgreSQL", "Docker", "CI/CD"]
        }
      ],

      projects: [
        {
          id: "hr-genie",
          index: "01",
          title: "HR GENIE",
          subtitle: "Trợ lý chính sách HR dùng AI, trả lời có evidence gate",
          category: "ai",
          categoryLabel: "AI / RAG",
          year: "2026",
          organization: "AI20K · Vingroup × VinUniversity",
          role: "Backend Core & Testing · 4-person team",
          badge: "Dự án chính",
          status: "Định hướng production",
          size: "wide",
          summary:
            "Trợ lý chính sách nhân sự trả lời từ tài liệu nội bộ với citation, evidence gate và escalation cho câu hỏi nhạy cảm hoặc ngoài phạm vi.",
          problem:
            "Chính sách HR dài, nhiều phiên bản và phân quyền phức tạp. Một chatbot thông thường dễ bịa hoặc trả về tài liệu mà nhân viên không được xem.",
          approach: [
            "Hybrid retrieval trên pgvector, lọc quyền ngay trong truy vấn (pre-query authorization).",
            "Smart intent router phân loại policy / general / out-of-scope trước khi retrieval.",
            "Evidence gate và deterministic verifier đối soát câu trả lời với trích dẫn gốc.",
            "Escalation cho câu hỏi nhạy cảm, thiếu bằng chứng hoặc ngoài phạm vi.",
            "NestJS + Next.js + PostgreSQL + Docker + GitHub Actions cho vòng đời production."
          ],
          metrics: [
            { label: "Độ chính xác router", value: "98.46%" },
            { label: "Kiểm thử tự động", value: "1,453" },
            { label: "Kiểm thử Python", value: "1,036" },
            { label: "Kiểm thử NestJS", value: "417" }
          ],
          highlights: [
            "Citation-first: mỗi câu trả lời phải chỉ ra điều khoản và tài liệu nguồn.",
            "Guardrails + escalation thay vì cố trả lời mọi câu hỏi.",
            "1,453 kiểm thử tự động bao phủ backend, retrieval và API flow.",
            "Phân quyền dữ liệu nhân sự ngay tại lớp retrieval, không chỉ ở UI."
          ],
          tech: [
            "Python",
            "FastAPI",
            "LangGraph",
            "LangChain",
            "NestJS",
            "Next.js",
            "PostgreSQL",
            "pgvector",
            "Docker",
            "CI/CD"
          ],
          architecture: {
            nodes: ["Query", "Intent router", "Authorized retrieval", "Evidence gate", "Verifier", "Cited answer"],
            note: "RBAC pre-filter + hybrid search trên pgvector; request thiếu bằng chứng hoặc nhạy cảm sẽ escalation."
          },
          links: [],
          note: "Dự án nội bộ — trao đổi trực tiếp để xem mã nguồn."
        },
        {
          id: "wine-ecommerce",
          index: "02",
          title: "WINE E-COMMERCE",
          subtitle: "Storefront full-stack với thanh toán và cập nhật realtime",
          category: "fullstack",
          categoryLabel: "Full-Stack",
          year: "2024",
          organization: "TechMaster · Dự án PHP Full-Stack",
          role: "Full-Stack Developer",
          badge: "E-commerce",
          status: "Đã hoàn thiện",
          size: "normal",
          summary:
            "Nền tảng thương mại điện tử rượu vang với catalog, cart, checkout, thanh toán VNPay, realtime comment và admin CMS.",
          problem:
            "Cần một storefront hoàn chỉnh: catalog lớn, tìm kiếm, giỏ hàng, thanh toán, quản trị đơn và cập nhật tồn kho theo thời gian thực.",
          approach: [
            "Laravel 10 theo Repository Pattern và Service Layer để dễ mở rộng.",
            "Redis cache cho catalog, filter và cart session — giảm tải database.",
            "VNPay IPN với kiểm tra chữ ký HMAC-SHA512 và xử lý bất đồng bộ.",
            "Pusher WebSockets cho comment và trạng thái đơn hàng realtime.",
            "Admin CMS cho product, category, brand, user, order và content."
          ],
          metrics: [
            { label: "Giảm tải DB", value: "70%" },
            { label: "Thanh toán", value: "VNPay IPN" },
            { label: "Realtime", value: "Pusher WS" },
            { label: "Framework", value: "Laravel 10" }
          ],
          highlights: [
            "Luồng thanh toán có xác thực chữ ký và đối soát giao dịch.",
            "Redis cache giảm khoảng 70% truy vấn database.",
            "Realtime comment và trạng thái đơn hàng qua Pusher.",
            "Admin đầy đủ cho catalog, người dùng và đơn hàng."
          ],
          tech: ["Laravel 10", "PHP 8.1", "MySQL", "Redis", "Blade", "Bootstrap", "Vite", "Pusher", "VNPay"],
          architecture: {
            nodes: ["Blade / Vite", "Laravel 10", "Redis cache", "VNPay IPN", "Pusher"],
            note: "Repository + Service Layer; catalog/cart cache trong Redis; thanh toán xác thực bằng HMAC-SHA512."
          },
          links: [
            { label: "GitHub", url: "https://github.com/BuiGiaUy/wine_website" }
          ],
          note: "Mã nguồn công khai trên GitHub."
        },
        {
          id: "colosseum-certus",
          index: "03",
          title: "COLOSSEUM & CERTUS",
          subtitle: "Workflow multi-agent có tracing và evaluation tự động",
          category: "ai",
          categoryLabel: "Multi-Agent",
          year: "2026",
          organization: "VinUni Track 2 Advanced",
          role: "AI Engineer · Multi-Agent & Evaluation",
          badge: "Lab nghiên cứu",
          status: "Track nâng cao",
          size: "normal",
          summary:
            "Mạng lưới agent tự quản với Planner, Researcher, Critic và Executor; tracing và benchmark tự động cho chất lượng câu trả lời.",
          problem:
            "Cần một hệ multi-agent có thể phối hợp tác vụ phức tạp, đồng thời đo được chất lượng, chi phí token và độ trễ thay vì chỉ demo.",
          approach: [
            "Thiết kế graph có state bằng LangGraph với bốn vai trò agent rõ ràng.",
            "Distributed tracing qua LangSmith và Langfuse cho từng LLM call.",
            "Đánh giá tự động Context Precision, Faithfulness và Answer Relevance bằng Ragas & TruLens.",
            "Golden dataset và benchmark để phát hiện regression trước khi release."
          ],
          metrics: [
            { label: "Vai trò agent", value: "4" },
            { label: "Evaluation", value: "Ragas + TruLens" },
            { label: "Tracing", value: "LangSmith + Langfuse" },
            { label: "Orchestration", value: "LangGraph" }
          ],
          highlights: [
            "Planner → Researcher → Critic → Executor với vòng lặp critique.",
            "Tracing chi phí token và latency theo từng bước.",
            "Benchmark tự động trên golden dataset.",
            "Phát hiện drift ngữ nghĩa và regression chất lượng prompt."
          ],
          tech: ["LangGraph", "LangChain", "LangSmith", "Langfuse", "Ragas", "TruLens", "Docker", "FastAPI"],
          architecture: {
            nodes: ["Planner", "Researcher", "Critic", "Executor", "Eval"],
            note: "Graph có state, lặp theo chu kỳ; mỗi bước được trace và chấm điểm trên golden dataset."
          },
          links: [
            {
              label: "GitHub",
              url: "https://github.com/BuiGiaUy/Track2-Day26-2A202601867-BuiGiaUy"
            }
          ],
          note: "Mã nguồn công khai trên GitHub."
        },
        {
          id: "portfolio-backend",
          index: "04",
          title: "PORTFOLIO BACKEND",
          subtitle: "API NestJS với Prisma, rate limit trên Redis và Docker",
          category: "fullstack",
          categoryLabel: "Backend",
          year: "2026",
          organization: "Cá nhân · repo public",
          role: "Backend Developer",
          badge: "NestJS",
          status: "Đang làm",
          size: "normal",
          summary:
            "REST API quản lý dự án và lượt xem, JWT guard, rate limit theo IP trên Redis, Prisma/PostgreSQL và Docker.",
          problem:
            "Cần một backend nhỏ nhưng đủ chuẩn production cho portfolio: auth, phân quyền, rate limit, migration và test.",
          approach: [
            "NestJS modules cho project, view tracking và auth.",
            "JWT guard bảo vệ route riêng tư; RBAC ở tầng service.",
            "Rate limit theo IP lưu trên Redis, chặn spam ở gateway.",
            "Prisma + PostgreSQL cho schema, migration và seed.",
            "Docker + test tự động chạy giống nhau ở local và CI."
          ],
          metrics: [
            { label: "API", value: "NestJS" },
            { label: "ORM", value: "Prisma" },
            { label: "Rate limit", value: "Redis" },
            { label: "Runtime", value: "Docker" }
          ],
          highlights: [
            "JWT guard + rate limit theo IP.",
            "Prisma schema, migration và seed data.",
            "Dockerized service với test tự động.",
            "Cùng codebase chạy local và CI."
          ],
          tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Docker", "Jest"],
          architecture: {
            nodes: ["Client", "JWT guard", "Rate limit", "Service", "Prisma", "PostgreSQL"],
            note: "Rate limit theo IP trên Redis trước khi vào controller; Prisma quản lý schema và migration."
          },
          links: [
            { label: "GitHub", url: "https://github.com/BuiGiaUy/portfolio-backend" }
          ],
          note: "Mã nguồn công khai trên GitHub."
        },
        {
          id: "crypto-trade",
          index: "05",
          title: "CRYPTO TRADE",
          subtitle: "Dashboard React, lớp API Next.js và auth server Express",
          category: "fullstack",
          categoryLabel: "Full-Stack",
          year: "2022",
          organization: "Cá nhân · các repo public",
          role: "Full-Stack Developer",
          badge: "React & Node",
          status: "Hoàn thành",
          size: "normal",
          summary:
            "Dashboard theo dõi thị trường crypto, tách frontend React, API layer Next.js và auth server Express/MongoDB với JWT.",
          problem:
            "Cần tách rõ dashboard, lớp API và auth server để dễ thay đổi nguồn dữ liệu thị trường và bảo vệ route riêng tư.",
          approach: [
            "React dashboard hiển thị dữ liệu thị trường, tách khỏi lớp API.",
            "Express + MongoDB cho đăng ký/đăng nhập và middleware JWT.",
            "Next.js API làm trung gian giữa dashboard và auth server.",
            "Ba repo độc lập để dễ thay thế từng lớp."
          ],
          metrics: [
            { label: "Dashboard", value: "React" },
            { label: "Auth", value: "JWT" },
            { label: "Database", value: "MongoDB" },
            { label: "API layer", value: "Next.js" }
          ],
          highlights: [
            "Phân tách frontend, API và auth server.",
            "JWT middleware bảo vệ route riêng tư.",
            "Next.js API layer làm trung gian.",
            "Ba repo public, dễ đọc và tái sử dụng."
          ],
          tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "JWT"],
          architecture: {
            nodes: ["React dashboard", "Next.js API", "Express auth", "MongoDB"],
            note: "Tách repo cho dashboard, lớp API và auth server."
          },
          links: [
            { label: "CrytoTrade", url: "https://github.com/BuiGiaUy/CrytoTrade" },
            { label: "binance-ui", url: "https://github.com/BuiGiaUy/binance-ui" },
            { label: "nextjs-binance-server", url: "https://github.com/BuiGiaUy/nextjs-binance-server" }
          ],
          note: "Mã nguồn công khai trên GitHub."
        }
      ],

      skills: [
        {
          key: "ai",
          title: "AI / LLM",
          kicker: "RAG, agent, đánh giá",
          items: [
            {
              name: "RAG pipelines",
              evidence: "Hybrid retrieval, reranking và câu trả lời citation-first cho HR GENIE."
            },
            {
              name: "Multi-agent workflows",
              evidence: "Graph có state bằng LangGraph: Planner → Researcher → Critic → Executor."
            },
            {
              name: "Vector search",
              evidence: "pgvector, HNSW và filter phân quyền trước truy vấn."
            },
            {
              name: "Evaluation & tracing",
              evidence: "Ragas, TruLens, LangSmith, Langfuse; benchmark trên golden dataset."
            },
            {
              name: "Guardrails",
              evidence: "Evidence gate, deterministic verifier và escalation."
            },
            {
              name: "Python / FastAPI",
              evidence: "Suy luận AI và streaming service cho RAG pipeline."
            }
          ]
        },
        {
          key: "backend",
          title: "Backend",
          kicker: "API, dữ liệu, auth",
          items: [
            {
              name: "NestJS / Node.js",
              evidence: "Service user, phân quyền và audit log cho HR GENIE."
            },
            {
              name: "TypeScript / REST APIs",
              evidence: "Payload có type, validate DTO và API contract rõ ràng."
            },
            {
              name: "PostgreSQL / Prisma",
              evidence: "Schema quan hệ, migration, seed và query tuning."
            },
            {
              name: "Redis",
              evidence: "Cache catalog/cart và rate limit theo IP."
            },
            {
              name: "JWT / RBAC",
              evidence: "Auth guard, refresh token rotation và phân quyền nhiều tầng."
            },
            {
              name: "Laravel / PHP",
              evidence: "Repository Pattern, Service Layer và tích hợp VNPay."
            }
          ]
        },
        {
          key: "frontend",
          title: "Frontend",
          kicker: "Giao diện chạy thật",
          items: [
            {
              name: "React / Next.js",
              evidence: "App Router, SSR và streaming UI cho HR GENIE."
            },
            {
              name: "TypeScript",
              evidence: "Type chặt cho payload API và component contract."
            },
            {
              name: "Vue.js",
              evidence: "Flow đăng ký và onboarding tại Propway."
            },
            {
              name: "Tailwind / SCSS",
              evidence: "Design system, layout responsive và micro-interaction."
            },
            {
              name: "Flutter / Dart",
              evidence: "Ứng dụng mobile nội bộ và tích hợp backend tại Propway."
            },
            {
              name: "Accessibility",
              evidence: "Luồng bàn phím, quản lý focus và fallback reduced-motion."
            }
          ]
        },
        {
          key: "devops",
          title: "DevOps và chất lượng phần mềm",
          kicker: "Triển khai, quan sát, cải tiến",
          items: [
            {
              name: "Docker",
              evidence: "Multi-stage build và compose cho AI service."
            },
            {
              name: "GitHub Actions / CI",
              evidence: "Pipeline test, lint và deploy trước khi merge."
            },
            {
              name: "Testing",
              evidence: "1,453 kiểm thử tự động; unit, integration và API flow."
            },
            {
              name: "Observability",
              evidence: "LangSmith, Langfuse; token cost, latency và trace."
            },
            {
              name: "Linux / Nginx",
              evidence: "Reverse proxy, SSL và triển khai service."
            },
            {
              name: "Git workflow",
              evidence: "Feature branch, pull request và code review."
            }
          ]
        }
      ],

      principles: [
        {
          number: "01",
          title: "Bằng chứng trước cảm hứng",
          text: "Câu trả lời AI phải có nguồn, test và metric. Không có bằng chứng thì chuyển cho người xử lý, không đoán."
        },
        {
          number: "02",
          title: "Làm trọn quy trình",
          text: "Từ retrieval, API, UI đến Docker và CI/CD. Một demo đẹp chưa đủ nếu không chạy được trong production."
        },
        {
          number: "03",
          title: "Viết để người sau đọc",
          text: "Code, kiến trúc và giao diện đều phải dễ hiểu cho người tiếp theo. Rõ ràng là một tính năng."
        }
      ],

      education: [
        {
          type: "program",
          title: "AI20K — AI Engineering & Product Build",
          issuer: "Vingroup × VinUniversity",
          period: "08/2026 – Hiện tại",
          detail:
            "Ứng dụng LLM, RAG, agent, evaluation, observability, data pipeline, MLOps và triển khai production."
        },
        {
          type: "certificate",
          title: "Professional Certificate — PHP Full-Stack Web Development",
          issuer: "TechMaster Vietnam",
          period: "2023 — 2024",
          detail:
            "PHP, Laravel, MySQL, JavaScript, REST API, MVC, CRUD, authentication, RBAC và thiết kế database."
        },
        {
          type: "certificate",
          title: "React.js Developer Certificate",
          issuer: "W3Schools",
          period: "Sep 2022 · Credential 1MZD8JNIZC",
          detail:
            "Hooks, state management, component lifecycle, SPA routing và tích hợp REST API."
        },
        {
          type: "education",
          title: "Công nghệ thông tin — Học phần đại học",
          issuer: "Đại học Công nghiệp TP. Hồ Chí Minh",
          period: "2021 — 2023",
          detail:
            "Các học phần về software engineering, database và nền tảng lập trình."
        }
      ],

      aiKnowledge: [
        {
          keywords: ["hr genie", "rag", "retrieval", "router", "vinuni", "vingroup", "ai20k"],
          answer:
            "HR GENIE là trợ lý chính sách nhân sự mình làm Backend Core & Testing trong AI20K (Vingroup × VinUniversity). Pipeline gồm Smart Intent Router đạt 98.46% accuracy, retrieval có phân quyền trên pgvector, Evidence Gate và deterministic verifier để câu trả lời luôn kèm citation. Hệ thống có 1,453 kiểm thử tự động (1,036 Python + 417 NestJS), guardrails và escalation cho câu hỏi nhạy cảm hoặc ngoài phạm vi."
        },
        {
          keywords: ["multi-agent", "agent", "langgraph", "langchain", "colosseum", "critic", "planner"],
          answer:
            "Mình làm multi-agent với LangGraph trong Colosseum & Certus Labs (VinUni Track 2 Advanced). Graph có state với bốn vai trò Planner, Researcher, Critic và Executor. Mỗi bước được trace bằng LangSmith/Langfuse, và chất lượng được đánh giá tự động bằng Ragas & TruLens trên golden dataset."
        },
        {
          keywords: ["backend", "fullstack", "nestjs", "nextjs", "laravel", "postgresql", "redis", "api"],
          answer:
            "Backend: NestJS/Node.js và TypeScript cho API production, Prisma/PostgreSQL cho dữ liệu, Redis cho cache và rate limiting, JWT/RBAC cho auth. Mình cũng làm Laravel/PHP (Wine e-commerce) và Flutter/Vue.js ở Propway. Frontend: React, Next.js, Vue.js, Tailwind/SCSS."
        },
        {
          keywords: ["kinh nghiệm", "experience", "làm ở đâu", "công ty", "propway", "hoa lan"],
          answer:
            "Mình có khoảng 2 năm kinh nghiệm production: Junior Full-Stack tại Hoa Lan Cattleya (Next.js, NestJS, Prisma, PostgreSQL) và Propway Vietnam (Flutter, Vue.js, REST API, Golang backend). Sau đó mình tham gia AI20K và làm Backend Core & Testing cho HR GENIE — trợ lý RAG có citation, guardrails và 1,453 kiểm thử."
        },
        {
          keywords: ["dự án", "project", "portfolio", "sản phẩm", "wine", "crypto"],
          answer:
            "Portfolio có 5 dự án tiêu biểu: HR GENIE (RAG/LLM), Wine E-Commerce (Laravel, VNPay, Redis, Pusher), Colosseum & Certus (multi-agent, evaluation), Portfolio Backend (NestJS, Prisma, Redis rate limit) và Crypto Trade (React, Next.js, Express/MongoDB). Bấm vào từng thẻ để xem vấn đề, cách tiếp cận, số liệu và kiến trúc."
        },
        {
          keywords: ["liên hệ", "contact", "email", "phone", "tuyển dụng", "hợp tác", "cv"],
          answer:
            "Bạn có thể liên hệ trực tiếp:\n• Email: giauy0987@gmail.com\n• Điện thoại: 0947879049\n• LinkedIn: linkedin.com/in/uy-gia\n• GitHub: github.com/BuiGiaUy\nCV PDF có ở nút “Tải CV” trên trang. Mình đang mở cho vị trí AI Engineer và Full-Stack Web."
        },
        {
          keywords: ["kỹ năng", "skill", "stack", "công nghệ", "python", "fastapi", "docker"],
          answer:
            "Stack chính: AI/LLM (RAG, LangGraph, pgvector, Ragas/TruLens, LangSmith/Langfuse), Backend (NestJS, TypeScript, PostgreSQL, Prisma, Redis, JWT/RBAC, Laravel), Frontend (React, Next.js, Vue.js, Tailwind) và DevOps (Docker, GitHub Actions, CI/CD, Nginx, Linux). Mình ưu tiên kiểm thử tự động và observability."
        },
        {
          keywords: ["học vấn", "chứng chỉ", "bằng cấp", "đào tạo", "education", "certificate"],
          answer:
            "Học vấn & chứng chỉ: AI20K — AI Engineering & Product Build (Vingroup × VinUniversity, 08/2026 – Hiện tại), Professional Certificate PHP Full-Stack Web Development (TechMaster, 2023–2024), React.js Developer Certificate (W3Schools, 2022). Ngoài ra mình có coursework IT tại Đại học Công nghiệp TP. Hồ Chí Minh (2021–2023)."
        },
        {
          keywords: ["chào", "hello", "hi", "hey", "alo", "bot ơi"],
          answer:
            "Chào bạn! Mình là trợ lý demo của Bùi Gia Uy. Bạn có thể hỏi về HR GENIE & RAG, multi-agent, kinh nghiệm làm việc, stack, dự án hoặc thông tin liên hệ."
        },
        {
          keywords: ["cảm ơn", "thanks", "thank you", "ok"],
          answer:
            "Không có gì! Nếu cần trao đổi công việc, bạn email giauy0987@gmail.com hoặc gọi 0947879049 nhé."
        }
      ],

      aiPrompts: [
        "HR GENIE & RAG pipeline hoạt động thế nào?",
        "Kinh nghiệm multi-agent và LangGraph của Uy?",
        "Stack backend/frontend gồm những gì?",
        "Làm sao để liên hệ hoặc tải CV?"
      ]
    },

    en: {
      ui: {
        meta: {
          title: "Bui Gia Uy — AI Engineer & Full-Stack Web Developer",
          description:
            "Portfolio of Bui Gia Uy — AI Engineer & Full-Stack Web Developer. Multi-stage RAG, multi-agent systems, NestJS, Next.js, PostgreSQL and AI systems that run in production.",
          ogTitle: "Bui Gia Uy — AI Engineer & Full-Stack Web Developer",
          ogDescription:
            "I build AI systems that actually ship: multi-stage RAG, multi-agent workflows, production backends and interfaces clear enough to trust.",
          ogLocale: "en_US"
        },
        a11y: {
          skip: "Skip navigation",
          theme: "Toggle light/dark theme",
          quickLinks: "Quick links",
          metrics: "Key metrics",
          filterProjects: "Filter projects",
          chatInput: "Question for the assistant",
          closeCase: "Close project",
          language: "Choose language",
          mainNav: "Main navigation",
          mobileNav: "Mobile navigation",
          home: "Bui Gia Uy — back to top",
          openMenu: "Open menu",
          closeMenu: "Close menu"
        },
        nav: {
          work: "Work",
          experience: "Experience",
          stack: "Stack",
          ask: "Ask AI",
          contact: "Contact"
        },
        header: {
          role: "AI Engineer",
          availability: "Open to work",
          cv: "Download AI CV"
        },
        hero: {
          eyebrow: "AI Engineer · Ho Chi Minh City",
          titleHtml:
            'I build<br><span class="mark">AI systems</span><br>that actually ship<span class="accent-dot">.</span>',
          lede:
            "AI Engineer & Full-Stack Web Developer. I build multi-stage RAG, multi-agent workflows, production backends and interfaces clear enough to trust.",
          ctaWork: "View projects",
          ctaCv: "Download AI CV",
          ctaCvFullStack: "Full-Stack Web CV",
          portraitAlt: "Portrait of Bui Gia Uy",
          portraitTag: "open to work",
          portraitLoc: "Ho Chi Minh City · Remote / Hybrid"
        },
        work: {
          index: "01 — Selected work",
          titleHtml: "Real projects,<br>not a list of technologies.",
          lede:
            "Every card is a real problem: problem, approach, metrics and architecture. Open one for details and source when available.",
          filterAll: "All",
          filterAi: "AI / RAG",
          filterFullstack: "Full-Stack",
          empty: "No projects in this group yet.",
          view: "View project"
        },
        experience: {
          index: "02 — Experience",
          titleHtml: "What I've built,<br>and where.",
          lede:
            "Production experience in e-commerce and startups, plus an AI engineering program focused on systems that actually run.",
          typeWork: "Work",
          typeProgram: "Program"
        },
        stack: {
          index: "03 — Stack",
          titleHtml: "Tools I use<br>to ship.",
          lede:
            "Not a logo wall. Every entry is something I have actually done with that technology."
        },
        ask: {
          index: "04 — Ask my AI",
          titleHtml: "Quick answers about<br>my experience.",
          lede:
            "Offline demo: answers come from keyword matching over the portfolio data, with no external API calls.",
          greetingHtml:
            "Hi! I'm the demo assistant for <strong>Bui Gia Uy</strong>. Ask me about RAG, multi-agent systems, experience, stack or contact details.",
          userAvatar: "You",
          inputLabel: "Question for the assistant",
          inputPlaceholder: "Ask about RAG, experience, stack...",
          send: "Send",
          asideKicker: "What this demo knows",
          know: [
            "HR GENIE, RAG pipeline, 98.46% router and 1,453 tests",
            "Multi-agent, LangGraph, Ragas/TruLens, tracing",
            "Experience at Hoa Lan Cattleya, Propway, AI20K",
            "Backend, frontend, DevOps stack and contact details"
          ],
          noteStrong: "No API calls.",
          noteTextHtml:
            'This demo answers from static data in <code>assets/js/data.js</code>. Want the real AI version? <a href="#contact">Let\'s talk</a>.',
          metaPrompts: "4 suggested prompts",
          metaNetwork: "0 network calls",
          metaAria: "ARIA live",
          fallback:
            "I don't have data for that question yet. This is an offline demo built from the portfolio content. Try asking about HR GENIE & RAG, multi-agent/LangGraph, experience, backend stack or contact details."
        },
        contact: {
          index: "05 — Contact",
          titleHtml: "Need someone who can<br>ship an AI product?",
          lede:
            "I'm open to AI Engineer and Full-Stack Web roles. Send a short message and I'll reply by email.",
          phoneLabel: "Phone",
          copyEmail: "Copy email",
          copyPhone: "Copy phone",
          nameLabel: 'Full name <em aria-hidden="true">*</em>',
          emailLabel: 'Email <em aria-hidden="true">*</em>',
          subjectLabel: "Subject",
          messageLabel: 'Message <em aria-hidden="true">*</em>',
          namePlaceholder: "Jane Doe",
          emailPlaceholder: "name@company.com",
          subjectPlaceholder: "AI Engineer / Full-Stack Web role",
          messagePlaceholder: "Tell me about the role, team or project...",
          submit: "Send message",
          subjectDefault: "AI / Full-Stack opportunity",
          formNote:
            "This form uses FormSubmit. The first submission needs an activation link from the email. If it fails, the page opens your email app so you can send it manually.",
          statusRequired: "Please fill in your name, email and message.",
          statusEmail: "That email address doesn't look right. Please check it.",
          statusOpening: "Opening your email app…",
          statusSending: "Sending your message…",
          statusSent: "Sent! I'll reply to your email.",
          statusFallback:
            "Couldn't send directly — opening your email app so you can send it manually.",
          toastSent: "Message sent. Thank you!",
          toastFallback: "Couldn't send from the page, opening email for you.",
          sending: "Sending…",
          mailName: "Name",
          mailEmail: "Email",
          mailBody: "Message",
          mailSubject: "{subject} — from {name}"
        },
        footer: {
          note: "© {year} Bui Gia Uy. Built with HTML, CSS and vanilla JS.",
          backTop: "Back to top ↑"
        },
        modal: {
          kicker: "Case study",
          problem: "Problem",
          approach: "Approach",
          architecture: "Architecture",
          outcome: "Outcome",
          stack: "Stack",
          discuss: "Discuss this project"
        },
        copy: {
          email: "email",
          phone: "phone number",
          done: "Copied {label}: {value}",
          error: "Could not copy. Please select and copy it manually."
        },
        langLabel: "Choose language",
        theme: {
          toLight: "Switch to light theme",
          toDark: "Switch to dark theme"
        },
        trace: {
          plan: "retrieve HR policy docs",
          route: "policy · 98.46%",
          retrieve: "pgvector + RBAC filter",
          verify: "evidence gate passed",
          answer: "3 citations · shipped"
        }
      },

      profile: {
        name: "Bui Gia Uy",
        englishName: "Bui Gia Uy",
        role: "AI Engineer & Full-Stack Web Developer",
        shortRole: "AI Engineer",
        tagline: "I build AI systems that actually ship, not just demos.",
        summary:
          "AI Engineer & Full-Stack Web Developer based in Ho Chi Minh City. Production experience with Next.js, NestJS, TypeScript and PostgreSQL; focused on multi-stage RAG, multi-agent workflows, guardrails and high-performance backends.",
        availability: "Open to AI / Full-Stack roles",
        location: "Ho Chi Minh City · Remote / Hybrid",
        email: "giauy0987@gmail.com",
        phone: "0947879049",
        github: "https://github.com/BuiGiaUy",
        linkedin: "https://www.linkedin.com/in/uy-gia/",
        githubHandle: "BuiGiaUy",
        linkedinHandle: "in/uy-gia",
        cv: "assets/cv/Bui-Gia-Uy-CV.pdf",
        stats: [
          {
            value: "98.46%",
            label: "Intent routing accuracy",
            sub: "HR GENIE Smart Router"
          },
          {
            value: "1,453",
            label: "Automated tests",
            sub: "1,036 Python · 417 NestJS"
          },
          {
            value: "70%",
            label: "Database load cut",
            sub: "Redis cache · Wine platform"
          },
          {
            value: "2 yrs",
            label: "Building production web",
            sub: "Next.js · NestJS · Laravel"
          }
        ]
      },

      contact: {
        endpoint: "https://formsubmit.co/ajax/giauy0987@gmail.com",
        note: "Submissions go through FormSubmit. The first one needs an activation link from the email."
      },

      experience: [
        {
          type: "work",
          company: "Hoa Lan Cattleya E-Commerce Co., Ltd",
          role: "Junior Full-Stack Developer",
          period: "Mar 2026 — Jul 2026",
          location: "Ho Chi Minh City",
          summary: "Production e-commerce web applications.",
          bullets: [
            "Built and maintained production web applications with Next.js, React, NestJS and TypeScript.",
            "Developed REST APIs and backend features with NestJS, Prisma and PostgreSQL.",
            "Shipped new features, debugged production issues and improved existing flows.",
            "Coordinated frontend and backend work to keep UI, API and database integrations stable."
          ],
          tech: ["Next.js", "React", "NestJS", "TypeScript", "Prisma", "PostgreSQL"]
        },
        {
          type: "work",
          company: "Propway Vietnam",
          role: "Junior Full-Stack Developer · Web & Flutter",
          period: "Jun 2024 — Sep 2025",
          location: "Taiwan-based startup · Ho Chi Minh City",
          summary: "Internal mobile apps and web onboarding flows.",
          bullets: [
            "Built an internal Flutter app, UI features and backend service integrations.",
            "Integrated Flutter with REST APIs (including Golang services); investigated API behavior when documentation was missing.",
            "Contributed to the Vue.js web app: registration and onboarding flows.",
            "Worked in a fast-moving startup, debugging issues and adapting to new technologies."
          ],
          tech: ["Flutter", "Dart", "Vue.js", "REST APIs", "Golang"]
        },
        {
          type: "program",
          company: "AI20K — AI Engineering & Product Build",
          role: "AI Engineer · Build Phase, Cohort 3",
          period: "Aug 2026 – Present",
          location: "Vingroup × VinUniversity",
          level: "SFIA-aligned program",
          summary: "Hands-on AI engineering program and the HR GENIE capstone.",
          bullets: [
            "Backend Core & Testing for HR GENIE: NestJS core, RBAC, audit logs, tickets and CI.",
            "Integrated the FastAPI/LangGraph agent behind the NestJS API; wrote integration tests and production verification.",
            "Worked with Docker, GitHub Actions, CI/CD, testing and production verification."
          ],
          tech: ["RAG", "LLM", "LangGraph", "NestJS", "Next.js", "PostgreSQL", "Docker", "CI/CD"]
        }
      ],

      projects: [
        {
          id: "hr-genie",
          index: "01",
          title: "HR GENIE",
          subtitle: "AI-powered HR policy assistant with evidence-gated answers",
          category: "ai",
          categoryLabel: "AI / RAG",
          year: "2026",
          organization: "AI20K · Vingroup × VinUniversity",
          role: "Backend Core & Testing · 4-person team",
          badge: "Flagship",
          status: "Production-oriented",
          size: "wide",
          summary:
            "An HR policy assistant that answers from internal documents with citations, an evidence gate and escalation for sensitive or out-of-scope questions.",
          problem:
            "HR policies are long, versioned and permissioned. A generic chatbot easily hallucinates or returns documents an employee is not allowed to see.",
          approach: [
            "Hybrid retrieval on pgvector with permission filters applied inside the query (pre-query authorization).",
            "A Smart Intent Router classifies policy / general / out-of-scope before retrieval.",
            "An evidence gate and deterministic verifier check the answer against source citations.",
            "Escalation for sensitive questions, missing evidence or out-of-scope requests.",
            "NestJS + Next.js + PostgreSQL + Docker + GitHub Actions across the production lifecycle."
          ],
          metrics: [
            { label: "Router accuracy", value: "98.46%" },
            { label: "Automated tests", value: "1,453" },
            { label: "Python tests", value: "1,036" },
            { label: "NestJS tests", value: "417" }
          ],
          highlights: [
            "Citation-first: every answer must point to the source clause and document.",
            "Guardrails and escalation instead of answering everything.",
            "1,453 automated tests covering backend, retrieval and API flows.",
            "HR data permissions enforced at retrieval, not only in the UI."
          ],
          tech: [
            "Python",
            "FastAPI",
            "LangGraph",
            "LangChain",
            "NestJS",
            "Next.js",
            "PostgreSQL",
            "pgvector",
            "Docker",
            "CI/CD"
          ],
          architecture: {
            nodes: ["Query", "Intent router", "Authorized retrieval", "Evidence gate", "Verifier", "Cited answer"],
            note: "RBAC pre-filter + hybrid search on pgvector; unsupported or sensitive requests escalate."
          },
          links: [],
          note: "Internal project — happy to walk through the source in a conversation."
        },
        {
          id: "wine-ecommerce",
          index: "02",
          title: "WINE E-COMMERCE",
          subtitle: "Full-stack storefront with payments and real-time updates",
          category: "fullstack",
          categoryLabel: "Full-Stack",
          year: "2024",
          organization: "TechMaster · PHP Full-Stack Project",
          role: "Full-Stack Developer",
          badge: "E-commerce",
          status: "Shipped",
          size: "normal",
          summary:
            "A wine e-commerce platform with catalog, cart, checkout, VNPay payments, real-time comments and an admin CMS.",
          problem:
            "Needed a complete storefront: a large catalog, search, cart, payments, order management and real-time inventory updates.",
          approach: [
            "Laravel 10 with Repository Pattern and Service Layer for maintainability.",
            "Redis cache for catalog, filters and cart sessions — reducing database load.",
            "VNPay IPN with HMAC-SHA512 signature validation and asynchronous handling.",
            "Pusher WebSockets for real-time comments and order status.",
            "Admin CMS for products, categories, brands, users, orders and content."
          ],
          metrics: [
            { label: "DB load reduced", value: "70%" },
            { label: "Payment", value: "VNPay IPN" },
            { label: "Realtime", value: "Pusher WS" },
            { label: "Framework", value: "Laravel 10" }
          ],
          highlights: [
            "Payment flow with signature validation and transaction reconciliation.",
            "Redis cache cut database queries by roughly 70%.",
            "Real-time comments and order status through Pusher.",
            "Full admin for catalog, users and orders."
          ],
          tech: ["Laravel 10", "PHP 8.1", "MySQL", "Redis", "Blade", "Bootstrap", "Vite", "Pusher", "VNPay"],
          architecture: {
            nodes: ["Blade / Vite", "Laravel 10", "Redis cache", "VNPay IPN", "Pusher"],
            note: "Repository + Service Layer; catalog/cart cached in Redis; payment verified by HMAC-SHA512."
          },
          links: [
            { label: "GitHub", url: "https://github.com/BuiGiaUy/wine_website" }
          ],
          note: "Source is public on GitHub."
        },
        {
          id: "colosseum-certus",
          index: "03",
          title: "COLOSSEUM & CERTUS",
          subtitle: "Multi-agent workflows with tracing and automated evaluation",
          category: "ai",
          categoryLabel: "Multi-Agent",
          year: "2026",
          organization: "VinUni Track 2 Advanced",
          role: "AI Engineer · Multi-Agent & Evaluation",
          badge: "Research lab",
          status: "Advanced track",
          size: "normal",
          summary:
            "A self-managing agent network with Planner, Researcher, Critic and Executor roles, plus tracing and automated benchmarks for answer quality.",
          problem:
            "Needed a multi-agent system that could coordinate complex tasks and measure quality, token cost and latency instead of stopping at a demo.",
          approach: [
            "Designed a stateful graph with LangGraph and four clear agent roles.",
            "Distributed tracing through LangSmith and Langfuse for every LLM call.",
            "Automated evaluation of Context Precision, Faithfulness and Answer Relevance with Ragas & TruLens.",
            "Golden dataset and benchmarks to catch regressions before release."
          ],
          metrics: [
            { label: "Agent roles", value: "4" },
            { label: "Evaluation", value: "Ragas + TruLens" },
            { label: "Tracing", value: "LangSmith + Langfuse" },
            { label: "Orchestration", value: "LangGraph" }
          ],
          highlights: [
            "Planner → Researcher → Critic → Executor with a critique loop.",
            "Token cost and latency traced at every step.",
            "Automated benchmarks on a golden dataset.",
            "Detects semantic drift and prompt quality regressions."
          ],
          tech: ["LangGraph", "LangChain", "LangSmith", "Langfuse", "Ragas", "TruLens", "Docker", "FastAPI"],
          architecture: {
            nodes: ["Planner", "Researcher", "Critic", "Executor", "Eval"],
            note: "Stateful cyclical graph; every step is traced and scored against a golden dataset."
          },
          links: [
            {
              label: "GitHub",
              url: "https://github.com/BuiGiaUy/Track2-Day26-2A202601867-BuiGiaUy"
            }
          ],
          note: "Source is public on GitHub."
        },
        {
          id: "portfolio-backend",
          index: "04",
          title: "PORTFOLIO BACKEND",
          subtitle: "NestJS API with Prisma, Redis rate limiting and Docker",
          category: "fullstack",
          categoryLabel: "Backend",
          year: "2026",
          organization: "Personal · public repo",
          role: "Backend Developer",
          badge: "NestJS",
          status: "In progress",
          size: "normal",
          summary:
            "A project and view-tracking REST API with JWT guards, Redis-backed IP rate limiting, Prisma/PostgreSQL and Docker.",
          problem:
            "Needed a small but production-grade backend for the portfolio: auth, authorization, rate limiting, migrations and tests.",
          approach: [
            "NestJS modules for projects, view tracking and auth.",
            "JWT guards protect private routes; RBAC at the service layer.",
            "IP-based rate limiting stored in Redis, blocking spam at the gateway.",
            "Prisma + PostgreSQL for schema, migrations and seed data.",
            "Docker + automated tests that run the same locally and in CI."
          ],
          metrics: [
            { label: "API", value: "NestJS" },
            { label: "ORM", value: "Prisma" },
            { label: "Rate limit", value: "Redis" },
            { label: "Runtime", value: "Docker" }
          ],
          highlights: [
            "JWT guards + IP-based rate limiting.",
            "Prisma schema, migrations and seed data.",
            "Dockerized service with automated tests.",
            "The same codebase runs locally and in CI."
          ],
          tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Docker", "Jest"],
          architecture: {
            nodes: ["Client", "JWT guard", "Rate limit", "Service", "Prisma", "PostgreSQL"],
            note: "Redis-backed IP rate limiting before controller work; Prisma handles schema and migrations."
          },
          links: [
            { label: "GitHub", url: "https://github.com/BuiGiaUy/portfolio-backend" }
          ],
          note: "Source is public on GitHub."
        },
        {
          id: "crypto-trade",
          index: "05",
          title: "CRYPTO TRADE",
          subtitle: "React dashboard, Next.js API layer and Express auth server",
          category: "fullstack",
          categoryLabel: "Full-Stack",
          year: "2022",
          organization: "Personal · public repos",
          role: "Full-Stack Developer",
          badge: "React & Node",
          status: "Completed",
          size: "normal",
          summary:
            "A crypto market dashboard split into a React frontend, a Next.js API layer and an Express/MongoDB auth server with JWT.",
          problem:
            "Needed clear separation between the dashboard, API layer and auth server so market data sources could change and private routes stayed protected.",
          approach: [
            "React dashboard displaying market data, separate from the API layer.",
            "Express + MongoDB for signup/login and JWT middleware.",
            "Next.js API acting as the middle layer between dashboard and auth server.",
            "Three independent repos so each layer can be replaced easily."
          ],
          metrics: [
            { label: "Dashboard", value: "React" },
            { label: "Auth", value: "JWT" },
            { label: "Database", value: "MongoDB" },
            { label: "API layer", value: "Next.js" }
          ],
          highlights: [
            "Separated frontend, API and auth server.",
            "JWT middleware protecting private routes.",
            "Next.js API layer as the middle tier.",
            "Three public repos that are easy to read and reuse."
          ],
          tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "JWT"],
          architecture: {
            nodes: ["React dashboard", "Next.js API", "Express auth", "MongoDB"],
            note: "Separate repos for dashboard, API layer and auth server."
          },
          links: [
            { label: "CrytoTrade", url: "https://github.com/BuiGiaUy/CrytoTrade" },
            { label: "binance-ui", url: "https://github.com/BuiGiaUy/binance-ui" },
            { label: "nextjs-binance-server", url: "https://github.com/BuiGiaUy/nextjs-binance-server" }
          ],
          note: "Source is public on GitHub."
        }
      ],

      skills: [
        {
          key: "ai",
          title: "AI / LLM",
          kicker: "RAG, agents, evaluation",
          items: [
            {
              name: "RAG pipelines",
              evidence: "Hybrid retrieval, reranking and citation-first answers for HR GENIE."
            },
            {
              name: "Multi-agent workflows",
              evidence: "Stateful LangGraph graph: Planner → Researcher → Critic → Executor."
            },
            {
              name: "Vector search",
              evidence: "pgvector, HNSW and pre-query authorization filters."
            },
            {
              name: "Evaluation & tracing",
              evidence: "Ragas, TruLens, LangSmith, Langfuse; golden-dataset benchmarks."
            },
            {
              name: "Guardrails",
              evidence: "Evidence gate, deterministic verifier and escalation."
            },
            {
              name: "Python / FastAPI",
              evidence: "AI inference and streaming service for the RAG pipeline."
            }
          ]
        },
        {
          key: "backend",
          title: "Backend",
          kicker: "APIs, data, auth",
          items: [
            {
              name: "NestJS / Node.js",
              evidence: "User service, authorization and audit log for HR GENIE."
            },
            {
              name: "TypeScript / REST APIs",
              evidence: "Typed payloads, DTO validation and clear API contracts."
            },
            {
              name: "PostgreSQL / Prisma",
              evidence: "Relational schema, migrations, seed data and query tuning."
            },
            {
              name: "Redis",
              evidence: "Catalog/cart caching and IP-based rate limiting."
            },
            {
              name: "JWT / RBAC",
              evidence: "Auth guards, refresh token rotation and multi-layer authorization."
            },
            {
              name: "Laravel / PHP",
              evidence: "Repository Pattern, Service Layer and VNPay integration."
            }
          ]
        },
        {
          key: "frontend",
          title: "Frontend",
          kicker: "Interfaces that ship",
          items: [
            {
              name: "React / Next.js",
              evidence: "App Router, SSR and streaming UI for HR GENIE."
            },
            {
              name: "TypeScript",
              evidence: "Strict types for API payloads and component contracts."
            },
            {
              name: "Vue.js",
              evidence: "Registration and onboarding flows at Propway."
            },
            {
              name: "Tailwind / SCSS",
              evidence: "Design systems, responsive layouts and micro-interactions."
            },
            {
              name: "Flutter / Dart",
              evidence: "Internal mobile app and backend integration at Propway."
            },
            {
              name: "Accessibility",
              evidence: "Keyboard flow, focus management and reduced-motion fallbacks."
            }
          ]
        },
        {
          key: "devops",
          title: "DevOps & quality",
          kicker: "Ship, observe, improve",
          items: [
            {
              name: "Docker",
              evidence: "Multi-stage builds and compose for AI services."
            },
            {
              name: "GitHub Actions / CI",
              evidence: "Test, lint and deploy pipeline before merge."
            },
            {
              name: "Testing",
              evidence: "1,453 automated tests; unit, integration and API flows."
            },
            {
              name: "Observability",
              evidence: "LangSmith, Langfuse; token cost, latency and traces."
            },
            {
              name: "Linux / Nginx",
              evidence: "Reverse proxy, SSL and service deployment."
            },
            {
              name: "Git workflow",
              evidence: "Feature branches, pull requests and code review."
            }
          ]
        }
      ],

      principles: [
        {
          number: "01",
          title: "Evidence over vibes",
          text: "AI answers need sources, tests and metrics. Without evidence, escalate instead of guessing."
        },
        {
          number: "02",
          title: "Ship the whole path",
          text: "From retrieval, API and UI to Docker and CI/CD. A pretty demo is not enough if it cannot run in production."
        },
        {
          number: "03",
          title: "Make it readable",
          text: "Code, architecture and interfaces should be easy for the next person to understand. Clarity is a feature."
        }
      ],

      education: [
        {
          type: "program",
          title: "AI20K — AI Engineering & Product Build",
          issuer: "Vingroup × VinUniversity",
          period: "Aug 2026 – Present",
          detail:
            "LLM applications, RAG, agents, evaluation, observability, data pipelines, MLOps and production deployment."
        },
        {
          type: "certificate",
          title: "Professional Certificate — PHP Full-Stack Web Development",
          issuer: "TechMaster Vietnam",
          period: "2023 — 2024",
          detail:
            "PHP, Laravel, MySQL, JavaScript, REST APIs, MVC, CRUD, authentication, RBAC and database design."
        },
        {
          type: "certificate",
          title: "React.js Developer Certificate",
          issuer: "W3Schools",
          period: "Sep 2022 · Credential 1MZD8JNIZC",
          detail:
            "Hooks, state management, component lifecycle, SPA routing and REST API integration."
        },
        {
          type: "education",
          title: "Information Technology — Undergraduate Coursework",
          issuer: "Industrial University of Ho Chi Minh City",
          period: "2021 — 2023",
          detail:
            "Coursework in software engineering, databases and programming fundamentals."
        }
      ],

      aiKnowledge: [
        {
          keywords: ["hr genie", "rag", "retrieval", "router", "vinuni", "vingroup", "ai20k"],
          answer:
            "HR GENIE is an HR policy assistant I worked on as Backend Core & Testing in AI20K (Vingroup × VinUniversity). The pipeline includes a Smart Intent Router at 98.46% accuracy, permission-aware retrieval on pgvector, an Evidence Gate and a deterministic verifier so every answer carries citations. The system has 1,453 automated tests (1,036 Python + 417 NestJS), guardrails and escalation for sensitive or out-of-scope questions."
        },
        {
          keywords: ["multi-agent", "agent", "langgraph", "langchain", "colosseum", "critic", "planner"],
          answer:
            "I build multi-agent systems with LangGraph in Colosseum & Certus Labs (VinUni Track 2 Advanced). The stateful graph has four roles: Planner, Researcher, Critic and Executor. Every step is traced with LangSmith/Langfuse, and quality is evaluated automatically with Ragas & TruLens on a golden dataset."
        },
        {
          keywords: ["backend", "fullstack", "nestjs", "nextjs", "laravel", "postgresql", "redis", "api"],
          answer:
            "Backend: NestJS/Node.js and TypeScript for production APIs, Prisma/PostgreSQL for data, Redis for caching and rate limiting, JWT/RBAC for auth. I also work with Laravel/PHP (Wine e-commerce) and Flutter/Vue.js at Propway. Frontend: React, Next.js, Vue.js, Tailwind/SCSS."
        },
        {
          keywords: ["kinh nghiệm", "experience", "where", "company", "propway", "hoa lan"],
          answer:
            "I have about 2 years of production experience: Junior Full-Stack at Hoa Lan Cattleya (Next.js, NestJS, Prisma, PostgreSQL) and Propway Vietnam (Flutter, Vue.js, REST APIs, Golang backend). I then joined AI20K and worked on HR GENIE as Backend Core & Testing — a RAG assistant with citations, guardrails and 1,453 tests."
        },
        {
          keywords: ["dự án", "project", "portfolio", "product", "wine", "crypto"],
          answer:
            "The portfolio has five featured projects: HR GENIE (RAG/LLM), Wine E-Commerce (Laravel, VNPay, Redis, Pusher), Colosseum & Certus (multi-agent, evaluation), Portfolio Backend (NestJS, Prisma, Redis rate limiting) and Crypto Trade (React, Next.js, Express/MongoDB). Open any card for the problem, approach, metrics and architecture."
        },
        {
          keywords: ["liên hệ", "contact", "email", "phone", "hiring", "cv"],
          answer:
            "You can reach me directly:\n• Email: giauy0987@gmail.com\n• Phone: 0947879049\n• LinkedIn: linkedin.com/in/uy-gia\n• GitHub: github.com/BuiGiaUy\nThe CV PDF is available from the “Download CV” button. I'm open to AI Engineer and Full-Stack Web roles."
        },
        {
          keywords: ["kỹ năng", "skill", "stack", "technology", "python", "fastapi", "docker"],
          answer:
            "Core stack: AI/LLM (RAG, LangGraph, pgvector, Ragas/TruLens, LangSmith/Langfuse), Backend (NestJS, TypeScript, PostgreSQL, Prisma, Redis, JWT/RBAC, Laravel), Frontend (React, Next.js, Vue.js, Tailwind) and DevOps (Docker, GitHub Actions, CI/CD, Nginx, Linux). I care about automated tests and observability."
        },
        {
          keywords: ["học vấn", "education", "certificate", "degree", "training"],
          answer:
            "Education & certificates: AI20K — AI Engineering & Product Build (Vingroup × VinUniversity, Aug 2026 – Present), Professional Certificate in PHP Full-Stack Web Development (TechMaster, 2023–2024), React.js Developer Certificate (W3Schools, 2022). I also completed IT coursework at Industrial University of HCMC (2021–2023)."
        },
        {
          keywords: ["chào", "hello", "hi", "hey", "alo"],
          answer:
            "Hi! I'm the demo assistant for Bui Gia Uy. Ask me about HR GENIE & RAG, multi-agent systems, work experience, the stack, projects or contact details."
        },
        {
          keywords: ["cảm ơn", "thanks", "thank you", "ok"],
          answer:
            "You're welcome! For work enquiries, email giauy0987@gmail.com or call 0947879049."
        }
      ],

      aiPrompts: [
        "How does the HR GENIE & RAG pipeline work?",
        "What is Uy's multi-agent and LangGraph experience?",
        "What is in the backend/frontend stack?",
        "How can I get in touch or download the CV?"
      ]
    }
  }
};
