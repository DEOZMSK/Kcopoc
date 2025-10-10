const GUNA_KEYS = ["sat", "raj", "tam"];

const TAG_TO_GUNA = {
  compassion: { sat: 1.3, raj: 0.9, tam: 0.7 },
  power: { sat: 0.85, raj: 1.2, tam: 0.9 },
  secrecy: { sat: 0.8, raj: 0.9, tam: 1.2 },
  balance: { sat: 1.15, raj: 1.05, tam: 0.9 },
  action: { sat: 0.95, raj: 1.15, tam: 0.95 },
  chaos: { sat: 0.7, raj: 1.0, tam: 1.25 },
  neutral: { sat: 1, raj: 1, tam: 1 }
};

const BASE_QUIZ = [
  {
    question: "Ночной прибой шепчет у базальтовой пристани. Перед тобой алтарь с дарами.",
    answers: [
      { text: "Сложить дары обратно и прошептать благодарность.", tag: "compassion", scores: { sat: 3 } },
      { text: "Забрать жезл — пригодится при переговорах.", tag: "power", scores: { raj: 3, sat: 1 } },
      { text: "Под шум волн спрятать всё в свой мешок.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Взять только свечу и передать её ближайшему стражу.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Ты входишь в храмовую библиотеку: свитки пахнут пеплом, хранитель ждёт решения по редкой книге.",
    answers: [
      { text: "Оставить свиток и помочь переписчику до рассвета.", tag: "compassion", scores: { sat: 3 } },
      { text: "Выкупить книгу и изучить тайну первым.", tag: "power", scores: { raj: 3 } },
      { text: "Спрятать находку, чтобы никто не отвлёк тебя снами.", tag: "secrecy", scores: { tam: 2, raj: 1 } },
      { text: "Обменять книгу на услуги мастера зачарования.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "У стойбища перегруженный вьючный зверь валится на бок. Караванщик зовёт на помощь.",
    answers: [
      { text: "Перевязать сумы и проводить их до ближайшего лагеря.", tag: "compassion", scores: { sat: 3 } },
      { text: "Поторговаться за оплату и помочь быстро.", tag: "power", scores: { raj: 3 } },
      { text: "Указать на проблему и уйти до рассвета.", tag: "secrecy", scores: { tam: 2 } },
      { text: "Поделиться лечащим зельем и идти дальше своим путём.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Шкуры в охотничьем лагере разорваны штормом. Кто-то должен взять ночную вахту.",
    answers: [
      { text: "Остаёшься сторожить, согревая костёр молитвами.", tag: "compassion", scores: { sat: 2, raj: 1 } },
      { text: "Организуешь караул и распределяешь награду.", tag: "power", scores: { raj: 3 } },
      { text: "Под шум дождя исчезаешь с лучшей шкурой.", tag: "chaos", scores: { tam: 3 } },
      { text: "Предлагаешь выследить виновников немедля.", tag: "action", scores: { raj: 2, tam: 1 } }
    ]
  },
  {
    question: "Утренний базар гудит. Старуха просит отнести свёрток до дома на холме.",
    answers: [
      { text: "Нести свёрток медленно, слушая её историю.", tag: "compassion", scores: { sat: 3 } },
      { text: "Согласиться за монету и бежать короткой дорогой.", tag: "action", scores: { raj: 3 } },
      { text: "Подменить содержимое, чтобы разобраться позже.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Найти ученика гильдии и поручить работу ему.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "На плацу арканы вспыхнула дуэль магов. Нужно решить, вмешиваться ли в спор.",
    answers: [
      { text: "Встать между ними, закрывая обе стороны щитом.", tag: "compassion", scores: { sat: 3 } },
      { text: "Поддержать сильнейшего и предложить союз.", tag: "power", scores: { raj: 3 } },
      { text: "Разжечь спор, шепча каждому яд сомнений.", tag: "chaos", scores: { tam: 3 } },
      { text: "Напомнить им о кодексе и отвести в гильдию.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В пепельной буре путник теряет ориентацию. Его факел гаснет.",
    answers: [
      { text: "Отдать свой светильник и сопровождать до убежища.", tag: "compassion", scores: { sat: 3 } },
      { text: "Продать факел, если он обещает услугу.", tag: "power", scores: { raj: 2, sat: 1 } },
      { text: "Указать неверную тропу и скрыться во мраке.", tag: "chaos", scores: { tam: 3 } },
      { text: "Предложить держаться рядом и ускорить шаг.", tag: "action", scores: { raj: 2 } }
    ]
  },
  {
    question: "В трактире на распутье спорят о древнем пророчестве. Слово за тобой.",
    answers: [
      { text: "Напомнить о милосердии и тихой вере.", tag: "compassion", scores: { sat: 3 } },
      { text: "Сформировать толпу сторонников и вести их на площадь.", tag: "power", scores: { raj: 3 } },
      { text: "Высмеять пророчество и разбросать слухи.", tag: "chaos", scores: { tam: 3 } },
      { text: "Перевести разговор на новости торговли.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В глубокой пещере мерцает синий кристалл. Он поёт силами, что спят веками.",
    answers: [
      { text: "Оставить кристалл и очистить алтарь от тьмы.", tag: "compassion", scores: { sat: 3 } },
      { text: "Забрать камень ради новых чар.", tag: "power", scores: { raj: 3 } },
      { text: "Разбить кристалл и впитать его дым.", tag: "chaos", scores: { tam: 3 } },
      { text: "Запечатать вход и записать координаты для ордена.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "У придорожной корчмы бродяга просит тёплый плащ перед грозой.",
    answers: [
      { text: "Снять свой плащ и накинуть ему на плечи.", tag: "compassion", scores: { sat: 3 } },
      { text: "Одолжить плащ за клятву, что вернёт с прибылью.", tag: "balance", scores: { raj: 2, sat: 1 } },
      { text: "Оттолкнуть его, чтобы не привлёк стражу.", tag: "chaos", scores: { tam: 3 } },
      { text: "Указать дорогу к складу и пойти по своим делам.", tag: "action", scores: { raj: 2 } }
    ]
  },
  {
    question: "В старом подземелье ты находишь сердце автомата и дневник мастера.",
    answers: [
      { text: "Отнести дневник в храм, чтобы знания служили миру.", tag: "compassion", scores: { sat: 3 } },
      { text: "Продать сердце и вложить деньги в гильдию.", tag: "power", scores: { raj: 3 } },
      { text: "Оживить автомат и поставить его на стражу своих дел.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Разделить находку между союзниками.", tag: "balance", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "На мосту толпа окружила раненого стража.",
    answers: [
      { text: "Перевязать рану и успокоить людей.", tag: "compassion", scores: { sat: 3 } },
      { text: "Собрать добровольцев и устроить погоню за виновником.", tag: "action", scores: { raj: 3 } },
      { text: "Обшарить карманы, пока все отвлечены.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Передать командование ближайшему офицеру.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "На ярмарке ты выигрываешь редкий амулет. Толпа требует передать его городу.",
    answers: [
      { text: "Пожертвовать амулет храму и поблагодарить людей.", tag: "compassion", scores: { sat: 3 } },
      { text: "Устроить торги и выбрать лучшую ставку.", tag: "power", scores: { raj: 3 } },
      { text: "Спрятать амулет под плащ и раствориться в людях.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Оставить амулет себе, но пообещать оберегать город.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Перед воротами стоит голодный ребёнок и смотрит на твой мешок сухарей.",
    answers: [
      { text: "Поделиться и дождаться, пока он насытится.", tag: "compassion", scores: { sat: 3 } },
      { text: "Вручить половину в обмен на помощь по делам.", tag: "balance", scores: { raj: 2, sat: 1 } },
      { text: "Уйти быстрее, чтобы его вид не тревожил сердце.", tag: "secrecy", scores: { tam: 2 } },
      { text: "Отправить его к караванщикам, не задерживаясь.", tag: "action", scores: { raj: 2 } }
    ]
  },
  {
    question: "В подвале дома обнаружен тайный клуб. Они просят держать всё в секрете.",
    answers: [
      { text: "Разоблачить клуб и защитить соседей.", tag: "compassion", scores: { sat: 3 } },
      { text: "Присоединиться ради влияния связей.", tag: "power", scores: { raj: 3 } },
      { text: "Использовать их для своих теневых поручений.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Предложить им официальный контракт с гильдией.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В подземных каналах слышно плач привидения. Оно просит завершить незаконченный ритуал.",
    answers: [
      { text: "Помочь духу обрести покой, забыв о награде.", tag: "compassion", scores: { sat: 3 } },
      { text: "Завершить ритуал за обещанное золото.", tag: "power", scores: { raj: 3 } },
      { text: "Связать дух и использовать в своих делах.", tag: "chaos", scores: { tam: 3 } },
      { text: "Позвать жрецов и разделить ответственность.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Городская фракция предлагает убрать твоего соперника за плату.",
    answers: [
      { text: "Отказаться и предупредить соперника об угрозе.", tag: "compassion", scores: { sat: 3 } },
      { text: "Договориться, чтобы устранить его законно.", tag: "power", scores: { raj: 3 } },
      { text: "Подписать контракт, не задавая вопросов.", tag: "chaos", scores: { tam: 4 } },
      { text: "Использовать информацию, чтобы укрепить свой статус без крови.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "В заброшенных руинах твой спутник ранен ловушкой. Времени мало.",
    answers: [
      { text: "Нести его до выхода, даже если путь удлинится.", tag: "compassion", scores: { sat: 4 } },
      { text: "Оставить с зельем и продолжить миссию.", tag: "action", scores: { raj: 3, sat: 1 } },
      { text: "Забрать его артефакты и идти дальше одному.", tag: "chaos", scores: { tam: 4 } },
      { text: "Скрыть спутника и вернуться с подмогой позже.", tag: "balance", scores: { sat: 2, raj: 2 } }
    ]
  },
  {
    question: "На городской площади спорят, закрывать ли врата ночью.",
    answers: [
      { text: "Убедить совет дать приют всем путникам.", tag: "compassion", scores: { sat: 3 } },
      { text: "Предложить платный вход и усиленную охрану.", tag: "power", scores: { raj: 3 } },
      { text: "Потребовать казни тех, кто возражает.", tag: "chaos", scores: { tam: 3 } },
      { text: "Найти компромисс: убежище в храме и караулы у ворот.", tag: "balance", scores: { sat: 2, raj: 2 } }
    ]
  },
  {
    question: "Во сне незнакомая богиня протягивает три луча света, каждый обещает новую судьбу.",
    answers: [
      { text: "Принять луч милосердия и служить исцелением.", tag: "compassion", scores: { sat: 4 } },
      { text: "Выбрать луч власти и вести людей в бой.", tag: "power", scores: { raj: 4 } },
      { text: "Тянуться к лучу забвения и раствориться в тишине.", tag: "secrecy", scores: { tam: 4 } },
      { text: "Переплести лучи, пытаясь удержать баланс.", tag: "balance", scores: { sat: 2, raj: 2, tam: 1 } }
    ]
  },
  {
    question: "У подножия пылающей горы слышен шёпот, обещающий силу за одну клятву.",
    answers: [
      { text: "Отказать и засыпать вход пеплом.", tag: "compassion", scores: { sat: 3 } },
      { text: "Выторговать помощь для своего дела.", tag: "power", scores: { raj: 3 } },
      { text: "Принять клятву, не интересуясь ценой.", tag: "chaos", scores: { tam: 4 } },
      { text: "Записать всё в дневник и доложить жрецам.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "У ворот поселения чужеземец просит пропустить его к святыне, стражи сомневаются.",
    answers: [
      { text: "Заступиться и ручаться за его намерения.", tag: "compassion", scores: { sat: 3 } },
      { text: "Устроить проверку и сопроводить за плату.", tag: "action", scores: { raj: 3 } },
      { text: "Подстрекать стражу изгнать пришельца силой.", tag: "chaos", scores: { tam: 3 } },
      { text: "Предложить помощь жрецов для испытания веры.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В порту контрабандисты предлагают редкий металл ночью.",
    answers: [
      { text: "Сообщить о сделке храму и очистить причал.", tag: "compassion", scores: { sat: 3 } },
      { text: "Выбить долю и наладить доставку в гильдию.", tag: "power", scores: { raj: 3 } },
      { text: "Скрыть товар для себя и исчезнуть на лодке.", tag: "secrecy", scores: { tam: 4 } },
      { text: "Договориться о пошлине и легализовать торг.", tag: "balance", scores: { raj: 2, sat: 1 } }
    ]
  },
  {
    question: "Алхимик просит испытать зелье, меняющее память на час.",
    answers: [
      { text: "Отказаться и пожелать ему благоразумия.", tag: "compassion", scores: { sat: 3 } },
      { text: "Принять зелье и использовать эффект в переговорах.", tag: "power", scores: { raj: 3 } },
      { text: "Выпить дважды, чтобы спрятать своё прошлое.", tag: "secrecy", scores: { tam: 4 } },
      { text: "Найти добровольца среди телепатов гильдии.", tag: "balance", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "На тёмном берегу рыбаки нашли камень, излучающий ночное сияние.",
    answers: [
      { text: "Отнести камень в святилище и поблагодарить богиню.", tag: "compassion", scores: { sat: 3 } },
      { text: "Превратить находку в талисман торговли.", tag: "power", scores: { raj: 3 } },
      { text: "Ночью сбросить камень в бездну, чтобы никто не увидел.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Разделить камень и дать долю общине.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Пепельные кочевники просят провести их через чужие земли.",
    answers: [
      { text: "Договориться о мире и идти с ними.", tag: "compassion", scores: { sat: 3 } },
      { text: "Использовать их знания пустоши за услугу.", tag: "power", scores: { raj: 3 } },
      { text: "Продать маршрут врагам и исчезнуть.", tag: "chaos", scores: { tam: 4 } },
      { text: "Отправить письмо совету и ждать ответа.", tag: "balance", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "В таверне бард поёт сатиру про храм, толпа смеётся.",
    answers: [
      { text: "Попросить сменить тему, сохранив его честь.", tag: "compassion", scores: { sat: 3 } },
      { text: "Пригласить его выступать в своей корчме.", tag: "power", scores: { raj: 3 } },
      { text: "Подлить вина, чтобы песня стала ещё грубее.", tag: "chaos", scores: { tam: 3 } },
      { text: "Предложить новый балладный дуэт о героях.", tag: "action", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В ледяном гроте чудится голос древнего воина, просящий отомстить.",
    answers: [
      { text: "Похоронить останки и вознести молитву.", tag: "compassion", scores: { sat: 3 } },
      { text: "Принять поручение и искать врага ради славы.", tag: "power", scores: { raj: 3 } },
      { text: "Разбудить дух для собственной стражи.", tag: "chaos", scores: { tam: 4 } },
      { text: "Записать историю и отнести её сказителям.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Арканист предлагает запечатать твою тень ради защиты от проклятий.",
    answers: [
      { text: "Отказаться: душа должна оставаться свободной.", tag: "compassion", scores: { sat: 3 } },
      { text: "Согласиться за возможность избегать ловушек.", tag: "power", scores: { raj: 3 } },
      { text: "Оборвать договор и унести печать себе.", tag: "secrecy", scores: { tam: 3 } },
      { text: "Изучить ритуал и поделиться с союзниками.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "В архиве найден список должников гильдии.",
    answers: [
      { text: "Списать долги сирот и больных.", tag: "compassion", scores: { sat: 3 } },
      { text: "Использовать список, чтобы усилить своё влияние.", tag: "power", scores: { raj: 3 } },
      { text: "Продать данные контрабандистам.", tag: "chaos", scores: { tam: 4 } },
      { text: "Переговорить с должниками и составить новый график.", tag: "balance", scores: { sat: 1, raj: 2 } }
    ]
  },
  {
    question: "Старый пахарь потерял землю из-за долгов и просит совета.",
    answers: [
      { text: "Собрать деревню и вернуть ему поле.", tag: "compassion", scores: { sat: 3 } },
      { text: "Вложить деньги и взять его в долю.", tag: "power", scores: { raj: 3 } },
      { text: "Использовать его историю как угрозу другим должникам.", tag: "chaos", scores: { tam: 3 } },
      { text: "Написать прошение в совет и добиться отсрочки.", tag: "balance", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Мастер дуэли предлагает устроить показательный поединок ради славы дома.",
    answers: [
      { text: "Отказаться и предложить мирный турнир.", tag: "compassion", scores: { sat: 3 } },
      { text: "Принять вызов и собрать зрителей.", tag: "power", scores: { raj: 3 } },
      { text: "Подсыпать яд в оружие противника.", tag: "chaos", scores: { tam: 4 } },
      { text: "Договориться о тренировке для молодых воинов.", tag: "action", scores: { sat: 2, raj: 1 } }
    ]
  },
  {
    question: "Деревню мучают сны об огненном звере.",
    answers: [
      { text: "Провести очищающий обряд и успокоить людей.", tag: "compassion", scores: { sat: 3 } },
      { text: "Найти зверя и превратить его легенду в ярмарку.", tag: "power", scores: { raj: 3 } },
      { text: "Усилить страх и продавать защитные талисманы.", tag: "chaos", scores: { tam: 4 } },
      { text: "Отправить разведку и поделиться знаниями с соседями.", tag: "action", scores: { sat: 2, raj: 1 } }
    ]
  }
];

const GROUPS = {
  sat: {
    title: "Свет",
    text: "Ты несёшь ясность и мягкое влияние. Даже в буре видишь дорогу для всех. Расскажи в группе, что ты понял на этом пути — твоё слово способно осветить других.",
    link: "https://t.me/+SNNjufNTtGJhMDI6"
  },
  raj: {
    title: "Огонь",
    text: "Ты действуешь и создаёшь. Мир ускоряется рядом с тобой. Поделись в группе, что ты готов разжечь — твоё решение может стать искрой перемен.",
    link: "https://t.me/+B-mozvEpxM5kZjVi"
  },
  tam: {
    title: "Ночь",
    text: "Ты чувствуешь глубину вещей и знаешь, как звучит тишина. Расскажи в группе, что ты увидел во тьме — возможно, через тебя кто-то найдёт свет.",
    link: "https://t.me/+K8aDzjYAsOg3Y2Fi"
  }
};

const PROBE_LIBRARY = [
  { text: "Сделать вдох и просто наблюдать, позволяя сцене раскрыться самой.", tag: "neutral", scores: { sat: 1, raj: 1, tam: 1 } },
  { text: "Попросить участников раскрыть мотивы и выслушать всех по очереди.", tag: "balance", scores: { sat: 1.5, raj: 1, tam: 0.6 } },
  { text: "Отступить в тень и наблюдать, пытаясь понять скрытый замысел.", tag: "secrecy", scores: { sat: 0.8, raj: 0.9, tam: 1.2 } }
];

const MAX_STREAK_BONUS = 3;
const STREAK_STEP = 0.08;
const POSITION_INFLUENCE = 0.3;
const DIVERSITY_STEP = 0.02;
const MIN_THOUGHT_TIME = 2000;

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

const KARMA_FLOW = {
  multipliers: { sat: 1, raj: 1, tam: 1 },
  streak: { sat: 0, raj: 0, tam: 0 },
  lastDominant: null,
  chaosSwing: 0
};

let lastAnswerTime = Date.now();

let state = {
  index: 0,
  score: { sat: 0, raj: 0, tam: 0 },
  quiz: [],
  history: [],
  reactionLog: [],
  tagCounts: {},
  probeCooldown: 0
};

function resetKarmaFlow() {
  KARMA_FLOW.multipliers = { sat: 1, raj: 1, tam: 1 };
  KARMA_FLOW.streak = { sat: 0, raj: 0, tam: 0 };
  KARMA_FLOW.lastDominant = null;
  KARMA_FLOW.chaosSwing = 0;
}

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
  resetKarmaFlow();
  lastAnswerTime = Date.now();
  state = {
    index: 0,
    score: { sat: 0, raj: 0, tam: 0 },
    quiz: shuffleArray(BASE_QUIZ).map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({
        ...answer,
        scores: answer.scores ? { ...answer.scores } : { sat: 0, raj: 0, tam: 0 }
      }))
    })),
    history: [],
    reactionLog: [],
    tagCounts: {},
    probeCooldown: 0
  };

  showScreen(app.quiz);
  renderQuestion();
}

function prepareAnswers(question) {
  const baseAnswers = question.answers.map((answer) => ({ ...answer }));
  const stableTag = getStableRecentTag();
  let answers = baseAnswers;
  if (stableTag && shouldOfferProbe(stableTag)) {
    answers = baseAnswers.concat(createProbeAnswer(stableTag));
  }
  return shuffleArray(answers);
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

  const answers = prepareAnswers(question);
  answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer.text;
    btn.addEventListener("click", () => selectAnswer(answer));
    answersWrap.appendChild(btn);
  });

  app.qContainer.append(progress, title, answersWrap);
}

function selectAnswer(answer) {
  const now = Date.now();
  const delta = now - lastAnswerTime;
  lastAnswerTime = now;
  const attention = Math.max(0.5, Math.min(2, delta / MIN_THOUGHT_TIME));
  const tag = dominantTagFromAnswer(answer);

  let weighted = applyAdvancedScoring(answer, tag);
  weighted = applyBehavioralFactor(weighted, attention);
  weighted = applyKarmicBalance(weighted, tag);

  updateScore(answer, weighted, tag, delta, attention);
}

function dominantTagFromAnswer(answer) {
  return answer.tag || null;
}

function cloneScores(scores) {
  return {
    sat: scores.sat ?? 0,
    raj: scores.raj ?? 0,
    tam: scores.tam ?? 0
  };
}

function getStableRecentTag() {
  if (state.history.length < 3) {
    return null;
  }
  const recent = state.history.slice(-3);
  const baseTag = recent[0].tag;
  if (!baseTag) {
    return null;
  }
  const same = recent.every((entry) => entry.tag === baseTag);
  return same ? baseTag : null;
}

function shouldOfferProbe(excludeTag) {
  if (state.probeCooldown > 0) {
    state.probeCooldown -= 1;
    return false;
  }
  const recent = state.history.slice(-3);
  if (recent.length < 3 || !recent.every((entry) => entry.tag === excludeTag)) {
    return false;
  }
  const chance = 0.2 + Math.random() * 0.2;
  const decision = Math.random() < chance;
  if (decision) {
    state.probeCooldown = 2;
  }
  return decision;
}

function createProbeAnswer(excludeTag) {
  const options = PROBE_LIBRARY.filter((option) => option.tag !== excludeTag);
  const selected = options[Math.floor(Math.random() * options.length)] || PROBE_LIBRARY[0];
  return {
    ...selected,
    scores: selected.scores ? { ...selected.scores } : { sat: 0, raj: 0, tam: 0 }
  };
}

function getCurrentStreak(tag) {
  if (!tag || state.history.length === 0) {
    return 1;
  }

  let streak = 1;
  for (let i = state.history.length - 1; i >= 0; i -= 1) {
    if (state.history[i].tag === tag) {
      streak += 1;
    } else {
      break;
    }
  }
  return Math.min(streak, MAX_STREAK_BONUS + 1);
}

function getDiversityFactor() {
  if (state.history.length === 0) {
    return 1;
  }
  const unique = new Set(state.history.map((item) => item.tag).filter(Boolean));
  return 1 + unique.size * DIVERSITY_STEP;
}

function applyAdvancedScoring(answer, tag) {
  const baseScores = {};
  GUNA_KEYS.forEach((key) => {
    baseScores[key] = answer.scores?.[key] ?? 0;
  });

  const totalQuestions = state.quiz.length || 1;
  const positionFactor = 1 + (state.index / Math.max(1, totalQuestions - 1)) * POSITION_INFLUENCE;
  const streak = getCurrentStreak(tag);
  const streakBonus = 1 + Math.min(streak - 1, MAX_STREAK_BONUS) * STREAK_STEP;
  const diversityFactor = getDiversityFactor();

  const tagAffinity = tag && TAG_TO_GUNA[tag] ? TAG_TO_GUNA[tag] : TAG_TO_GUNA.neutral;
  const result = { sat: 0, raj: 0, tam: 0 };

  GUNA_KEYS.forEach((key) => {
    const momentum = 1 + (state.score[key] > 0 ? Math.log1p(state.score[key]) * 0.03 : 0);
    const value = baseScores[key] * positionFactor * streakBonus * diversityFactor * tagAffinity[key] * momentum;
    result[key] = Number.isFinite(value) ? value : 0;
  });

  return result;
}

function applyBehavioralFactor(scores, attention) {
  const adjusted = cloneScores(scores);
  if (attention < 0.8) {
    adjusted.sat *= 0.6;
    adjusted.raj *= 1.1;
    adjusted.tam *= 1.2;
  } else if (attention > 1.4) {
    adjusted.sat *= 1.3;
    adjusted.raj *= 0.9;
    adjusted.tam *= 0.8;
  }
  return adjusted;
}

function getDominantGuna(scores) {
  let dominant = null;
  let maxValue = -Infinity;
  GUNA_KEYS.forEach((key) => {
    if (scores[key] > maxValue) {
      dominant = key;
      maxValue = scores[key];
    }
  });
  return dominant;
}

function applyKarmicBalance(scores, tag) {
  const adjusted = cloneScores(scores);
  const dominant = getDominantGuna(adjusted);
  if (!dominant) {
    return adjusted;
  }

  if (KARMA_FLOW.lastDominant === dominant) {
    KARMA_FLOW.streak[dominant] += 1;
  } else {
    if (KARMA_FLOW.lastDominant) {
      KARMA_FLOW.streak[KARMA_FLOW.lastDominant] = 0;
    }
    KARMA_FLOW.streak[dominant] = 1;
    KARMA_FLOW.chaosSwing = 0.05 + Math.random() * 0.1;
  }
  KARMA_FLOW.lastDominant = dominant;

  if (tag === "chaos") {
    KARMA_FLOW.chaosSwing = Math.max(KARMA_FLOW.chaosSwing, 0.12);
  } else if (tag === "compassion" && KARMA_FLOW.chaosSwing > 0) {
    KARMA_FLOW.chaosSwing *= 0.75;
  }

  GUNA_KEYS.forEach((key) => {
    if (key === dominant) {
      const boost = 1 + KARMA_FLOW.streak[key] * 0.07;
      KARMA_FLOW.multipliers[key] = Math.min(1.6, boost);
    } else {
      KARMA_FLOW.multipliers[key] = Math.max(0.85, KARMA_FLOW.multipliers[key] - 0.05);
    }
  });

  const values = GUNA_KEYS.map((key) => KARMA_FLOW.multipliers[key]);
  const imbalance = Math.max(...values) - Math.min(...values);
  if (imbalance > 0.6) {
    GUNA_KEYS.forEach((key) => {
      KARMA_FLOW.multipliers[key] = key === dominant ? 1.1 : 0.95;
      KARMA_FLOW.streak[key] = key === dominant ? 1 : 0;
    });
    KARMA_FLOW.chaosSwing = 0.08;
  }

  GUNA_KEYS.forEach((key) => {
    let value = adjusted[key] * KARMA_FLOW.multipliers[key];
    if (KARMA_FLOW.chaosSwing > 0 && key !== dominant) {
      const noise = 1 + (Math.random() * 2 - 1) * KARMA_FLOW.chaosSwing;
      value *= noise;
    }
    adjusted[key] = value;
  });

  KARMA_FLOW.chaosSwing *= 0.6;

  return adjusted;
}

function updateScore(answer, weighted, tag, reaction, attention) {
  GUNA_KEYS.forEach((key) => {
    state.score[key] += weighted[key];
  });

  state.history.push({
    tag,
    raw: answer.scores ? { ...answer.scores } : { sat: 0, raj: 0, tam: 0 },
    weighted: cloneScores(weighted),
    reaction,
    attention
  });

  if (tag) {
    state.tagCounts[tag] = (state.tagCounts[tag] || 0) + 1;
  }
  state.reactionLog.push(reaction);

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

  const avgReaction = state.reactionLog.length
    ? state.reactionLog.reduce((sum, value) => sum + value, 0) / state.reactionLog.length
    : 0;
  let switches = 0;
  for (let i = 1; i < state.history.length; i += 1) {
    if (state.history[i].tag !== state.history[i - 1].tag) {
      switches += 1;
    }
  }
  const stabilityRaw = state.history.length > 1
    ? 1 - switches / (state.history.length - 1)
    : 1;
  const stabilityIndex = Math.max(0, Math.min(1, stabilityRaw));
  const uniqueTags = Object.keys(state.tagCounts).length;
  const diversityRatio = state.history.length > 0 ? uniqueTags / state.history.length : 0;
  const diversityIndex = Math.max(0, Math.min(1, diversityRatio));
  const dominantTag = Object.entries(state.tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  app.resultTitle.textContent = group.title;
  app.resultText.textContent = group.text;
  app.resultStats.textContent = `${GROUPS.sat.title}: ${percentages.sat}% · ${GROUPS.raj.title}: ${percentages.raj}% · ${GROUPS.tam.title}: ${percentages.tam}%`;
  app.resultLink.href = group.link;

  showScreen(app.result);

  console.log("Поведенческий профиль:", {
    meanReaction: avgReaction,
    stability: stabilityIndex,
    diversity: diversityIndex,
    dominantTag,
    karma: {
      multipliers: { ...KARMA_FLOW.multipliers },
      streak: { ...KARMA_FLOW.streak },
      lastDominant: KARMA_FLOW.lastDominant,
      chaosSwing: KARMA_FLOW.chaosSwing
    }
  });
}

app.btnStart.addEventListener("click", startQuiz);
app.btnRestart.addEventListener("click", startQuiz);
