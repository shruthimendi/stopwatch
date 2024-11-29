// Select elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsEl = document.getElementById('laps');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');

// Variables
let interval;
let elapsedTime = 0; // Total elapsed time in milliseconds
let isRunning = false;

// Start stopwatch
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            elapsedTime += 10; // Increment time in 10ms steps
            updateDisplay();
        }, 10);
    }
});

// Pause stopwatch
pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
});

// Reset stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsEl.innerHTML = ''; // Clear laps
});

// Add lap
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime); // Get the current elapsed time
        const lapDiv = document.createElement('div'); // Create a new div for the lap
        lapDiv.textContent = `Lap ${lapsEl.children.length + 1}: ${lapTime}`; // Number the lap
        lapsEl.appendChild(lapDiv); // Add the lap to the laps container
    }
});

// Update stopwatch display
function updateDisplay() {
    const time = formatTime(elapsedTime);
    const [minutes, seconds, milliseconds] = time.split(':');
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    millisecondsEl.textContent = milliseconds;
}

// Format time into mm:ss:ms
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}
