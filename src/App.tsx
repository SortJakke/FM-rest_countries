import Header from "./components/Header"
import Home from "./pages/Home"

function App() {
  return (
    <div className="font-title min-h-screen bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      <Header/>
      <Home/>
    </div>
  )
}

export default App
