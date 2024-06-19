
const title = "Test 1"
const tods = [
  "test1",
  "test2",
  "test3",
  "test4",
  "test5"
]

const handleClick = (e) => {
  console.log('click')
}
function Title({color, children}) {
  return <h1 onClick={handleClick} 
    name="title" 
    className="title" 
    style={{color: color}}>{children ? children : title}</h1>
}

function App() {
  return <>
      <Title color="green"/>
      <Title color="red">Test 2</Title>
      <p name="content" className="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab modi reiciendis provident dolor sunt vero quaerat ipsa, quos delectus illo eum similique consectetur a animi maxime ducimus aperiam odio laborum?
      </p>
      <ul>
        {tods.map((tod, index) => <li key={index}>{tod}</li>)}
      </ul>
    </>
}

export default App
