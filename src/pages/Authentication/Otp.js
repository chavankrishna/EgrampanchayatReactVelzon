import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from "reactstrap";
import axios from "axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(0); // Timer for the resend button
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Disable resend button

  // Fetch the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Retrieve the username
    if (storedUsername) {
      setUsername(storedUsername); // Set the username from storage
    } else {
      setErrorMsg("Username is required but not found.");
      navigate("/forgot-password"); // Redirect to Forgot Password page if username not found
    }
  }, [navigate]);

  useEffect(() => {
    // Start the timer countdown for resend OTP
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer when the component unmounts or timer changes
    }
  }, [resendTimer]);

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp) {
      setErrorMsg("OTP is required.");
      setLoading(false);
      return;
    }

    try {
      // Send the POST request to verify OTP
      const response = await axios.post("http://localhost:8080/auth/verifyOtp", { username, otp }, { headers: { "Content-Type": "application/json" } });

      if (response) {
        setSuccessMsg("OTP verified successfully.");
        navigate("/new-password"); // Redirect to the new password page
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.response) {
        setErrorMsg(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setErrorMsg("Network error or unexpected issue. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // Disable resend button and start the timer
    setIsResendDisabled(true);
    setResendTimer(30); // Set the timer to 30 seconds (or adjust as needed)

    try {
      // Request for a new OTP
      const response = await axios.post(
        "http://localhost:8080/auth/resendOtp", // Assume this is the endpoint for resending OTP
        { username },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.success) {
        setSuccessMsg("OTP has been resent. Please check your email.");
      } else {
        setErrorMsg("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMsg("An error occurred while resending the OTP. Please try again.");
    } finally {
      // After 30 seconds, allow the user to resend OTP
      setIsResendDisabled(false);
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

                  {/* Error and success messages */}
                  {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
                  {successMsg && <div style={{ color: "green" }}>{successMsg}</div>}

                  {/* OTP Form */}
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleVerifyOtp();
                    }}
                  >
                    <div className="mb-3">
                      <Label htmlFor="otp">OTP</Label>
                      <Input id="otp" type="text" name="otp" invalid={!otp} placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                      {!otp && <FormFeedback>OTP is required</FormFeedback>}
                    </div>

                    <Button color="primary" className="w-100" disabled={loading} type="submit">
                      {loading ? <Spinner size="sm" className="me-2" /> : null}
                      Verify OTP
                    </Button>
                  </Form>

                  {/* Resend OTP Button */}
                  <div className="mt-3 text-center">
                    <Button color="link" onClick={handleResendOtp} disabled={isResendDisabled}>
                      {isResendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VerifyOtp;
