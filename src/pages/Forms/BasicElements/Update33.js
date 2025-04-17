import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const arabicToMarathiDigits = (num) => {
  const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((digit) => marathiDigits[parseInt(digit)])
    .join("");
};
const currentYear = new Date().getFullYear();
const yearRanges = Array.from({ length: 100 }, (_, i) => {
  const startYear = currentYear - i;
  const endYear = startYear + 1;
  const startYearInMarathi = arabicToMarathiDigits(startYear);
  const endYearInMarathi = arabicToMarathiDigits(endYear);
  return `${startYearInMarathi} -${endYearInMarathi}`;
});

const Update33 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {}); // state is used as the initial value for formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      दिनांक: date, // Assuming your date field is "पूर्ण केल्याची तारीख"
    }));
  };

  useEffect(() => {
    const { type, message } = getSessionMessage();
    if (type && message) {
      if (type === "success") {
        setSuccessMessage(message);
        setErrorMessage("");
      } else if (type === "error") {
        setErrorMessage(message);
        setSuccessMessage("");
      }
    }
  });

  useEffect(() => {
    if (!state && formData.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/Namuna33VrukshNondViha/get_by_id/${formData.id}`);
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, formData.id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? value : "";

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async () => {
    console.log("Starting form submission..."); // Log the start of the submission
    setLoading(true); // Indicate loading state
    const requiredFields = ["naav", "vrukshkrmank", "vrukshprakar", "vrukshjopasnechijababdari", "shera"];

    try {
      // Validate required fields
      console.log("Validating required fields:", requiredFields); // Log required fields
      const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");
      if (!isFormValid) {
        const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा.";
        console.log("Validation failed. Missing required fields."); // Log validation failure
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success messages
        setLoading(false); // Stop loading
        return; // Exit function
      }

      // Retrieve the token from localStorage
      console.log("Retrieving token from localStorage..."); // Log token retrieval
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User not authenticated."); // Log missing token
        throw new Error("User not authenticated. Please log in.");
      }
      console.log("Token retrieved successfully:", token); // Log retrieved token

      // Send the update request with token in the headers
      console.log("Sending data to the server:", formData); // Log data being sent
      const response = await axios.post(`http://localhost:8080/Namuna33VrukshNondViha/update_by_id/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });

      // Handle success
      console.log("Server response received:", response.data); // Log server response
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Store success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear error messages

      console.log("Navigating to the report page..."); // Log navigation
      navigate("/नमुना-३३-अहवाल");
    } catch (err) {
      console.error("Error updating data:", err); // Log error details

      // Handle error
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; // Use error message from response
      }
      console.log("Error message:", errorMessage); // Log error message
      sessionStorage.setItem("sessionMessage", errorMessage); // Store error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success messages
    } finally {
      setLoading(false); // Stop loading
      console.log("Form submission completed."); // Log completion
    }
  };

  const handleReset = () => {
    setFormData({
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      naav: "",
      vrukshkrmank: "",
      vrukshprakar: "",
      vrukshjopasnechijababdari: "",
      shera: "",
      date: "",
    });
  };
  const breadcrumbTitle = "वृक्ष नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३३ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३३-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
       <style>
                      {`
                      .page-title-right {
                          display: flex;
                          justify-content: flex-end;
                          width: 100%;
                      }
      
                      @media (max-width: 768px) {
                          .page-title-right {
                          justify-content: center; /* Center align on smaller screens */
                          }
                      }
                      `}
              </style>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {/* Show session message if available */}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">वृक्ष नोंदवही - अद्यतन करा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          <i className="bx bx-arrow-back"></i>मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="gy-4">
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="naav" className="form-label">
                          नाव
                        </Label>
                        <Input type="text" className="form-control" id="naav" value={formData.naav} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="vrukshkrmank" className="form-label">
                          वृक्ष क्रमांक Cते C
                        </Label>
                        <Input type="text" className="form-control" id="vrukshkrmank" value={formData.vrukshkrmank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="vrukshprakar" className="form-label">
                          वृक्ष प्रकार
                        </Label>
                        <Input type="text" className="form-control" id="vrukshprakar" value={formData.vrukshprakar} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="vrukshjopasnechijababdari" className="form-label">
                          वृक्ष जोपासनेधी जबाबदारी
                        </Label>
                        <Input type="text" className="form-control" id="vrukshjopasnechijababdari" value={formData.vrukshjopasnechijababdari} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="date" className="form-label">
                          दिनांक
                        </Label>
                        <Input type="date" className="form-control" id="date" value={formData.date} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="shera" className="form-label">
                          शेरा
                        </Label>
                        <textarea
                          className="form-control"
                          id="shera"
                          value={formData.shera}
                          onChange={handleInputChange}
                          rows="4" // You can adjust the number of rows as needed
                        />
                      </div>
                    </Col>
                  </Row>
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-३३-अहवाल")}>
                      रद्द करा
                    </Button>
                  </ModalFooter>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Update33;
