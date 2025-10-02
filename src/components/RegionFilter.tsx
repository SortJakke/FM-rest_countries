import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

interface RegionFilterProps {
  onSelect: (region: string) => void
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

export default function RegionFilter({ onSelect }: RegionFilterProps) {
  return (
    <div className="relative my-6 px-4">
      <select
        aria-label="Filter by Region"
        onChange={(e) => onSelect(e.target.value)}
        className="w-full appearance-none bg-elLight dark:bg-elDark px-8 pr-20 py-3 rounded shadow cursor-pointer"
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
        className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  )
}
