import {Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"

function App() {
  return (
    <div className="font-title min-h-screen bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/country/:code" element={<CountryDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
