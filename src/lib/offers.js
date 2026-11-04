import offers from '../data/offers.json';
import { todayInIndia } from './hours';

/** Offers with no end date, or whose end date is today or later (India time). */
export function activeOffers() {
  const today = todayInIndia();
  return offers.filter((o) => !o.validUntil || o.validUntil >= today);
}
