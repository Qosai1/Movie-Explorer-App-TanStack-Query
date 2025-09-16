import '../style.css';
import { useState } from 'react';
import MovieGrid from '../Component/MovieGrid'
import FilterByGenreAndRating from './FilterByGenreAndRating';

export default function Search({ movies = [], IMG_BASE = 'https://image.tmdb.org/t/p/w342' }) {
  const [value, setValue] = useState('');
  const [results, setResults] = useState(''); 

  const handleSearch = (event) => {
    event.preventDefault();
    const q = value.trim().toLowerCase();
    if (!q) { setResults([]); return; }

    const r = movies.filter(m => {
      const title = (m.title || '').trim().toLowerCase();
     return title.includes(q);

    });

    setResults(r);
  };

  return (<>
    < div className='search_card'>
      
      <form className="search" onSubmit={handleSearch}>

        <input
          type='search'
          className='search-input'
          placeholder='Search a movie...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='search-button' onClick={handleSearch}>
          Search
        </button>
        
      </form>
     
    {value && <MovieGrid
        results={results}
        IMG_BASE={IMG_BASE}
      />}
    
       <div className='search_card'>
        <h3>Filter By Genre and Rating</h3>
       {/* <FilterByRiting
       movies={movies}
       />
      <FilterByGenre
       movies={movies}
      /> */}
      <FilterByGenreAndRating
      movies={movies} IMG_BASE={IMG_BASE}
      
      />

    </div>
    </div>
   
</>  );
}
