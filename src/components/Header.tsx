import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="bg-elLight dark:bg-elDark shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        <Link to="/" className="no-underline">
          <h1 className="text-xl font-bold">Where in the world?</h1>
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  )
}

export default Header
