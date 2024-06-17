const a: string = "test"; const aa = "test"
const b: number = 3
const c: boolean = true
const d: null = null
const e: string[] = ["a", "b"]
const f: {fName: string, lName: string, txt?: string} = {fName: "Toto", lName: "Tata"};
const g: {[key: string]: string} = {test1: "Test 1", test2: "Test 2"}
const h: Date = new Date()
const ia: Function = (e : MouseEvent): void => {}

function printCode(code: string | number) {
    console.log(code.toString())
}

const compteur = document.querySelector('#compteur') as HTMLButtonElement
let i = 0;

const increment = (e: Event) => {
    e.preventDefault()
    i++;
    const span = compteur?.querySelector('span')
    if (span) {
        span.innerText = i.toString();
    }
}

compteur?.addEventListener('click', increment);