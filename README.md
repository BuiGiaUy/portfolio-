# Bùi Gia Uy — Portfolio

AI Engineer & Full-Stack Web Developer based in Ho Chi Minh City.

- Portfolio (live): <https://buigiauy.github.io/portfolio-/>
- GitHub: <https://github.com/BuiGiaUy>
- LinkedIn: <https://www.linkedin.com/in/uy-gia/>
- Email: <giauy0987@gmail.com>

> Portfolio đang chạy GitHub Pages từ nhánh `main`, thư mục root. Khi cập nhật, push lên `main` để GitHub Pages build lại; cần có `assets/images/avatar.jpg`, `assets/cv/Bui-Gia-Uy-CV.pdf` và `assets/cv/Bui-Gia-Uy-CV-FullStack.pdf`.

---

## Giao diện

Thiết kế lại theo hướng **editorial + terminal/agent trace**, không dùng framework hay build step:

- Hero với portrait, agent trace demo và metrics thật.
- 5 dự án dạng bento, modal chi tiết với problem → approach → architecture → outcome.
- Timeline kinh nghiệm (Hoa Lan Cattleya, Propway, AI20K).
- Stack matrix kèm evidence cho từng công nghệ.
- Trợ lý AI demo offline (keyword matching, không gọi API).
- Chuyển ngôn ngữ **VI / EN** ngay trên header; thuật ngữ kỹ thuật giữ nguyên tiếng Anh ở cả hai bản.
- Theme sáng/tối, mobile menu, scrollspy, reveal on scroll.
- Accessibility: skip link, focus trap trong modal, `aria-live`, reduced-motion fallback.
- SEO/social: OG/Twitter card, canonical, JSON-LD Person, ảnh OG 1200×630.
- Form liên hệ qua FormSubmit, fallback mở ứng dụng email.

Portfolio chính không còn Tailwind CDN, Lucide hay dependency runtime. `radar.html` vẫn dùng Tailwind CDN + `radar-base.css` riêng (legacy tokens) để không bị ảnh hưởng bởi redesign.

---

## Cấu trúc

```text
.
├── index.html                 # Portfolio chính
├── radar.html                 # Lab page (không link từ portfolio)
├── assets/
│   ├── css/style.css          # Design system + responsive (portfolio)
│   ├── css/radar-base.css     # Legacy tokens cho radar.html
│   ├── js/data.js             # Nội dung portfolio cho cả VI và EN
│   ├── js/main.js             # Render, i18n, modal, theme, chat, form
│   ├── images/avatar.jpg
│   ├── images/og-cover-ai-web.jpg # Ảnh social 1200×630
│   ├── cv/Bui-Gia-Uy-CV.pdf          # CV AI Engineer, 1 trang
│   └── cv/Bui-Gia-Uy-CV-FullStack.pdf # CV Full-Stack Web, 1 trang
├── cv/
│   ├── build-cv.py            # Sinh CV AI (Markdown/HTML/DOCX/PDF)
│   ├── build-cv-fullstack.py  # Sinh CV Full-Stack
│   ├── requirements.txt       # python-docx + reportlab cho build CV
│   ├── Bui-Gia-Uy-CV.md
│   ├── Bui-Gia-Uy-CV.html
│   ├── Bui-Gia-Uy-CV.docx
│   ├── Bui-Gia-Uy-CV-FullStack.md
│   ├── Bui-Gia-Uy-CV-FullStack.html
│   ├── Bui-Gia-Uy-CV-FullStack.docx
│   └── JD-fit.md              # Phân tích JD + keyword map
├── tools/                     # Script thu thập dữ liệu cho radar
├── LICENSE                    # MIT
└── README.md
```

Sửa nội dung portfolio tại `assets/js/data.js`: mỗi chuỗi có bản `locales.vi` và `locales.en`, giữ thuật ngữ kỹ thuật (RAG, backend, deployment…) bằng tiếng Anh ở cả hai. Trang mặc định là tiếng Việt; thêm `?lang=en` để mở thẳng bản tiếng Anh. Lựa chọn được lưu trong `localStorage`. Sửa nội dung chung và bản AI tại `cv/build-cv.py`; sửa phần Full-Stack Web tại `cv/build-cv-fullstack.py`, sau đó chạy:

```bash
python -m pip install -r cv/requirements.txt
python cv/build-cv.py
python cv/build-cv-fullstack.py
```

Hai lệnh build rebuild cả `.md`, `.html`, `.docx` và PDF tương ứng trong `assets/cv/`; script sẽ báo lỗi nếu PDF vượt quá 1 trang A4.

---

## Chạy local

```bash
python -m http.server 3000
# hoặc: npx serve .
```

Mở <http://localhost:3000>. Không cần cài dependency.

---

## Deploy GitHub Pages

1. Commit/push toàn bộ thay đổi, gồm ảnh và CV PDF.
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch** → `main` → `/ (root)`.
4. Chờ GitHub Pages build, sau đó mở <https://buigiauy.github.io/portfolio-/>.

Nếu chưa bật Pages, link trên sẽ 404 dù code đã đúng.

---

## CV & JD tailoring

`cv/JD-fit.md` tổng hợp các JD đã dùng để viết lại CV:

- FPT Software — AI Engineer (LLM/RAG)
- MTI Technology — Middle/Senior AI Engineer (GenAI/LLM, English)
- TecAlliance — Fullstack Dev, AI products (Python)
- GoTymeX — Senior AI/ML Engineer (Agentic AI) — tham chiếu, lệch cấp bậc

Hai bản CV, cùng 1 trang A4, single column, ATS-friendly:

- `assets/cv/Bui-Gia-Uy-CV.pdf` — tối ưu cho **AI Engineer / LLM-RAG**.
- `assets/cv/Bui-Gia-Uy-CV-FullStack.pdf` — tối ưu cho **Full-Stack Web Developer / TypeScript, NestJS, Next.js**.

Các số liệu và kỹ năng cần xác minh được liệt kê trong `cv/JD-fit.md`.

---

## Ghi chú

- Form liên hệ dùng FormSubmit; lần gửi đầu tiên cần bấm link kích hoạt trong email.
- `radar.html` là lab page riêng, không được link từ portfolio.
- Nội dung Facebook trong `assets/data/` nếu có chỉ nên dùng cho mục đích cá nhân; kiểm tra quyền/chính sách trước khi public.

## License

MIT — xem [LICENSE](LICENSE).
