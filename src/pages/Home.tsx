import SearchBar from "../components/SearchBar"
import RegionFilter from "../components/RegionFilter"

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }
  const handleRegionSelect = (region: string) => {
    console.log("Selected region:", region)
  }

  return (
    <main className="px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <SearchBar onSearch={handleSearch} />
        <RegionFilter onSelect={handleRegionSelect} />
      </div>
    </main>
  )
}
