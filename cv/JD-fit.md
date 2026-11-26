# Mức độ phù hợp với JD của Bùi Gia Uy

## Hai bản CV

- **AI Engineer / LLM-RAG** mở đầu bằng capstone HR GENIE và bài lab Colosseum. Hai dự án thể hiện truy xuất tài liệu theo quyền, kiểm tra trích dẫn và kiểm soát lời gọi công cụ của agent. [CV AI Engineer](../assets/cv/Bui-Gia-Uy-CV.pdf)
- **Full-Stack Web Developer / Backend** mở đầu bằng công việc tại Hoa Lan Cattleya và Propway Vietnam, sau đó là API đếm lượt xem và luồng thanh toán thương mại điện tử. [CV Full-Stack Web](../assets/cv/Bui-Gia-Uy-CV-FullStack.pdf)
- **Thâm niên.** Propway từ tháng 6/2024 đến tháng 9/2025, Hoa Lan từ tháng 3 đến tháng 7/2026. Hai giai đoạn bao phủ 21 tháng lịch nếu tính cả tháng đầu và cuối. Thẻ thống kê trên portfolio ghi “2 năm” và “2 yrs”. Cả hai CV ghi bắt đầu làm phần mềm production năm 2024. AI20K diễn ra từ tháng 8/2026 đến hiện tại.

## Đối chiếu với yêu cầu của các JD tham chiếu

| JD | Bằng chứng liên quan | Yêu cầu còn thiếu bằng chứng |
| --- | --- | --- |
| FPT Software, AI Engineer | Python/FastAPI, truy xuất kết hợp với pgvector, kiểm tra câu trả lời | 3+ năm AI/ML, AWS và multiprocessing |
| MTI Technology, AI Engineer | RAG, lọc quyền, reranking, đánh giá bộ định tuyến | 2+ năm làm AI/ML, vận hành LLM cho khách hàng và tiếng Anh với stakeholder |
| TecAlliance, Fullstack Dev | React, TypeScript, PostgreSQL, Docker, kiểm thử API | 3+ năm Python backend, AWS, IaC và ETL |
| GoTymeX, Senior AI/ML Engineer | Bài lab về agent và capstone AI20K | 7+ năm kinh nghiệm, vận hành nền tảng ML và mentoring |

## Bằng chứng và câu hỏi còn mở

- **HR GENIE.** Repo `P-147` (local checkout) ghi Bùi Gia Uy là **Backend Core & Testing** trong nhóm 4 người: khởi tạo NestJS core, Docker PostgreSQL + pgvector, RAG agent đầu tiên; JWT/RBAC, admin/analytics, audit log, ticket/conversation, CI; đồng phụ trách kiểm thử tích hợp. README checkpoint: **1.036 Python + 417 NestJS test** (10 skipped). Intent eval: **64/65 = 98,46%** trên bộ 65 case, nhưng README ghi đây là số cũ chưa chạy lại trên snapshot hiện tại; acceptance gate đang **NO-GO**, F1 retrieval Recall@8 100% nhưng chỉ 37,5% câu được trả lời. CV nêu phần Uy trực tiếp làm ở project bullets (backend core, RBAC, admin/analytics, audit, ticket, CI, tích hợp Agent, kiểm thử); skills liệt kê stack của dự án; bullets không nhận công retrieval/evidence gate của nhóm và không claim chất lượng tổng thể. Cần CI report và eval artefact để xác minh độc lập. [Portfolio live](https://buigiauy.github.io/portfolio-/)
- **Portfolio Backend.** Mã công khai và lịch sử commit xác nhận bản tháng **12/2025**, dù portfolio cũ ghi 2026; portfolio đã đổi sang 2025. Bài Jest gửi **50 yêu cầu đồng thời cho mỗi chiến lược khóa**. CV/portfolio chỉ nêu Redis rate limit và optimistic/pessimistic locking, không claim JWT/RBAC hay CI. [Lịch sử commit](https://github.com/BuiGiaUy/portfolio-backend/commits/master/) · [Bài kiểm thử](https://github.com/BuiGiaUy/portfolio-backend/blob/master/tests/e2e/project-view-counter.e2e-spec.ts)
- **Wine và Colosseum.** Mã Wine xác nhận VNPAY sandbox ký HMAC-SHA512 và Pusher cho bình luận. Portfolio/CV đã bỏ con số giảm tải **70%** chưa có benchmark. Bài Colosseum công khai thể hiện gateway và guardrails; portfolio/CV chỉ mô tả phần này, không claim bốn vai trò LangGraph hay Ragas/TruLens/LangSmith/Langfuse. [Wine](https://github.com/BuiGiaUy/wine_website) · [Colosseum](https://github.com/BuiGiaUy/Track2-Day26-2A202601867-BuiGiaUy)
- **Chứng chỉ và liên hệ.** W3Schools ghi *Certified React Developer*, ngày 23/9/2022. Tiếng Anh được mô tả ở phạm vi đọc và viết kỹ thuật. LinkedIn dùng URL từ portfolio (`linkedin.com/in/uy-gia`); LinkedIn chặn kiểm tra tự động nên cần mở bằng tay để xác nhận. CV dùng link web portfolio live: [buigiauy.github.io/portfolio-/](https://buigiauy.github.io/portfolio-/). [Chứng chỉ W3Schools](https://verify.w3schools.com/1MZD8JNIZC)

## Dựng lại

Từ thư mục gốc, chạy các lệnh sau. Mỗi lệnh dựng CV xuất Markdown, HTML, DOCX và PDF.

~~~sh
python -m pip install -r cv/requirements.txt
python cv/build-cv.py
python cv/build-cv-fullstack.py
~~~

PDF, DOCX mở trong Microsoft Word và bản in HTML đều vừa một trang A4. Kiểm tra trực quan xác nhận các dòng nằm trọn trong trang. Mỗi bản có 34 đoạn văn bản; thứ tự khớp giữa Markdown, HTML, DOCX và PDF. pypdf trích xuất 2.564 ký tự ở bản AI và 2.618 ký tự ở bản Full-Stack. Các liên kết GitHub, portfolio live và W3Schools trả về HTTP 200; LinkedIn chặn request tự động nên cần kiểm tra bằng tay.
