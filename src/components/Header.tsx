import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="flex justify-between items-center p-4 bg-elLight dark:bg-elDark">
      <h1 className="text-xl font-bold">Where in the world?</h1>
      <button onClick={toggleTheme} className="text-sm">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  )
}

export default Header
