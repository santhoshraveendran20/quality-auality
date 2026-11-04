import store from '../data/store.json';
import { LANGS, fill } from '../i18n';

const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Current time in India (Asia/Kolkata), whatever the visitor's own time zone. */
export function nowInIndia(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    day: WEEKDAY_INDEX[get('weekday')],
  };
}

/** "21:45" → "9:45" */
export function formatClock(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')}`;
}

/** "21:45" → "இரவு 9:45" (ta) or "9:45 PM" (en) */
export function formatTime(hhmm, lang = 'ta') {
  const h = Number(hhmm.split(':')[0]);
  if (lang === 'en') return `${formatClock(hhmm)} ${h < 12 ? 'AM' : 'PM'}`;
  const period = h < 4 ? 'இரவு' : h < 12 ? 'காலை' : h < 16 ? 'மதியம்' : h < 19 ? 'மாலை' : 'இரவு';
  return `${period} ${formatClock(hhmm)}`;
}

export function hoursText(lang = 'ta') {
  const t = LANGS[lang].time;
  const { open, close, closedDays = [] } = store.hours;
  const base = `${t.daily} ${formatTime(open, lang)} – ${formatTime(close, lang)}`;
  if (!closedDays.length) return base;
  return `${base} (${closedDays.map((d) => t.weekdays[d]).join(', ')} ${t.holiday})`;
}

export function getOpenStatus(date = new Date(), lang = 'ta') {
  const t = LANGS[lang].time;
  const { open, close, closedDays = [] } = store.hours;
  const { minutes, day } = nowInIndia(date);
  const o = toMinutes(open);
  const c = toMinutes(close);
  const openToday = !closedDays.includes(day);

  if (openToday && minutes >= o && minutes < c) {
    return { isOpen: true, text: fill(t.openNow, { time: formatTime(close, lang) }) };
  }

  let when = t.today;
  if (!(openToday && minutes < o)) {
    let offset = 1;
    while (offset < 7 && closedDays.includes((day + offset) % 7)) offset += 1;
    when = offset === 1 ? t.tomorrow : t.weekdays[(day + offset) % 7];
  }
  return { isOpen: false, text: fill(t.closedNow, { when, time: formatTime(open, lang) }) };
}

/** Today's date in India as YYYY-MM-DD, for hiding expired offers. */
export function todayInIndia(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(date);
}
