// --- INIT TELEGRAM ---
const tg = window.Telegram.WebApp;
tg.expand();

// --- UI UPDATER ---
function updateUI() {
    // 1. Проверяем уровень
    calculateLevel(); 

    // 2. Обновляем цифры
    els.money.innerText = Math.floor(state.money);
    els.lines.innerText = state.lines;
    els.energy.innerText = Math.floor(state.energy);
    els.level.innerText = state.level;
    els.rank.innerText = state.rank; // Теперь тут будет писаться "Junior Frontend..."
    
    els.income.innerText = `+${state.passiveIncome}`;
    els.income.className = state.passiveIncome > 0 ? 'text-green-500' : 'text-gray-500';

    // 3. Прогресс-бар (Исправленная формула)
    const nextLevelThreshold = Math.pow(state.level + 1, 2) * 100;
    let currentLevelThreshold = Math.pow(state.level, 2) * 100;
    if (state.level === 1) currentLevelThreshold = 0;

    const linesOnThisLevel = state.lines - currentLevelThreshold;
    const linesNeededForNext = nextLevelThreshold - currentLevelThreshold;
    
    let progress = (linesOnThisLevel / linesNeededForNext) * 100;
    progress = Math.min(Math.max(progress, 0), 100);
    
    els.xpBar.style.width = `${progress}%`;
}

// --- CLASS SELECTION ---
function selectPath(type) {
    if (state.specialization) return;
    
    // Устанавливаем базовые значения
    state.specialization = type;
    state.rank = "Intern " + CLASSES[type].name; // Начинаем с Intern
    state.money += 100; // Подъемные
    
    // Применяем тему
    applyClassTheme(type);
    
    // Переключаем экраны
    document.getElementById('main-nav').classList.remove('hidden');
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-skills').classList.add('hidden');
    
    // Важно: пересчитываем статы (чтобы применились бонусы класса, если есть)
    recalculateStats();
    
    saveGame();
    updateUI();
}

function applyClassTheme(type) {
    const theme = CLASSES[type];
    if (!theme) return;
    els.spec.className = `text-sm font-semibold mt-1 mb-3 tracking-wide ${theme.color}`;
    els.spec.innerText = theme.name; // Тут просто имя класса (Frontend)
    els.xpBar.className = `h-full bg-gradient-to-r ${theme.bgGradient} w-0 transition-all duration-500`;
}

// --- GAME LOOP ---
function startGameLoop() {
    setInterval(() => {
        if (state.passiveIncome > 0) {
            state.money += state.passiveIncome;
        }
        // Реген энергии (если купили кофеварку или прокачали скилл)
        if (state.energyRegen > 0 && state.energy < state.maxEnergy) {
            state.energy = Math.min(state.energy + state.energyRegen, state.maxEnergy);
        }
        updateUI();
    }, 1000);
}

// --- INITIALIZATION ---
function initUser() {
    loadGame();
    
    // Кэшируем элементы
    els.money = document.getElementById('money-display');
    els.income = document.getElementById('income-display');
    els.lines = document.getElementById('lines-display');
    els.energy = document.getElementById('energy-display');
    els.rank = document.getElementById('rank-display');
    els.spec = document.getElementById('specialization-display');
    els.level = document.getElementById('level-display');
    els.xpBar = document.getElementById('xp-bar');
    els.console = document.getElementById('console-log');
    els.avatar = document.getElementById('user-avatar');
    els.name = document.getElementById('user-name');
    document.getElementById('version-display').innerText = GAME_VERSION;

    // Telegram User Data
    const user = tg.initDataUnsafe?.user;
    if (user) {
        state.user.id = user.id;
        state.user.username = user.username ? `@${user.username}` : user.first_name;
        if (user.photo_url) state.user.photo = user.photo_url;
    }
    els.name.innerText = state.user.username;
    if (state.user.photo) els.avatar.src = state.user.photo;

    // Пересчет статов (вдруг мы обновили баланс в коде)
    recalculateStats();

    // --- ROUTING (ВОТ ЧТО БЫЛО ПОТЕРЯНО!) ---
    if (!state.specialization) {
        // Если класс НЕ выбран -> Прячем навигацию и Офис, показываем Скиллы
        document.getElementById('main-nav').classList.add('hidden');
        document.getElementById('view-home').classList.add('hidden');
        document.getElementById('view-skills').classList.remove('hidden');
        
        // !!! РИСУЕМ КАРТОЧКИ !!!
        renderSkillView(); 
        
        log('Добро пожаловать. Выберите специализацию.', 'neutral');
    } else {
        // Если класс выбран -> Показываем Офис
        document.getElementById('main-nav').classList.remove('hidden');
        document.getElementById('view-home').classList.remove('hidden');
        applyClassTheme(state.specialization);
        
        log(`С возвращением, ${state.user.username}!`, 'success');
    }

    // Запуск цикла и UI
    startGameLoop();
    updateUI();
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    initUser(); // Старт

    // AutoSave
    setInterval(saveGame, 5000);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'hidden') saveGame();
    });

    // Клик "Кодить"
    document.getElementById('btn-code').addEventListener('click', (e) => {
        if (state.energy >= CONFIG.energyCost) {
            state.energy -= CONFIG.energyCost;
            
            // Критический клик?
            let isCrit = Math.random() < state.critChance;
            let mult = isCrit ? state.critMultiplier : 1;
            
            let linesGain = CONFIG.baseLineRate * mult;
            let moneyGain = (CONFIG.baseLineRate * 2) * mult;

            state.lines += linesGain;
            state.money += moneyGain;
            
            tg.HapticFeedback.impactOccurred(isCrit ? 'heavy' : 'medium');
            
            if (isCrit) {
                showFloat(`CRIT! +$${moneyGain}`, e.clientX, e.clientY - 50, 'text-yellow-400 text-2xl');
            } else {
                showFloat(`+$${moneyGain}`, e.clientX, e.clientY - 50, 'text-green-400');
            }
            
            updateUI();
        } else {
            tg.HapticFeedback.notificationOccurred('error');
            showFloat(`Нет энергии!`, e.clientX, e.clientY - 50, 'text-red-500');
        }
    });

    // Клик "Кофе"
    document.getElementById('btn-sleep').addEventListener('click', (e) => {
        if (state.money >= CONFIG.coffeePrice && state.energy < state.maxEnergy) {
            state.money -= CONFIG.coffeePrice;
            state.energy = Math.min(state.energy + CONFIG.coffeeRestore, state.maxEnergy);
            tg.HapticFeedback.impactOccurred('light');
            updateUI();
        }
    });

    // Навигация
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Смена стилей кнопок
            document.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.remove('text-blue-400');
                b.classList.add('text-gray-500');
            });
            btn.classList.remove('text-gray-500');
            btn.classList.add('text-blue-400');

            // Скрытие экранов
            document.querySelectorAll('.view-section').forEach(view => view.classList.add('hidden'));
            
            // Показ нужного
            const targetView = document.getElementById(`view-${targetTab}`);
            targetView.classList.remove('hidden');
            
            // Рендер контента
            if (targetTab === 'skills') renderSkillView();
            if (targetTab === 'shop') renderShop();
            if (targetTab === 'jobs') renderJobs();
        });
    });
});