const $ = id => document.getElementById(id);

// Elements
const minutes = $("minutes");
const seconds = $("seconds");
const tens = $("tens");
const startBtn = $("start");
const stopBtn = $("stop");
const resetBtn = $("reset");
const lapBtn = $("lap");
const lapsContainer = $("laps");

// State
let min = 0,
    sec = 0,
    ten = 0;
let interval;

// Event Listeners
startBtn.onclick = () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
};

stopBtn.onclick = () => clearInterval(interval);

resetBtn.onclick = () => {
    clearInterval(interval);
    min = sec = ten = 0;
    updateDisplay();
    lapsContainer.innerHTML = "";
};

lapBtn.onclick = () => {
    const lapTime = formatTime(min, sec, ten);
    const lapItem = document.createElement("div");
    lapItem.className = "lap-item";
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsContainer.prepend(lapItem);
};

// Timer Logic
function startTimer() {
    ten++;
    if (ten >= 100) {
        ten = 0;
        sec++;
        if (tickSound) tickSound.play();
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    updateDisplay();
}

// Display Update
function updateDisplay() {
    minutes.innerText = format(min);
    seconds.innerText = format(sec);
    tens.innerText = format(ten);
}

// Formatting
function format(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function formatTime(m, s, t) {
    return `${format(m)}:${format(s)}:${format(t)}`;
}