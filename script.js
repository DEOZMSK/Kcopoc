const GUNA_KEYS = ["sat", "raj", "tam"];
const KEY_TO_INDEX = { sat: 0, raj: 1, tam: 2 };

const BLEND_MATRICES = [
  {
    name: "spiral",
    matrix: [
      [0.62, 0.28, 0.1],
      [0.23, 0.57, 0.2],
      [0.18, 0.27, 0.55]
    ]
  },
  {
    name: "mirror",
    matrix: [
      [0.55, 0.35, 0.1],
      [0.2, 0.6, 0.2],
      [0.24, 0.26, 0.5]
    ]
  },
  {
    name: "veil",
    matrix: [
      [0.48, 0.32, 0.2],
      [0.28, 0.5, 0.22],
      [0.22, 0.3, 0.48]
    ]
  },
  {
    name: "ember",
    matrix: [
      [0.5, 0.4, 0.1],
      [0.18, 0.54, 0.28],
      [0.25, 0.32, 0.43]
    ]
  },
  {
    name: "prism",
    matrix: [
      [0.45, 0.3, 0.25],
      [0.3, 0.45, 0.25],
      [0.22, 0.25, 0.53]
    ]
  }
];

function buildMatrixDeck(total) {
  const base = [];
  while (base.length < total) {
    base.push(...shuffleArray(BLEND_MATRICES));
  }
  return base.slice(0, total);
}

function mixScoresWithMatrix(scores = {}, matrix) {
  const result = { sat: 0, raj: 0, tam: 0 };
  if (!matrix) {
    GUNA_KEYS.forEach((key) => {
      result[key] = scores?.[key] ?? 0;
    });
    return result;
  }

  Object.entries(scores).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(KEY_TO_INDEX, key)) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] += value;
      }
      return;
    }

    const row = matrix[KEY_TO_INDEX[key]];
    GUNA_KEYS.forEach((guna, index) => {
      result[guna] += value * row[index];
    });
  });

  return result;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createFlowState() {
  return {
    phase: {
      sat: Math.random() * Math.PI * 2,
      raj: Math.random() * Math.PI * 2,
      tam: Math.random() * Math.PI * 2
    },
    speed: {
      sat: 0.08 + Math.random() * 0.05,
      raj: 0.08 + Math.random() * 0.05,
      tam: 0.08 + Math.random() * 0.05
    },
    intensity: 0.12 + Math.random() * 0.05
  };
}

function computeModulation(flow) {
  const factors = {};
  GUNA_KEYS.forEach((key) => {
    flow.phase[key] += flow.speed[key];
    factors[key] = 1 + Math.sin(flow.phase[key]) * flow.intensity;
  });
  return factors;
}

function updateFlow(flow, contributions) {
  const total = GUNA_KEYS.reduce((sum, key) => sum + contributions[key], 0);
  if (total <= 0) {
    return;
  }

  GUNA_KEYS.forEach((key, index) => {
    const nextKey = GUNA_KEYS[(index + 1) % GUNA_KEYS.length];
    const ratio = contributions[nextKey] / total;
    const adjusted = flow.speed[key] * 0.72 + ratio * 0.28;
    flow.speed[key] = clamp(adjusted, 0.05, 0.22);
  });

  const dominant = GUNA_KEYS.reduce((prev, key) =>
    contributions[key] > contributions[prev] ? key : prev,
  GUNA_KEYS[0]);

  const dominantShare = contributions[dominant] / total;
  flow.intensity = clamp(flow.intensity * 0.85 + dominantShare * 0.18, 0.08, 0.24);
}

const BASE_QUIZ = [
  {
    question: "Ночной прибой шепчет у базальтовой пристани. Перед тобой алтарь с дарами.",
    answers: [
      { text: "🌿 Сложить дары обратно и прошептать благодарность.", scores: { sat: 3 } },
      { text: "🔥 Забрать жезл — пригодится при переговорах.", scores: { raj: 3, sat: 1 } },
      { text: "☾ Под шум волн спрятать всё в свой мешок.", scores: { tam: 3 } },
      { text: "⚖️ Взять только свечу и передать её ближайшему стражу.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Ты входишь в храмовую библиотеку: свитки пахнут пеплом, хранитель ждёт решения по редкой книге.",
    answers: [
      { text: "🌿 Оставить свиток и помочь переписчику до рассвета.", scores: { sat: 3 } },
      { text: "🔥 Выкупить книгу и изучить тайну первым.", scores: { raj: 3 } },
      { text: "☾ Спрятать находку, чтобы никто не отвлёк тебя снами.", scores: { tam: 2, raj: 1 } },
      { text: "⚖️ Обменять книгу на услуги мастера зачарования.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "У стойбища перегруженный вьючный зверь валится на бок. Караванщик зовёт на помощь.",
    answers: [
      { text: "🌿 Перевязать сумы и проводить их до ближайшего лагеря.", scores: { sat: 3 } },
      { text: "🔥 Поторговаться за оплату и помочь быстро.", scores: { raj: 3 } },
      { text: "☾ Указать на проблему и уйти до рассвета.", scores: { tam: 2 } },
      { text: "⚖️ Поделиться лечащим зельем и идти дальше своим путём.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Шкуры в охотничьем лагере разорваны штормом. Кто-то должен взять ночную вахту.",
    answers: [
      { text: "🌿 Остаёшься сторожить, согревая костёр молитвами.", scores: { sat: 2, raj: 1 } },
      { text: "🔥 Организуешь караул и распределяешь награду.", scores: { raj: 3 } },
      { text: "☾ Под шум дождя исчезаешь с лучшей шкурой.", scores: { tam: 3 } },
      { text: "🜂 Предлагаешь выследить виновников немедля.", scores: { raj: 2, tam: 1 } }
    ]
  },
  {
    question: "Утренний базар гудит. Старуха просит отнести свёрток до дома на холме.",
    answers: [
      { text: "🌿 Нести свёрток медленно, слушая её историю.", scores: { sat: 3 } },
      { text: "🔥 Согласиться за монету и бежать короткой дорогой.", scores: { raj: 3 } },
      { text: "☾ Подменить содержимое, чтобы разобраться позже.", scores: { tam: 3 } },
      { text: "⚖️ Найти ученика гильдии и поручить работу ему.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "На плацу арканы вспыхнула дуэль магов. Нужно решить, вмешиваться ли в спор.",
    answers: [
      { text: "🌿 Встать между ними, закрывая обе стороны щитом.", scores: { sat: 3 } },
      { text: "🔥 Поддержать сильнейшего и предложить союз.", scores: { raj: 3 } },
      { text: "☾ Разжечь спор, шепча каждому яд сомнений.", scores: { tam: 3 } },
      { text: "⚖️ Напомнить им о кодексе и отвести в гильдию.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В пепельной буре путник теряет ориентацию. Его факел гаснет.",
    answers: [
      { text: "🌿 Отдать свой светильник и сопровождать до убежища.", scores: { sat: 3 } },
      { text: "🔥 Продать факел, если он обещает услугу.", scores: { raj: 2, sat: 1 } },
      { text: "☾ Указать неверную тропу и скрыться во мраке.", scores: { tam: 3 } },
      { text: "🜂 Предложить держаться рядом и ускорить шаг.", scores: { raj: 2 } }
    ]
  },
  {
    question: "В трактире на распутье спорят о древнем пророчестве. Слово за тобой.",
    answers: [
      { text: "🌿 Напомнить о милосердии и тихой вере.", scores: { sat: 3 } },
      { text: "🔥 Сформировать толпу сторонников и вести их на площадь.", scores: { raj: 3 } },
      { text: "☾ Высмеять пророчество и разбросать слухи.", scores: { tam: 3 } },
      { text: "⚖️ Перевести разговор на новости торговли.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В глубокой пещере мерцает синий кристалл. Он поёт силами, что спят веками.",
    answers: [
      { text: "🌿 Оставить кристалл и очистить алтарь от тьмы.", scores: { sat: 3 } },
      { text: "🔥 Забрать камень ради новых чар.", scores: { raj: 3 } },
      { text: "☾ Разбить кристалл и впитать его дым.", scores: { tam: 3 } },
      { text: "⚖️ Запечатать вход и записать координаты для ордена.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "У придорожной корчмы бродяга просит тёплый плащ перед грозой.",
    answers: [
      { text: "🌿 Снять свой плащ и накинуть ему на плечи.", scores: { sat: 3 } },
      { text: "🔥 Одолжить плащ за клятву, что вернёт с прибылью.", scores: { raj: 2, sat: 1 } },
      { text: "☾ Оттолкнуть его, чтобы не привлёк стражу.", scores: { tam: 3 } },
      { text: "🜂 Указать дорогу к складу и пойти по своим делам.", scores: { raj: 2 } }
    ]
  },
  {
    question: "В старом подземелье ты находишь сердце автомата и дневник мастера.",
    answers: [
      { text: "🌿 Отнести дневник в храм, чтобы знания служили миру.", scores: { sat: 3 } },
      { text: "🔥 Продать сердце и вложить деньги в гильдию.", scores: { raj: 3 } },
      { text: "☾ Оживить автомат и поставить его на стражу своих дел.", scores: { tam: 3 } },
      { text: "⚖️ Разделить находку между союзниками.", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "На мосту толпа окружила раненого стража.",
    answers: [
      { text: "🌿 Перевязать рану и успокоить людей.", scores: { sat: 3 } },
      { text: "🔥 Собрать добровольцев и устроить погоню за виновником.", scores: { raj: 3 } },
      { text: "☾ Обшарить карманы, пока все отвлечены.", scores: { tam: 3 } },
      { text: "⚖️ Передать командование ближайшему офицеру.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "На ярмарке ты выигрываешь редкий амулет. Толпа требует передать его городу.",
    answers: [
      { text: "🌿 Пожертвовать амулет храму и поблагодарить людей.", scores: { sat: 3 } },
      { text: "🔥 Устроить торги и выбрать лучшую ставку.", scores: { raj: 3 } },
      { text: "☾ Спрятать амулет под плащ и раствориться в людях.", scores: { tam: 3 } },
      { text: "⚖️ Оставить амулет себе, но пообещать оберегать город.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Перед воротами стоит голодный ребёнок и смотрит на твой мешок сухарей.",
    answers: [
      { text: "🌿 Поделиться и дождаться, пока он насытится.", scores: { sat: 3 } },
      { text: "🔥 Вручить половину в обмен на помощь по делам.", scores: { raj: 2, sat: 1 } },
      { text: "☾ Уйти быстрее, чтобы его вид не тревожил сердце.", scores: { tam: 2 } },
      { text: "🜂 Отправить его к караванщикам, не задерживаясь.", scores: { raj: 2 } }
    ]
  },
  {
    question: "В подвале дома обнаружен тайный клуб. Они просят держать всё в секрете.",
    answers: [
      { text: "🌿 Разоблачить клуб и защитить соседей.", scores: { sat: 3 } },
      { text: "🔥 Присоединиться ради влияния и связей.", scores: { raj: 3 } },
      { text: "☾ Использовать их для своих теневых поручений.", scores: { tam: 3 } },
      { text: "⚖️ Предложить им официальный контракт с гильдией.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В подземных каналах слышно плач привидения. Оно просит завершить незаконченный ритуал.",
    answers: [
      { text: "🌿 Помочь духу обрести покой, забыв о награде.", scores: { sat: 3 } },
      { text: "🔥 Завершить ритуал за обещанное золото.", scores: { raj: 3 } },
      { text: "☾ Связать дух и использовать в своих делах.", scores: { tam: 3 } },
      { text: "⚖️ Позвать жрецов и разделить ответственность.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Городская фракция предлагает убрать твоего соперника за плату.",
    answers: [
      { text: "🌿 Отказаться и предупредить соперника об угрозе.", scores: { sat: 3 } },
      { text: "🔥 Договориться, чтобы устранить его законно.", scores: { raj: 3 } },
      { text: "☾ Подписать контракт, не задавая вопросов.", scores: { tam: 4 } },
      { text: "⚖️ Использовать информацию, чтобы укрепить свой статус без крови.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В заброшенных руинах твой спутник ранен ловушкой. Времени мало.",
    answers: [
      { text: "🌿 Нести его до выхода, даже если путь удлинится.", scores: { sat: 4 } },
      { text: "🔥 Оставить с зельем и продолжить миссию.", scores: { raj: 3, sat: 1 } },
      { text: "☾ Забрать его артефакты и идти дальше одному.", scores: { tam: 4 } },
      { text: "🜂 Скрыть спутника и вернуться с подмогой позже.", scores: { sat: 2, raj: 2 } }
    ]
  },
  {
    question: "На городской площади спорят, закрывать ли врата ночью.",
    answers: [
      { text: "🌿 Убедить совет дать приют всем путникам.", scores: { sat: 3 } },
      { text: "🔥 Предложить платный вход и усиленную охрану.", scores: { raj: 3 } },
      { text: "☾ Потребовать казни тех, кто возражает.", scores: { tam: 3 } },
      { text: "⚖️ Найти компромисс: убежище в храме и караулы у ворот.", scores: { sat: 2, raj: 2 } }
    ]
  },
  {
    question: "Во сне незнакомая богиня протягивает три луча света, каждый обещает новую судьбу.",
    answers: [
      { text: "🌿 Принять луч милосердия и служить исцелением.", scores: { sat: 4 } },
      { text: "🔥 Выбрать луч власти и вести людей в бой.", scores: { raj: 4 } },
      { text: "☾ Тянуться к лучу забвения и раствориться в тишине.", scores: { tam: 4 } },
      { text: "⚖️ Переплести лучи, пытаясь удержать баланс.", scores: { sat: 2, raj: 2, tam: 1 } }
    ]
  },
  {
    question: "У подножия пылающей горы слышен шёпот, обещающий силу за одну клятву.",
    answers: [
      { text: "🌿 Отказать и засыпать вход пеплом.", scores: { sat: 3 } },
      { text: "🔥 Выторговать помощь для своего дела.", scores: { raj: 3 } },
      { text: "☾ Принять клятву, не интересуясь ценой.", scores: { tam: 4 } },
      { text: "🜂 Записать всё в дневник и доложить жрецам.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "У ворот поселения чужеземец просит пропустить его к святыне, стражи сомневаются.",
    answers: [
      { text: "🌿 Заступиться и ручаться за его намерения.", scores: { sat: 3 } },
      { text: "🔥 Устроить проверку и сопроводить за плату.", scores: { raj: 3 } },
      { text: "☾ Подстрекать стражу изгнать пришельца силой.", scores: { tam: 3 } },
      { text: "⚖️ Предложить помощь жрецов для испытания веры.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В порту контрабандисты предлагают редкий металл ночью.",
    answers: [
      { text: "🌿 Сообщить о сделке храму и очистить причал.", scores: { sat: 3 } },
      { text: "🔥 Выбить долю и наладить доставку в гильдию.", scores: { raj: 3 } },
      { text: "☾ Скрыть товар для себя и исчезнуть на лодке.", scores: { tam: 4 } },
      { text: "🜂 Договориться о пошлине и легализовать торг.", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "Алхимик просит испытать зелье, меняющее память на час.",
    answers: [
      { text: "🌿 Отказаться и пожелать ему благоразумия.", scores: { sat: 3 } },
      { text: "🔥 Принять зелье и использовать эффект в переговорах.", scores: { raj: 3 } },
      { text: "☾ Выпить дважды, чтобы спрятать своё прошлое.", scores: { tam: 4 } },
      { text: "⚖️ Найти добровольца среди телепатов гильдии.", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "На тёмном берегу рыбаки нашли камень, излучающий ночное сияние.",
    answers: [
      { text: "🌿 Отнести камень в святилище и поблагодарить богиню.", scores: { sat: 3 } },
      { text: "🔥 Превратить находку в талисман торговли.", scores: { raj: 3 } },
      { text: "☾ Ночью сбросить камень в бездну, чтобы никто не увидел.", scores: { tam: 3 } },
      { text: "🜂 Разделить камень и дать долю общине.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Пепельные кочевники просят провести их через чужие земли.",
    answers: [
      { text: "🌿 Договориться о мире и идти с ними.", scores: { sat: 3 } },
      { text: "🔥 Использовать их знания пустоши за услугу.", scores: { raj: 3 } },
      { text: "☾ Продать маршрут врагам и исчезнуть.", scores: { tam: 4 } },
      { text: "⚖️ Отправить письмо совету и ждать ответа.", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "В таверне бард поёт сатиру про храм, толпа смеётся.",
    answers: [
      { text: "🌿 Попросить сменить тему, сохранив его честь.", scores: { sat: 3 } },
      { text: "🔥 Пригласить его выступать в своей корчме.", scores: { raj: 3 } },
      { text: "☾ Подлить вина, чтобы песня стала ещё грубее.", scores: { tam: 3 } },
      { text: "🜂 Предложить новый балладный дуэт о героях.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В ледяном гроте чудится голос древнего воина, просящий отомстить.",
    answers: [
      { text: "🌿 Похоронить останки и вознести молитву.", scores: { sat: 3 } },
      { text: "🔥 Принять поручение и искать врага ради славы.", scores: { raj: 3 } },
      { text: "☾ Разбудить дух для собственной стражи.", scores: { tam: 4 } },
      { text: "⚖️ Записать историю и отнести её сказителям.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Арканист предлагает запечатать твою тень ради защиты от проклятий.",
    answers: [
      { text: "🌿 Отказаться: душа должна оставаться свободной.", scores: { sat: 3 } },
      { text: "🔥 Согласиться за возможность избегать ловушек.", scores: { raj: 3 } },
      { text: "☾ Оборвать договор и унести печать себе.", scores: { tam: 3 } },
      { text: "🜂 Изучить ритуал и поделиться с союзниками.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В архиве найден список должников гильдии.",
    answers: [
      { text: "🌿 Списать долги сирот и больных.", scores: { sat: 3 } },
      { text: "🔥 Использовать список, чтобы усилить своё влияние.", scores: { raj: 3 } },
      { text: "☾ Продать данные контрабандистам.", scores: { tam: 4 } },
      { text: "⚖️ Переговорить с должниками и составить новый график.", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "Старый пахарь потерял землю из-за долгов и просит совета.",
    answers: [
      { text: "🌿 Собрать деревню и вернуть ему поле.", scores: { sat: 3 } },
      { text: "🔥 Вложить деньги и взять его в долю.", scores: { raj: 3 } },
      { text: "☾ Использовать его историю как угрозу другим должникам.", scores: { tam: 3 } },
      { text: "🜂 Написать прошение в совет и добиться отсрочки.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Мастер дуэли предлагает устроить показательный поединок ради славы дома.",
    answers: [
      { text: "🌿 Отказаться и предложить мирный турнир.", scores: { sat: 3 } },
      { text: "🔥 Принять вызов и собрать зрителей.", scores: { raj: 3 } },
      { text: "☾ Подсыпать яд в оружие противника.", scores: { tam: 4 } },
      { text: "🜂 Договориться о тренировке для молодых воинов.", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Деревню мучают сны об огненном звере.",
    answers: [
      { text: "🌿 Провести очищающий обряд и успокоить людей.", scores: { sat: 3 } },
      { text: "🔥 Найти зверя и превратить его легенду в ярмарку.", scores: { raj: 3 } },
      { text: "☾ Усилить страх и продавать защитные талисманы.", scores: { tam: 4 } },
      { text: "🜂 Отправить разведку и поделиться знаниями с соседями.", scores: { sat: 2, raj: 1 } }
    ]
  }
];


const GROUPS = {
  sat: {
    title: "Свет",
    text: "Ты несёшь ясность и мягкое влияние. Даже в пепельной буре видишь дорогу для всех.",
    link: "https://t.me/+SNNjufNTtGJhMDI6"
  },
  raj: {
    title: "Огонь",
    text: "Ты питаешься движением и победами. Мир вокруг загорается, когда ты принимаешь решение.",
    link: "https://t.me/+B-mozvEpxM5kZjVi"
  },
  tam: {
    title: "Ночь",
    text: "Тишина и глубина твои союзники. Ты умеешь прятать следы и слушать голос мрака.",
    link: "https://t.me/+K8aDzjYAsOg3Y2Fi"
  }
};

const tieBreakOrder = ["sat", "raj", "tam"];

const app = {
  start: document.getElementById("screen-start"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
  btnStart: document.getElementById("btn-start"),
  btnRestart: document.getElementById("btn-restart"),
  qContainer: document.getElementById("question-container"),
  resultTitle: document.getElementById("result-title"),
  resultText: document.getElementById("result-text"),
  resultStats: document.getElementById("result-stats"),
  resultLink: document.getElementById("result-link")
};

let state = {
  index: 0,
  score: { sat: 0, raj: 0, tam: 0 },
  quiz: [],
  flow: createFlowState()
};

function shuffleArray(source) {
  const array = source.slice();
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showScreen(element) {
  [app.start, app.quiz, app.result].forEach((screen) => screen.classList.remove("active"));
  element.classList.add("active");
}

function startQuiz() {
  const totalAnswers = BASE_QUIZ.reduce((acc, question) => acc + question.answers.length, 0);
  const matrixDeck = buildMatrixDeck(totalAnswers);
  let deckIndex = 0;

  state = {
    index: 0,
    score: { sat: 0, raj: 0, tam: 0 },
    flow: createFlowState(),
    quiz: shuffleArray(BASE_QUIZ).map((question) => ({
      ...question,
      answers: shuffleArray(question.answers).map((answer) => {
        const blend = matrixDeck[deckIndex % matrixDeck.length];
        deckIndex += 1;
        return {
          ...answer,
          appliedScores: mixScoresWithMatrix(answer.scores, blend.matrix)
        };
      })
    }))
  };

  showScreen(app.quiz);
  renderQuestion();
}

function renderQuestion() {
  const question = state.quiz[state.index];
  app.qContainer.innerHTML = "";

  const progress = document.createElement("p");
  progress.className = "question-progress";
  progress.textContent = `Вопрос ${state.index + 1} из ${state.quiz.length}`;

  const title = document.createElement("h2");
  title.textContent = question.question;

  const answersWrap = document.createElement("div");
  answersWrap.className = "answers";

  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer.text;
    btn.addEventListener("click", () => selectAnswer(answer));
    answersWrap.appendChild(btn);
  });

  app.qContainer.append(progress, title, answersWrap);
}

function selectAnswer(answer) {
  if (!state.flow) {
    state.flow = createFlowState();
  }

  const baseScores = answer.appliedScores ?? mixScoresWithMatrix(answer.scores, null);
  const modulation = computeModulation(state.flow);
  const contributions = { sat: 0, raj: 0, tam: 0 };

  GUNA_KEYS.forEach((key) => {
    const baseValue = baseScores?.[key] ?? 0;
    const finalValue = baseValue * modulation[key];
    state.score[key] += finalValue;
    contributions[key] = finalValue;
  });

  updateFlow(state.flow, contributions);

  state.index += 1;
  if (state.index < state.quiz.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const normalized = {};
  let total = 0;

  GUNA_KEYS.forEach((key) => {
    const value = state.score[key];
    const normalizedValue = Math.sqrt(Math.max(0, value));
    normalized[key] = normalizedValue;
    total += normalizedValue;
  });

  const sorted = GUNA_KEYS.slice().sort((a, b) => {
    if (normalized[b] !== normalized[a]) {
      return normalized[b] - normalized[a];
    }
    if (state.score[b] !== state.score[a]) {
      return state.score[b] - state.score[a];
    }
    return tieBreakOrder.indexOf(a) - tieBreakOrder.indexOf(b);
  });

  const winner = sorted[0];
  const group = GROUPS[winner];

  const percentages = {};
  GUNA_KEYS.forEach((key) => {
    const percent = total === 0 ? 0 : Math.round((normalized[key] / total) * 100);
    percentages[key] = percent;
  });

  app.resultTitle.textContent = group.title;
  app.resultText.textContent = group.text;
  app.resultStats.textContent = `${GROUPS.sat.title}: ${percentages.sat}% · ${GROUPS.raj.title}: ${percentages.raj}% · ${GROUPS.tam.title}: ${percentages.tam}%`;
  app.resultLink.href = group.link;

  showScreen(app.result);
}

app.btnStart.addEventListener("click", startQuiz);
app.btnRestart.addEventListener("click", startQuiz);
