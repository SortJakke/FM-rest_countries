import SearchBar from "../components/SearchBar"
import RegionFilter from "../components/RegionFilter"
import CountryCard from "../components/CountryCard"

// Mock data for demonstration purposes
const countries = [
  {
    name: "Germany",
    population: 81770900,
    region: "Europe",
    capital: "Berlin",
    flags: { png: "https://flagcdn.com/w320/de.png" },
    code: "DE",
  },
  {
    name: "	United States of America",
    population: 329345637,
    region: "Americas",
    capital: "Washington D.C.",
    flags: { png: "https://flagcdn.com/w320/us.png" },
    code: "US",
  },
  {
    name: "Brazil",
    population: 212600000,
    region: "Americas",
    capital: "Brasília",
    flags: { png: "https://flagcdn.com/w320/br.png" },
    code: "BR",
  },
  {
    name: "Iceland",
    population: 334300,
    region: "Europe",
    capital: "Reykjavik",
    flags: { png: "https://flagcdn.com/w320/is.png" },
    code: "IS",
  },
  {
    name: "Afghanistan",
    population: 27657145,
    region: "Asia",
    capital: "Kabul",
    flags: { png: "https://flagcdn.com/w320/af.png" },
    code: "AF",
  },
  {
    name: "Aland Islands",
    population: 28875,
    region: "Europe",
    capital: "Mariehamn",
    flags: { png: "https://flagcdn.com/w320/ax.png" },
    code: "AX",
  },
  {
    name: "Albania",
    population: 2886026,
    region: "Europe",
    capital: "Tirana",
    flags: { png: "https://flagcdn.com/w320/al.png" },
    code: "AL",
  },
  {
    name: "Algeria",
    population: 40400000,
    region: "Africa",
    capital: "Algier",
    flags: { png: "https://flagcdn.com/w320/dz.png" },
    code: "DZ",
  },
]

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }
  const handleRegionSelect = (region: string) => {
    console.log("Selected region:", region)
  }

  return (
    <main className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <SearchBar onSearch={handleSearch} />
        <RegionFilter onSelect={handleRegionSelect} />
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6">
        {countries.map((country) => (
          <CountryCard
            key={country.code}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
            flag={country.flags.png}
          />
        ))}
      </div>
    </main>
  )
}
