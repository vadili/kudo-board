import "./SearchBar.css"

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="searchbar">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search boards..." />
        </div>
    )
}

export default SearchBar;
