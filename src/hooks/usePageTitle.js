import { useEffect } from 'react';
import store from '../data/store.json';
import { useLang } from '../i18n';

export default function usePageTitle(title) {
  const { lang, pick, t } = useLang();
  useEffect(() => {
    const name = pick(store, 'name');
    document.title = title ? `${title} | ${name}` : `${name} | ${pick(store, 'type')}, ${t.city}`;
  }, [title, lang, pick, t]);
}
