import React, { useEffect, useState } from "react";

const MovieCard = ({ currentPage, setTotalPages }) => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const apiReadAccessToken = import.meta.env.VITE_API_ACCESS_TOKEN;
  const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US";

  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiReadAccessToken}`,
      },
    };

    try {
      const response = await fetch(`${MOVIE_API_URL}&page=${currentPage}`, options);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages); // Actualizar el total de páginas
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [apiReadAccessToken, currentPage]);

  const filterMovies = (movies, searchValue) => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <>
      <div className='flex justify-center mt-4'>
        <input
          type="search"
          id="searchMovie"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movie"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.length > 0 ? (
            filterMovies(movies, searchValue).map(movie => (
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
    </>
  );
};

export default MovieCard;