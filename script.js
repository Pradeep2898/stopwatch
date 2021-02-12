const timer = document.getElementById('stopwatch');

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
var text = "";
var time;

if (running == 0 && paused == 0) {
    document.getElementById('history').disabled = true;
    document.getElementById('pause').disabled = true;
    document.getElementById('reset').disabled = true;
}

function startTimer() {
    time = new Date().getHours() % 12 + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    text = "Start button pressed at " + time;
    console.log(text);
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(timerCycle, 1);
        paused = 0;
        running = 1;
        document.getElementById('history').disabled = false;
        document.getElementById('pause').disabled = false;
        document.getElementById('reset').disabled = false;
        document.getElementById('start').disabled = true;
    }
}
function stopTimer() {
    time = new Date().getHours() % 12 + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    text = "Stop button pressed at " + time;
    console.log(text);
    if (running) {
        paused = 1;
        running = 0;
        savedTime = difference;
        clearInterval(tInterval);
        document.getElementById('pause').disabled = true;
        document.getElementById('reset').disabled = false;
        document.getElementById('start').disabled = false;
    }
}

function timerCycle() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = (milliseconds < 1000) ? Math.floor((difference % (1000 * 60))) : Math.floor((difference % (1000 * 60))) % 1000;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    timer.innerHTML = hours + ' : ' + minutes + ' : ' + seconds + ' : ' + milliseconds;
}

function resetTimer() {
    time = new Date().getHours() % 12 + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    text = "Reset button pressed at " + time;
    console.log(text);
    timer.innerHTML = '00 : 00 : 00 : 000';
    clearInterval(tInterval);
    document.getElementById('reset').disabled = true;
    document.getElementById('pause').disabled = true;
    document.getElementById('start').disabled = false;
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
}