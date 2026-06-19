# Panduan Persediaan Supabase untuk i-Qalb Care

Panduan langkah demi langkah untuk menyambungkan i-Qalb Care ke Supabase.

---

## 1. Cipta Projek Supabase

1. Buka https://supabase.com dan log masuk.
2. Klik **New Project**.
3. Masukkan:
   - **Name**: `i-qalb-care` (atau nama pilihan)
   - **Database Password**: simpan kata laluan ini.
   - **Region**: Pilih yang terdekat (cth. `Southeast Asia`).
4. Klik **Create new project**.
5. Tunggu sehingga siap (kira-kira 1-2 minit).

---

## 2. Buka SQL Editor

1. Di dashboard Supabase, klik **SQL Editor** di menu kiri.
2. Klik **New Query**.
3. Salin dan tampal kandungan dari setiap fail SQL di bawah.

---

## 3. Jalankan Schema SQL

1. Buka fail `supabase/schema.sql` dalam projek i-Qalb Care anda.
2. Salin keseluruhan kandungan.
3. Tampal di SQL Editor.
4. Klik **Run**.
5. **Penting**: Jalankan sekali sahaja. Jika ada ralat "already exists", abaikan — itu bermakna jadual sudah wujud.

---

## 4. Jalankan Storage Setup SQL

1. Buka fail `supabase/storage-setup.sql`.
2. Salin, tampal, dan klik **Run**.
3. Ini akan mencipta 3 bucket storan:
   - `student-photos` — gambar passport murid
   - `app-images` — gambar logo, hero, emosi, terapi, doa
   - `app-audio` — audio nasihat, bacaan Arab, doa

---

## 5. Jalankan Seed Defaults SQL

1. Buka fail `supabase/seed-defaults.sql`.
2. Salin, tampal, dan klik **Run**.
3. Ini akan mengisi data permulaan:
   - 1 tetapan sekolah
   - 3 halaman app (login, home, profile)
   - 7 emosi
   - 21 terapi
   - 15 doa harian

---

## 6. Salin Project URL

1. Di dashboard Supabase, klik **Settings** (ikon gear) → **API**.
2. Cari **Project URL**.
3. Salin URL tersebut. Contoh: `https://abcdefghijklm.supabase.co`

---

## 7. Salin Anon Public Key

1. Masih di halaman **Settings** → **API**.
2. Cari **anon public** key.
3. Salin key tersebut. Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 8. Letakkan Environment Variables di Northflank

1. Log masuk ke https://app.northflank.com.
2. Buka projek dan service i-Qalb Care anda.
3. Pergi ke **Environment** tab.
4. Tambah tiga variables:
   - `VITE_SUPABASE_URL` = URL dari Langkah 6
   - `VITE_SUPABASE_ANON_KEY` = Key dari Langkah 7
   - `VITE_TEACHER_PIN` = PIN pilihan anda (cth. `1234`)
5. **Jangan** masukkan `service_role` key — guna `anon` key sahaja.

---

## 9. Rebuild Northflank

1. Selepas tambah env vars, klik **Deploy** → **Rebuild**.
2. Tunggu sehingga deployment siap (hijau).

---

## 10. Uji Aplikasi

### Di Dashboard Cikgu:

| Halaman | Tujuan |
|---------|--------|
| `/teacher/murid` | Tambah/susun murid untuk login bergambar |
| `/teacher/home` | Edit tajuk, subtitle, gambar hero |
| `/teacher/emosi` | Edit senarai emosi |
| `/teacher/terapi` | Edit senarai terapi untuk setiap emosi |
| `/teacher/doa` | Edit senarai doa harian |
| `/teacher/gambar` | Muat naik gambar (jika Storage disambung) |
| `/teacher/audio` | Muat naik audio (jika Storage disambung) |

### Di Telefon Murid:

| Laluan | Tujuan |
|--------|--------|
| `/login` | Pilih gambar murid atau login cikgu |
| `/` | Pilih emosi |
| `/emosi/:id` | Pilih terapi |
| `/baca/:id` | Baca zikir/doa |
| `/kira/:id` | Kira bilangan zikir |
| `/tahniah/:id` | Tahniah selesai |
| `/sejarah` | Lihat rekod |
| `/doa` | Baca doa harian |

---

## Penyelesaian Masalah (Troubleshooting)

### "Muat naik gagal" / Upload fails

- Pastikan `supabase/storage-setup.sql` sudah dijalankan.
- Semak di dashboard Supabase → **Storage** — mesti ada bucket `student-photos`, `app-images`, dan `app-audio`.
- Saiz fail: gambar maksimum 5MB, audio maksimum 15MB.
- Format fail: gambar (JPG, PNG, WebP), audio (MP3, WAV, M4A, OGG).

### "Table not found"

- Jalankan `supabase/schema.sql` semula. Gunakan SQL Editor.
- Pastikan semua jadul wujud di **Table Editor**.

### "Supabase belum disambungkan" di dashboard

- Semak env vars:
  - `VITE_SUPABASE_URL` — mesti bermula dengan `https://`
  - `VITE_SUPABASE_ANON_KEY` — mesti bermula dengan `eyJ...`
- Jika env vars sudah betul, rebuild Northflank.

### Data hanya muncul pada satu peranti

- Ini adalah jangkaan biasa. Data Supabase dikongsi merentas peranti.
- Jika data tidak muncul, semak sama ada data wujud di **Table Editor** dalam Supabase.
- Jika ada data Supabase tetapi tidak muncul, cuba refresh atau log keluar/log masuk semula.

### Gambar / Audio tidak muncul

- URL gambar/audio mesti pautan awam (public URL).
- Jika guna Supabase Storage, URL bermula dengan `https://<project>.supabase.co/storage/v1/object/public/...`
- Pastikan bucket adalah **public** (sudah ditetapkan dalam `storage-setup.sql`).

### PIN cikgu tidak berfungsi

- Semak env var `VITE_TEACHER_PIN` di Northflank.
- Jika tiada, default PIN adalah `1234`.
- PIN adalah sementara. Supabase Auth akan menggantikan PIN ini dalam fasa akan datang.

---

## Nota Keselamatan

1. **Jangan** gunakan `service_role` key dalam frontend.
2. **Jangan** commit env vars ke GitHub.
3. Guna `.env.example` sebagai panduan sahaja.
4. Untuk production, gantikan dasar upload anon dengan dasar upload authenticated (lihat komen dalam `storage-setup.sql`).
