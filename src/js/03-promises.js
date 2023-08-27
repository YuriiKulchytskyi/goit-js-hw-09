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

  const delayInput = Number(document.querySelector('[name="delay"]').value);
  const stepInput = Number(document.querySelector('[name="step"]').value);
  const amountInput = Number(document.querySelector('[name="amount"]').value);

  if (delayInput < 0 || stepInput < 0 || amountInput <= 0) {
    Notiflix.Notify.failure('Fill in all fields.');
    return;
  }

  let position = 1;

  let currentDelay = delayInput;



  for (let i = 0; i < amountInput; i++) {
    createPromise(position, currentDelay)
    .then((result) => {
      Notiflix.Notify.success(`Fulfill promise ${result.position} in ${result.delay}ms`, {
        position: 'right-top'
      });
    })
    .catch((error) => {
      Notiflix.Notify.failure(`Reject promise ${error.position} in ${error.delay}ms`, {
        position: 'right-top'
      });
    });
    position++;
    currentDelay += stepInput;
  }})

