import React, { useState, useEffect } from "react";

import { Input, Button, Row, Col, Label, Card, CardBody, Container, FormGroup } from "reactstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent"; // Import session management functions

const Namuna13 = () => {
  document.title = "नमुना १३";

  const initialFormData = {
    padnaam: "",
    padanchiSankhya: "",
    manjurPadAdeshKramank: "",
    manjurPadAdeshDinank: "",
    purnakalikAnshkalik: "",
    manjurWetanShreni: "",
    karmacharyacheNaav: "",
    niyuktiDinank: "",
    year: "",
    remark: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error
  const navigate = useNavigate();
  useEffect(() => {
    const { type, message } = getSessionMessage(); // Fetch the session message
    if (type && message) {
      if (type === "success") {
        setSuccessMessage(message);
        setErrorMessage("");
      } else if (type === "error") {
        setErrorMessage(message);
        setSuccessMessage("");
      }
    }
  }, []); // Empty array ensures this runs only once when the component is mounted
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };
  const dropDown = ["option1", "option2", "option3", "option4"];

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

  const handleSubmit = async () => {
    const requiredFields = [
      "padnaam",
      "padanchiSankhya",
      "manjurPadAdeshKramank",
      "manjurPadAdeshDinank",
      "purnakalikAnshkalik",
      "manjurWetanShreni",
      "karmacharyacheNaav",
      "niyuktiDinank",
      "year",
      "remark",
    ];

    // Validate required fields
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा"; // Customize field name for user-friendly message
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success messages
        return; // Stop the submission
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/karmachari-varg-wetan-shreni/create",
        formData, // Use the entire formData object directly
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly send the token in the Authorization header
          },
        }
      );

      // Save success message and navigate to the report page
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setSuccessMessage("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setErrorMessage(""); // Clear error messages
      navigate("/नमुना-१३-अहवाल");
    } catch (error) {
      let errorMessage = error.response?.data?.message || "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success messages
    }
  };

  const renderInputFields = () => {
    return Object.keys(initialFormData).map((field, index) => (
      <Col xxl={3} md={6} key={index}>
        <div>
          <Label htmlFor={field} className="form-label">
            {/* Replace underscores with spaces and capitalize each word */}
            {field.replace(/([A-Z])/g, " $1").toUpperCase()}
          </Label>
          <Input type={field.includes("date") ? "date" : field.includes("number") ? "number" : "text"} className="form-control" id={field} value={formData[field]} onChange={handleInputChange} />
        </div>
      </Col>
    ));
  };
  const handleSaveAndNew = async () => {
    const requiredFields = [
      "padnaam",
      "padanchiSankhya",
      "manjurPadAdeshKramank",
      "manjurPadAdeshDinank",
      "purnakalikAnshkalik",
      "manjurWetanShreni",
      "karmacharyacheNaav",
      "niyuktiDinank",
      "year",
      "remark",
    ];

    // Validate required fields
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const errorMessage = `कृपया '${field}' क्षेत्र भरा!`; // Customize field name for user-friendly message
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success message
        return; // Stop the submission
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post("http://localhost:8080/karmachari-varg-wetan-shreni/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Save success message and reset form for new entry
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setSuccessMessage("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setErrorMessage(""); // Clear error messages
      setFormData(initialFormData); // Reset form fields for new entry
    } catch (error) {
      let errorMessage = error.response?.data?.message || "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
    }
  };

  // Define months for the select dropdown
  const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
const breadcrumbTitle = "नमुना १३ कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही"; // This could be dynamic
const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-१३ "; // Dynamic page title

const breadcrumbPaths = [
  "/dashboard", // Path for "डॅशबोर्ड"
  "/नमुना-१३-अहवाल", // Path
];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 64%;
                    }
                `}
                
      </style>
      <UiContent />
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}

                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4"> कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही</h4>
                      </div>
                      <div>
                        {/* <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button> */}
                        <Button color="primary" onClick={() => navigate("/नमुना-१३-अहवाल")}>
                          मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="live-preview">
                    <Row className="gy-4">
                      {/* Date Picker Fields */}
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="padnaam" className="form-label">
                            पदनाम
                          </Label>
                          <Input type="select" className="form-control" id="padnaam" value={formData.padnaam} onChange={handleInputChange}>
                            <option value="">Select padnaam</option>
                            {dropDown.map((padnaam, index) => (
                              <option key={index} value={padnaam}>
                                {padnaam}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="padanchiSankhya" className="form-label">
                            पदांची संख्या
                          </Label>
                          <Input type="text" className="form-control" id="padanchiSankhya" value={formData.padanchiSankhya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurPadAdeshKramank" className="form-label">
                            मंजूर पदे आदेश क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="manjurPadAdeshKramank" value={formData.manjurPadAdeshKramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurPadAdeshDinank" className="form-label">
                            मंजूर पदे आदेश दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="manjurPadAdeshDinank" value={formData.manjurPadAdeshDinank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purnakalikAnshkalik" className="form-label">
                            पूर्णकालिक/अंशकालिक
                          </Label>
                          <Input type="text" className="form-control" id="purnakalikAnshkalik" value={formData.purnakalikAnshkalik} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurWetanShreni" className="form-label">
                            मंजूर वेतन श्रेणी
                          </Label>
                          <Input type="text" className="form-control" id="manjurWetanShreni" value={formData.manjurWetanShreni} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="karmacharyacheNaav" className="form-label">
                            नियुक्त केलेल्या कर्मचाऱ्यांचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="karmacharyacheNaav" value={formData.karmacharyacheNaav} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="niyuktiDinank" className="form-label">
                            नियुक्तीचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="niyuktiDinank" value={formData.niyuktiDinank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      {/* <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dainikRokadBahithilJamaRakam" className="form-label">दैनिक रोकड वहीतील जमा रक्कम </Label>
                                                    <Input type="number" className="form-control" id="dainikRokadBahithilJamaRakam" value={formData.dainikRokadBahithilJamaRakam} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="prakritischiTapasni" className="form-label">प्रक्रांतीचा तपशील </Label>
                                                    <Input type="text" className="form-control" id="prakritischiTapasni" value={formData.prakritischiTapasni} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
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
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="remark" className="form-label">
                            शेरा
                          </Label>
                          <Input type="textarea" className="form-control" id="remark" value={formData.remark} onChange={handleInputChange} />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Success/ Error Message */}
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSaveAndNew} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={resetForm} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="primary" onClick={() => (window.location.href = "/नमुना-१३-अहवाल")}>
                        रद्द करा
                      </Button>
                    </div>
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

export default Namuna13;
