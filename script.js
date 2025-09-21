const QUIZ = [
  { question: "Ты заходишь в старую таверну, где чад костров стелется по низкому потолку, а хозяин, сгорбленный и усталый, ставит перед тобой три блюда. Первое — прозрачный овощной суп, лёгкий, словно дыхание лесного ветра. Второе — мясное рагу, густое, острое, дымное, пробуждающее кровь и возбуждающее аппетит. Третье — пережаренный кусок мяса, жирный и тяжёлый, рядом кувшин тёмного эля, пахнущий горечью и забвением.", answers:[
    {text:"Ты выбираешь суп и ешь медленно, чувствуя благодарность за простое благо.", guna:"sat", value:2},
    {text:"Ты тянешься к рагу, ведь оно бодрит тело и придаёт решимости.", guna:"raj", value:1},
    {text:"Ты берёшь самый тяжёлый кусок, заливаешь элем и чувствуешь, как мир уходит в туман.", guna:"tam", value:3},
  ]},
  { question: "На пыльной дороге, под ветвями яблони, ты находишь корзину, полную свежих плодов. Солнце садится, воздух тих, и вокруг никого. Корзина словно зовёт тебя принять решение.", answers:[
    {text:"Ты решаешь найти хозяина и вернуть корзину, даже если это займёт ночь.", guna:"sat", value:3},
    {text:"Ты берёшь несколько яблок, чтобы утолить голод, и оставляешь остальное.", guna:"raj", value:1},
    {text:"Ты забираешь всё и бросаешь пустую корзину в пыль.", guna:"tam", value:2},
  ]},
  { question: "На ярмарочной площади, среди шума, купец в спешке вручает тебе кошель с лишними монетами. Его глаза сияют радостью, он и не замечает ошибки.", answers:[
    {text:"Ты тут же возвращаешь деньги и чувствуешь тепло в сердце.", guna:"sat", value:2},
    {text:"Ты оставляешь лишнее при себе, считая, что удача благоволит тебе.", guna:"raj", value:1},
    {text:"Ты прячешь кошель и думаешь, как урвать ещё, пока никто не заметил.", guna:"tam", value:3},
  ]},
  { question: "В лавке старый хозяин ошибается и кладёт тебе лишний хлеб. Его руки дрожат, глаза усталые, но он улыбается тебе с доверием.", answers:[
    {text:"Ты возвращаешь хлеб и тихо благодаришь за честность судьбы.", guna:"sat", value:2},
    {text:"Ты оставляешь, думая: «Ничего страшного, он не обеднеет..", guna:"raj", value:1},
    {text:"Ты требуешь ещё, убеждая, что он недодал.", guna:"tam", value:3},
  ]},
  { question: "Ты встречаешь путника с тяжёлой ношей. Пот стекает по его лицу, он едва держится на ногах.", answers:[
    {text:"Ты предлагаешь помощь, даже если сам устал.", guna:"sat", value:2},
    {text:"Ты идёшь рядом, намекая на награду за услугу.", guna:"raj", value:1},
    {text:"Ты смеёшься над ним и проходишь мимо, наслаждаясь его страданием.", guna:"tam", value:2},
  ]},
  { question: "В тёмной таверне вспыхивает драка. Люди хватают кружки и ножи, крики гремят над столами.", answers:[
    {text:"Ты пытаешься разнять дерущихся, рискуя собой ради мира.", guna:"sat", value:2},
    {text:"Ты стоишь в стороне, готовый встать на ту сторону, что окажется сильнее.", guna:"raj", value:1},
    {text:"Ты подливаешь масла в огонь, выкрикивая оскорбления, и жаждешь хаоса.", guna:"tam", value:3},
  ]},
  { question: "В очереди к торговцу тебя толкают и грубо обзывают. Люди смотрят, ожидая твоей реакции.", answers:[
    {text:"Ты промолчишь и сохранёшь внутренний покой.", guna:"sat", value:1},
    {text:"Ты отвечаешь резко, отстаивая себя.", guna:"raj", value:2},
    {text:"Ты хватаешь обидчика и начинаешь драку, не думая о последствиях.", guna:"tam", value:3},
  ]},
  { question: "В старом сундуке ты находишь амулет, мерцающий странным светом. Он обещает власть, но его энергия тревожна.", answers:[
    {text:"Ты хранишь его лишь ради защиты других, не думая о собственной выгоде.", guna:"sat", value:3},
    {text:"Ты носишь его, чтобы твой авторитет казался весомее.", guna:"raj", value:1},
    {text:"Ты начинаешь угрожать амулетом окружающим, наслаждаясь страхом.", guna:"tam", value:2},
  ]},
  { question: "Ночью, когда город спит, над небом вспыхивает комета. Толпа сбегается, одни молятся, другие кричат.", answers:[
    {text:"Ты смотришь на светило и размышляешь о смысле существования, словно это знак для пробуждения души.", guna:"sat", value:2},
    {text:"Ты думаешь, как событие можно обратить в свою пользу — устроить торг, напугать людей и заработать.", guna:"raj", value:1},
    {text:"Ты поднимаешь руки к небу и кричишь: «Всем конец!», разжигая страх и хаос.", guna:"tam", value:3},
  ]},
    { question: "В городском переулке седой старец рассказывает тебе путаную притчу. Его слова нелогичны, образы сбивчивы, но в голосе — искренность.", answers:[
    {text:"Ты вслушиваешься в каждое слово, ищешь скрытый смысл и терпеливо открываешь сердце.", guna:"sat", value:2},
    {text:"Ты подхватываешь часть притчи и используешь её для своих дел, вырывая выгоду из сказанного.", guna:"raj", value:1},
    {text:"Ты перебиваешь старца и громко смеёшься: «Что за бред старика!»", guna:"tam", value:2},
  ]},
  { question: "На обочине дороги валяется пьяный. Его лицо в грязи, дыхание тяжёлое. Люди обходят стороной.", answers:[
    {text:"Ты поднимаешь его и доводишь до дома или безопасного места.", guna:"sat", value:2},
    {text:"Ты отворачиваешься и идёшь дальше, делая вид, что ничего не заметил.", guna:"raj", value:0},
    {text:"Ты зовёшь друзей и, смеясь, снимаешь его на потеху.", guna:"tam", value:3},
  ]},
  { question: "Вечером у костра тебя просят рассказать историю, чтобы все слушали.", answers:[
    {text:"Ты начинаешь тихо говорить о добре, вдохновляешь на милосердие и единство.", guna:"sat", value:2},
    {text:"Ты рассказываешь о своих подвигах и победах, подчёркивая силу и ловкость.", guna:"raj", value:1},
    {text:"Ты пускаешься в похабные шутки и грязные байки, вызывая грубый смех.", guna:"tam", value:2},
  ]},
  { question: "Твой друг просит помощи в переезде. На улице жара, у тебя свои дела, но он смотрит с надеждой.", answers:[
    {text:"Ты соглашаешься, даже если сам устанешь, и несёшь его груз.", guna:"sat", value:3},
    {text:"Ты помогаешь только если дорога и дела совпадают с твоими.", guna:"raj", value:1},
    {text:"Ты придумываешь оправдание и уходишь, избегая труда.", guna:"tam", value:2},
  ]},
  { question: "Ты стоишь перед тремя дверями, и каждая манит своим сиянием.", answers:[
    {text:"За первой — светлая комната, где ждут мудрецы и звучит тишина знаний.", guna:"sat", value:3},
    {text:"За второй — зал пиршеств, золото, власть и овации толпы.", guna:"raj", value:2},
    {text:"За третьей — тьма, где скрываются тайны и опасные обещания.", guna:"tam", value:2},
  ]},
  { question: "На обочине умирающий просит воды. Его губы потрескались, глаза молят.", answers:[
    {text:"Ты отдаёшь свою последнюю флягу, не задумываясь.", guna:"sat", value:3},
    {text:"Ты думаешь: «Что получу взамен?», и лишь после даёшь немного.", guna:"raj", value:1},
    {text:"Ты смеёшься, отворачиваешься и уходишь.", guna:"tam", value:3},
  ]},
  { question: "Вопрос 16", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 17", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 18", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (0)", guna:"raj", value:0},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 19", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 20", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 21", answers:[
    {text:"Ответ 1 (+1 саттва)", guna:"sat", value:1},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 22", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 23", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 24", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 25", answers:[
    {text:"Ответ 1 (+1 саттва)", guna:"sat", value:1},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 26", answers:[
    {text:"Ответ 1 (+1 саттва)", guna:"sat", value:1},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 27", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 28", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 29", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+2 тамас)", guna:"tam", value:2},
    {text:"Ответ 3 (+1 раджас)", guna:"raj", value:1},
  ]},
  { question: "Вопрос 30", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+1 раджас)", guna:"raj", value:1},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 31", answers:[
    {text:"Ответ 1 (+2 саттва)", guna:"sat", value:2},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
  { question: "Вопрос 32", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+2 тамас)", guna:"tam", value:2},
  ]},
  { question: "Вопрос 33", answers:[
    {text:"Ответ 1 (+3 саттва)", guna:"sat", value:3},
    {text:"Ответ 2 (+2 раджас)", guna:"raj", value:2},
    {text:"Ответ 3 (+3 тамас)", guna:"tam", value:3},
  ]},
];

const GROUPS = {
  sat: {title:"Саттва — гармония", text:"Твоя природа — свет и ясность.", link:"https://t.me/+SNNjufNTtGJhMDI6"},
  raj: {title:"Раджас — действие", text:"Ты движим страстью и энергией.", link:"https://t.me/+B-mozvEpxM5kZjVi"},
  tam: {title:"Тамас — покой", text:"Тебе свойственна тяжесть и инерция.", link:"https://t.me/+K8aDzjYAsOg3Y2Fi"},
};

const app = {
  start: document.getElementById("screen-start"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
  btnStart: document.getElementById("btn-start"),
  btnRestart: document.getElementById("btn-restart"),
  qContainer: document.getElementById("question-container"),
  resultTitle: document.getElementById("result-title"),
  resultText: document.getElementById("result-text"),
  resultLink: document.getElementById("result-link"),
};

let state = {index:0, score:{sat:0,raj:0,tam:0}};

function showScreen(s){
  [app.start, app.quiz, app.result].forEach(x=>x.classList.remove("active"));
  s.classList.add("active");
}

function startQuiz(){
  state = {index:0, score:{sat:0,raj:0,tam:0}};
  showScreen(app.quiz);
  renderQuestion();
}

function renderQuestion(){
  const q = QUIZ[state.index];
  app.qContainer.innerHTML = `<h2>${q.question}</h2>`;
  q.answers.forEach(a=>{
    const btn = document.createElement("button");
    btn.className="answer";
    btn.textContent=a.text;
    btn.onclick=()=>selectAnswer(a);
    app.qContainer.appendChild(btn);
  });
}

function selectAnswer(a){
  state.score[a.guna]+=a.value;
  state.index++;
  if(state.index<QUIZ.length){
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz(){
  let res = Object.entries(state.score).sort((a,b)=>b[1]-a[1])[0][0];
  let g = GROUPS[res];
  app.resultTitle.textContent=g.title;
  app.resultText.textContent=g.text;
  app.resultLink.href=g.link;
  showScreen(app.result);
}

app.btnStart.onclick=startQuiz;
app.btnRestart.onclick=()=>showScreen(app.start);
