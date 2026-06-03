# 🚗 Car Service Tracker — Project Scope

> แอปติดตามประวัติซ่อม-บำรุงรถยนต์ส่วนตัว  
> **จุดเด่น:** ไม่มีคู่แข่งตรงๆ ในตลาดไทย เป็น niche ที่น่าสนใจ

**Tech Stack:** Next.js 14 · ASP.NET Core · Supabase · Lambda + EventBridge · LINE Notify  
**เวอร์ชัน:** 1.0 · **วันที่:** 2 มิถุนายน 2568

---

## Features หลัก
- ✅ เพิ่มรถหลายคัน พร้อมข้อมูลทะเบียน/โฉม
- ✅ บันทึกประวัติเปลี่ยนน้ำมัน, ยาง, ไส้กรอง
- ✅ แจ้งเตือนล่วงหน้าเมื่อถึงรอบซ่อม (Lambda)
- ✅ Timeline view แบบสวยงาม
- ✅ Export ประวัติเป็น PDF

---

## Module 1 — User (บัญชีผู้ใช้)

### หน้า Login / LINE OAuth
`LINE OAuth` `JWT Token`

เข้าสู่ระบบผ่าน LINE Login รองรับเฉพาะ LINE เป็น auth provider หลัก

**LINE OAuth Flow (7 ขั้นตอน)**

| # | ขั้นตอน | Component |
|---|---------|-----------|
| 1 | User กดปุ่ม "Login ด้วย LINE" | Browser |
| 2 | Next.js สร้าง OAuth URL พร้อม `state` & `nonce` → 302 redirect ไป LINE | Next.js |
| 3 | User login ใน LINE และ approve permission | LINE Platform |
| 4 | LINE callback กลับพร้อม `?code=…&state=…` → Next.js ตรวจ state ป้องกัน CSRF | Browser |
| 5 | Next.js ส่ง code ไป ASP.NET Core (`POST /api/auth/line`) | Next.js → Backend |
| 6 | Backend แลก code กับ LINE Token Endpoint → ได้ `access_token` + `id_token` → ออก JWT ของระบบ | ASP.NET Core |
| 7 | Next.js เก็บ JWT ใน `httpOnly cookie` → redirect ไป `/dashboard` | Next.js |

---

### หน้าโปรไฟล์
`Settings` `Profile`

- แก้ไขชื่อ, รูปภาพจาก LINE
- ตั้งค่าการแจ้งเตือนส่วนบุคคล
- จัดการ preferences ต่างๆ

---

## Module 2 — รถ (จัดการยานพาหนะ)

### หน้าจัดการรถ (My Cars)
`CRUD` `Multi-car`

รายการรถทั้งหมดของผู้ใช้ ดู/เพิ่ม/แก้ไข/ลบ รองรับรถหลายคัน

---

### หน้าเพิ่มรถใหม่
`Form` `Validation`

ฟอร์มกรอกข้อมูลรถพร้อม validation ทุก field

**ข้อมูลรถที่จัดเก็บ**

| Field | Type | คำอธิบาย | Required |
|-------|------|----------|----------|
| `license_plate` | varchar(10) | ทะเบียนรถ | ✓ |
| `brand` | varchar(50) | ยี่ห้อ เช่น Toyota, Honda | ✓ |
| `model` | varchar(50) | รุ่น เช่น Camry, Civic | ✓ |
| `year` | int | ปีที่ผลิต | ✓ |
| `color` | varchar(30) | สีรถ | |
| `current_mileage` | int | เลขไมล์ปัจจุบัน (กม.) | |
| `vin` | varchar(20) | เลขตัวถัง | |
| `notes` | text | หมายเหตุเพิ่มเติม | |

---

### หน้ารายละเอียดรถ
`Timeline` `Detail`

ข้อมูลเต็มและประวัติซ่อมบำรุงของรถแต่ละคัน แสดงเป็น timeline เรียงตามวันที่

---

## Module 3 — ซ่อมบำรุง (Service Log)

### หน้าบันทึกซ่อมบำรุง
`Service Log` `Categories`

เพิ่มรายการซ่อมทุกประเภท พร้อมระบุค่าใช้จ่าย, ร้านที่ซ่อม, เลขไมล์

**ประเภทการซ่อมบำรุง**

| หมวดหมู่ | รายละเอียด | ตัวอย่าง Interval |
|----------|-----------|------------------|
| น้ำมันเครื่อง | เปลี่ยนน้ำมันและไส้กรองน้ำมัน | ทุก 5,000–10,000 กม. |
| ยาง | เปลี่ยนยาง, สลับยาง, ตั้งศูนย์ | ทุก 40,000–80,000 กม. |
| ไส้กรองอากาศ | ไส้กรองเครื่อง, แอร์ | ทุก 15,000–30,000 กม. |
| เบรค | ผ้าเบรค, จานเบรค, น้ำมันเบรค | ตามการใช้งาน |
| ระบบไฟ | แบตเตอรี่, หลอดไฟ | ตามการใช้งาน |
| ตรวจสภาพ | พ.ร.บ., ต่อทะเบียน | รายปี |
| อื่นๆ | ซ่อมอุบัติเหตุ, ทำสี | ไม่กำหนด |

---

### หน้า Timeline / ประวัติ
`Timeline` `Visual`

ดูประวัติซ่อมทั้งหมดแบบ visual timeline เรียงตามวันเวลา กรองตามประเภทและช่วงเวลาได้

---

### หน้า Dashboard / สถิติ
`Analytics` `Charts`

- กราฟค่าใช้จ่ายรายเดือน/ประเภท
- รถที่ใช้เงินมากสุด
- รายการที่กำลังจะครบรอบ

---

## Module 4 — แจ้งเตือน (Notifications)

### หน้าตั้งค่าแจ้งเตือน
`Lambda` `LINE Notify`

ตั้งรอบซ่อมล่วงหน้า เช่น แจ้งก่อน 500 กม. หรือ 2 สัปดาห์

**Notification Architecture**

| ขั้นตอน | Component | รายละเอียด |
|---------|-----------|-----------|
| 1. ตั้งรอบ | Frontend | User กำหนด trigger: เลขไมล์ หรือ วันที่ |
| 2. Schedule | EventBridge | สร้าง cron rule ล่วงหน้า 7, 3, 1 วัน |
| 3. Trigger | Lambda | EventBridge เรียก Lambda ตามกำหนด |
| 4. ส่งข้อความ | LINE Notify API | Lambda ส่ง push message หา user |
| 5. Log | Supabase | บันทึก `notification_log` ว่าส่งแล้ว |

---

### หน้าปฏิทินซ่อมบำรุง
`Calendar` `Overview`

Calendar view รอบซ่อมทุกคัน มองเห็นภาพรวมทั้งเดือน/ปีว่ารถคันไหนครบรอบเมื่อไหร่

---

## Module 5 — Admin

### Admin Dashboard
`Admin` `Metrics`

ภาพรวมสำหรับเจ้าของระบบ จำนวน user, รถ, การซ่อม, metric การใช้งาน

---

### จัดการผู้ใช้
`User Mgmt` `CRUD`

ดู list users ทั้งหมด, ดู profile, จัดการ account เช่น suspend/activate

---

## Tech Stack

| Layer | Technology | บทบาท |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) | UI, BFF, LINE OAuth callback |
| Backend API | ASP.NET Core (.NET 8) | REST API, JWT issuer, business logic |
| Database | Supabase (PostgreSQL) | จัดเก็บข้อมูลทั้งหมด + Auth |
| Notification | AWS Lambda + EventBridge | Scheduled notification jobs |
| Messaging | LINE Notify API | Push message ไป LINE user |
| Hosting | Vercel + AWS | Production deployment |

---

## สิ่งที่จะได้เรียนรู้

- **Notification scheduling** — ออกแบบระบบแจ้งเตือนล่วงหน้าด้วย Lambda + EventBridge cron expressions
- **PDF export** — สร้าง PDF รายงานจาก data ด้วย ReportLab หรือ Puppeteer
- **Personal data management** — จัดการข้อมูลส่วนตัวหลายรายการ (multi-car CRUD) พร้อม soft delete
- **LINE OAuth flow** — Implement OAuth 2.0 PKCE flow กับ LINE Platform ครบ end-to-end
- **JWT architecture** — ออกแบบ JWT claims, refresh token strategy, httpOnly cookie security