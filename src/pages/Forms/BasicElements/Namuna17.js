import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Card, CardBody, Container, FormGroup } from "reactstrap";
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Namuna17 = () => {
  document.title = "गुंतवणूक वही";
  
  const initialFormData = {
    guntonukiciTarikha: "",
    guntonukiciTapisila: "",
    guntonukichiRakamDarsaniMulya: "",
    guntonukichiRakamKharēdīKimata: "",
    pranitHonachiTarkhi: "",
    nivalDyaRakam: "",
    uparichitVachanchiTarakhi: "",
    badlichaPadrothrichaDinaka: "",
    dainikRokadBahithilJamaRakam: "",
    prakritischiTapasni: "",
    remark: "",
    year: "",
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

  // Submit form data
  // Handle Submit function in BasicElements component
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/Namuna17AgrimDilelyaRakamanchiNondvahi/save",
        formData, // Use the entire formData object directly
        { headers: { "Content-Type": "application/json" } }
      );

      // Save success message and navigate to the report page
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      navigate("/report17");
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Failed to submit data. Please try again later.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
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
    try {
      const response = await axios.post("http://localhost:8080/api/guntonukNamuna25/add", formData, { headers: { "Content-Type": "application/json" } });

      // Save success message and reset form for new entry
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setFormData(initialFormData); // Reset form fields
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Failed to submit data. Please try again later.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
    }
  };

  // Define months for the select dropdown
  const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title="गुंतवणूक वही" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {/* <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">गुंतवणूक वही</h5>
                                    <Button color="primary" onClick={() => navigate('/report')}>
                                        Report
                                    </Button>
                                </div> */}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4"> गुंतवणूक वही</h4>
                      </div>
                      <div>
                        {/* <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button> */}
                        <Button color="primary" onClick={() => navigate("/report17")}>
                          मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="live-preview">
                    <Row className="gy-4">
                      {/* Date Picker Fields */}
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="guntonukiciTarikha" className="form-label">
                            गुंतवणुकीची तारीख
                          </Label>
                          <Input type="date" className="form-control" id="guntonukiciTarikha" value={formData.guntonukiciTarikha} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="guntonukiciTapisila" className="form-label">
                            गुंतवणुकीचा तपशील(बँकेत मुदत ठेव)
                          </Label>
                          <Input type="text" className="form-control" id="guntonukiciTapisila" value={formData.guntonukiciTapisila} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="guntonukichiRakamDarsaniMulya" className="form-label">
                            गुंतवणुकीची रक्कम दर्शनी मूल्य{" "}
                          </Label>
                          <Input type="number" className="form-control" id="guntonukichiRakamDarsaniMulya" value={formData.guntonukichiRakamDarsaniMulya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="guntonukichiRakamKharēdīKimata" className="form-label">
                            गुंतवणुकीची रक्कम खरेदी किंमत{" "}
                          </Label>
                          <Input type="number" className="form-control" id="guntonukichiRakamKharēdīKimata" value={formData.guntonukichiRakamKharēdīKimata} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="pranitHonachiTarkhi" className="form-label">
                            परिणत होण्याची तारीख
                          </Label>
                          <Input type="date" className="form-control" id="pranitHonachiTarkhi" value={formData.pranitHonachiTarkhi} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="uparichitVachanchiTarakhi" className="form-label">
                            उपार्जित व्याजाची तारीख
                          </Label>
                          <Input type="date" className="form-control" id="uparichitVachanchiTarakhi" value={formData.uparichitVachanchiTarakhi} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="badlichaPadrothrichaDinaka" className="form-label">
                            बदलीचा/पदोन्नतीचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="badlichaPadrothrichaDinaka" value={formData.badlichaPadrothrichaDinaka} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="nivalDyaRakam" className="form-label">
                            निव्वळ देय रक्कम
                          </Label>
                          <Input type="number" className="form-control" id="nivalDyaRakam" value={formData.nivalDyaRakam} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="dainikRokadBahithilJamaRakam" className="form-label">
                            दैनिक रोकड वहीतील जमा रक्कम{" "}
                          </Label>
                          <Input type="number" className="form-control" id="dainikRokadBahithilJamaRakam" value={formData.dainikRokadBahithilJamaRakam} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="prakritischiTapasni" className="form-label">
                            प्रक्रांतीचा तपशील{" "}
                          </Label>
                          <Input type="text" className="form-control" id="prakritischiTapasni" value={formData.prakritischiTapasni} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="year" className="form-label">
                            महिना
                          </Label>
                          <Input type="select" id="year" value={formData.year} onChange={handleInputChange}>
                            <option value="">महिना निवडा</option>
                            {months.map((month, index) => (
                              <option key={index} value={index + 1}>
                                {month}
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
                  {/* {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
                  {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}

                  <div className="col-lg-12">
                    <div className="d-flex justify-content-start button-container">
                      <Button color="success" onClick={handleSubmit}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSaveAndNew}>
                        जतन करून नवीन माहिती भरा
                      </Button>

                      <Button color="danger" onClick={() => (window.location.href = "/report17")}>
                        रद्द करा
                      </Button>
                      <Button color="primary" onClick={resetForm}>
                        रिसेट करा
                      </Button>
                    </div>
                  </div>

                  {/* 
                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
        <div className="text-start">
            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करा</Button>
            <Button color="success"  style={{ marginRight: '10px' }}>जतन करून नवीन माहिती भरा</Button>
            <Button color="danger" onClick={() => window.location.href = 'cancel_page.php'} style={{ marginRight: '10px' }}>रद्द करा</Button>
            <Button color="primary"  >रिसेट करा</Button>
        </div>
    </div> */}
                </CardBody>   
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Namuna17;
