// --- DOM ELEMENTS CACHE ---
const els = {}; 

// --- TOAST NOTIFICATIONS (Visual Polish) ---


function showToast(message, type = 'neutral') {
    const container = document.getElementById('toast-container');
    

    const toast = document.createElement('div');

    let colors = 'bg-gray-800 border-gray-600 text-white';
    if (type === 'success') colors = 'bg-green-900/90 border-green-600 text-green-100';
    if (type === 'error') colors = 'bg-red-900/90 border-red-600 text-red-100';
    if (type === 'warning') colors = 'bg-yellow-900/90 border-yellow-600 text-yellow-100';

    toast.className = `transform translate-x-full transition-all duration-300 ease-out mb-2 p-3 rounded-xl border shadow-lg text-xs font-bold flex items-center gap-2 ${colors}`;
    toast.innerHTML = message;


    container.appendChild(toast);


    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 10);


    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Перенаправляем старый log на showToast, чтобы не переписывать весь код
function log(msg, type) {
    // В консоль тоже пишем для отладки
    console.log(`[${type}] ${msg}`);
    // И показываем тост
    showToast(msg, type);
}

// --- FLOATING TEXT ---
function showFloat(text, x, y, colorClass = 'text-white') {
    const el = document.createElement('div');
    el.className = `absolute font-bold text-xl pointer-events-none animate-bounce ${colorClass}`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerText = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

// --- SAVE SYSTEM ---
function saveGame() {
    localStorage.setItem('coderSim_v1', JSON.stringify(state));
}

function loadGame() {
    const savedJSON = localStorage.getItem('coderSim_v1');
    if (savedJSON) {
        const savedState = JSON.parse(savedJSON);
        state = { ...state, ...savedState };
    }
}


// --- STATS CALCULATION ---

function recalculateStats() {

    CONFIG.baseLineRate = 1; 
    state.passiveIncome = 0;
    

    state.critChance = 0;
    state.critMultiplier = 1; // Базовый крит x1 (то есть его нет)
    

    let bonusMaxEnergy = 0;
    let bonusEnergyRegen = 0;

    const rankOrder = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Architect'];
    let currentRankIndex = 0; 


    if (state.specialization) {
        const skills = SKILLS_DB[state.specialization];
        

        skills.forEach(skill => {
            if (state.ownedSkills.includes(skill.id)) {

                if (skill.effect) skill.effect();


                const skillRankIndex = rankOrder.indexOf(skill.rank);
                if (skillRankIndex > currentRankIndex) {
                    currentRankIndex = skillRankIndex;
                }
            }
        });


        state.rank = `${rankOrder[currentRankIndex]} ${CLASSES[state.specialization].name}`;
    }

    // 3. Пересчет от ТОВАРОВ
    state.inventory.forEach(itemId => {

        if (typeof SHOP_ITEMS !== 'undefined') {
            const item = SHOP_ITEMS.find(i => i.id === itemId);
            if (item) {
                if (item.effect.type === 'click') CONFIG.baseLineRate += item.effect.value;
                if (item.effect.type === 'passive') state.passiveIncome += item.effect.value;
                if (item.effect.type === 'max_energy') bonusMaxEnergy += item.effect.value;
                if (item.effect.type === 'energy_regen') state.energyRegen += item.effect.value; // Исправил тут накопление
            }
        }
    });


    state.maxEnergy = 100 + bonusMaxEnergy;

}


// --- LEVEL SYSTEM (HARDCORE) ---

function getLevelThreshold(level) {
    // Формула: Чтобы получить следующий уровень, нужно (Level^2) * 100 строк
    // Lvl 1 -> 100
    // Lvl 2 -> 400
    // Lvl 5 -> 2500
    return Math.pow(level, 2) * 100;
}

function calculateLevel() {

    const newLevel = Math.max(1, Math.floor(Math.sqrt(state.lines / 100)));
    
    if (newLevel > state.level) {
        playSound('level');
        state.level = newLevel;
        
        tg.HapticFeedback.notificationOccurred('success');
        showFloat(`LEVEL UP! 🆙`, window.innerWidth / 2, window.innerHeight / 2, 'text-yellow-400 text-3xl');
        log(`Поздравляем! Вы достигли уровня ${state.level}`, 'success');
        
        state.energy = state.maxEnergy || 100;
        saveGame();
    }
}


function hardReset() {
    if (confirm("Вы уверены? Весь прогресс будет удален безвозвратно.")) {

        const cleanState = {
            money: 0,
            lines: 0,
            energy: 100,
            level: 1,
            rank: "Junior",
            specialization: null,
            ownedSkills: [],
            inventory: [],
            passiveIncome: 0,
            maxEnergy: 100,
            critChance: 0,
            critMultiplier: 1,
            user: state.user 
        };


        localStorage.setItem('coderSim_v1', JSON.stringify(cleanState));


        window.saveGame = function() { console.log('Save blocked due to reset'); };


        location.reload();
    }
}


// ---- BURNOUT SYSTEM (v0.3 b1)

function triggerBurnout() {
    if (state.isBurnout) return;


    state.isBurnout = true;
    state.energy = 0;

    document.body.classList.add('grayscale', 'pointer-events-none');

    tg.HapticFeedback.notificationOccurred('error');


    showFloat(`🤯 ВЫГОРАНИЕ!`, window.innerWidth/2, window.innerHeight/2, 'text-red-500 text-4xl font-bold');
    log('ВЫГОРАНИЕ! Система перегружена. Отдых 10 сек.', 'error');


    setTimeout(() => {
        state.isBurnout = false;
        state.energy = 30;


        document.body.classList.remove('grayscale', 'pointer-events-none');


        tg.HapticFeedback.notificationOccurred('success');
        log('Выгорание прошло. Можно работать.', 'success');

        updateUI();
    }, CONFIG.burnoutDuration);
}

function metabolizeCoffee() {
    if (state.coffeeConsumption > 0) {
        state.coffeeConsumption = Math.max(0, state.coffeeConsumption - CONFIG.coffeeMetabolism);
    }
}

function getCurrentCoffeePrice() {
    return Math.floor(CONFIG.coffeeBasePrice + (state.coffeeConsumption * CONFIG.coffeePriceGrowth));
}