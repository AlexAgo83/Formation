import { Input } from "./components/forms/Input"
import { memo, useCallback, useMemo, useRef, useState } from "react"

function App() {
  const [name, setName] = useState('John Doe')
  const nameRef = useRef(name)
  nameRef.current = name

  const handleClick = useCallback(() => {
    console.log(`clicked: ${nameRef.current}`)
  }, [nameRef])

  console.info('Render APP')
  return <div className="container my-5 vstack gap-2">
    <div>
      <InfoName name={name} onChange={setName}/>
      <InfoMemo onClick={handleClick}/>
    </div>
  </div>
}

function InfoName ({name, onChange}) {
  console.info('Render Info NAME')
  return <div>
      <Input 
        label="Name"
        value={name}
        onChange={onChange} />
        Name is <strong>{name.toUpperCase()}</strong>
    </div>
}

const InfoMemo = memo(function Info ({onClick}) {
  console.info('Render Info MEMO')
  return <div className="alert alert-info" onClick={onClick}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit est tempora voluptas assumenda quasi iste ipsam corporis temporibus natus. Dignissimos in exercitationem harum quam non at, similique molestias amet est.
  </div>
})

export default App
