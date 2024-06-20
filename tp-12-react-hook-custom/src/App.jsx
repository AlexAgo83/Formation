import { useState } from "react"
import { useDocumentTitle } from "./hooks/useDocumentTitle"
import { useIncrement } from "./hooks/useIncrement"
import { useToggle } from "./hooks/useToggle"
import { Input } from "./components/forms/Input"

function App() {
  const [checked, toggleChecked] = useToggle()
  const [count, increment, decrement] = useIncrement({base: 0, step: 2, min: 0, max: 10})

  const [name, setName] = useState('')
  useDocumentTitle(name ? `Editer ${name}` : null)

  return <div>
    <div>
      <input type="checkbox" checked={checked} onChange={toggleChecked} />
      {checked ? 'Checked' : 'Not checked'}
    </div>
    <div>
      <Input value={name} onChange={setName} label="Nom" />
      Compteur : {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  </div>
}

export default App
