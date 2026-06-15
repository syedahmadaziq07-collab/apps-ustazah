export type EmotionKey = 'gembira' | 'marah' | 'sedih' | 'takut' | 'risau' | 'penat' | 'tenang';

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
}

export interface EmotionHistoryItem {
  id: string;
  emotion: EmotionKey;
  label: string; // The translated Malay label
  emoji: string;
  aktiviti: string;
  completedAt: string;
  completed: boolean;
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
}
