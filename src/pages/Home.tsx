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
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [region, setRegion] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    setError(null)
    let url =
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3"
    if (region) {
      url = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,region,population,flags,cca3`
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching countries:", err)
        setError("Error fetching countries")
        setLoading(false)
      })
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
        {loading && (
          <div aria-live="polite" className="text-gray-500">
            loading...
          </div>
        )}
        {error && (
          <div aria-live="assertive" className="text-red-500">
            {error}
          </div>
        )}
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
