import { useEffect, useState } from 'react';
import '../style.css';
import { Link } from "react-router-dom";
import { FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function MovieGrid({ results, IMG_BASE="https://image.tmdb.org/t/p/w500" }) {
 const [saved, setSaved] = useState(() => {
  const data = localStorage.getItem('saved');
  return data ? JSON.parse(data) : {};
});


useEffect(() => {
  localStorage.setItem('saved', JSON.stringify(saved));
}, [saved]);


function toggleSave(id) {
  setSaved(prev => {
    const next = { ...prev };
    if (next[id]) delete next[id]; 
    else next[id] = true;         
    return next;
  });
}


  if (results == null) return null;
  if (!results.length) {
    return <div className='pad'>No matching results found.</div>;
  }

  return (
    <div className='grid'>
      {results.map((movie) => {
        const alt = movie.title || 'Movie';
        const src = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '';
        const isSaved = !!saved[movie.id];

        return (
          <div className='card' key={movie.id}>
            <Link to={`/movie/${movie.id}`} className='card-link'>
              <>
                <div className='poster-wrap'>
                  {src ? (
                    <img src={src} alt={alt} className='movie_img' loading='lazy' />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
                <div className='title'>{alt}</div>
                <div className='release_date'>{movie.release_date || '-'}</div>
                <div className='vote_average'>
                  <FaStar /> {movie.vote_average}
                </div>
              </>
            </Link>
            <button
              className='bookmark-btn'
              aria-pressed={isSaved}
              title={isSaved ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleSave(movie.id)}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        );
      })}
    </div>
  );
}