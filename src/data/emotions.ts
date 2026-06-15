import { EmotionKey, EmotionDetails, DuaItem } from '../types';

export const emotionData: Record<EmotionKey, EmotionDetails> = {
  gembira: {
    emoji: "😊", 
    label: "Gembira", 
    color: "yellow",
    illustration: "HappyChildren",
    nasihat: "Oh, kamu sedang rasa gembira hari ini. Alhamdulillah, itu perasaan yang baik. Jom kita ucap syukur kepada Allah.",
    aktiviti: "Baca Alhamdulillah 10 kali",
    zikir: "الْحَمْدُ لِلّٰهِ", 
    zikirRumi: "Alhamdulillah",
    zikirMaksud: "Segala puji bagi Allah.",
    audio: { arabic: "/audio/arabic/alhamdulillah.mp3", malay: "/audio/malay/gembira-nasihat.mp3" }
  },
  marah: {
    emoji: "😡", 
    label: "Marah", 
    color: "red",
    illustration: "AngryChild",
    nasihat: "Oh, kamu sedang rasa marah. Tidak apa, kita cuba bertenang sama-sama. Tarik nafas perlahan-lahan, kemudian jom baca istighfar.",
    aktiviti: "Baca istighfar 10 kali",
    zikir: "أَسْتَغْفِرُ اللهَ", 
    zikirRumi: "Astaghfirullah",
    zikirMaksud: "Aku memohon ampun kepada Allah.",
    audio: { arabic: "/audio/arabic/istighfar.mp3", malay: "/audio/malay/marah-nasihat.mp3" }
  },
  sedih: {
    emoji: "😢", 
    label: "Sedih", 
    color: "blue",
    illustration: "SadChild",
    nasihat: "Oh, kamu sedang rasa sedih. Tidak apa, semua orang pernah rasa sedih. Cikgu ada bersama kamu. Jom kita tenangkan hati dan ingat Allah.",
    aktiviti: "Baca doa kesedihan 10 kali",
    zikir: "حَسْبِيَ اللهُ", 
    zikirRumi: "Hasbiyallah",
    zikirMaksud: "Cukuplah Allah bagiku.",
    audio: { arabic: "/audio/arabic/doa-tenang.mp3", malay: "/audio/malay/sedih-nasihat.mp3" }
  },
  takut: {
    emoji: "😨", 
    label: "Takut", 
    color: "purple",
    illustration: "ScaredChild",
    nasihat: "Oh, kamu sedang rasa takut. Jangan risau. Kita boleh minta perlindungan daripada Allah. Jom baca doa perlahan-lahan.",
    aktiviti: "Baca doa perlindungan 10 kali",
    zikir: "أَعُوذُ بِاللهِ", 
    zikirRumi: "A’udzubillah",
    zikirMaksud: "Aku berlindung dengan Allah.",
    audio: { arabic: "/audio/arabic/doa-perlindungan.mp3", malay: "/audio/malay/takut-nasihat.mp3" }
  },
  risau: {
    emoji: "😟", 
    label: "Risau", 
    color: "orange",
    illustration: "CalmChild",
    nasihat: "Oh, kamu sedang rasa risau. Tidak apa. Mari tarik nafas perlahan-lahan. Allah sentiasa menjaga kita.",
    aktiviti: "Baca doa tawakal 10 kali",
    zikir: "تَوَكَّلْتُ عَلَى اللهِ", 
    zikirRumi: "Tawakkaltu ’alallah",
    zikirMaksud: "Aku bertawakal kepada Allah.",
    audio: { arabic: "/audio/arabic/hasbunallah.mp3", malay: "/audio/malay/risau-nasihat.mp3" }
  },
  penat: {
    emoji: "😴", 
    label: "Penat", 
    color: "teal",
    illustration: "CalmChild",
    nasihat: "Oh, kamu sedang rasa penat. Tidak apa, badan kita perlukan rehat. Mari kita duduk sebentar dan tenangkan diri.",
    aktiviti: "Baca selawat 10 kali",
    zikir: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ", 
    zikirRumi: "Sallallahu ’alaihi wasallam",
    zikirMaksud: "Semoga Allah merahmatinya (merahmati Nabi).",
    audio: { arabic: "/audio/arabic/doa-kekuatan.mp3", malay: "/audio/malay/penat-nasihat.mp3" }
  },
  tenang: {
    emoji: "😌", 
    label: "Tenang", 
    color: "green",
    illustration: "CalmChild",
    nasihat: "Alhamdulillah, kamu sedang rasa tenang. Ini perasaan yang baik. Jom kita terus bersyukur kepada Allah.",
    aktiviti: "Baca tasbih 10 kali",
    zikir: "سُبْحَانَ اللهِ", 
    zikirRumi: "Subhanallah",
    zikirMaksud: "Maha Suci Allah.",
    audio: { arabic: "/audio/arabic/alhamdulillah.mp3", malay: "/audio/malay/tenang-nasihat.mp3" }
  }
};

// 5 selected Duas/Zikirs for the DuaScreen as described in the requirements
export const staticDuas: DuaItem[] = [
  {
    id: "istighfar",
    name: "Istighfar",
    arabic: "أَسْتَغْفِرُ اللهَ",
    rumi: "Astaghfirullah",
    meaning: "Aku memohon ampun kepada Allah.",
    bgColorClass: "bg-green-pastel border-emerald-200 text-emerald-800",
    emojiDecorative: "🤲",
    explanation: "Memohon ampun dan kelapangan hati daripada Allah SWT.",
    audio: { arabic: "/audio/arabic/istighfar.mp3", malay: "/audio/malay/istighfar-nasihat.mp3" }
  },
  {
    id: "doa-tenang",
    name: "Doa Tenang",
    arabic: "أللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا بِكَ مُطْمَئِنَّةً",
    rumi: "Allahumma inni as'aluka nafsan bika mutma'innah",
    meaning: "Ya Allah, aku memohon kepada-Mu jiwa yang tenang dan tenteram.",
    bgColorClass: "bg-blue-pastel border-sky-200 text-blue-800",
    emojiDecorative: "🤲",
    explanation: "Doa untuk bertenang, melahirkan jiwa lapang, dan menghilangkan runsing.",
    audio: { arabic: "/audio/arabic/doa-tenang.mp3", malay: "/audio/malay/doa-tenang-nasihat.mp3" }
  },
  {
    id: "doa-perlindungan",
    name: "Doa Perlindungan",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    rumi: "A'udzu bikalimatillahit-tammaati min syarri maa khalaq",
    meaning: "Aku berlindung dengan kalimah-kalimah Allah yang sempurna daripada kejahatan makhluk-Nya.",
    bgColorClass: "bg-purple-pastel border-purple-200 text-purple-800",
    emojiDecorative: "🛡️",
    explanation: "Doa perlindungan diri daripada sebarang ketakutan dan bahaya.",
    audio: { arabic: "/audio/arabic/doa-perlindungan.mp3", malay: "/audio/malay/doa-perlindungan-nasihat.mp3" }
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلّٰهِ",
    rumi: "Alhamdulillah",
    meaning: "Segala puji bagi Allah.",
    bgColorClass: "bg-yellow-pastel border-amber-200 text-amber-800",
    emojiDecorative: "💫",
    explanation: "Zikir bersyukur kepada Allah atas segala nikmat kebaikan.",
    audio: { arabic: "/audio/arabic/alhamdulillah.mp3", malay: "/audio/malay/alhamdulillah-nasihat.mp3" }
  },
  {
    id: "doa-ibu-bapa",
    name: "Doa Ibu Bapa",
    arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    rumi: "Rabbighfirli waliwalidayya warhamhuma kama rabbayani saghira",
    meaning: "Wahai Tuhanku, ampunilah dosaku dan dosa kedua-dua ibu bapaku, dan kasihanilah mereka sebagaimana mereka mendidikku semasa kecil.",
    bgColorClass: "bg-pink-pastel border-rose-250 text-rose-800",
    emojiDecorative: "👨‍👩‍👧‍👦",
    explanation: "Doa mendoakan kebaikan, keampunan, dan kasih sayang untuk ibu dan bapa.",
    audio: { arabic: "/audio/arabic/doa-ibu-bapa.mp3", malay: "/audio/malay/doa-ibu-bapa-nasihat.mp3" }
  }
];
