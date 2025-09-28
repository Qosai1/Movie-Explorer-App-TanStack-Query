const API_KEY = "36351a51fa653518514fdf1984458ba2";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Genres fetch error: ${res.status}`);
  const data = await res.json();
  return data.genres;
}

export async function fetchMovies({ page = 1, genreId = null, searchQuery = '' }) {

  let url;
  if (searchQuery && searchQuery.trim() !== '') {
 
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=${page}`;
  } else {

    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Movies fetch error: ${res.status}`);
  const data = await res.json();
  return data; 
}
