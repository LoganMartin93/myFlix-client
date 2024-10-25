import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} style={{ width: '200px' }} />
      </div>
      <div>
        <span><strong>Title:</strong> </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span><strong>Director:</strong> </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span><strong>Description:</strong> </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span><strong>Genre:</strong> </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
