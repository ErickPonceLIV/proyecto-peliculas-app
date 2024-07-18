import React, { useEffect, useState } from 'react'

const App = () => {
  const [movies, setMovies] = useState([]);
  const apiReadAccessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

  // Fetch movies from API
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/nowplaying?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer  ${apiReadAccessToken}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .then(data => console.log(data.results))
      .catch(err => console.error('error:' + err));

  }, [])


  return (
    <div>
      {

        movies.map((movies) => (
          <>
            <div
              key={movies.title}
            >
              <h1>{movies.title}</h1>
              <img style={{ width: 200 }} src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`} alt={movies.title} />
            </div>
          </>

        ))
      }
    </div>
  )
}

export default App