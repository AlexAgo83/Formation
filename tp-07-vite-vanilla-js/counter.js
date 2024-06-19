import confetti from 'canvas-confetti';

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    confetti();
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
