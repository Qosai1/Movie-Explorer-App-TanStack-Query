import MovieGrid from "./MovieGrid";
import { useState ,useEffect } from "react";
export default function Favorites({ movies = [], IMG_BASE }){
       const [saved, setSaved] = useState({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved');
      setSaved( JSON.parse(saved));
    } catch {
      setSaved({});
    }
  }, []);
const savedMovies = movies.filter(m => saved[m.id]);  

  return <MovieGrid results={savedMovies} IMG_BASE={IMG_BASE} />
}
