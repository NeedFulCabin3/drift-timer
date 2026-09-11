const display = document.getElementById('timeDisplay');
const container = document.getElementById('timerContainer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

const hrsInput = document.getElementById('hours');
const minsInput = document.getElementById('minutes');
const secsInput = document.getElementById('seconds');

let countdownInterval = null;
let endTime = null;
let timeLeft = 0;
let isRunning = false;

function updateDisplay(ms) {
    if (ms < 0) ms = 0;
    
    const totalSeconds = Math.ceil(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    display.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function getInputsInMs() {
    const h = parseInt(hrsInput.value) || 0;
    const m = parseInt(minsInput.value) || 0;
    const s = parseInt(secsInput.value) || 0;
    return ((h * 3600) + (m * 60) + s) * 1000;
}

function tick() {
    const now = Date.now();
    const delta = endTime - now;

    if (delta <= 0) {
        clearInterval(countdownInterval);
        updateDisplay(0);
        container.classList.add('alert');
        startBtn.textContent = 'Start';
        isRunning = false;
        return;
    }

    updateDisplay(delta);
}

function startTimer() {
    const msToCount = isRunning ? timeLeft : getInputsInMs();
    
    if (msToCount <= 0) return;

    endTime = Date.now() + msToCount;
    countdownInterval = setInterval(tick, 200);
    
    startBtn.textContent = 'Pause';
    container.classList.remove('alert');
    isRunning = true;
}

function pauseTimer() {
    clearInterval(countdownInterval);
    timeLeft = endTime - Date.now();
    startBtn.textContent = 'Resume';
    isRunning = false;
}

function resetTimer() {
    clearInterval(countdownInterval);
    isRunning = false;
    timeLeft = 0;
    endTime = null;
    
    hrsInput.value = 0;
    minsInput.value = 0;
    secsInput.value = 0;
    
    updateDisplay(0);
    container.classList.remove('alert');
    startBtn.textContent = 'Start';
}

startBtn.addEventListener('click', () => {
    if (countdownInterval && isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// Keep inputs clean
[hrsInput, minsInput, secsInput].forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value || input.value < 0) input.value = 0;
    });
});