let startTime;
let elapsedTime = 0;
let timerInterval;

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(timerInterval);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    document.querySelector(".laps").innerHTML = "";
}

function updateDisplay() {
    const ms = String(elapsedTime % 1000).padStart(3, "0");
    const seconds = String(Math.floor(elapsedTime / 1000) % 60).padStart(2, "0");
    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, "0");

    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("milliseconds").textContent = ms;
}

document.getElementById("startStop").addEventListener("click", function() {
    if (timerInterval) {
        stopStopwatch();
        this.textContent = "Start";
    } else {
        startStopwatch();
        this.textContent = "Stop";
    }
});

document.getElementById("reset").addEventListener("click", function() {
    resetStopwatch();
});

document.getElementById("lap").addEventListener("click", function() {
    const currentTime = elapsedTime;
    const lapTime = currentTime - (document.querySelector(".laps li:last-child")?.dataset.time || 0);

    const lapItem = document.createElement("li");
    lapItem.textContent = `${String(Math.floor(currentTime / 60000)).padStart(2, "0")}:${String(Math.floor(currentTime / 1000) % 60).padStart(2, "0")}.${String(currentTime % 1000).padStart(3, "0")}`;
    lapItem.dataset.time = currentTime;

    document.querySelector(".laps").appendChild(lapItem);
});
