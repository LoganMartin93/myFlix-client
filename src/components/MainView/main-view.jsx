import { useState } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
  
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      fetch("https://flix-movie-app-876a7808f8f1.herokuapp.com/movies/")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.docs.map((doc) => {
            return {
              _id: movie._id,
              Title: movie.Title,
              Description: movie.Description,
              Genre: movie.Genre,
              ImagePath: movie.ImagePath,
              Director: movie.Director,

            };
          });
  
          setMovies(moviesFromApi);
        });
    }, []);
  
    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }
  
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  };
  