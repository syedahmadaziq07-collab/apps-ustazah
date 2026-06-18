-- ZikirCare Seed Defaults
-- Phase 3A: Starter content for a fresh Supabase project.
--
-- Safe to run multiple times (uses INSERT ... ON CONFLICT DO UPDATE).
-- Run AFTER supabase/schema.sql and supabase/storage-setup.sql.

-- ============================================
-- School Settings (singleton row)
-- ============================================
INSERT INTO school_settings (id, school_name, app_name, logo_url, tagline, theme_color)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'SK AL-FALAH',
  'ZikirCare',
  '',
  'Aplikasi Kerohanian & Emosi Kanak-Kanak',
  '#8B5CF6'
)
ON CONFLICT (id) DO UPDATE SET
  school_name = EXCLUDED.school_name,
  app_name = EXCLUDED.app_name,
  tagline = EXCLUDED.tagline,
  theme_color = EXCLUDED.theme_color,
  updated_at = now();

-- ============================================
-- App Pages
-- ============================================

-- Home page
INSERT INTO app_pages (id, page_name, title, subtitle, body_text, image_url, audio_url, content_json, is_active)
VALUES (
  'home',
  'home',
  'Apa perasaan kamu hari ini?',
  'Pilih emosi yang kamu rasa sekarang untuk bertenang bersama ZikirCare.',
  '',
  '/assets/illustrations/home-children-hero.png',
  '',
  '{"welcomeText": "Selamat datang", "selectedStudentLabel": "Hari ini:", "changeStudentButtonText": "Tukar"}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_url = EXCLUDED.image_url,
  content_json = EXCLUDED.content_json,
  updated_at = now();

-- Profile page
INSERT INTO app_pages (id, page_name, title, subtitle, body_text, image_url, audio_url, content_json, is_active)
VALUES (
  'profile',
  'profile',
  'Profil App',
  'ZikirCare membantu murid mengenal emosi dan mengamalkan cara bertenang secara Islam.',
  'Aplikasi ZikirCare: Tenang Bersama Islam direka khas sebagai instrumen bantuan digital untuk pengamal kaunseling sekolah dalam mengendalikan terapi intervensi emosi murid.',
  '',
  '',
  '{"schoolInfo": "SK Seri Idaman, Shah Alam, Selangor", "counsellingNote": "ZikirCare menyusun peralihan kognitif negatif kepada gema zikrullah untuk menstabilkan kondisi psikologi murid.", "privacyNote": "Data murid disimpan secara setempat dan tidak dikongsi dengan pihak ketiga.", "supportText": "Untuk sokongan teknikal, hubungi pihak pentadbir sistem."}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  body_text = EXCLUDED.body_text,
  content_json = EXCLUDED.content_json,
  updated_at = now();

-- Login page
INSERT INTO app_pages (id, page_name, title, subtitle, body_text, image_url, audio_url, content_json, is_active)
VALUES (
  'login',
  'login',
  'Siapa yang hadir hari ini?',
  'Pilih gambar kamu sebelum mula.',
  '',
  '',
  '',
  '{}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  updated_at = now();

-- ============================================
-- Emotions (7 default emotions)
-- ============================================

INSERT INTO emotions (id, label, emoji, color, advice_text, image_url, malay_audio_url, arabic_audio_url, zikir, zikir_rumi, zikir_maksud, aktiviti, sort_order, is_active)
VALUES
  ('gembira', 'Gembira', '😊', 'yellow', 'Oh, kamu sedang rasa gembira hari ini. Alhamdulillah, itu perasaan yang baik. Jom kita ucap syukur kepada Allah.', '', '/audio/malay/gembira-nasihat.mp3', '/audio/arabic/alhamdulillah.mp3', 'الْحَمْدُ لِلّٰهِ', 'Alhamdulillah', 'Segala puji bagi Allah.', 'Baca Alhamdulillah 5 kali', 0, true),
  ('marah', 'Marah', '😡', 'red', 'Oh, kamu sedang rasa marah. Tidak apa, kita cuba bertenang sama-sama. Tarik nafas perlahan-lahan, kemudian jom baca istighfar.', '', '/audio/malay/marah-nasihat.mp3', '/audio/arabic/istighfar.mp3', 'أَسْتَغْفِرُ اللهَ', 'Astaghfirullah', 'Aku memohon ampun kepada Allah.', 'Baca istighfar 10 kali', 1, true),
  ('sedih', 'Sedih', '😢', 'blue', 'Oh, kamu sedang rasa sedih. Tidak apa, semua orang pernah rasa sedih. Cikgu ada bersama kamu. Jom kita tenangkan hati dan ingat Allah.', '', '/audio/malay/sedih-nasihat.mp3', '/audio/arabic/doa-tenang.mp3', 'حَسْبِيَ اللهُ', 'Hasbiyallah', 'Cukuplah Allah bagiku.', 'Baca doa kesedihan 10 kali', 2, true),
  ('takut', 'Takut', '😨', 'purple', 'Oh, kamu sedang rasa takut. Jangan risau. Kita boleh minta perlindungan daripada Allah. Jom baca doa perlahan-lahan.', '', '/audio/malay/takut-nasihat.mp3', '/audio/arabic/doa-perlindungan.mp3', 'أَعُوذُ بِاللهِ', 'A''udzubillah', 'Aku berlindung dengan Allah.', 'Baca doa perlindungan 10 kali', 3, true),
  ('risau', 'Risau', '😟', 'orange', 'Oh, kamu sedang rasa risau. Tidak apa. Mari tarik nafas perlahan-lahan. Allah sentiasa menjaga kita.', '', '/audio/malay/risau-nasihat.mp3', '/audio/arabic/hasbunallah.mp3', 'تَوَكَّلْتُ عَلَى اللهِ', 'Tawakkaltu ''alallah', 'Aku bertawakal kepada Allah.', 'Baca doa tawakal 10 kali', 4, true),
  ('penat', 'Penat', '😴', 'teal', 'Oh, kamu sedang rasa penat. Tidak apa, badan kita perlukan rehat. Mari kita duduk sebentar dan tenangkan diri.', '', '/audio/malay/penat-nasihat.mp3', '/audio/arabic/doa-kekuatan.mp3', 'صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ', 'Sallallahu ''alaihi wasallam', 'Semoga Allah merahmatinya (merahmati Nabi).', 'Baca selawat 10 kali', 5, true),
  ('tenang', 'Tenang', '😌', 'green', 'Alhamdulillah, kamu sedang rasa tenang. Ini perasaan yang baik. Jom kita terus bersyukur kepada Allah.', '', '/audio/malay/tenang-nasihat.mp3', '/audio/arabic/alhamdulillah.mp3', 'سُبْحَانَ اللهِ', 'Subhanallah', 'Maha Suci Allah.', 'Baca tasbih 10 kali', 6, true)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  advice_text = EXCLUDED.advice_text,
  image_url = EXCLUDED.image_url,
  malay_audio_url = EXCLUDED.malay_audio_url,
  arabic_audio_url = EXCLUDED.arabic_audio_url,
  zikir = EXCLUDED.zikir,
  zikir_rumi = EXCLUDED.zikir_rumi,
  zikir_maksud = EXCLUDED.zikir_maksud,
  aktiviti = EXCLUDED.aktiviti,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- Therapies (3 per emotion = 21 therapies)
-- ============================================

INSERT INTO therapies (id, emotion_id, title, instruction, therapy_type, count_target, arabic_text, rumi_text, meaning_text, image_url, malay_audio_url, arabic_audio_url, sort_order, is_active)
VALUES
  -- Gembira
  ('th-gembira-1', 'gembira', 'Ucap Alhamdulillah', 'Tekan butang setiap kali kamu sudah membaca zikir ini.', 'zikir', 5, 'الْحَمْدُ لِلّٰهِ', 'Alhamdulillah', 'Segala puji bagi Allah.', '', '/audio/malay/gembira-nasihat.mp3', '/audio/arabic/alhamdulillah.mp3', 0, true),
  ('th-gembira-2', 'gembira', 'Senyum dan Ucap Terima Kasih', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 3, '', '', '', '', '', '', 1, true),
  ('th-gembira-3', 'gembira', 'Kongsi Kata Baik', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 1, '', '', '', '', '', '', 2, true),
  -- Marah
  ('th-marah-1', 'marah', 'Baca Istighfar', 'Tekan butang setiap kali kamu sudah membaca zikir ini.', 'zikir', 10, 'أَسْتَغْفِرُ اللهَ', 'Astaghfirullah', 'Aku memohon ampun kepada Allah.', '', '/audio/malay/marah-nasihat.mp3', '/audio/arabic/istighfar.mp3', 0, true),
  ('th-marah-2', 'marah', 'Tarik Nafas', 'Tarik nafas perlahan-lahan. Tahan sebentar. Lepaskan nafas dengan tenang.', 'breathing', 3, '', '', '', '', '', '', 1, true),
  ('th-marah-3', 'marah', 'Duduk dan Tenangkan Badan', 'Duduk dengan selesa. Rehatkan badan dan tenangkan hati.', 'rehat', 1, '', '', '', '', '', '', 2, true),
  -- Sedih
  ('th-sedih-1', 'sedih', 'Baca Doa Tenang', 'Baca doa ini perlahan-lahan. Minta pertolongan daripada Allah.', 'doa', 10, 'حَسْبِيَ اللهُ', 'Hasbiyallah', 'Cukuplah Allah bagiku.', '', '/audio/malay/sedih-nasihat.mp3', '/audio/arabic/doa-tenang.mp3', 0, true),
  ('th-sedih-2', 'sedih', 'Tarik Nafas Perlahan', 'Tarik nafas perlahan-lahan. Tahan sebentar. Lepaskan nafas dengan tenang.', 'breathing', 3, '', '', '', '', '', '', 1, true),
  ('th-sedih-3', 'sedih', 'Dengar Kata Semangat', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 1, '', '', '', '', '', '', 2, true),
  -- Takut
  ('th-takut-1', 'takut', 'Baca Doa Perlindungan', 'Baca doa ini perlahan-lahan. Minta pertolongan daripada Allah.', 'doa', 10, 'أَعُوذُ بِاللهِ', 'A''udzubillah', 'Aku berlindung dengan Allah.', '', '/audio/malay/takut-nasihat.mp3', '/audio/arabic/doa-perlindungan.mp3', 0, true),
  ('th-takut-2', 'takut', 'Tarik Nafas', 'Tarik nafas perlahan-lahan. Tahan sebentar. Lepaskan nafas dengan tenang.', 'breathing', 3, '', '', '', '', '', '', 1, true),
  ('th-takut-3', 'takut', 'Sebut Allah Sentiasa Menjaga Saya', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 3, '', '', '', '', '', '', 2, true),
  -- Risau
  ('th-risau-1', 'risau', 'Baca Hasbunallah', 'Tekan butang setiap kali kamu sudah membaca zikir ini.', 'zikir', 10, 'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ', 'Hasbunallah wa ni''mal wakil', 'Cukuplah Allah bagiku dan sebaik-baik tempat berserah.', '', '/audio/malay/risau-nasihat.mp3', '/audio/arabic/hasbunallah.mp3', 0, true),
  ('th-risau-2', 'risau', 'Latihan Nafas', 'Tarik nafas perlahan-lahan. Tahan sebentar. Lepaskan nafas dengan tenang.', 'breathing', 3, '', '', '', '', '', '', 1, true),
  ('th-risau-3', 'risau', 'Fikir Satu Perkara Baik', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 1, '', '', '', '', '', '', 2, true),
  -- Penat
  ('th-penat-1', 'penat', 'Rehat Sebentar', 'Duduk dengan selesa. Rehatkan badan dan tenangkan hati.', 'rehat', 1, '', '', '', '', '/audio/malay/penat-nasihat.mp3', '/audio/arabic/doa-kekuatan.mp3', 0, true),
  ('th-penat-2', 'penat', 'Tarik Nafas', 'Tarik nafas perlahan-lahan. Tahan sebentar. Lepaskan nafas dengan tenang.', 'breathing', 3, '', '', '', '', '', '', 1, true),
  ('th-penat-3', 'penat', 'Baca Doa Kekuatan', 'Baca doa ini perlahan-lahan. Minta pertolongan daripada Allah.', 'doa', 3, 'صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ', 'Sallallahu ''alaihi wasallam', 'Semoga Allah merahmatinya.', '', '', '/audio/arabic/doa-kekuatan.mp3', 2, true),
  -- Tenang
  ('th-tenang-1', 'tenang', 'Ucap Alhamdulillah', 'Tekan butang setiap kali kamu sudah membaca zikir ini.', 'zikir', 5, 'الْحَمْدُ لِلّٰهِ', 'Alhamdulillah', 'Segala puji bagi Allah.', '', '/audio/malay/tenang-nasihat.mp3', '/audio/arabic/alhamdulillah.mp3', 0, true),
  ('th-tenang-2', 'tenang', 'Zikir Ringkas', 'Tekan butang setiap kali kamu sudah membaca zikir ini.', 'zikir', 10, 'سُبْحَانَ اللهِ', 'Subhanallah', 'Maha Suci Allah.', '', '', '/audio/arabic/alhamdulillah.mp3', 1, true),
  ('th-tenang-3', 'tenang', 'Kekalkan Perasaan Baik', 'Baca ayat ini perlahan-lahan. Ingat, kamu sedang berusaha menjadi lebih baik.', 'kata_semangat', 1, '', '', '', '', '', '', 2, true)
ON CONFLICT (id) DO UPDATE SET
  emotion_id = EXCLUDED.emotion_id,
  title = EXCLUDED.title,
  instruction = EXCLUDED.instruction,
  therapy_type = EXCLUDED.therapy_type,
  count_target = EXCLUDED.count_target,
  arabic_text = EXCLUDED.arabic_text,
  rumi_text = EXCLUDED.rumi_text,
  meaning_text = EXCLUDED.meaning_text,
  malay_audio_url = EXCLUDED.malay_audio_url,
  arabic_audio_url = EXCLUDED.arabic_audio_url,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- Duas (15 default daily duas)
-- ============================================

INSERT INTO duas (id, title, arabic_text, rumi_text, meaning_text, image_url, audio_url, emoji_decorative, explanation, sort_order, is_active)
VALUES
  ('dua-1', 'Doa Sebelum Tidur', 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ', 'Bismikallahumma ahya wa amut', 'Dengan nama-Mu Ya Allah, aku hidup dan aku mati.', '', '/audio/arabic/doa-tidur.mp3', '🛌', 'Baca doa ini sebelum tidur.', 0, true),
  ('dua-2', 'Doa Bangun Tidur', 'الْحَمْدُ لِلّٰهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', 'Alhamdulillahillazi ahyana ba''da ma amatana wa ilaihin nusyur', 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami dan kepada-Nya tempat kembali.', '', '/audio/arabic/alhamdulillah.mp3', '🌅', 'Baca doa ini selepas bangun tidur.', 1, true),
  ('dua-3', 'Doa Masuk Tandas', 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', 'Allahumma inni a''udzubika minal khubutsi wal khabaits', 'Ya Allah, aku berlindung dengan-Mu dari gangguan syaitan jantan dan syaitan betina.', '', '/audio/arabic/doa-perlindungan.mp3', '🚽', 'Baca doa ini sebelum masuk ke tandas.', 2, true),
  ('dua-4', 'Doa Keluar Tandas', 'غُفْرَانَكَ', 'Ghufranaka', 'Aku memohon ampunan-Mu.', '', '', '🧼', 'Baca doa ini selepas keluar tandas.', 3, true),
  ('dua-5', 'Doa Makan', 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', 'Allahumma barik lana fi ma razaqtana wa qina azaban nar', 'Ya Allah, berkatilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari azab neraka.', '', '/audio/arabic/doa-kekuatan.mp3', '🍽️', 'Baca doa ini sebelum makan.', 4, true),
  ('dua-6', 'Doa Selepas Makan', 'الْحَمْدُ لِلّٰهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', 'Alhamdulillahilazi at''amana wa saqana wa ja''alana muslimin', 'Segala puji bagi Allah yang memberi kami makan dan minum dan menjadikan kami orang Islam.', '', '/audio/arabic/alhamdulillah.mp3', '🥤', 'Baca doa ini selepas makan.', 5, true),
  ('dua-7', 'Doa Naik Kenderaan', 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', 'Subhanallazi sakhkhara lana haza wa ma kunna lahu muqrinin', 'Maha Suci Allah yang memudahkan kenderaan ini untuk kami, sedang kami tidak berdaya menguasainya.', '', '/audio/arabic/hasbunallah.mp3', '🚗', 'Baca doa ini semasa naik kenderaan.', 6, true),
  ('dua-8', 'Doa Masuk Rumah', 'بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا', 'Bismillahi walajna wa bismillahi kharajna wa ''alallahi rabbina tawakkalna', 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami bertawakal.', '', '/audio/arabic/doa-tenang.mp3', '🏠', 'Baca doa ini sebelum masuk rumah.', 7, true),
  ('dua-9', 'Doa Keluar Rumah', 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ', 'Bismillahi tawakkaltu ''alallahi la haula wa la quwwata illa billah', 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan melainkan dengan Allah.', '', '/audio/arabic/hasbunallah.mp3', '🚪', 'Baca doa ini sebelum keluar rumah.', 8, true),
  ('dua-10', 'Doa Untuk Ibu Bapa', 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', 'Rabbirhamhuma kama rabbayani saghira', 'Ya Allah, sayangilah kedua ibu bapaku sebagaimana mereka menyayangiku semasa kecil.', '', '/audio/arabic/doa-tenang.mp3', '👨‍👩‍👧‍👦', 'Baca doa ini untuk kedua ibu bapa.', 9, true),
  ('dua-11', 'Doa Masuk Masjid', 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', 'Allahummaftah li abwaba rahmatik', 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.', '', '', '🕌', 'Baca doa ini semasa masuk masjid.', 10, true),
  ('dua-12', 'Doa Keluar Masjid', 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', 'Allahumma inni asaluka min fadlik', 'Ya Allah, aku memohon kurnia-Mu.', '', '', '🕌', 'Baca doa ini semasa keluar masjid.', 11, true),
  ('dua-13', 'Doa Belajar', 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا', 'Rabbi zidni ''ilman warzuqni fahma', 'Ya Tuhanku, tambahkanlah ilmu dan berikanlah aku kefahaman.', '', '/audio/arabic/doa-kekuatan.mp3', '📚', 'Baca doa ini sebelum belajar.', 12, true),
  ('dua-14', 'Doa Bersyukur', 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ', 'Rabbi awzi''ni an asykura ni''matakallati an''amta ''alayya', 'Ya Tuhanku, ilhamkanlah aku untuk mensyukuri nikmat-Mu yang telah Engkau berikan kepadaku.', '', '/audio/arabic/alhamdulillah.mp3', '🙏', 'Baca doa ini sebagai tanda syukur.', 13, true),
  ('dua-15', 'Doa Mohon Kekuatan', 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا', 'Rabbana afrigh ''alayna sabran wa tsabbit aqdamana', 'Ya Tuhan kami, limpahkanlah kesabaran kepada kami dan teguhkanlah pendirian kami.', '', '/audio/arabic/doa-kekuatan.mp3', '💪', 'Baca doa ini minta kekuatan hati.', 14, true)
-- ============================================
-- School Profile (counsellor details for student Profil page)
-- ============================================
INSERT INTO school_profile (id, teacher_name, lembaga_number, school_name, teacher_photo_url)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Cikgu Fatimah Binti Ismail',
  'KB-08249-M',
  'SK Seri Idaman, Shah Alam, Selangor',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  teacher_name = EXCLUDED.teacher_name,
  lembaga_number = EXCLUDED.lembaga_number,
  school_name = EXCLUDED.school_name,
  teacher_photo_url = EXCLUDED.teacher_photo_url,
  updated_at = now();

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  arabic_text = EXCLUDED.arabic_text,
  rumi_text = EXCLUDED.rumi_text,
  meaning_text = EXCLUDED.meaning_text,
  audio_url = EXCLUDED.audio_url,
  emoji_decorative = EXCLUDED.emoji_decorative,
  explanation = EXCLUDED.explanation,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();
