import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(input.trim())
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [input, onSearch])

  return (
    <div className="relative w-full max-w-md mx-auto my-6">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        placeholder="Search for a country..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full pl-20 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-elDark dark:text-textDark"
      />
    </div>
  )
}
