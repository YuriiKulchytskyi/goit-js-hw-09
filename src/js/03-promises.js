import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      const result = {
        position,
        delay
      };
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result)
      }


    }, delay)
  })
}


const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = parseInt(document.querySelector('[name="delay"]').value);
  const stepInput = parseInt(document.querySelector('[name="step"]').value);
  const amountInput = parseInt(document.querySelector('[name="amount"]').value);

  if (!delayInput || !stepInput || !amountInput) {
    Notiflix.Notify.failure('Fill in all fields.');
    return;
  }

  let position = 1;
  let currentDelay = delayInput;

  const promises = [];

  for (let i = 0; i < amountInput; i++) {
    promises.push(createPromise(position, currentDelay));
    position++;
    currentDelay += stepInput;
  }

  Promise.all(promises)
    .then((results) => {
      results.forEach(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfill promise ${position} in ${delay}ms`, {
          position: 'right-top'
        });
      });
    })
    .catch((results) => {
      results.forEach(({ position, delay }) => {
        Notiflix.Notify.failure(`Reject promise ${position} in ${delay}ms`, {
          position: 'right-top'
        });
      });
    });
});