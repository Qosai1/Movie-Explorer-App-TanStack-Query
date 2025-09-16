import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetails({ movies = [], IMG_BASE = 'https://image.tmdb.org/t/p/w342' }) {
  const { id } = useParams();
  const movie_id = Number(id); 
  const [result, setResult] = useState(null);

  useEffect(() => {
    const movie = movies.find(m => m.id === movie_id);
    setResult(movie);
  }, [movies, movie_id]);

  if (!result) return <div>No Results</div>;

  return (
    <div className='card_details'>
      <div className='movie_details'>
            <div className='title_details'>
  <span className='label'>Title:</span>
  <span className='value'>{result.title}</span>
</div>
        <div className='poster'>
          <img src={IMG_BASE + result.poster_path} alt={result.title} />
          <div className='overview'>
        <span className='label'> Over View:</span>
        <span className='value'> {result.overview}</span>
        </div>
        </div>
        
      <div className='details'>


<div className='releaseDate'>
  <span className='label'>Release Date:</span>
  <span className='value'>{result.release_date}</span>
</div>

<div>
  <span className='label'>Vote Average:</span>
  <span className='value'>{result.vote_average}</span>
</div>
</div>
 </div>
</div>
     
 
  );
}