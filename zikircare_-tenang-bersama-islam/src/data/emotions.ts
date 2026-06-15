import { EmotionKey, EmotionDetails, DuaItem } from '../types';

export const emotionData: Record<EmotionKey, EmotionDetails> = {
  gembira: {
    emoji: "😊", 
    label: "Gembira", 
    color: "yellow",
    illustration: "HappyChildren",
    nasihat: "Apabila kita gembira, Islam ajar kita untuk bersyukur kepada Allah dan berkongsi kegembiraan dengan orang lain.",
    aktiviti: "Baca Alhamdulillah 10 kali",
    zikir: "الْحَمْدُ لِلّٰهِ", 
    zikirRumi: "Alhamdulillah",
    zikirMaksud: "Segala puji bagi Allah."
  },
  marah: {
    emoji: "😡", 
    label: "Marah", 
    color: "red",
    illustration: "AngryChild",
    nasihat: "Apabila kita marah, Islam ajar kita untuk bertenang dan beristighfar.",
    aktiviti: "Baca istighfar 10 kali",
    zikir: "أَسْتَغْفِرُ اللهَ", 
    zikirRumi: "Astaghfirullah",
    zikirMaksud: "Aku memohon ampun kepada Allah."
  },
  sedih: {
    emoji: "😢", 
    label: "Sedih", 
    color: "blue",
    illustration: "SadChild",
    nasihat: "Apabila kita sedih, Allah sentiasa bersama kita. Berdoalah kepada-Nya.",
    aktiviti: "Baca doa kesedihan 10 kali",
    zikir: "حَسْبِيَ اللهُ", 
    zikirRumi: "Hasbiyallah",
    zikirMaksud: "Cukuplah Allah bagiku."
  },
  takut: {
    emoji: "😨", 
    label: "Takut", 
    color: "purple",
    illustration: "ScaredChild",
    nasihat: "Apabila kita takut, ingatlah bahawa Allah sentiasa melindungi kita.",
    aktiviti: "Baca doa perlindungan 10 kali",
    zikir: "أَعُوذُ بِاللهِ", 
    zikirRumi: "A’udzubillah",
    zikirMaksud: "Aku berlindung dengan Allah."
  },
  risau: {
    emoji: "😟", 
    label: "Risau", 
    color: "orange",
    illustration: "CalmChild",
    nasihat: "Apabila kita risau, serahkan urusan kepada Allah dan bertawakal.",
    aktiviti: "Baca doa tawakal 10 kali",
    zikir: "تَوَكَّلْتُ عَلَى اللهِ", 
    zikirRumi: "Tawakkaltu ’alallah",
    zikirMaksud: "Aku bertawakal kepada Allah."
  },
  penat: {
    emoji: "😴", 
    label: "Penat", 
    color: "teal",
    illustration: "CalmChild",
    nasihat: "Apabila kita penat, rehat sejenak dan ingat bahawa usaha kita dinilai Allah.",
    aktiviti: "Baca selawat 10 kali",
    zikir: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ", 
    zikirRumi: "Sallallahu ’alaihi wasallam",
    zikirMaksud: "Semoga Allah merahmatinya (merahmati Nabi)."
  },
  tenang: {
    emoji: "😌", 
    label: "Tenang", 
    color: "green",
    illustration: "CalmChild",
    nasihat: "Ketenangan adalah anugerah Allah. Kekalkan dengan zikrullah.",
    aktiviti: "Baca tasbih 10 kali",
    zikir: "سُبْحَانَ اللهِ", 
    zikirRumi: "Subhanallah",
    zikirMaksud: "Maha Suci Allah."
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
    explanation: "Memohon ampun dan kelapangan hati daripada Allah SWT."
  },
  {
    id: "doa-tenang",
    name: "Doa Tenang",
    arabic: "أللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا بِكَ مُطْمَئِنَّةً",
    rumi: "Allahumma inni as'aluka nafsan bika mutma'innah",
    meaning: "Ya Allah, aku memohon kepada-Mu jiwa yang tenang dan tenteram.",
    bgColorClass: "bg-blue-pastel border-sky-200 text-blue-800",
    emojiDecorative: "🤲",
    explanation: "Doa untuk bertenang, melahirkan jiwa lapang, dan menghilangkan runsing."
  },
  {
    id: "doa-perlindungan",
    name: "Doa Perlindungan",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    rumi: "A'udzu bikalimatillahit-tammaati min syarri maa khalaq",
    meaning: "Aku berlindung dengan kalimah-kalimah Allah yang sempurna daripada kejahatan makhluk-Nya.",
    bgColorClass: "bg-purple-pastel border-purple-200 text-purple-800",
    emojiDecorative: "🛡️",
    explanation: "Doa perlindungan diri daripada sebarang ketakutan dan bahaya."
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلّٰهِ",
    rumi: "Alhamdulillah",
    meaning: "Segala puji bagi Allah.",
    bgColorClass: "bg-yellow-pastel border-amber-200 text-amber-800",
    emojiDecorative: "💫",
    explanation: "Zikir bersyukur kepada Allah atas segala nikmat kebaikan."
  },
  {
    id: "doa-ibu-bapa",
    name: "Doa Ibu Bapa",
    arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    rumi: "Rabbighfirli waliwalidayya warhamhuma kama rabbayani saghira",
    meaning: "Wahai Tuhanku, ampunilah dosaku dan dosa kedua-dua ibu bapaku, dan kasihanilah mereka sebagaimana mereka mendidikku semasa kecil.",
    bgColorClass: "bg-pink-pastel border-rose-250 text-rose-800",
    emojiDecorative: "👨‍👩‍👧‍👦",
    explanation: "Doa mendoakan kebaikan, keampunan, dan kasih sayang untuk ibu dan bapa."
  }
];
