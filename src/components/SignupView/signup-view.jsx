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
  const [fieldErrors, setFieldErrors] = useState({}); // State for individual field errors
  const navigate = useNavigate(); // Initialize navigate

  const validateFields = () => {
    const errors = {};

    if (username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email must be a valid email address.";
    }
    if (!birthday) {
      errors.birthday = "Birthday is required.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); // Clear any previous error
    setFieldErrors({}); // Clear field errors

    if (!validateFields()) {
      return; // Prevent form submission if validation fails
    }

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
          isInvalid={!!fieldErrors.username} // Highlight input if there's an error
        />
        <Form.Control.Feedback type="invalid">
          {fieldErrors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="signUpFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          isInvalid={!!fieldErrors.password} // Highlight input if there's an error
        />
        <Form.Control.Feedback type="invalid">
          {fieldErrors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="signUpFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          isInvalid={!!fieldErrors.email} // Highlight input if there's an error
        />
        <Form.Control.Feedback type="invalid">
          {fieldErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="signUpFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          isInvalid={!!fieldErrors.birthday} // Highlight input if there's an error
        />
        <Form.Control.Feedback type="invalid">
          {fieldErrors.birthday}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
