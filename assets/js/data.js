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
            "HR GENIE, RAG pipeline, intent eval 64/65 (08/2026) và 1,453 kiểm thử của nhóm",
            "Agent gateway, guardrails, permission/budget checks",
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
          route: "policy · routed",
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
            value: "64/65",
            label: "Intent eval 08/2026",
            sub: "28/08 · chưa chạy lại"
          },
          {
            value: "1,453",
            label: "Kiểm thử của nhóm",
            sub: "1,036 Python · 417 NestJS"
          },
          {
            value: "VNPay",
            label: "Checkout sandbox",
            sub: "HMAC-SHA512 · Wine"
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
            "Tích hợp FastAPI/LangGraph agent sau NestJS API và viết integration test.",
            "Docker, GitHub Actions, CI/CD và kiểm chứng production."
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
          role: "Backend Core & Testing · nhóm 4 người",
          badge: "Dự án chính",
          status: "Capstone",
          size: "wide",
          image: "assets/images/projects/hr-genie-chat.webp",
          imageAlt: "Giao diện chat HR GENIE với câu trả lời chính sách có trích dẫn nguồn",
          gallery: [
            { src: "assets/images/projects/hr-genie-chat.webp", alt: "Chat HR GENIE với badge độ tin cậy và nguồn tham chiếu" },
            { src: "assets/images/projects/hr-genie-citations.webp", alt: "HR GENIE trả lời quy trình bán hàng với nhiều citation" }
          ],
          summary:
            "Trợ lý chính sách nhân sự trả lời từ tài liệu nội bộ với citation, evidence gate, refusal khi thiếu căn cứ và chuyển HR cho câu hỏi nhạy cảm.",
          problem:
            "Chính sách HR dài, nhiều phiên bản và phân quyền phức tạp. Một chatbot thông thường dễ bịa hoặc trả về tài liệu mà nhân viên không được xem.",
          approach: [
            "Hybrid retrieval trên pgvector, lọc quyền ngay trong truy vấn (pre-query authorization).",
            "Smart intent router phân loại policy / general / out-of-scope trước khi retrieval.",
            "Evidence gate và deterministic verifier đối soát câu trả lời với trích dẫn gốc.",
            "Câu trả lời policy có căn cứ phải kèm trích dẫn; thiếu bằng chứng thì từ chối, câu hỏi cá nhân/nhạy cảm chuyển HR.",
            "NestJS + Next.js + PostgreSQL + Docker + GitHub Actions cho vòng đời production."
          ],
          metrics: [
            { label: "Intent eval · 28/08/2026", value: "64/65" },
            { label: "Kiểm thử của nhóm", value: "1,453" },
            { label: "Kiểm thử Python", value: "1,036" },
            { label: "Kiểm thử NestJS", value: "417" }
          ],
          highlights: [
            "Citation-first: mỗi câu trả lời phải chỉ ra điều khoản và tài liệu nguồn.",
            "Guardrails + escalation thay vì cố trả lời mọi câu hỏi.",
            "1,453 kiểm thử của nhóm bao phủ backend, retrieval và API flow.",
            "Backend Core & Testing: NestJS core, RBAC, audit log, ticket và CI.",
            "Hiện trạng eval: retrieval Recall@8 100% nhưng chỉ 30/80 câu grounded (37,5%); acceptance gate NO-GO."
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
            note: "RBAC pre-filter + hybrid search trên pgvector; thiếu bằng chứng thì refusal, câu hỏi cá nhân/nhạy cảm chuyển HR."
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
          image: "assets/images/projects/wine-home.webp",
          imageAlt: "Trang chủ BIGBA Wine với hero ảnh rượu vang và CTA khám phá",
          gallery: [
            { src: "assets/images/projects/wine-home.webp", alt: "Trang chủ cửa hàng rượu vang BIGBA" },
            { src: "assets/images/projects/wine-admin.webp", alt: "Dashboard admin BIGBA với đơn hàng và doanh thu" }
          ],
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
            { label: "Signature", value: "HMAC-SHA512" },
            { label: "Thanh toán", value: "VNPay IPN" },
            { label: "Realtime", value: "Pusher WS" },
            { label: "Framework", value: "Laravel 10" }
          ],
          highlights: [
            "Luồng thanh toán có xác thực chữ ký và đối soát giao dịch.",
            "Redis cache cho catalog/cart; checkout VNPay ký HMAC-SHA512.",
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
          title: "COLOSSEUM | AGENT GATEWAY",
          subtitle: "Python gateway với permission, budget và guardrails cho agent tool calls",
          category: "ai",
          categoryLabel: "Agent Infra",
          year: "2026",
          organization: "VinUni Track 2 Advanced",
          role: "AI Engineer · Agent Gateway & Guardrails",
          badge: "Lab nghiên cứu",
          status: "Track nâng cao",
          size: "normal",
          image: "assets/images/projects/colosseum-projector.webp",
          imageAlt: "Projector UI của Colosseum với bracket, trận đấu và bảng điểm",
          gallery: [
            { src: "assets/images/projects/colosseum-projector.webp", alt: "Colosseum projector: bracket, featured duel và ticker" },
            { src: "assets/images/projects/colosseum-spar.webp", alt: "Colosseum spar HUD với năm giai đoạn của một hiệp" }
          ],
          summary:
            "Python gateway kiểm tra permission, budget và citation trước khi forward agent tool calls; ghi lý do khi agent abstain.",
          problem:
            "Agent gọi tool MCP/A2A; nếu không kiểm soát quyền, budget và citation, tool call có thể vượt phạm vi hoặc trả lời không grounded.",
          approach: [
            "Gateway nhận mọi MCP/A2A/DISCOVER command trước khi execute.",
            "Kiểm tra permission, budget, lease và citation/sensitive data; quyết định deny/rewrite/forward.",
            "Ghi lý do khi agent abstain; telemetry riêng cho từng decision.",
            "Test bằng pytest cho gateway và guardrails."
          ],
          metrics: [
            { label: "Gateway", value: "Python" },
            { label: "Guardrails", value: "Permission + budget" },
            { label: "Checks", value: "Citation + PII" },
            { label: "Telemetry", value: "Decision trace" }
          ],
          highlights: [
            "Permission + budget checks trước mỗi tool call.",
            "Citation và sensitive-data checks trong guardrails.",
            "Ghi lý do khi agent abstain.",
            "Pytest cho gateway và guardrails."
          ],
          tech: ["Python", "MCP", "A2A", "Guardrails", "Pytest", "Telemetry"],
          architecture: {
            nodes: ["Agent", "Gateway", "Decision", "Tool call", "Telemetry"],
            note: "Mọi MCP/A2A/DISCOVER command đi qua gateway trước khi execute; decision deny/rewrite/forward được ghi lại."
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
          subtitle: "API NestJS với Prisma, Redis rate limit, locking và Docker",
          category: "fullstack",
          categoryLabel: "Backend",
          year: "2025",
          organization: "Cá nhân · repo public",
          role: "Backend Developer",
          badge: "NestJS",
          status: "Hoàn thành",
          size: "normal",
          summary:
            "REST API quản lý dự án và lượt xem, rate limit theo IP trên Redis, Prisma/PostgreSQL, Docker và hai chiến lược locking cho view count.",
          problem:
            "Cần một backend nhỏ nhưng đủ chuẩn production cho portfolio: rate limit, migration, locking và test.",
          approach: [
            "NestJS modules cho project, view tracking và health.",
            "Rate limit theo IP lưu trên Redis, chặn spam ở gateway.",
            "Hai chiến lược locking cho view count: optimistic (version) và pessimistic.",
            "Prisma + PostgreSQL cho schema, migration và seed.",
            "Jest e2e gửi 50 request đồng thời cho mỗi chiến lược, kiểm tra counter đạt 50."
          ],
          metrics: [
            { label: "API", value: "NestJS" },
            { label: "ORM", value: "Prisma" },
            { label: "Rate limit", value: "Redis" },
            { label: "Locking", value: "2 strategies" }
          ],
          highlights: [
            "Redis rate limit theo IP.",
            "Optimistic + pessimistic locking cho view count.",
            "Jest e2e 50 concurrent requests mỗi chiến lược.",
            "Prisma schema, migration và seed data."
          ],
          tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Docker", "Jest"],
          architecture: {
            nodes: ["Client", "Rate limit", "Service", "Prisma", "PostgreSQL"],
            note: "Rate limit Redis trước controller; optimistic/pessimistic locking cho view count; Prisma quản lý schema."
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
          image: "assets/images/projects/crypto-login.webp",
          imageAlt: "Giao diện đăng nhập Binance-style của Crypto Trade",
          gallery: [
            { src: "assets/images/projects/crypto-login.webp", alt: "Trang đăng nhập Binance-style" },
            { src: "assets/images/projects/crypto-register.webp", alt: "Trang đăng ký Binance-style với form đầy đủ" }
          ],
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
              evidence: "RAG agent pgvector đầu tiên và đường query NestJS–FastAPI cho HR GENIE."
            },
            {
              name: "Agent workflows",
              evidence: "Agent gateway/guardrail lab với permission, budget và citation checks."
            },
            {
              name: "Vector search",
              evidence: "Tích hợp pgvector cho RAG agent đầu tiên của HR GENIE."
            },
            {
              name: "Evaluation & tracing",
              evidence: "Ragas, TruLens, LangSmith, Langfuse; benchmark trên golden dataset."
            },
            {
              name: "Guardrails",
              evidence: "RBAC, audit log, ticket escalation và Agent boundary trong NestJS."
            },
            {
              name: "Python / FastAPI",
              evidence: "FastAPI agent contract và tích hợp query path cho HR GENIE."
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
              evidence: "1,453 kiểm thử của nhóm; unit, integration và API flow."
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
            "HR GENIE là trợ lý chính sách nhân sự mình làm Backend Core & Testing trong AI20K (Vingroup × VinUniversity, 08/2026 – Hiện tại). Intent router được đánh giá 64/65 (98,46%) trong lần eval ngày 28/08/2026; README của dự án ghi đây là số cũ, chưa chạy lại trên snapshot hiện tại. Hệ thống có 1,453 kiểm thử của nhóm (1,036 Python + 417 NestJS); acceptance gate hiện tại NO-GO, retrieval Recall@8 100% nhưng chỉ 30/80 câu grounded. Câu trả lời policy có căn cứ kèm citation; thiếu bằng chứng thì refusal, câu hỏi cá nhân/nhạy cảm chuyển HR."
        },
        {
          keywords: ["multi-agent", "agent", "langgraph", "langchain", "colosseum", "critic", "planner"],
          answer:
            "Mình làm agent gateway/guardrail trong Colosseum (VinUni Track 2 Advanced): Python gateway kiểm tra permission, budget, citation và sensitive data trước khi forward MCP/A2A tool calls; ghi lý do khi agent abstain và test bằng pytest."
        },
        {
          keywords: ["backend", "fullstack", "nestjs", "nextjs", "laravel", "postgresql", "redis", "api"],
          answer:
            "Backend: NestJS/Node.js và TypeScript cho API production, Prisma/PostgreSQL cho dữ liệu, Redis cho cache và rate limiting, JWT/RBAC cho auth. Mình cũng làm Laravel/PHP (Wine e-commerce) và Flutter/Vue.js ở Propway. Frontend: React, Next.js, Vue.js, Tailwind/SCSS."
        },
        {
          keywords: ["kinh nghiệm", "experience", "làm ở đâu", "công ty", "propway", "hoa lan"],
          answer:
            "Mình có khoảng 2 năm kinh nghiệm production: Junior Full-Stack tại Hoa Lan Cattleya (Next.js, NestJS, Prisma, PostgreSQL) và Propway Vietnam (Flutter, Vue.js, REST API, Golang backend). Sau đó mình tham gia AI20K (08/2026 – Hiện tại) và làm Backend Core & Testing cho HR GENIE — trợ lý RAG có citation, guardrails và 1,453 kiểm thử của nhóm."
        },
        {
          keywords: ["dự án", "project", "portfolio", "sản phẩm", "wine", "crypto"],
          answer:
            "Portfolio có 5 dự án tiêu biểu: HR GENIE (RAG/LLM), Wine E-Commerce (Laravel, VNPay, Redis, Pusher), Colosseum agent gateway (guardrails), Portfolio Backend (NestJS, Prisma, Redis rate limit, locking) và Crypto Trade (React, Next.js, Express/MongoDB). Bấm vào từng thẻ để xem vấn đề, cách tiếp cận, số liệu và kiến trúc."
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
            "Học vấn & chứng chỉ: AI20K — AI Engineering & Product Build (Vingroup × VinUniversity, 08/2026 – Hiện tại), Professional Certificate PHP Full-Stack Web Development (TechMaster, 2023–2024), Certified React Developer (W3Schools, Sep 2022). Ngoài ra mình có coursework IT tại Đại học Công nghiệp TP. Hồ Chí Minh (2021–2023)."
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
        "Kinh nghiệm agent gateway và guardrails của Uy?",
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
            "HR GENIE, RAG pipeline, earlier intent eval 64/65 (Aug 2026) and 1,453 team tests",
            "Agent gateway, guardrails, permission/budget checks",
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
          route: "policy · routed",
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
            value: "64/65",
            label: "Earlier intent eval (Aug 2026)",
            sub: "28 Aug 2026 · not rerun"
          },
          {
            value: "1,453",
            label: "Team tests passed",
            sub: "1,036 Python · 417 NestJS"
          },
          {
            value: "VNPay",
            label: "Signed sandbox checkout",
            sub: "HMAC-SHA512 · Wine"
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
            "Integrated the FastAPI/LangGraph agent behind the NestJS API and wrote integration tests.",
            "Worked with Docker, GitHub Actions, CI/CD and production verification."
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
          status: "Capstone",
          size: "wide",
          image: "assets/images/projects/hr-genie-chat.webp",
          imageAlt: "HR GENIE chat UI with a policy answer and source citations",
          gallery: [
            { src: "assets/images/projects/hr-genie-chat.webp", alt: "HR GENIE chat with confidence badge and source references" },
            { src: "assets/images/projects/hr-genie-citations.webp", alt: "HR GENIE answer with multiple policy citations" }
          ],
          summary:
            "An HR policy assistant that answers from internal documents with citations; insufficient evidence triggers refusal and sensitive personal cases go to HR.",
          problem:
            "HR policies are long, versioned and permissioned. A generic chatbot easily hallucinates or returns documents an employee is not allowed to see.",
          approach: [
            "Hybrid retrieval on pgvector with permission filters applied inside the query (pre-query authorization).",
            "A Smart Intent Router classifies policy / general / out-of-scope before retrieval.",
            "An evidence gate and deterministic verifier check the answer against source citations.",
            "Grounded policy answers cite sources; insufficient evidence triggers refusal; sensitive personal cases go to HR.",
            "NestJS + Next.js + PostgreSQL + Docker + GitHub Actions across the production lifecycle."
          ],
          metrics: [
            { label: "Intent eval · 28 Aug 2026", value: "64/65" },
            { label: "Team tests passed", value: "1,453" },
            { label: "Python tests", value: "1,036" },
            { label: "NestJS tests", value: "417" }
          ],
          highlights: [
            "Citation-first: every answer must point to the source clause and document.",
            "Guardrails and escalation instead of answering everything.",
            "1,453 team tests covering backend, retrieval and API flows.",
            "Backend Core & Testing: NestJS core, RBAC, audit logs, tickets and CI.",
            "Current eval: retrieval Recall@8 100%, but only 30/80 grounded answers (37.5%); acceptance gate NO-GO."
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
            note: "RBAC pre-filter + hybrid search on pgvector; insufficient evidence triggers refusal, sensitive personal cases go to HR."
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
          image: "assets/images/projects/wine-home.webp",
          imageAlt: "BIGBA Wine storefront with a wine hero image and a discovery CTA",
          gallery: [
            { src: "assets/images/projects/wine-home.webp", alt: "BIGBA wine storefront homepage" },
            { src: "assets/images/projects/wine-admin.webp", alt: "BIGBA admin dashboard with orders and revenue" }
          ],
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
            { label: "Signature", value: "HMAC-SHA512" },
            { label: "Payment", value: "VNPay IPN" },
            { label: "Realtime", value: "Pusher WS" },
            { label: "Framework", value: "Laravel 10" }
          ],
          highlights: [
            "Payment flow with signature validation and transaction reconciliation.",
            "Redis cache for catalog/cart; signed VNPay checkout with HMAC-SHA512.",
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
          title: "COLOSSEUM | AGENT GATEWAY",
          subtitle: "Python gateway with permissions, budgets and guardrails for agent tool calls",
          category: "ai",
          categoryLabel: "Agent Infra",
          year: "2026",
          organization: "VinUni Track 2 Advanced",
          role: "AI Engineer · Agent Gateway & Guardrails",
          badge: "Research lab",
          status: "Advanced track",
          size: "normal",
          image: "assets/images/projects/colosseum-projector.webp",
          imageAlt: "Colosseum projector UI with the bracket, featured duel and scoreboard",
          gallery: [
            { src: "assets/images/projects/colosseum-projector.webp", alt: "Colosseum projector: bracket, featured duel and ticker" },
            { src: "assets/images/projects/colosseum-spar.webp", alt: "Colosseum spar HUD with the five stages of an exchange" }
          ],
          summary:
            "A Python gateway that checks permissions, budgets and citations before forwarding agent tool calls; records the reason when the agent abstains.",
          problem:
            "Agent tool calls over MCP/A2A need permission, budget and citation checks; otherwise calls can exceed scope or return ungrounded answers.",
          approach: [
            "Gateway receives every MCP/A2A/DISCOVER command before execution.",
            "Checks permissions, budgets, leases and citation/sensitive data; returns deny/rewrite/forward.",
            "Records the reason when the agent abstains; decision-level telemetry.",
            "Pytest coverage for the gateway and guardrails."
          ],
          metrics: [
            { label: "Gateway", value: "Python" },
            { label: "Guardrails", value: "Permission + budget" },
            { label: "Checks", value: "Citation + PII" },
            { label: "Telemetry", value: "Decision trace" }
          ],
          highlights: [
            "Permission and budget checks before every tool call.",
            "Citation and sensitive-data checks in guardrails.",
            "Records the reason when the agent abstains.",
            "Pytest coverage for gateway and guardrails."
          ],
          tech: ["Python", "MCP", "A2A", "Guardrails", "Pytest", "Telemetry"],
          architecture: {
            nodes: ["Agent", "Gateway", "Decision", "Tool call", "Telemetry"],
            note: "Every MCP/A2A/DISCOVER command passes through the gateway before execution; deny/rewrite/forward decisions are recorded."
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
          subtitle: "NestJS API with Prisma, Redis rate limiting, locking and Docker",
          category: "fullstack",
          categoryLabel: "Backend",
          year: "2025",
          organization: "Personal · public repo",
          role: "Backend Developer",
          badge: "NestJS",
          status: "Completed",
          size: "normal",
          summary:
            "A project and view-tracking REST API with Redis-backed IP rate limiting, Prisma/PostgreSQL, Docker and two locking strategies for view counts.",
          problem:
            "Needed a small but production-grade backend for the portfolio: rate limiting, migrations, locking and tests.",
          approach: [
            "NestJS modules for projects, view tracking and health.",
            "IP-based rate limiting stored in Redis, blocking spam at the gateway.",
            "Two view-count locking strategies: optimistic (version) and pessimistic.",
            "Prisma + PostgreSQL for schema, migrations and seed data.",
            "Jest e2e test sends 50 concurrent requests per strategy and checks both counters reach 50."
          ],
          metrics: [
            { label: "API", value: "NestJS" },
            { label: "ORM", value: "Prisma" },
            { label: "Rate limit", value: "Redis" },
            { label: "Locking", value: "2 strategies" }
          ],
          highlights: [
            "Redis-backed IP rate limiting.",
            "Optimistic + pessimistic locking for view counts.",
            "Jest e2e with 50 concurrent requests per strategy.",
            "Prisma schema, migrations and seed data."
          ],
          tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Docker", "Jest"],
          architecture: {
            nodes: ["Client", "Rate limit", "Service", "Prisma", "PostgreSQL"],
            note: "Redis rate limiting before controller work; optimistic/pessimistic view-count locking; Prisma handles schema."
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
          image: "assets/images/projects/crypto-login.webp",
          imageAlt: "Binance-style login screen for Crypto Trade",
          gallery: [
            { src: "assets/images/projects/crypto-login.webp", alt: "Binance-style login screen" },
            { src: "assets/images/projects/crypto-register.webp", alt: "Binance-style registration form" }
          ],
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
              evidence: "First pgvector RAG agent and the NestJS–FastAPI query path for HR GENIE."
            },
            {
              name: "Agent workflows",
              evidence: "Agent gateway/guardrail lab with permission, budget and citation checks."
            },
            {
              name: "Vector search",
              evidence: "pgvector integration for the first HR GENIE RAG agent."
            },
            {
              name: "Evaluation & tracing",
              evidence: "Ragas, TruLens, LangSmith, Langfuse; golden-dataset benchmarks."
            },
            {
              name: "Guardrails",
              evidence: "RBAC, audit logs, ticket escalation and the Agent boundary in NestJS."
            },
            {
              name: "Python / FastAPI",
              evidence: "FastAPI agent contract and query-path integration for HR GENIE."
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
              evidence: "1,453 team tests; unit, integration and API flows."
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
            "HR GENIE is an HR policy assistant I worked on as Backend Core & Testing in AI20K (Vingroup × VinUniversity, Aug 2026 – Present). The intent router scored 64/65 (98.46%) in the 28 Aug 2026 evaluation; the project README notes this is an earlier score and has not been rerun on the current snapshot. The system has 1,453 team tests (1,036 Python + 417 NestJS); the current acceptance gate is NO-GO, with retrieval Recall@8 at 100% but only 30/80 grounded answers. Grounded policy answers cite sources; insufficient evidence triggers refusal; sensitive personal cases go to HR."
        },
        {
          keywords: ["multi-agent", "agent", "langgraph", "langchain", "colosseum", "critic", "planner"],
          answer:
            "I build an agent gateway/guardrail lab in Colosseum (VinUni Track 2 Advanced): a Python gateway checks permissions, budgets, citations and sensitive data before forwarding MCP/A2A tool calls, records the reason when the agent abstains, and is covered by pytest."
        },
        {
          keywords: ["backend", "fullstack", "nestjs", "nextjs", "laravel", "postgresql", "redis", "api"],
          answer:
            "Backend: NestJS/Node.js and TypeScript for production APIs, Prisma/PostgreSQL for data, Redis for caching and rate limiting, JWT/RBAC for auth. I also work with Laravel/PHP (Wine e-commerce) and Flutter/Vue.js at Propway. Frontend: React, Next.js, Vue.js, Tailwind/SCSS."
        },
        {
          keywords: ["kinh nghiệm", "experience", "where", "company", "propway", "hoa lan"],
          answer:
            "I have about 2 years of production experience: Junior Full-Stack at Hoa Lan Cattleya (Next.js, NestJS, Prisma, PostgreSQL) and Propway Vietnam (Flutter, Vue.js, REST APIs, Golang backend). I then joined AI20K (Aug 2026 – Present) and worked on HR GENIE as Backend Core & Testing — a RAG assistant with citations, guardrails and 1,453 team tests."
        },
        {
          keywords: ["dự án", "project", "portfolio", "product", "wine", "crypto"],
          answer:
            "The portfolio has five featured projects: HR GENIE (RAG/LLM), Wine E-Commerce (Laravel, VNPay, Redis, Pusher), Colosseum agent gateway (guardrails), Portfolio Backend (NestJS, Prisma, Redis rate limiting, locking) and Crypto Trade (React, Next.js, Express/MongoDB). Open any card for the problem, approach, metrics and architecture."
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
            "Education & certificates: AI20K — AI Engineering & Product Build (Vingroup × VinUniversity, Aug 2026 – Present), Professional Certificate in PHP Full-Stack Web Development (TechMaster, 2023–2024), Certified React Developer (W3Schools, Sep 2022). I also completed IT coursework at Industrial University of HCMC (2021–2023)."
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
        "What is Uy's agent gateway and guardrails experience?",
        "What is in the backend/frontend stack?",
        "How can I get in touch or download the CV?"
      ]
    }
  }
};
