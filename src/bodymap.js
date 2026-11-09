/* ===== خريطة العضلات (أمام + خلف) — جسم أنثى، رسم أصلي مبسّط ===== */
/* كل شكل مرسوم للنص الأيسر (المحور x=50) ويتعكس تلقائيًا للنص الأيمن */
const BM = {
  front: [
    ['traps', 'M45.4 28.4 Q41.4 31 37.4 33 L45.4 32.6Z'],
    ['sideDelt', 'M33 35.2 Q29 38 28.8 44.6 Q28.8 48.4 29.8 51.2 L31.8 50.6 Q31.2 44.4 34.2 37.6Z'],
    ['frontDelt', 'M34.2 37.6 Q31.2 44.4 31.8 50.6 Q34.4 46.4 38.2 42.4 Q39 37.4 37 34.6 Q35.2 35.4 34.2 37.6Z'],
    ['chest', 'M38.4 35.6 L49.2 36 L49.2 46.4 Q47.2 52.8 42.2 52.6 Q36.2 52.2 34.6 47.6 Q35.2 41.2 38.4 37.8Z'],
    ['biceps', 'M29.6 53.8 Q26.6 59.6 26.4 66.6 Q26.8 72 28.8 73.2 Q31.8 70.4 32.4 63.4 Q32.8 57.2 31.6 53.4Z'],
    ['forearms', 'M26 76.4 Q22.6 84 21.6 92.4 Q21.8 97.4 23.4 98.8 L26.2 99 Q28.2 92 29.4 84.6 Q29.8 79 28.6 76Z'],
    ['obliques', 'M36.8 55.2 Q40.8 56.8 44.2 57.2 L44.4 89 Q41.6 92.8 38.6 93.8 Q39.8 84 39.4 75.6 Q38.4 64 36.8 55.2Z'],
    ['abs', 'M45.2 55.6 Q47.4 55.2 49.2 55.4 L49.2 74.2 L45 74.2 Q44.8 64 45.2 55.6Z M45 75.6 L49.2 75.6 L49.2 93.6 Q46.6 93.4 45.4 90.8 Q44.8 83 45 75.6Z'],
    ['gluteMed', 'M38.6 94 Q31 99.4 28 110 L32.6 113 Q34.4 103.4 40.4 97.4Z'],
    ['quads', 'M28.8 112.8 Q26.4 126.8 28.8 141 Q31 151.2 36.4 157.2 L43.8 157.2 Q47.2 146.6 47 133.8 Q46.4 121.6 41.8 111.6 Q35 107.8 28.8 112.8Z'],
    ['adductors', 'M43.2 107.8 Q48 109.4 49.2 113.4 L48.6 130.2 Q46.8 137.6 44.8 134.2 Q45 121.6 42.2 111.6Z'],
    ['calves', 'M36 166.4 Q34 177 35.8 190.4 L39.2 194 Q42 189 42.6 179.6 Q43.2 170 41.6 165.2Z']
  ],
  back: [
    ['traps', 'M50 25.4 L46 27.6 Q40.2 31.4 35.6 33.8 Q41.6 37.4 45.4 43.4 L50 49.6Z'],
    ['sideDelt', 'M33 35.2 Q29 38 28.8 44.6 Q28.8 48.4 29.8 51.2 L31.8 50.6 Q31.2 44.4 34.2 37.6Z'],
    ['rearDelt', 'M35.2 34.2 Q32.8 35.4 34.2 37.6 Q31.2 44.4 31.8 50.6 Q34.8 45.6 38.6 41.4 Q39.4 37.2 35.2 34.2Z'],
    ['triceps', 'M29.4 53.6 Q26.4 59.6 26.2 66.6 Q26.6 72 28.6 73.2 Q31.6 70 32.2 63 Q32.6 57 31.4 53.2Z'],
    ['forearms', 'M26 76.4 Q22.6 84 21.6 92.4 Q21.8 97.4 23.4 98.8 L26.2 99 Q28.2 92 29.4 84.6 Q29.8 79 28.6 76Z'],
    ['upperBack', 'M49.2 51.4 Q44.4 45.6 39 42.4 Q38.6 49.4 42.2 56.2 L49.2 60.2Z'],
    ['lats', 'M38.2 44.2 Q35.4 51.4 36.6 61.4 Q38.4 71 42.2 78.4 L46 75.2 Q44.4 66.8 44.8 60 Q41.6 55 38.2 44.2Z'],
    ['lowerBack', 'M45.4 63 L49.2 62 L49.2 89.6 L45.6 89.6 Q44.2 77.6 45.4 63Z'],
    ['gluteMed', 'M37.6 88.6 Q31.4 93.8 29.4 103.6 Q33.6 96 42.2 93.8 L43 90 Q39.6 87.8 37.6 88.6Z'],
    ['glutes', 'M30 98.4 Q27.6 110.2 31.6 118.8 Q39 126 49.2 123.2 L49.2 99.6 Q39.8 92.8 30 98.4Z'],
    ['hamstrings', 'M30.8 124.8 Q29 138.2 32.4 151.4 L39 157.2 Q44.6 151.2 45.8 139.2 Q46.6 129.2 44.8 124.4 Q38 126.6 30.8 124.8Z'],
    ['adductors', 'M45.2 124.2 Q49 126.2 49.2 130.6 L47.4 140.8 Q46.2 132.8 45.2 124.2Z'],
    ['calves', 'M34.8 164.2 Q32 174 34.6 185.6 L39.2 189.6 Q43 183.6 43.6 175.8 Q43.8 168 41.2 163Z']
  ]
};
const BM_BASE = [
  'ellipse:50,16.2,6.8,8.8', 'path:M46.6 24.4 L53.4 24.4 L54.2 31 L45.8 31Z',
  'ellipse:23.2,104.4,2.8,4.6', 'ellipse:76.8,104.4,2.8,4.6',
  'ellipse:40.2,160.8,4.2,3.8', 'ellipse:59.8,160.8,4.2,3.8',
  'ellipse:39.2,200.6,3.8,2.8', 'ellipse:60.8,200.6,3.8,2.8',
  'path:M36.6 157.8 L43.4 157.8 L42.8 164 L37.2 164Z', 'path:M63.4 157.8 L56.6 157.8 L57.2 164 L62.8 164Z',
  'path:M37.2 192.6 L41.4 195 L41.4 198 L37.2 198Z', 'path:M62.8 192.6 L58.6 195 L58.6 198 L62.8 198Z'
];
/* الشعر: طويل لين الكتف (أمام) وذيل حصان (خلف) */
const BM_HAIR = {
  front: '<path class="bm-hair" d="M41.4 16.4 Q40.6 4.6 50 4.2 Q59.4 4.6 58.6 16.4 Q58.8 25 56.2 30.4 L53.8 29.2 Q55.8 22.6 55.4 15.8 Q54.4 10.4 50 10.2 Q45.6 10.4 44.6 15.8 Q44.2 22.6 46.2 29.2 L43.8 30.4 Q41.2 25 41.4 16.4Z"/>',
  back: '<path class="bm-hair" d="M41.2 15.6 Q40.8 4.2 50 4 Q59.2 4.2 58.8 15.6 Q59.2 24.4 56.6 29 L43.4 29 Q40.8 24.4 41.2 15.6Z"/><path class="bm-hair" d="M47.6 27 Q50 26 52.4 27 Q53.4 34 51.6 41.6 Q50 43.4 48.4 41.6 Q46.6 34 47.6 27Z"/>'
};
function bmFigure(view, P, S, dx) {
  const cls = m => P.has(m) ? 'bm-m p' : S.has(m) ? 'bm-m s' : 'bm-m';
  let g = '';
  for (const b of BM_BASE) {
    const [k, v] = b.split(':');
    if (k === 'ellipse') { const [cx, cy, rx, ry] = v.split(','); g += `<ellipse class="bm-base" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`; }
    else g += `<path class="bm-base" d="${v}"/>`;
  }
  for (const [m, d] of BM[view]) {
    g += `<path class="${cls(m)}" d="${d}"/><path class="${cls(m)}" d="${d}" transform="translate(100 0) scale(-1 1)"/>`;
  }
  g += BM_HAIR[view];
  return `<g transform="translate(${dx} 0)">${g}</g>`;
}

/* mode: 'both' | 'front' | 'back' | 'auto' (اختيار الوجه الأنسب للأيقونة الصغيرة) */
function bodyMap(p = [], s = [], mode = 'both') {
  const P = new Set(p), S = new Set(s.filter(x => !P.has(x)));
  const backSet = new Set(['rearDelt', 'triceps', 'upperBack', 'lats', 'lowerBack', 'glutes', 'hamstrings', 'traps', 'calves']);
  if (mode === 'auto') {
    const back = p.filter(m => backSet.has(m)).length, front = p.length - back;
    mode = back > front ? 'back' : 'front';
    if (!p.length) mode = S.size && [...S].filter(m => backSet.has(m)).length > S.size / 2 ? 'back' : 'front';
  }
  if (mode === 'both') {
    return `<svg class="bodymap" viewBox="0 -2 210 214" aria-hidden="true">${bmFigure('front', P, S, 2)}${bmFigure('back', P, S, 108)}
      <text class="bm-lbl" x="52" y="210" text-anchor="middle" font-size="7">أمام</text><text class="bm-lbl" x="158" y="210" text-anchor="middle" font-size="7">خلف</text></svg>`;
  }
  /* أيقونة صغيرة: نقص على الجزء المهم */
  const LOW = ['quads', 'hamstrings', 'glutes', 'gluteMed', 'adductors', 'calves'];
  const lower = p.some(m => LOW.includes(m)), upper = p.some(m => !LOW.includes(m));
  const onlyCalves = p.length && p.every(m => m === 'calves');
  const vb = !p.length ? '10 -2 80 212' : onlyCalves ? '14 140 72 64' : (lower && !upper) ? (p.includes('calves') ? '10 88 80 112' : '14 86 72 80') : (upper && !lower) ? '14 20 72 80' : '10 20 80 150';
  return `<svg viewBox="${vb}" aria-hidden="true">${bmFigure(mode, P, S, 0)}</svg>`;
}
