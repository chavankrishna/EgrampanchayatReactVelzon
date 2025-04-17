import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter } from "reactstrap";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "./finalconfig"; // Import session management functions

const Namuna13Update = () => {
  const { state } = useLocation(); // Access the passed record data from the previous page
  const navigate = useNavigate();

  const [record, setRecord] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    // If no state was passed (direct access to this page), fetch record by ID
    if (!state && record.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/karmachari-varg-wetan-shreni/get_by_id/${record.id}`);
          if (response.data) {
            setRecord(response.data);
          } else {
            setError("Error: No data received");
          }
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, record.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value, // Dynamically updates the key in the record object
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

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
      if (!record[field]) {
        const errorMessage = `कृपया '${field}' क्षेत्र भरा!`; // Customize field name for user-friendly message
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any previous success messages
        setLoading(false);
        return; // Stop submission if a required field is empty
      }
    }

    try {
      const response = await axios.post(`http://localhost:8080/karmachari-varg-wetan-shreni/update_by_id/${record.id}`, record, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any previous error messages

      // Redirect to the report page
      navigate("/नमुना-१३-अहवाल");
    } catch (err) {
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle if the date is empty or invalid

    // Check if the date is already in a valid format (e.g., YYYY-MM-DD)
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // If invalid date, return an empty string

    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  };
  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
  const breadcrumbTitle = "कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-१३ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-१३-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 62%;
                    }
                `}
                
      </style>
      <UiContent />
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4"> कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही - अद्यतन करा</h4>
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
                  <Row className="gy-4">
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="padnaam" className="form-label">
                          पदनाम
                        </Label>
                        <Input
                          type="select"
                          className="form-control"
                          id="padnaam"
                          name="padnaam" // Added name attribute to match the record key
                          value={record.padnaam || ""} // Handle undefined values
                          onChange={(e) => handleInputChange(e)} // Handle the change
                        >
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
                        <Label for="guntonukiciTapisila">पदांची संख्या</Label>
                        <Input type="text" id="padanchiSankhya" name="padanchiSankhya" value={record.padanchiSankhya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="manjurPadAdeshKramank">मंजूर पद आदेश क्रमांक</Label>
                        <Input type="text" id="manjurPadAdeshKramank" name="manjurPadAdeshKramank" value={record.manjurPadAdeshKramank} onChange={handleInputChange} />
                      </div>
                    </Col>

                    {/* Row 2 */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="manjurPadAdeshDinank" className="form-label">
                          मंजूर पद आदेश दिनांक
                        </Label>
                        <Input type="date" id="manjurPadAdeshDinank" name="manjurPadAdeshDinank" value={formatDate(record.manjurPadAdeshDinank)} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="purnakalikAnshkalik">पूर्णकालिक/अंशकालिक</Label>
                        <Input type="text" id="purnakalikAnshkalik" name="purnakalikAnshkalik" value={record.purnakalikAnshkalik} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="manjurWetanShreni">मंजूर वेतन श्रेणी</Label>
                        <Input type="text" id="manjurWetanShreni" name="manjurWetanShreni" value={record.manjurWetanShreni} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="karmacharyacheNaav">नियुक्त केलेल्या कर्मचाऱ्यांचे नाव</Label>
                        <Input type="text" id="karmacharyacheNaav" name="karmacharyacheNaav" value={record.karmacharyacheNaav} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="niyuktiDinank">नियुक्ती दिनांक</Label>
                        <Input type="date" id="niyuktiDinank" name="niyuktiDinank" value={record.niyuktiDinank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* <Col xxl={3} md={3}>
                                                        <div>
                                                            <Label for="dainikRokadBahithilJamaRakam">दैनिक रोकड वहीतील जमा रक्कम</Label>
                                                            <Input
                                                                type="text"
                                                                id="dainikRokadBahithilJamaRakam"
                                                                name="dainikRokadBahithilJamaRakam"
                                                                value={record.dainikRokadBahithilJamaRakam}
                                                                onChange={handleInputChange}
                                                            />
                                                      </div>
                                                      </Col>
                                                      <Col xxl={3} md={3}>
                                                      <div>
                                                            <Label for="prakritischiTapasni">प्रक्रांतीचा तपशील</Label>
                                                            <Input
                                                                type="text"
                                                                id="prakritischiTapasni"
                                                                name="prakritischiTapasni"
                                                                value={record.prakritischiTapasni}
                                                                onChange={handleInputChange}
                                                            />
                                                      </div>
                                                      </Col> */}

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="year" className="form-label">
                          वर्ष
                        </Label>
                        <Input
                          type="select"
                          id="year"
                          name="year" // Ensure this matches the record key
                          value={record.year || ""}
                          onChange={handleInputChange}
                        >
                          <option value="">वर्ष निवडा</option>
                          {yearRanges.map((yearRange, index) => (
                            <option key={index} value={yearRange}>
                              {yearRange}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="remark">शेरा</Label>
                        <Input type="text" id="remark" name="remark" value={record.remark} onChange={handleInputChange} />
                      </div>
                    </Col>
                  </Row>

                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-१३-अहवाल")}>
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

export default Namuna13Update;
