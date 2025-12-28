const GAME_VERSION = "v0.2 (Alpha)"; 
// --- CONFIG & CONSTANTS ---
const CONFIG = {
    baseLineRate: 1,      
    energyCost: 10,       
    coffeeRestore: 25,    
    coffeePrice: 15,      
    levelThreshold: 100   
};

const CLASSES = {
    frontend: {
        id: 'frontend', name: 'Frontend Dev', color: 'text-blue-400',
        bgGradient: 'from-blue-600 via-blue-500 to-cyan-400',
        bonusDescription: 'Клик x1.5', clickMultiplier: 1.5, passiveMultiplier: 1.0
    },
    backend: {
        id: 'backend', name: 'Backend Dev', color: 'text-orange-400',
        bgGradient: 'from-orange-600 via-amber-500 to-yellow-400',
        bonusDescription: 'Пассив x1.5', clickMultiplier: 1.0, passiveMultiplier: 1.5
    },
    gamedev: {
        id: 'gamedev', name: 'Game Developer', color: 'text-purple-400',
        bgGradient: 'from-purple-600 via-fuchsia-500 to-pink-400',
        bonusDescription: 'Крит шанс 10%', clickMultiplier: 1.2, passiveMultiplier: 1.0
    }
};

// --- GLOBAL STATE ---
let state = {
    money: 0,
    lines: 0,
    passiveIncome: 0,
    energy: 100,
    level: 1,
    rank: "Junior",
    specialization: null,
    critChance: 0,      
    critMultiplier: 1,  
    maxEnergy: 100,     
    energyRegen: 0,    
    ownedSkills: [], 
    inventory: [],
    
    user: {
        id: null,
        username: "Anon",
        photo: null
    }
};