export const locales = ['en', 'ko', 'es', 'ja', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  es: 'Español',
  ja: '日本語',
  zh: '中文',
};
