import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";

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

const Update23 = () => {
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
      पूर्णकेल्याचीतारीख: date, // Assuming your date field is "पूर्ण केल्याची तारीख"
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
          const response = await axios.post(`http://localhost:8080/tabyatilRastyanchiNondWahi/getById/${formData.id}`);
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
    const requiredFields = [
      "rastyacheNaaw",
      "gaawPaasun",
      "gaawParyant",
      "laambiKm",
      "rundiKm",
      "rastyachaPrakar",
      "purnKelyachiTarikh",
      "pratiKmRastaTayarKarnyasAalelaKharch",
      "durustyaChaluKharchRupaye",
      "durustyaChaluSwarup",
      "durustyaWisheshKharchRupaye",
      "durustyaWisheshSwarup",
      "durustyaMulBandhkamKharchRupaye",
      "durustyaMulBandhkamSwarup",
      "shera",
      "year",
    ];

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
      const response = await axios.post(`http://localhost:8080/tabyatilRastyanchiNondWahi/updateById/${formData.id}`, formData, {
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
      navigate("/नमुना-२३-अहवाल");
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
      rastyacheNaaw: "",
      gaawPaasun: "",
      gaawParyant: "",
      laambiKm: "",
      rundiKm: "",
      rastyachaPrakar: "",
      purnKelyachiTarikh: "",
      pratiKmRastaTayarKarnyasAalelaKharch: "",
      durustyaChaluKharchRupaye: "",
      durustyaChaluSwarup: "",
      durustyaWisheshKharchRupaye: "",
      durustyaWisheshSwarup: "",
      durustyaMulBandhkamKharchRupaye: "",
      durustyaMulBandhkamSwarup: "",
      shera: "",
      year: "",
    });
  };
  const breadcrumbTitle = "ताब्यातील रस्त्यांची नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२३ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२३-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 68%;
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
                        <h4 className="card-title mb-4">ताब्यातील रस्त्यांची नोंदवही- अद्यतन करा</h4>
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
                        <Label htmlFor="rastyacheNaaw" className="form-label">
                          रस्त्यांचे नाव
                        </Label>
                        <Input type="text" className="form-control" id="rastyacheNaaw" value={formData.rastyacheNaaw} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="gaawPaasun" className="form-label">
                          गाव पासून
                        </Label>
                        <Input type="text" className="form-control" id="gaawPaasun" value={formData.gaawPaasun} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="gaawParyant" className="form-label">
                          गाव पर्यंत
                        </Label>
                        <Input type="text" className="form-control" id="gaawParyant" value={formData.gaawParyant} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="laambiKm" className="form-label">
                          लांबी (किलो मीटर)
                        </Label>
                        <Input type="text" className="form-control" id="laambiKm" value={formData.laambiKm} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="rundiKm" className="form-label">
                          रुंदी (किलो मीटर)
                        </Label>
                        <Input type="text" className="form-control" id="rundiKm" value={formData.rundiKm} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="rastyachaPrakar" className="form-label">
                          रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा
                        </Label>
                        <Input type="text" className="form-control" id="rastyachaPrakar" value={formData.rastyachaPrakar} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="purnKelyachiTarikh" className="form-label">
                          पूर्ण केल्याची तारीख
                        </Label>
                        <Input type="date" className="form-control" id="purnKelyachiTarikh" value={formData.purnKelyachiTarikh} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="pratiKmRastaTayarKarnyasAalelaKharch" className="form-label">
                          प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च
                        </Label>
                        <Input type="text" className="form-control" id="pratiKmRastaTayarKarnyasAalelaKharch" value={formData.pratiKmRastaTayarKarnyasAalelaKharch} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaChaluKharchRupaye" className="form-label">
                          दुरुस्त्या चालू खर्च रुपये
                        </Label>
                        <Input type="text" className="form-control" id="durustyaChaluKharchRupaye" value={formData.durustyaChaluKharchRupaye} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaChaluSwarup" className="form-label">
                          दुरुस्त्या चालू स्वरुप
                        </Label>
                        <Input type="text" className="form-control" id="durustyaChaluSwarup" value={formData.durustyaChaluSwarup} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaWisheshKharchRupaye" className="form-label">
                          दुरुस्त्या विशेष खर्च रुपये
                        </Label>
                        <Input type="text" className="form-control" id="durustyaWisheshKharchRupaye" value={formData.durustyaWisheshKharchRupaye} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaWisheshSwarup" className="form-label">
                          दुरुस्त्या विशेष स्वरुप
                        </Label>
                        <Input type="text" className="form-control" id="durustyaWisheshSwarup" value={formData.durustyaWisheshSwarup} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaMulBandhkamKharchRupaye" className="form-label">
                          दुरुस्त्या मूळ बंधकाम खर्च रुपये
                        </Label>
                        <Input type="text" className="form-control" id="durustyaMulBandhkamKharchRupaye" value={formData.durustyaMulBandhkamKharchRupaye} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="durustyaMulBandhkamSwarup" className="form-label">
                          दुरुस्त्या मूळ बंधकाम स्वरुप
                        </Label>
                        <Input type="text" className="form-control" id="durustyaMulBandhkamSwarup" value={formData.durustyaMulBandhkamSwarup} onChange={handleInputChange} />
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
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="year" className="form-label">
                          वर्ष
                        </Label>
                        <Input type="select" id="year" value={formData.year} onChange={handleInputChange}>
                          <option value="">वर्ष निवडा</option>
                          {yearRanges.map((yearRange) => (
                            <option key={yearRange} value={yearRange}>
                              {yearRange}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                    {/* <Col sm={12}>
                      <Button color="success" onClick={handleSubmit}>
                        अद्यतन करा
                      </Button>
                      <Button color="primary" onClick={handleReset} style={{ marginLeft: "10px" }}>
                        रिसेट करा
                      </Button>
                      <Button color="danger" onClick={() => navigate("/नमुना-२३-अहवाल")} style={{ marginLeft: "10px" }}>
                        रद्द करा
                      </Button>
                    </Col> */}
                  </Row>
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२३-अहवाल")}>
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

export default Update23;
