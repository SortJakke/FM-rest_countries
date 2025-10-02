import SearchBar from "../components/SearchBar"
import RegionFilter from "../components/RegionFilter"
import CountryCard from "../components/CountryCard"
import { useState, useEffect } from "react"

type Country = {
  name: { common: string }
  population: number
  region: string
  capital?: string[]
  flags: { png: string }
  cca3: string
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filtered, setFiltered] = useState<Country[]>([])
  const [region, setRegion] = useState<string>("")

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!region) return setCountries(data)
        setCountries(data.filter((c: Country) => c.region === region))
      })
      .catch((err) => console.error("Error fetching countries:", err))
  }, [region])
  useEffect(() => {
    setFiltered(countries)
  }, [countries])

  const handleSearch = (query: string) => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(results)
  }
  const handleRegionSelect = (region: string) => {
    setRegion(region)
  }

  return (
    <main className="lg:max-w-7xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <SearchBar onSearch={handleSearch} />
        <RegionFilter onSelect={handleRegionSelect} />
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6 px-10 md:px-4">
        {filtered.slice(0, 60).map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0] || "N/A"}
            flag={country.flags.png}
            code={country.cca3}
          />
        ))}
      </div>
    </main>
  )
}
