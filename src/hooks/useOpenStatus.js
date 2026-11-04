import { useEffect, useState } from 'react';
import { getOpenStatus } from '../lib/hours';
import { useLang } from '../i18n';

export default function useOpenStatus() {
  const { lang } = useLang();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return getOpenStatus(now, lang);
}
