const SESSION_KEY = 'zikircare_teacher_session';

// Demo PIN only. Replace with Supabase Auth in production.
// Read from env or fallback to default demo PIN.
function getTeacherPin(): string {
  return import.meta.env.VITE_TEACHER_PIN || '1234';
}

export function isTeacherLoggedIn(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session?.isTeacherLoggedIn === true;
  } catch {
    return false;
  }
}

export function loginTeacher(pin: string): { success: boolean; error?: string } {
  const correctPin = getTeacherPin();

  if (!pin || pin.trim() === '') {
    return { success: false, error: 'Sila masukkan PIN cikgu.' };
  }

  if (pin.trim() !== correctPin) {
    return { success: false, error: 'PIN cikgu tidak betul. Sila cuba lagi.' };
  }

  const session = {
    isTeacherLoggedIn: true,
    loggedInAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan sesi. Cuba lagi.' };
  }
}

export function logoutTeacher(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export { getTeacherPin };
