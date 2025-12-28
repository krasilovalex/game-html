// --- AUDIO SYSTEM ---

const AUDIO_ASSETS = {
    click: 'assets/sounds/click.mp3',
    money: 'assets/sounds/coin.mp3',
    error: 'assets/sounds/error.mp3',
    level: 'assets/sounds/levelup.mp3'
};

const sounds = {};
let isMuted = localStorage.getItem('isMuted') === 'true';

// Предзагрузка звуков
function initAudio() {
    for (const [key, path] of Object.entries(AUDIO_ASSETS)) {
        const audio = new Audio(path);
        audio.volume = 0.5; // Громкость 50%
        sounds[key] = audio;
    }
    updateMuteIcon();
}

function playSound(key) {
    if (isMuted || !sounds[key]) return;

    
    const audio = sounds[key];
    audio.currentTime = 0;
    
    
    audio.play().catch(e => {

    });
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    
    updateMuteIcon();
    
    if (!isMuted) {
        playSound('click'); 
        showToast('Звук включен 🔊', 'success');
    } else {
        showToast('Звук выключен 🔇', 'neutral');
    }
}

function updateMuteIcon() {
    const btn = document.getElementById('btn-mute');
    if (btn) {
        btn.innerHTML = isMuted 
            ? `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 5.586a2 2 0 002.828 0L11 8.172V12m0 0l-2.586 2.586a2 2 0 01-2.828 0L3 12V8a2 2 0 012-2h.586zm0 0l12.728 12.728M19 12a14.96 14.96 0 01-2 10.172M16 8.172A7.95 7.95 0 0118 12m-5-6.828V4a2 2 0 012-2h4a2 2 0 012 2v6l-2.586 2.586"></path></svg>`
            : `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`;
    }
}