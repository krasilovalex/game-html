// --- SKILL SYSTEM ---

function buySkill(skillId) {
    const classSkills = SKILLS_DB[state.specialization];
    const skill = classSkills.find(s => s.id === skillId);

    if (state.level < (skill.reqLevel || 1)) {
        tg.HapticFeedback.notificationOccurred('error');
        log(`Нужен уровень ${skill.reqLevel}!`, 'error');
        return;
    }
    
    if (!skill || state.ownedSkills.includes(skillId)) return;

    if (state.money < skill.price) {
        tg.HapticFeedback.notificationOccurred('error');
        log(`Не хватает денег! Нужно $${skill.price}`, 'error');
        return;
    }

    state.money -= skill.price;
    state.ownedSkills.push(skillId);
    if (skill.effect) skill.effect();

    tg.HapticFeedback.notificationOccurred('success');
    log(`Изучено: ${skill.name}`, 'success');
    
    saveGame();
    updateUI();
    renderSkillView();
}

function renderSkillView() {
    const container = document.getElementById('view-skills');
    container.innerHTML = '';

    if (!state.specialization) {
        renderClassSelection(container);
    } else {
        const skills = SKILLS_DB[state.specialization];
        let html = `
            <div class="animate-[fadeIn_0.5s] pb-10">
                <h2 class="text-3xl font-bold mb-2 ${CLASSES[state.specialization].color}">
                    ${CLASSES[state.specialization].name}
                </h2>
                <div class="relative space-y-6 pl-4 border-l-2 border-gray-700 ml-4">
        `;

        let currentRank = null;

        skills.forEach((skill, index) => {

                if (skill.rank !== currentRank) {
                    currentRank = skill.rank;
                    

                    let rankColor = 'text-gray-400';
                    if (currentRank === 'Intern') rankColor = 'text-gray-400';
                    if (currentRank === 'Junior') rankColor = 'text-green-400';
                    if (currentRank === 'Middle') rankColor = 'text-blue-400';
                    if (currentRank === 'Senior') rankColor = 'text-purple-400';
                    if (currentRank === 'Lead')   rankColor = 'text-yellow-400';


                    html += `
                        <div class="relative pl-6 pt-6 pb-2">
                             <div class="absolute -left-[5px] top-8 w-2 h-2 rounded-full bg-gray-600"></div>
                             <h3 class="text-xs font-bold uppercase tracking-[0.2em] ${rankColor} opacity-80">
                                 ${currentRank} Developer
                             </h3>
                        </div>
                    `;
                }


                const isOwned = state.ownedSkills.includes(skill.id);

                const isPreviousOwned = index === 0 || state.ownedSkills.includes(skills[index - 1].id);
                
                const isLevelEnough = state.level >= (skill.reqLevel || 1);
                const isLocked = !isPreviousOwned || !isLevelEnough;

                let statusHtml = '';
                let opacityClass = '';

                if (isOwned) {
                    statusHtml = `<span class="text-green-400 text-xs font-bold uppercase">✅ Изучено</span>`;
                    opacityClass = 'opacity-100 border-green-500/30 bg-green-900/10';
                } else if (!isPreviousOwned) {
                    // Если предыдущий навык (даже из прошлого грейда) не куплен
                    statusHtml = `<span class="text-gray-500 text-xs font-bold uppercase">🔒 Требуется: ${skills[index-1].name}</span>`;
                    opacityClass = 'opacity-50 grayscale border-gray-700 bg-gray-800';
                } else if (!isLevelEnough) {
                    statusHtml = `<span class="text-red-400 text-xs font-bold uppercase">🚫 Нужен Lvl ${skill.reqLevel}</span>`;
                    opacityClass = 'opacity-70 border-red-900/30 bg-red-900/10';
                } else {
                    const canAfford = state.money >= skill.price;
                    const btnColor = canAfford ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed';
                    statusHtml = `<button onclick="buySkill('${skill.id}')" class="px-4 py-2 rounded-lg text-xs font-bold ${btnColor} shadow-lg active:scale-95 transition-transform">${skill.price === 0 ? 'БЕСПЛАТНО' : `Изучить $${skill.price}`}</button>`;
                    opacityClass = 'opacity-100 border-gray-600 bg-gray-800';
                }

                html += `
                    <div class="relative pl-6">
                        <div class="absolute -left-[21px] top-6 w-3 h-3 rounded-full ${isOwned ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700'} ring-4 ring-gray-900"></div>
                        
                        <div class="p-4 rounded-xl border ${opacityClass} transition-all relative mb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-bold text-gray-100 text-sm md:text-lg">${skill.name}</h3>
                                    <p class="text-xs text-gray-400 mt-1 max-w-[200px]">${skill.desc}</p>
                                </div>
                                <div class="mt-1 flex flex-col items-end gap-1">
                                    ${statusHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        html += `</div></div>`;
        container.innerHTML = html;
    }
}

 function renderClassSelection(container) {
            // Данные для карточек (SVG и тексты)
            const cards = [
                {
                    id: 'frontend',
                    title: 'Frontend',
                    desc: 'Создание визуальной части сайтов. JS, React, анимации.',
                    bonus: 'Бонус: +10% к скорости заработка.',
                    color: 'text-blue-400',
                    bgIconColor: 'text-blue-500',
                    btnColor: 'bg-blue-600 hover:bg-blue-500',
                    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>',
                    bgIcon: '<path d="M3 3h18v18H3V3zm13.63 12.38c.67-.32 1.05-.75 1.05-1.54 0-1.16-.86-1.63-2.12-1.63-.82 0-1.47.26-1.93.56l.39 1.48c.36-.21.82-.47 1.4-.47.47 0 .74.2.74.56 0 .62-1.34.69-1.92 1.07-.46.3-.77.77-.77 1.43 0 1.25.96 1.74 2.37 1.74 1.02 0 1.63-.3 2.05-.59l-.42-1.46c-.29.17-.69.46-1.43.46-.56 0-.78-.23-.78-.56 0-.67 1.34-.72 1.94-1.07l-.57.02z"/>'
                },
                {
                    id: 'backend',
                    title: 'Backend',
                    desc: 'Серверная логика, базы данных, Python.',
                    bonus: 'Бонус: +20% к пассивному доходу.',
                    color: 'text-orange-400',
                    bgIconColor: 'text-orange-500',
                    btnColor: 'bg-orange-600 hover:bg-orange-500',
                    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>',
                    bgIcon: '<path d="M12 3c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4M4 9c0 2.21 3.58 4 8 4s8-1.79 8-4v10c0 2.21-3.58 4-8 4s-8-1.79-8-4V9z"/>'
                },
                {
                    id: 'gamedev',
                    title: 'GameDev',
                    desc: 'Разработка игр, Unity, C#.',
                    bonus: 'Бонус: Шанс крита (x5 к клику).',
                    color: 'text-purple-400',
                    bgIconColor: 'text-purple-500',
                    btnColor: 'bg-purple-600 hover:bg-purple-500',
                    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>',
                    bgIcon: '<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>'
                }
            ];

            let html = `
                <h2 class="text-2xl font-bold mb-2 text-white">Путь развития</h2>
                <p class="text-xs text-gray-400 mb-6">Выбери специализацию, чтобы разблокировать новые технологии и увеличить доход.</p>
                <div class="space-y-4">
            `;

            cards.forEach(card => {
                html += `
                <div class="bg-gray-800 rounded-xl p-4 border border-gray-700 relative overflow-hidden group">
                    <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        <svg class="w-24 h-24 ${card.bgIconColor}" fill="currentColor" viewBox="0 0 24 24">
                            ${card.bgIcon}
                        </svg>
                    </div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="p-2 bg-gray-900/50 rounded-lg ${card.color}">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    ${card.icon}
                                </svg>
                            </div>
                            <h3 class="text-lg font-bold text-white">${card.title}</h3>
                        </div>

                        <p class="text-[11px] text-gray-400 leading-relaxed mb-1">
                            ${card.desc}
                        </p>
                        <p class="text-[11px] ${card.color} font-medium mb-4 opacity-90">
                            ${card.bonus}
                        </p>
                        
                        <button onclick="selectPath('${card.id}')" class="w-full py-3 ${card.btnColor} rounded-lg text-xs font-bold text-white shadow-lg transition-transform active:scale-95 uppercase tracking-wide">
                            Выбрать путь
                        </button>
                    </div>
                </div>
                `;
            });

            html += `</div>`;
            container.innerHTML = html;
        }
