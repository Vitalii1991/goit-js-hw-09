import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseHandler,
};

flatpickr('#datetime-picker', options);

let selectedDatesOnCalendar = null;

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  console.log('Click');

  setInterval(() => {
    const deltaTime = selectedDatesOnCalendar.getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    updateValueSpan({ days, hours, minutes, seconds });
  }, 1000);
}

function onCloseHandler(selectedDates) {
  console.log(selectedDates[0]);
  selectedDatesOnCalendar = selectedDates[0];

  if (Date.now() > selectedDates[0].getTime()) {
    window.alert('Please choose a date in the future');

    refs.btnStart.disabled = true;
    refs.btnStart.classList.add('disabled');
  } else {
    refs.btnStart.disabled = false;
    refs.btnStart.classList.remove('disabled');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateValueSpan({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}
