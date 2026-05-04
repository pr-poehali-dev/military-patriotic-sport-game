import { useState } from "react";
import Icon from "@/components/ui/icon";

const stations = [
  {
    id: 1,
    code: "С-01",
    name: "Разведка",
    emoji: "🔭",
    color: "#2d5016",
    accent: "#4a7c24",
    location: "Поляна A",
    duration: 12,
    description: "Команда выполняет задания на наблюдательность, ориентирование на местности и работу с картой.",
    rulesJunior: [
      "Найти 5 спрятанных предметов на полигоне за 5 минут",
      "Определить стороны света по компасу",
      "Назвать ориентиры по упрощённой карте",
    ],
    rulesSenior: [
      "Найти 8 замаскированных объектов за 4 минуты",
      "Проложить маршрут по топографической карте",
      "Определить расстояние до цели визуально",
      "Записать донесение в условных обозначениях",
    ],
    pointsJunior: 30,
    pointsSenior: 50,
    equipment: ["Компасы (6 шт.)", "Топографические карты", "Бинокли (2 шт.)", "Маскировочные предметы (15 шт.)"],
    staff: ["Инструктор-разведчик", "Помощник (подсчёт очков)"],
  },
  {
    id: 2,
    code: "С-02",
    name: "Полоса препятствий",
    emoji: "🏃",
    color: "#4a3728",
    accent: "#8b6347",
    location: "Спортивная площадка",
    duration: 15,
    description: "Прохождение физической полосы препятствий с элементами военной подготовки.",
    rulesJunior: [
      "Пройти 5 упрощённых препятствий",
      "Проползти под сеткой (высота 50 см)",
      "Перепрыгнуть через 3 бревна",
      "Временной норматив: 3 минуты",
    ],
    rulesSenior: [
      "Пройти 8 полных препятствий",
      "Проползти под сеткой (высота 35 см)",
      "Перенести «раненого» (мешок 5 кг) 10 метров",
      "Временной норматив: 2 минуты 30 секунд",
    ],
    pointsJunior: 40,
    pointsSenior: 60,
    equipment: ["Маскировочная сеть (10×5 м)", "Брёвна (6 шт.)", "Мешок 5 кг", "Секундомер", "Страховочные маты"],
    staff: ["Физрук / инструктор", "Медик (обязательно)", "Страховщик (2 чел.)"],
  },
  {
    id: 3,
    code: "С-03",
    name: "Стрельба",
    emoji: "🎯",
    color: "#8b1a1a",
    accent: "#c0392b",
    location: "Тир / Стрельбище",
    duration: 12,
    description: "Стрельба из пневматического оружия или лазерного тира по мишеням.",
    rulesJunior: [
      "5 выстрелов из пневматического пистолета",
      "Дистанция 5 метров",
      "Мишень: крупная (диаметр 30 см)",
      "Обязательный инструктаж по ТБ перед стрельбой",
    ],
    rulesSenior: [
      "10 выстрелов из пневматической винтовки",
      "Дистанция 10 метров",
      "Мишень: стандартная (диаметр 20 см)",
      "Стрельба из трёх положений: стоя, с колена, лёжа",
    ],
    pointsJunior: 50,
    pointsSenior: 70,
    equipment: ["Пневматические пистолеты (3 шт.)", "Пневматические винтовки (2 шт.)", "Мишени (30 шт.)", "Защитные очки (20 шт.)", "Беруши (20 шт.)"],
    staff: ["Сертифицированный инструктор по стрельбе", "Ответственный за ТБ", "Помощник (смена мишеней)"],
  },
  {
    id: 4,
    code: "С-04",
    name: "Маршировка",
    emoji: "🥁",
    color: "#1a2e4a",
    accent: "#2e5d8e",
    location: "Плац / Площадка",
    duration: 10,
    description: "Строевая подготовка и марширование в составе отряда.",
    rulesJunior: [
      "Построение в шеренгу по команде (30 сек.)",
      "Выполнение 3 строевых приёмов: равняйсь, смирно, вольно",
      "Марш 50 метров в ногу",
    ],
    rulesSenior: [
      "Построение в колонну по двое (20 сек.)",
      "Выполнение 6 строевых приёмов",
      "Марш 100 метров с перестроением",
      "Смена направления по команде",
    ],
    pointsJunior: 25,
    pointsSenior: 40,
    equipment: ["Барабан / метроном", "Мегафон", "Разметочные конусы (10 шт.)"],
    staff: ["Военрук / инструктор по строевой", "Командиры отрядов"],
  },
  {
    id: 5,
    code: "С-05",
    name: "Первая помощь",
    emoji: "🏥",
    color: "#1a4a3a",
    accent: "#27ae60",
    location: "Медпункт",
    duration: 12,
    description: "Практические навыки оказания первой медицинской помощи в полевых условиях.",
    rulesJunior: [
      "Наложить повязку на «раненую» руку",
      "Правильно уложить «пострадавшего»",
      "Вызвать «скорую помощь» (разыгрывается сцена)",
    ],
    rulesSenior: [
      "Наложить шину при переломе",
      "Остановить условное кровотечение жгутом",
      "Провести ИВЛ на манекене (3 цикла)",
      "Транспортировка «раненого» на носилках 15 м",
    ],
    pointsJunior: 35,
    pointsSenior: 55,
    equipment: ["Медицинские манекены (2 шт.)", "Комплекты бинтов (20 шт.)", "Жгуты (10 шт.)", "Шины (6 шт.)", "Носилки (2 пары)"],
    staff: ["Медик / фельдшер", "Ассистент-демонстратор"],
  },
  {
    id: 6,
    code: "С-06",
    name: "Шифрование",
    emoji: "🔐",
    color: "#3d1a4a",
    accent: "#8e44ad",
    location: "Штабная палатка",
    duration: 10,
    description: "Задания на шифрование и дешифровку военных донесений, морзянку и коды.",
    rulesJunior: [
      "Расшифровать 3 слова по таблице замены букв",
      "Передать сообщение флажковым семафором (5 букв)",
    ],
    rulesSenior: [
      "Расшифровать секретное донесение (15 слов)",
      "Передать сообщение азбукой Морзе",
      "Составить зашифрованный приказ для следующей команды",
    ],
    pointsJunior: 30,
    pointsSenior: 50,
    equipment: ["Таблицы шифров (20 шт.)", "Флажки семафорные (4 пары)", "Радиостанции-имитаторы (2 шт.)", "Бланки донесений"],
    staff: ["Инструктор-связист", "Шифровальщик (проверка заданий)"],
  },
];

const schedule = [
  { time: "09:00", label: "Сбор и регистрация", type: "org", duration: 20 },
  { time: "09:20", label: "Торжественное построение", type: "org", duration: 15 },
  { time: "09:35", label: "Инструктаж по безопасности", type: "safety", duration: 10 },
  { time: "09:45", label: "Распределение по командам", type: "org", duration: 10 },
  { time: "09:55", label: "Старт — Ротация по станциям", type: "game", duration: 90 },
  { time: "11:25", label: "Перерыв / обед", type: "break", duration: 30 },
  { time: "11:55", label: "2-й круг ротации (при необходимости)", type: "game", duration: 60 },
  { time: "12:55", label: "Финальный сбор и подсчёт очков", type: "org", duration: 15 },
  { time: "13:10", label: "Торжественное закрытие и награждение", type: "award", duration: 30 },
  { time: "13:40", label: "Завершение мероприятия", type: "org", duration: 10 },
];

const typeColors: Record<string, string> = {
  org: "#4a7c24",
  safety: "#8b1a1a",
  game: "#2e5d8e",
  break: "#8b7355",
  award: "#d4a017",
};

const typeLabels: Record<string, string> = {
  org: "Орг.",
  safety: "Безопасность",
  game: "Игра",
  break: "Перерыв",
  award: "Награждение",
};

const generalResources = {
  personnel: [
    { role: "Главный организатор", count: 1, note: "Общее руководство" },
    { role: "Инструкторы на станциях", count: 6, note: "По одному на каждую" },
    { role: "Медицинский персонал", count: 2, note: "Фельдшер + медсестра" },
    { role: "Судьи-счётчики", count: 3, note: "Подсчёт очков" },
    { role: "Волонтёры-помощники", count: 6, note: "Страховка и логистика" },
    { role: "Фотограф / видеограф", count: 1, note: "" },
  ],
  safety: [
    "Медпункт с носилками и аптечкой первой помощи",
    "Страховочные маты на всех физических станциях",
    "Обязательный инструктаж ТБ перед стартом",
    "Запрет на участие при наличии медотвода",
    "Зоны ожидания вне полосы препятствий",
    "Связь между станциями (рации / телефоны)",
    "Экстренный эвакуационный план",
  ],
  awards: [
    { place: "1 место", reward: "Медаль «Лучший отряд» + Грамота + Памятный приз", color: "#d4a017" },
    { place: "2 место", reward: "Медаль «За отвагу» + Грамота", color: "#aaaaaa" },
    { place: "3 место", reward: "Медаль «За стойкость» + Грамота", color: "#c47a27" },
    { place: "Все участники", reward: "Памятная медаль участника + Грамота", color: "#4a7c24" },
    { place: "Лучший стрелок", reward: "Специальный приз «Меткий глаз»", color: "#8b1a1a" },
    { place: "Лучший разведчик", reward: "Специальный приз «Орлиный глаз»", color: "#2e5d8e" },
  ],
};

const tabs = ["Станции", "Расписание", "Ресурсы", "Награждение"];

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStation, setActiveStation] = useState<number | null>(null);
  const [diffMode, setDiffMode] = useState<"junior" | "senior">("senior");

  return (
    <div className="min-h-screen font-golos" style={{ background: "linear-gradient(160deg, #0d1a0d 0%, #1a2e1a 40%, #0d1a0d 100%)" }}>
      {/* Texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234a7c24' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Header */}
      <header className="relative border-b" style={{ borderColor: "rgba(74,124,36,0.3)", background: "rgba(13,26,13,0.8)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded" style={{ background: "linear-gradient(135deg, #2d5016, #4a7c24)", border: "1px solid rgba(74,124,36,0.5)" }}>
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="font-oswald text-xs tracking-widest uppercase" style={{ color: "#4a7c24" }}>Организационный план</p>
              <h1 className="font-oswald text-2xl md:text-3xl font-bold tracking-wide" style={{ color: "#e8dcc8" }}>
                ВОЕННО-ПАТРИОТИЧЕСКАЯ ИГРА
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { icon: "Users", text: "До 120 участников" },
              { icon: "MapPin", text: "6 станций" },
              { icon: "Clock", text: "4 часа 40 минут" },
              { icon: "Shield", text: "4–7 лет, 2 группы" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 px-3 py-1.5 rounded text-sm" style={{ background: "rgba(74,124,36,0.15)", border: "1px solid rgba(74,124,36,0.25)", color: "#a8c882" }}>
                <Icon name={item.icon} fallback="Info" size={14} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-10" style={{ background: "rgba(13,26,13,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,124,36,0.2)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="font-oswald px-5 py-4 text-sm uppercase tracking-wider transition-all relative"
                style={{
                  color: activeTab === i ? "#4a7c24" : "rgba(168,200,130,0.5)",
                  borderBottom: activeTab === i ? "2px solid #4a7c24" : "2px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* TAB: STATIONS */}
        {activeTab === 0 && (
          <div>
            {/* Difficulty toggle */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-oswald text-xl tracking-wide" style={{ color: "#e8dcc8" }}>СТАНЦИИ ИГРЫ</h2>
              <div className="flex rounded overflow-hidden" style={{ border: "1px solid rgba(74,124,36,0.4)" }}>
                {(["junior", "senior"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDiffMode(mode)}
                    className="px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-all"
                    style={{
                      background: diffMode === mode ? "#2d5016" : "transparent",
                      color: diffMode === mode ? "#a8c882" : "rgba(168,200,130,0.4)",
                    }}
                  >
                    {mode === "junior" ? "Подгот. группа" : "Старшая группа"}
                  </button>
                ))}
              </div>
            </div>

            {/* Station grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stations.map((s) => (
                <div
                  key={s.id}
                  className="rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    background: activeStation === s.id ? `${s.color}55` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeStation === s.id ? s.accent : "rgba(255,255,255,0.08)"}`,
                  }}
                  onClick={() => setActiveStation(activeStation === s.id ? null : s.id)}
                >
                  {/* Card header */}
                  <div className="p-4 rounded-t-lg" style={{ background: `linear-gradient(135deg, ${s.color}aa, ${s.accent}55)` }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-oswald text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>{s.code}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-2xl">{s.emoji}</span>
                          <h3 className="font-oswald text-lg font-bold tracking-wide" style={{ color: "#f0e8d8" }}>{s.name}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-oswald text-2xl font-bold" style={{ color: "#d4a017" }}>
                          {diffMode === "junior" ? s.pointsJunior : s.pointsSenior}
                        </div>
                        <div className="text-xs" style={{ color: "rgba(212,160,23,0.7)" }}>очков</div>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: "rgba(168,200,130,0.7)" }}>
                      <span className="flex items-center gap-1"><Icon name="MapPin" size={11} /> {s.location}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={11} /> {s.duration} мин</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(232,220,200,0.7)" }}>{s.description}</p>

                    {/* Rules */}
                    <div className="space-y-1.5">
                      {(diffMode === "junior" ? s.rulesJunior : s.rulesSenior).map((rule, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: s.accent }} />
                          <span style={{ color: "#e8dcc8" }}>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable equipment */}
                  {activeStation === s.id && (
                    <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <p className="font-oswald text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(168,200,130,0.6)" }}>Оборудование</p>
                      <div className="space-y-1">
                        {s.equipment.map((e, i) => (
                          <div key={i} className="text-xs flex items-center gap-2" style={{ color: "#c4c4a8" }}>
                            <Icon name="Package" size={10} />
                            {e}
                          </div>
                        ))}
                      </div>
                      <p className="font-oswald text-xs tracking-widest uppercase mt-3 mb-2" style={{ color: "rgba(168,200,130,0.6)" }}>Персонал</p>
                      <div className="space-y-1">
                        {s.staff.map((p, i) => (
                          <div key={i} className="text-xs flex items-center gap-2" style={{ color: "#c4c4a8" }}>
                            <Icon name="User" size={10} />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SCHEDULE */}
        {activeTab === 1 && (
          <div>
            <h2 className="font-oswald text-xl tracking-wide mb-6" style={{ color: "#e8dcc8" }}>ВРЕМЕННАЯ СЕТКА МЕРОПРИЯТИЯ</h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded" style={{ background: typeColors[key] }} />
                  <span style={{ color: "rgba(232,220,200,0.7)" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: "rgba(74,124,36,0.3)" }} />
              <div className="space-y-2">
                {schedule.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-16 text-right font-oswald text-sm font-bold flex-shrink-0" style={{ color: "#4a7c24" }}>
                      {item.time}
                    </div>
                    <div className="w-3 h-3 rounded-full flex-shrink-0 relative z-10" style={{ background: typeColors[item.type], boxShadow: `0 0 8px ${typeColors[item.type]}66` }} />
                    <div
                      className="flex-1 flex items-center justify-between px-4 py-2.5 rounded"
                      style={{
                        background: `${typeColors[item.type]}18`,
                        border: `1px solid ${typeColors[item.type]}33`,
                      }}
                    >
                      <div>
                        <span className="text-sm font-medium" style={{ color: "#e8dcc8" }}>{item.label}</span>
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: `${typeColors[item.type]}33`, color: typeColors[item.type] }}>
                          {typeLabels[item.type]}
                        </span>
                      </div>
                      <div className="font-oswald text-sm" style={{ color: "rgba(212,160,23,0.8)" }}>
                        {item.duration} мин
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rotation diagram */}
            <div className="mt-10">
              <h3 className="font-oswald text-lg tracking-wide mb-4" style={{ color: "#e8dcc8" }}>СХЕМА РОТАЦИИ КОМАНД</h3>
              <div className="rounded-lg p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,124,36,0.2)" }}>
                <p className="text-sm mb-4" style={{ color: "rgba(232,220,200,0.6)" }}>
                  6 команд × 6 станций — одновременная ротация каждые 12–15 минут
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {stations.map((s) => (
                    <div key={s.id} className="text-center">
                      <div
                        className="w-full aspect-square rounded-lg flex flex-col items-center justify-center mb-2"
                        style={{ background: `${s.color}66`, border: `1px solid ${s.accent}55` }}
                      >
                        <span className="text-2xl">{s.emoji}</span>
                        <span className="font-oswald text-xs mt-1" style={{ color: s.accent }}>{s.code}</span>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(232,220,200,0.6)" }}>{s.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs" style={{ color: "rgba(168,200,130,0.7)" }}>
                  <div className="flex items-center gap-1"><Icon name="Users" size={12} />Команда А → С-01 → С-02 → ...</div>
                  <div className="flex items-center gap-1"><Icon name="Users" size={12} />Команда Б → С-02 → С-03 → ...</div>
                  <div className="flex items-center gap-1"><Icon name="Users" size={12} />Команда В → С-03 → С-04 → ...</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: RESOURCES */}
        {activeTab === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-6" style={{ color: "#e8dcc8" }}>ПЕРСОНАЛ МЕРОПРИЯТИЯ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {generalResources.personnel.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,124,36,0.2)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,124,36,0.2)", border: "1px solid rgba(74,124,36,0.3)" }}>
                      <span className="font-oswald font-bold" style={{ color: "#4a7c24" }}>{p.count}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#e8dcc8" }}>{p.role}</p>
                      {p.note && <p className="text-xs" style={{ color: "rgba(168,200,130,0.6)" }}>{p.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p className="text-sm font-medium flex items-center gap-2" style={{ color: "#d4a017" }}>
                  <Icon name="Users" size={14} />
                  Итого: {generalResources.personnel.reduce((a, p) => a + p.count, 0)} человек персонала
                </p>
              </div>
            </div>

            {/* All equipment summary */}
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-4" style={{ color: "#e8dcc8" }}>СВОДНЫЙ СПИСОК ОБОРУДОВАНИЯ</h2>
              <div className="space-y-3">
                {stations.map((s) => (
                  <div key={s.id} className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="px-4 py-2.5 flex items-center gap-3" style={{ background: `${s.color}66` }}>
                      <span>{s.emoji}</span>
                      <span className="font-oswald text-sm tracking-wide" style={{ color: "#e8dcc8" }}>{s.code} — {s.name}</span>
                    </div>
                    <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5" style={{ background: "rgba(255,255,255,0.03)" }}>
                      {s.equipment.map((eq, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "#c4c4a8" }}>
                          <Icon name="CheckSquare" size={12} />
                          {eq}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div>
              <h2 className="font-oswald text-xl tracking-wide mb-4" style={{ color: "#e8dcc8" }}>
                <span className="mr-2" style={{ color: "#8b1a1a" }}>⚠</span>
                ТРЕБОВАНИЯ БЕЗОПАСНОСТИ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generalResources.safety.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(139,26,26,0.08)", border: "1px solid rgba(139,26,26,0.2)" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#8b1a1a" }} />
                    <span className="text-sm" style={{ color: "#e8dcc8" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: AWARDS */}
        {activeTab === 3 && (
          <div>
            <h2 className="font-oswald text-xl tracking-wide mb-6" style={{ color: "#e8dcc8" }}>СИСТЕМА НАГРАЖДЕНИЯ</h2>

            {/* Score system */}
            <div className="mb-8 p-5 rounded-lg" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
              <h3 className="font-oswald text-lg tracking-wide mb-3" style={{ color: "#d4a017" }}>СИСТЕМА ОЧКОВ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stations.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="flex items-center gap-2">
                      <span>{s.emoji}</span>
                      <span className="text-sm" style={{ color: "rgba(232,220,200,0.8)" }}>{s.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: "rgba(212,160,23,0.6)" }}>до</div>
                      <div className="font-oswald font-bold" style={{ color: "#d4a017" }}>{s.pointsSenior}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(212,160,23,0.2)" }}>
                <span className="font-oswald uppercase tracking-wide text-sm" style={{ color: "#d4a017" }}>Максимум за игру (старшая)</span>
                <span className="font-oswald text-2xl font-bold" style={{ color: "#d4a017" }}>
                  {stations.reduce((a, s) => a + s.pointsSenior, 0)} очков
                </span>
              </div>
            </div>

            {/* Awards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {generalResources.awards.map((award, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg flex items-start gap-4"
                  style={{
                    background: `${award.color}12`,
                    border: `1px solid ${award.color}33`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-oswald font-bold text-sm"
                    style={{ background: `${award.color}33`, color: award.color, border: `2px solid ${award.color}66` }}
                  >
                    {i + 1 <= 3 ? `${i + 1}` : "🏅"}
                  </div>
                  <div>
                    <p className="font-oswald font-bold tracking-wide text-sm mb-1" style={{ color: award.color }}>{award.place}</p>
                    <p className="text-sm" style={{ color: "rgba(232,220,200,0.8)" }}>{award.reward}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ceremony note */}
            <div className="mt-6 p-4 rounded-lg" style={{ background: "rgba(74,124,36,0.1)", border: "1px solid rgba(74,124,36,0.25)" }}>
              <h4 className="font-oswald tracking-wide mb-2" style={{ color: "#4a7c24" }}>ПОРЯДОК ЦЕРЕМОНИИ НАГРАЖДЕНИЯ</h4>
              <ol className="space-y-1.5">
                {[
                  "Торжественное построение всех участников",
                  "Объявление результатов по станциям",
                  "Награждение победителей по местам (3 → 2 → 1)",
                  "Вручение медалей всем участникам",
                  "Вручение специальных призов",
                  "Общее фото на память",
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#e8dcc8" }}>
                    <span className="font-oswald font-bold text-xs w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,124,36,0.3)", color: "#4a7c24" }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-4 text-center" style={{ borderTop: "1px solid rgba(74,124,36,0.2)" }}>
        <p className="text-xs font-oswald tracking-widest uppercase" style={{ color: "rgba(74,124,36,0.5)" }}>
          Военно-патриотическая игра · Организационный план · 2026
        </p>
      </footer>
    </div>
  );
}