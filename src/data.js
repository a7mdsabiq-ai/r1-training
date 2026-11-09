/* ===== R1 — بيانات البرنامج ===== */

const MUSCLES = {
  chest: 'الصدر', frontDelt: 'الكتف الأمامي', sideDelt: 'الكتف الجانبي', rearDelt: 'الكتف الخلفي',
  biceps: 'البايسبس', triceps: 'الترايسبس', forearms: 'الساعد', abs: 'البطن', obliques: 'الخواصر',
  traps: 'الترابيس', lats: 'الظهر العريض', upperBack: 'وسط الظهر', lowerBack: 'أسفل الظهر',
  glutes: 'الأرداف', gluteMed: 'جانب الورك', adductors: 'الفخذ الداخلي', quads: 'الفخذ الأمامي',
  hamstrings: 'الفخذ الخلفي', calves: 'السمانة'
};

/* t: w = أوزان (كجم + عدات) · bw = وزن الجسم (عدات) · t = ثبات بالثواني · c = كارديو بالدقائق */
const EX = {
  /* ---------- الصدر ---------- */
  chest_machine: { n: 'جهاز ضغط الصدر', e: 'Chest Press Machine', v: 'CIykDiF4sfg', t: 'w', p: ['chest'], s: ['frontDelt', 'triceps'],
    tip: 'اضبطي المقعد بحيث تكون المقابض على مستوى منتصف الصدر. ادفعي لقدام بدون ما تقفلين الكوع، وارجعي ببطء.' },
  db_press: { n: 'ضغط صدر بالدمبل', e: 'Dumbbell Bench Press', v: 'AduT4Eq-iP0', t: 'w', p: ['chest'], s: ['frontDelt', 'triceps'],
    tip: 'كتوفك لورا ولاصقة بالبنش. نزّلي الدمبلز لجنب الصدر ببطء، وادفعي لفوق بدون ما تخبطينها ببعض.' },
  bb_bench: { n: 'بنش بريس بالبار', e: 'Barbell Bench Press', v: 'r9TTirZO6nc', t: 'w', p: ['chest'], s: ['frontDelt', 'triceps'],
    tip: 'ابدئي بالبار فاضي. نزّليه لمنتصف الصدر بتحكم، والأفضل يكون معك أحد يساعدك في الأوزان الثقيلة.' },
  incline_machine: { n: 'جهاز صدر مائل', e: 'Incline Chest Press Machine', v: 'oWDhTTxDcxU', t: 'w', p: ['chest'], s: ['frontDelt', 'triceps'],
    tip: 'يركّز على أعلى الصدر. صدرك مرفوع وظهرك لاصق بالمسند طول الحركة.' },
  incline_db: { n: 'ضغط مائل بالدمبل', e: 'Incline Dumbbell Press', v: 'oZVCBM9f8Eo', t: 'w', p: ['chest'], s: ['frontDelt', 'triceps'],
    tip: 'خلّي ميلان البنش ٣٠ درجة تقريبًا. انزلي ببطء لين تحسين بفتح في الصدر، وادفعي لفوق.' },
  incline_pushup: { n: 'ضغط مائل على البنش', e: 'Incline Push-up', v: 'yAbg3_pJKvw', t: 'bw', p: ['chest'], s: ['triceps', 'frontDelt', 'abs'],
    tip: 'كل ما كان السطح أعلى صار أسهل. جسمك خط مستقيم من الراس للكعب، وبطنك مشدود.' },
  knee_pushup: { n: 'ضغط على الركب', e: 'Knee Push-up', v: 'X9sGmsGYYE0', t: 'bw', p: ['chest'], s: ['triceps', 'frontDelt', 'abs'],
    tip: 'الركب على الأرض والجسم خط مستقيم من الراس للركبة. انزلي لين يقرّب صدرك من الأرض.' },
  machine_fly: { n: 'جهاز تفتيح الصدر', e: 'Chest Fly Machine', v: 'eGjt4lk6g34', t: 'w', p: ['chest'], s: ['frontDelt'],
    tip: 'الكوع مثني شوي وثابت. قرّبي المقابض قدام صدرك كأنك تحضنين شجرة، وارجعي ببطء.' },
  cable_cross: { n: 'تفتيح كيبل من فوق لتحت', e: 'High-to-Low Cable Fly', v: 'hhruLxo9yZU', t: 'w', p: ['chest'], s: ['frontDelt'],
    tip: 'خطوة لقدام وانحناء بسيط. اسحبي الكيبلات لتحت وقدام لين تتقابل اليدين عند أسفل الصدر.' },
  decline_machine: { n: 'جهاز صدر سفلي', e: 'Decline Chest Press Machine', v: '3dZrFdhJpWg', t: 'w', p: ['chest'], s: ['triceps'],
    tip: 'ادفعي لتحت وقدام، وخلّي ظهرك لاصق بالمسند.' },

  /* ---------- الأكتاف ---------- */
  shoulder_machine: { n: 'جهاز ضغط الأكتاف', e: 'Shoulder Press Machine', v: 'GcY6TZxfS0k', t: 'w', p: ['frontDelt', 'sideDelt'], s: ['triceps', 'traps'],
    tip: 'المقابض تبدأ عند مستوى الكتف. ادفعي لفوق بدون ما تقوّسين أسفل ظهرك.' },
  db_shoulder: { n: 'ضغط أكتاف بالدمبل', e: 'Dumbbell Shoulder Press', v: 'aI2hGzsAMXs', t: 'w', p: ['frontDelt', 'sideDelt'], s: ['triceps', 'traps'],
    tip: 'اجلسي وظهرك مسنود. ادفعي الدمبلز لفوق وانزلي لين مستوى الأذن تقريبًا.' },
  db_lateral: { n: 'رفرفة جانبي بالدمبل', e: 'Dumbbell Lateral Raise', v: 'z-kOn7flIZg', t: 'w', p: ['sideDelt'], s: ['traps'],
    tip: 'ارفعي لين مستوى الكتف بس، والكوع مثني شوي. انزلي ببطء. الوزن الخفيف هنا يكفي.' },
  cable_lateral: { n: 'رفرفة جانبي بالكيبل', e: 'Cable Lateral Raise', v: 'Z5FA9aq3L6A', t: 'w', p: ['sideDelt'], s: ['traps'],
    tip: 'الكيبل من تحت وقدام جسمك. ارفعي لجنب لين مستوى الكتف بتحكم.' },

  /* ---------- الترايسبس ---------- */
  pushdown: { n: 'ترايسبس كيبل', e: 'Triceps Pushdown', v: 'LXkCrxn3caQ', t: 'w', p: ['triceps'], s: ['forearms'],
    tip: 'الكوع ثابت جنب جسمك. ادفعي لتحت لين تفرد يدك، وارجعي ببطء بدون ما يتحرك الكتف.' },
  overhead_tri: { n: 'ترايسبس فوق الراس', e: 'Overhead Triceps Extension', v: '9wxRhONFsRA', t: 'w', p: ['triceps'], s: [],
    tip: 'الكوع يأشّر لفوق وقريب من الراس. انزلي ورا الراس ببطء ثم افردي يدك.' },

  /* ---------- الظهر ---------- */
  lat_pulldown: { n: 'سحب أمامي', e: 'Lat Pulldown', v: 'JGeRYIZdojU', t: 'w', p: ['lats'], s: ['biceps', 'upperBack', 'rearDelt'],
    tip: 'اسحبي البار لأعلى صدرك وصدرك مرفوع. تخيّلي إنك تنزّلين الكوع لجيوبك. لا ترجعين بجسمك كثير.' },
  wide_pulldown: { n: 'سحب أمامي قبضة واسعة', e: 'Wide-Grip Lat Pulldown', v: '7JnP8dFbS14', t: 'w', p: ['lats'], s: ['upperBack', 'rearDelt', 'biceps'],
    tip: 'قبضة أعرض من الكتف. اسحبي لأعلى الصدر وشدّي لوحي الكتف لتحت.' },
  close_pulldown: { n: 'سحب أمامي قبضة ضيقة', e: 'Close-Grip Lat Pulldown', v: 'IjoFCmLX7z0', t: 'w', p: ['lats'], s: ['biceps', 'upperBack'],
    tip: 'المقبض الضيق يخلي الحركة أسهل للمبتدئين. اسحبي لأعلى الصدر وارجعي لين تفرد يدك.' },
  reverse_pulldown: { n: 'سحب أمامي قبضة عكسية', e: 'Reverse-Grip Lat Pulldown', v: 'SNiwpA13ZLU', t: 'w', p: ['lats'], s: ['biceps', 'upperBack'],
    tip: 'كفوفك تواجهك. اسحبي لأعلى الصدر والكوع قريب من جسمك.' },
  assisted_pullup: { n: 'جهاز العقلة المساعد', e: 'Assisted Pull-up Machine', v: 'wFj808u2HWU', t: 'w', p: ['lats'], s: ['biceps', 'upperBack'],
    tip: 'هنا الوزن يساعدك: كل ما زاد الوزن صارت أسهل. سجّلي وزن المساعدة.' },
  seated_row: { n: 'سحب أرضي بالكيبل', e: 'Seated Cable Row', v: 'lJoozxC0Rns', t: 'w', p: ['upperBack', 'lats'], s: ['rearDelt', 'biceps'],
    tip: 'ظهرك مستقيم. اسحبي المقبض لبطنك واعصري لوحي الكتف ورا، وارجعي ببطء.' },
  row_machine: { n: 'جهاز السحب الأرضي', e: 'Seated Row Machine', v: 'TeFo51Q_Nsc', t: 'w', p: ['upperBack', 'lats'], s: ['rearDelt', 'biceps'],
    tip: 'صدرك على المسند. اسحبي الكوع لورا واعصري وسط الظهر.' },
  seated_row_wide: { n: 'سحب أرضي قبضة واسعة', e: 'Seated Row (Wide Grip)', v: 'SsKCYlwqunA', t: 'w', p: ['upperBack'], s: ['rearDelt', 'lats'],
    tip: 'القبضة الواسعة تركّز على وسط الظهر والكتف الخلفي. اسحبي لأعلى البطن.' },
  hammer_row: { n: 'جهاز تجديف (قبضة ضيقة)', e: 'Hammer Strength Row', v: 'eJeKLoxlxWI', t: 'w', p: ['lats', 'upperBack'], s: ['biceps'],
    tip: 'صدرك على المسند. اسحبي الكوع لورا قريب من جسمك وارجعي ببطء.' },
  db_row: { n: 'تجديف دمبل بيد وحدة', e: 'One-Arm Dumbbell Row', v: 'ZRSGpBUVcNw', t: 'w', p: ['lats', 'upperBack'], s: ['biceps', 'rearDelt'],
    tip: 'يدك وركبتك على البنش وظهرك مستقيم. اسحبي الدمبل لجهة الحوض. العدات لكل يد.' },
  db_bent_row: { n: 'تجديف دمبل منحني', e: 'Dumbbell Bent-Over Row', v: '6gvmcqr226U', t: 'w', p: ['upperBack', 'lats'], s: ['rearDelt', 'biceps', 'lowerBack'],
    tip: 'انحني من الحوض وظهرك مستقيم. اسحبي الدمبلز لجهة البطن.' },
  tbar: { n: 'تي بار', e: 'T-Bar Row', v: 'hYo72r8Ivso', t: 'w', p: ['upperBack', 'lats'], s: ['lowerBack', 'biceps'],
    tip: 'ظهرك مستقيم وثابت. اسحبي لصدرك وانزلي بتحكم. ابدئي بوزن خفيف.' },
  straight_pulldown: { n: 'سحب كيبل بيد مفرودة', e: 'Straight-Arm Pulldown', v: 'ey9Fv3FGrRg', t: 'w', p: ['lats'], s: ['abs'],
    tip: 'يدك شبه مفرودة. انزلي بالبار لين فخوذك وأنتي تحسين بالظهر العريض.' },

  /* ---------- الكتف الخلفي ---------- */
  reverse_fly_machine: { n: 'جهاز الكتف الخلفي', e: 'Machine Reverse Fly', v: 'uZyYnx4rd7w', t: 'w', p: ['rearDelt'], s: ['upperBack', 'traps'],
    tip: 'صدرك على المسند. افتحي يدك لورا والكوع مثني شوي، وارجعي ببطء.' },
  face_pull: { n: 'فيس بول', e: 'Cable Face Pull', v: '0Po47vvj9g4', t: 'w', p: ['rearDelt'], s: ['upperBack', 'traps'],
    tip: 'الحبل على مستوى الوجه. اسحبي لجهة جبهتك وافتحي الكوع لبرّا.' },
  cable_rear_fly: { n: 'كتف خلفي بالكيبل', e: 'Cable Rear Delt Fly', v: 'er15V96hG5U', t: 'w', p: ['rearDelt'], s: ['upperBack'],
    tip: 'اسحبي الكيبلات لبرّا على مستوى الكتف وأنتي تعصرين ورا.' },

  /* ---------- البايسبس ---------- */
  db_curl: { n: 'بايسبس دمبل', e: 'Dumbbell Biceps Curl', v: 'MtXdEcW3Eog', t: 'w', p: ['biceps'], s: ['forearms'],
    tip: 'الكوع ثابت جنب جسمك. ارفعي بدون ما تهزّين جسمك، وانزلي ببطء.' },
  hammer_curl: { n: 'هامر كيرل', e: 'Hammer Curl', v: 'B4RznoFvTl4', t: 'w', p: ['biceps', 'forearms'], s: [],
    tip: 'كفوفك تواجه بعض طول الحركة. ارفعي وانزلي بتحكم.' },
  cable_curl: { n: 'بايسبس كيبل', e: 'Cable Biceps Curl', v: 'GNlopToAZyg', t: 'w', p: ['biceps'], s: ['forearms'],
    tip: 'الكيبل يعطي شد ثابت طول الحركة. الكوع ثابت جنب جسمك.' },
  bb_curl: { n: 'بايسبس بار', e: 'Barbell Biceps Curl', v: 'N5x5M1x1Gd0', t: 'w', p: ['biceps'], s: ['forearms'],
    tip: 'قبضة بعرض الكتف. ارفعي بدون ما ترجعين بظهرك.' },
  preacher: { n: 'بايسبس على الكرسي', e: 'Preacher Curl', v: 'Zbs3ko8ycyg', t: 'w', p: ['biceps'], s: [],
    tip: 'ذراعك على المسند. انزلي لين قبل ما تفردين يدك بالكامل، ثم ارفعي.' },

  /* ---------- أسفل الظهر ---------- */
  back_ext: { n: 'تمديد الظهر', e: 'Back Extension', v: 'ph3pddpKzzw', t: 'bw', p: ['lowerBack'], s: ['glutes', 'hamstrings'],
    tip: 'انزلي ببطء واطلعي لين يصير جسمك خط مستقيم بس. لا تقوّسين ظهرك لفوق أكثر من كذا.' },
  bird_dog: { n: 'بيرد دوق', e: 'Bird Dog', v: 'ZdAHe9_HeEw', t: 'bw', p: ['lowerBack', 'abs'], s: ['glutes'],
    tip: 'على يدينك وركبك. افردي يد ورجل عكس بعض ببطء، واثبتي ثانيتين. العدات لكل جهة.' },

  /* ---------- الأرجل ---------- */
  leg_press: { n: 'ليق برس', e: 'Leg Press (45°)', v: 'q4W4_VJbKW0', t: 'w', p: ['quads', 'glutes'], s: ['hamstrings', 'adductors'],
    tip: 'رجولك بعرض الحوض على المنصة. انزلي لين تصير الركبة تقريبًا ٩٠ درجة وأسفل ظهرك لاصق بالمقعد. لا تقفلين الركبة فوق.' },
  leg_press_seated: { n: 'ليق برس جالس', e: 'Seated Leg Press', v: 'qCR9bN3G1t4', t: 'w', p: ['quads', 'glutes'], s: ['hamstrings', 'adductors'],
    tip: 'ادفعي بكعبك ونص رجلك، وارجعي بتحكم بدون ما يرتفع الحوض عن المقعد.' },
  hack_squat: { n: 'هاك سكوات', e: 'Hack Squat', v: 'scs5XcsZuc8', t: 'w', p: ['quads', 'glutes'], s: ['adductors', 'hamstrings'],
    tip: 'ظهرك لاصق بالمسند. انزلي بتحكم والركبة باتجاه أصابع رجلك.' },
  smith_hack: { n: 'سكوات على السميث', e: 'Smith Machine Squat', v: 'zZj-ibOLJHs', t: 'w', p: ['quads', 'glutes'], s: ['adductors', 'hamstrings'],
    tip: 'رجولك قدّام البار شوي. انزلي وصدرك مرفوع، واطلعي بالضغط على الكعب.' },
  goblet_squat: { n: 'قوبلت سكوات', e: 'Goblet Squat', v: 'zBV3ceGyAxw', t: 'w', p: ['quads', 'glutes'], s: ['adductors', 'abs'],
    tip: 'امسكي الدمبل قدّام صدرك. انزلي كأنك بتجلسين على كرسي وصدرك مرفوع، والركبة باتجاه الأصابع.' },
  bw_squat: { n: 'سكوات بوزن الجسم', e: 'Bodyweight Squat', v: 'l83R5PblSMA', t: 'bw', p: ['quads', 'glutes'], s: ['adductors'],
    tip: 'رجولك بعرض الكتف. انزلي والحوض لورا كأنك بتجلسين، واطلعي بالضغط على الكعب.' },
  sumo_squat: { n: 'سومو سكوات بالدمبل', e: 'Dumbbell Sumo Squat', v: 'qiQAsB0x-7k', t: 'w', p: ['glutes', 'adductors'], s: ['quads'],
    tip: 'وقفة واسعة والأصابع لبرّا. انزلي مستقيمة والدمبل بين رجولك.' },
  rdl: { n: 'رومانيان ديدلفت', e: 'Romanian Deadlift', v: 'zU-f6DMCdAI', t: 'w', p: ['hamstrings', 'glutes'], s: ['lowerBack'],
    tip: 'ظهرك مستقيم والوزن قريب من رجولك. ادفعي الحوض لورا لين تحسين بشد ورا الفخذ، ثم ادفعيه لقدام. تقدرين تسوينها بالدمبل أو البار.' },
  db_deadlift: { n: 'ديدلفت بالدمبل', e: 'Dumbbell Deadlift', v: 'plb5jEO4Unw', t: 'w', p: ['glutes', 'hamstrings'], s: ['quads', 'lowerBack'],
    tip: 'الدمبلز جنب رجولك. انزلي بثني الحوض والركبة وظهرك مستقيم، واطلعي بدفع الأرض.' },

  /* ---------- الأرداف ---------- */
  db_hip_thrust: { n: 'هيب ثرست بالدمبل', e: 'Dumbbell Hip Thrust', v: 'ETnhBWeWK74', t: 'w', p: ['glutes'], s: ['hamstrings'],
    tip: 'أعلى ظهرك على البنش والدمبل على الحوض. ادفعي لفوق لين يصير جسمك مستقيم من الكتف للركبة، واعصري الأرداف ثانية فوق.' },
  bb_hip_thrust: { n: 'هيب ثرست بالبار', e: 'Barbell Hip Thrust', v: 'aweBS7K71l8', t: 'w', p: ['glutes'], s: ['hamstrings'],
    tip: 'حطّي إسفنجة على البار. ذقنك لتحت شوي، وادفعي بالكعب لين يصير جسمك مستقيم.' },
  hip_thrust_machine: { n: 'جهاز الهيب ثرست', e: 'Hip Thrust Machine', v: 'N58u3lwR-C8', t: 'w', p: ['glutes'], s: ['hamstrings'],
    tip: 'اضبطي الحزام على الحوض. ادفعي لفوق واعصري الأرداف فوق ثانية.' },
  glute_bridge: { n: 'جسر الأرداف', e: 'Glute Bridge', v: 'tqp5XQPpTxY', t: 'bw', p: ['glutes'], s: ['hamstrings'],
    tip: 'على ظهرك والركب مثنية. ارفعي الحوض لين يصير خط مستقيم واعصري الأرداف.' },
  db_glute_bridge: { n: 'جسر الأرداف بالدمبل', e: 'Dumbbell Glute Bridge', v: 'cruqsnAyU6A', t: 'w', p: ['glutes'], s: ['hamstrings'],
    tip: 'مثل جسر الأرداف بس مع دمبل على الحوض. اثبتي ثانية فوق.' },
  cable_kickback: { n: 'ركلة أرداف بالكيبل', e: 'Cable Glute Kickback', v: 'SqO-VUEak2M', t: 'w', p: ['glutes'], s: ['hamstrings'],
    tip: 'ركّبي الحزام على الكاحل. ادفعي رجلك لورا بدون ما تقوّسين ظهرك. العدات لكل رجل.' },
  abductor: { n: 'جهاز جانب الورك (أبدكتور)', e: 'Hip Abductor Machine', v: 'G_8LItOiZ0Q', t: 'w', p: ['gluteMed'], s: ['glutes'],
    tip: 'افتحي رجولك لبرّا ببطء وارجعي بتحكم. لو ملتِ بجسمك لقدام شوي يزيد التركيز على الأرداف.' },
  adductor: { n: 'جهاز الفخذ الداخلي (أدكتور)', e: 'Hip Adductor Machine', v: 'CjAVezAggkI', t: 'w', p: ['adductors'], s: [],
    tip: 'ضمّي رجولك لداخل بتحكم وارجعي ببطء.' },

  /* ---------- الفخذ الخلفي والأمامي ---------- */
  lying_curl: { n: 'ثني رجل منبطح', e: 'Lying Leg Curl', v: 'SbSNUXPRkc8', t: 'w', p: ['hamstrings'], s: ['calves'],
    tip: 'الحوض لاصق بالجهاز. اسحبي الوسادة لجهة الأرداف وارجعي ببطء.' },
  seated_curl: { n: 'ثني رجل جالس', e: 'Seated Leg Curl', v: 'Orxowest56U', t: 'w', p: ['hamstrings'], s: ['calves'],
    tip: 'ثبّتي الوسادة فوق فخذك. اسحبي لتحت وارجعي بتحكم.' },
  leg_ext: { n: 'جهاز الفخذ الأمامي', e: 'Leg Extension', v: '4ZDm5EbiFI8', t: 'w', p: ['quads'], s: [],
    tip: 'افردي رجلك لفوق واعصري الفخذ ثانية، وانزلي ببطء.' },
  reverse_lunge: { n: 'لانجز لورا', e: 'Reverse Lunge', v: 'xrPteyQLGAo', t: 'w', p: ['quads', 'glutes'], s: ['hamstrings', 'adductors'],
    tip: 'خطوة لورا وانزلي لين الركبتين ٩٠ درجة تقريبًا. أسهل على الركبة من اللانجز لقدام. العدات لكل رجل، وتقدرين بدون وزن.' },
  walking_lunge: { n: 'لانجز مشي', e: 'Walking Lunge', v: 'mAgbXQdd4LM', t: 'w', p: ['quads', 'glutes'], s: ['hamstrings', 'adductors'],
    tip: 'خطوات لقدام بالتناوب وجسمك مستقيم. العدات لكل رجل.' },
  step_up: { n: 'صعود على البنش', e: 'Dumbbell Step-up', v: 'DxUNi119Qzs', t: 'w', p: ['glutes', 'quads'], s: ['hamstrings'],
    tip: 'اصعدي بالضغط على كعب الرجل اللي فوق، بدون ما تدفين بالرجل اللي تحت. العدات لكل رجل.' },

  /* ---------- السمانة ---------- */
  calf_standing: { n: 'سمانة وقوف', e: 'Standing Calf Raise', v: 'Zep-wKHWkNM', t: 'w', p: ['calves'], s: [],
    tip: 'ارفعي على أطراف أصابعك لأعلى نقطة، واثبتي ثانية، ثم انزلي ببطء.' },
  calf_legpress: { n: 'سمانة على الليق برس', e: 'Leg Press Calf Raise', v: 'dhRz1Ns60Zg', t: 'w', p: ['calves'], s: [],
    tip: 'أطراف رجلك على طرف المنصة. ادفعي بالأصابع وارجعي ببطء.' },

  /* ---------- الكور ---------- */
  plank: { n: 'بلانك', e: 'Plank', v: 'q4rDeHYMcIg', t: 't', p: ['abs'], s: ['obliques', 'frontDelt', 'lowerBack'],
    tip: 'على الكوع وأطراف الأصابع، جسمك خط مستقيم والبطن مشدود. لا تنزلين الحوض ولا ترفعينه.' },
  knee_plank: { n: 'بلانك على الركب', e: 'Knee Plank', v: 'iDSHokfXqyA', t: 't', p: ['abs'], s: ['obliques'],
    tip: 'نسخة أسهل من البلانك: على الكوع والركب، والجسم مستقيم من الراس للركبة.' },
  side_plank: { n: 'بلانك جانبي', e: 'Side Plank', v: 'Oe9Tp9SvTCE', t: 't', p: ['obliques'], s: ['abs', 'gluteMed'],
    tip: 'على كوع واحد والجسم مستقيم. تقدرين تنزلين الركبة اللي تحت إذا صعبت. الوقت لكل جهة.' },
  dead_bug: { n: 'ديد بق', e: 'Dead Bug', v: '9RK9UUgKIQE', t: 'bw', p: ['abs'], s: ['lowerBack'],
    tip: 'أسفل ظهرك لاصق بالأرض طول الوقت. مدّي يد ورجل عكس بعض ببطء. العدات لكل جهة.' },
  bicycle: { n: 'دراجة البطن', e: 'Bicycle Crunch', v: 'wnuLak2onoA', t: 'bw', p: ['abs', 'obliques'], s: [],
    tip: 'ببطء وتحكم. قرّبي الكوع للركبة المعاكسة. العدات لكل جهة.' },
  reverse_crunch: { n: 'كرنش عكسي', e: 'Reverse Crunch', v: 'XY8KzdDcMFg', t: 'bw', p: ['abs'], s: [],
    tip: 'ارفعي الحوض عن الأرض شوي بقوة البطن، بدون مرجحة.' },
  russian_twist: { n: 'تويست روسي', e: 'Russian Twist', v: '99T1EfpMwPA', t: 'bw', p: ['obliques'], s: ['abs'],
    tip: 'ظهرك مستقيم ومايلة لورا شوي. لفّي جسمك يمين ويسار. العدات لكل جهة.' },
  mountain_climber: { n: 'متسلق الجبل', e: 'Mountain Climbers', v: 'kLh-uczlPLg', t: 't', p: ['abs'], s: ['frontDelt', 'quads', 'obliques'],
    tip: 'وضعية الضغط، وقرّبي الركب لصدرك بالتناوب. ابدئي ببطء ثم زيدي السرعة.' },

  /* ---------- الكارديو ---------- */
  treadmill: { n: 'مشي على السير بميلان', e: 'Incline Treadmill Walk', v: 'HxsFneJFM2c', t: 'c', p: [], s: ['glutes', 'calves', 'hamstrings'],
    tip: 'سرعة ٤.٥–٥.٥ كم/س وميلان ٦–١٠٪. المفروض تقدرين تتكلمين بس بصعوبة بسيطة. لا تمسكين المقابض.' },
  bike: { n: 'الدراجة الثابتة', e: 'Stationary Bike', v: 'NwwDBARCGgo', t: 'c', p: [], s: ['quads', 'calves'],
    tip: 'مقاومة متوسطة. تقدرين تسوين دقيقة سريع ودقيقتين عادي بالتناوب.' },
  elliptical: { n: 'جهاز الإليبتكال', e: 'Cross Trainer', v: 'yISC2qwdh9I', t: 'c', p: [], s: ['quads', 'glutes'],
    tip: 'خفيف على الركب. حافظي على سرعة ثابتة ومقاومة متوسطة.' },

  /* ---------- فيديوهات متابعة (اليوم الشامل) ---------- */
  fit_madfit: { n: 'تمرين شامل بدون قفز', e: 'MadFit · 10 min Full Body (no jumping)', v: 'LvV7K_i7aDQ', t: 'v', mins: 12, p: ['quads', 'glutes', 'abs'], s: ['chest', 'frontDelt', 'hamstrings', 'obliques'],
    tip: 'فيديو متابعة: سوّي الحركات مع المدربة أول بأول. بدون قفز وبدون أدوات وبدون تكرار.' },
  fit_jo: { n: 'حرق كامل الجسم (خفيف)', e: 'growwithjo · Lazy Girl Full Body Fat Burn', v: 'r7xJZoox4IE', t: 'v', mins: 12, p: ['quads', 'glutes', 'abs'], s: ['sideDelt', 'obliques', 'calves'],
    tip: 'خفيف على الركب وبدون قفز. ممتاز للبداية أو لأيام التعب.' },
  fit_madfit15: { n: 'كارديو للمبتدئين', e: 'MadFit · 15 min Beginner Cardio (no jumping)', v: '3oitzTfujXs', t: 'v', mins: 17, p: ['quads', 'glutes', 'abs'], s: ['frontDelt', 'calves', 'obliques'],
    tip: 'كارديو واقف بمساحة صغيرة وبدون قفز. يرفع النبض بشكل لطيف.' },
  fit_heather: { n: 'هيت شامل (أقوى)', e: 'Heather Robertson · 15 min Full Body HIIT', v: 'DMHKgIZHZqM', t: 'v', mins: 16, p: ['quads', 'glutes', 'abs', 'chest'], s: ['frontDelt', 'triceps', 'hamstrings', 'calves'],
    tip: 'أقوى من الباقي وفيه قفز. جربيه بعد ما تتعودين، وتقدرين تبطّئين الحركات.' },
  core_madfit_beg: { n: 'كور للمبتدئين', e: 'MadFit · 10 min Beginner Total Core', v: 'eQdX2_k8FIM', t: 'v', mins: 12, p: ['abs', 'obliques'], s: ['lowerBack'],
    tip: 'تمارين كور هادية ومناسبة للبداية. ركّزي إن أسفل ظهرك ثابت.' },
  core_pamela: { n: 'بطن للمبتدئين', e: 'Pamela Reif · 10 min Beginner Ab Workout', v: '1f8yoFFdkcY', t: 'v', mins: 11, p: ['abs', 'obliques'], s: [],
    tip: 'من أشهر فيديوهات البطن للمبتدئين. إذا تعبتي ارتاحي ثواني وكمّلي.' },
  core_lilly: { n: 'بطن بيلاتس (عضلات عميقة)', e: 'Lilly Sabri · Pilates Deep Core', v: '-3bBBtWTbuc', t: 'v', mins: 12, p: ['abs'], s: ['obliques', 'lowerBack'],
    tip: 'بيلاتس بطيء يركّز على العضلات العميقة. ممتاز للشد والثبات.' },
  core_madfit: { n: 'بطن يومي (أصعب)', e: 'MadFit · 10 min Daily Abs', v: 'Dl8N_8UtWUU', t: 'v', mins: 11, p: ['abs', 'obliques'], s: ['lowerBack'],
    tip: 'أصعب من فيديوهات المبتدئين. جربيه بعد كم أسبوع.' },
  str_madfit: { n: 'إطالة يومية لكامل الجسم', e: 'MadFit · 10 min Daily Stretch', v: 'yLDAHd_C7G0', t: 'v', mins: 11, p: [], s: ['hamstrings', 'glutes', 'lowerBack', 'quads'],
    tip: 'إطالة هادية لكل الجسم. تنفّسي بعمق وما تضغطين لين الألم.' },
  str_adriene: { n: 'إطالة يوغا لكامل الجسم', e: 'Yoga With Adriene · Full Body Stretch', v: 'lxuTCHJSers', t: 'v', mins: 12, p: [], s: ['hamstrings', 'lowerBack', 'traps', 'glutes'],
    tip: 'يوغا خفيفة للإطالة والاسترخاء بعد التمرين.' },
  str_mady: { n: 'روتين مرونة يومي', e: 'Mady Morrison · 10 min Daily Mobility', v: '4pfCBO3BGvg', t: 'v', mins: 11, p: [], s: ['hamstrings', 'lowerBack', 'glutes', 'traps'],
    tip: 'حركات مرونة لكل المفاصل، مناسب لأي مستوى.' }
};

/* روتينات المدرب (فيديو كامل) */
const ROUTINES = {
  warm1: { n: 'إحماء كامل الجسم', v: 'HetOuOkFO64' },
  warm4: { n: 'إحماء كامل الجسم', v: 'A7z61Igj2zI' },
  warm5: { n: 'إحماء كامل الجسم', v: 'aC2aM_Tzj6s' },
  abs1: { n: 'تمارين بطن', v: 'XZ1OyIzMhgU' },
  abs3: { n: 'تمارين بطن', v: '9sx2A8I1_jM' },
  str4: { n: 'إطالة كامل الجسم', v: '3ZJ6ZOAOlvs' },
  str5: { n: 'إطالة كامل الجسم', v: '_et8yyc_g_E' },
  strLow: { n: 'إطالة الجزء السفلي', v: 'wgew1tTHNAo' }
};

/*
  كل يوم = إحماء + بلوكات + إطالة
  block.type: sets (مجموعات عادية) · circuit (دائرة: الحركات ورا بعض) · cardio
  slot: m = العضلة/الهدف · opts = الخيارات (الأول هو الأساسي الافتراضي) · reps = العدات · rest = الراحة بالثواني
*/
const DAYS = [
  {
    id: 'push', n: 'دفع', full: 'يوم الدفع', sub: 'صدر · أكتاف · ترايسبس', num: 1,
    warm: 'warm4', abs: 'abs3', stretch: 'str5',
    blocks: [
      { type: 'sets', title: 'التمارين', slots: [
        { id: 'pu1', m: 'الصدر', sets: 3, reps: '10–12', rest: 90, opts: ['chest_machine', 'db_press', 'bb_bench'] },
        { id: 'pu2', m: 'أعلى الصدر', sets: 3, reps: '10–12', rest: 75, opts: ['incline_machine', 'incline_db', 'incline_pushup'] },
        { id: 'pu3', m: 'تفتيح الصدر', sets: 3, reps: '12–15', rest: 60, opts: ['machine_fly', 'cable_cross', 'decline_machine'] },
        { id: 'pu4', m: 'الأكتاف', sets: 3, reps: '10–12', rest: 75, opts: ['shoulder_machine', 'db_shoulder'] },
        { id: 'pu5', m: 'الكتف الجانبي', sets: 3, reps: '12–15', rest: 60, opts: ['db_lateral', 'cable_lateral'] },
        { id: 'pu6', m: 'الترايسبس', sets: 3, reps: '12–15', rest: 60, opts: ['pushdown', 'overhead_tri'] }
      ] },
      { type: 'cardio', title: 'كارديو الحرق', slots: [
        { id: 'puC', m: 'كارديو', sets: 1, mins: 15, rest: 0, opts: ['treadmill', 'bike', 'elliptical'] }
      ] }
    ]
  },
  {
    id: 'pull', n: 'سحب', full: 'يوم السحب', sub: 'ظهر · كتف خلفي · بايسبس', num: 2,
    warm: 'warm1', abs: 'abs1', stretch: 'str4',
    blocks: [
      { type: 'sets', title: 'التمارين', slots: [
        { id: 'pl1', m: 'الظهر العريض', sets: 3, reps: '10–12', rest: 90, opts: ['lat_pulldown', 'close_pulldown', 'wide_pulldown', 'reverse_pulldown', 'assisted_pullup'] },
        { id: 'pl2', m: 'وسط الظهر', sets: 3, reps: '10–12', rest: 75, opts: ['seated_row', 'row_machine', 'seated_row_wide'] },
        { id: 'pl3', m: 'تجديف', sets: 3, reps: '10–12', rest: 75, opts: ['hammer_row', 'db_row', 'tbar', 'straight_pulldown'] },
        { id: 'pl4', m: 'الكتف الخلفي', sets: 3, reps: '12–15', rest: 60, opts: ['reverse_fly_machine', 'face_pull', 'cable_rear_fly'] },
        { id: 'pl5', m: 'البايسبس', sets: 3, reps: '10–12', rest: 60, opts: ['db_curl', 'hammer_curl', 'cable_curl', 'bb_curl', 'preacher'] },
        { id: 'pl6', m: 'أسفل الظهر', sets: 2, reps: '12–15', rest: 60, opts: ['back_ext', 'bird_dog'] }
      ] },
      { type: 'cardio', title: 'كارديو الحرق', slots: [
        { id: 'plC', m: 'كارديو', sets: 1, mins: 15, rest: 0, opts: ['treadmill', 'bike', 'elliptical'] }
      ] }
    ]
  },
  {
    id: 'legs', n: 'أرجل', full: 'يوم الأرجل', sub: 'أرداف · فخذ أمامي وخلفي', num: 3,
    warm: 'warm5', abs: 'abs3', stretch: 'strLow',
    blocks: [
      { type: 'sets', title: 'التمارين', slots: [
        { id: 'lg1', m: 'فخذ أمامي + أرداف', sets: 3, reps: '10–12', rest: 90, opts: ['leg_press', 'leg_press_seated', 'hack_squat', 'smith_hack', 'goblet_squat'] },
        { id: 'lg2', m: 'الفخذ الخلفي + أرداف', sets: 3, reps: '10–12', rest: 90, opts: ['rdl', 'db_deadlift'] },
        { id: 'lg3', m: 'الأرداف', sets: 3, reps: '10–12', rest: 75, opts: ['db_hip_thrust', 'hip_thrust_machine', 'bb_hip_thrust', 'db_glute_bridge', 'cable_kickback'] },
        { id: 'lg4', m: 'الفخذ الخلفي', sets: 3, reps: '12–15', rest: 60, opts: ['lying_curl', 'seated_curl'] },
        { id: 'lg5', m: 'الفخذ الأمامي', sets: 3, reps: '12–15', rest: 60, opts: ['leg_ext', 'reverse_lunge', 'step_up', 'walking_lunge'] },
        { id: 'lg6', m: 'جانب الورك', sets: 3, reps: '15', rest: 45, opts: ['abductor', 'cable_kickback'] },
        { id: 'lg7', m: 'إضافي', sets: 2, reps: '15', rest: 45, optional: true, opts: ['calf_standing', 'calf_legpress', 'adductor'] }
      ] },
      { type: 'cardio', title: 'كارديو الحرق', slots: [
        { id: 'lgC', m: 'كارديو', sets: 1, mins: 15, rest: 0, opts: ['treadmill', 'bike', 'elliptical'] }
      ] }
    ]
  },
  {
    id: 'full', n: 'شامل', full: 'شامل + لياقة + كور', sub: 'كامل الجسم · بطن · كارديو', num: 4,
    warm: 'warm4', abs: null, stretch: 'str5',
    modes: {
    circuit: [
      { type: 'circuit', title: 'دائرة كامل الجسم', rounds: 3, restRound: 90, foundation: true,
        note: 'نفّذي الحركات الخمس ورا بعض بأقل راحة، وبعدها ارتاحي دقيقة ونص. هذي جولة.', slots: [
        { id: 'fb1', m: 'سكوات', reps: '12', opts: ['goblet_squat', 'bw_squat', 'sumo_squat'] },
        { id: 'fb2', m: 'ضغط', reps: '10', opts: ['incline_pushup', 'knee_pushup', 'db_press'] },
        { id: 'fb3', m: 'سحب', reps: '12', opts: ['db_bent_row', 'db_row', 'seated_row'] },
        { id: 'fb4', m: 'لانجز / ورك', reps: '10', side: true, opts: ['reverse_lunge', 'step_up', 'walking_lunge', 'db_deadlift'] },
        { id: 'fb5', m: 'لياقة', secs: 30, opts: ['mountain_climber'] }
      ] },
      { type: 'circuit', title: 'الكور', rounds: 2, restRound: 45, foundation: false,
        note: 'أربع حركات ورا بعض، بعدها راحة ٤٥ ثانية.', slots: [
        { id: 'cr1', m: 'ثبات البطن', secs: 30, opts: ['plank', 'knee_plank'] },
        { id: 'cr2', m: 'البطن', reps: '10', side: true, opts: ['dead_bug', 'bird_dog', 'reverse_crunch'] },
        { id: 'cr3', m: 'الخواصر', reps: '12', side: true, opts: ['bicycle', 'russian_twist'] },
        { id: 'cr4', m: 'الجوانب', secs: 20, side: true, opts: ['side_plank'] }
      ] },
      { type: 'cardio', title: 'كارديو', slots: [
        { id: 'fbC', m: 'كارديو', sets: 1, mins: 20, rest: 0, opts: ['treadmill', 'bike', 'elliptical'] }
      ] }
    ],
    video: [
      { type: 'video', title: 'لياقة شاملة', note: 'فيديو متابعة: شغّليه وسوّي الحركات مع المدربة.', slots: [
        { id: 'fvA', m: 'لياقة شاملة', opts: ['fit_madfit', 'fit_jo', 'fit_madfit15', 'fit_heather'] }
      ] },
      { type: 'video', title: 'كور', slots: [
        { id: 'fvB', m: 'كور', opts: ['core_madfit_beg', 'core_pamela', 'core_lilly', 'core_madfit'] }
      ] },
      { type: 'video', title: 'إطالة', slots: [
        { id: 'fvC', m: 'إطالة', opts: ['str_madfit', 'str_adriene', 'str_mady'] }
      ] },
      { type: 'cardio', title: 'كارديو إضافي', slots: [
        { id: 'fvD', m: 'كارديو', sets: 1, mins: 15, rest: 0, optional: true, opts: ['treadmill', 'bike', 'elliptical'] }
      ] }
    ]
    }
  }
];

const TIPS = [
  'البروتين في كل وجبة يساعد على الشبع ويحافظ على العضل وأنتي تنشّفين.',
  'المشي اليومي (٧–١٠ آلاف خطوة) يفرق كثير في الحرق، حتى بأيام الراحة.',
  'النوم ٧–٨ ساعات جزء من البرنامج، مو رفاهية.',
  'اشربي مويا كفاية، خصوصًا قبل وبعد التمرين.',
  'الميزان يتذبذب يوميًا. قيسي مرة بالأسبوع بنفس اليوم والوقت، الصبح قبل الأكل.',
  'المقاسات (الخصر والورك) تبين التغيير أحيانًا قبل الميزان.',
  'الحركة الصحيحة أهم من الوزن الثقيل، خصوصًا أول شهر.',
  'إذا حسيتي بألم حاد (مو تعب عضل) وقّفي الحركة وبدّليها.',
  'الثبات يغلب الحماس: ٤ أيام كل أسبوع لمدة ٣ شهور تغيّر الجسم.',
  'زيدي الوزن لما تقدرين تكملين أعلى عدد عدات في كل المجموعات بشكل صحيح.'
];

/* أسماء التمارين بالإنجليزي (بدون ترجمة) */
for (const k in EX) { const x = EX[k]; x.ar = x.n; x.n = x.t === 'v' ? x.e.split(' · ')[1] : x.e; x.ch = x.t === 'v' ? x.e.split(' · ')[0] : ''; }
