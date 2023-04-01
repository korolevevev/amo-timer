const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timerID = null
  return (seconds) => {
    let timeLeft = seconds
    if (timerID) {
      clearInterval(timerID)
    }
    const showTimeLeft = () => {
      if (timeLeft <= 0 && timerID) {
        clearInterval(timerID)
      }
      let hh = Math.floor(timeLeft / 60 / 60);
      if(hh > 1000000) {
        timerEl.textContent = 'Значение слишком большое'
      }
      else {
        let mm = Math.floor(timeLeft / 60) % 60;
        let ss = timeLeft % 60;
        hh = hh < 10 ? '0' + hh : hh
        mm = mm < 10 ? '0' + mm : mm
        ss = ss < 10 ? '0' + ss : ss
        timerEl.textContent = hh + ':' + mm + ':' + ss
        if (timerEl.textContent === '00:00:00') {
          timerEl.textContent = 'Время вышло'
        }
        timeLeft -= 1
      }
    }
    showTimeLeft()
    timerID = setInterval(showTimeLeft, 1000)
    return timerID
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const { target } = event;
  const { value } = target;
  // проверяем, чтобы количество секунд не начиналось с нуля
  if (target.value.length === 1 && target.value === '0') {
    target.value = target.value.replace('0', '')
  }

  // проверяем, чтобы каждый введённый символ был числовым
  const last = value.slice(-1);
  target.value = last.match(/[0-9]/) ? target.value : target.value.slice(0, target.value.length-1);
});

buttonEl.addEventListener('click', () => {

  const seconds = Number(inputEl.value);

  if (seconds) {
    animateTimer(seconds);
  }

  inputEl.value = '';
});