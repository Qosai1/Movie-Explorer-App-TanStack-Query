import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchMovies } from "./moviesApi";
import { useState, useMemo } from "react";
import MovieGrid from "./MovieGrid";

export default function FilterByGenreAndRating() {
  const [genreId, setGenreId] = useState('');  
  const [rating, setRating]   = useState(''); 


  const {
    data: genres,
    isLoading: gLoading,
    isError: gError,
  } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60,
  });


  const {
    data: movies,
    isLoading: mLoading,
    isError: mError,
    error: mErr,
  } = useQuery({
    queryKey: ['movies', { page: 1 }],
    queryFn: () => fetchMovies({ page: 1 }),
  });


  const ratingOptions = useMemo(() => {
    const uniq = new Set(
      movies?.results?.map((m) => Math.floor(m.vote_average)) || []
    );
    return [...uniq].sort((a, b) => b - a);
  }, [movies]);


  const results = useMemo(() => {
    if (!movies?.results?.length) return [];

    return movies.results.filter((m) => {
      const inGenre = genreId === '' || m.genre_ids.includes(Number(genreId));
      const matchRating = rating === '' || Math.floor(m.vote_average) === Number(rating);
      return inGenre && matchRating;
    });
  }, [movies, genreId, rating]);

  const active = genreId !== '' || rating !== '';

  if (mLoading || gLoading) return <p>Loading…</p>;
  if (mError) return <p>Error: {mErr?.message}</p>;
  if (gError) return <p>Error loading genres</p>;

  return (
    <>
      <select
        value={genreId || ''}
        onChange={(e) => setGenreId(e.target.value || null)}
      >
        <option value=''>All Genres</option>
        {genres?.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        value={rating || ''}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value=''>All</option>
        {ratingOptions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {(genreId || rating) && (
        <button onClick={() => { setGenreId(''); setRating(''); }}>
          Reset
        </button>
      )}

      {active && <MovieGrid results={results} />}
    </>
  );
}
