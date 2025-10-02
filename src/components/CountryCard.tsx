import {Link} from "react-router-dom"

interface CountryCardProps {
  name: string
  population: number
  region: string
  capital: string
  flag: string
  code: string
}

export default function CountryCard({
  name,
  population,
  region,
  capital,
  flag,
  code,
}: CountryCardProps) {
  return (
    <Link to={`/country/${code}`} className="no-underline max-w-80">
    <div className="h-full bg-elLight dark:bg-elDark rounded overflow-hidden shadow">
      <img
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-40 object-cover"
      />
      <div className="px-6 py-8">
        <h2 className="font-bold text-lg mb-2">{name}</h2>
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </div>
    </Link>
  )
}
