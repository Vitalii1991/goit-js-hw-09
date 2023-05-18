import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');

      refs.btnStart.disabled = true;
      refs.btnStart.classList.add('disabled');
    } else {
      refs.btnStart.disabled = false;
      refs.btnStart.classList.remove('disabled');
    }

    setInterval(() => {
      const deltaTime = selectedDates[0].getTime() - Date.now();
      const timeComponents = convertMs(deltaTime);
      console.log(timeComponents);
    }, 1000);
  },
};
flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
};

refs.btnStart.addEventListener('submit', () => {});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  padStart(2, 0);
}
