import fs from 'node:fs'

const content = fs.readFileSync('./tp-02-nodejs/ress/demoFile.txt', {encoding: 'utf-8'})
console.log(content)