import { stat, open, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const srcPath = dirname(fileURLToPath(import.meta.url))
const ressPath = join(srcPath, "../ress")
const fileName = 'demoFile.txt'
const fileUrl = join(ressPath, fileName)
const encodingUTF8 = {encoding: "utf-8"}

// Read File
const content = await readFile(fileUrl, encodingUTF8)
console.log(content)

// Write File
await writeFile(fileUrl, "\nHELLO",
    {
        flag: 'a' // add in file
    }
)

// Stats..
const i = await stat(fileUrl)
console.log(i)

// open while..
// >> Start
const file = await open(fileUrl, 'a')
file.write('\nTest!')
file.close()
// << Stop
