const startButtonElement = document.querySelector('.js-start-btn');
const resetButtonElement = document.querySelector('.js-reset-btn');
const lapButtonElement = document.querySelector('.js-lap-btn');
const timeElement = document.querySelector('.js-time');
const displayingLapElement = document.querySelector('.js-lap-container');

// Initialising variables to 0
let minute = 0;
let seconds = 0;
let milliseconds = 0;
let lappedTime = [];

displayTime();

// Function for displaing the time
function displayTime() {
  timeElement.innerHTML = `
    <p>${minute.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')} .
    <span class="js-milli">${milliseconds.toString().padStart(2,'0')}</span>
    </p>
  `;
}

// Onclick evenlisteners for the buttons in the html page
startButtonElement.addEventListener('click', () => {
  if(startButtonElement.innerText === 'Start') {
    startButtonElement.innerHTML = 'Stop';
    resetButtonElement.innerHTML = 'Lap';
    startTimer();
  } 
  else if(startButtonElement.innerText === 'Stop') {
    startButtonElement.classList.remove('js-stop-btn');
    startButtonElement.innerHTML = 'Resume';
    resetButtonElement.innerHTML = 'Reset';
    stopTimer();
  } 
  else if(startButtonElement.innerText === 'Resume') {
    startButtonElement.innerHTML = 'Stop';
    resetButtonElement.innerHTML = 'Lap';
    startTimer();
  }
});

resetButtonElement.addEventListener('click', () => {
  if(resetButtonElement.innerText === 'Lap'){
    lapButtonElement.classList.add('js-show-lap');
    lappedTime.push({
      minute,
      seconds,
      milliseconds
    });
    // localStorage.setItem('laps', JSON.stringify(lappedTime));
  } 
  else {
    lapButtonElement.classList.remove('js-show-lap');
    lappedTime.forEach((index) => {
      lappedTime.splice(index);
    });
    displayingLapElement.classList.remove('active');
    resetTimer();
  }
});

lapButtonElement.addEventListener('click', () => {
  displayingLapElement.classList.toggle('active');
  console.log(lappedTime);
});

// fnctions for start, stop, resume and reset buttons
// Settining a variable to store interval Id
let intervalId;

function startTimer() {
    startButtonElement.classList.add('js-stop-btn');
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
  clearInterval(intervalId);
  displayTime();
}

function resetTimer() {
  startButtonElement.innerHTML = 'Start';
  minute = 0;
  seconds = 0;
  milliseconds = 0;
  displayTime();
}