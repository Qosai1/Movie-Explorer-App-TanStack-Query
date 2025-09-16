import { useEffect, useMemo, useState } from "react";
import MovieGrid from "../Component/MovieGrid";

const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const GENRES_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjM1MWE1MWZhNjUzNTE4NTE0ZmRmMTk4NDQ1OGJhMiIsIm5iZiI6MTc1NzQxMzEyNC42NTUsInN1YiI6IjY4YmZmZjA0M2JmMmI5MDhiZjhjZjljNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pMVtSGgx7PbxR3x8udy8P-oDxPB_JMXRnxWIHNhYiq4",
  },
};

export default function FilterByGenreAndRating({  movies = [],IMG_BASE = 'https://image.tmdb.org/t/p/w342'}) {
  const [genres, setGenres] = useState([]);
  const [err, setErr] = useState('');
  const [genreId, setGenreId] = useState('');  
  const [rating, setRating]   = useState(''); 


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(GENRES_URL, GENRES_OPTIONS);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setGenres(data.genres ?? []);
      } catch (e) {
        setErr(e.message || 'Failed to fetch genres');
      }
    })(); //Immediately Invoked Function Expression (IIFE)
  }, []);


  const ratingOptions = useMemo(() => {
    const uniq = new Set( movies.map(m =>  Math.floor(m.vote_average))
);
    return [...uniq].sort((a, b) => b - a);
  }, [movies]);




const results = useMemo(() => {
  if (!movies?.length) return [];

  return movies.filter(m => {
  
    const inGenre = genreId ==='' || m.genre_ids.includes(Number(genreId));

    
    const matchRating = rating === '' || Math.floor(m.vote_average) === Number(rating);

    return inGenre && matchRating;
  });
}, [movies, genreId, rating]);


const active = genreId !== ''|| rating !== '';



  if (err) return <div>Error {err}</div>;

  return (
    <>
      <div className='filter'>
        <label htmlFor='genre'>Genre</label>
        <select id='genre' value={genreId} onChange={(e) => setGenreId(e.target.value)}>
          <option value=''>All</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <label htmlFor='rating'>Rating</label>
        <select id='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value= ''>All</option>
          {ratingOptions.map(r => (
            <option key={r} value={Math.floor(r)}>{Math.floor(r)}</option>
          ))}
        </select>

        {(genreId || rating) && (
          <button  onClick={() => { setGenreId(''); setRating(''); }}>
            Reset
          </button>
        )}
      </div>

      {active ? (
        <MovieGrid results={results} IMG_BASE={IMG_BASE} />
      ) : null }
    </>
  );
}
