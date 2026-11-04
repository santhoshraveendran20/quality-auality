import { useEffect, useState } from 'react';
import { getOpenStatus } from '../lib/hours';

export default function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
