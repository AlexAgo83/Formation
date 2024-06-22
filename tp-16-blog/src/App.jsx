import { useHashNavigation } from "./hooks/useHashNavigation"
import { Headers } from "./components/header";
import { Home } from "./pages/Home"
import { Single } from "./pages/Single"
import { Contact } from "./pages/Contact"

function App() {
  const { page } = useHashNavigation();
  const pageContent = getPageContent(page)

  return <>
    <Headers page={page} />
    <p>Page : {page}</p>
    <p>
      <a href="#">Home</a>
      <a href="#post">Article</a>
      <a href="#contact">Contact</a>
    </p>
    {pageContent}
  </>
}

function getPageContent(page) {
  if (page === 'home') {
    return <Home />
  }
  if (page === 'post') {
    return <Single />
  }
  if (page === 'contact') {
    return <Contact />
  }
  return <NotFound page={page} />
}

export default App