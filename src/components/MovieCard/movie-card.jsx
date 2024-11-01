import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <p>Director: {movie.Director.Name}</p>
        <p>Genre: {movie.Genre.Name}</p>
        <Link
          to={`/movies/${encodeURIComponent(movie._id)}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <p>View Details</p>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={() => onToggleFavorite(movie._id)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};
