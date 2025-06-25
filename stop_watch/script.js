let screen = document.getElementById("stopwatchScreen");
let buttonContainer = document.getElementById("buttonContainer");

let partsOfSecond = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;
function updateScreen(){
    partsOfSecond++;
    if(partsOfSecond>= 100){
        partsOfSecond = 0 ;
        seconds ++;
    }
    if(seconds>= 60){
        seconds = 0 ;
        minutes ++;

    }
    if(minutes >= 60){
        minutes = 0 ;
        hours ++;
    }
    if(hours >= 100){
        partsOfSecond = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
    }
    //
    let ps = partsOfSecond<10 ? "0" + partsOfSecond: partsOfSecond;
    let s = seconds <10 ? "0" + seconds : seconds ;
    let m = minutes <10 ? "0" + minutes : minutes ;
    let h = hours <10 ? "0" + hours : hours ;
    screen.textContent = h + " : "+ m +" : " + s + " : "+ ps;

}
function start(){
    
    if(timer!== null){
        clearInterval(timer);
    }
    timer = setInterval(updateScreen,10);
    showStopReset();
}


function stop() {
    if (timer !== null) clearInterval(timer);
    timer = null;

    showResumeReset();
}

function reset() {
    stop();
    partsOfSecond = -1;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateScreen();
    showStart();
}

function showStopReset() {
    buttonContainer.innerHTML = `
        <button class="stop fade-in" onclick="stop()">Stop</button>
        <button class="reset fade-in" onclick="reset()">Reset</button>
    `;
}
function showResumeReset() {
    buttonContainer.innerHTML = `
        <button class="start fade-in" onclick="start()">Resume</button>
        <button class="reset fade-in" onclick="reset()">Reset</button>
    `;
}

function showStart() {
    buttonContainer.innerHTML = `
        <button id="startBtn" class="start fade-in" onclick="start()">Start</button>
    `;
}
console.log(screen);
