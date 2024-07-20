import React, { useEffect, useState } from "react";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const apiReadAccessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

  // Fetch movies from API
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiReadAccessToken}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("error: " + err));
  }, [apiReadAccessToken]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg"
                style={{ width: "100%" }}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.title}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;