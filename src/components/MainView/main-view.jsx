import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { SignupView } from "../Signup-view/signup-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]); // Initialized as an empty array
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://flix-movie-app-876a7808f8f1.herokuapp.com/movies/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);

        if (Array.isArray(data)) {
          const moviesFromApi = data.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description || movie.Descriptions, // Handling both cases
            Genre: movie.Genre.Name, // Access the genre name if needed
            ImagePath: movie.ImagePath,
            Director: movie.Director.Name, // Access the director's name if needed
            Actors: movie.Actors, // If you want to access actors too
          }));
          setMovies(moviesFromApi);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  console.log("Movies state:", movies); // Logging the movies state

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
