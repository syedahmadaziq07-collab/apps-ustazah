let currentAudio: HTMLAudioElement | null = null;

export function playStaticAudio(
  audioPath: string,
  onFallback?: () => void
): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const audio = new Audio(audioPath);

  audio.onerror = () => {
    if (onFallback) onFallback();
  };

  audio.oncanplaythrough = () => {
    currentAudio = audio;
    audio.play().catch(() => {
      if (onFallback) onFallback();
    });
  };

  audio.load();
}
