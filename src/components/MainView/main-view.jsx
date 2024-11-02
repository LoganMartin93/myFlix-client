import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { SignupView } from "../SignupView/signup-view";
import { LoginView } from "../LoginView/login-view";
import { NavigationBar } from "../NavigationBar/navigation-bar";
import { ProfileView } from "../ProfileView/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Routes, Route, Navigate, Link, useSearchParams } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("https://flix-movie-app-876a7808f8f1.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const moviesFromApi = data.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description || movie.Descriptions,
            Genre: movie.Genre,
            ImagePath: movie.ImagePath,
            Director: movie.Director,
          }));
          setMovies(moviesFromApi);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to toggle favorite status of a movie
  const toggleFavorite = (movieId) => {
    if (user) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      const updatedFavorites = isFavorite
        ? user.FavoriteMovies.filter((id) => id !== movieId) // Remove from favorites
        : [...user.FavoriteMovies, movieId]; // Add to favorites

      setUser((prevUser) => ({
        ...prevUser,
        FavoriteMovies: updatedFavorites,
      }));

      // Update favorites on the server
      fetch(`https://flix-movie-app-876a7808f8f1.herokuapp.com/users/${user.Username}/favorites`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ FavoriteMovies: updatedFavorites }),
      });
    }
  };

  return (
    <div>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
        }}
      />
      <Row className="justify-content-md-center">
        {loading && <Col>Loading movies...</Col>}
        {error && <Col className="text-danger">{error}</Col>}
        <Routes>
          <Route
            path="/signup"
            element={!user ? <Col md={5}><SignupView /></Col> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} /></Col>}
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={5} className="text-center">
                  <MovieView
                    movies={movies}
                    isFavorite={(movieId) => user.FavoriteMovies.includes(movieId)}
                    onToggleFavorite={toggleFavorite}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {/* Search Bar: Only show if user is logged in */}
                  <Col md={12} className="text-center">
                    <input
                      type="text"
                      placeholder="Search for movies..."
                      value={searchQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setSearchParams({ search: value }); // Set search param
                        } else {
                          setSearchParams({}); // Clear search param
                        }
                      }}
                      style={{ marginBottom: '20px', padding: '5px', width: '25%' }}
                    />
                  </Col>
                  {filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={2}>
                      <Link
                        to={`/movies/${encodeURIComponent(movie._id)}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <MovieCard
                          movie={movie}
                          isFavorite={user.FavoriteMovies.includes(movie._id)} // Check if the movie is a favorite
                          onToggleFavorite={toggleFavorite} // Pass the toggle function
                        />
                      </Link>
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onProfileUpdate={(updatedUser) => {
                        setUser({ ...user, ...updatedUser });
                      }}
                      onProfileDeregister={() => {
                        setUser(null); // Handle user deregistration
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </div>
  );
};
