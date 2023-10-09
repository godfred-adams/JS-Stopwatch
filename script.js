const startButtonElement = document.querySelector('.js-start-btn');
const resetButtonElement = document.querySelector('.js-reset-btn');
const timeElement = document.querySelector('.js-time');

// Initialising variables to 0
let minute = 0;
let seconds = 0;
let milliseconds = 0;

displayTime();

// Setting the minute seconds and milliseconds variables to 0 
function displayTime() {
  timeElement.innerHTML = `
    <p>${minute.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')} .
    <span class="js-milli">${milliseconds.toString().padStart(2,'0')}</span>
    </p>
  `;
}

startButtonElement.addEventListener('click', () => {
  if(startButtonElement.innerHTML === 'Start') {
    startTimer();
  } 
  else if(startButtonElement.innerText === 'Stop') {
    startButtonElement.classList.remove('js-stop-btn');
    startButtonElement.innerHTML = 'Resume';
    stopTimer();
  } 
  else if(startButtonElement.innerText === 'Resume') {
    resumeTimer();
  }
});

resetButtonElement.addEventListener('click', () => {
  if(startButtonElement.innerHTML === 'Stop') {
    let timeoutId;
    stopTimer();
    timeoutId = setTimeout(() => {
      resetTimer();
      clearTimeout(timeoutId);
    },500);
  } 
  else {
    resetTimer();
  }
});


// fnctions for start, stop, resume and reset buttons
// Settining a variable to store interval Id
let intervalId;

function startTimer() {
    startButtonElement.classList.add('js-stop-btn');
    startButtonElement.innerHTML = 'Stop';
    intervalId = setInterval(() => {
      milliseconds++;
      if (milliseconds == 100){
        seconds++;
        milliseconds = 0;
        if(seconds == 60) {
          minute++;
          seconds = 0;
        }
      }
      displayTime();
    },10)
}

function stopTimer() {
  resetButtonElement.innerHTML = 'Reset';
  clearInterval(intervalId);
  displayTime();
}

function resumeTimer() {
  startButtonElement.innerHTML = 'Stop';
  startTimer();
}

function resetTimer() {
  startButtonElement.innerHTML = 'Start';
  minute = 0;
  seconds = 0;
  milliseconds = 0;
  displayTime();
}
