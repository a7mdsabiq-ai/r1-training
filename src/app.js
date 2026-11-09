/* ===== R1 — التطبيق v2 ===== */
const VERSION = '2.0';
const KEY = 'r1.data.v1';
const app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const yt = id => `https://youtu.be/${id}`;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const SIDE = new Set(['db_row', 'cable_kickback', 'reverse_lunge', 'walking_lunge', 'step_up', 'bird_dog', 'dead_bug', 'bicycle', 'russian_twist', 'side_plank']);
const toEn = v => String(v).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace('٫', '.').replace(',', '.');

/* ---------- أيقونات ---------- */
const I = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const IC = {
  home: I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/>'),
  list: I('<path d="M6.5 6.5h11M6.5 12h11M6.5 17.5h7"/><circle cx="3" cy="6.5" r=".6" fill="currentColor"/><circle cx="3" cy="12" r=".6" fill="currentColor"/><circle cx="3" cy="17.5" r=".6" fill="currentColor"/>'),
  cal: I('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>'),
  body: I('<circle cx="12" cy="4.5" r="2"/><path d="M5 8.5c4 1.2 10 1.2 14 0M12 9.6V15M12 15l-3.2 6M12 15l3.2 6"/>'),
  gift: I('<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5V20h14v-7.5M12 8.5V20M12 8.5C10.5 4 6.5 4.5 7 7c.3 1.4 2.6 1.5 5 1.5ZM12 8.5c1.5-4.5 5.5-4 5-1.5-.3 1.4-2.6 1.5-5 1.5Z"/>'),
  gear: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>'),
  play: I('<path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" stroke="none"/>'),
  swap: I('<path d="M7 4 3.5 7.5 7 11"/><path d="M3.5 7.5H17"/><path d="m17 13 3.5 3.5L17 20"/><path d="M20.5 16.5H7"/>'),
  check: I('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 'stroke-width="2.6"'),
  chev: I('<path d="m15 18-6-6 6-6"/>'),
  back: I('<path d="m9 18 6-6-6-6"/>'),
  info: I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>'),
  timer: I('<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  trash: I('<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>'),
  share: I('<path d="M12 15V3.5M8 7.5l4-4 4 4"/><path d="M5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6.5"/>'),
  copy: I('<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>'),
  upload: I('<path d="M12 4v11M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V15"/>'),
  flame: I('<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.2 2.3-5.2 3.6-7 .5 1.6 1.3 2.6 2.4 3.1C11.3 7.6 12.6 5 15 3c-.3 2.7.8 4.6 2 6.2 1 1.4 1.5 2.9 1.5 4.7C18.5 18.3 15.9 21 12 21Z"/>'),
  trophy: I('<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M16 5.5h3a3 3 0 0 1-3 3.5M8 5.5H5a3 3 0 0 0 3 3.5M12 13v3.5M8.5 20h7M9.5 20l.8-3.5h3.4l.8 3.5"/>'),
  x: I('<path d="M6 6l12 12M18 6 6 18"/>'),
  print: I('<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7Z"/>'),
  coach: I('<circle cx="9" cy="7.5" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.6 6.5-5.6s5.9 2 6.5 5.6"/><path d="m16 9.5 2 2 4-4"/>'),
  link: I('<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>'),
  up: I('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  iosShare: I('<path d="M12 14.5V3.5M8.5 7 12 3.5 15.5 7"/><path d="M7.5 10.5H6a1.5 1.5 0 0 0-1.5 1.5v7.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5h-1.5"/>'),
  warn: I('<path d="M12 3.5 2.5 20h19Z"/><path d="M12 10v4.5M12 17.4v.2"/>'),
  spark: I('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
  moon: I('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'),
  redo: I('<path d="M20 7v5h-5"/><path d="M20 12a8 8 0 1 1-2.3-5.6L20 9"/>'),
  next: I('<path d="m15 6-6 6 6 6"/>'),
  prev: I('<path d="m9 6 6 6-6 6"/>')
};

/* ---------- الشعار (ملف المستخدم كما هو) ---------- */
const LOGO_PATHS = '<path d="M40.0 522 L211.7 338 Q305.0 238 375.0 238 L970.0 238 L870.1 345 L395.1 345 Q370.1 345 346.8 370 L205.0 522 Z" fill="currentColor"/><path d="M230.0 522 L353.2 390 Q381.1 360 411.1 360 L851.1 360 L753.2 465 L483.2 465 Q438.2 465 385.0 522 Z" fill="currentColor"/><path d="M915.0 238 L970.0 238 L758.2 465 L703.2 465 Z" fill="currentColor"/><path d="M520 463 L655 463 L703 522 L570 522 Z" fill="currentColor"/><path d="M725.0 522 L990.0 238 L1170.0 238 L905.0 522 Z" fill="currentColor"/>';
const logo = (w = 80) => `<svg width="${w}" height="${Math.round(w * 320 / 1180)}" viewBox="20 220 1180 320" aria-label="R1" style="display:block;color:var(--logo)">${LOGO_PATHS}</svg>`;

/* ---------- التخزين ---------- */
let STORAGE_OK = true;
try { localStorage.setItem('r1.t', '1'); localStorage.removeItem('r1.t'); } catch (e) { STORAGE_OK = false; }
const DEFAULT_DAYS = [0, 1, 3, 4];
const DEFAULT_REWARDS = () => [
  { id: uid(), e: '☕', n: 'قهوة من مكاني المفضل', c: 60, r: [] },
  { id: uid(), e: '🛍️', n: 'قطعة ملابس رياضية جديدة', c: 250, r: [] },
  { id: uid(), e: '💆‍♀️', n: 'يوم سبا أو مساج', c: 600, r: [] }
];
const DEF = () => ({
  v: 2, profile: { name: '' }, plan: {}, swaps: {}, cfg: {}, bcfg: {}, coach: { firstSets: 4, otherSets: 3 },
  sessions: [], active: null, body: [],
  settings: { foundation: true, fCount: 4, sound: true, theme: 'auto', accent: 'pink', fullMode: 'video' },
  schedule: { hist: [], ov: {} },
  pts: [], rewards: DEFAULT_REWARDS(), badges: {}, weekBonus: {},
  ui: { dismiss: {} }, created: new Date().toISOString()
});
function merge(d) {
  const b = DEF();
  const o = { ...b, ...d };
  for (const k of ['settings', 'coach', 'schedule', 'ui']) o[k] = { ...b[k], ...(d[k] || {}) };
  if (!o.schedule.ov) o.schedule.ov = {};
  if (!Array.isArray(o.schedule.hist)) o.schedule.hist = [];
  if (!o.schedule.hist.length) o.schedule.hist = [{ from: ymd(o.created || new Date()), days: DEFAULT_DAYS.slice() }];
  if (!Array.isArray(o.rewards)) o.rewards = DEFAULT_REWARDS();
  for (const k of ['cfg', 'bcfg', 'badges', 'weekBonus', 'plan', 'swaps']) o[k] = o[k] || {};
  if (!Array.isArray(o.pts)) o.pts = [];
  return o;
}
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return merge(JSON.parse(raw)); } catch (e) { }
  return merge({});
}

/* ---------- التواريخ ---------- */
const ymd = d => { d = new Date(d); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); };
const addDays = (s, n) => { const d = pd(s); d.setDate(d.getDate() + n); return ymd(d); };
const todayS = () => ymd(new Date());
const fmtDay = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { day: 'numeric', month: 'long' });
const fmtFull = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtMon = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { month: 'short' });
const fmtMY = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { month: 'long', year: 'numeric' });
const WD = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const WDL = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const weekStart = (d = new Date()) => { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - x.getDay()); return x; };
const wkKey = d => ymd(weekStart(d));
const mmss = s => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}` : `${m}:${String(x).padStart(2, '0')}`; };
const nf = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString('en-US');

let S = load();
let saveT;
function save(now) {
  clearTimeout(saveT);
  const w = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { STORAGE_OK = false; } };
  now ? w() : (saveT = setTimeout(w, 250));
}

/* ---------- الثيم ---------- */
const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
const ACCENTS = { pink: { light: '#E0457B', dark: '#F0598E', bgL: '#FFF8FA', bgD: '#121013' }, red: { light: '#E10600', dark: '#F0281D', bgL: '#FBF8F8', bgD: '#121010' } };
function applyTheme() {
  const t = S.settings.theme, dark = t === 'dark' || (t === 'auto' && mq && mq.matches);
  const acc = S.settings.accent === 'red' ? 'red' : 'pink', A = ACCENTS[acc];
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.dataset.accent = acc;
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? A.bgD : A.bgL;
  const fav = document.querySelector('link[rel=icon]');
  if (fav) fav.href = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="white"/><svg x="8" y="35" width="84" height="23" viewBox="20 220 1180 320" style="color:${A.light}">${LOGO_PATHS}</svg></svg>`);
  const ti = document.querySelector('link[rel=apple-touch-icon]'); if (ti) ti.href = acc === 'red' ? 'icon-red-180.png' : 'icon-180.png';
}
mq && (mq.addEventListener ? mq.addEventListener('change', () => S.settings.theme === 'auto' && applyTheme()) : mq.addListener(() => S.settings.theme === 'auto' && applyTheme()));

/* ---------- فهارس البرنامج والإعدادات ---------- */
const SLOTS = [], SLOT = {}, BLOCK = {}, CIRCUITS = [];
DAYS.forEach(d => (d.modes ? Object.entries(d.modes) : [['', d.blocks]]).forEach(([mode, bl]) => bl.forEach((b, bi) => { b.key = d.id + mode + bi; b.mode = mode; BLOCK[b.key] = b; if (b.type === 'circuit') CIRCUITS.push(b); b.slots.forEach((s, si) => { SLOTS.push(s.id); SLOT[s.id] = { s, b, d, si }; }); })));
const fullMode = () => S.settings.fullMode === 'circuit' ? 'circuit' : 'video';
const blocksOf = d => d.modes ? d.modes[fullMode()] : d.blocks;
const allBlocks = d => d.modes ? Object.values(d.modes).flat() : d.blocks;
const isVideoDay = d => !!d.modes && fullMode() === 'video';
const DAY = Object.fromEntries(DAYS.map(d => [d.id, d]));
const primaryOf = sid => { const { s } = SLOT[sid]; return s.opts.includes(S.plan[sid]) ? S.plan[sid] : s.opts[0]; };
const currentOf = sid => { const { s } = SLOT[sid]; return s.opts.includes(S.swaps[sid]) ? S.swaps[sid] : primaryOf(sid); };
function sc(sid) {
  const { s, b, si } = SLOT[sid], o = S.cfg[sid] || {};
  return {
    sets: o.sets ?? (b.type === 'sets' ? (si === 0 ? S.coach.firstSets : S.coach.otherSets) : 1),
    reps: o.reps ?? s.reps, rest: o.rest ?? s.rest ?? 0, secs: o.secs ?? s.secs, mins: o.mins ?? s.mins
  };
}
const bc = b => { const o = S.bcfg[b.key] || {}; return { rounds: o.rounds ?? b.rounds, restRound: o.restRound ?? b.restRound }; };
const inFoundation = () => S.settings.foundation && S.sessions.length < S.settings.fCount;
function setsFor(sid, base) {
  const { b } = SLOT[sid];
  let n = b.type === 'circuit' ? bc(b).rounds : sc(sid).sets;
  if (!base && inFoundation() && (b.type === 'sets' || b.foundation) && n > 2) n -= 1;
  return n;
}
const parseReps = r => { if (!r) return null; const [a, b] = String(r).split(/[–-]/).map(Number); return { lo: a, hi: b || a }; };
const rangeOf = sid => parseReps(sc(sid).reps);
const isSide = (sid, ex) => SLOT[sid].s.side || SIDE.has(ex);
function targetShort(sid, ex, base) {
  const { b } = SLOT[sid], c = sc(sid); ex = ex || currentOf(sid);
  if (b.type === 'cardio') return `${c.mins} دقيقة`;
  if (b.type === 'video') return `${EX[ex].mins} دقيقة`;
  const n = setsFor(sid, base), side = isSide(sid, ex) ? ' لكل جهة' : '';
  if (c.secs) return `${n} × ${c.secs} ثانية${side}`;
  return `${n} × ${c.reps}${side}`;
}
function targetLong(sid, ex) {
  const { b } = SLOT[sid], c = sc(sid); ex = ex || currentOf(sid);
  if (b.type === 'cardio') return `${c.mins} دقيقة`;
  if (b.type === 'video') return `فيديو ${EX[ex].mins} دقيقة · ${EX[ex].e.split(' · ')[0]}`;
  const n = setsFor(sid), side = isSide(sid, ex) ? ' لكل جهة' : '';
  const what = c.secs ? `${c.secs} ثانية${side}` : `${c.reps} عدة${side}`;
  if (b.type === 'circuit') return `${what} · ${n} ${n > 2 ? 'جولات' : 'جولة'}`;
  return `${n} مجموعات × ${what} · راحة ${c.rest} ث`;
}
function estMinutes(d) {
  let sec = (isVideoDay(d) ? 5 : 13) * 60;
  for (const b of blocksOf(d)) {
    if (b.type === 'cardio') { if (!b.slots[0].optional) sec += sc(b.slots[0].id).mins * 60; continue; }
    if (b.type === 'video') { sec += EX[currentOf(b.slots[0].id)].mins * 60; continue; }
    if (b.type === 'circuit') { sec += setsFor(b.slots[0].id) * (b.slots.length * 50 + bc(b).restRound); continue; }
    for (const s of b.slots) if (!s.optional) sec += setsFor(s.id) * (45 + sc(s.id).rest);
  }
  return Math.round(sec / 60 / 5) * 5;
}
const exCount = d => blocksOf(d).filter(b => b.type !== 'cardio').reduce((a, b) => a + b.slots.filter(s => !s.optional).length, 0);
const exLabel = d => `${exCount(d)} ${isVideoDay(d) ? 'فيديوهات' : 'تمارين'}`;
const cardioMin = d => blocksOf(d).filter(b => b.type === 'cardio').reduce((a, b) => a + (b.slots[0].optional ? 0 : sc(b.slots[0].id).mins), 0);
function dayMuscles(d) {
  const p = new Set(), s = new Set();
  blocksOf(d).forEach(b => b.type !== 'cardio' && b.slots.forEach(sl => { if (sl.optional) return; const e = EX[currentOf(sl.id)]; e.p.forEach(m => p.add(m)); e.s.forEach(m => s.add(m)); }));
  return { p: [...p], s: [...s] };
}

/* ---------- الجدول الأسبوعي والتقويم ---------- */
const curDays = () => S.schedule.hist[S.schedule.hist.length - 1].days;
function daysAt(date) { let cur = null; for (const e of S.schedule.hist) if (e.from <= date) cur = e.days; return cur; }
function isTrain(date) {
  const ov = S.schedule.ov[date]; if (ov === 'rest') return false; if (ov === 'train') return true;
  const d = daysAt(date); return !!d && d.includes(pd(date).getDay());
}
function setDays(days) {
  const t = todayS(), h = S.schedule.hist;
  days = [...new Set(days)].sort();
  if (h.length && h[h.length - 1].from === t) h[h.length - 1].days = days; else h.push({ from: t, days });
  for (const k in S.schedule.ov) if (k >= t) delete S.schedule.ov[k];
}
const weekTarget = () => curDays().length;
function nextDay() {
  const last = S.sessions[S.sessions.length - 1];
  if (!last) return DAYS[0];
  return DAYS[(DAYS.findIndex(d => d.id === last.day) + 1) % DAYS.length];
}
function sessionsByDate() { const m = {}; S.sessions.forEach(s => { const k = ymd(s.start); (m[k] = m[k] || []).push(s); }); return m; }
function buildPlan(from, to) {
  const today = todayS(), byDate = sessionsByDate(), out = {};
  let idx = DAYS.indexOf(nextDay());
  const start = from < today ? from : today, end = to > today ? to : today;
  for (let d = start; d <= end; d = addDays(d, 1)) {
    if (byDate[d]) { out[d] = { t: 'done', ss: byDate[d] }; continue; }
    if (d < today) { out[d] = { t: isTrain(d) ? 'miss' : 'rest' }; continue; }
    if (isTrain(d)) { out[d] = { t: 'plan', day: DAYS[idx % DAYS.length] }; idx++; } else out[d] = { t: 'rest' };
  }
  return out;
}
function weekInfo() {
  const ws = wkKey(new Date()), we = addDays(ws, 6), today = todayS(), plan = buildPlan(ws, we);
  let done = 0, miss = 0, upcoming = 0; const restLeft = [];
  for (let d = ws; d <= we; d = addDays(d, 1)) {
    const p = plan[d];
    if (p.t === 'done') done += p.ss.length; else if (p.t === 'miss') miss++; else if (p.t === 'plan') upcoming++; else if (p.t === 'rest' && d >= today) restLeft.push(d);
  }
  return { ws, we, plan, done, miss, upcoming, restLeft, target: weekTarget() };
}
function nextPlanned(after) {
  const p = buildPlan(addDays(after, 1), addDays(after, 21));
  for (let d = addDays(after, 1); d <= addDays(after, 21); d = addDays(d, 1)) if (p[d] && p[d].t === 'plan') return { date: d, day: p[d].day };
  return null;
}
function weeksStats() {
  const counts = {}; S.sessions.forEach(s => { const k = wkKey(s.start); counts[k] = (counts[k] || 0) + 1; });
  const tgt = k => { const d = daysAt(addDays(k, 6)) || curDays(); return Math.max(1, d.length); };
  const full = new Set(Object.keys(counts).filter(k => counts[k] >= tgt(k)));
  let best = 0, run = 0, prev = null;
  [...full].sort().forEach(k => { run = prev && addDays(prev, 7) === k ? run + 1 : 1; best = Math.max(best, run); prev = k; });
  let cur = 0, w = wkKey(new Date());
  if (!full.has(w)) w = addDays(w, -7);
  while (full.has(w)) { cur++; w = addDays(w, -7); }
  return { fullWeeks: full.size, best, cur };
}

/* ---------- النجوم والمكافآت والأوسمة ---------- */
const balance = () => S.pts.reduce((a, p) => a + p.n, 0);
function award(n, w, sid) { S.pts.push({ id: uid(), d: new Date().toISOString(), n, w, s: sid || null }); }
const BADGES = [
  { id: 'first', e: '🌱', n: 'أول خطوة', d: 'خلّصي أول تمرين', ok: x => x.n >= 1 },
  { id: 's5', e: '✋', n: '٥ تمارين', d: 'خلّصي ٥ تمارين', ok: x => x.n >= 5 },
  { id: 's10', e: '🔥', n: '١٠ تمارين', d: 'خلّصي ١٠ تمارين', ok: x => x.n >= 10 },
  { id: 's25', e: '💪', n: '٢٥ تمرين', d: 'خلّصي ٢٥ تمرين', ok: x => x.n >= 25 },
  { id: 's50', e: '🏅', n: '٥٠ تمرين', d: 'خلّصي ٥٠ تمرين', ok: x => x.n >= 50 },
  { id: 's100', e: '👑', n: '١٠٠ تمرين', d: 'خلّصي ١٠٠ تمرين', ok: x => x.n >= 100 },
  { id: 'week1', e: '⭐', n: 'أسبوع كامل', d: 'كمّلي كل تمارين الأسبوع', ok: x => x.fullWeeks >= 1 },
  { id: 'streak4', e: '🗓️', n: 'شهر ثابت', d: '٤ أسابيع كاملة ورا بعض', ok: x => x.best >= 4 },
  { id: 'streak8', e: '💎', n: 'شهرين ثبات', d: '٨ أسابيع كاملة ورا بعض', ok: x => x.best >= 8 },
  { id: 'streak12', e: '🏆', n: '٣ شهور ثبات', d: '١٢ أسبوع كامل ورا بعض', ok: x => x.best >= 12 },
  { id: 'pr1', e: '📈', n: 'رقم جديد', d: 'ارفعي وزن أعلى من قبل', ok: x => x.prs >= 1 },
  { id: 'pr10', e: '🚀', n: '١٠ أرقام', d: '١٠ أرقام جديدة', ok: x => x.prs >= 10 },
  { id: 'allsets', e: '✅', n: 'ما فوّتت شي', d: 'كل المجموعات في ٥ تمارين', ok: x => x.full >= 5 },
  { id: 'comeback', e: '🔄', n: 'رجعة قوية', d: 'عوّضي تمرين فاتك', ok: x => x.makeups >= 1 },
  { id: 'measure1', e: '📏', n: 'أول قياس', d: 'سجّلي أول قياس', ok: x => x.measures >= 1 },
  { id: 'waist3', e: '🎯', n: 'الخصر -٣ سم', d: 'نزل خصرك ٣ سم من البداية', ok: x => x.waistDrop >= 3 }
];
function badgeStats() {
  const w = weeksStats(), ws = S.body.filter(b => b.waist !== '' && b.waist != null).map(b => +b.waist);
  return { n: S.sessions.length, fullWeeks: w.fullWeeks, best: w.best, prs: S.sessions.reduce((a, s) => a + (s.prs || 0), 0),
    full: S.sessions.filter(s => s.all).length, makeups: S.sessions.filter(s => s.makeup).length, measures: S.body.length,
    waistDrop: ws.length > 1 ? ws[0] - Math.min(...ws.slice(1)) : 0 };
}
function checkBadges(sid) {
  const x = badgeStats(), nw = [];
  for (const b of BADGES) if (!S.badges[b.id] && b.ok(x)) { S.badges[b.id] = new Date().toISOString(); nw.push(b); award(10, `وسام: ${b.n}`, sid); }
  return nw;
}
const nearestReward = () => { const bal = balance(); return [...S.rewards].sort((a, b) => a.c - b.c).find(r => r.c > bal) || null; };
const readyRewards = () => { const bal = balance(); return S.rewards.filter(r => r.c <= bal); };
function confetti() {
  const c = document.createElement('div'); c.className = 'confetti';
  const cols = S.settings.accent === 'red' ? ['#E10600', '#FF8A80', '#FFD166', '#7AD3B5', '#2A1F1F', '#FFFFFF'] : ['#E0457B', '#F7A8C4', '#FFD166', '#7AD3B5', '#B78AF0', '#FFFFFF'];
  for (let i = 0; i < 46; i++) { const e = document.createElement('i'); e.style.left = Math.random() * 100 + '%'; e.style.background = cols[i % cols.length]; e.style.animationDelay = Math.random() * .5 + 's'; e.style.transform = `rotate(${Math.random() * 180}deg)`; c.appendChild(e); }
  document.body.appendChild(c); setTimeout(() => c.remove(), 3200);
}

/* ---------- السجل والتقدم ---------- */
function lastFor(ex) {
  for (let i = S.sessions.length - 1; i >= 0; i--) {
    const se = S.sessions[i];
    for (const sid in se.entries) { const e = se.entries[sid]; if (e.ex === ex) { const done = e.sets.filter(x => x.ok); if (done.length) return { date: se.start, sets: done }; } }
  }
  return null;
}
function bestWeight(ex) {
  let b = 0; for (const se of S.sessions) for (const sid in se.entries) { const e = se.entries[sid]; if (e.ex === ex) e.sets.forEach(x => { if (x.ok && +x.w > b) b = +x.w; }); }
  return b;
}
function readyUp(sid, ex) {
  const r = rangeOf(sid); if (!r || EX[ex].t !== 'w') return false;
  const l = lastFor(ex); if (!l || l.sets.length < setsFor(sid)) return false;
  return l.sets.every(x => +x.r >= r.hi && +x.w > 0);
}
const sessionStats = se => {
  let sets = 0, vol = 0;
  for (const sid in se.entries) { const e = se.entries[sid]; e.sets.forEach(x => { if (x.ok && x.m === undefined) { sets++; vol += (+x.w || 0) * (+x.r || 0); } }); }
  return { sets, vol, min: Math.max(1, Math.round((new Date(se.end) - new Date(se.start)) / 60000)) };
};

/* ---------- واجهة: توست، شيت، ديالوج ---------- */
let toastT;
function toast(msg) {
  let t = document.querySelector('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}
let sheetEl, scrimEl;
function openSheet(html) {
  closeSheet(true);
  scrimEl = document.createElement('div'); scrimEl.className = 'scrim'; scrimEl.dataset.act = 'closeSheet';
  sheetEl = document.createElement('div'); sheetEl.className = 'sheet';
  sheetEl.innerHTML = `<div class="grab"></div><button class="sheet-x" data-act="closeSheet" aria-label="إغلاق">${IC.x}</button>${html}`;
  document.body.append(scrimEl, sheetEl);
  requestAnimationFrame(() => { scrimEl.classList.add('show'); sheetEl.classList.add('show'); });
}
function closeSheet(instant) {
  const s = sheetEl, c = scrimEl; sheetEl = scrimEl = null;
  if (!s) return;
  if (instant) { s.remove(); c.remove(); return; }
  s.classList.remove('show'); c.classList.remove('show'); setTimeout(() => { s.remove(); c.remove(); }, 260);
}
function ask(title, text, ok = 'تمام', danger = false, cancel = 'إلغاء') {
  return new Promise(res => {
    const sc_ = document.createElement('div'); sc_.className = 'scrim top';
    const d = document.createElement('div'); d.className = 'dialog';
    d.innerHTML = `<h3>${title}</h3><p>${text}</p><div class="row"><button class="btn sm ${danger ? 'danger' : ''} grow" data-r="1">${ok}</button>${cancel ? `<button class="btn sm line grow" data-r="0">${cancel}</button>` : ''}</div>`;
    document.body.append(sc_, d); requestAnimationFrame(() => { sc_.classList.add('show'); d.classList.add('show'); });
    const done = v => { sc_.remove(); d.remove(); res(v); };
    d.addEventListener('click', e => { const b = e.target.closest('[data-r]'); if (b) done(b.dataset.r === '1'); });
    sc_.addEventListener('click', () => done(false));
  });
}
async function copyText(t, msg = 'انسخ ✓') {
  try { await navigator.clipboard.writeText(t); toast(msg); return true; }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (_) { } ta.remove();
    toast(ok ? msg : 'ما قدرت أنسخ، انسخيه يدويًا'); return ok;
  }
}

/* ---------- البيئة ---------- */
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = !!(navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches));
let inFrame = false; try { inFrame = window.top !== window.self; } catch (e) { inFrame = true; }

/* ---------- الحالة والتنقل ---------- */
const st = { view: 'home', day: null, metric: 'weight', calOff: 0 };
function go(view, extra = {}) { Object.assign(st, { view }, extra); render(); window.scrollTo(0, 0); }
function rerenderKeep() {
  const y = window.scrollY, open = [...document.querySelectorAll('details.acc')].map(d => d.open);
  render(); document.querySelectorAll('details.acc').forEach((d, i) => { if (open[i] !== undefined) d.open = open[i]; }); window.scrollTo(0, y);
}
function render() {
  if (!S.profile.name && st.view !== 'welcome') st.view = 'welcome';
  const v = VIEWS[st.view] || VIEWS.home;
  const withTabs = !['session', 'welcome'].includes(st.view);
  app.className = withTabs ? '' : 'no-tabs';
  app.innerHTML = v();
  renderTabs(withTabs);
  renderBars();
}
function renderTabs(show) {
  let t = document.querySelector('.tabs');
  if (!show) { t && t.remove(); return; }
  if (!t) { t = document.createElement('nav'); t.className = 'tabs'; document.body.appendChild(t); }
  const tabs = [['home', 'اليوم', IC.home], ['cal', 'التقويم', IC.cal], ['program', 'البرنامج', IC.list], ['rewards', 'جوائزي', IC.gift], ['body', 'جسمي', IC.body]];
  const cur = { day: 'program', coach: 'program', settings: 'home', history: 'cal' }[st.view] || st.view;
  t.innerHTML = `<div class="in">${tabs.map(([k, l, i]) => `<button class="tab ${cur === k ? 'on' : ''}" data-act="tab" data-v="${k}">${i}<span>${l}</span></button>`).join('')}</div>`;
}

/* ---------- الشاشات ---------- */
const VIEWS = {};
const dayChips = (sel, act) => `<div class="wdays">${WD.map((n, i) => `<button class="${sel.includes(i) ? 'on' : ''}" data-act="${act}" data-i="${i}">${n}<small>${sel.includes(i) ? 'تمرين' : 'راحة'}</small></button>`).join('')}</div>`;

let wDays = DEFAULT_DAYS.slice();
VIEWS.welcome = () => `
  <div class="welcome">
    <div style="display:flex;justify-content:center">${logo(190)}</div>
    <h1>هلا فيك</h1>
    <p class="muted" style="margin:0 0 22px">برنامج تمارينك ٤ أيام بالأسبوع: دفع، سحب، أرجل، وشامل مع كور وكارديو. سجّلي أوزانك، وتابعي جسمك، واجمعي نجوم لمكافآتك.</p>
    <label class="f" style="text-align:right"><span>وش اسمك؟</span><input class="inp" id="wName" placeholder="اسمك" autocomplete="given-name"></label>
    <div style="text-align:right;margin:4px 0 8px"><span style="font-size:13px;font-weight:600;color:var(--ink2)">أي أيام بتتمرنين؟</span></div>
    ${dayChips(wDays, 'wDay')}
    <div class="small muted" style="margin:8px 0 18px">تقدرين تغيّرينها بعدين. الأفضل يكون بين الأيام يوم راحة.</div>
    <button class="btn block" data-act="welcomeGo">يلا نبدأ</button>
    <div class="card" style="margin-top:22px;text-align:right">
      <b>عندك نسخة من جوالك القديم؟</b>
      <div class="small muted" style="margin:4px 0 12px">استرجعي تمارينك وقياساتك ونجومك كلها بخطوة وحدة.</div>
      <div class="row"><label class="btn sm grow" style="cursor:pointer">${IC.upload} استرجاع من ملف<input type="file" accept=".json,application/json,text/plain" id="restoreFile" hidden></label><button class="btn sm line grow" data-act="restorePaste">لصق كود</button></div>
    </div>
    ${!STORAGE_OK ? `<p class="small" style="color:var(--warn);margin-top:14px">تنبيه: الحفظ مو متاح في هذا العرض.</p>` : ''}
  </div>`;

function weekStrip(wi) {
  const today = todayS();
  return `<div class="week">${WD.map((n, i) => {
    const d = addDays(wi.ws, i), p = wi.plan[d];
    const cls = p.t === 'done' ? 'done' : p.t === 'plan' ? 'plan' : p.t === 'miss' ? 'miss' : '';
    const lbl = p.t === 'done' ? DAY[p.ss[0].day].n + ' ✓' : p.t === 'plan' ? p.day.n : p.t === 'miss' ? 'فات' : 'راحة';
    return `<div class="wd ${cls} ${d === today ? 'today' : ''}" data-act="calDay" data-d="${d}"><div class="dot"><span class="num">${pd(d).getDate()}</span><small>${lbl}</small></div><span>${n}</span></div>`;
  }).join('')}</div>`;
}

VIEWS.home = () => {
  const today = todayS(), now = new Date(), wi = weekInfo(), tp = wi.plan[today];
  const tip = TIPS[(Math.floor(Date.now() / 864e5)) % TIPS.length], bal = balance(), nr = nearestReward(), rr = readyRewards();
  let banners = '';
  if (!STORAGE_OK) banners += `<div class="banner warn">${IC.warn}<div>الحفظ مو متاح في هذا العرض، فالبيانات بتروح لو قفلتي الصفحة. افتحي التطبيق من رابطه الأساسي.</div></div>`;
  if (isIOS && !standalone && !inFrame && !S.ui.dismiss.install) banners += `<div class="banner pink">${IC.iosShare}<div><b>ثبّتي التطبيق على جوالك:</b> اضغطي زر المشاركة <span class="kbd">${IC.iosShare}</span> تحت في سفاري، ثم «إضافة إلى الشاشة الرئيسية». كذا بياناتك تنحفظ بأمان.</div><button class="x" data-act="dismiss" data-k="install">${IC.x}</button></div>`;
  if (wi.miss > 0 && wi.done + wi.upcoming < wi.target && !S.ui.dismiss['mk' + wi.ws]) {
    const r = wi.restLeft[0];
    banners += `<div class="banner warn">${IC.redo}<div class="grow"><b>فاتك ${wi.miss > 1 ? wi.miss + ' تمارين' : 'تمرين'} هالأسبوع؟ عادي!</b><br>الخطة تأجلت تلقائيًا وما راح يضيع عليك شي، تكمّلين من حيث وقفتي.${r ? ` وإذا تبين توصلين لهدف الأسبوع (${wi.target}) عوّضي ${r === today ? 'اليوم' : 'يوم ' + WDL[pd(r).getDay()]}.` : ''}
      <div class="acts">${r ? `<button class="btn sm" data-act="makeup" data-d="${r}">${IC.redo} عوّضي ${r === today ? 'اليوم' : WDL[pd(r).getDay()]}</button>` : ''}<button class="btn sm line" data-act="dismiss" data-k="mk${wi.ws}">لا، عادي</button></div></div></div>`;
  }
  if (inFoundation()) banners += `<div class="banner pink">${IC.spark}<div><b>مرحلة التأسيس (${S.sessions.length}/${S.settings.fCount})</b><br>أول ${S.settings.fCount} تمارين بمجموعة أقل وأوزان خفيفة. ركّزي على الحركة الصحيحة.</div></div>`;
  const needBk = S.sessions.length >= 3 && (!S.ui.lastBackup || Date.now() - new Date(S.ui.lastBackup) > 14 * 864e5);
  if (needBk && !S.ui.dismiss['bk' + wi.ws]) banners += `<div class="banner pink">${IC.share}<div class="grow"><b>احفظي نسخة احتياطية</b><br>${S.ui.lastBackup ? 'آخر نسخة ' + backupAge() + '.' : 'ما عندك نسخة للحين.'} عشان لو غيّرتي جوالك ما تضيع بياناتك.
    <div class="acts"><button class="btn sm" data-act="backup">${IC.share} حفظ نسخة</button><button class="btn sm line" data-act="dismiss" data-k="bk${wi.ws}">بعدين</button></div></div></div>`;
  if (rr.length) banners += `<div class="banner ok" data-act="tab" data-v="rewards">${IC.gift}<div><b>عندك مكافأة جاهزة! ${rr[0].e}</b><br>نجومك تكفي لـ«${esc(rr[0].n)}». استلميها من جوائزي.</div></div>`;

  let hero;
  const np = nextPlanned(today);
  if (tp.t === 'plan') {
    const d = tp.day;
    hero = `<div class="hero"><div class="daynum">${d.num}</div><div class="k">تمرين اليوم · ${WDL[now.getDay()]}</div><h2>${d.full}</h2><div class="meta">${d.sub}</div>
      <div class="chips"><span class="chip">${IC.timer.replace('<svg', '<svg width="14" height="14"')} حوالي ${estMinutes(d)} دقيقة</span><span class="chip">${exLabel(d)}</span>${cardioMin(d) ? `<span class="chip">${IC.flame.replace('<svg', '<svg width="14" height="14"')} كارديو ${cardioMin(d)} د</span>` : ''}</div>
      <div class="row"><button class="btn white grow" data-act="start" data-d="${d.id}">${IC.play} ابدئي التمرين</button><button class="btn glass" data-act="openDay" data-d="${d.id}">التفاصيل</button></div></div>`;
  } else {
    const done = tp.t === 'done', nd = np ? np.day : nextDay();
    hero = `<div class="hero ${done ? '' : 'calm'}"><div class="k">${done ? 'عاشت يدك' : WDL[now.getDay()]}</div><h2>${done ? 'خلصتي تمرين اليوم 💪' : 'اليوم راحة 🌙'}</h2>
      <div class="meta">${np ? `الجاي: <b>${nd.full}</b> · ${pd(np.date).getDate() === now.getDate() + 1 ? 'بكرة' : WDL[pd(np.date).getDay()]}` : ''}</div>
      <div class="row" style="margin-top:14px"><button class="btn glass grow" data-act="openDay" data-d="${nd.id}">تفاصيل ${nd.full}</button>${done ? '' : `<button class="btn white" data-act="start" data-d="${nd.id}">${IC.play} أتمرن اليوم</button>`}</div>
      ${done ? '' : `<div class="small" style="margin-top:10px;opacity:.9">الراحة جزء من البرنامج، العضل يبني وقت الراحة.</div>`}</div>`;
  }
  return `
  <div class="top">${logo(66)}<div class="grow"><h1>هلا ${esc(S.profile.name)}</h1><div class="sub">${fmtFull.format(now)}</div></div>
    <button class="starchip" data-act="tab" data-v="rewards">⭐ <span class="num">${bal}</span></button>
    <button class="iconbtn" data-act="go" data-v="settings" aria-label="الإعدادات">${IC.gear}</button></div>
  ${banners}
  ${S.active ? `<div class="card row" style="box-shadow:0 0 0 2px var(--pink2),var(--sh)"><div class="grow"><b>عندك تمرين ما خلص</b><div class="small muted">${DAY[S.active.day].full} · بدأ قبل ${mmss((Date.now() - S.active.start) / 1000)}</div></div><button class="btn sm" data-act="resume">كمّلي</button></div>` : ''}
  ${hero}
  <div class="card">
    <div class="row between"><h3>هالأسبوع</h3><span class="small"><b class="num">${wi.done}</b> من <b class="num">${wi.target}</b> تمارين</span></div>
    <div class="progress" style="margin-top:8px"><i style="width:${Math.min(100, wi.done / wi.target * 100)}%"></i></div>
    ${weekStrip(wi)}
    <div class="row between" style="margin-top:12px"><span class="tiny muted">اضغطي على أي يوم تعدّلينه</span><button class="link" data-act="tab" data-v="cal">التقويم الشهري ←</button></div>
  </div>
  ${nr ? `<div class="card" data-act="tab" data-v="rewards"><div class="row"><div style="font-size:30px">${nr.e}</div><div class="grow"><div class="small muted">أقرب مكافأة</div><b>${esc(nr.n)}</b></div><div class="small num" style="color:var(--pinkD);font-weight:700">${bal}/${nr.c} ⭐</div></div><div class="progress" style="margin-top:10px"><i style="width:${Math.min(100, bal / nr.c * 100)}%"></i></div></div>` : ''}
  <div class="stats">
    <div class="stat"><b class="num">${S.sessions.length}</b><span>تمرين كامل</span></div>
    <div class="stat"><b class="num">${weeksStats().cur}</b><span>أسابيع كاملة ورا بعض</span></div>
    <div class="stat" data-act="tab" data-v="rewards"><b class="num">${Object.keys(S.badges).length}</b><span>وسام</span></div>
  </div>
  <div class="sec-title">نصيحة اليوم</div>
  <div class="card row" style="align-items:flex-start"><div style="color:var(--pink)">${IC.spark}</div><div class="small" style="color:var(--ink2)">${tip}</div></div>`;
};

/* ----- التقويم ----- */
function monthGrid(y, m) {
  const first = new Date(y, m, 1, 12), last = new Date(y, m + 1, 0, 12), f = ymd(first), l = ymd(last), today = todayS();
  const plan = buildPlan(f, l);
  let cells = WD.map(n => `<div class="wh">${n}</div>`).join('');
  for (let i = 0; i < first.getDay(); i++) cells += '<div></div>';
  for (let d = f; d <= l; d = addDays(d, 1)) {
    const p = plan[d], ov = S.schedule.ov[d];
    const lbl = p.t === 'done' ? DAY[p.ss[0].day].n : p.t === 'plan' ? p.day.n : p.t === 'miss' ? 'فات' : 'راحة';
    cells += `<button class="cd ${p.t} ${d < today ? 'past' : ''} ${d === today ? 'today' : ''}" data-act="calDay" data-d="${d}">${ov ? '<i class="ov"></i>' : ''}<b class="num">${pd(d).getDate()}</b><span>${lbl}${p.t === 'done' ? ' ✓' : ''}</span></button>`;
  }
  let done = 0, planned = 0, miss = 0;
  for (const k in plan) { if (k < f || k > l) continue; const p = plan[k]; if (p.t === 'done') done += p.ss.length; else if (p.t === 'plan') planned++; else if (p.t === 'miss') miss++; }
  return { html: `<div class="cal">${cells}</div>`, done, planned, miss };
}
VIEWS.cal = () => {
  const now = new Date(), base = new Date(now.getFullYear(), now.getMonth() + st.calOff, 1, 12);
  const months = [base];
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  if (st.calOff === 0 && daysLeft < 7) months.push(new Date(now.getFullYear(), now.getMonth() + 1, 1, 12));
  const recent = [...S.sessions].reverse().slice(0, 3);
  return `<div class="top"><div class="grow"><h1>التقويم</h1><div class="sub">أيام تمرينك: ${curDays().map(i => WDL[i]).join('، ')}</div></div>
    <button class="iconbtn" data-act="editDays" aria-label="أيام التمرين">${IC.gear}</button></div>
  ${months.map((m, mi) => { const g = monthGrid(m.getFullYear(), m.getMonth()); return `<div class="card">
    <div class="mhead">${mi === 0 ? `<button class="iconbtn" style="width:36px;height:36px" data-act="calNav" data-d="-1" aria-label="الشهر السابق">${IC.prev}</button>` : '<span></span>'}
      <h3>${fmtMY.format(m)}${mi === 1 ? ' <span class="chip g" style="height:22px">الشهر الجاي</span>' : ''}</h3>
      ${mi === 0 ? `<button class="iconbtn" style="width:36px;height:36px" data-act="calNav" data-d="1" aria-label="الشهر الجاي">${IC.next}</button>` : '<span></span>'}</div>
    ${g.html}
    <div class="row" style="gap:6px;margin-top:12px;flex-wrap:wrap"><span class="chip">${g.done} تمرين خلص</span>${g.planned ? `<span class="chip g">${g.planned} باقي</span>` : ''}${g.miss ? `<span class="chip warn">${g.miss} فات</span>` : ''}</div>
  </div>`; }).join('')}
  ${st.calOff !== 0 ? `<button class="btn line block sm" style="margin-bottom:14px" data-act="calNav" data-d="0">رجوع لهالشهر</button>` : ''}
  <div class="card small" style="color:var(--ink2)">
    <div class="legend2" style="margin-top:0"><span><i style="background:var(--pink)"></i>خلص</span><span><i style="background:var(--softer);box-shadow:inset 0 0 0 1.5px var(--pink2)"></i>مخطط</span><span><i style="background:var(--warnSoft)"></i>فات</span><span><i style="background:var(--chip)"></i>راحة</span><span><i style="background:var(--warn);border-radius:50%;width:8px;height:8px"></i>معدّل</span></div>
    <div style="margin-top:10px">• إذا فاتك يوم، الخطة تتأجل تلقائيًا: التمرين اللي فاتك يصير هو الجاي، وما يضيع شي.</div>
    <div>• تبين تعوّضين؟ اضغطي على يوم راحة وخليه يوم تمرين.</div>
    <div>• عندك ظرف؟ اضغطي على يوم تمرين وخليه راحة.</div>
  </div>
  <div class="sec-title">آخر التمارين ${S.sessions.length ? `<button class="link" data-act="go" data-v="history">كل السجل ←</button>` : ''}</div>
  ${recent.length ? `<div class="card" style="padding:4px 14px">${recent.map(sessionLi).join('')}</div>` : `<div class="card empty">${IC.cal}<div>أول تمرين تخلّصينه بيطلع هنا.</div></div>`}`;
};
function calSheet(d) {
  const today = todayS(), p = buildPlan(d, d)[d] || { t: 'rest' }, ov = S.schedule.ov[d], base = (daysAt(d) || curDays()).includes(pd(d).getDay());
  const title = `${fmtFull.format(pd(d))}${d === today ? ' · اليوم' : ''}`;
  let body = '';
  if (p.t === 'done') {
    body = `<div class="banner ok" style="margin-top:12px">${IC.check}<div>خلّصتي ${p.ss.map(s => DAY[s.day].full).join(' + ')} 💪</div></div>
      <div class="card" style="padding:4px 14px">${p.ss.map(sessionLi).join('')}</div>`;
  } else if (p.t === 'miss') {
    const wi = weekInfo(), r = wi.restLeft[0];
    body = `<div class="banner warn" style="margin-top:12px">${IC.redo}<div>فات هذا اليوم، وعادي! الخطة تأجلت تلقائيًا والتمرين ما ضاع، بيكون هو تمرينك الجاي.</div></div>
      ${r ? `<button class="btn block" data-act="makeup" data-d="${r}">${IC.redo} عوّضيه ${r === today ? 'اليوم' : 'يوم ' + WDL[pd(r).getDay()]}</button><div class="tiny muted" style="text-align:center;margin-top:6px">يصير يوم ${WDL[pd(r).getDay()]} يوم تمرين بدل الراحة</div>` : ''}`;
  } else if (d < today) {
    body = `<div class="card small muted" style="margin-top:12px">كان يوم راحة.</div>`;
  } else if (p.t === 'plan') {
    body = `<div class="card" style="margin-top:12px"><div class="small muted">مخطط</div><h3 style="margin:2px 0">${p.day.full}</h3><div class="small muted">${p.day.sub} · حوالي ${estMinutes(p.day)} دقيقة</div></div>
      ${d === today ? `<button class="btn block" data-act="start" data-d="${p.day.id}">${IC.play} ابدئي التمرين</button>` : `<button class="btn ghost block" data-act="openDay" data-d="${p.day.id}">شوفي التمارين</button>`}
      <button class="btn line block" style="margin-top:10px" data-act="setOv" data-d="${d}" data-v="rest">🌙 خليه يوم راحة</button>
      <div class="tiny muted" style="text-align:center;margin-top:6px">التمرين بينتقل لأقرب يوم تمرين بعده</div>`;
  } else {
    body = `<div class="card small muted" style="margin-top:12px">يوم راحة. الراحة جزء من البرنامج 🌙</div>
      <button class="btn block" data-act="setOv" data-d="${d}" data-v="train">${IC.redo} خليه يوم تمرين (تعويض)</button>`;
  }
  if (ov && d >= today) body += `<div class="hint">${IC.info}<div>هذا اليوم معدّل عن جدولك الأساسي (${base ? 'كان تمرين' : 'كان راحة'}).<br><button class="link" data-act="setOv" data-d="${d}" data-v="">رجّعيه مثل الجدول</button></div></div>`;
  return `<h2>${title}</h2>${body}`;
}

VIEWS.program = () => `
  <div class="top"><div class="grow"><h1>البرنامج</h1><div class="sub">${weekTarget()} أيام بالأسبوع · تنشيف وشد ولياقة</div></div>
    <button class="iconbtn" data-act="print" aria-label="طباعة">${IC.print}</button></div>
  <div class="card">
    <div class="row between"><h3>جدولك الأسبوعي</h3><button class="link" data-act="editDays">تعديل</button></div>
    <div class="wdays" style="margin-top:10px">${WD.map((n, i) => `<div style="height:52px;border-radius:13px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;${curDays().includes(i) ? 'background:var(--pink);color:#fff' : 'background:var(--chip);color:var(--muted)'}">${n}<small style="font-size:10px;font-weight:600">${curDays().includes(i) ? 'تمرين' : 'راحة'}</small></div>`).join('')}</div>
    <div class="small muted" style="margin-top:10px">التمارين تمشي بالترتيب على أيام التمرين: دفع ← سحب ← أرجل ← شامل، وبعدها تبدأ الدورة من جديد.</div>
  </div>
  <div class="card small" style="color:var(--ink2)">
    <b style="color:var(--ink)">كيف تمشين على البرنامج؟</b>
    <div style="margin-top:6px">• كل يوم: إحماء ← التمارين ← كارديو ← إطالة.</div>
    <div>• اختاري وزن تقدرين تكملين فيه العدات بشكل صحيح، وآخر عدتين تكون صعبة.</div>
    <div>• إذا كمّلتي أعلى عدد عدات في كل المجموعات، زيدي الوزن شوي المرة الجاية.</div>
  </div>
  ${DAYS.map(d => `<button class="day" data-act="openDay" data-d="${d.id}"><div class="badge">${d.num}</div><div class="grow"><h3>${d.full}</h3><div class="small muted">${d.sub}</div><div class="small" style="color:var(--ink2);margin-top:2px">${exLabel(d)} · حوالي ${estMinutes(d)} دقيقة</div></div><div class="chev">${IC.chev}</div></button>`).join('')}
  <div class="row" style="margin-top:6px"><button class="btn line sm grow" data-act="print">${IC.print} طباعة / PDF</button><button class="btn line sm grow" data-act="go" data-v="coach">${IC.coach} وضع المدرب</button></div>`;

VIEWS.day = () => {
  const d = DAY[st.day], mus = dayMuscles(d);
  return `
  <button class="back" data-act="tab" data-v="program">${IC.back} البرنامج</button>
  <div class="top" style="padding-top:2px"><div class="grow"><h1>${d.full}</h1><div class="sub">${d.sub} · حوالي ${estMinutes(d)} دقيقة</div></div></div>
  <div class="card">${bodyMap(mus.p, mus.s)}<div class="legend"><span><i style="background:var(--pink)"></i>عضلة أساسية</span><span><i style="background:var(--bm-s)"></i>تساعد</span></div></div>
  <button class="btn block" data-act="start" data-d="${d.id}" style="margin-bottom:6px">${IC.play} ابدئي هذا اليوم</button>
  ${inFoundation() && !isVideoDay(d) ? `<div class="small muted" style="text-align:center;margin:6px 0 10px">مرحلة التأسيس: المجموعات هنا أقل بوحدة</div>` : ''}
  ${d.modes ? modeSeg() : ''}
  ${routineRow(d.warm, 'إحماء', '٥–٨ دقايق قبل التمرين')}
  ${blocksOf(d).map(b => `
    <div class="block-title"><h3>${b.title}</h3>${b.type === 'circuit' ? `<span class="chip">${setsFor(b.slots[0].id)} جولات</span>` : ''}</div>
    ${b.note ? `<div class="small muted" style="margin:-4px 4px 10px">${b.note}</div>` : ''}
    <div class="card" style="padding:4px 14px">${b.slots.map(s => slotRow(s)).join('')}</div>`).join('')}
  ${d.abs ? routineRow(d.abs, 'بطن (اختياري)', 'فيديو قصير تتبعينه بعد التمارين') : ''}
  ${isVideoDay(d) ? '' : routineRow(d.stretch, 'إطالة', '٥ دقايق بعد التمرين')}`;
};
const modeSeg = (note = true) => `<div class="card" style="padding:12px 14px"><div class="small" style="font-weight:700;margin-bottom:8px">طريقة اليوم الشامل</div>
  <div class="seg"><button class="${fullMode() === 'video' ? 'on' : ''}" data-act="fullMode" data-v="video">🎬 فيديوهات متابعة</button><button class="${fullMode() === 'circuit' ? 'on' : ''}" data-act="fullMode" data-v="circuit">🔁 دائرة تمارين</button></div>
  ${note ? `<div class="tiny muted" style="margin-top:6px">${fullMode() === 'video' ? 'فيديوهات قصيرة من يوتيوب تتابعينها: لياقة ثم كور ثم إطالة.' : 'تمارين مفصّلة تسجلين فيها العدات والأوزان.'}</div>` : ''}</div>`;
function slotRow(s) {
  const ex = currentOf(s.id), e = EX[ex], alts = s.opts.length - 1;
  return `<button class="slot" data-act="exInfo" data-sid="${s.id}"><div class="ic">${bodyMap(e.p.length ? e.p : e.s, e.p.length ? e.s : [], 'auto')}</div>
    <div class="grow"><div class="nm"><bdi>${e.n}</bdi></div><div class="ms">${s.m}${alts ? ` · ${alts} ${alts > 2 ? 'بدائل' : 'بديل'}` : ''}${s.optional ? ' · اختياري' : ''}</div></div>
    <div class="rx num">${targetShort(s.id, ex)}</div></button>`;
}
function routineRow(key, title, sub) {
  const r = ROUTINES[key];
  return `<div class="todo"><div class="grow"><div class="nm">${title}</div><div class="small muted">${sub}</div></div><a class="vid" href="${yt(r.v)}" target="_blank" rel="noopener">${IC.play} فيديو</a></div>`;
}

/* ----- شيت التمرين ----- */
function exSheet(sid) {
  const ex = currentOf(sid), e = EX[ex], slot = SLOT[sid].s;
  const inSess = st.view === 'session' && S.active && S.active.entries[sid];
  const sel = inSess ? S.active.entries[sid].ex : ex, se = EX[sel];
  const hist = [];
  for (let i = S.sessions.length - 1; i >= 0 && hist.length < 4; i--) { const s_ = S.sessions[i]; for (const k in s_.entries) { const en = s_.entries[k]; if (en.ex === sel && en.sets.some(x => x.ok)) hist.push({ d: s_.start, sets: en.sets.filter(x => x.ok) }); } }
  const best = bestWeight(sel);
  return `
    <h2><bdi>${se.n}</bdi></h2>${se.ch ? `<div class="small muted">فيديو من <bdi>${se.ch}</bdi> · ${se.mins} دقيقة</div>` : ''}
    <div style="margin:10px 0 4px">${bodyMap(se.p, se.s)}</div>
    <div class="row wrap" style="gap:6px;justify-content:center;margin-bottom:10px">${se.p.map(m => `<span class="chip p">${MUSCLES[m]}</span>`).join('')}${se.s.map(m => `<span class="chip">${MUSCLES[m]}</span>`).join('')}</div>
    <div class="hint">${IC.info}<div>${se.tip}</div></div>
    <a class="btn block" style="margin-top:12px" href="${yt(se.v)}" target="_blank" rel="noopener">${IC.play} شوفي طريقة الأداء</a>
    <div class="small muted" style="text-align:center;margin-top:8px">${slot.m} · ${targetLong(sid, sel)}</div>
    ${slot.opts.length > 1 ? `<div class="sec-title">بدّلي الحركة (${slot.m})</div>
      ${slot.opts.map(o => { const oe = EX[o]; return `<div class="opt ${o === sel ? 'sel' : ''}"><button class="row grow" style="text-align:right" data-act="pick" data-sid="${sid}" data-ex="${o}"><div class="radio"></div><div class="ic">${bodyMap(oe.p.length ? oe.p : oe.s, oe.p.length ? oe.s : [], 'auto')}</div><div class="grow"><div style="font-weight:700"><bdi>${oe.n}</bdi></div><div class="tiny muted">${o === primaryOf(sid) ? '★ اختيار المدرب' : oe.p.map(m => MUSCLES[m]).join(' · ') || 'كارديو'}</div></div></button><a class="vid" href="${yt(oe.v)}" target="_blank" rel="noopener" aria-label="فيديو">${IC.play}</a></div>`; }).join('')}` : ''}
    ${hist.length ? `<div class="sec-title">أداؤك ${best ? `· أعلى وزن ${nf(best)} كجم` : ''}</div><div class="card" style="padding:4px 14px">${hist.map(h => `<div class="li"><div class="grow small"><b>${fmtDay.format(new Date(h.d))}</b></div><div class="small num" style="color:var(--ink2)">${h.sets.map(x => x.m !== undefined ? `${x.m}د` : x.w ? `${nf(+x.w)}×${x.r || '-'}` : `${x.r || '✓'}`).join(' · ')}</div></div>`).join('')}</div>` : ''}`;
}

/* ----- جلسة التمرين ----- */
function startSession(dayId) {
  const d = DAY[dayId], entries = {};
  blocksOf(d).forEach(b => b.slots.forEach(s => { entries[s.id] = makeEntry(s.id, currentOf(s.id)); }));
  S.active = { id: 's' + uid(), day: dayId, start: Date.now(), items: {}, entries };
  save(true); wakeLock(); closeSheet(true); go('session');
}
function makeEntry(sid, ex) {
  const { b } = SLOT[sid], e = EX[ex], n = setsFor(sid), last = lastFor(ex);
  if (b.type === 'cardio') return { ex, sets: [{ m: String(sc(sid).mins), ok: false }] };
  if (b.type === 'video') return { ex, sets: [{ m: String(e.mins), ok: false }] };
  const sets = [];
  for (let i = 0; i < n; i++) sets.push({ w: e.t === 'w' && last ? String(last.sets[Math.min(i, last.sets.length - 1)].w || '') : '', r: '', ok: false });
  return { ex, sets };
}
VIEWS.session = () => {
  const A = S.active; if (!A) { st.view = 'home'; return VIEWS.home(); }
  const d = DAY[A.day];
  let tot = 0, done = 0;
  for (const sid in A.entries) { if (SLOT[sid].s.optional) continue; A.entries[sid].sets.forEach(x => { tot++; if (x.ok) done++; }); }
  return `
  <div class="sess-head">
    <div class="row"><button class="iconbtn" data-act="minimize" aria-label="رجوع">${IC.back}</button>
      <div class="grow"><h1 style="font-size:18px;margin:0">${d.full}</h1><div class="elapsed"><span id="elapsed" class="num">${mmss((Date.now() - A.start) / 1000)}</span> · <span class="num">${done}/${tot}</span> مجموعة</div></div>
      <button class="btn sm" data-act="finish">إنهاء</button></div>
    <div class="progress" style="margin-top:10px"><i style="width:${tot ? done / tot * 100 : 0}%"></i></div>
  </div>
  ${inFoundation() && !isVideoDay(d) ? `<div class="banner pink" style="margin-top:4px">${IC.spark}<div>مرحلة التأسيس: أوزان خفيفة وركّزي على الحركة، والمجموعات أقل بوحدة.</div></div>` : ''}
  ${todoRow('warm', d.warm, 'الإحماء')}
  ${blocksOf(d).filter(b => b.slots.some(s => A.entries[s.id])).map(b => `
    <div class="block-title"><h3>${b.title}</h3>${b.type === 'circuit' ? `<span class="chip">${setsFor(b.slots[0].id)} جولات · راحة ${bc(b).restRound} ث</span>` : ''}</div>
    ${b.note ? `<div class="small muted" style="margin:-4px 4px 10px">${b.note}</div>` : ''}
    ${b.slots.filter(s => A.entries[s.id]).map(s => exCard(s.id)).join('')}`).join('')}
  ${d.abs ? todoRow('abs', d.abs, 'بطن (اختياري)') : ''}
  ${A.entries.fvA ? '' : todoRow('stretch', d.stretch, 'الإطالة')}
  <button class="btn danger block sm" style="margin-top:18px" data-act="cancelSess">${IC.trash} إلغاء التمرين بدون حفظ</button>`;
};
function todoRow(k, key, title) {
  const ok = S.active.items[k], r = ROUTINES[key];
  return `<div class="todo ${ok ? 'ok' : ''}"><button class="check" data-act="item" data-k="${k}">${IC.check}</button><div class="grow"><div class="nm">${title}</div><div class="small muted">${r.n}</div></div><a class="vid" href="${yt(r.v)}" target="_blank" rel="noopener">${IC.play} فيديو</a></div>`;
}
function exCard(sid) {
  const { s, b } = SLOT[sid], c = sc(sid), en = S.active.entries[sid], e = EX[en.ex];
  const last = lastFor(en.ex), r = rangeOf(sid), allOk = en.sets.every(x => x.ok);
  const ph = r ? (r.hi === r.lo ? r.lo : r.lo + '-' + r.hi) : '';
  let rows = '';
  en.sets.forEach((x, i) => {
    const cls = `setrow ${x.ok ? 'ok' : ''}`;
    const chk = `<button class="check" data-act="set" data-sid="${sid}" data-i="${i}" aria-label="تم">${IC.check}</button>`;
    const sn = `<div class="sn num">${b.type === 'cardio' ? IC.flame.replace('<svg', '<svg width="15" height="15"') : i + 1}</div>`;
    if (b.type === 'video') rows += `<div class="${cls} one"><div class="sn">${IC.play.replace('<svg', '<svg width="13" height="13"')}</div><a class="timebtn" href="${yt(e.v)}" target="_blank" rel="noopener">${IC.play} شغّلي الفيديو · ${e.mins} د</a>${chk}</div>`;
    else if (b.type === 'cardio') rows += `<div class="${cls} one">${sn}<div class="field"><input inputmode="numeric" data-sid="${sid}" data-i="${i}" data-k="m" value="${esc(x.m)}"><span>دقيقة</span></div>${chk}</div>`;
    else if (c.secs) rows += `<div class="${cls} one">${sn}<button class="timebtn" data-act="hold" data-sid="${sid}" data-i="${i}">${IC.timer} ابدئي ${c.secs} ثانية</button>${chk}</div>`;
    else if (e.t === 'w') rows += `<div class="${cls}">${sn}<div class="field"><input inputmode="decimal" data-sid="${sid}" data-i="${i}" data-k="w" value="${esc(x.w)}" placeholder="0"><span>كجم</span></div><div class="field"><input inputmode="numeric" data-sid="${sid}" data-i="${i}" data-k="r" value="${esc(x.r)}" placeholder="${ph}"><span>عدة</span></div>${chk}</div>`;
    else rows += `<div class="${cls} one">${sn}<div class="field"><input inputmode="numeric" data-sid="${sid}" data-i="${i}" data-k="r" value="${esc(x.r)}" placeholder="${ph}"><span>عدة</span></div>${chk}</div>`;
  });
  const lastTxt = last && b.type !== 'cardio' && b.type !== 'video' ? `<div class="last">آخر مرة: <b class="num">${last.sets.map(x => e.t === 'w' && x.w ? `${nf(+x.w)}×${x.r || '-'}` : (x.r || '✓')).join(' · ')}</b></div>` : '';
  return `<div class="ex ${allOk ? 'done' : ''}" id="ex-${sid}">
    <div class="tit"><div class="map">${bodyMap(e.p.length ? e.p : e.s, e.p.length ? e.s : [], 'auto')}</div>
      <div class="grow"><h4><bdi>${e.n}</bdi> ${s.optional ? '<span class="chip g" style="height:22px">اختياري</span>' : ''}</h4><div class="target">${s.m} · ${targetLong(sid, en.ex)}</div></div></div>
    <div class="acts">${b.type === 'video' ? '' : `<a class="vid" href="${yt(e.v)}" target="_blank" rel="noopener">${IC.play} الفيديو</a>`}
      ${s.opts.length > 1 ? `<button class="vid" data-act="exInfo" data-sid="${sid}">${IC.swap} ${b.type === 'video' ? 'فيديو ثاني' : 'بدّلي'}</button>` : `<button class="vid" data-act="exInfo" data-sid="${sid}">${IC.info} طريقة</button>`}
      ${readyUp(sid, en.ex) ? `<span class="chip ok">${IC.up.replace('<svg', '<svg width="13" height="13"')} جاهزة تزيدين الوزن</span>` : ''}</div>
    ${lastTxt}<div class="sets">${rows}</div></div>`;
}

/* ----- مؤقت الراحة ----- */
let T = null, tickI = null, actx = null;
function beep(n = 2) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    for (let k = 0; k < n; k++) {
      const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + k * 0.22;
      o.frequency.value = 880; o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.3, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
      o.start(t0); o.stop(t0 + 0.18);
    }
  } catch (e) { }
  try { navigator.vibrate && navigator.vibrate([120, 80, 120]); } catch (e) { }
}
function unlockAudio() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume && actx.resume(); } catch (e) { } }
function startTimer(sec, label, kind = 'rest', ref = null) {
  if (!sec) return;
  T = { end: Date.now() + sec * 1000, total: sec, label, kind, ref, finished: false };
  renderBars();
}
function tick() {
  const ee = document.getElementById('elapsed'); if (ee && S.active) ee.textContent = mmss((Date.now() - S.active.start) / 1000);
  if (!T) return;
  const el = document.querySelector('.restbar');
  const left = (T.end - Date.now()) / 1000;
  if (left <= 0 && !T.finished) {
    T.finished = true; beep(T.kind === 'hold' ? 3 : 2);
    if (T.kind === 'hold' && T.ref && S.active) {
      const ref = T.ref, en = S.active.entries[ref.sid];
      if (en && en.sets[ref.i]) { en.sets[ref.i].ok = true; save(); }
      T = null;
      if (!maybeRoundRest(ref.sid, ref.i)) T = { finished: true, kind: 'hold', doneAt: Date.now(), end: Date.now(), total: 1 };
      render(); return;
    }
    T.doneAt = Date.now(); renderBars();
    return;
  }
  if (T.finished) { if (Date.now() - T.doneAt > 2600) { T = null; renderBars(); } return; }
  if (el) {
    el.querySelector('.t').textContent = mmss(left);
    const c = el.querySelector('circle.fg'); if (c) c.style.strokeDashoffset = String(125.6 * (1 - left / T.total));
  }
}
function renderBars() {
  document.querySelectorAll('.restbar,.finishbar').forEach(x => x.remove());
  clearInterval(tickI);
  if (st.view !== 'session' || !S.active) return;
  if (T) {
    const left = Math.max(0, (T.end - Date.now()) / 1000);
    const div = document.createElement('div'); div.className = 'restbar' + (T.finished ? ' done' : '');
    div.innerHTML = T.finished
      ? `<div class="in"><div style="font-size:28px">💪</div><div class="grow"><div class="t" style="font-size:19px">${T.kind === 'hold' ? 'عاشت يدك!' : 'يلا المجموعة الجاية'}</div></div><button data-act="skip">${IC.x.replace('<svg', '<svg width="18" height="18"')}</button></div>`
      : `<div class="in"><div class="ring"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="4"/><circle class="fg" cx="24" cy="24" r="20" fill="none" style="stroke:var(--pink2);stroke-dashoffset:${125.6 * (1 - left / T.total)}" stroke-width="4" stroke-linecap="round" stroke-dasharray="125.6"/></svg></div>
        <div class="grow"><div class="l">${T.label}</div><div class="t num">${mmss(left)}</div></div>
        ${T.kind === 'rest' ? `<button data-act="tadd" data-s="-15" class="num">-15</button><button data-act="tadd" data-s="15" class="num">+15</button>` : ''}<button data-act="skip">تخطّي</button></div>`;
    document.body.appendChild(div);
  } else {
    const div = document.createElement('div'); div.className = 'finishbar';
    div.innerHTML = `<div class="in"><button class="btn block" data-act="finish">${IC.check} إنهاء التمرين</button></div>`;
    document.body.appendChild(div);
  }
  tickI = setInterval(tick, 250);
}
function maybeRoundRest(sid, i) {
  const { b } = SLOT[sid];
  if (b.type !== 'circuit') return false;
  const roundDone = b.slots.every(s => { const en = S.active.entries[s.id]; return en && en.sets[i] && en.sets[i].ok; });
  if (roundDone && i < S.active.entries[sid].sets.length - 1) { startTimer(bc(b).restRound, `راحة بعد الجولة ${i + 1}`); return true; }
  return false;
}
let wl = null;
async function wakeLock() { try { if ('wakeLock' in navigator) wl = await navigator.wakeLock.request('screen'); } catch (e) { } }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && S.active) wakeLock(); });

/* ----- إنهاء الجلسة ----- */
async function finishSession() {
  const A = S.active; let left = 0, any = 0;
  for (const sid in A.entries) { if (SLOT[sid].s.optional) continue; A.entries[sid].sets.forEach(x => { x.ok ? any++ : left++; }); }
  if (!any) { if (await ask('ما سجلتي ولا مجموعة', 'تبين تلغين التمرين بدون حفظ؟', 'إلغاء التمرين', true, 'رجوع')) { S.active = null; T = null; save(true); go('home'); } return; }
  if (left && !(await ask('باقي مجموعات ما خلصت', `باقي ${left} مجموعة. تنهين التمرين وتحفظين اللي سويتيه؟`, 'إنهاء وحفظ', false, 'أكمّل'))) return;
  const prs = [];
  for (const sid in A.entries) {
    const en = A.entries[sid]; if (EX[en.ex].t !== 'w') continue;
    const top = Math.max(0, ...en.sets.filter(x => x.ok).map(x => +x.w || 0)); const prev = bestWeight(en.ex);
    if (top > 0 && prev > 0 && top > prev) prs.push({ ex: en.ex, w: top, prev });
  }
  const day = ymd(A.start), makeup = S.schedule.ov[day] === 'train';
  const se = { id: A.id, day: A.day, start: new Date(A.start).toISOString(), end: new Date().toISOString(), entries: A.entries, items: A.items, feel: null, prs: prs.length, all: left === 0, makeup };
  const wkBefore = S.sessions.filter(s => wkKey(s.start) === wkKey(se.start)).length;
  S.sessions.push(se); S.active = null; T = null;
  /* النجوم */
  award(10, 'تمرين مكتمل', se.id);
  if (se.all) award(5, 'كل المجموعات', se.id);
  if (A.items.warm && A.items.stretch) award(2, 'إحماء وإطالة', se.id);
  if (prs.length) award(5 * Math.min(prs.length, 3), `أرقام جديدة (${prs.length})`, se.id);
  if (makeup) award(5, 'تعويض تمرين', se.id);
  const wk = wkKey(se.start);
  if (wkBefore + 1 >= weekTarget() && !S.weekBonus[wk]) { S.weekBonus[wk] = se.id; award(25, 'أسبوع كامل 🎉', se.id); }
  const nb = checkBadges(se.id);
  save(true);
  const stt = sessionStats(se), got = S.pts.filter(p => p.s === se.id), sum = got.reduce((a, p) => a + p.n, 0), rr = readyRewards(), nr = nearestReward();
  go('home');
  if (nb.length || S.weekBonus[wk] === se.id) confetti();
  openSheet(`<div style="text-align:center"><div style="display:flex;justify-content:center">${logo(110)}</div><h2 style="margin-top:12px">عاشت يدك ${esc(S.profile.name)}!</h2><div class="muted small">${DAY[se.day].full} · ${fmtFull.format(new Date(se.start))}</div></div>
    <div class="stats" style="margin:16px 0"><div class="stat"><b class="num">${stt.min}</b><span>دقيقة</span></div><div class="stat"><b class="num">${stt.sets}</b><span>مجموعة</span></div><div class="stat"><b class="num">${stt.vol ? nf(stt.vol, 0) : '—'}</b><span>كجم مجموع</span></div></div>
    <div class="card"><div class="row between"><b>نجوم هالتمرين</b><b style="color:var(--pinkD)" class="num">+${sum} ⭐</b></div><div style="margin-top:8px">${got.map(p => `<div class="pts"><span>${esc(p.w)}</span><b class="num">+${p.n}</b></div>`).join('')}</div>
      ${rr.length ? `<div class="hint">${IC.gift}<div><b>نجومك تكفي لـ«${esc(rr[0].n)}» ${rr[0].e}</b> — استلميها من جوائزي!</div></div>` : nr ? `<div class="small muted" style="margin-top:8px">باقي ${nr.c - balance()} نجمة على «${esc(nr.n)}» ${nr.e}</div>` : ''}</div>
    ${nb.length ? `<div class="card"><b>أوسمة جديدة 🎉</b><div class="badges" style="margin-top:10px">${nb.map(b => `<div class="bdg"><div class="c">${b.e}</div>${b.n}</div>`).join('')}</div></div>` : ''}
    ${prs.length ? `<div class="card"><div class="row" style="color:var(--pink)">${IC.trophy}<b>أرقام جديدة</b></div>${prs.map(p => `<div class="li"><div class="grow small"><bdi>${EX[p.ex].n}</bdi></div><div class="small num"><b>${nf(p.w)}</b> كجم <span class="muted">(كان ${nf(p.prev)})</span></div></div>`).join('')}</div>` : ''}
    <div class="sec-title" style="margin-top:6px">كيف كان التمرين؟</div>
    <div class="feel"><button data-act="feel" data-id="${se.id}" data-f="easy"><b>😌</b>سهل</button><button data-act="feel" data-id="${se.id}" data-f="ok"><b>🙂</b>مناسب</button><button data-act="feel" data-id="${se.id}" data-f="hard"><b>🥵</b>صعب</button></div>
    <button class="btn block line" style="margin-top:14px" data-act="closeSheet">تمام</button>`);
}

/* ----- السجل ----- */
const FEEL = { easy: '😌', ok: '🙂', hard: '🥵' };
function sessionLi(s) {
  const d = new Date(s.start), stt = sessionStats(s);
  return `<button class="li" style="width:100%;text-align:right" data-act="sessInfo" data-id="${s.id}"><div class="d"><b class="num">${d.getDate()}</b><span>${WD[d.getDay()]}</span></div><div class="grow"><div style="font-weight:700">${DAY[s.day].full} ${s.feel ? FEEL[s.feel] : ''}</div><div class="small muted"><span class="num">${stt.min}</span> دقيقة · <span class="num">${stt.sets}</span> مجموعة${stt.vol ? ` · <span class="num">${nf(stt.vol, 0)}</span> كجم` : ''}</div></div><div class="chev">${IC.chev}</div></button>`;
}
VIEWS.history = () => {
  const ss = [...S.sessions].reverse();
  const now = new Date(), month = S.sessions.filter(s => { const d = new Date(s.start); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length;
  const mins = S.sessions.reduce((a, s) => a + sessionStats(s).min, 0);
  let lastMonth = '', list = '';
  for (const s of ss) {
    const d = new Date(s.start), mk = `${d.getFullYear()}-${d.getMonth()}`;
    if (mk !== lastMonth) { if (lastMonth) list += '</div>'; list += `<div class="sec-title">${fmtMY.format(d)}</div><div class="card" style="padding:4px 14px">`; lastMonth = mk; }
    list += sessionLi(s);
  }
  if (lastMonth) list += '</div>';
  return `<button class="back" data-act="tab" data-v="cal">${IC.back} التقويم</button>
  <div class="top" style="padding-top:2px"><div class="grow"><h1>السجل</h1><div class="sub">كل تمارينك اللي خلصتيها</div></div></div>
  <div class="stats"><div class="stat"><b class="num">${S.sessions.length}</b><span>كل التمارين</span></div><div class="stat"><b class="num">${month}</b><span>هالشهر</span></div><div class="stat"><b class="num">${mins >= 60 ? nf(mins / 60) : mins}</b><span>${mins >= 60 ? 'ساعة تمرين' : 'دقيقة تمرين'}</span></div></div>
  ${list || `<div class="card empty">${IC.cal}<div>لسا ما سجلتي تمارين.</div></div>`}`;
};
function sessSheet(id) {
  const s = S.sessions.find(x => x.id === id); if (!s) return '';
  const d = DAY[s.day], stt = sessionStats(s), got = S.pts.filter(p => p.s === s.id).reduce((a, p) => a + p.n, 0);
  let rows = '';
  allBlocks(d).forEach(b => b.slots.forEach(sl => {
    const en = s.entries[sl.id]; if (!en) return; const done = en.sets.filter(x => x.ok); if (!done.length) return;
    rows += `<div class="li"><div class="grow"><div style="font-weight:700;font-size:14.5px"><bdi>${EX[en.ex].n}</bdi></div><div class="tiny muted">${sl.m}</div></div><div class="small num" style="color:var(--ink2);text-align:left">${done.map(x => x.m !== undefined ? `${x.m} د` : x.w ? `${nf(+x.w)}×${x.r || '-'}` : (x.r || '✓')).join(' · ')}</div></div>`;
  }));
  return `<h2>${d.full} ${s.feel ? FEEL[s.feel] : ''}</h2><div class="small muted">${fmtFull.format(new Date(s.start))}${s.makeup ? ' · تعويض' : ''}${got ? ` · +${got} ⭐` : ''}</div>
    <div class="stats" style="margin:14px 0"><div class="stat"><b class="num">${stt.min}</b><span>دقيقة</span></div><div class="stat"><b class="num">${stt.sets}</b><span>مجموعة</span></div><div class="stat"><b class="num">${stt.vol ? nf(stt.vol, 0) : '—'}</b><span>كجم مجموع</span></div></div>
    <div class="card" style="padding:4px 14px">${rows || '<div class="empty">ما فيه مجموعات مسجلة</div>'}</div>
    <button class="btn danger block sm" data-act="delSess" data-id="${s.id}">${IC.trash} حذف هذا التمرين من السجل</button>`;
}

/* ----- جوائزي ----- */
VIEWS.rewards = () => {
  const bal = balance(), wkPts = S.pts.filter(p => p.n > 0 && wkKey(p.d) === wkKey(new Date())).reduce((a, p) => a + p.n, 0);
  const rws = [...S.rewards].sort((a, b) => a.c - b.c);
  return `<div class="top"><div class="grow"><h1>جوائزي</h1><div class="sub">كافئي نفسك على الاستمرار</div></div></div>
  <div class="starhero"><div class="sp">⭐</div><div class="small" style="opacity:.9">نجومك</div><b class="big num">${bal}</b><div class="small" style="opacity:.95">هالأسبوع: <b class="num">+${wkPts}</b> نجمة</div></div>
  <details class="acc"><summary>كيف أجمع نجوم؟ <span class="chev">${IC.chev}</span></summary><div class="body small" style="color:var(--ink2)">
    <div class="pts"><span>كل تمرين تخلّصينه</span><b>+10</b></div><div class="pts"><span>خلّصتي كل المجموعات</span><b>+5</b></div>
    <div class="pts"><span>سويتي الإحماء والإطالة</span><b>+2</b></div><div class="pts"><span>كل رقم جديد (لين ٣ بالتمرين)</span><b>+5</b></div>
    <div class="pts"><span>عوّضتي تمرين فاتك</span><b>+5</b></div><div class="pts"><span>كمّلتي هدف الأسبوع</span><b>+25</b></div>
    <div class="pts"><span>قياس جسم (مرة بالأسبوع)</span><b>+3</b></div><div class="pts"><span>كل وسام جديد</span><b>+10</b></div></div></details>
  <div class="sec-title">مكافآتي <button class="link" data-act="rwEdit">+ أضيفي مكافأة</button></div>
  ${rws.map(r => { const ready = bal >= r.c; return `<div class="rw ${ready ? 'ready' : ''}"><div class="em">${r.e}</div><div class="grow"><div class="nm">${esc(r.n)}</div>
    <div class="small muted"><span class="num">${r.c}</span> ⭐${r.r.length ? ` · استلمتيها ${r.r.length === 1 ? 'مرة' : r.r.length + ' مرات'}` : ''}</div>
    <div class="progress" style="margin-top:6px;height:6px"><i style="width:${Math.min(100, bal / r.c * 100)}%"></i></div>
    <div class="row" style="margin-top:8px">${ready ? `<button class="btn sm" data-act="redeem" data-id="${r.id}">🎉 استلميها</button>` : `<span class="tiny muted">باقي ${r.c - bal} نجمة</span>`}<span class="grow"></span><button class="link" style="color:var(--muted)" data-act="rwEdit" data-id="${r.id}">تعديل</button></div></div></div>`; }).join('') || `<div class="card empty">${IC.gift}<div>أضيفي مكافأة تحمّسك: قهوة، ملابس رياضية، يوم سبا...</div></div>`}
  <div class="sec-title">الأوسمة · ${Object.keys(S.badges).length}/${BADGES.length}</div>
  <div class="card"><div class="badges">${BADGES.map(b => `<button class="bdg ${S.badges[b.id] ? '' : 'off'}" data-act="badgeInfo" data-id="${b.id}"><div class="c">${b.e}</div>${b.n}</button>`).join('')}</div></div>
  ${S.pts.length ? `<div class="sec-title">آخر النجوم</div><div class="card" style="padding:6px 14px">${[...S.pts].reverse().slice(0, 8).map(p => `<div class="pts"><span>${esc(p.w)} <span class="tiny muted">· ${fmtDay.format(new Date(p.d))}</span></span><b class="num" style="color:${p.n < 0 ? 'var(--muted)' : 'var(--pinkD)'}">${p.n > 0 ? '+' : ''}${p.n}</b></div>`).join('')}</div>` : ''}`;
};
const EMOS = ['☕', '🛍️', '💆‍♀️', '🍰', '🎬', '👟', '💅', '🎁', '🌸', '📚', '🧁', '✈️', '🍣', '🎧'];
let rwDraft = null;
function rwForm(r) {
  rwDraft = r ? { ...r } : { id: '', e: '🎁', n: '', c: 100, r: [] };
  const x = rwDraft;
  return `<h2>${x.id ? 'تعديل المكافأة' : 'مكافأة جديدة'}</h2><div class="small muted" style="margin-bottom:14px">اختاري شي يفرحك فعلًا، وحددي كم نجمة تستاهل.</div>
    <label class="f"><span>الشكل</span><div class="emos">${EMOS.map(e => `<button class="${x.e === e ? 'on' : ''}" data-act="rwE" data-e="${e}">${e}</button>`).join('')}</div></label>
    <label class="f"><span>المكافأة</span><input class="inp" id="rwN" value="${esc(x.n)}" placeholder="مثال: قهوة من مكاني المفضل"></label>
    <label class="f"><span>كم نجمة؟</span><div class="costs">${[50, 100, 200, 400, 800].map(c => `<button class="${x.c === c ? 'on' : ''}" data-act="rwC" data-c="${c}">${c}</button>`).join('')}</div>
      <input class="inp" id="rwCn" inputmode="numeric" value="${x.c}" style="margin-top:8px;text-align:center;direction:ltr"></label>
    <div class="tiny muted" style="margin:-4px 0 14px">تقريبًا: أسبوع كامل = ٨٠–٩٠ نجمة.</div>
    <button class="btn block" data-act="rwSave">حفظ</button>
    ${x.id ? `<button class="btn danger block sm" style="margin-top:10px" data-act="rwDel" data-id="${x.id}">${IC.trash} حذف المكافأة</button>` : ''}`;
}

/* ----- جسمي ----- */
const METRICS = { weight: ['الوزن', 'كجم'], fat: ['نسبة الدهون', '٪'], muscle: ['نسبة العضل', '٪'], waist: ['الخصر', 'سم'], hips: ['الورك', 'سم'] };
VIEWS.body = () => {
  const B = S.body;
  const firstOf = k => B.find(x => x[k] !== '' && x[k] != null);
  const lastOf = k => [...B].reverse().find(x => x[k] !== '' && x[k] != null);
  const card = k => {
    const l = lastOf(k), f = firstOf(k); if (!l) return '';
    const dlt = f && l !== f ? +l[k] - +f[k] : null;
    const good = k === 'muscle' ? dlt > 0 : dlt < 0;
    return `<div class="stat" style="text-align:right;padding:12px 14px"><span>${METRICS[k][0]}</span><b class="num" style="font-size:21px">${nf(+l[k])} <small style="font-size:12px;color:var(--muted)">${METRICS[k][1]}</small></b>${dlt !== null && dlt !== 0 ? `<span class="delta ${good ? 'down' : 'up'} num">${dlt > 0 ? '+' : ''}${nf(dlt)} من البداية</span>` : `<span class="tiny muted">&nbsp;</span>`}</div>`;
  };
  const mk = st.metric, pts = B.filter(x => x[mk] !== '' && x[mk] != null).map(x => ({ d: x.date, y: +x[mk] }));
  return `<div class="top"><div class="grow"><h1>جسمي</h1><div class="sub">الوزن والنسب والمقاسات</div></div><button class="iconbtn" style="background:var(--pink);color:#fff" data-act="addBody" aria-label="قياس جديد">${IC.plus}</button></div>
  ${!B.length ? `<div class="card empty">${IC.body}<div>سجّلي أول قياس عشان تشوفين تقدمك مع الوقت.</div><button class="btn sm" style="margin-top:12px" data-act="addBody">${IC.plus} أول قياس</button></div>` : `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">${['weight', 'fat', 'muscle', 'waist', 'hips'].map(card).join('')}</div>
  <div class="card chart">
    <div class="seg" style="margin-bottom:12px">${Object.keys(METRICS).map(k => `<button class="${mk === k ? 'on' : ''}" data-act="metric" data-k="${k}">${METRICS[k][0].replace('نسبة ', '')}</button>`).join('')}</div>
    ${pts.length >= 2 ? lineChart(pts, METRICS[mk][1]) : `<div class="empty small">تحتاجين قياسين على الأقل عشان يطلع الرسم.</div>`}
  </div>
  <div class="sec-title">كل القياسات</div>
  <div class="card" style="padding:4px 14px">${[...B].reverse().map(x => `<button class="li" style="width:100%;text-align:right" data-act="editBody" data-id="${x.id}"><div class="d"><b class="num">${pd(x.date).getDate()}</b><span>${fmtMon.format(pd(x.date))}</span></div><div class="grow small" style="color:var(--ink2)">${[['weight', 'كجم'], ['fat', '٪ دهون'], ['muscle', '٪ عضل'], ['waist', 'سم خصر'], ['hips', 'سم ورك']].filter(([k]) => x[k] !== '' && x[k] != null).map(([k, u]) => `<span class="num">${nf(+x[k])}</span> ${u}`).join(' · ')}${x.note ? `<div class="tiny muted">${esc(x.note)}</div>` : ''}</div><div class="chev">${IC.chev}</div></button>`).join('')}</div>`}
  <div class="card row small" style="align-items:flex-start;color:var(--ink2)"><div style="color:var(--pink)">${IC.info}</div><div>قيسي مرة بالأسبوع، بنفس اليوم، الصبح قبل الأكل. الوزن يتذبذب يوميًا، فالمهم الاتجاه على كم أسبوع.</div></div>`;
};
function lineChart(pts, unit) {
  const W = 320, H = 170, pl = 34, pr = 12, pt = 16, pb = 26;
  const xs = pts.map(p => pd(p.d).getTime()), ys = pts.map(p => p.y);
  let x0 = Math.min(...xs), x1 = Math.max(...xs); if (x0 === x1) { x0 -= 864e5; x1 += 864e5; }
  let y0 = Math.min(...ys), y1 = Math.max(...ys); const pad = Math.max((y1 - y0) * 0.2, 0.5); y0 -= pad; y1 += pad;
  const X = t => pl + (t - x0) / (x1 - x0) * (W - pl - pr), Y = v => pt + (1 - (v - y0) / (y1 - y0)) * (H - pt - pb);
  const P = pts.map((p, i) => [X(xs[i]), Y(p.y)]);
  const line = P.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${P[P.length - 1][0].toFixed(1)} ${H - pb} L${P[0][0].toFixed(1)} ${H - pb}Z`;
  const grid = [0, 0.5, 1].map(f => { const v = y0 + (y1 - y0) * f; return `<line class="g" x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="lb" x="${pl - 6}" y="${Y(v) + 4}" font-size="10" text-anchor="end">${nf(v)}</text>`; }).join('');
  const lp = P[P.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" direction="ltr"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--pink)" stop-opacity=".25"/><stop offset="1" style="stop-color:var(--pink)" stop-opacity="0"/></linearGradient></defs>
    ${grid}<path d="${area}" fill="url(#ga)"/><path d="${line}" fill="none" style="stroke:var(--pink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${P.map(p => `<circle class="pt" cx="${p[0]}" cy="${p[1]}" r="3.2" style="stroke:var(--pink)" stroke-width="2"/>`).join('')}
    <circle cx="${lp[0]}" cy="${lp[1]}" r="5" style="fill:var(--pink)"/>
    <text class="lb" x="${pl}" y="${H - 6}" font-size="10">${fmtDay.format(pd(pts[0].d))}</text>
    <text class="lb" x="${W - pr}" y="${H - 6}" font-size="10" text-anchor="end">${fmtDay.format(pd(pts[pts.length - 1].d))}</text>
    <text x="${Math.min(lp[0], W - 40)}" y="${Math.max(lp[1] - 10, 12)}" font-size="11.5" font-weight="700" style="fill:var(--pinkD)" text-anchor="middle">${nf(pts[pts.length - 1].y)} ${unit}</text></svg>`;
}
function bodyForm(x) {
  x = x || { date: todayS(), weight: '', fat: '', muscle: '', waist: '', hips: '', note: '' };
  const f = (k, l, u) => `<label class="f"><span>${l}</span><div class="field"><input class="bf" data-k="${k}" inputmode="decimal" value="${esc(x[k])}" style="text-align:center"><span>${u}</span></div></label>`;
  return `<h2>${x.id ? 'تعديل القياس' : 'قياس جديد'}</h2><div class="small muted" style="margin-bottom:14px">عبّي اللي عندك بس، الباقي اتركيه فاضي.</div>
    <label class="f"><span>التاريخ</span><input class="inp bf" data-k="date" type="date" value="${esc(x.date)}"></label>
    <div class="grid2">${f('weight', 'الوزن', 'كجم')}${f('fat', 'نسبة الدهون', '٪')}${f('muscle', 'نسبة العضل', '٪')}${f('waist', 'الخصر', 'سم')}</div>
    <div class="grid2">${f('hips', 'الورك', 'سم')}<div></div></div>
    <label class="f"><span>ملاحظة</span><input class="inp bf" data-k="note" value="${esc(x.note)}" placeholder="اختياري"></label>
    <button class="btn block" data-act="saveBody" data-id="${x.id || ''}">حفظ</button>
    ${x.id ? `<button class="btn danger block sm" style="margin-top:10px" data-act="delBody" data-id="${x.id}">${IC.trash} حذف القياس</button>` : ''}`;
}

/* ----- الإعدادات ----- */
VIEWS.settings = () => `
  <button class="back" data-act="tab" data-v="home">${IC.back} رجوع</button>
  <div class="top" style="padding-top:2px"><div class="grow"><h1>الإعدادات</h1></div></div>
  <div class="card"><label class="f" style="margin:0"><span>اسمك</span><input class="inp" id="setName" value="${esc(S.profile.name)}"></label></div>
  <div class="card">
    <div style="font-weight:700;margin-bottom:8px">لون التطبيق</div>
    <div class="swatches"><button class="${S.settings.accent !== 'red' ? 'on' : ''}" data-act="accent" data-v="pink"><i style="background:linear-gradient(135deg,#F2709F,#E0457B)"></i>وردي</button><button class="${S.settings.accent === 'red' ? 'on' : ''}" data-act="accent" data-v="red"><i style="background:linear-gradient(135deg,#FF4A3D,#E10600)"></i>أحمر</button></div>
    <div style="font-weight:700;margin:16px 0 8px">الوضع</div>
    <div class="seg">${[['auto', 'تلقائي'], ['light', 'فاتح ☀️'], ['dark', 'داكن 🌙']].map(([k, l]) => `<button class="${S.settings.theme === k ? 'on' : ''}" data-act="theme" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="tiny muted" style="margin-top:6px">«تلقائي» يمشي مع وضع جوالك.</div>
  </div>
  <div class="card">
    <div class="row between"><b>أيام التمرين</b><button class="link" data-act="editDays">تعديل</button></div>
    <div class="small muted" style="margin-top:4px">${curDays().map(i => WDL[i]).join('، ')}</div>
  </div>
  <div class="card"><div class="row between"><div><b>صوت نهاية الراحة</b></div>
    <div class="seg" style="width:130px"><button class="${S.settings.sound ? 'on' : ''}" data-act="setSnd" data-v="1">تشغيل</button><button class="${!S.settings.sound ? 'on' : ''}" data-act="setSnd" data-v="0">إيقاف</button></div></div></div>
  <div class="sec-title">تثبيت التطبيق على الآيفون</div>
  <div class="card small" style="color:var(--ink2)">
    <div>١. افتحي رابط التطبيق في <b>سفاري</b>.</div>
    <div>٢. اضغطي زر المشاركة <span class="kbd">${IC.iosShare}</span> تحت.</div>
    <div>٣. اختاري «إضافة إلى الشاشة الرئيسية».</div>
    <div style="margin-top:6px">بيطلع لك شعار R1 مثل أي تطبيق، وبياناتك تنحفظ على جوالك.</div>
  </div>
  <div class="sec-title">نسخة احتياطية / نقل لجوال جديد</div>
  <div class="card">
    <div class="row" style="align-items:flex-start;margin-bottom:12px"><div style="color:var(--pink)">${IC.info}</div><div class="small" style="color:var(--ink2)">بياناتك محفوظة على هذا الجوال بس. احفظي نسخة كل فترة، وقبل ما تغيّرين جوالك.<br><b>${S.ui.lastBackup ? 'آخر نسخة: ' + fmtDay.format(new Date(S.ui.lastBackup)) + ' (' + backupAge() + ')' : 'ما حفظتي أي نسخة للحين'}</b></div></div>
    <button class="btn block" data-act="backup">${IC.share} حفظ نسخة احتياطية</button>
    <div class="tiny muted" style="text-align:center;margin:6px 0 12px">بيطلع لك خيار الحفظ: «حفظ في الملفات» أو أرسليها لنفسك في الواتساب</div>
    <div class="row"><label class="btn sm line grow" style="cursor:pointer">${IC.upload} استرجاع من ملف<input type="file" accept=".json,application/json,text/plain" id="restoreFile" hidden></label><button class="btn sm line grow" data-act="restorePaste">لصق كود</button></div>
    <button class="link tiny" style="display:block;margin:12px auto 0;color:var(--muted)" data-act="backupCopy">${'نسخ النسخة ككود بدل الملف'}</button>
  </div>
  <details class="acc"><summary>كيف أنقل بياناتي لجوال جديد؟<span class="chev">${IC.chev}</span></summary><div class="body small" style="color:var(--ink2)">
    <div style="margin-top:8px"><b>في الجوال القديم:</b></div>
    <div>١. اضغطي «حفظ نسخة احتياطية».</div>
    <div>٢. اختاري «حفظ في الملفات» (iCloud Drive)، أو أرسلي الملف لنفسك في الواتساب.</div>
    <div style="margin-top:8px"><b>في الجوال الجديد:</b></div>
    <div>٣. افتحي رابط التطبيق في سفاري وثبّتيه على الشاشة الرئيسية.</div>
    <div>٤. في أول شاشة اضغطي «استرجاع من ملف» واختاري الملف.</div>
    <div style="margin-top:8px">كذا ترجع كل تمارينك وقياساتك ونجومك ومكافآتك وجدولك.</div>
  </div></details>
  <div class="sec-title">الخطة من المدرب</div>
  <div class="card">
    <div class="small muted" style="margin-bottom:10px">إذا أرسل لك المدرب كود خطة، الصقيه هنا.</div>
    <div class="row"><input class="inp grow" id="planIn" placeholder="R2..." style="direction:ltr;text-align:left"><button class="btn sm" data-act="planApply">تطبيق</button></div>
    <button class="btn line block sm" style="margin-top:10px" data-act="go" data-v="coach">${IC.coach} وضع المدرب</button>
  </div>
  <div class="sec-title">منطقة الخطر</div>
  <div class="card"><button class="btn danger block sm" data-act="resetAll">${IC.trash} مسح كل البيانات</button></div>
  <div style="display:flex;justify-content:center;margin-top:16px;opacity:.85">${logo(70)}</div>
  <div class="tiny muted" style="text-align:center;margin-top:6px">نسخة ${VERSION}</div>`;
let daysDraft = null;
function daysSheet() {
  daysDraft = daysDraft || curDays().slice();
  return `<h2>أيام التمرين</h2><div class="small muted" style="margin-bottom:14px">اختاري الأيام اللي تتمرنين فيها كل أسبوع. التمارين تمشي بالترتيب على هالأيام.</div>
    ${dayChips(daysDraft, 'dDay')}
    <div class="hint">${IC.info}<div>اخترتي <b>${daysDraft.length}</b> أيام. البرنامج مصمم لـ٤ أيام، والأفضل يكون بينها يوم راحة. التغيير يطبق من اليوم وما يغيّر سجلك القديم.</div></div>
    <button class="btn block" style="margin-top:14px" data-act="daysSave">حفظ</button>`;
}

/* ----- وضع المدرب ----- */
const stepper = (t, id, k, v, d, min, max, unit = '') => `<div class="step"><button data-act="step" data-t="${t}" data-id="${id}" data-k="${k}" data-d="${-d}" data-min="${min}" data-max="${max}">−</button><b class="num">${v}${unit}</b><button data-act="step" data-t="${t}" data-id="${id}" data-k="${k}" data-d="${d}" data-min="${min}" data-max="${max}">+</button></div>`;
const isMod = sid => { const o = S.cfg[sid]; return o && Object.keys(o).length > 0; };
function coachSlot(s, b) {
  const c = sc(s.id), r = parseReps(c.reps);
  let ed = '';
  if (b.type === 'sets') ed = `<div class="cfgi"><span>المجموعات</span>${stepper('slot', s.id, 'sets', c.sets, 1, 1, 8)}</div><div class="cfgi"><span>الراحة (ث)</span>${stepper('slot', s.id, 'rest', c.rest, 15, 0, 300)}</div>`;
  if (b.type !== 'cardio' && r) ed += `<div class="cfgi"><span>العدات (من – إلى)</span><div class="reps"><input inputmode="numeric" data-rep="${s.id}" data-p="lo" value="${r.lo}"><b>–</b><input inputmode="numeric" data-rep="${s.id}" data-p="hi" value="${r.hi}"></div></div>`;
  if (c.secs) ed += `<div class="cfgi"><span>الثواني</span>${stepper('slot', s.id, 'secs', c.secs, 5, 5, 180)}</div>`;
  if (b.type === 'cardio') ed += `<div class="cfgi"><span>الدقائق</span>${stepper('slot', s.id, 'mins', c.mins, 5, 5, 60)}</div>`;
  return `<div class="coach-slot"><div class="row between"><div class="small" style="font-weight:700;color:var(--ink2)">${b.type === 'cardio' ? 'كارديو' + (s.optional ? ' (اختياري)' : '') : s.m}${isMod(s.id) ? '<span class="mod" title="معدّل"></span>' : ''}</div>${isMod(s.id) ? `<button class="link tiny" style="color:var(--muted)" data-act="cfgReset" data-sid="${s.id}">رجوع للافتراضي</button>` : ''}</div>
    ${s.opts.map(o => `<div class="row"><button class="coach-opt grow ${primaryOf(s.id) === o ? 'sel' : ''}" data-act="coachPick" data-sid="${s.id}" data-ex="${o}"><div class="radio"></div><span><bdi>${EX[o].n}</bdi></span></button><a class="vid" style="height:30px;padding:0 9px" href="${yt(EX[o].v)}" target="_blank" rel="noopener">${IC.play}</a></div>`).join('')}
    <div class="cfg">${ed}</div></div>`;
}
VIEWS.coach = () => `
  <button class="back" data-act="tab" data-v="program">${IC.back} البرنامج</button>
  <div class="top" style="padding-top:2px"><div class="grow"><h1>وضع المدرب</h1><div class="sub">التمارين والمجموعات والعدات والراحة</div></div></div>
  <div class="banner pink">${IC.coach}<div>اللي تختاره هنا يصير هو الأساسي ويطلع عليه <b>★ اختيار المدرب</b>. هي تقدر تبدّل الحركة وقت التمرين، والأرقام اللي تحددها هنا تمشي عليها.</div></div>
  <div class="card">
    <b>قاعدة المجموعات</b><div class="small muted" style="margin-top:2px">تنطبق على كل الأيام، إلا التمارين اللي تعدّلها يدويًا تحت.</div>
    <div class="row between" style="margin-top:12px"><span>أول تمرين في اليوم</span>${stepper('coach', 'c', 'firstSets', S.coach.firstSets, 1, 1, 8)}</div>
    <div class="row between" style="margin-top:10px"><span>باقي التمارين</span>${stepper('coach', 'c', 'otherSets', S.coach.otherSets, 1, 1, 8)}</div>
    ${SLOTS.some(sid => S.cfg[sid] && S.cfg[sid].sets != null) ? `<button class="btn line block sm" style="margin-top:12px" data-act="setsToRule">رجّع مجموعات كل التمارين للقاعدة</button>` : ''}
  </div>
  <div class="card">
    <div class="row between"><div><b>مرحلة التأسيس</b><div class="small muted">تنقص مجموعة من كل تمرين (٤←٣، ٣←٢)</div></div>
      <div class="seg" style="width:120px"><button class="${S.settings.foundation ? 'on' : ''}" data-act="setF" data-v="1">تشغيل</button><button class="${!S.settings.foundation ? 'on' : ''}" data-act="setF" data-v="0">إيقاف</button></div></div>
    ${S.settings.foundation ? `<div class="row between" style="margin-top:12px"><span>مدتها (عدد التمارين)</span>${stepper('set', 's', 'fCount', S.settings.fCount, 1, 1, 24)}</div><div class="tiny muted" style="margin-top:6px">${inFoundation() ? `شغّالة الحين: خلصت ${S.sessions.length} من ${S.settings.fCount}` : 'خلصت المرحلة'}</div>` : ''}
  </div>
  ${DAYS.map((d, di) => `<details class="acc" ${di === 0 ? 'open' : ''}><summary>${d.num}. ${d.full}<span class="chev">${IC.chev}</span></summary><div class="body">
    ${d.modes ? `<div style="margin:10px 0 4px">${modeSeg().replace('class="card" style="padding:12px 14px"', 'style="padding:0"')}</div>` : ''}
    ${blocksOf(d).map(b => (b.type === 'circuit' ? `<div class="coach-block"><b class="small">${b.title}</b><div class="cfg" style="margin-top:6px"><div class="cfgi"><span>الجولات</span>${stepper('block', b.key, 'rounds', bc(b).rounds, 1, 1, 6)}</div><div class="cfgi"><span>راحة بعد الجولة (ث)</span>${stepper('block', b.key, 'restRound', bc(b).restRound, 15, 0, 300)}</div></div></div>` : '') + b.slots.map(s => coachSlot(s, b)).join('')).join('')}
  </div></details>`).join('')}
  <div class="sec-title">أرسل الخطة لها</div>
  <div class="card">
    <div class="small muted" style="margin-bottom:10px">الرابط فيه كل اختياراتك (التمارين والمجموعات والعدات والراحة ومرحلة التأسيس). أول ما تفتحه يطلع لها تأكيد. أو أرسل الكود تلصقه في الإعدادات.</div>
    <div class="code">${planCode()}</div>
    <div class="row" style="margin-top:10px"><button class="btn sm grow" data-act="copyLink">${IC.link} نسخ الرابط</button><button class="btn sm ghost grow" data-act="copyCode">${IC.copy} نسخ الكود</button></div>
    <button class="btn line block sm" style="margin-top:10px" data-act="coachReset">رجوع لكل الإعدادات الافتراضية</button>
  </div>`;

/* ----- كود الخطة (أحرف وأرقام فقط) ----- */
const b36 = (n, w) => Math.max(0, Math.min(36 ** w - 1, Math.round(+n || 0))).toString(36).padStart(w, '0');
const PLAN_LEN = 2 + SLOTS.length * 9 + CIRCUITS.length * 2 + 6;
function planCode() {
  let c = 'R2';
  for (const sid of SLOTS) {
    const { s } = SLOT[sid], k = sc(sid), r = parseReps(k.reps);
    c += b36(s.opts.indexOf(primaryOf(sid)), 1) + b36(k.sets, 1) + b36((k.rest || 0) / 15, 1) + b36(r ? r.lo : 0, 2) + b36(r ? r.hi : 0, 2) + b36(k.secs || k.mins || 0, 2);
  }
  for (const b of CIRCUITS) { const x = bc(b); c += b36(x.rounds, 1) + b36(x.restRound / 15, 1); }
  c += b36(S.settings.foundation ? 1 : 0, 1) + b36(S.settings.fCount, 2) + b36(S.coach.firstSets, 1) + b36(S.coach.otherSets, 1) + b36(fullMode() === 'video' ? 1 : 0, 1);
  return c;
}
const planLink = () => `${location.href.split('#')[0].split('?')[0]}#plan-${planCode()}`;
function applyPlanCode(code) {
  code = String(code || '').trim();
  if (!/^R2[0-9a-z]+$/.test(code) || code.length !== PLAN_LEN) return false;
  let p = 2; const rd = w => { const v = parseInt(code.slice(p, p + w), 36); p += w; return v; };
  const plan = {}, cfg = {}, bcfg = {};
  for (const sid of SLOTS) {
    const { s, b } = SLOT[sid];
    const oi = rd(1), sets = rd(1), rest = rd(1) * 15, lo = rd(2), hi = rd(2), val = rd(2);
    if (oi >= s.opts.length) return false;
    plan[sid] = s.opts[oi];
    const o = {};
    if (b.type === 'sets') { o.sets = sets; o.rest = rest; }
    if (lo) o.reps = lo === hi ? String(lo) : `${lo}–${hi}`;
    if (s.secs) o.secs = val; if (b.type === 'cardio') o.mins = val;
    cfg[sid] = o;
  }
  for (const b of CIRCUITS) bcfg[b.key] = { rounds: rd(1), restRound: rd(1) * 15 };
  const f = rd(1), fc = rd(2), fs = rd(1), os = rd(1), fm = rd(1);
  SLOTS.forEach(sid => { if (S.plan[sid] !== plan[sid]) delete S.swaps[sid]; });
  S.plan = plan; S.cfg = cfg; S.bcfg = bcfg;
  S.settings.foundation = !!f; S.settings.fCount = fc || 4; S.coach.firstSets = fs || 4; S.coach.otherSets = os || 3; S.settings.fullMode = fm ? 'video' : 'circuit';
  save(true); return true;
}

/* ----- الطباعة ----- */
function doPrint() {
  let p = document.getElementById('print'); if (!p) { p = document.createElement('div'); p.id = 'print'; document.body.appendChild(p); }
  let k = 0;
  p.innerHTML = `<div class="phead">${logo(120)}<div><h1>برنامج التمارين ${S.profile.name ? '— ' + esc(S.profile.name) : ''}</h1><div>أيام التمرين: ${curDays().map(i => WDL[i]).join('، ')}</div></div></div>
    <div class="notes"><b>ملاحظات:</b> اختاري وزن تكون آخر عدتين فيه صعبة. إذا كمّلتي أعلى عدد عدات في كل المجموعات زيدي الوزن شوي. إذا فاتك يوم، كمّلي من حيث وقفتي. فيديوهات الأداء داخل التطبيق.</div>
    ${DAYS.map(d => (k = 0, `<div class="pday"><h2>اليوم ${d.num}: ${d.full} <span style="font-size:10pt;color:#777;font-weight:400">(${d.sub})</span></h2>
      <table><thead><tr><th style="width:18pt">#</th><th style="width:34%">التمرين</th><th style="width:22%">المجموعات × العدات</th><th style="width:40pt">الراحة</th><th>بدائل</th></tr></thead><tbody>
      <tr><td>—</td><td colspan="4">إحماء ٥–٨ دقايق</td></tr>
      ${blocksOf(d).map(b => (b.type === 'circuit' ? `<tr><td colspan="5" style="background:#FFF5F9"><b>${b.title}</b> — ${bc(b).rounds} جولات، راحة ${bc(b).restRound} ث بعد كل جولة</td></tr>` : '') +
        b.slots.map(s => { const ex = currentOf(s.id), c = sc(s.id), side = isSide(s.id, ex) ? ' لكل جهة' : ''; return `<tr><td>${++k}</td><td><b><bdi>${EX[ex].n}</bdi></b><div class="alt">${b.type === 'cardio' ? 'كارديو' : s.m}${s.optional ? ' · اختياري' : ''}</div></td><td>${b.type === 'video' ? 'فيديو ' + EX[ex].mins + ' دقيقة' : b.type === 'cardio' ? c.mins + ' دقيقة' : b.type === 'circuit' ? (c.secs ? c.secs + ' ثانية' : c.reps + ' عدة') + side : `${c.sets} × ${c.reps}${side}`}</td><td>${b.type === 'sets' ? c.rest + ' ث' : '—'}</td><td class="alt">${s.opts.filter(o => o !== ex).map(o => `<bdi>${EX[o].n}</bdi>`).join('، ')}</td></tr>`; }).join('')).join('')}
      ${isVideoDay(d) ? '' : '<tr><td>—</td><td colspan="4">إطالة ٥ دقايق</td></tr>'}</tbody></table></div>`)).join('')}
`;
  if (inFrame) toast('الطباعة تشتغل من رابط التطبيق الأساسي');
  try { window.print(); } catch (e) { toast('الطباعة مو متاحة هنا'); }
}

/* ----- النسخ الاحتياطي ----- */
const toB64 = s => btoa(unescape(encodeURIComponent(s)));
const fromB64 = s => decodeURIComponent(escape(atob(s.trim())));
function backupAge() { const d = Math.floor((Date.now() - new Date(S.ui.lastBackup)) / 864e5); return d <= 0 ? 'اليوم' : d === 1 ? 'أمس' : `قبل ${d} يوم`; }
const markBackup = () => { S.ui.lastBackup = new Date().toISOString(); save(true); if (st.view === 'settings') render(); };
const exportJSON = () => JSON.stringify({ app: 'R1', v: 2, at: new Date().toISOString(), data: { ...S, active: null } });
async function doBackup() {
  const name = `R1-backup-${todayS()}.json`, txt = exportJSON();
  if (inFrame) { if (await copyText(toB64(txt), 'انسخ كود النسخة ✓')) markBackup(); return; }
  try {
    const file = new File([txt], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'نسخة R1 الاحتياطية' }); markBackup(); toast('انحفظت النسخة ✓'); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); markBackup(); toast('تم تنزيل النسخة ✓'); }
  catch (e) { if (await copyText(toB64(txt))) markBackup(); }
}
async function restoreFrom(text) {
  let obj = null;
  try { obj = JSON.parse(text); } catch (e) { try { obj = JSON.parse(fromB64(text)); } catch (_) { } }
  if (!obj || obj.app !== 'R1' || !obj.data || !Array.isArray(obj.data.sessions)) { toast('الملف أو الكود مو صحيح'); return; }
  if (!(await ask('استرجاع النسخة؟', `فيها ${obj.data.sessions.length} تمرين و${(obj.data.body || []).length} قياس. بتستبدل بياناتك الحالية.`, 'استرجاع'))) return;
  S = merge({ ...obj.data, active: null }); S.ui.lastBackup = obj.at || S.ui.lastBackup; applyTheme();
  save(true); closeSheet(); go('home'); toast('رجعت بياناتك ✓');
}

/* ---------- الأحداث ---------- */
const H = {
  tab: el => go(el.dataset.v),
  go: el => { closeSheet(true); go(el.dataset.v); },
  wDay: el => { const i = +el.dataset.i; wDays = wDays.includes(i) ? wDays.filter(x => x !== i) : [...wDays, i]; render(); const n = document.getElementById('wName'); if (n) n.value = H._wn || ''; },
  welcomeGo: () => {
    const n = document.getElementById('wName').value.trim(); if (!n) { toast('اكتبي اسمك'); return; }
    if (!wDays.length) { toast('اختاري يوم واحد على الأقل'); return; }
    S.profile.name = n; S.schedule.hist = [{ from: todayS(), days: [...wDays].sort() }]; save(true); go('home'); checkPlanHash();
  },
  dismiss: el => { S.ui.dismiss[el.dataset.k] = 1; save(); render(); },
  openDay: el => { closeSheet(true); go('day', { day: el.dataset.d }); },
  start: async el => {
    unlockAudio();
    if (S.active) { if (!(await ask('عندك تمرين شغّال', 'تبين تكمّلين التمرين الحالي؟', 'أكمّل الحالي', false, 'ابدئي جديد'))) { S.active = null; } else { closeSheet(true); go('session'); return; } }
    startSession(el.dataset.d);
  },
  resume: () => { wakeLock(); go('session'); },
  minimize: () => go('home'),
  exInfo: el => openSheet(exSheet(el.dataset.sid)),
  pick: el => {
    const sid = el.dataset.sid, ex = el.dataset.ex;
    if (ex === primaryOf(sid)) delete S.swaps[sid]; else S.swaps[sid] = ex;
    if (st.view === 'session' && S.active && S.active.entries[sid] && S.active.entries[sid].ex !== ex) {
      const old = S.active.entries[sid], ne = makeEntry(sid, ex);
      ne.sets.forEach((x, i) => { if (old.sets[i] && old.sets[i].ok && EX[ex].t === EX[old.ex].t) { x.r = old.sets[i].r; } });
      S.active.entries[sid] = ne;
    }
    save(); closeSheet(); render(); toast('تم التبديل إلى: ' + EX[ex].n);
  },
  set: el => {
    unlockAudio();
    const sid = el.dataset.sid, i = +el.dataset.i, en = S.active.entries[sid], x = en.sets[i], { b } = SLOT[sid], c = sc(sid);
    x.ok = !x.ok;
    if (x.ok) {
      const r = rangeOf(sid);
      if (x.r === '' && r && x.m === undefined) x.r = String(r.hi);
      save();
      if (b.type === 'sets' && c.rest) { const isLast = en.sets.every(y => y.ok); startTimer(c.rest, isLast ? 'راحة، وبعدها التمرين الجاي' : `راحة · المجموعة ${i + 2}`); }
      else if (b.type === 'circuit') { if (!maybeRoundRest(sid, i)) T = null; }
    } else save();
    render();
  },
  hold: el => { unlockAudio(); const sid = el.dataset.sid, i = +el.dataset.i; startTimer(sc(sid).secs, EX[S.active.entries[sid].ex].n, 'hold', { sid, i }); },
  item: el => { const k = el.dataset.k; S.active.items[k] = !S.active.items[k]; save(); render(); },
  skip: () => { T = null; renderBars(); },
  tadd: el => { if (!T) return; T.end += (+el.dataset.s) * 1000; T.total = Math.max(T.total + (+el.dataset.s), 1); if (T.end < Date.now()) T.end = Date.now() + 1000; tick(); },
  finish: () => finishSession(),
  cancelSess: async () => { if (await ask('إلغاء التمرين؟', 'كل اللي سجلتيه في هذا التمرين بينحذف.', 'إلغاء التمرين', true, 'رجوع')) { S.active = null; T = null; save(true); go('home'); } },
  feel: el => { const s = S.sessions.find(x => x.id === el.dataset.id); if (s) { s.feel = el.dataset.f; save(); } el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  closeSheet: () => closeSheet(),
  sessInfo: el => openSheet(sessSheet(el.dataset.id)),
  delSess: async el => {
    if (!(await ask('حذف التمرين؟', 'بينحذف من السجل نهائيًا، ومعه نجومه.', 'حذف', true))) return;
    const id = el.dataset.id;
    S.sessions = S.sessions.filter(x => x.id !== id); S.pts = S.pts.filter(p => p.s !== id);
    for (const k in S.weekBonus) if (S.weekBonus[k] === id) delete S.weekBonus[k];
    save(true); closeSheet(); render(); toast('انحذف');
  },
  /* التقويم */
  calNav: el => { const d = +el.dataset.d; st.calOff = d === 0 ? 0 : st.calOff + d; render(); },
  calDay: el => openSheet(calSheet(el.dataset.d)),
  setOv: el => {
    const d = el.dataset.d, v = el.dataset.v;
    if (!v) delete S.schedule.ov[d];
    else { const base = (daysAt(d) || curDays()).includes(pd(d).getDay()); if ((v === 'train') === base) delete S.schedule.ov[d]; else S.schedule.ov[d] = v; }
    save(true); closeSheet(); render(); toast(v === 'rest' ? 'صار يوم راحة 🌙' : v === 'train' ? 'صار يوم تمرين 💪' : 'رجع مثل الجدول');
  },
  makeup: el => { const d = el.dataset.d; S.schedule.ov[d] = 'train'; save(true); closeSheet(); render(); toast(`تمام! ${d === todayS() ? 'اليوم' : WDL[pd(d).getDay()]} صار يوم تعويض 💪`); },
  editDays: () => { daysDraft = null; openSheet(daysSheet()); },
  dDay: el => { const i = +el.dataset.i; daysDraft = daysDraft.includes(i) ? daysDraft.filter(x => x !== i) : [...daysDraft, i]; sheetEl.innerHTML = `<div class="grab"></div><button class="sheet-x" data-act="closeSheet">${IC.x}</button>` + daysSheet(); },
  daysSave: () => { if (!daysDraft.length) { toast('اختاري يوم واحد على الأقل'); return; } setDays(daysDraft); save(true); closeSheet(); render(); toast('انحفظ جدولك ✓'); },
  /* الجوائز */
  rwEdit: el => openSheet(rwForm(S.rewards.find(r => r.id === el.dataset.id))),
  rwE: el => { rwDraft.e = el.dataset.e; el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  rwC: el => { rwDraft.c = +el.dataset.c; document.getElementById('rwCn').value = rwDraft.c; el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  rwSave: () => {
    const n = document.getElementById('rwN').value.trim(), c = parseInt(toEn(document.getElementById('rwCn').value), 10);
    if (!n) { toast('اكتبي المكافأة'); return; } if (!(c > 0)) { toast('حددي عدد النجوم'); return; }
    if (rwDraft.id) Object.assign(S.rewards.find(r => r.id === rwDraft.id), { e: rwDraft.e, n, c });
    else S.rewards.push({ id: uid(), e: rwDraft.e, n, c, r: [] });
    save(true); closeSheet(); render(); toast('انحفظت ✓');
  },
  rwDel: async el => { if (await ask('حذف المكافأة؟', '', 'حذف', true)) { S.rewards = S.rewards.filter(r => r.id !== el.dataset.id); save(true); closeSheet(); render(); } },
  redeem: async el => {
    const r = S.rewards.find(x => x.id === el.dataset.id); if (!r || balance() < r.c) return;
    if (!(await ask(`تستلمين ${r.e} ${esc(r.n)}؟`, `بينخصم ${r.c} نجمة من رصيدك.`, 'استلمتها 🎉'))) return;
    r.r.push(new Date().toISOString()); award(-r.c, `استلمتي: ${r.n}`); save(true); render(); confetti(); toast('استاهلتيها! 🎉');
  },
  badgeInfo: el => { const b = BADGES.find(x => x.id === el.dataset.id); toast(`${b.e} ${b.n}: ${S.badges[b.id] ? 'حصلتيه ' + fmtDay.format(new Date(S.badges[b.id])) : b.d}`); },
  /* جسمي */
  metric: el => { st.metric = el.dataset.k; render(); },
  addBody: () => openSheet(bodyForm()),
  editBody: el => openSheet(bodyForm(S.body.find(x => x.id === el.dataset.id))),
  saveBody: el => {
    const v = {}; sheetEl.querySelectorAll('.bf').forEach(i => { v[i.dataset.k] = i.dataset.k === 'note' ? i.value.trim() : toEn(i.value.trim()); });
    if (!['weight', 'fat', 'muscle', 'waist', 'hips'].some(k => v[k] !== '' && !isNaN(+v[k]))) { toast('عبّي قياس واحد على الأقل'); return; }
    ['weight', 'fat', 'muscle', 'waist', 'hips'].forEach(k => { if (v[k] !== '' && isNaN(+v[k])) v[k] = ''; });
    if (!v.date) v.date = todayS();
    const id = el.dataset.id; let extra = '';
    if (id) Object.assign(S.body.find(x => x.id === id), v);
    else {
      S.body.push({ id: 'b' + uid(), ...v });
      if (!S.pts.some(p => p.w === 'قياس الأسبوع' && wkKey(p.d) === wkKey(new Date()))) { award(3, 'قياس الأسبوع'); extra = ' +3 ⭐'; }
    }
    S.body.sort((a, b) => a.date.localeCompare(b.date));
    const nb = checkBadges(); if (nb.length) { confetti(); extra += ` · وسام ${nb[0].e}`; }
    save(true); closeSheet(); render(); toast('انحفظ القياس ✓' + extra);
  },
  delBody: async el => { if (await ask('حذف القياس؟', 'بينحذف نهائيًا.', 'حذف', true)) { S.body = S.body.filter(x => x.id !== el.dataset.id); save(true); closeSheet(); render(); } },
  /* الإعدادات */
  fullMode: el => { S.settings.fullMode = el.dataset.v; save(); rerenderKeep(); },
  theme: el => { S.settings.theme = el.dataset.v; save(); applyTheme(); render(); },
  accent: el => { S.settings.accent = el.dataset.v; save(); applyTheme(); render(); },
  setF: el => { S.settings.foundation = el.dataset.v === '1'; save(); rerenderKeep(); },
  setSnd: el => { S.settings.sound = el.dataset.v === '1'; save(); render(); if (S.settings.sound) { unlockAudio(); beep(1); } },
  backup: () => doBackup(),
  backupCopy: async () => { if (await copyText(toB64(exportJSON()), 'انسخ كود النسخة ✓')) markBackup(); },
  restorePaste: () => openSheet(`<h2>لصق كود النسخة</h2><div class="small muted" style="margin-bottom:10px">الصقي الكود اللي نسختيه من قبل.</div><textarea class="inp" id="pasteIn" placeholder="eyJhcHAiOiJSMSIs..."></textarea><button class="btn block" style="margin-top:12px" data-act="restoreGo">استرجاع</button>`),
  restoreGo: () => restoreFrom(document.getElementById('pasteIn').value),
  planApply: () => { const v = document.getElementById('planIn').value; if (applyPlanCode(v)) { toast('تم تطبيق خطة المدرب ✓'); render(); } else toast('الكود مو صحيح'); },
  /* المدرب */
  coachPick: el => { const sid = el.dataset.sid, ex = el.dataset.ex; S.plan[sid] = ex; if (S.swaps[sid] === ex) delete S.swaps[sid]; save(); rerenderKeep(); },
  step: el => {
    const { t, id, k } = el.dataset, d = +el.dataset.d, mn = +el.dataset.min, mx = +el.dataset.max;
    const cur = t === 'slot' ? sc(id)[k] : t === 'block' ? bc(BLOCK[id])[k] : t === 'coach' ? S.coach[k] : S.settings[k];
    const v = Math.min(mx, Math.max(mn, (+cur || 0) + d));
    if (t === 'slot') S.cfg[id] = { ...(S.cfg[id] || {}), [k]: v };
    else if (t === 'block') S.bcfg[id] = { ...(S.bcfg[id] || {}), [k]: v };
    else if (t === 'coach') S.coach[k] = v; else S.settings[k] = v;
    save(); rerenderKeep();
  },
  cfgReset: el => { delete S.cfg[el.dataset.sid]; save(); rerenderKeep(); },
  setsToRule: () => { SLOTS.forEach(sid => { if (S.cfg[sid]) { delete S.cfg[sid].sets; if (!Object.keys(S.cfg[sid]).length) delete S.cfg[sid]; } }); save(); rerenderKeep(); toast('رجعت للقاعدة'); },
  copyLink: () => copyText(planLink(), 'انسخ الرابط ✓'),
  copyCode: () => copyText(planCode(), 'انسخ الكود ✓'),
  coachReset: async () => { if (await ask('رجوع للافتراضي؟', 'بترجع كل التمارين والأرقام مثل ما كانت.', 'رجوع')) { S.plan = {}; S.cfg = {}; S.bcfg = {}; S.coach = { firstSets: 4, otherSets: 3 }; S.settings.foundation = true; S.settings.fCount = 4; S.settings.fullMode = 'video'; save(true); rerenderKeep(); } },
  print: () => doPrint(),
  resetAll: async () => { if (await ask('مسح كل البيانات؟', 'التمارين والقياسات والنجوم والإعدادات كلها بتنحذف نهائيًا. احفظي نسخة احتياطية قبل.', 'مسح الكل', true)) { S = merge({}); save(true); applyTheme(); go('welcome'); } }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.tagName === 'A') return;
  const f = H[el.dataset.act]; if (f) { e.preventDefault(); f(el, e); }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset && el.dataset.sid && el.dataset.k && S.active && S.active.entries[el.dataset.sid]) {
    S.active.entries[el.dataset.sid].sets[+el.dataset.i][el.dataset.k] = toEn(el.value); save();
  }
  if (el.id === 'setName') { S.profile.name = el.value.trim() || S.profile.name; save(); }
  if (el.id === 'wName') H._wn = el.value;
  if (el.id === 'rwCn' && rwDraft) { rwDraft.c = parseInt(toEn(el.value), 10) || 0; }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.id === 'restoreFile' && el.files[0]) { const r = new FileReader(); r.onload = () => restoreFrom(String(r.result)); r.readAsText(el.files[0]); el.value = ''; }
  if (el.dataset && el.dataset.rep) {
    const sid = el.dataset.rep, r = parseReps(sc(sid).reps) || { lo: 10, hi: 12 };
    let v = parseInt(toEn(el.value), 10); if (!(v > 0)) v = r[el.dataset.p]; v = Math.min(50, v);
    let lo = el.dataset.p === 'lo' ? v : r.lo, hi = el.dataset.p === 'hi' ? v : r.hi; if (hi < lo) [lo, hi] = [hi, lo];
    S.cfg[sid] = { ...(S.cfg[sid] || {}), reps: lo === hi ? String(lo) : `${lo}–${hi}` }; save(); rerenderKeep();
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'wName') H.welcomeGo(); });

/* ---------- خطة من رابط ---------- */
async function checkPlanHash() {
  const m = location.hash.match(/^#plan-(R2[0-9a-z]+)$/);
  if (!m || !S.profile.name) return;
  try { history.replaceState(null, '', location.href.split('#')[0]); } catch (e) { }
  const code = m[1];
  if (code === planCode()) return;
  if (await ask('وصلتك خطة من المدرب', 'فيها اختيار التمارين وعدد المجموعات والعدات والراحة. تبين تطبّقينها؟', 'تطبيق')) { if (applyPlanCode(code)) { toast('تم تطبيق الخطة ✓'); render(); } else toast('الرابط مو صحيح'); }
}

/* ---------- تشغيل ---------- */
applyTheme();
if (S.active) st.view = 'session';
render();
checkPlanHash();
window.addEventListener('hashchange', checkPlanHash);
let lastDay = todayS();
setInterval(() => { if (todayS() !== lastDay) { lastDay = todayS(); if (st.view !== 'session') render(); } }, 60000);
if ('serviceWorker' in navigator && !inFrame && location.protocol === 'https:') { navigator.serviceWorker.register('sw.js').catch(() => { }); }
