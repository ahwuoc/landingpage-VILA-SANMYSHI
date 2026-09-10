# VILA SANMYSHI

Website logistics và khai báo hải quan cho tuyến Việt Nam – Lào – Thái Lan (EWEC), gồm landing page đa ngôn ngữ, CMS admin và cổng theo dõi lô hàng dùng MongoDB.

## Kiến trúc

- Next.js App Router + Tailwind CSS v4 + next-intl: website public tại port `3001`.
- Express + Mongoose: tracking API tại port `4000`.
- MongoDB: dữ liệu lô hàng, timeline, checklist và lịch sử thông báo.
- Supabase: tiếp tục phục vụ dữ liệu CMS cũ như dịch vụ, tin tức và form để không làm gián đoạn website hiện tại.

## Chạy local bằng Bun

Yêu cầu Node.js 20+, Bun và Docker.

1. Cài package:

   ```bash
   bun install
   ```

2. Tạo file môi trường từ [.env.example](./.env.example). Nếu dự án đã có `.env`, chỉ thêm các biến MongoDB/tracking, không ghi đè cấu hình Supabase hiện tại.

3. Khởi động MongoDB và nạp 6 lô hàng mẫu:

   ```bash
   docker compose up -d mongo
   bun run tracking:seed
   ```

4. Chạy tracking API:

   ```bash
   bun run tracking:dev
   ```

5. Ở terminal khác, chạy Next.js:

   ```bash
   bun run dev
   ```

Mở:

- Trang chủ: `http://localhost:3001/vi`
- Tra cứu mẫu: `http://localhost:3001/vi/tracking?code=VILA-EWEC-002`
- Quản trị lô hàng: `http://localhost:3001/admin/shipments`
- API health: `http://localhost:4000/api/health`

Các mã mẫu có sẵn từ `VILA-EWEC-001` đến `VILA-EWEC-006`, bao phủ các trạng thái tiếp nhận, kiểm hóa, đã khai báo, thông quan, đang vận chuyển và đã bàn giao.

## MongoDB Atlas

Thay `MONGODB_URI` bằng connection string Atlas trong file `.env` phía server. Không thêm tiền tố `NEXT_PUBLIC_` và không commit connection string chứa tài khoản/mật khẩu. Nếu Atlas báo lỗi xác thực, kiểm tra lại database user, mật khẩu đã URL-encode và Network Access/IP allowlist.

## Tracking API

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| GET | `/api/track/:code` | Tra cứu public, không trả phone/email/Zalo |
| GET/POST | `/api/shipments` | Danh sách và tạo lô hàng |
| GET | `/api/shipments/:id` | Chi tiết nội bộ |
| PATCH | `/api/shipments/:id/status` | Đổi trạng thái và nối thêm timeline |
| PATCH | `/api/shipments/:id/documents` | Cập nhật checklist hồ sơ |
| GET | `/api/shipments/:id/notifications` | Lịch sử thông báo |
| GET | `/api/dashboard` | Tổng quan vận hành |
| GET | `/api/alerts` | Điểm mở rộng cảnh báo |

Thông báo Zalo/email hiện là mock sender: nội dung và trạng thái gửi được lưu vào MongoDB, đồng thời log ra tracking server. Có thể thay lớp `server/services/notificationService.cjs` bằng provider thật mà không đổi luồng nghiệp vụ.

## Kiểm tra production

```bash
bun run build
```
