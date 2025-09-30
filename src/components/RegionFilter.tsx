import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

interface RegionFilterProps {
  onSelect: (region: string) => void
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

export default function RegionFilter({ onSelect }: RegionFilterProps) {
  return (
    <div className="relative w-60 my-6">
      <select
        aria-label="Filter by Region"
        onChange={(e) => onSelect(e.target.value)}
        className="w-full appearance-none bg-white dark:bg-elDark text-black dark:text-textDark px-8 py-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-300"
      />
    </div>
  )
}
