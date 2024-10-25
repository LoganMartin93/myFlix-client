import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: 'pointer', border: '1px solid #ccc', margin: '10px', padding: '10px' }}
    >
      <h2>{movie.Title}</h2>
      <img src={movie.ImagePath} alt={movie.Title} style={{ width: '100px' }} />
      <p>Director: {movie.Director}</p>
      <p>Genre: {movie.Genre.Name}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
