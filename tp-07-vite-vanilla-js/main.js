import './style.css'

import('./counter.js').then((module) => {
  module.setupCounter(document.querySelector('button'))
})

console.log(import.meta.env.VITE_TEST_ENDPOINT)