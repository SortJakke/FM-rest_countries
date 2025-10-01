interface CountryCardProps {
  name: string
  population: number
  region: string
  capital: string
  flag: string
}

export default function CountryCard({
  name,
  population,
  region,
  capital,
  flag,
}: CountryCardProps) {
  return (
    <div className="bg-white dark:bg-elDark rounded overflow-hidden shadow-md mx-auto w-64">
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
  )
}
