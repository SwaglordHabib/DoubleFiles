import { createContext, useState, FunctionComponent } from 'react';
import { de, enUS } from 'date-fns/locale';

export const dateFormat: Record<SupportedLanguage, Locale> = {
  'de-DE': de,
  'en-US': enUS,
};

const GERMAN = 'de-DE';
const USA = 'en-US';
const translations = {};

export interface Language {
  label: string;
  /**
   * String, den die i18n-Bibliothek dann letztendlich auswertet.
   */
  code: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'de-DE', label: 'DE' },
  { code: 'en-US', label: 'EN' },
];

export const defaultLanguage = SUPPORTED_LANGUAGES[0];

export const getSupportedLanguageFromBrowserOrDefault = (
  languageCode: string | undefined
) => {
  const inferredLanguage = SUPPORTED_LANGUAGES.find((lang) => {
    const languageFamily = languageCode?.split('-')?.[0];

    if (!languageFamily) {
      return false;
    }

    return lang.code.startsWith(languageFamily);
  });

  return inferredLanguage || defaultLanguage;
};

// kann hier dann später erweitert werden
export type SupportedLanguage = typeof GERMAN | typeof USA;
type InMemoryLanguageStorage = Record<
  SupportedLanguage,
  Record<string, string>
>;

export const translationsPerLocale: InMemoryLanguageStorage =
  translations as any;

export function defineMessagesForLanguage(
  language: SupportedLanguage,
  messages: Record<string, string>
) {
  translationsPerLocale[language] = {
    ...translationsPerLocale[language],
    ...messages,
  };
}

interface LocaleContxtType {
  locale: string;
  setLocale: (locale: string) => void;
}

export const LocaleContext = createContext<LocaleContxtType>(
  {} as LocaleContxtType
);

export const LocaleProvider: FunctionComponent = ({ children }) => {
  const [locale, setLocale] = useState(
    getSupportedLanguageFromBrowserOrDefault(navigator.language).code
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
