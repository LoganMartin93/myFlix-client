import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies, isFavorite, onToggleFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>; // Handle case where movie doesn't exist
  }

  return (
    <div style={{ borderColor: 'silver', borderWidth: '4px', borderStyle: 'solid' }}>
      <div style={{ borderColor: 'White', borderWidth: '4px', borderStyle: 'solid' }}>
      <Link to={`/`}>
        <img className="w-50" src={movie.ImagePath} alt={movie.Title} />
      </Link>
      <div>
        <span><strong>Title: </strong></span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span><strong>Director: </strong></span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span><strong>Description: </strong></span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span><strong>Genre: </strong></span>
        <span>{movie.Genre.Name}</span>
      </div>
      <Button
        variant={isFavorite(movie._id) ? "danger" : "primary"}
        onClick={() => onToggleFavorite(movie._id)}
      >
        {isFavorite(movie._id) ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
      </div>
    </div>
  );
};
