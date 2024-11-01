import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

export const ProfileView = ({ user, token, movies, onProfileUpdate, onProfileDeregister }) => {
  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user's favorite movies
  const favoriteMovies = movies.filter((m) => user?.FavoriteMovies?.length > 0 && user.FavoriteMovies.includes(m._id));

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    setError(null);

    const updatedData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://flix-movie-app-876a7808f8f1.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully");
          onProfileUpdate(updatedData); // Update parent state
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Profile update failed");
          });
        }
      })
      .catch((error) => setError(error.message));
  };

  const handleProfileDeregister = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`https://flix-movie-app-876a7808f8f1.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            alert("Profile deleted successfully");
            onProfileDeregister(); // Log out and reset user state
            navigate("/signup");
          } else {
            throw new Error("Profile deletion failed");
          }
        })
        .catch((error) => setError(error.message));
    }
  };

  return (
    <div className="container my-5"> {/* Added container with top and bottom margin */}
      <Form onSubmit={handleProfileUpdate}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group controlId="profileFormUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="profileFormPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </Form.Group>

        <Form.Group controlId="profileFormEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="profileFormBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="me-2">
          Update Profile
        </Button>
        <Button variant="danger" onClick={handleProfileDeregister}>
          Delete Profile
        </Button>

        <h4 className="mt-4">Favorite Movies</h4>
        <div className="row">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <div key={movie._id} className="col-md-4 mb-3"> {/* Create a column for each movie card */}
                <Card>
                  <Card.Img className="w-100" variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link">View</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>No favorite movies added yet.</p>
          )}
        </div>
      </Form>
    </div>
  );
};
