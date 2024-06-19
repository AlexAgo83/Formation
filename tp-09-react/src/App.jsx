import { useState } from "react"

const title = "Test 1"
const tods = [
  "test1",
  "test2",
  "test3"
]

const handleClickTitle = (e) => {
  console.log('click')
}
function Title({color, children}) {
  return <h1 onClick={handleClickTitle} 
    name="title" 
    className="title" 
    style={{color: color}}>{children ? children : title}</h1>
}

function App() {

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((count) => count + 1)
  }

  const [user, setUser] = useState({
    firstname: '',
    age: 0,
    check: false
  })

  const incrementAge = (e) => {
    e.preventDefault()
    setUser({...user, age: user.age + 1})
  }
  const resetUser = () => {
    e.preventDefault()
    setUser({firstname: '', age: 0})
  }

  const handleChangeName = (e) => {
    setUser({...user, firstname: e.target.value})
  }
  const handleChangeAge = (e) => {
    setUser({...user, age: parseInt(e.target.value)})
  }
  const handleChangeCheck = (e) => {
    setUser({...user, check: e.target.checked})
  }

  return <>
      <Title color="green"/>
      <Title color="red">Test 2</Title>

      <p name="content" className="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab modi reiciendis provident dolor sunt vero quaerat ipsa, quos delectus illo eum similique consectetur a animi maxime ducimus aperiam odio laborum?
      </p>
      <ul>
        {tods.map((tod, index) => <li key={index}>{tod}</li>)}
      </ul>

      <p>Compteur: {count} <button onClick={increment}>Click</button></p>

      <form>
        <p>
          <input type="text" 
            name="firstname" 
            value={user.firstname}
            onChange={handleChangeName} />

          <input type="text" 
            name="age" 
            value={user.age} 
            onChange={handleChangeAge}/>

          <input type="checkbox" 
            value={user.check} 
            onChange={handleChangeCheck}/>
        </p>
        <button onClick={incrementAge}>Increment age</button>     
        <button onClick={resetUser}>Reset</button>   
      </form>
    </>
}

export default App
