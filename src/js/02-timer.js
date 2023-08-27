import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.classList.add('disabled');
    } else {
      btnStart.classList.remove('disabled');
    };
  },
})

let currentDate = new Date();
let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');
let dateInput = document.querySelector('#datetime-picker');
let selectedDate;

const btnStart = document.querySelector('button');
btnStart.setAttribute('disabled', true);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setNewDate() {
  const selectedDateValue = dateInput.value;
  selectedDate = new Date(selectedDateValue);
}

dateInput.addEventListener('input', () => {
  setNewDate();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference > 0) {
    btnStart.removeAttribute('disabled');
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const dayDiffer = Math.floor(timeDifference / day);
    const hourDiffer = Math.floor((timeDifference % day) / hour);
    const minuteDiffer = Math.floor((timeDifference % hour) / minute);
    const secondDiffer = Math.floor((timeDifference % minute) / second);

    days.textContent = addLeadingZero(dayDiffer);
    hours.textContent = addLeadingZero(hourDiffer);
    minutes.textContent = addLeadingZero(minuteDiffer);
    seconds.textContent = addLeadingZero(secondDiffer);
  } else {
    btnStart.setAttribute('disabled', true);
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
  }

});

function dateReverseCounter() {
  btnStart.setAttribute('disabled', true);

  let daysCount = Number(days.textContent);
  let hoursCount = Number(hours.textContent);
  let minutesCount = Number(minutes.textContent);
  let secondsCount = Number(seconds.textContent);

  if (secondsCount === 0) {
    secondsCount = 59;
    if (minutesCount === 0) {
      minutesCount = 59;
      if (hoursCount === 0) {
        hoursCount = 23;
        if (daysCount > 0) {
          daysCount--;
        } else {
          days.textContent = '00';
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
          Notiflix.Notify.success('Timer finished', {
            position: 'right-top',
          });
          clearInterval(timer);
          timerStarted = false;
          dateInput.removeAttribute('disabled' , true);
          return;
        }
      } else {
        hoursCount--;
      }
    } else {
      minutesCount--;
    }
  } else {
    secondsCount--;
  }
  
  seconds.textContent = addLeadingZero(secondsCount);
  minutes.textContent = addLeadingZero(minutesCount);
  hours.textContent = addLeadingZero(hoursCount);
  days.textContent = addLeadingZero(daysCount);
}

let timer;
let timerStarted = false;

btnStart.addEventListener('click', () => {
  dateInput.setAttribute('disabled', true)
  if (!timerStarted) {
    dateReverseCounter();
    timer = setInterval(dateReverseCounter, 1000);
    timerStarted = true;
  }
});