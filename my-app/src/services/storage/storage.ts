const isBrowser = () => typeof window !== "undefined";

/** Обёртка над localStorage: JSON-сериализация и безопасная работа на сервере */
export const storage = {
  get: <T>(key: string): T | null => {
    if (!isBrowser()) {
      return null;
    }

    const raw = window.localStorage.getItem(key);

    if (raw === null) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set: (key: string, value: unknown): void => {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
