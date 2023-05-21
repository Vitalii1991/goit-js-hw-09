import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  btnCreate: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('input', e => {
  console.log(e.currentTarget);
  console.log(e.target, e.target.value);
});

refs.btnCreate.addEventListener('submit', () => {});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
