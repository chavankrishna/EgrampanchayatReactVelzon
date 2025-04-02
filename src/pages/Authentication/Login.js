import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from "reactstrap";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../slices/auth/login/thunk"; // Import your login thunk action
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate(); // Ensure useNavigate is correctly imported
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // State for success message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const validation = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      handleLogin(values.username, values.password);
    },
  });

  // Login function
  const handleLogin = async (username, password) => {
    setLoading(true);
    setErrorMsg(""); // Clear any previous error messages
    setSuccessMsg(""); // Clear any previous success messages

    try {
      console.log("Sending credentials:", { username, password });

      // Send POST request to backend API for login
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure content-type is set
          },
        }
      );

      // Log the full response for debugging
      console.log("Full response from backend:", response);

      // Assuming login success if the response contains token
      if (response?.data) {
        const token = response.data.split("Token: ")[1]; // Split to remove the "Token: " prefix
        setSuccessMsg("Login Successful!");
        // Store the token in localStorage
        localStorage.setItem("token", token); // Store only the token, not the full "Token: ..."
        localStorage.setItem("username", username);
        console.log("Token saved in localStorage:", token);

        // console.log("Token saved in localStorage:", response.data);

        // Set success message to state

        // Redirect to the dashboard after a short delay

        navigate("/dashboard"); // Redirect to the dashboard page
      } else {
        setErrorMsg("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "An error occurred while logging in. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || "An error occurred while logging in.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrorMsg(errorMessage); // Set the error message
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already authenticated, redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password, navigate)); // Assuming your login thunk sets the token
  };

  // If the user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back!</h5>
                    <p className="text-muted">Sign in to continue to your dashboard.</p>
                  </div>

                  {/* Show error message if login fails */}
                  {errorMsg && <Alert color="danger">{errorMsg}</Alert>}

                  {/* Show success message if available */}
                  {successMsg && <Alert color="success">{successMsg}</Alert>}

                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                      }}
                    >
                      <div className="mb-3">
                        <Label htmlFor="username" className="form-label">
                          Username
                        </Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter username"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={validation.touched.username && validation.errors.username ? true : false}
                        />
                        {validation.touched.username && validation.errors.username ? <FormFeedback type="invalid">{validation.errors.username}</FormFeedback> : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="password">
                          Password
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={validation.touched.password && validation.errors.password ? true : false}
                        />
                        {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
                      </div>

                      <div className="mt-4">
                        <Button color="primary" disabled={loading} className="w-100" type="submit">
                          {loading ? <Spinner size="sm" className="me-2" /> : null}
                          Sign In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3 text-center">
                      <Button color="link" onClick={() => navigate("/forgot-password")} className="text-decoration-none">
                        Forgot Password?
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* <div className="mt-4 text-center">
                                <p className="mb-0">Don't have an account? <a href="/register" className="fw-semibold text-primary text-decoration-underline">Signup</a></p>
                            </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
