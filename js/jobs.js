// --- JOBS SYSTEM ---

let activeJobs = []; 
let currentJob = null; 


function generateJobs() {
    const type = state.specialization || 'general';
    const titles = JOB_TITLES[type];
    const count = 3;
    
    activeJobs = [];
    
    for (let i = 0; i < count; i++) {
        const title = titles[Math.floor(Math.random() * titles.length)];

        const difficulty = Math.max(1, Math.floor(state.level * (0.8 + Math.random() * 0.4)));
        

        const reward = Math.floor(50 * difficulty * (0.9 + Math.random() * 0.2));

        const duration = 2000 + (difficulty * 500); 
        
        activeJobs.push({
            id: Date.now() + i,
            title: title,
            reward: reward,
            duration: duration,
            lvl: difficulty
        });
    }
    
    renderJobs();
}


function renderJobs() {
    const container = document.getElementById('view-jobs');
    

    if (currentJob) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full animate-[fadeIn_0.3s]">
                <div class="w-16 h-16 mb-4 text-blue-400 animate-spin">
                    <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Выполняем заказ...</h2>
                <p class="text-gray-400 mb-6">${currentJob.title}</p>
                <div class="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 animate-[widthProgress_${currentJob.duration}ms_linear_forwards]" style="width: 0%"></div>
                </div>
                <style>
                    @keyframes widthProgress { from { width: 0%; } to { width: 100%; } }
                </style>
            </div>
        `;
        return;
    }


    if (activeJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-6">
                <div class="bg-gray-800 p-6 rounded-full mb-6 text-gray-400">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Биржа фриланса</h2>
                <p class="text-gray-400 mb-8 text-sm">Ищи заказы, выполняй их и получай деньги.</p>
                <button onclick="generateJobs()" class="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95">
                    🔍 Найти заказы
                </button>
            </div>
        `;
        return;
    }

    let html = `
        <div class="animate-[fadeIn_0.3s] pb-10">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-white">Доступные заказы</h2>
                <button onclick="generateJobs()" class="text-xs text-blue-400 hover:text-blue-300">Обновить</button>
            </div>
            <div class="space-y-3">
    `;

    activeJobs.forEach(job => {
        html += `
            <div class="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-gray-200 text-sm">${job.title}</h3>
                    <div class="flex gap-3 mt-2 text-xs">
                        <span class="text-green-400 font-mono font-bold">$${job.reward}</span>
                        <span class="text-gray-500">⏳ ${(job.duration/1000).toFixed(1)} сек</span>
                    </div>
                </div>
                <button onclick="takeJob(${job.id})" class="px-4 py-2 bg-gray-700 hover:bg-green-600 hover:text-white rounded-lg text-xs font-bold text-gray-300 transition-colors">
                    Взять
                </button>
            </div>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}


function takeJob(jobId) {
    const job = activeJobs.find(j => j.id === jobId);
    if (!job || currentJob) return;

    currentJob = job;
    renderJobs(); 
    tg.HapticFeedback.selectionChanged();


    setTimeout(() => {
        completeJob();
    }, job.duration);
}


function completeJob() {
    if (!currentJob) return;

    state.money += currentJob.reward;
    state.lines += Math.floor(currentJob.reward / 2); 
    
    tg.HapticFeedback.notificationOccurred('success');
    log(`Заказ "${currentJob.title}" выполнен! (+$${currentJob.reward})`, 'success');
    
    currentJob = null;
    activeJobs = activeJobs.filter(j => j.id !== currentJob?.id); 
    
   activeJobs = []; 
    
    updateUI();
    saveGame();
    renderJobs();
}