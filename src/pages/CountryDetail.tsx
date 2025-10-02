import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

interface Country {
  name: { common: string; nativeName?: Record<string, { official: string }> }
  population: number
  region: string
  subregion?: string
  capital?: string[]
  flags: { svg: string }
  tld?: string[]
  currencies?: Record<string, { name: string }>
  languages?: Record<string, string>
  borders?: string[]
  cca3: string
}

export default function CountryDetail() {
  const { code } = useParams()

  const [country, setCountry] = useState<Country | null>(null)
  const [borderCountries, setBorderCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,region,subregion,borders,population,flags,tld,currencies,languages`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const countryData = data
        setCountry(data)
        setLoading(false)
        if (countryData.borders?.length) {
          fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}&fields=name,cca3`
          )
            .then((res) => res.json())
            .then((borderData) => setBorderCountries(borderData))
        }
      })
      .catch((err) => {
        console.error("Error fetching country details:", err)
        setError("Error fetching country details")
        setLoading(false)
      })
  }, [code])

  if (!country) {
    return <div className="p-6">Loading...</div>
  }

  const nativeName = country.name.common

  const currency = country.currencies
    ? Object.values(country.currencies)[0].name
    : "N/A"

  const languageList = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A"

  return (
    <div className="max-w-7xl mx-auto p-8">
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
      <div className="grid lg:grid-cols-2 justify-center gap-8">
        <Link
          to="/"
          className="lg:col-span-2 flex w-fit items-center gap-2 px-8 py-2 bg-elLight dark:bg-elDark rounded shadow-md"
          aria-label="Go back to home page"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="pointer-events-none" />
          Back
        </Link>
        <img
          src={country.flags.svg}
          alt={`flag of ${country.name.common}`}
          className="w-full max-w-lg h-auto object-cover shadow-md"
        />
        <div className="max-w-lg grid md:grid-cols-2 gap-8">
          <h1 className="text-2xl font-bold sm:col-span-2">
            {country.name.common}
          </h1>
          <div className="grid gap-3 place-content-start">
            <p>
              <strong>Native Name:</strong> {nativeName}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Sub Region:</strong> {country.subregion || "N/A"}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </p>
          </div>
          <div className="grid gap-3 place-content-start">
            <p>
              <strong>Top Level Domain:</strong> {country.tld?.[0] || "N/A"}
            </p>
            <p>
              <strong>Currencies:</strong> {currency}
            </p>
            <p>
              <strong>Languages:</strong> {languageList}
            </p>
          </div>
          {borderCountries.length > 0 && (
            <div className="mt-6 sm:col-span-2 flex gap-4 flex-wrap items-center">
              <h2 className="text-xl font-semibold">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-3 py-1 bg-elLight dark:bg-elDark rounded shadow text-sm"
                    aria-label={`View ${border.name.common} detail`}
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
