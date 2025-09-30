import SearchBar from "../components/SearchBar"

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }

  return (
    <main className="px-6">
      <SearchBar onSearch={handleSearch} />
    </main>
  )
}
