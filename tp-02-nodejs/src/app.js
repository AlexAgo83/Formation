import { stat, open, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const srcPath = dirname(fileURLToPath(import.meta.url))
const ressPath = join(srcPath, "../ress")
const fileName = 'demoFile.txt'
const encodingUTF8 = {encoding: "utf-8"}

// Read File
const content = await readFile(join(ressPath, fileName), encodingUTF8)
console.log(content)

// Write File
await writeFile(ressPath + fileName, "\nHELLO",
    {
        flag: 'a' // add in file
    }
)

// Stats..
const i = await stat(ressPath + fileName)
console.log(i)

// open while..
// >> Start
const file = await open(ressPath + fileName, 'a')
file.write('\nTest!')
file.close()
// << Stop
