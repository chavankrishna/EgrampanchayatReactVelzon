import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validation = useFormik({
    initialValues: { username: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
    }),
    onSubmit: (values) => {
      handleForgotPassword(values.username);
    },
  });

  const handleForgotPassword = async (username) => {
    console.log("Submitting username:", username); // Debugging log
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:8080/auth/forgotPassword", { username }, { headers: { "Content-Type": "application/json" } });

      console.log("API Response:", response); // Log the response data for debugging

      if (response) {
        setSuccessMsg("OTP sent successfully to your email.");
        localStorage.setItem("username", username);
        navigate("/verify-otp");
      } else {
        setErrorMsg("Error sending OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      if (error.response) {
        setErrorMsg(`Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setErrorMsg("No response from the server. Please check your network connection.");
      } else {
        setErrorMsg(`Request Error: ${error.response}`);
      }
    } finally {
      setLoading(false);
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
                  <h5 className="text-primary text-center">Forgot Password</h5>

                  {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                  {successMsg && <Alert color="success">{successMsg}</Alert>}

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}
                  >
                    <div className="mb-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={validation.values.username || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.username && validation.errors.username ? true : false}
                      />
                      {validation.touched.username && validation.errors.username && <FormFeedback>{validation.errors.username}</FormFeedback>}
                    </div>

                    <Button color="primary" className="w-100" disabled={loading} type="submit">
                      {loading ? <Spinner size="sm" className="me-2" /> : null} Send OTP
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

export default ForgotPassword;
