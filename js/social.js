// --- SOCIAL & LEADERBOARD SYSTEM ---

// Фейковые данные лидеров (Mock Data)
const MOCK_LEADERS = [
    { name: "Pavel Durov", level: 99, rank: "Architect", income: "∞", photo: null },
    { name: "Elon Musk", level: 85, rank: "Architect", income: "800k", photo: null },
    { name: "Mark Z.", level: 72, rank: "Lead", income: "450k", photo: null },
    { name: "Satoshi N.", level: 60, rank: "Lead", income: "1M", photo: null },
    { name: "Vitalik B.", level: 55, rank: "Lead", income: "300k", photo: null },
];

function renderSocial() {
    const container = document.getElementById('view-social');
    


    const playerEntry = { 
        name: state.user.username || "Anonymous Dev", 
        level: state.level, 
     
        rank: state.rank.split(' ')[0], 
        income: formatMoney(state.passiveIncome),
        photo: state.user.photo,
        isMe: true
    };
    

    let list = [...MOCK_LEADERS, playerEntry];
    list.sort((a, b) => b.level - a.level);

    // 3. Генерируем HTML
    let html = `
        <div class="animate-[fadeIn_0.5s]">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-white">Топ Игроков 🏆</h2>
                <p class="text-gray-400 text-sm">Рейтинг разработчиков мира.</p>
            </div>
            
            <div class="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl mb-8 text-center shadow-lg relative overflow-hidden group border border-blue-400/30">
                 <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                 
                 <h3 class="text-xl font-bold text-white mb-1 relative z-10">Нужен напарник?</h3>
                 <p class="text-blue-100 text-xs mb-4 relative z-10">Пригласи друга и получи бонус к карме (скоро)!</p>
                 
                 <button onclick="inviteFriend()" class="relative z-10 bg-white text-blue-700 px-8 py-3 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-transform hover:bg-gray-50 flex items-center justify-center gap-2 mx-auto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    Пригласить
                 </button>
            </div>

            <div class="space-y-3">
    `;

    list.forEach((user, index) => {

        const isMe = user.isMe;
        const containerClass = isMe 
            ? "border-blue-500 bg-gradient-to-r from-blue-900/40 to-gray-800 shadow-[0_0_15px_rgba(59,130,246,0.3)] transform scale-[1.02]" 
            : "border-gray-700 bg-gray-800";
        

        let placeBadge = `<span class="text-gray-500 font-mono text-sm">#${index + 1}</span>`;
        if (index === 0) placeBadge = `<span class="text-2xl">🥇</span>`;
        if (index === 1) placeBadge = `<span class="text-2xl">🥈</span>`;
        if (index === 2) placeBadge = `<span class="text-2xl">🥉</span>`;


        const avatarHtml = user.photo 
            ? `<img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-gray-600">`
            : `<div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg border-2 border-gray-600">${user.name[0]}</div>`;

        html += `
            <div class="p-4 rounded-xl border ${containerClass} flex items-center justify-between transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-8 text-center flex-shrink-0">${placeBadge}</div>
                    ${avatarHtml}
                    <div>
                        <div class="font-bold text-white text-sm ${isMe ? 'text-blue-300' : ''}">
                            ${user.name} ${isMe ? '(Вы)' : ''}
                        </div>
                        <div class="text-[10px] text-gray-400 uppercase tracking-wide">
                            <span class="${getRankColor(user.rank)}">${user.rank}</span> • Lvl ${user.level}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-green-400 font-mono font-bold text-sm">$${user.income}</div>
                    <div class="text-[10px] text-gray-600">в сек</div>
                </div>
            </div>
        `;
    });

    html += `</div>
             <p class="text-center text-gray-600 text-[10px] mt-8 mb-4">Данные обновляются в реальном времени (нет).</p>
             </div>`;
             
    container.innerHTML = html;
}


function getRankColor(rank) {
    if (rank === 'Intern') return 'text-gray-500';
    if (rank === 'Junior') return 'text-green-500';
    if (rank === 'Middle') return 'text-blue-500';
    if (rank === 'Senior') return 'text-purple-500';
    if (rank === 'Lead') return 'text-yellow-500';
    if (rank === 'Architect') return 'text-red-500';
    return 'text-gray-400';
}


function formatMoney(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
}


function inviteFriend() {
    const botUsername = "devlife_tmabot"; // Замени на реальное имя своего бота, когда создашь
    const inviteLink = `https://t.me/share/url?url=https://t.me/${botUsername}&text=Я уже ${state.rank} в DevLife! Сможешь обогнать? 🚀`;
    

    if (tg && tg.openTelegramLink) {
        tg.openTelegramLink(inviteLink);
    } else {
        window.open(inviteLink, '_blank');
    }
}