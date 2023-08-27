const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let timerId = null;

stopBtn.setAttribute('disabled', true);

const onClick = function () {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', true);

}
startBtn.addEventListener('click', onClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled', true);
    stopBtn.setAttribute('disabled', true)
})

