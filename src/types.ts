export type EmotionKey = 'gembira' | 'marah' | 'sedih' | 'takut' | 'risau' | 'penat' | 'tenang';

export interface AudioPaths {
  arabic: string;
  malay: string;
}

export interface EmotionDetails {
  emoji: string;
  label: string;
  color: 'yellow' | 'red' | 'blue' | 'purple' | 'orange' | 'teal' | 'green';
  illustration: 'HappyChildren' | 'AngryChild' | 'SadChild' | 'ScaredChild' | 'CalmChild';
  nasihat: string;
  aktiviti: string;
  zikir: string;
  zikirRumi: string;
  zikirMaksud: string;
  audio: AudioPaths;
}

export interface DuaItem {
  id: string;
  name: string;
  arabic: string;
  rumi: string;
  meaning: string;
  bgColorClass: string;
  emojiDecorative: string;
  explanation: string;
  audio: AudioPaths;
}

export interface SelectedStudent {
  id: string;
  fullName: string;
  className: string;
  photoUrl: string;
}

export interface EmotionHistoryItem {
  id: string;
  emotion: EmotionKey;
  label: string;
  emoji: string;
  aktiviti: string;
  completedAt: string;
  completed: boolean;
  studentId?: string;
  studentFullName?: string;
  studentPhotoUrl?: string;
  completedDate?: string;
  completedTime?: string;
  shareText?: string;
}

export interface EmotionLogRecord {
  id: string;
  studentId: string;
  studentFullName: string;
  studentPhotoUrl: string;
  emotionId: string;
  emotionLabel: string;
  therapyTitle: string;
  status: string;
  completedAt: string;
  completedDate: string;
  completedTime: string;
  shareText: string;
}
