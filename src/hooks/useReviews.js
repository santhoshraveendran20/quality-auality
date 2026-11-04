import { useCallback, useEffect, useState } from 'react';

const KEY = 'qq-reviews';

/*
 * Customer reviews written on the site. The site has no backend yet, so reviews are kept in
 * this browser's localStorage: the visitor sees theirs straight away, but other visitors do
 * not. To share reviews with everyone, swap load()/save() for calls to a database API.
 */
function load() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // storage full or blocked (private mode): the review still shows until the page reloads
  }
}

export default function useReviews() {
  const [reviews, setReviews] = useState(load);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e) => e.key === KEY && setReviews(load());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addReview = useCallback(({ name, place, rating, text }) => {
    const review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim().slice(0, 40),
      place: place.trim().slice(0, 40),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      text: text.trim().slice(0, 300),
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => {
      const next = [review, ...prev];
      save(next);
      return next;
    });
    return review;
  }, []);

  return { reviews, addReview };
}
