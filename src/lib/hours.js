import store from '../data/store.json';
import ta from '../i18n/ta.json';

export const WEEKDAYS_TA = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
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

/** "21:45" → "இரவு 9:45" */
export function formatTamilTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h < 4 ? 'இரவு' : h < 12 ? 'காலை' : h < 16 ? 'மதியம்' : h < 19 ? 'மாலை' : 'இரவு';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${h12}:${String(m).padStart(2, '0')}`;
}

export function hoursText() {
  const { open, close, closedDays = [] } = store.hours;
  const base = `${ta.daily} ${formatTamilTime(open)} – ${formatTamilTime(close)}`;
  if (!closedDays.length) return base;
  return `${base} (${closedDays.map((d) => WEEKDAYS_TA[d]).join(', ')} ${ta.holiday})`;
}

export function getOpenStatus(date = new Date()) {
  const { open, close, closedDays = [] } = store.hours;
  const { minutes, day } = nowInIndia(date);
  const o = toMinutes(open);
  const c = toMinutes(close);
  const openToday = !closedDays.includes(day);

  if (openToday && minutes >= o && minutes < c) {
    return { isOpen: true, text: `இப்போது திறந்துள்ளது · ${formatTamilTime(close)} வரை` };
  }

  let when = 'இன்று';
  if (!(openToday && minutes < o)) {
    let offset = 1;
    while (offset < 7 && closedDays.includes((day + offset) % 7)) offset += 1;
    when = offset === 1 ? 'நாளை' : WEEKDAYS_TA[(day + offset) % 7];
  }
  return {
    isOpen: false,
    text: `தற்போது மூடப்பட்டுள்ளது · ${when} ${formatTamilTime(open)} மணிக்குத் திறக்கும்`,
  };
}

/** Today's date in India as YYYY-MM-DD, for hiding expired offers. */
export function todayInIndia(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(date);
}
