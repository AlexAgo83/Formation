import { useIncrement } from "./hooks/Increment"
import { useToggle } from "./hooks/Toggle"

function App() {
  const [checked, toggleChecked] = useToggle()
  const [count, increment, decrement] = useIncrement({base: 0, min: 0, max: 10})

  return <div>
    <div>
      <input type="checkbox" checked={checked} onChange={toggleChecked} />
      {checked ? 'Checked' : 'Not checked'}
    </div>
    <div>
      Compteur : {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  </div>
}

export default App
