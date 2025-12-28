// --- DOM ELEMENTS CACHE ---
const els = {}; 

// --- LOGGER ---
function log(text, type = 'neutral') {
    if (!els.console) return;
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute:'2-digit' });
    let colorClass = type === 'error' ? 'text-red-400' : (type === 'success' ? 'text-green-400' : 'text-gray-300');
    
    els.console.innerHTML += `<div class="mb-1"><span class="opacity-50">[${time}]</span> <span class="${colorClass}">${text}</span></div>`;
    els.console.scrollTop = els.console.scrollHeight;
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
        // 1. Создаем пустой "чистый" стейт
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
            user: state.user // Оставляем только имя/аватар
        };

        // 2. ПРИНУДИТЕЛЬНО сохраняем эту пустышку поверх старых данных
        localStorage.setItem('coderSim_v1', JSON.stringify(cleanState));

        // 3. Отключаем автосейв в этом сеансе (чтобы он не перебил наши нули)
        // (Это грязный хак: мы просто подменяем глобальную функцию saveGame на пустышку)
        window.saveGame = function() { console.log('Save blocked due to reset'); };

        // 4. Перезагружаем
        location.reload();
    }
}