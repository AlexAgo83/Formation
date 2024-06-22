import { useHashNavigation } from "./hooks/useHashNavigation"
import { Headers } from "./components/header";
import { Home } from "./pages/Home"
import { Single } from "./pages/Single"
import { Contact } from "./pages/Contact"
import { NotFound } from "./pages/NotFound"

function App() {
  const { page, param } = useHashNavigation();
  const pageContent = getPageContent(page, param)

  return <>
    <Headers page={page} />
    <div className="container my-3">
      {pageContent}
    </div>
  </>
}

function getPageContent(page, param) {
  if (page === 'home') {
    return <Home />
  }
  if (page === 'post') {
    return <Single postId={param}/>
  }
  if (page === 'contact') {
    return <Contact />
  }
  return <NotFound page={page} />
}

export default App