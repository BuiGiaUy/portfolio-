# Bùi Gia Uy (Bui Gia Uy) - Personal Portfolio Website

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?logo=github)](https://buigiauy.github.io/portfolio-/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20TailwindCSS%20%7C%20JavaScript%20ES6+-38bdf8)](https://buigiauy.github.io/portfolio-/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> **Bùi Gia Uy** — AI Application Engineer & Full-Stack Developer  
> 📍 TP. Hồ Chí Minh, Việt Nam  
> 📧 Email: [giauy0987@gmail.com](mailto:giauy0987@gmail.com) | 📞 SĐT: `0947879049`  
> 🔗 LinkedIn: [linkedin.com/in/uy-gia/](https://www.linkedin.com/in/uy-gia/) | 🐙 GitHub: [github.com/BuiGiaUy](https://github.com/BuiGiaUy)

---

## 🌟 Giới Thiệu (About Me)

Kỹ sư ứng dụng AI & Lập trình viên Full-Stack chuyên sâu về kiến trúc **Multi-Agent Systems**, **Multi-Stage RAG**, **LLMOps** và phát triển hệ thống phần mềm doanh nghiệp hiệu năng cao. Sở hữu kinh nghiệm thực chiến với quy chuẩn **SFIA quốc tế** (chương trình AI Thực Chiến - Vingroup × VinUniversity), thiết kế đường ống RAG thông minh đạt độ chính xác phân luồng **98.46%** và hệ thống kiểm thử tự động **1.400+ test cases**.

---

## 🚀 Các Dự Án Tiêu Biểu (Featured Projects)

### 1. HR GENIE – Internal AI-Powered HR Policy Assistant
- **Đơn vị / Bối cảnh:** VinUni AI Thực Chiến - Vingroup (Chuẩn SFIA Quốc tế)
- **Tech Stack:** Python, FastAPI, LangGraph, LangChain, NestJS, Next.js, PostgreSQL (pgvector), Docker
- **Điểm sáng Kỹ thuật:**
  - **Multi-Stage RAG Pipeline:** Bộ phân loại ý định thông minh (*Smart Intent Router*) đạt độ chính xác **98.46%**.
  - **Pre-query Authorized Retrieval:** Phân quyền dữ liệu đa tầng kết hợp `pgvector`, loại trừ rủi ro rò rỉ chính sách nhân sự nhạy cảm.
  - **Evidence Gate & Deterministic Answer Verifier:** Cơ chế đối soát kép bảo đảm phản hồi trung thực, loại bỏ hoàn toàn hiện tượng ảo giác (*Zero Hallucination*).
  - **Bộ kiểm thử tự động đồ sộ:** **1.453 tests** (1.036 Python tests và 417 NestJS tests) đảm bảo độ ổn định môi trường sản xuất.

### 2. VIENEU-TTS – Vietnamese Neural Text-to-Speech & Voice Cloning
- **Tech Stack:** Python, PyTorch, LoRA Fine-Tuning, FastAPI, Gradio, Docker, WebSockets
- **Điểm sáng Kỹ thuật:**
  - Tinh chỉnh mô hình Acoustic và Vocoder tiếng Việt tự nhiên cho cả 3 miền Bắc - Trung - Nam bằng kỹ thuật LoRA/PEFT.
  - **Zero-Shot Voice Cloning:** Tái tạo chính xác âm sắc giọng nói chỉ từ mẫu âm thanh đối chiếu **3 giây**.
  - **Audio Streaming:** Phát âm thanh dạng chunked qua WebSockets với độ trễ suy luận dưới **160ms**.

### 3. WINE E-COMMERCE PLATFORM
- **Tech Stack:** Laravel 10, PHP 8.1, MySQL, Redis, Bootstrap, Vite, Pusher, VNPay
- **Điểm sáng Kỹ thuật:**
  - Kiến trúc chuẩn mực **Repository Pattern & Service Layer** trên nền tảng Laravel 10.
  - Tích hợp cổng thanh toán trực tuyến **VNPay** với cơ chế xác thực chữ ký số HMAC-SHA512 và xử lý IPN webhook bất đồng bộ.
  - Cập nhật thông báo đơn hàng và tồn kho thời gian thực với **Pusher WebSockets**.
  - Tăng tốc truy vấn và giảm tải 70% database thông qua lớp **Redis Caching**.

### 4. COLOSSEUM & CERTUS LABS (VinUni Track 2 Advanced)
- **Tech Stack:** LangGraph, Multi-Agent Systems, LangSmith, Langfuse, Ragas, TruLens, Docker, FastAPI
- **Điểm sáng Kỹ thuật:**
  - Thiết kế mạng lưới tác nhân tự quản (*Planner, Researcher, Critic, Executor*) với đồ thị trạng thái chu trình qua LangGraph.
  - Giám sát toàn diện (*Distributed Tracing*) dấu vết gọi mô hình, chi phí token và độ trễ qua **LangSmith** & **Langfuse**.
  - Tự động hóa đánh giá chất lượng mô hình (*Context Precision, Faithfulness, Answer Relevance*) bằng bộ công cụ **Ragas & TruLens**.

### 5. SMART ASSET & EXPENSE INTELLIGENCE
- **Tech Stack:** Flutter, Dart, Node.js, Express, PostgreSQL, Docker, SQLite
- **Điểm sáng Kỹ thuật:**
  - Kiến trúc ứng dụng di động đa nền tảng (iOS & Android) chuẩn mực.
  - Cơ chế **Offline-First Sync**: Ghi nhận giao dịch tức thì qua SQLite cục bộ và tự động hòa giải xung đột khi có kết nối mạng.

---

## 🛠️ Kỹ Năng Chuyên Môn (Skills & Technologies)

| Nhóm Năng Lực | Công Nghệ & Công Cụ Chủ Lực |
| :--- | :--- |
| **AI / GenAI & Multi-Agent** | LangGraph, LangChain, Multi-Stage RAG, pgvector, Multi-Agent Workflows, Guardrails, Evaluation (Ragas, TruLens), Tracing (LangSmith, Langfuse), PyTorch, LoRA |
| **Backend & APIs** | FastAPI (Python), NestJS (TypeScript/Node.js), Laravel 10 (PHP 8.1), RESTful APIs, WebSockets, Redis, PostgreSQL, MySQL, JWT, RBAC |
| **Frontend & Mobile** | React, Next.js, Vue.js, Flutter, Tailwind CSS, TypeScript, JavaScript ES6+, Vite |
| **DevOps & MLOps** | Docker, Docker Compose, GitHub Actions (CI/CD), Nginx, Linux, Git |

---

## 🎓 Học Vấn & Chứng Chỉ (Education & Certifications)

- 🏅 **AI Thực Chiến (AITC)** — Vingroup × VinUniversity (*Chuẩn khung năng lực SFIA quốc tế*)
- 📜 **PHP Full-Stack Web Development** — TechMaster Vietnam
- 📜 **React.js Developer Certified** — W3Schools

---

## 💻 Trải Nghiệm Website & Khởi Chạy Cục Bộ (Local Setup)

Website được đóng gói dạng **Zero-Build Static Web Application** tối ưu, sẵn sàng phục vụ trực tiếp trên **GitHub Pages** hoặc mở trực tiếp trên mọi trình duyệt:

1. **Clone repository:**
   ```bash
   git clone https://github.com/BuiGiaUy/portfolio-.git
   cd portfolio-
   ```

2. **Chạy trực tiếp:**
   - Mở file `index.html` trực tiếp bằng trình duyệt (Chrome, Edge, Firefox, Safari).
   - Hoặc khởi chạy local server với Python hoặc Node.js:
     ```bash
     # Sử dụng Python
     python -m http.server 3000
     # Hoặc Node.js npx serve
     npx serve .
     ```
   - Truy cập: `http://localhost:3000`

---

## 📱 Điểm Nhấn Giao Diện (UI/UX Highlights)

- 🌓 **Chuyển đổi giao diện Sáng / Tối (Dark / Light Theme)** lưu trữ tùy chọn người dùng qua `localStorage`.
- 🎛️ **Bộ lọc dự án tương tác** theo danh mục: *All, AI / GenAI & RAG, Full-Stack & E-Commerce, Mobile & Multi-Agent*.
- 🔍 **Modal chi tiết dự án** hiển thị sơ đồ luồng kỹ thuật trực quan (*Technical Architecture Pipeline*), các số liệu định lượng và trích dẫn mã nguồn.
- 🤖 **Bộ mô phỏng Trợ lý AI (Ask Gia Uy's AI Assistant)** tương tác hỏi đáp trực quan về năng lực và giải pháp.
- 📋 **Sao chép nhanh thông tin liên lạc (1-Click Copy)** kèm thông báo Toast Notification mượt mà.

---

## 📬 Liên Hệ (Contact)

- **Họ và tên:** Bùi Gia Uy
- **Email:** [giauy0987@gmail.com](mailto:giauy0987@gmail.com)
- **Điện thoại:** `0947879049`
- **Địa điểm:** TP. Hồ Chí Minh, Việt Nam
- **LinkedIn:** [https://www.linkedin.com/in/uy-gia/](https://www.linkedin.com/in/uy-gia/)
- **GitHub:** [https://github.com/BuiGiaUy](https://github.com/BuiGiaUy)

---
*© 2026 Bùi Gia Uy. All rights reserved.*
