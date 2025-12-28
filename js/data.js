// --- SKILLS DATABASE (FULL v0.2) ---

const SKILLS_DB = {
    frontend: [
        // --- RANK 1: INTERN ---
        { id: 'fe_01', rank: 'Intern', reqLevel: 1, name: 'HTML5 Semantics', price: 0, desc: 'Базовый клик $1', effect: () => { CONFIG.baseLineRate += 1; } },
        { id: 'fe_02', rank: 'Intern', reqLevel: 2, name: 'CSS Box Model', price: 50, desc: 'Клик +$1', effect: () => { CONFIG.baseLineRate += 1; } },
        { id: 'fe_03', rank: 'Intern', reqLevel: 3, name: 'Google Fonts', price: 100, desc: 'Клик +$2', effect: () => { CONFIG.baseLineRate += 2; } },
        { id: 'fe_04', rank: 'Intern', reqLevel: 4, name: 'Flexbox Layout', price: 200, desc: 'Энергия тратится на 10% меньше', effect: () => { CONFIG.energyCost = Math.floor(CONFIG.energyCost * 0.9); } },
        { id: 'fe_05', rank: 'Intern', reqLevel: 5, name: 'CSS Grid', price: 400, desc: 'Клик +$3', effect: () => { CONFIG.baseLineRate += 3; } },

        // --- RANK 2: JUNIOR ---
        { id: 'fe_06', rank: 'Junior', reqLevel: 7, name: 'Git Basics', price: 800, desc: 'Шанс сохранить энергию (5%)', effect: () => { /* Реализуется в main.js */ } },
        { id: 'fe_07', rank: 'Junior', reqLevel: 9, name: 'JavaScript Syntax', price: 1500, desc: 'Множитель клика x1.2', effect: () => { CONFIG.baseLineRate = Math.floor(CONFIG.baseLineRate * 1.2); } },
        { id: 'fe_08', rank: 'Junior', reqLevel: 11, name: 'DOM Manipulation', price: 2500, desc: 'Клик +$10', effect: () => { CONFIG.baseLineRate += 10; } },
        { id: 'fe_09', rank: 'Junior', reqLevel: 13, name: 'Fetch API / AJAX', price: 4000, desc: 'Открывает случайные шабашки', effect: () => { /* События в v0.3 */ } },
        { id: 'fe_10', rank: 'Junior', reqLevel: 15, name: 'NPM & Yarn', price: 6000, desc: 'Пассивный доход +$5/сек', effect: () => { state.passiveIncome += 5; } },

        // --- RANK 3: MIDDLE ---
        { id: 'fe_11', rank: 'Middle', reqLevel: 18, name: 'Webpack / Vite', price: 10000, desc: 'Оптимизация сборки', effect: () => { CONFIG.baseLineRate += 15; } },
        { id: 'fe_12', rank: 'Middle', reqLevel: 21, name: 'React.js Core', price: 18000, desc: 'Множитель клика x1.5', effect: () => { CONFIG.baseLineRate = Math.floor(CONFIG.baseLineRate * 1.5); } },
        { id: 'fe_13', rank: 'Middle', reqLevel: 24, name: 'React Hooks', price: 25000, desc: 'Макс. Энергия +20', effect: () => { state.maxEnergy += 20; } },
        { id: 'fe_14', rank: 'Middle', reqLevel: 27, name: 'Redux / Zustand', price: 40000, desc: 'Эффективность кофе +30%', effect: () => { CONFIG.coffeeRestore = Math.floor(CONFIG.coffeeRestore * 1.3); } },
        { id: 'fe_15', rank: 'Middle', reqLevel: 30, name: 'Tailwind CSS', price: 60000, desc: 'Клик +$50', effect: () => { CONFIG.baseLineRate += 50; } },

        // --- RANK 4: SENIOR ---
        { id: 'fe_16', rank: 'Senior', reqLevel: 34, name: 'TypeScript', price: 100000, desc: 'Множитель клика x2.0', effect: () => { CONFIG.baseLineRate *= 2; } },
        { id: 'fe_17', rank: 'Senior', reqLevel: 38, name: 'Next.js (SSR)', price: 150000, desc: 'Пассивный доход x1.5', effect: () => { state.passiveIncome = Math.floor(state.passiveIncome * 1.5); } },
        { id: 'fe_18', rank: 'Senior', reqLevel: 42, name: 'Unit Testing (Jest)', price: 250000, desc: 'Шанс крита +10%', effect: () => { state.critChance += 0.1; } },
        { id: 'fe_19', rank: 'Senior', reqLevel: 46, name: 'CI/CD Pipelines', price: 400000, desc: 'Авто-клик +$50', effect: () => { CONFIG.baseLineRate += 50; } },
        { id: 'fe_20', rank: 'Senior', reqLevel: 50, name: 'PWA', price: 650000, desc: 'Оффлайн доход (в будущем)', effect: () => { /* Logic v0.3 */ } },

        // --- RANK 5: TEAM LEAD ---
        { id: 'fe_21', rank: 'Lead', reqLevel: 55, name: 'Code Review', price: 1000000, desc: 'Опыт качается быстрее', effect: () => { /* XP boost logic */ } },
        { id: 'fe_22', rank: 'Lead', reqLevel: 60, name: 'Design Systems', price: 1800000, desc: 'Клик +$500', effect: () => { CONFIG.baseLineRate += 500; } },
        { id: 'fe_23', rank: 'Lead', reqLevel: 65, name: 'Web Accessibility', price: 3000000, desc: 'Пассив +$1000/сек', effect: () => { state.passiveIncome += 1000; } },
        { id: 'fe_24', rank: 'Lead', reqLevel: 70, name: 'Performance Opt.', price: 5000000, desc: 'Реген энергии +1/сек', effect: () => { state.energyRegen += 1; } },
        { id: 'fe_25', rank: 'Lead', reqLevel: 75, name: 'Mentoring Juniors', price: 8000000, desc: 'Автокликер x5 (условно)', effect: () => { CONFIG.baseLineRate += 1000; } },

        // --- RANK 6: ARCHITECT ---
        { id: 'fe_26', rank: 'Architect', reqLevel: 81, name: 'WebAssembly', price: 15000000, desc: 'Множитель клика x5.0', effect: () => { CONFIG.baseLineRate *= 5; } },
        { id: 'fe_27', rank: 'Architect', reqLevel: 87, name: 'WebGL / Three.js', price: 30000000, desc: 'Шанс мега-крита', effect: () => { state.critChance += 0.2; } },
        { id: 'fe_28', rank: 'Architect', reqLevel: 93, name: 'Micro-frontends', price: 60000000, desc: 'Пассив x3.0', effect: () => { state.passiveIncome *= 3; } },
        { id: 'fe_29', rank: 'Architect', reqLevel: 99, name: 'Own UI Library', price: 100000000, desc: 'Клик +$5,000', effect: () => { CONFIG.baseLineRate += 5000; } },
        { id: 'fe_30', rank: 'Architect', reqLevel: 105, name: 'Internet 3.0', price: 1000000000, desc: 'PRESTIGE MODE', effect: () => { /* Win */ } }
    ],

    backend: [
        // --- RANK 1: INTERN ---
        { id: 'be_01', rank: 'Intern', reqLevel: 1, name: 'Bash / Terminal', price: 0, desc: 'Пассив +$1/сек', effect: () => { state.passiveIncome += 1; } },
        { id: 'be_02', rank: 'Intern', reqLevel: 2, name: 'Python Syntax', price: 60, desc: 'Пассив +$2/сек', effect: () => { state.passiveIncome += 2; } },
        { id: 'be_03', rank: 'Intern', reqLevel: 3, name: 'Algorithms 101', price: 120, desc: 'Макс. Энергия +10', effect: () => { state.maxEnergy += 10; } },
        { id: 'be_04', rank: 'Intern', reqLevel: 4, name: 'HTTP Protocols', price: 250, desc: 'Пассив +$3/сек', effect: () => { state.passiveIncome += 3; } },
        { id: 'be_05', rank: 'Intern', reqLevel: 5, name: 'Git for Teams', price: 450, desc: 'Клик +$5', effect: () => { CONFIG.baseLineRate += 5; } },

        // --- RANK 2: JUNIOR ---
        { id: 'be_06', rank: 'Junior', reqLevel: 7, name: 'SQL Basics', price: 900, desc: 'Пассив +$10/сек', effect: () => { state.passiveIncome += 10; } },
        { id: 'be_07', rank: 'Junior', reqLevel: 9, name: 'OOP Principles', price: 1600, desc: 'Множитель Пассива x1.1', effect: () => { state.passiveIncome = Math.floor(state.passiveIncome * 1.1); } },
        { id: 'be_08', rank: 'Junior', reqLevel: 11, name: 'Flask / Django', price: 3000, desc: 'Пассив +$20/сек', effect: () => { state.passiveIncome += 20; } },
        { id: 'be_09', rank: 'Junior', reqLevel: 13, name: 'REST API Design', price: 5000, desc: 'Открывает HighLoad заказы', effect: () => { /* Биржа v0.2 */ } },
        { id: 'be_10', rank: 'Junior', reqLevel: 15, name: 'Linux Admin', price: 8000, desc: 'Сервер не падает', effect: () => { state.maxEnergy += 20; } },

        // --- RANK 3: MIDDLE ---
        { id: 'be_11', rank: 'Middle', reqLevel: 18, name: 'Docker', price: 15000, desc: 'Пассив +$50/сек', effect: () => { state.passiveIncome += 50; } },
        { id: 'be_12', rank: 'Middle', reqLevel: 21, name: 'PostgreSQL Adv', price: 25000, desc: 'Крит доход +5%', effect: () => { state.critChance += 0.05; } },
        { id: 'be_13', rank: 'Middle', reqLevel: 24, name: 'Redis / Caching', price: 40000, desc: 'Энергия тратится медленнее', effect: () => { CONFIG.energyCost = Math.floor(CONFIG.energyCost * 0.9); } },
        { id: 'be_14', rank: 'Middle', reqLevel: 27, name: 'Nginx Config', price: 65000, desc: 'Пассив +$100/сек', effect: () => { state.passiveIncome += 100; } },
        { id: 'be_15', rank: 'Middle', reqLevel: 30, name: 'Unit Testing', price: 90000, desc: 'Шанс избежать бага', effect: () => { /* Logic */ } },

        // --- RANK 4: SENIOR ---
        { id: 'be_16', rank: 'Senior', reqLevel: 34, name: 'AsyncIO', price: 150000, desc: 'Множитель Пассива x1.5', effect: () => { state.passiveIncome = Math.floor(state.passiveIncome * 1.5); } },
        { id: 'be_17', rank: 'Senior', reqLevel: 38, name: 'MongoDB / NoSQL', price: 250000, desc: 'Хранилище денег x2', effect: () => { /* Logic */ } },
        { id: 'be_18', rank: 'Senior', reqLevel: 42, name: 'CI/CD Actions', price: 400000, desc: 'Бонус к оффлайну', effect: () => { /* Logic */ } },
        { id: 'be_19', rank: 'Senior', reqLevel: 46, name: 'RabbitMQ / Kafka', price: 700000, desc: 'Пассив +$500/сек', effect: () => { state.passiveIncome += 500; } },
        { id: 'be_20', rank: 'Senior', reqLevel: 50, name: 'Go (Golang)', price: 1000000, desc: 'Множитель Пассива x2.0', effect: () => { state.passiveIncome *= 2; } },

        // --- RANK 5: TEAM LEAD ---
        { id: 'be_21', rank: 'Lead', reqLevel: 55, name: 'Kubernetes', price: 2000000, desc: 'Пассив +$2000/сек', effect: () => { state.passiveIncome += 2000; } },
        { id: 'be_22', rank: 'Lead', reqLevel: 60, name: 'AWS Arch', price: 3500000, desc: 'Оффлайн доход 24ч', effect: () => { /* Logic */ } },
        { id: 'be_23', rank: 'Lead', reqLevel: 65, name: 'GraphQL', price: 5000000, desc: 'Клик +$1000', effect: () => { CONFIG.baseLineRate += 1000; } },
        { id: 'be_24', rank: 'Lead', reqLevel: 70, name: 'System Design', price: 8000000, desc: 'Опыт качается x2', effect: () => { /* XP Logic */ } },
        { id: 'be_25', rank: 'Lead', reqLevel: 75, name: 'Technical Hiring', price: 12000000, desc: 'Авто-буст доходов', effect: () => { state.passiveIncome += 5000; } },

        // --- RANK 6: ARCHITECT ---
        { id: 'be_26', rank: 'Architect', reqLevel: 81, name: 'Rust Language', price: 20000000, desc: 'Пассив x5.0', effect: () => { state.passiveIncome *= 5; } },
        { id: 'be_27', rank: 'Architect', reqLevel: 87, name: 'ML Basics', price: 40000000, desc: 'Пассив +$10k/сек', effect: () => { state.passiveIncome += 10000; } },
        { id: 'be_28', rank: 'Architect', reqLevel: 93, name: 'Blockchain', price: 80000000, desc: 'Шанс найти Биткоин', effect: () => { /* Event Logic */ } },
        { id: 'be_29', rank: 'Architect', reqLevel: 99, name: 'CyberSecurity', price: 150000000, desc: 'Защита от штрафов', effect: () => { /* Logic */ } },
        { id: 'be_30', rank: 'Architect', reqLevel: 105, name: 'Sentient AI', price: 1000000000, desc: 'YOU WIN', effect: () => { /* Win */ } }
    ],

    gamedev: [
        // --- RANK 1: INTERN ---
        { id: 'gd_01', rank: 'Intern', reqLevel: 1, name: 'Logic & Math', price: 0, desc: 'Шанс крита 1%', effect: () => { state.critChance = (state.critChance || 0) + 0.01; } },
        { id: 'gd_02', rank: 'Intern', reqLevel: 2, name: 'C# Basics', price: 60, desc: 'Клик +$2', effect: () => { CONFIG.baseLineRate += 2; } },
        { id: 'gd_03', rank: 'Intern', reqLevel: 3, name: 'Unity Interface', price: 120, desc: 'Энергия -5%', effect: () => { CONFIG.energyCost = Math.floor(CONFIG.energyCost * 0.95); } },
        { id: 'gd_04', rank: 'Intern', reqLevel: 4, name: 'Sprites & 2D Art', price: 300, desc: 'Крит множитель x2', effect: () => { state.critMultiplier = (state.critMultiplier || 2) * 2; } },
        { id: 'gd_05', rank: 'Intern', reqLevel: 5, name: 'Animation Basics', price: 500, desc: 'Шанс крита +2%', effect: () => { state.critChance += 0.02; } },

        // --- RANK 2: JUNIOR ---
        { id: 'gd_06', rank: 'Junior', reqLevel: 7, name: 'Physics (RB)', price: 1000, desc: 'Клик +$15', effect: () => { CONFIG.baseLineRate += 15; } },
        { id: 'gd_07', rank: 'Junior', reqLevel: 9, name: 'UI/UX for Games', price: 2000, desc: 'Деньги с биржи x1.2', effect: () => { /* Job Logic */ } },
        { id: 'gd_08', rank: 'Junior', reqLevel: 11, name: 'Audio / SFX', price: 3500, desc: 'Моральный буст', effect: () => { state.maxEnergy += 10; } },
        { id: 'gd_09', rank: 'Junior', reqLevel: 13, name: 'Mobile Input', price: 6000, desc: 'Мультитач (скоро)', effect: () => { /* Logic */ } },
        { id: 'gd_10', rank: 'Junior', reqLevel: 15, name: 'Itch.io Publish', price: 10000, desc: 'Случайный донат', effect: () => { /* Random Event */ } },

        // --- RANK 3: MIDDLE ---
        { id: 'gd_11', rank: 'Middle', reqLevel: 18, name: '3D Modeling', price: 18000, desc: 'Крит множитель x3', effect: () => { state.critMultiplier = 3; } },
        { id: 'gd_12', rank: 'Middle', reqLevel: 21, name: 'Texturing', price: 30000, desc: 'Шанс крита +5%', effect: () => { state.critChance += 0.05; } },
        { id: 'gd_13', rank: 'Middle', reqLevel: 24, name: 'Particle Systems', price: 50000, desc: 'Клик +$50', effect: () => { CONFIG.baseLineRate += 50; } },
        { id: 'gd_14', rank: 'Middle', reqLevel: 27, name: 'AI / NavMesh', price: 80000, desc: 'Бот играет 10 сек', effect: () => { /* Active Skill */ } },
        { id: 'gd_15', rank: 'Middle', reqLevel: 30, name: 'Design Patterns', price: 120000, desc: 'Шанс крита +5%', effect: () => { state.critChance += 0.05; } },

        // --- RANK 4: SENIOR ---
        { id: 'gd_16', rank: 'Senior', reqLevel: 34, name: 'Shader Graph', price: 200000, desc: 'Множитель клика x3.0', effect: () => { CONFIG.baseLineRate *= 3; } },
        { id: 'gd_17', rank: 'Senior', reqLevel: 38, name: 'Multiplayer', price: 350000, desc: 'Пассивный доход', effect: () => { state.passiveIncome += 200; } },
        { id: 'gd_18', rank: 'Senior', reqLevel: 42, name: 'Optimization', price: 600000, desc: 'Энергия почти не тратится', effect: () => { CONFIG.energyCost = 1; } },
        { id: 'gd_19', rank: 'Senior', reqLevel: 46, name: 'VR / AR Dev', price: 1000000, desc: 'Шанс мега-крита', effect: () => { state.critChance += 0.1; } },
        { id: 'gd_20', rank: 'Senior', reqLevel: 50, name: 'Unreal Engine', price: 2000000, desc: 'Базовый доход x5', effect: () => { CONFIG.baseLineRate *= 5; } },

        // --- RANK 5: TEAM LEAD ---
        { id: 'gd_21', rank: 'Lead', reqLevel: 55, name: 'Level Design', price: 4000000, desc: 'Крит множитель x10', effect: () => { state.critMultiplier = 10; } },
        { id: 'gd_22', rank: 'Lead', reqLevel: 60, name: 'Monetization', price: 7000000, desc: 'Золотой дождь (+20%)', effect: () => { state.money *= 1.2; } },
        { id: 'gd_23', rank: 'Lead', reqLevel: 65, name: 'Community Mgr', price: 12000000, desc: 'Фанаты платят (Пассив)', effect: () => { state.passiveIncome += 1500; } },
        { id: 'gd_24', rank: 'Lead', reqLevel: 70, name: 'Console Porting', price: 20000000, desc: 'AAA Заказы', effect: () => { /* Job Logic */ } },
        { id: 'gd_25', rank: 'Lead', reqLevel: 75, name: 'Marketing & PR', price: 35000000, desc: 'Хайп (Ускорение x10)', effect: () => { CONFIG.baseLineRate *= 10; } },

        // --- RANK 6: ARCHITECT ---
        { id: 'gd_26', rank: 'Architect', reqLevel: 81, name: 'Custom Engine', price: 60000000, desc: 'Клик +$50k', effect: () => { CONFIG.baseLineRate += 50000; } },
        { id: 'gd_27', rank: 'Architect', reqLevel: 87, name: 'Procedural Gen', price: 100000000, desc: 'Энергия бесконечна', effect: () => { state.energyRegen = 100; } },
        { id: 'gd_28', rank: 'Architect', reqLevel: 93, name: 'Ray Tracing', price: 200000000, desc: 'Деньги текут', effect: () => { state.passiveIncome += 50000; } },
        { id: 'gd_29', rank: 'Architect', reqLevel: 99, name: 'Metaverse', price: 500000000, desc: 'Владелец мира', effect: () => { state.passiveIncome *= 2; } },
        { id: 'gd_30', rank: 'Architect', reqLevel: 105, name: 'Half-Life 3', price: 1000000000, desc: 'YOU WIN', effect: () => { /* Win */ } }
    ]
};

// --- SHOP ITEMS DATABASE ---
const SHOP_ITEMS = [
    // === CATEGORY: DEVICES (Click Power) ===
    { 
        id: 'item_kb_membrane', 
        type: 'device', 
        name: 'Офисная мембранка', 
        price: 150, 
        desc: 'Кнопки залипают, но лучше чем ничего.', 
        icon: '⌨️',
        effect: { type: 'click', value: 2 } // +$2 к клику
    },
    { 
        id: 'item_mouse_rgb', 
        type: 'device', 
        name: 'Игровая мышь RGB', 
        price: 500, 
        desc: 'Подсветка дает +10 к скиллу.', 
        icon: '🖱️',
        effect: { type: 'click', value: 5 } 
    },
    { 
        id: 'item_kb_mech', 
        type: 'device', 
        name: 'Механика (Blue Switch)', 
        price: 2500, 
        desc: 'Щелкает так, что соседи вешаются.', 
        icon: '🎹', 
        effect: { type: 'click', value: 15 } 
    },

    // === CATEGORY: HARDWARE (Passive Income) ===
    { 
        id: 'item_monitor_24', 
        type: 'hardware', 
        name: 'Монитор 24"', 
        price: 1000, 
        desc: 'Теперь ты видишь баги в HD.', 
        icon: '🖥️',
        effect: { type: 'passive', value: 2 } // +$2/сек
    },
    { 
        id: 'item_dual_monitor', 
        type: 'hardware', 
        name: 'Два монитора', 
        price: 5000, 
        desc: 'Один для кода, второй для Ютуба.', 
        icon: '🖥️🖥️',
        effect: { type: 'passive', value: 10 } 
    },
    { 
        id: 'item_server_home', 
        type: 'hardware', 
        name: 'Домашний сервер', 
        price: 15000, 
        desc: 'Шумит как самолет, майнит крипту.', 
        icon: '💽',
        effect: { type: 'passive', value: 35 } 
    },

    // === CATEGORY: COMFORT (Energy & Max Energy) ===
    { 
        id: 'item_chair_wooden', 
        type: 'comfort', 
        name: 'Табуретка', 
        price: 300, 
        desc: 'Спина болит, но характер закаляется.', 
        icon: '🪑',
        effect: { type: 'max_energy', value: 10 } // Макс энергия +10
    },
    { 
        id: 'item_coffee_machine', 
        type: 'comfort', 
        name: 'Кофеварка', 
        price: 2000, 
        desc: 'Автоматическая подача кофеина.', 
        icon: '☕',
        effect: { type: 'energy_regen', value: 1 } // Реген +1/сек
    },
    { 
        id: 'item_chair_gamer', 
        type: 'comfort', 
        name: 'Геймерское кресло', 
        price: 8000, 
        desc: 'Поясничная поддержка и режим полета.', 
        icon: '🛋️',
        effect: { type: 'max_energy', value: 50 } 
    }
];


// --- JOBS DATA ---
const JOB_TITLES = {
    frontend: [
        "Сверстать лендинг", "Поправить CSS", "Кнопка съехала", "Анимация логотипа", 
        "React компонент", "Фикс багов в Safari", "Адаптив под мобилки"
    ],
    backend: [
        "Парсер Авито", "Настройка Nginx", "Бот для Телеграм", "API для магазина", 
        "Оптимизация SQL", "Миграция БД", "Фикс 500 ошибки"
    ],
    gamedev: [
        "Спрайт персонажа", "Скрипт прыжка", "Левел-дизайн", "Звуки выстрелов", 
        "Фикс коллизии", "Меню паузы", "Шейдер воды"
    ],
    general: [
        "Установить Windows", "Починить принтер", "Настроить роутер"
    ]
};



// --- RANDOM EVENTS DATABASE ---
const EVENTS_DB = [
    // === 🟢 GOOD EVENTS (Позитив) ===
    {
        id: 'ev_bonus',
        type: 'good',
        title: 'Квартальная премия',
        text: 'Менеджер в восторге от твоего кода. Тебе выписали бонус!',
        icon: '💰',
        effect: () => {
            const bonus = 100 * state.level; // $100 * уровень
            state.money += bonus;
            return `+$${bonus}`;
        }
    },
    {
        id: 'ev_coffee_gift',
        type: 'good',
        title: 'Угостили кофе',
        text: 'Коллега принес тебе латте. Энергия восстановлена!',
        icon: '☕',
        effect: () => {
            state.energy = state.maxEnergy;
            state.coffeeConsumption = 0; // Сброс толерантности!
            return 'Энергия 100% и сброс цен';
        }
    },
    {
        id: 'ev_btc_found',
        type: 'good',
        title: 'Нашел Bitcoin',
        text: 'Ты вспомнил пароль от старого кошелька 2013 года!',
        icon: '🚀',
        effect: () => {
            const jackpot = 1000 * state.level;
            state.money += jackpot;
            return `+$${jackpot}`;
        }
    },

    // === 🔴 BAD EVENTS (Негатив) ===
    {
        id: 'ev_server_crash',
        type: 'bad',
        title: 'Прод упал!',
        text: 'Ты случайно удалил базу данных. Пришлось платить штраф.',
        icon: '🔥',
        effect: () => {
            const fine = Math.floor(state.money * 0.15); // -15% от текущих денег
            state.money -= fine;
            return `-$${fine}`;
        }
    },
    {
        id: 'ev_ddos',
        type: 'bad',
        title: 'DDoS Атака',
        text: 'Хакеры положили сервис. Пришлось отбиваться всю ночь.',
        icon: '💀',
        effect: () => {
            state.energy = 10; // Почти в ноль
            return 'Энергия упала до 10%';
        }
    },
    {
        id: 'ev_keyboard_spill',
        type: 'bad',
        title: 'Разлил смузи',
        text: 'Клавиатура залипла. Пришлось покупать новую.',
        icon: '⌨️',
        effect: () => {
            const cost = 200;
            state.money -= cost;
            return `-$${cost}`;
        }
    }
];