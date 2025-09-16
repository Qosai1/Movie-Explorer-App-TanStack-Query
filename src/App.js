import { useEffect, useRef, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Component/Header";
import "./style.css";
import MovieDetails from "./Component/MovieDetails";
import Favorites from "./Component/Favorites";
import Search from "./Component/Search";
import MovieGrid from "./Component/MovieGrid";
import BackTop from './Component/BackToTop'

const API_KEY  = "36351a51fa653518514fdf1984458ba2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

 
  const sentinelRef = useRef(null);

  
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);

      try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&page=${page}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        if (cancelled) return;

        setMovies(prev => {
          const merged = [...prev, ...(data.results ?? [])];
          const seen = new Set();
          return merged.filter(m => {
            if (seen.has(m.id)) return false;
            seen.add(m.id);
            return true;
          });
        });

        setTotalPages(data.total_pages ?? 1);
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();//Immediately Invoked Function Expression (IIFE)

    return () => { cancelled = true; };
  }, [page]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const more = () => totalPages == null ? true : page < totalPages;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && more()) {
          setPage(p => p + 1);
        }
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    );

    ob.observe(sentinelRef.current);
    return () => ob.disconnect();
  }, [loading, page, totalPages]);

  if (loading && movies.length === 0) return <div style={{ padding: 20 }}>Loading…</div>;
  if (err && movies.length === 0)    return <div style={{ padding: 20, color: 'crimson' }}>Error: {err}</div>;

  return (
    <BrowserRouter>
      <Routes>
     
        <Route
          path='/'
          element={
            <>
              <Header />
              <Search movies={movies} IMG_BASE={IMG_BASE} />
              <MovieGrid results={movies} IMG_BASE={IMG_BASE} />
               <BackTop/>
              <div ref={sentinelRef} style={{ height: 1 }} />

              {loading && <div className='status' style={{ textAlign: 'center', margin: '14px 0 24px' }}>Loading …</div>}
              {!loading && totalPages && page >= totalPages && (
                <div className='status' style={{ textAlign: 'center', margin: '14px 0 24px' }}>
                   Reached the end.
                </div>
              )}
              {err && <div className='status' style={{ textAlign: 'center', color: 'crimson', margin: '14px 0 24px' }}>Error!! {err}</div>}
            </>
          }
        />

    
        <Route
          path='/favorites'
          element={
            <>
              <Header />
              <Favorites movies={movies} IMG_BASE={IMG_BASE} />
            </>
          }
        />

      
        <Route
          path='/movie/:id'
          element={
            <>
              <Header />
              <MovieDetails movies={movies} IMG_BASE={IMG_BASE} />
            </>
          }
        />
      </Routes>
         
    </BrowserRouter>
  );
}
