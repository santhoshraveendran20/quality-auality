import { useEffect } from 'react';
import store from '../data/store.json';

export default function usePageTitle(title) {
  useEffect(() => {
    const base = `${store.name_ta} | ${store.type_ta}, புதுக்கோட்டை`;
    document.title = title ? `${title} | ${store.name_ta}` : base;
  }, [title]);
}
