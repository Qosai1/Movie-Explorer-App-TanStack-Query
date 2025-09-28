import { useRef, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "./Component/Header";
import "./style.css";
import MovieDetails from "./Component/MovieDetails";
import Favorites from "./Component/Favorites";
import Search from "./Component/Search";
import MovieGrid from "./Component/MovieGrid";
import BackTop from "./Component/BackToTop";
import { fetchMovies } from "./Component/moviesApi";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const sentinelRef = useRef(null);

  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined; 
    },
  });

 
  useEffect(() => {
    if (!sentinelRef.current) return;

    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    );

    ob.observe(sentinelRef.current);
    return () => ob.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  
  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  if (isLoading) return <div style={{ padding: 20 }}>Loading…</div>;
  if (isError) return <div style={{ padding: 20, color: "crimson" }}>Error: {error.message}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Search />
              <MovieGrid results={movies} IMG_BASE={IMG_BASE} />
              <BackTop />

              <div ref={sentinelRef} style={{ height: 1 }} />

              {isFetchingNextPage && (
                <div
                  className="status"
                  style={{ textAlign: "center", margin: "14px 0 24px" }}
                >
                  Loading more…
                </div>
              )}
              {!hasNextPage && (
                <div
                  className="status"
                  style={{ textAlign: "center", margin: "14px 0 24px" }}
                >
                  Reached the end.
                </div>
              )}
              {isError && (
                <div
                  className="status"
                  style={{
                    textAlign: "center",
                    color: "crimson",
                    margin: "14px 0 24px",
                  }}
                >
                  Error!! {error.message}
                </div>
              )}
            </>
          }
        />

        <Route
          path="/favorites"
          element={
            <>
              <Header />
              <Favorites movies={movies} IMG_BASE={IMG_BASE} />
            </>
          }
        />

        <Route
          path="/movie/:id"
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
