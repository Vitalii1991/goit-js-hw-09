import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  btnCreate: document.querySelector('[type="submit"]'),
};

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

refs.form.addEventListener('input', () => {
  // console.log('Amount: ', refs.inputAmount.value);
  // console.log('Step: ', refs.inputStep.value);
  // console.log('Delay: ', refs.inputDelay.value);

  if (refs.inputAmount) {
    for (let i = 1; i <= refs.inputAmount.value; i++) {
      createPromise(i, refs.inputDelay.value)
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
    }
  }
});
