import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'

const ressPath = './tp-02-nodejs/ress/'
const fileName = 'demoFile.txt'
const encodingUTF8 = {encoding: "utf-8"}

// Read File
const content = await readFile(ressPath + fileName, encodingUTF8)
console.log(content)

// Write File
await writeFile(ressPath + fileName, "\nHELLO",
    {
        flag: 'a' // add in file
    }
)