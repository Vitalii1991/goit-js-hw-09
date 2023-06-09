import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
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
  onClose: onClose,
};

let selectedDatesOnCalendar = null;

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', onBtnStartClick);

function onClose(selectedDates) {
  selectedDatesOnCalendar = selectedDates[0];

  if (Date.now() < selectedDatesOnCalendar.getTime()) {
    refs.input.disabled = true;

    refs.btnStart.disabled = false;
    refs.btnStart.classList.remove('disabled');

    Notiflix.Notify.success('Great, click button "Start".');
  } else {
    Notiflix.Notify.failure('Please choose a date in the future.');
  }
}

function onBtnStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStart.classList.add('disabled');

  let deltaTime = null;

  const intervalId = setInterval(() => {
    deltaTime = selectedDatesOnCalendar.getTime() - Date.now();
    const time = convertMs(deltaTime);

    updateValueSpan(time);

    if (deltaTime <= 999) {
      Notiflix.Notify.info('Time is over!');
      clearInterval(intervalId);
    }
  }, 1000);
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
