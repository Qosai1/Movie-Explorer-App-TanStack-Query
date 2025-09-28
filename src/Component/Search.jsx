import "../style.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "./moviesApi";
import MovieGrid from "../Component/MovieGrid";
import FilterByGenreAndRating from './FilterByGenreAndRating'

export default function Search({ IMG_BASE = "https://image.tmdb.org/t/p/w342" }) {
  const [query, setQuery] = useState('');
  const [searchText, setSearchText] = useState(''); 
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', searchText, page],
    queryFn: () => fetchMovies({ searchQuery: searchText, page }),
    enabled: !!searchText,
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchText(query);
  };

  return (
    <div className="search_card">
      <form className="search" onSubmit={handleSearch}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Error: {error.message}</p>}

      {data?.results?.length > 0 ? (
        <>
          <MovieGrid results={data.results} IMG_BASE={IMG_BASE} />
           {(searchText) && (
        <button onClick={() => { setSearchText(''); setQuery(''); }}>
          Reset
        </button>
      )}
        </>
      ) : (
        searchText && !isLoading && <p>No results found</p>
      )}
       <div className="search_card">
        <h3>Filter By Genre and Rating</h3>
        <FilterByGenreAndRating />
      </div>
    </div>
  );
}
