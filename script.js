const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');
const addBtn = document.getElementById('add-button');
const container = document.getElementById('container');
console.log(addBtn, container);

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;
let savedCountdownArr = [
  (savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }),
];

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min & Value with Today's Date
const timeHere = new Date();
const timeHereIso = new Date().toISOString().split('2020');
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

console.log(today, 'and');
console.log(typeof timeHere);
console.log(new Date().toISOString());

// Populate Countdown / Complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // Hide Input
    inputContainer.hidden = true;
    // If the countdown has ended, show final state
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

const updateCountdown = (e) => {
  e.preventDefault();
  // Set title and date, save to localStorage
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  savedCountdownArr.push(savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdownArr));
  // Check if no date entered
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const reset = () => {
  // Hide countdowns, show input form
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values, remove localStorage item
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};
const restorePreviousCountdown = () => {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const addCountdown = () => {
  const countdownElement = document.createElement('div');
  countdownElement.classList.add('single-container');
  countdownElement.classList.add('input-containerr');
  container.appendChild(countdownElement);
  countdownElement.insertAdjacentHTML(
    'beforeend',
    `  <div class="input-container" id="input-container">
  <h1>Create a Custom Countdown!</h1>       
  <form class="form" id="countdownForm" >
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="What are you counting down to?">
      <label for="date-picker">Select a Date</label>
      <input type="date" id="date-picker">
      <button type="submit">Submit</button>
  </form>
</div>`
  );
};

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
addBtn.addEventListener('click', addCountdown);

// On Load, check localStorage
restorePreviousCountdown();
