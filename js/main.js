// --- INIT TELEGRAM ---
const tg = window.Telegram.WebApp;
tg.expand();


let displayedMoney = 0;

// --- UI UPDATER ---
function updateUI() {

    calculateLevel(); 


    els.lines.innerText = state.lines;
    els.energy.innerText = Math.floor(state.energy);
    els.level.innerText = state.level;
    els.rank.innerText = state.rank;
    
    els.income.innerText = `+${state.passiveIncome}`;
    els.income.className = state.passiveIncome > 0 ? 'text-green-500' : 'text-gray-500';


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
    els.spec.innerText = theme.name; 
    els.xpBar.className = `h-full bg-gradient-to-r ${theme.bgGradient} w-0 transition-all duration-500`;
}

// --- GAME LOOP ---
function startGameLoop() {
    setInterval(() => {
        if (state.passiveIncome > 0) {
            state.money += state.passiveIncome;
        }
        
        if (state.energyRegen > 0 && state.energy < state.maxEnergy) {
            state.energy = Math.min(state.energy + state.energyRegen, state.maxEnergy);
        }
        metabolizeCoffee();

        const btnPrice = document.getElementById('coffee-price');
        if (btnPrice) {
            const currentPrice = getCurrentCoffeePrice();
            btnPrice.innerText = currentPrice;
            btnPrice.className = state.coffeeConsumption > 2 ? 'text-red-400 font-bold' : 'text-yellow-500'; 
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


    recalculateStats();
    initAudio();
    visualLoop();

    // --- ROUTING ---
    if (!state.specialization) {
        document.getElementById('main-nav').classList.add('hidden');
        document.getElementById('view-home').classList.add('hidden');
        document.getElementById('view-skills').classList.remove('hidden');
        

        renderSkillView(); 
        
        log('Добро пожаловать. Выберите специализацию.', 'neutral');
    } else {

        document.getElementById('main-nav').classList.remove('hidden');
        document.getElementById('view-home').classList.remove('hidden');
        applyClassTheme(state.specialization);
        
        log(`С возвращением, ${state.user.username}!`, 'success');
    }

    // Запуск цикла и UI
    startGameLoop();
    initEventSystem();
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
        playSound('click');
        if (state.isBurnout) return;

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

            if (state.energy <= 0) {
                triggerBurnout();
            }
            
            updateUI();
        } else {
            playSound('error');
            tg.HapticFeedback.notificationOccurred('error');
            showFloat(`Нет энергии!`, e.clientX, e.clientY - 50, 'text-red-500');
        }
    });


document.getElementById('btn-sleep').addEventListener('click', (e) => {
        playSound('money');
        if (state.isBurnout) return;


        const currentPrice = getCurrentCoffeePrice();

        if (state.money >= currentPrice && state.energy < state.maxEnergy) {
            state.money -= currentPrice;
            state.energy = Math.min(state.energy + CONFIG.coffeeRestore, state.maxEnergy);
            

            state.coffeeConsumption++;
            
            tg.HapticFeedback.impactOccurred('medium');
            showFloat(`-$${currentPrice}`, e.clientX, e.clientY, 'text-red-300');
            showFloat(`⚡ Energy Up`, e.clientX, e.clientY - 30, 'text-yellow-400 font-bold');
            
            updateUI();
        } else if (state.money < currentPrice) {
             playSound('error');
             tg.HapticFeedback.notificationOccurred('error');
             showFloat(`Нужно $${currentPrice}`, e.clientX, e.clientY, 'text-red-500 font-bold');
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
            if (targetTab === 'social') renderSocial();
        });
    });
});


function visualLoop() {
    if (Math.abs(displayedMoney - state.money) > 0.1) {
        displayedMoney += (state.money - displayedMoney) * 0.1;
    } else {
        displayedMoney = state.money;
    }
    

    if (els.money) {

        els.money.innerText = Math.floor(displayedMoney).toLocaleString('ru-RU');
    }

    requestAnimationFrame(visualLoop)
}