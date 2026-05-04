import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── ДАННЫЕ СЦЕНАРИЯ ────────────────────────────────────────────────────────

const GAME_TITLE = "РУБЕЖ";
const GAME_SUBTITLE = "Военно-патриотическая спортивная игра по станциям";
const TOTAL_CHILDREN = 184;
const TOTAL_GROUPS = 8;
const CHILDREN_PER_GROUP = 23;

const teams = [
  { id: 1, name: "Отряд «Сокол»",    color: "#c0392b", emoji: "🦅" },
  { id: 2, name: "Отряд «Гвардия»",  color: "#2980b9", emoji: "🛡️" },
  { id: 3, name: "Отряд «Патриот»",  color: "#27ae60", emoji: "⭐" },
  { id: 4, name: "Отряд «Стремя»",   color: "#d4a017", emoji: "⚔️" },
  { id: 5, name: "Отряд «Алмаз»",    color: "#8e44ad", emoji: "💎" },
  { id: 6, name: "Отряд «Гранит»",   color: "#16a085", emoji: "🏔️" },
  { id: 7, name: "Отряд «Буря»",     color: "#e67e22", emoji: "⚡" },
  { id: 8, name: "Отряд «Рассвет»",  color: "#c0392b", emoji: "🌅" },
];

const rotationTable = [
  ["С-01", "С-02", "С-03", "С-04", "С-05", "С-06"],
  ["С-02", "С-03", "С-04", "С-05", "С-06", "С-01"],
  ["С-03", "С-04", "С-05", "С-06", "С-01", "С-02"],
  ["С-04", "С-05", "С-06", "С-01", "С-02", "С-03"],
  ["С-05", "С-06", "С-01", "С-02", "С-03", "С-04"],
  ["С-06", "С-01", "С-02", "С-03", "С-04", "С-05"],
  ["С-01", "С-03", "С-05", "С-02", "С-04", "С-06"],
  ["С-02", "С-04", "С-06", "С-01", "С-03", "С-05"],
];

const stations = [
  {
    id: 1, code: "С-01", name: "Разведка", emoji: "🔭",
    color: "#1a3a1a", accent: "#4a7c24", location: "Площадка у веранды гр. №1",
    duration: 12, points: 50,
    hostName: "Командир Орлов",
    announcement: "Внимание, отряд! Разведчики — глаза и уши армии. Ваша задача — незаметно, быстро и точно. Здесь важна наблюдательность и умение не терять голову в сложной ситуации.",
    scenarioText: `Ведущий встречает команду рапортом:
«Товарищ командир! Разведывательный пост №1 к проверке готов!»

Задание объявляется торжественно, с паузами для нагнетания напряжения.`,
    rulesJunior: [
      "Найти 5 спрятанных предметов (флажков) на участке за 4 минуты",
      "Назвать 3 предмета, которые появились или исчезли (игра «Что изменилось?»)",
      "Пройти 10 шагов с завязанными глазами по прямой",
    ],
    rulesSenior: [
      "Найти 8 замаскированных предметов на участке за 3 минуты",
      "Определить стороны света по ориентирам (дерево, солнце, мох)",
      "Передать донесение — запомнить и пересказать 5-словное сообщение",
      "Пройти 15 шагов с завязанными глазами без отклонений",
    ],
    hostScript: [
      { cue: "Встреча команды", text: "Стоять! Назовите пароль! ... Верно. Добро пожаловать на пост разведки. Я — ваш инструктор. Слушай мою команду!" },
      { cue: "Объяснение задания", text: "На этой территории спрятаны секретные объекты. Ваша задача — найти их все. Действуем тихо, внимательно, без паники. Время пошло!" },
      { cue: "Во время задания", text: "Молодцы! Ещё немного... Осторожно, смотрите внимательнее! Время!" },
      { cue: "Финал", text: "Задание выполнено! Отряд [название] показал себя настоящими разведчиками. Записываю результат: [X] очков!" },
    ],
    equipment: ["Цветные флажки 8 шт.", "Повязки на глаза 8 шт.", "Поднос с предметами (игра «Что изменилось?»)", "Секундомер", "Протокол оценки"],
    staff: ["Ведущий-инструктор", "Помощник (хронометраж и очки)"],
  },
  {
    id: 2, code: "С-02", name: "Полоса препятствий", emoji: "🏃",
    color: "#3a2010", accent: "#c0793a", location: "Спортивная площадка",
    duration: 15, points: 60,
    hostName: "Командир Петров",
    announcement: "Боец! Настоящий защитник Родины должен быть сильным, ловким и выносливым. На этом рубеже вас ждут серьёзные испытания. Трусам здесь не место!",
    scenarioText: `Команда выстраивается у старта. Ведущий проводит краткий инструктаж по безопасности (обязательно!). Препятствия проходятся поочерёдно, время фиксируется на команду в целом.`,
    rulesJunior: [
      "Пробежать змейкой между 5 конусами",
      "Проползти под дугами (высота 50 см) — 3 дуги",
      "Перепрыгнуть через 2 невысоких бревна (h=20 см)",
      "Добежать до финиша и поднять флаг отряда",
      "Норматив: вся команда за 5 минут",
    ],
    rulesSenior: [
      "Пробежать змейкой между 8 конусами",
      "Проползти под сеткой (высота 35 см) — 5 метров",
      "Перепрыгнуть через 3 бревна (h=30 см)",
      "Перенести «пострадавшего» (мешок 3 кг) 8 метров",
      "Норматив: вся команда за 4 минуты",
    ],
    hostScript: [
      { cue: "Инструктаж ТБ", text: "Внимание! Перед стартом — обязательный инструктаж. Толкаться запрещено. Если кто-то упал — помогите товарищу. Безопасность — прежде всего!" },
      { cue: "Старт", text: "Отряд [название], на старт! Внимание... Марш!" },
      { cue: "Поддержка", text: "Давай, давай! Не останавливаться! Поддержи товарища! Ты можешь!" },
      { cue: "Финиш", text: "Финиш! Время [X] минут [Y] секунд. Отряд, равняйсь! Смирно! Вольно. Результат засчитан!" },
    ],
    equipment: ["Конусы 10 шт.", "Дуги для подлезания 5 шт.", "Маскировочная сеть 5×2 м", "Брёвна 3 шт.", "Мешок 3 кг", "Секундомер", "Маты страховочные 4 шт.", "Флаг отряда"],
    staff: ["Ведущий-инструктор", "Медик (обязательно!)", "Страховщик 2 чел.", "Хронометрист"],
  },
  {
    id: 3, code: "С-03", name: "Меткий стрелок", emoji: "🎯",
    color: "#3a1010", accent: "#c0392b", location: "Тихий участок у забора",
    duration: 12, points: 70,
    hostName: "Командир Смирнов",
    announcement: "Отряд, смирно! Стрелковый рубеж — самый ответственный. Здесь каждый покажет, насколько твёрд его глаз и крепка рука. Стреляем только по команде!",
    scenarioText: `Используется безопасное оборудование: мячи для метания в цель, кольцеброс или дартс на липучках. Каждый участник делает броски. Результат суммируется по команде.`,
    rulesJunior: [
      "3 броска мячом в цель (обруч на расстоянии 2 м)",
      "3 броска кольцом на кольцеброс (расстояние 1,5 м)",
      "Каждое попадание = 5 очков",
    ],
    rulesSenior: [
      "5 бросков мячом в цель (расстояние 3 м)",
      "3 броска дротиком на липучке в мишень (безопасный дартс)",
      "Попадание в центр = 10 очков, в среднюю зону = 5 очков",
    ],
    hostScript: [
      { cue: "Встреча", text: "Отряд [название]! На огневой рубеж становись! Оружие выдаётся только по команде. Без разрешения не бросать!" },
      { cue: "Инструктаж", text: "Слушай правила. Бросаем только вперёд. За линию не заходим. Ждём своей очереди. Всё понятно? Тогда — к бою!" },
      { cue: "Во время", text: "Есть попадание! Молодец! Ещё раз, целься точнее! Отличный бросок!" },
      { cue: "Итог", text: "Стрельбы окончены! Отряд [название] набрал [X] очков. Вольно! Следующий отряд, готовься!" },
    ],
    equipment: ["Мячи мягкие 10 шт.", "Обручи-мишени 3 шт.", "Кольцеброс 2 шт.", "Безопасный дартс на липучках", "Разметочная лента", "Протокол"],
    staff: ["Ведущий-инструктор", "Помощник (подача мячей)", "Судья (подсчёт очков)"],
  },
  {
    id: 4, code: "С-04", name: "Строевая подготовка", emoji: "🥁",
    color: "#0d1a3a", accent: "#2e6db4", location: "Центральный плац (асфальтовая площадка)",
    duration: 10, points: 40,
    hostName: "Командир Иванов",
    announcement: "Строй — это душа армии. Здесь каждый — часть единого целого. Отряд, который ходит в ногу, думает в ногу и побеждает вместе!",
    scenarioText: `Ведущий — строгий, но справедливый военный инструктор. Команды подаются чётко, голосом. Отряд оценивается по слаженности, дисциплине и выправке.`,
    rulesJunior: [
      "Построение в шеренгу по команде (за 30 секунд)",
      "3 команды: «Равняйсь!», «Смирно!», «Вольно!»",
      "Марш на месте 16 счётов",
      "Повернуться направо по команде",
    ],
    rulesSenior: [
      "Построение в колонну по двое (за 20 секунд)",
      "6 строевых команд включая «Кругом!» и «На месте стой!»",
      "Марш 30 метров в ногу в колонне",
      "Отдание чести при прохождении мимо «командования»",
    ],
    hostScript: [
      { cue: "Встреча", text: "Отряд [название], смирно! Равняйсь! Вольно. Я — ваш командир на этом рубеже. Сейчас проверим вашу выправку и дисциплину!" },
      { cue: "Задание", text: "Слушай мою команду! Отряд, в шеренгу — становись! Равняйсь! Смирно! Вольно." },
      { cue: "Марш", text: "Отряд, шагом — марш! Левой, левой, раз-два-три! Тверже шаг! В ногу!" },
      { cue: "Итог", text: "Отряд, стой! Раз-два! Смирно! Отряд [название] показал достойную строевую выправку. Вольно! Результат занесён." },
    ],
    equipment: ["Барабан или колонка с маршем", "Мегафон", "Конусы-разметка 8 шт.", "Оценочный лист"],
    staff: ["Ведущий-командир (с командным голосом)", "Помощник-судья"],
  },
  {
    id: 5, code: "С-05", name: "Санитарный рубеж", emoji: "🏥",
    color: "#0d3a2a", accent: "#27ae60", location: "Веранда / тень деревьев",
    duration: 12, points: 55,
    hostName: "Доктор Белова",
    announcement: "Боец без помощника — не боец. Умение помочь товарищу — это тоже подвиг. На санитарном рубеже вы покажете заботу и умелые руки.",
    scenarioText: `Ведущий в белом халате или с красным крестом на повязке. Атмосфера заботливая, но деловая. Детям важно объяснить: это учёба, а не страшно.`,
    rulesJunior: [
      "Правильно помочь «пострадавшему» сесть и успокоить",
      "Наложить бинтовую повязку на руку (простой виток)",
      "Назвать 3 предмета из аптечки",
    ],
    rulesSenior: [
      "Наложить повязку на руку и зафиксировать",
      "Правильно уложить «пострадавшего» в восстановительное положение",
      "Провести 3 нажатия на грудную клетку манекена (имитация)",
      "Транспортировка: перенести «пострадавшего» на носилках 5 метров",
    ],
    hostScript: [
      { cue: "Встреча", text: "Здравствуйте, бойцы! Я — главный военный доктор. Сегодня вы будете моими помощниками. Наш девиз: не навреди и помоги!" },
      { cue: "Задание", text: "Представьте: ваш товарищ поранил руку. Ваши действия? Сначала успокоить, потом — помочь. Показываю один раз, затем — вы." },
      { cue: "Во время", text: "Аккуратнее! Вот так, молодец. Крепче держи. Отлично — настоящий санитар!" },
      { cue: "Итог", text: "Санитарный рубеж пройден! Ваши руки сегодня спасали жизни. Это очень важно. Отряд [название] — [X] очков!" },
    ],
    equipment: ["Бинты марлевые 20 шт.", "Аптечка демонстрационная", "Носилки 1 пара", "Кукла/манекен", "Белые халаты 2 шт.", "Красные кресты (нашивки)"],
    staff: ["Ведущий (желательно мед. работник или воспитатель)", "Помощник-демонстратор"],
  },
  {
    id: 6, code: "С-06", name: "Шифровальщик", emoji: "🔐",
    color: "#2a0d3a", accent: "#8e44ad", location: "Штабная палатка / беседка",
    duration: 10, points: 50,
    hostName: "Командир Тайный",
    announcement: "Тсс! Это — секретный рубеж. Здесь работают только самые умные. Каждое слово — тайна. Каждая буква — ключ. Готовы взломать код?",
    scenarioText: `Атмосфера таинственная: приглушённое место, стол с «секретными документами». Ведущий говорит вполголоса, создавая атмосферу настоящей шпионской операции.`,
    rulesJunior: [
      "Расшифровать 3 слова по картинкам-подсказкам: 🚀+🌟+🪖 = РАКЕТА / 🌍+🦅+🏅 = ПОБЕДА / 🛡️+🌲+🤝 = ЗАЩИТА",
      "Найти спрятанное «послание» в конверте по подсказке",
      "Передать сигнал флажком: «Победа!» (простой жест)",
    ],
    rulesSenior: [
      "Расшифровать слово по таблице замены букв (5 букв)",
      "Составить ответное зашифрованное послание",
      "Передать фразу «Рубеж взят!» флажковым семафором",
      "Запомнить и воспроизвести трёхзначный код",
    ],
    hostScript: [
      { cue: "Встреча", text: "(шёпотом) Стоп. Назовите позывной... Верно. Проходите. Здесь всё секретно. Говорим тихо. Враг не дремлет." },
      { cue: "Задание", text: "Перед вами — зашифрованное донесение. Ваша задача — прочесть его и передать ответ. Времени мало. Приступайте!" },
      { cue: "Во время", text: "Думайте! Вы почти разгадали. Ещё чуть-чуть... Отлично, так держать!" },
      { cue: "Итог", text: "Шифр взломан! Отряд [название] — настоящие разведчики-шифровальщики. Донесение принято. [X] очков на счёт отряда!" },
    ],
    equipment: ["Таблицы-шифры 10 шт.", "Конверты с заданиями 8 шт.", "Флажки семафорные 2 пары", "«Секретные документы» (реквизит)", "Карандаши 10 шт."],
    staff: ["Ведущий-шифровальщик", "Помощник (проверка ответов)"],
  },
];

const schedule = [
  { time: "09:00–09:20", label: "Сбор участников. Построение на центральном плацу. Регистрация команд.", type: "org", icon: "Users" },
  { time: "09:20–09:40", label: "Торжественное открытие. Приветственное слово. Внос знамени. Клятва участника.", type: "ceremony", icon: "Star" },
  { time: "09:40–09:50", label: "Общий инструктаж по безопасности. Раздача маршрутных листов командирам.", type: "safety", icon: "Shield" },
  { time: "09:50–10:00", label: "Разведение команд по стартовым станциям.", type: "org", icon: "MapPin" },
  { time: "10:00–11:20", label: "ИГРА — Ротация по 6 станциям (6 туров × 12 мин + переходы).", type: "game", icon: "Swords" },
  { time: "11:20–11:35", label: "Перерыв. Водопой. Медицинский осмотр при необходимости.", type: "break", icon: "Coffee" },
  { time: "11:35–11:55", label: "Финальный сбор. Сдача маршрутных листов. Подсчёт итогов.", type: "org", icon: "ClipboardList" },
  { time: "11:55–12:30", label: "Торжественное закрытие. Объявление результатов. Награждение.", type: "award", icon: "Medal" },
];

const openingScript = [
  {
    speaker: "Ведущий",
    role: "Главный ведущий церемонии",
    text: "Равняйсь! Смирно! Здравствуйте, юные защитники Отечества! Сегодня на территории нашего детского сада проходит военно-патриотическая спортивная игра «РУБЕЖ»!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "«Рубеж» — это черта, которую настоящий боец не сдаёт. Сегодня каждый из вас встанет на свой рубеж — рубеж смелости, ловкости, дружбы и патриотизма!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Сегодня в игре принимают участие 8 отрядов — [называет отряды]. Вас [число] — вы все герои этого дня!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Внос Знамени игры «Рубеж»! Отряд знаменосцев, шагом — марш! (Пауза. Торжественная музыка.)",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Участники игры «Рубеж»! Прошу всех повторить за мной Клятву участника!",
  },
  {
    speaker: "Все участники",
    role: "Хором",
    text: "Я, участник игры «Рубеж», клянусь быть честным и смелым! Клянусь помогать товарищам! Клянусь защищать свою Родину! Клянусь!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Слово предоставляется [должность — заведующая / директор / почётный гость].",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Командиры отрядов, получите маршрутные листы! По местам — шагом марш! Игра «РУБЕЖ» объявляется открытой!",
  },
];

const closingScript = [
  {
    speaker: "Ведущий",
    role: "",
    text: "Внимание! Всем отрядам построиться на центральном плацу! Игра «Рубеж» завершена!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Сегодня вы прошли шесть рубежей. Шесть испытаний. И каждый из вас — победитель, потому что вы не отступили!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Объявляю результаты! На третьем месте — отряд [название], набравший [X] очков! (Аплодисменты. Вручение медалей и грамот.)",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "На втором месте — отряд [название], набравший [X] очков! (Аплодисменты. Вручение.)",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "И победитель игры «Рубеж» — отряд [название]! (Торжественная музыка. Вручение главного приза.)",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Все участники игры «Рубеж» награждаются памятными медалями участника! Командиры отрядов, подойдите за медалями!",
  },
  {
    speaker: "Ведущий",
    role: "",
    text: "Игра «Рубеж» объявляется закрытой! Знамя — вынести! (Торжественная музыка.) Отряды, вольно! До следующего «Рубежа», юные герои!",
  },
];

const oath = "Я, участник игры «Рубеж», клянусь быть честным и смелым!\nКлянусь помогать товарищам!\nКлянусь защищать свою Родину!\nКлянусь!";

const typeColors: Record<string, string> = {
  org: "#4a7c24", ceremony: "#d4a017", safety: "#c0392b",
  game: "#2e6db4", break: "#8b7355", award: "#8e44ad",
};
const typeLabels: Record<string, string> = {
  org: "Организация", ceremony: "Церемония", safety: "Безопасность",
  game: "Игра", break: "Перерыв", award: "Награждение",
};

const goalData = {
  goal: "Воспитание у детей дошкольного возраста любви к Родине, уважения к защитникам Отечества и чувства гордости за свою страну через участие в командной военно-патриотической игре.",
  tasks: [
    {
      category: "Воспитательные",
      color: "#d4a017",
      emoji: "🎖️",
      items: [
        "Формировать чувство патриотизма, гражданственности и любви к Родине",
        "Воспитывать уважение к профессии военного, к подвигу защитников Отечества",
        "Развивать нравственные качества: ответственность, взаимовыручку, честность",
        "Укреплять командный дух и чувство единства со своим коллективом",
      ],
    },
    {
      category: "Развивающие",
      color: "#2e6db4",
      emoji: "🧠",
      items: [
        "Развивать физическую выносливость, ловкость, координацию движений",
        "Тренировать внимательность, наблюдательность и быстроту реакции",
        "Формировать умение действовать в команде, слушать и выполнять команды",
        "Расширять знания детей о военных профессиях и основах безопасности",
      ],
    },
    {
      category: "Образовательные",
      color: "#4a7c24",
      emoji: "📚",
      items: [
        "Познакомить детей с элементами военно-прикладных видов спорта (в игровой форме)",
        "Закрепить навыки оказания элементарной первой помощи",
        "Формировать начальные представления об ориентировании и разведке",
        "Обогащать словарный запас военной и патриотической тематики",
      ],
    },
    {
      category: "Организационные",
      color: "#8e44ad",
      emoji: "📋",
      items: [
        "Создать праздничную торжественную атмосферу для детей и педагогического коллектива",
        "Обеспечить участие всех 8 групп детского сада в едином мероприятии",
        "Провести мероприятие в соответствии с требованиями безопасности",
        "Дать каждому ребёнку возможность почувствовать себя победителем",
      ],
    },
  ],
  expectedResults: [
    "Каждый ребёнок получает опыт командной работы и поддержки товарища",
    "Дети знакомятся с понятиями «Родина», «защитник», «долг» в игровой форме",
    "Формируется позитивный образ военной профессии без агрессии и страха",
    "Педагоги получают готовый инструмент патриотического воспитания",
    "Создаются яркие воспоминания и эмоциональная связь с темой патриотизма",
  ],
};

const tabs = ["Цель и задачи", "Сценарий открытия", "Станции", "Расписание", "Закрытие и награждение"];

// ─── КОМПОНЕНТ ──────────────────────────────────────────────────────────────

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStation, setActiveStation] = useState<number | null>(null);
  const [diffMode, setDiffMode] = useState<"junior" | "senior">("senior");
  const [scriptMode, setScriptMode] = useState<"opening" | "closing">("opening");

  return (
    <div className="min-h-screen font-golos" style={{ background: "linear-gradient(160deg, #0a140a 0%, #141f14 50%, #0a140a 100%)" }}>
      {/* Фоновая текстура */}
      <div className="fixed inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a7c24' fill-opacity='0.06'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
      />

      {/* ── ШАПКА ── */}
      <header className="relative" style={{ background: "rgba(8,14,8,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,124,36,0.25)" }}>
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: "linear-gradient(135deg, #2d5016, #4a7c24)", border: "2px solid rgba(74,124,36,0.6)", boxShadow: "0 0 20px rgba(74,124,36,0.3)" }}>
              ⭐
            </div>
            <div>
              <p className="font-oswald text-xs tracking-[0.3em] uppercase mb-0.5" style={{ color: "#4a7c24" }}>
                Военно-патриотическая спортивная игра
              </p>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold tracking-[0.15em]" style={{ color: "#e8dcc8", textShadow: "0 0 40px rgba(74,124,36,0.4)" }}>
                «{GAME_TITLE}»
              </h1>
              <p className="text-sm mt-1" style={{ color: "rgba(168,200,130,0.6)" }}>
                {TOTAL_GROUPS} отрядов · {TOTAL_CHILDREN} участников · {CHILDREN_PER_GROUP} чел. в отряде
              </p>
            </div>
          </div>

          {/* Отряды */}
          <div className="flex flex-wrap gap-2 mt-4">
            {teams.map((t) => (
              <div key={t.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: `${t.color}22`, border: `1px solid ${t.color}44`, color: t.color }}>
                <span>{t.emoji}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── ТАБЫ ── */}
      <div className="sticky top-0 z-20" style={{ background: "rgba(8,14,8,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,124,36,0.15)" }}>
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className="font-oswald px-5 py-4 text-sm uppercase tracking-wider transition-all whitespace-nowrap"
                style={{ color: activeTab === i ? "#4a7c24" : "rgba(168,200,130,0.4)", borderBottom: activeTab === i ? "2px solid #4a7c24" : "2px solid transparent" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* ══════════════════════
            ТАБ 0: ЦЕЛЬ И ЗАДАЧИ
            ══════════════════════ */}
        {activeTab === 0 && (
          <div className="space-y-8">
            {/* Цель */}
            <div className="p-6 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(212,160,23,0.1), rgba(212,160,23,0.05))", border: "1px solid rgba(212,160,23,0.3)" }}>
              <p className="font-oswald text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#d4a017" }}>⭐ Цель игры</p>
              <p className="text-lg leading-relaxed" style={{ color: "#e8dcc8" }}>{goalData.goal}</p>
            </div>

            {/* Задачи по категориям */}
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-5" style={{ color: "#e8dcc8" }}>ЗАДАЧИ ИГРЫ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goalData.tasks.map((block, i) => (
                  <div key={i} className="p-5 rounded-xl"
                    style={{ background: `${block.color}0e`, border: `1px solid ${block.color}30` }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{block.emoji}</span>
                      <span className="font-oswald text-sm uppercase tracking-widest" style={{ color: block.color }}>{block.category}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "#e8dcc8" }}>
                          <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 font-oswald text-xs font-bold"
                            style={{ background: `${block.color}25`, color: block.color }}>{j + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Ожидаемые результаты */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(74,124,36,0.08)", border: "1px solid rgba(74,124,36,0.25)" }}>
              <h3 className="font-oswald text-sm uppercase tracking-widest mb-4" style={{ color: "#4a7c24" }}>Ожидаемые результаты</h3>
              <div className="space-y-2.5">
                {goalData.expectedResults.map((result, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "#e8dcc8" }}>
                    <Icon name="CheckCircle" size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#4a7c24" }} />
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            ТАБ 1: СЦЕНАРИЙ (ОТКРЫТИЕ / ЗАКРЫТИЕ)
            ══════════════════════════════════════ */}
        {activeTab === 1 && (
          <div>
            {/* Переключатель */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-oswald text-xl tracking-wide" style={{ color: "#e8dcc8" }}>ЦЕРЕМОНИАЛЬНЫЙ СЦЕНАРИЙ</h2>
              <div className="flex rounded overflow-hidden" style={{ border: "1px solid rgba(74,124,36,0.3)" }}>
                {(["opening", "closing"] as const).map((m) => (
                  <button key={m} onClick={() => setScriptMode(m)}
                    className="px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-all"
                    style={{ background: scriptMode === m ? "#2d5016" : "transparent", color: scriptMode === m ? "#a8c882" : "rgba(168,200,130,0.4)" }}>
                    {m === "opening" ? "Открытие" : "Закрытие"}
                  </button>
                ))}
              </div>
            </div>

            {/* Клятва — только при открытии */}
            {scriptMode === "opening" && (
              <div className="mb-6 p-5 rounded-lg" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)" }}>
                <p className="font-oswald text-xs tracking-widest uppercase mb-3" style={{ color: "#d4a017" }}>
                  ⭐ Клятва участника (хором)
                </p>
                <p className="font-oswald text-lg leading-relaxed whitespace-pre-line" style={{ color: "#e8dcc8" }}>{oath}</p>
              </div>
            )}

            {/* Реплики */}
            <div className="space-y-3">
              {(scriptMode === "opening" ? openingScript : closingScript).map((line, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-oswald text-sm font-bold"
                    style={{ background: line.speaker === "Все участники" ? "rgba(212,160,23,0.2)" : "rgba(74,124,36,0.2)", color: line.speaker === "Все участники" ? "#d4a017" : "#4a7c24", border: `1px solid ${line.speaker === "Все участники" ? "rgba(212,160,23,0.3)" : "rgba(74,124,36,0.3)"}` }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-oswald text-sm font-bold uppercase tracking-wide"
                        style={{ color: line.speaker === "Все участники" ? "#d4a017" : "#4a7c24" }}>
                        {line.speaker}
                      </span>
                      {line.role && <span className="text-xs px-2 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(232,220,200,0.4)" }}>{line.role}</span>}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#e8dcc8" }}>{line.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════
            ТАБ 1: СТАНЦИИ
            ══════════════════════ */}
        {activeTab === 2 && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="font-oswald text-xl tracking-wide" style={{ color: "#e8dcc8" }}>6 СТАНЦИЙ ИГРЫ</h2>
              <div className="flex rounded overflow-hidden" style={{ border: "1px solid rgba(74,124,36,0.3)" }}>
                {(["junior", "senior"] as const).map((mode) => (
                  <button key={mode} onClick={() => setDiffMode(mode)}
                    className="px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-all"
                    style={{ background: diffMode === mode ? "#2d5016" : "transparent", color: diffMode === mode ? "#a8c882" : "rgba(168,200,130,0.4)" }}>
                    {mode === "junior" ? "Подг. группа" : "Старшая группа"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {stations.map((s) => {
                const isOpen = activeStation === s.id;
                return (
                  <div key={s.id} className="rounded-xl overflow-hidden transition-all"
                    style={{ border: `1px solid ${isOpen ? s.accent : "rgba(255,255,255,0.08)"}`, background: isOpen ? `${s.color}55` : "rgba(255,255,255,0.03)" }}>

                    {/* Заголовок */}
                    <button className="w-full text-left p-5 flex items-center gap-4"
                      onClick={() => setActiveStation(isOpen ? null : s.id)}>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${s.color}99`, border: `1px solid ${s.accent}55` }}>
                        {s.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-oswald text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{s.code}</span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${s.accent}22`, color: s.accent }}>
                            {diffMode === "junior" ? s.points - 15 : s.points} очков
                          </span>
                        </div>
                        <h3 className="font-oswald text-xl font-bold tracking-wide" style={{ color: "#f0e8d8" }}>{s.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(168,200,130,0.6)" }}>
                          <Icon name="MapPin" size={10} /> {s.location} · <Icon name="Clock" size={10} /> {s.duration} мин
                        </p>
                      </div>
                      <div className="flex-shrink-0" style={{ color: "rgba(168,200,130,0.4)" }}>
                        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} />
                      </div>
                    </button>

                    {/* Раскрытая часть */}
                    {isOpen && (
                      <div className="px-5 pb-5 space-y-5">
                        {/* Объявление ведущего */}
                        <div className="p-4 rounded-lg italic" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
                          <p className="text-xs font-oswald uppercase tracking-widest mb-2" style={{ color: "#d4a017" }}>
                            📢 Объявление ведущего при встрече отряда
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: "#e8dcc8" }}>«{s.announcement}»</p>
                        </div>

                        {/* Два столбца: правила + скрипт */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-oswald text-xs tracking-widest uppercase mb-3" style={{ color: s.accent }}>
                              Правила — {diffMode === "junior" ? "подготовительная" : "старшая"} группа
                            </p>
                            <div className="space-y-2">
                              {(diffMode === "junior" ? s.rulesJunior : s.rulesSenior).map((rule, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 font-oswald text-xs"
                                    style={{ background: `${s.accent}33`, color: s.accent }}>{i + 1}</div>
                                  <span style={{ color: "#e8dcc8" }}>{rule}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="font-oswald text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(168,200,130,0.7)" }}>
                              Реплики ведущего
                            </p>
                            <div className="space-y-2">
                              {s.hostScript.map((line, i) => (
                                <div key={i} className="p-2.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                  <span className="font-oswald uppercase tracking-wide text-xs block mb-1" style={{ color: "rgba(168,200,130,0.5)" }}>{line.cue}</span>
                                  <span style={{ color: "#e8dcc8" }}>«{line.text}»</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Оборудование и персонал */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                          <div>
                            <p className="font-oswald text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(168,200,130,0.5)" }}>Оборудование</p>
                            <div className="space-y-1">
                              {s.equipment.map((e, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#c4c4a8" }}>
                                  <Icon name="Package" size={10} /> {e}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="font-oswald text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(168,200,130,0.5)" }}>Персонал</p>
                            <div className="space-y-1">
                              {s.staff.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#c4c4a8" }}>
                                  <Icon name="User" size={10} /> {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════
            ТАБ 3: РАСПИСАНИЕ
            ══════════════════════ */}
        {activeTab === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-6" style={{ color: "#e8dcc8" }}>ВРЕМЕННА́Я СЕТКА</h2>
              <div className="space-y-2">
                {schedule.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-32 text-right font-oswald text-sm flex-shrink-0" style={{ color: "#4a7c24" }}>{item.time}</div>
                    <div className="w-3 h-3 rounded-full flex-shrink-0 relative z-10"
                      style={{ background: typeColors[item.type], boxShadow: `0 0 8px ${typeColors[item.type]}88` }} />
                    <div className="flex-1 flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
                      style={{ background: `${typeColors[item.type]}12`, border: `1px solid ${typeColors[item.type]}28` }}>
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon} fallback="Clock" size={14} style={{ color: typeColors[item.type] }} />
                        <span className="text-sm" style={{ color: "#e8dcc8" }}>{item.label}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded flex-shrink-0 font-oswald uppercase"
                        style={{ background: `${typeColors[item.type]}22`, color: typeColors[item.type] }}>
                        {typeLabels[item.type]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Таблица ротации */}
            <div>
              <h3 className="font-oswald text-lg tracking-wide mb-4" style={{ color: "#e8dcc8" }}>МАРШРУТНАЯ ТАБЛИЦА РОТАЦИИ</h3>
              <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid rgba(74,124,36,0.2)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(74,124,36,0.15)" }}>
                      <th className="px-4 py-3 text-left font-oswald uppercase tracking-wide text-xs" style={{ color: "#4a7c24" }}>Отряд</th>
                      {["Тур 1", "Тур 2", "Тур 3", "Тур 4", "Тур 5", "Тур 6"].map(t => (
                        <th key={t} className="px-3 py-3 text-center font-oswald uppercase tracking-wide text-xs" style={{ color: "#4a7c24" }}>{t}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, ti) => (
                      <tr key={team.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: ti % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <span>{team.emoji}</span>
                            <span className="text-xs font-medium" style={{ color: team.color }}>{team.name}</span>
                          </div>
                        </td>
                        {rotationTable[ti].map((st, si) => {
                          const stData = stations.find(s => s.code === st);
                          return (
                            <td key={si} className="px-3 py-2.5 text-center">
                              <span className="text-xs px-2 py-0.5 rounded font-oswald"
                                style={{ background: stData ? `${stData.accent}22` : "rgba(255,255,255,0.05)", color: stData ? stData.accent : "rgba(255,255,255,0.3)" }}>
                                {st}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {stations.map(s => (
                  <div key={s.id} className="flex items-center gap-1.5 text-xs">
                    <span>{s.emoji}</span>
                    <span className="font-oswald" style={{ color: s.accent }}>{s.code}</span>
                    <span style={{ color: "rgba(232,220,200,0.5)" }}>— {s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            ТАБ 4: ЗАКРЫТИЕ И НАГРАЖДЕНИЕ
            ══════════════════════════════ */}
        {activeTab === 4 && (
          <div className="space-y-8">
            {/* Сценарий закрытия */}
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-4" style={{ color: "#e8dcc8" }}>СЦЕНАРИЙ ТОРЖЕСТВЕННОГО ЗАКРЫТИЯ</h2>
              <div className="space-y-3">
                {closingScript.map((line, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-oswald text-sm font-bold"
                      style={{ background: "rgba(142,68,173,0.2)", color: "#8e44ad", border: "1px solid rgba(142,68,173,0.3)" }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-oswald text-sm font-bold uppercase tracking-wide block mb-1" style={{ color: "#8e44ad" }}>{line.speaker}</span>
                      <p className="text-sm leading-relaxed" style={{ color: "#e8dcc8" }}>{line.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Система награждения */}
            <div>
              <h3 className="font-oswald text-lg tracking-wide mb-4" style={{ color: "#e8dcc8" }}>СИСТЕМА НАГРАЖДЕНИЯ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { place: "🥇 1 место", reward: "Кубок «Лучший отряд» + Грамота + Медали всем бойцам", color: "#d4a017" },
                  { place: "🥈 2 место", reward: "Грамота + Медали «За отвагу» всем бойцам", color: "#aaaaaa" },
                  { place: "🥉 3 место", reward: "Грамота + Медали «За стойкость» всем бойцам", color: "#c47a27" },
                  { place: "🏅 Все участники", reward: "Памятная медаль участника игры «Рубеж»", color: "#4a7c24" },
                  { place: "🎯 Лучший стрелок", reward: "Специальный приз «Меткий глаз»", color: "#c0392b" },
                  { place: "🔭 Лучший разведчик", reward: "Специальный приз «Орлиный взгляд»", color: "#2e6db4" },
                ].map((award, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg"
                    style={{ background: `${award.color}10`, border: `1px solid ${award.color}30` }}>
                    <div className="font-oswald font-bold text-sm" style={{ color: award.color, minWidth: 140 }}>{award.place}</div>
                    <p className="text-sm" style={{ color: "rgba(232,220,200,0.85)" }}>{award.reward}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Порядок церемонии */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(142,68,173,0.08)", border: "1px solid rgba(142,68,173,0.2)" }}>
              <h4 className="font-oswald tracking-wide mb-3" style={{ color: "#8e44ad" }}>ПОРЯДОК ЦЕРЕМОНИИ НАГРАЖДЕНИЯ</h4>
              <ol className="space-y-2">
                {[
                  "Все отряды построены на центральном плацу",
                  "Ведущий объявляет итоги по каждой станции",
                  "Объявление 3-го места — вручение грамот и медалей",
                  "Объявление 2-го места — вручение грамот и медалей",
                  "Объявление 1-го места — торжественная музыка, вручение кубка",
                  "Вручение медалей всем участникам (командиры получают за отряд)",
                  "Вручение специальных призов",
                  "Общая фотография «Игра Рубеж — 2026»",
                  "Вынос знамени. Закрытие игры.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#e8dcc8" }}>
                    <span className="font-oswald font-bold text-xs w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(142,68,173,0.25)", color: "#8e44ad" }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

      </main>

      {/* Подвал */}
      <footer className="mt-12 py-5 text-center" style={{ borderTop: "1px solid rgba(74,124,36,0.15)" }}>
        <p className="font-oswald text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(74,124,36,0.4)" }}>
          Игра «Рубеж» · {GAME_SUBTITLE} · 2026
        </p>
      </footer>
    </div>
  );
}