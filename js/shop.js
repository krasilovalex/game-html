// --- SHOP LOGIC ---

function renderShop() {
    const container = document.getElementById('view-shop');

    let html = `
        <div class="animate-[fadeIn_0.5s] pb-10">
            <h2 class="text-3xl font-bold mb-2 text-white">Магазин оборудования 🛒</h2>
            <p class="text-gray-400 text-sm mb-6">Инвестируй в железо, чтобы кодить эффективнее.</p>
            
            <div class="grid grid-cols-1 gap-4">
    `;

    SHOP_ITEMS.forEach(item => {
        const isOwned = state.inventory.includes(item.id);
        const canAfford = state.money >= item.price;
        
        let btnHtml = '';
        
        if (isOwned) {
            btnHtml = `
                <button disabled class="w-full py-2 bg-gray-700 text-green-400 font-bold rounded-lg text-xs uppercase cursor-default border border-gray-600">
                    ✅ Куплено
                </button>
            `;
        } else {
            const btnColor = canAfford ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed';
            const action = canAfford ? `onclick="buyItem('${item.id}')"` : '';
            
            btnHtml = `
                <button ${action} class="w-full py-2 ${btnColor} font-bold rounded-lg text-xs uppercase shadow-md transition-transform active:scale-95">
                    Купить $${item.price}
                </button>
            `;
        }

        let bonusText = '';
        if (item.effect.type === 'click') bonusText = `<span class="text-blue-400">+$${item.effect.value} к клику</span>`;
        if (item.effect.type === 'passive') bonusText = `<span class="text-green-400">+$${item.effect.value}/сек</span>`;
        if (item.effect.type === 'max_energy') bonusText = `<span class="text-yellow-400">+${item.effect.value} макс. энергии</span>`;
        if (item.effect.type === 'energy_regen') bonusText = `<span class="text-purple-400">+${item.effect.value}/сек реген</span>`;

        html += `
            <div class="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center gap-4 relative overflow-hidden group">
                <div class="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-4xl shadow-inner shrink-0">
                    ${item.icon}
                </div>
                
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-gray-100">${item.name}</h3>
                    </div>
                    <p class="text-xs text-gray-400 leading-tight my-1">${item.desc}</p>
                    <p class="text-xs font-bold mt-1">${bonusText}</p>
                </div>

                <div class="w-28 shrink-0 flex flex-col justify-center">
                    ${btnHtml}
                </div>
            </div>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

// Покупка предмета
function buyItem(itemId) {
    playSound('money'); // <--- При успешной покупке
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    
    if (!item || state.inventory.includes(itemId)) return;

    if (state.money < item.price) {
        playSound('error');
        tg.HapticFeedback.notificationOccurred('error');
        log('Недостаточно средств!', 'error');
        return;
    }

    // Списание
    state.money -= item.price;
    state.inventory.push(itemId);

    // Эффекты
    tg.HapticFeedback.notificationOccurred('success');
    log(`Куплено: ${item.name}`, 'success');

    // !!! ВАЖНО: Пересчитываем все статы игрока заново
    recalculateStats();

    saveGame();
    updateUI();
    renderShop(); // Обновляем кнопку на "Куплено"
}