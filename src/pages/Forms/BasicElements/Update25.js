import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter } from "reactstrap";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import "../BasicElements/style.css";
const Update25 = () => {
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
          const token = localStorage.getItem("token"); // Get the token from local storage
          const response = await axios.post(
            `http://localhost:8080/api/guntonukNamuna25/get/${record.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the headers
              },
            }
          );
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
    setRecord({
      ...record,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(`http://localhost:8080/api/guntonukNamuna25/update/${record.id}`, record, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
        },
      });

      console.log("Response:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      // Redirect to the report page
      navigate("/नमुना-२५-अहवाल");
    } catch (err) {
      // Handle errors as you have already done
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message

      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
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
  const breadcrumbTitle = "अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२५ "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/report", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];

  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 80%;
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
                  {errorMessage && <div className="alert alert-info">{errorMessage}</div>}

                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4"> गुंतवणूक वही - अद्यतन करा</h4>
                      </div>
                      <div>
                        {/* <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button> */}
                        <Button color="primary" onClick={() => navigate("/नमुना-२५-अहवाल")}>
                          मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="gy-4">
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="id">कर्मचारी आयडी</Label>
                        <Input type="text" id="id" name="grampanchyatId" value={record.id} disabled />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="guntonukiciTarikha">गुंतवणुकीची तारीख</Label>
                        <Input
                          type="date" // Input type changed to "date"
                          id="guntonukiciTarikha"
                          name="guntonukiciTarikha"
                          value={formatDate(record.guntonukiciTarikha)} // Format the date correctly
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="guntonukiciTapisila">गुंतवणुकीचा तपशील(बँकेत मुदत ठेव)</Label>
                        <Input type="text" id="guntonukiciTapisila" name="guntonukiciTapisila" value={record.guntonukiciTapisila} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="guntonukichiRakamDarsaniMulya">गुंतवणुकीची रक्कम दर्शनी मूल्य</Label>
                        <Input type="text" id="guntonukichiRakamDarsaniMulya" name="guntonukichiRakamDarsaniMulya" value={record.guntonukichiRakamDarsaniMulya} onChange={handleInputChange} />
                      </div>
                    </Col>

                    {/* Row 2 */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="pranitHonachiTarkhi" className="form-label">
                          परिणत होण्याची तारीख
                        </Label>
                        <Input type="date" id="pranitHonachiTarkhi" name="pranitHonachiTarkhi" value={formatDate(record.pranitHonachiTarkhi)} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="guntonukichiRakamKharēdīKimata">गुंतवणुकीची रक्कम खरेदी किंमत</Label>
                        <Input type="text" id="guntonukichiRakamKharēdīKimata" name="guntonukichiRakamKharēdīKimata" value={record.guntonukichiRakamKharēdīKimata} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="nivalDyaRakam">निव्वळ देय रक्कम</Label>
                        <Input type="text" id="nivalDyaRakam" name="nivalDyaRakam" value={record.nivalDyaRakam} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="uparichitVachanchiTarakhi">परिणत होण्याची तारीख</Label>
                        <Input type="date" id="uparichitVachanchiTarakhi" name="uparichitVachanchiTarakhi" value={formatDate(record.uparichitVachanchiTarakhi)} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="badlichaPadrothrichaDinaka">बदलीचा/पदोन्नतीचा दिनांक</Label>
                        <Input type="date" id="badlichaPadrothrichaDinaka" name="badlichaPadrothrichaDinaka" value={formatDate(record.badlichaPadrothrichaDinaka)} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="dainikRokadBahithilJamaRakam">दैनिक रोकड वहीतील जमा रक्कम</Label>
                        <Input type="text" id="dainikRokadBahithilJamaRakam" name="dainikRokadBahithilJamaRakam" value={record.dainikRokadBahithilJamaRakam} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="prakritischiTapasni">प्रक्रांतीचा तपशील</Label>
                        <Input type="text" id="prakritischiTapasni" name="prakritischiTapasni" value={record.prakritischiTapasni} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="remark">शेरा</Label>
                        <Input type="text" id="remark" name="remark" value={record.remark} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label for="year">महिना</Label>
                        <Input type="text" id="year" name="year" value={record.year} onChange={handleInputChange} />
                      </div>
                    </Col>
                  </Row>

                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२५-अहवाल")}>
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

export default Update25;
