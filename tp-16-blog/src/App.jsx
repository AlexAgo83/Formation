function App() {
  const {page} = useHashNavigation()

  return <div className="container">
    Page : {Page}
    <p href="#">Home</p>
    <p href="#post">Article</p>
    <p href="#contact">Contact</p>
  </div>
}


export default App