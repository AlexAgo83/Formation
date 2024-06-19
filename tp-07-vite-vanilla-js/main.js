import './style.scss'

import('./counter.js').then((module) => {
  module.setupCounter(document.querySelector('button'))
})