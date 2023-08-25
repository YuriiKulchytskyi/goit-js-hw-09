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

    days.innerHTML = addLeadingZero(dayDiffer);
    hours.innerHTML = addLeadingZero(hourDiffer);
    minutes.innerHTML = addLeadingZero(minuteDiffer);
    seconds.innerHTML = addLeadingZero(secondDiffer);
  } else {
    btnStart.setAttribute('disabled', true);
    days.innerHTML = '00';
    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
  }

});

function dateReverseCounter() {
  let daysCount = Number(days.innerHTML);
  let hoursCount = Number(hours.innerHTML);
  let minutesCount = Number(minutes.innerHTML);
  let secondsCount = Number(seconds.innerHTML);

  if (secondsCount > 0) {
    secondsCount--;
    seconds.innerHTML = addLeadingZero(secondsCount);
    minutes.innerHTML = addLeadingZero(minutesCount);
    hours.innerHTML = addLeadingZero(hoursCount);
    days.innerHTML = addLeadingZero(daysCount);
  } else {
    secondsCount = 59;
    seconds.innerHTML = addLeadingZero(secondsCount);
    minutes.innerHTML = addLeadingZero(minutesCount);
    hours.innerHTML = addLeadingZero(hoursCount);
    days.innerHTML = addLeadingZero(daysCount);
    if (minutesCount > 0) {
      minutesCount--;
      minutes.innerHTML = addLeadingZero(minutesCount);
      hours.innerHTML = addLeadingZero(hoursCount);
      days.innerHTML = addLeadingZero(daysCount);
    } else {
      minutesCount = 59;
      minutes.innerHTML = addLeadingZero(minutesCount);
      hours.innerHTML = addLeadingZero(hoursCount);
      days.innerHTML = addLeadingZero(daysCount);
      if (hoursCount > 0) {
        hoursCount--;
        hours.innerHTML = addLeadingZero(hoursCount);
        days.innerHTML = addLeadingZero(daysCount);
      } else {
        hoursCount = 23;
        hours.innerHTML = addLeadingZero(hoursCount);
        days.innerHTML = addLeadingZero(daysCount);
        if (daysCount > 0) {
          daysCount--;
          days.innerHTML = addLeadingZero(daysCount);
        } else {
          days.innerHTML = '00';
          hours.innerHTML = '00';
          minutes.innerHTML = '00';
          seconds.innerHTML = '00';
          Notiflix.Notify.success('Timer finished', {
            position: 'right-top',
          });
          clearInterval(timer);
          timerStarted = false;
        }
      }
    }
  }
}

let timer;
let timerStarted = false;

btnStart.addEventListener('click', () => {
  if (!timerStarted) {
    dateReverseCounter();
    timer = setInterval(dateReverseCounter, 1000);
    timerStarted = true;
  }
});