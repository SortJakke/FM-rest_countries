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

  useEffect(() => {
    if (!code) return
    fetch(
      `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,region,subregion,borders,population,flags,tld,currencies,languages`
    )
      .then((res) => res.json())
      .then((data) => {
        const countryData = data
        setCountry(data)
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
      .catch((err) => console.error("Error fetching country details:", err))
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
      <Link
        to="/"
        className="flex w-fit items-center gap-2 mb-8 px-8 py-2 bg-elLight dark:bg-elDark rounded shadow-md"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="pointer-events-none" />
        Back
      </Link>
      <div className="grid md:grid-cols-2 items-center gap-8">
        <img
          src={country.flags.svg}
          alt={`flag of ${country.name.common}`}
          className="w-full max-w-lg h-auto object-cover shadow-md"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <h1 className="text-2xl font-bold sm:col-span-2">{country.name.common}</h1>
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
            <div className="mt-6 sm:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-3 py-1 bg-elLight dark:bg-elDark rounded shadow text-sm"
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
