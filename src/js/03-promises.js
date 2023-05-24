import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();

  const initialDelay = parseInt(refs.inputDelay.value);
  const step = parseInt(refs.inputStep.value);
  const amount = parseInt(refs.inputAmount.value);

  let delay = initialDelay;

  if (initialDelay <= 0 || step <= 0 || amount <= 0) {
    Notiflix.Notify.failure('❌ Enter a value bigger than zero!');
  } else {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });

      delay += step;
    }
  }
}
