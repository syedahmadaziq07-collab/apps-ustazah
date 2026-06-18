let currentAudio: HTMLAudioElement | null = null;
let currentAudioUrl: string = '';

export function stopCurrentAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  currentAudioUrl = '';
}

/** Play audio synchronously — must be called inside a user gesture handler (click/tap). */
export function playAudioSync(url: string): void {
  stopCurrentAudio();
  currentAudioUrl = url;
  const audio = new Audio(url);
  audio.play().catch(() => {});
  currentAudio = audio;
}

export function getCurrentAudioUrl(): string {
  return currentAudioUrl;
}

export function playStaticAudio(
  audioPath: string,
  onFallback?: () => void
): void {
  stopCurrentAudio();
  currentAudioUrl = audioPath;

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
