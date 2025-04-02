import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Get username from the location state or localStorage
    const usernameFromLocation = location?.state?.username || localStorage.getItem("username");
    if (usernameFromLocation) {
      setUsername(usernameFromLocation); // Set username from URL or localStorage
    }
  }, [location]);

  // Validation function
  const validatePassword = (password) => {
    const minLength = 4; // Minimum length of the password
    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letter
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letter
    const hasNumber = /\d/.test(password); // Check for number
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special character

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase || !hasLowerCase) {
      return "Password must contain both uppercase and lowercase letters.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return ""; // No errors
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setPasswordError(""); // Clear previous password errors

    // Validate password before submitting
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/updatePassword", { username, newPassword }, { headers: { "Content-Type": "application/json" } });

      console.log("Full response from backend:", response);

      if (response) {
        setSuccessMsg("Password updated successfully.");
        navigate("/login"); // Redirect to login after success
      } else {
        setErrorMsg("Error updating password. Please try again.");
      }
    } catch (error) {
      console.error("Error during password update:", error);

      if (error.response) {
        console.log("Error response from backend:", error.response);
        setErrorMsg(error.response.data.message || "An error occurred. Please try again.");
      } else if (error.message) {
        console.log("Error message:", error.message);
        setErrorMsg("Network Error. Please check your connection.");
      } else {
        setErrorMsg("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <React.Fragment>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <h5 className="text-primary text-center">New Password</h5>

                  {/* Display error or success messages */}
                  {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                  {successMsg && <Alert color="success">{successMsg}</Alert>}

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <div className="mb-3">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        invalid={!!passwordError}
                      />
                      {passwordError && <FormFeedback>{passwordError}</FormFeedback>}
                    </div>

                    <Button color="primary" className="w-100" disabled={loading || !!passwordError} type="submit">
                      {loading ? <Spinner size="sm" className="me-2" /> : null} Update Password
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewPassword;
