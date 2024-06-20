import { useEffect, useState } from "react"
import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"

function App() {
  const [duration, setDuration] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(duration)

  const handleChange = (x) => {
    setDuration(x)
    setSecondsLeft(x)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(x => {
        if (x <= 1) {
          clearInterval(timer)
          return 0
        }
        return x - 1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [duration])

  const [showInput, setShowInput] = useState(false)

  return <div className="container my-5">
      <label>Duration :</label>
      <Input 
        placeholder="Duration" 
        value={duration} 
        onChange={handleChange} />
      <p>Counter : {secondsLeft}</p>
      <Checkbox
        id="titleshow"
        checked={showInput}
        onChange={setShowInput}
        label="Show Title input"
      />
      {showInput && <EditTitle />}
      <div style={{height: "300vh"}}></div>
    </div>
}

function EditTitle() {
  const [title, setTitle] = useState("") 
  const [firstName, setFirstName] = useState("")
  const [y, setY] = useState(0)

  useEffect(() => {
    document.title = title
  }, [title])

  // Clean up effect
  useEffect(() => {
    const originalTitle = document.title
    const handler = (e) => {
      setY(window.scrollY)
    }
    window.addEventListener("scroll", handler)
    return () => {
      window.removeEventListener("scroll", handler)
      document.title = originalTitle
    }
  }, [])

  return <div>
    <div>Scroll: {y}</div>
    <Input 
      placeholder="Title" 
      value={title} 
      onChange={setTitle} />
    <Input 
      placeholder="First Name" 
      value={firstName} 
      onChange={setFirstName} />
  </div>
}

export default App
