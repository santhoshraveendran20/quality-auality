import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ta from './ta.json';
import en from './en.json';

export const LANGS = { ta, en };
const STORAGE_KEY = 'store-lang';
const LanguageContext = createContext(null);

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'ta' ? v : 'ta';
  } catch {
    return 'ta';
  }
}

/** "{years} ஆண்டு" + { years: 25 } → "25 ஆண்டு" */
export const fill = (str, vars = {}) => str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

// Size labels in products.json are written in Tamil units; this turns them into English.
// Whole words come first so the short units below don't eat into them (ஃபேமிலி contains லி).
const UNITS_EN = [
  [/ஃபேமிலி பேக்/g, 'Family pack'],
  [/சிறியது/g, 'Small'],
  [/பெரியது/g, 'Large'],
  [/கப்/g, 'Cup'],
  [/கோன்/g, 'Cone'],
  [/மி\.லி/g, 'ml'],
  [/கி\.கி/g, 'kg'],
  [/லி/g, 'L'],
  [/கி/g, 'g'],
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStored);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked: the choice still applies until the page reloads
    }
  }, []);

  const value = useMemo(() => {
    const other = lang === 'ta' ? 'en' : 'ta';
    return {
      lang,
      setLang,
      toggle: () => setLang(other),
      t: LANGS[lang],
      /** obj.name_en / obj.name_ta for the current language, falling back to Tamil. */
      pick: (obj, field) => obj?.[`${field}_${lang}`] ?? obj?.[`${field}_ta`] ?? obj?.[field],
      /** The same field in the other language, for bilingual subtitles. */
      pickOther: (obj, field) => obj?.[`${field}_${other}`],
      size: (s) => (lang === 'en' ? UNITS_EN.reduce((acc, [re, to]) => acc.replace(re, to), s) : s),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

export const useT = () => useLang().t;
