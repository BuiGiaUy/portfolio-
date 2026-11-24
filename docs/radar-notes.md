# Tech Radar — nguồn dữ liệu & cách chạy

Trang `radar.html` ưu tiên **việc IT thị trường Việt Nam** + **bài từ Facebook page**, cộng thêm tin công nghệ quốc tế; mọi item được chấm điểm theo hồ sơ AI Engineering / Full-stack.

## 1. Trạng thái từng nguồn (kiểm tra 24/11/2026)

| Nguồn | Cách lấy | Trạng thái |
|---|---|---|
| vieclam24h | collector đọc `__NEXT_DATA__` của trang tìm kiếm (`?q=...&provinces=...`) | ✅ chạy, có lương + hạn nộp |
| VietnamWorks | collector đọc các pool job trong `__NEXT_DATA__` của `/tim-viec-lam` | ✅ chạy, nhưng ít tin IT (lọc theo tiêu đề) |
| TopCV | trang bị Cloudflare chặn (HTTP 403 với cả curl lẫn Chrome headless) | ❌ cần cookie `cf_clearance` |
| ITviec | Cloudflare "Just a moment…" | ❌ cần cookie |
| Facebook page | Graph API `/{page}/posts` | ⚙️ đã hỗ trợ qua `--fb-token`, link gốc = `permalink_url` |
| LinkedIn | guest API `jobs-guest/jobs/api/seeMoreJobPostings` | ⚠️ mạng ở VN chặn (`connection closed`); cần VPN/`--cookies` |
| Hacker News / Dev.to / GitHub | gọi API công khai ngay trong trình duyệt | ✅ chạy |
| Reddit | `www.reddit.com` bị chặn DNS ở VN | ❌ cần VPN/proxy |

Mã tỉnh của vieclam24h đã kiểm chứng: **Hà Nội = `210000160`**, **Hồ Chí Minh = `210000187`**.

**Mọi thẻ trên trang đều có nút "Mở bài gốc ↗"** mở đúng URL gốc ở tab mới (`target="_blank"`, `rel="noopener"`):
việc làm → trang tin tuyển dụng, Facebook → `permalink_url` của bài post, LinkedIn → `linkedin.com/jobs/view/...`.

## 2. Chạy collector

```bash
# Lấy việc IT (VietnamWorks + vieclam24h), ghi assets/data/job-feed.json
node tools/job-collect.mjs

# Đổi từ khoá / giới hạn số tin
node tools/job-collect.mjs --keywords=backend,ai,fullstack,tester --limit=200

# Chỉ một nguồn
node tools/job-collect.mjs --sites=vieclam24h
```

Sau khi chạy, mở `radar.html` → bấm **Cập nhật** (hoặc **Kiểm tra file dữ liệu**).
Chạy lại mỗi 1–2 ngày là đủ; đừng bắn request liên tục.

## 3. Facebook page

Cần **Page access token** (quyền `pages_read_engagement`):

1. Vào [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer), tạo app loại Business.
2. Chọn Page bạn muốn theo dõi → cấp quyền `pages_read_engagement`, `pages_show_list`.
3. Copy token rồi chạy:```bash
node tools/job-collect.mjs --sites= --fb-token=EAAB... --fb-pages=topcv.vn,itviec --fb-limit=10
```

Bài lấy về luôn kèm `permalink_url` nên thẻ trên radar mở đúng bài gốc.
Nếu page bật giới hạn tuổi/vùng, Graph trả rỗng — khi đó dùng cách dán JSON.

Kết quả ghi vào `assets/data/social-feed.json`, trang tự gộp vào feed (badge `Facebook`).
Token hết hạn theo thời gian — dùng token dài hạn hoặc chạy lại khi cần.
Không có token thì vẫn dán tay được: nút **Dán JSON (job / Facebook)** trên trang.

> Đăng nhập Facebook bằng tài khoản cá nhân rồi cào trang tìm kiếm **không** được hỗ trợ: cần mật khẩu
> (không nên đưa cho công cụ nào), HTML do JS dựng nên rất dễ vỡ, và Facebook thường khoá/checkpoint
> tài khoản cào tự động. Đường ổn định là Graph token ở trên; cookie chỉ dùng cho site cho phép đọc HTML tĩnh.

## 3b. LinkedIn

```bash
node tools/job-collect.mjs --sites=linkedin --keywords=backend,ai --linkedin-location=Vietnam
```

Dùng guest API công khai của LinkedIn (không cần đăng nhập). Mỗi tin có link gốc dạng
`https://www.linkedin.com/jobs/view/<id>/` nên bấm "Mở bài gốc" là tới tin thật.

Trên mạng ở Việt Nam LinkedIn thường đóng kết nối (`fetch failed` / `connection closed`) — bật VPN
hoặc xuất cookie phiên đăng nhập của chính bạn rồi chạy lại:

```bash
node tools/job-collect.mjs --sites=linkedin --cookies=cookies.txt
```

`--cookies` dùng được cho mọi nguồn (TopCV, ITviec, LinkedIn…) vì collector gắn header `Cookie` vào request.

### 3c. Xuất cookie từ Chrome bằng `tools/get-cookies.mjs`

Không cần mật khẩu và không cần extension: script đọc cookie từ cổng gỡ lỗi của chính Chrome bạn đang đăng nhập.

```bash
# 1. Đóng hết Chrome, rồi mở lại kèm cổng gỡ lỗi (dùng profile đã đăng nhập)
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
#    …hoặc profile riêng: thêm --user-data-dir="C:\chrome-radar" rồi đăng nhập trong cửa sổ đó

# 2. Xuất cookie LinkedIn + Facebook -> ~/.radar/cookies.txt
node tools/get-cookies.mjs
node tools/get-cookies.mjs --domains=linkedin.com --out=./cookies.txt --show

# 3. Dùng
node tools/job-collect.mjs --sites=linkedin --cookies="C:\Users\<ban>\.radar\cookies.txt"
```

File cookie tương đương mật khẩu phiên đăng nhập: mặc định ghi ra `~/.radar/` (ngoài repo), đừng commit, đừng chia sẻ.
Cookie chỉ mở được đường mạng — LinkedIn vẫn có thể chặn theo IP/tài khoản.

## 4. TopCV & ITviec

Hai trang này chặn request không phải trình duyệt thật, nên có ba cách:

- **Cookie**: `node tools/get-cookies.mjs --domains=topcv.vn` rồi chạy collector với `--cookies=...` (cookie gồm cả `cf_clearance`).
- **Playwright/Chrome + profile đã đăng nhập**: điều khiển trình duyệt thật của bạn.
- **Dán tay**: copy JSON theo schema bên dưới vào nút *Dán JSON*, dữ liệu lưu trong `localStorage` và vẫn còn sau khi tải lại trang.

## 5. Schema `assets/data/job-feed.json`

```json
{
  "updatedAt": "2026-11-24T15:09:48.000Z",
  "items": [
    {
      "kind": "job",
      "source": "vieclam24h",
      "title": "Senior Backend Developer (PHP / Laravel)",
      "url": "https://vieclam24h.vn/it-phan-mem/…-c8p210000187id200995200.html",
      "company": "Công Ty TNHH Lotte Innovate Việt Nam",
      "salary": "30–50 triệu",
      "location": "Hồ Chí Minh",
      "level": "",
      "summary": "Mô tả ngắn (tuỳ chọn)",
      "skills": ["PHP", "Laravel", "Microservices"],
      "createdAt": "2026-11-23T02:39:15.000Z",
      "deadline": "2027-12-31T16:59:59.000Z",
      "metrics": { "views": 174, "applicants": 12 }
    }
  ]
}
```

`source` hợp lệ: `vieclam24h`, `vietnamworks`, `topcv`, `itviec`.
Bài Facebook dùng `assets/data/social-feed.json` với `source: "facebook"` (schema giống hệt, bỏ `company/salary`).

## 6. Cách chấm điểm

`16 + điểm khớp từ khoá chủ đề (tối đa 62) + điểm tương tác (tối đa 22)`, chặn trên 100.
Job không khớp từ khoá nào vẫn được gán chủ đề "Thị trường Việt Nam" để không bị ẩn khỏi feed.
Bộ lọc thời gian mặc định **30 ngày** vì tin tuyển dụng thường cũ hơn 7 ngày.

## 7. Lưu ý

- Chỉ lấy dữ liệu công khai, không đăng nhập bằng tài khoản người khác, không vượt captcha.
- Giữ tần suất thấp (1 lần/ngày là đủ), không cào toàn bộ site.
- Không đăng lại nguyên văn mô tả công việc; radar chỉ lưu tiêu đề + link + mức lương công khai.
- `job-feed.json` là ảnh chụp tại một thời điểm — cân nhắc trước khi commit dữ liệu cào lên repo công khai.
