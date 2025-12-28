const EVENT_CHECK_INTERVAL = 60000;
const EVENT_CHANCE = 0.4;

let eventTimer = null;


function initEventSystem() {
    if (eventTimer) clearInterval(eventTimer);


    eventTimer = setInterval(() => {
        tryTriggerEvent();
    }, EVENT_CHECK_INTERVAL);

    console.log('Event System initialized');
}


function tryTriggerEvent() {
    if (state.isBurnout) return;

    if (Math.random() > EVENT_CHANCE) return;


    const event = EVENTS_DB[Math.floor(Math.random() * EVENTS_DB.length)];


    triggerEvent(event);
}

function triggerEvent(event) {
    const resultText = event.effect();

    showEventModal(event, resultText);


    saveGame();
    updateUI();
}

// --- UI LOGIC ---

function showEventModal(event, resultText) {
    const modal = document.getElementById('modal-event');
    const content = document.getElementById('modal-content');
    
    const els = {
        bar: document.getElementById('modal-header-bar'),
        icon: document.getElementById('modal-icon'),
        title: document.getElementById('modal-title'),
        desc: document.getElementById('modal-desc')
    };


    els.icon.innerText = event.icon;
    els.title.innerText = event.title;

    els.desc.innerHTML = `${event.text}<br><br><span class="font-bold text-lg">${resultText}</span>`;


    if (event.type === 'good') {
        els.bar.className = 'h-2 w-full bg-green-500';
        els.icon.className = 'text-6xl mb-4 select-none animate-bounce';
        els.desc.querySelector('span').className = 'font-bold text-lg text-green-400';
        tg.HapticFeedback.notificationOccurred('success');
    } else {
        els.bar.className = 'h-2 w-full bg-red-500';
        els.icon.className = 'text-6xl mb-4 select-none animate-pulse';
        els.desc.querySelector('span').className = 'font-bold text-lg text-red-400';
        tg.HapticFeedback.notificationOccurred('error');
    }

   modal.classList.remove('hidden');
   setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-90');
        content.classList.add('scale-100');
    }, 10);
}

function closeEventModal() {
    const modal = document.getElementById('modal-event');
    const content = document.getElementById('modal-content');


    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-90');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); 
}