import { spawn } from 'node:child_process'

const [node, _, file] = process.argv

// exec('dazdza', (error, out, err) => {
//     console.log({
//         error,
//         out,
//         err
//     })
// })

const pr = spawn('dir', [], {shell: true})
pr.stdout.on('data', (data) => {
    console.log(data.toString('utf8'))
})
pr.stderr.on('data', (data) => {
    console.log(data.toString('utf8'))
})
pr.on('close', (code) => {
    console.log('Process exited: ' + code)
})