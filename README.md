# Movie Explorer (React)

A simple, responsive movie browsing app built with React. Users can search and filter movies, view details, toggle dark/light theme, and save favorites locally. Infinite scrolling loads more movies as you reach the bottom.

## ✨ Features

- **Browse popular movies** (fetched from TMDB) with posters, titles, release dates, and ratings.
- **Search by title** (client-side).
- **Filter by genre and rating** (client-side) with a genre list fetched from TMDB.
- **Movie details page** with overview, release date, and vote average.
- **Favorites** (add/remove) persisted in `localStorage`.
- **Dark/Light mode** toggle (preference persisted).
- **Infinite scrolling** (IntersectionObserver) with client-side de‑duplication.
- **“Back to top”** floating button.
- **Basic accessibility**: alt text, `aria-pressed` on favorites, labeled inputs.
- **Responsive styling** via CSS.

## 🧱 Project Structure (key files)

```
/Component
  ├── BackToTop.jsx
  ├── Favorites.jsx
  ├── FilterByGenreAndRating.jsx
  ├── Header.jsx
  ├── MovieDetails.jsx
  ├── MovieGrid.jsx
  └── Search.jsx
App.js
style.css
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and **npm** (or yarn/pnpm).
- A **TMDB account** to obtain:
  - An **API key (v3)** for `/discover/movie`
  - A **Read Access Token (v4)** for `/genre/movie/list`

## 🌐 API Used

- **TMDB – Discover Movies**  
  `GET https://api.themoviedb.org/3/discover/movie`  
  Params include `api_key`, `sort_by=popularity.desc`, `language=en-US`, and `page`.  

- **TMDB – Genres**  
  `GET https://api.themoviedb.org/3/genre/movie/list?language=en`  
  Uses a **Bearer v4 token** in the `Authorization` header.

- **TMDB Images**  
  Posters are loaded from `https://image.tmdb.org/t/p/w500` (or `w342` in some components).

## 🧠 How It Works (high-level)

- **Data Fetching & Infinite Scroll**: The home route fetches pages of popular movies. An `IntersectionObserver` watches a sentinel div; when it appears, the app loads the next page. Duplicate movie IDs are filtered out in-memory and total page count stops extra fetches.

- **Search**: Client-side, case-insensitive `includes` over the title of the movies currently loaded into memory.

- **Filters**: Genre options are fetched from TMDB. Filtering is done client-side with `genre_ids.includes(selectedGenre)` and by **flooring** the vote average for exact integer rating matches.

- **Favorites**: A simple `{ [id]: true }` map is stored in `localStorage`. The “bookmark” button toggles the map and the favorites page renders only movies whose IDs are present in that map.

- **Movie Details**: The details page reads the movie from the in-memory list by `id` and displays poster, overview, release date, and vote average.

- **Dark/Light Theme**: Toggled in the header; a `dark-mode` class is set on `<body>` and the preference is persisted to `localStorage`.

- **Back to Top**: When scrolled beyond a threshold, a circular FAB appears; clicking it smoothly scrolls to top.

## ✅ Implemented Features (mapped to requirements)

- Functional components & logical structure
- React Router routes: Home, Details, Favorites
- TMDB integration for movies and genres
- Search + filter (genre + rating)
- Infinite scrolling for the list
- Favorites with persistence
- Dark/light theme with persistence
- Basic error handling and accessibility-friendly attributes
- Responsive CSS

## 🧩 Tech Stack

- **React** (functional components & hooks)
- **React Router**
- **CSS** (responsive styling)
- **localStorage** for persistence
- **TMDB** for movies/genres

---

> _Tip:_ If you fork this project, rotate your TMDB keys and move them into a `.env` file. For production deployments, consider a tiny server to proxy TMDB requests and hide sensitive credentials.
