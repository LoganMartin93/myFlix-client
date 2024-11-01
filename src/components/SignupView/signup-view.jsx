import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"; // Import Alert for error messages

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); // Clear any previous error

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://flix-movie-app-876a7808f8f1.herokuapp.com/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          navigate("/login"); // Redirect to login page on success
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Signup failed");
          });
        }
      })
      .catch((error) => {
        setError(error.message); // Set error message
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error */}

      <Form.Group controlId="signUpFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="signUpFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8" // Basic password length validation
        />
      </Form.Group>

      <Form.Group controlId="signUpFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signUpFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
