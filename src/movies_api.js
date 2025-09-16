
const api_key='36351a51fa653518514fdf1984458ba2';
const  ACCESS_TOKEN='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjM1MWE1MWZhNjUzNTE4NTE0ZmRmMTk4NDQ1OGJhMiIsIm5iZiI6MTc1NzQxMzEyNC42NTUsInN1YiI6IjY4YmZmZjA0M2JmMmI5MDhiZjhjZjljNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pMVtSGgx7PbxR3x8udy8P-oDxPB_JMXRnxWIHNhYiq4';

const base_url='https://api.themoviedb.org/3'
const BASE_IMG='https://image.tmdb.org/t/p/w500'
const get_movies='/discover/movie'

async function fetchMovies(api) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        print_data(data.results)
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function print_data(movies){
    const contanier= document.querySelector('.image')
   movies.map((movie)=>
    contanier.innerHTML +=
   movie.original.title
)

}

const api_url=  `${base_url}${get_movies}?api_key=${api_key}`
fetchMovies(api_url)