import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "./Config 01"; // Import session management functions

const Form24 = () => {
  document.title = "नमुना २४ - जमिनीची नोंद वही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Common Fields
    id: "",
    // employeeId: "",
    // employeeName: "",
    // grampanchayatId: "",
    // grampanchayatName: "",
    createdDate: "",
    updatedDate: "",
    shera: "",
    year: "",

    hastantaritKharidiKinwaSampaditKelyachiTarikh: "",
    konatyaKarnasaathi: "",
    konakadun: "",
    kararnamaNiwadaNirdeshank: "",
    jaminicheKshetraphal: "",
    bhumapanKramankEtyadi: "",
    aakarni: "",
    jaminichyaSeema: "",
    jaminisahKharediSampadanEmarati: "",
    jaminichiWaEmartichiWilhewat: "",
    vikriPaasunMilaleliRakkam: "",
    pramanakachaKramankWaDinank: "",
    malmattechiWilhewatPanchayatichaTharav: "",
    malmattechiWilhewatKalam55: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? parseFloat(value) : 0; // Convert value to float for calculations

    // Update formData state
    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: value };

      return newFormData;
    });
  };   
  
  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error

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

  const handleSubmit = async () => {
    console.log("Sending data:", formData);

    const requiredFields = [
      "hastantaritKharidiKinwaSampaditKelyachiTarikh",
      "konatyaKarnasaathi",
      "konakadun",
      "kararnamaNiwadaNirdeshank",
      "jaminicheKshetraphal",
      "bhumapanKramankEtyadi",
      "aakarni",
      "jaminichyaSeema",
      "jaminisahKharediSampadanEmarati",
      "jaminichiWaEmartichiWilhewat",
      "vikriPaasunMilaleliRakkam",
      "pramanakachaKramankWaDinank",
      "malmattechiWilhewatPanchayatichaTharav",
      "malmattechiWilhewatKalam55",
      "shera",
      "shera",
    ];

    const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== "");

    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return; // Stop submission if any required field is empty
    }

    try {
      const response = await axios.post("http://localhost:8080/jaminichiNondWahi/create", formData, { headers: { "Content-Type": "application/json" } });
      console.log("Response:", response.data);
      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      navigate("/report-details-24");
    } catch (error) {
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

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );

  const handleReset = () => {
    setFormData({
      id: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      createdDate: "",
      updatedDate: "",
      shera: "",
      year: "",

      hastantaritKharidiKinwaSampaditKelyachiTarikh: "",
      konatyaKarnasaathi: "",
      konakadun: "",
      kararnamaNiwadaNirdeshank: "",
      jaminicheKshetraphal: "",
      bhumapanKramankEtyadi: "",
      aakarni: "",
      jaminichyaSeema: "",
      jaminisahKharediSampadanEmarati: "",
      jaminichiWaEmartichiWilhewat: "",
      vikriPaasunMilaleliRakkam: "",
      pramanakachaKramankWaDinank: "",
      malmattechiWilhewatPanchayatichaTharav: "",
      malmattechiWilhewatKalam55: "",
    });
  };

  const handleSaveAndAddNew = () => {
    handleSubmit();
    handleReset();
  };

  const currentYear = new Date().getFullYear(); // Get the current year
  // Define a function to convert numbers to Marathi (if not already defined)
  const toMarathiNumber = (number) => {
    const marathiNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return String(number)
      .split("")
      .map((digit) => marathiNumbers[digit])
      .join("");
  };
  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year1 = toMarathiNumber(currentYear - i);
    const year2 = toMarathiNumber(currentYear - i + 1);
    return `${year1} - ${year2}`; // Template literals should be enclosed in backticks
  });

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="नमुना २४ - जमिनीची नोंद वही" pageTitle="फॉर्म" className="custom-breadcrumb" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">जमिनीची नोंद वही - नवीन माहिती भरा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Row className="gy-4">
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="hastantaritKharidiKinwaSampaditKelyachiTarikh" className="form-label">
                          हस्तांतरित खरेदी केल्याची तारीख
                        </Label>
                        <Input
                          type="date"
                          className="form-control"
                          id="hastantaritKharidiKinwaSampaditKelyachiTarikh"
                          value={formData.hastantaritKharidiKinwaSampaditKelyachiTarikh}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>    
                      <div>
                        <Label htmlFor="konatyaKarnasaathi" className="form-label">
                          कोणत्या कारणासाठी
                        </Label>
                        <Input type="text" className="form-control" id="konatyaKarnasaathi" value={formData.konatyaKarnasaathi} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="konakadun" className="form-label">
                          कोणाकडून
                        </Label>
                        <Input type="text" className="form-control" id="konakadun" value={formData.konakadun} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kararnamaNiwadaNirdeshank" className="form-label">
                          करारनामा/निवड आदेश क्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="kararnamaNiwadaNirdeshank" value={formData.kararnamaNiwadaNirdeshank} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="jaminicheKshetraphal" className="form-label">
                          जमिनीचे क्षेत्रफळ
                        </Label>
                        <Input type="text" className="form-control" id="jaminicheKshetraphal" value={formData.jaminicheKshetraphal} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="bhumapanKramankEtyadi" className="form-label">
                          भू मापन क्रमांक इत्यादी
                        </Label>
                        <Input type="text" className="form-control" id="bhumapanKramankEtyadi" value={formData.bhumapanKramankEtyadi} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="aakarni" className="form-label">
                          आकारणी
                        </Label>
                        <Input type="text" className="form-control" id="aakarni" value={formData.aakarni} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="jaminichyaSeema" className="form-label">
                          जमिनीच्या सीमा
                        </Label>
                        <Input type="text" className="form-control" id="jaminichyaSeema" value={formData.jaminichyaSeema} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="jaminisahKharediSampadanEmarati" className="form-label">
                          जमिनी सह खरेदी/संपादन (इमारती)
                        </Label>
                        <Input type="text" className="form-control" id="jaminisahKharediSampadanEmarati" value={formData.jaminisahKharediSampadanEmarati} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="jaminichiWaEmartichiWilhewat" className="form-label">
                          जमिनीची व इमारतीची विल्हेवाट
                        </Label>
                        <Input type="text" className="form-control" id="jaminichiWaEmartichiWilhewat" value={formData.jaminichiWaEmartichiWilhewat} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="vikriPaasunMilaleliRakkam" className="form-label">
                          विक्रीपासून मिळालेली रक्कम
                        </Label>
                        <Input type="text" className="form-control" id="vikriPaasunMilaleliRakkam" value={formData.vikriPaasunMilaleliRakkam} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="pramanakachaKramankWaDinank" className="form-label">
                          प्रमाणाचं क्रमांक व दिनांक
                        </Label>
                        <Input type="text" className="form-control" id="pramanakachaKramankWaDinank" value={formData.pramanakachaKramankWaDinank} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="malmattechiWilhewatPanchayatichaTharav" className="form-label">
                          मालमत्तेची विल्हेवाट पंचायतीचा ठराव
                        </Label>
                        <Input type="text" className="form-control" id="malmattechiWilhewatPanchayatichaTharav" value={formData.malmattechiWilhewatPanchayatichaTharav} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="malmattechiWilhewatKalam55" className="form-label">
                          मालमत्तेची विल्हेवाट (कलम ५५)
                        </Label>
                        <Input type="text" className="form-control" id="malmattechiWilhewatKalam55" value={formData.malmattechiWilhewatKalam55} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="year" className="form-label">
                          वर्ष
                        </Label>
                        <Input type="select" className="form-control" id="year" value={formData.year} onChange={handleInputChange}>
                          <option value="">वर्ष निवडा</option>
                          {yearOptions.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </Input>
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

                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा 
                      </Button>   
                      <Button color="success" onClick={handleSaveAndAddNew} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा 
                      </Button> 
                      <Button color="danger" onClick={() => (window.location.href = "/form-details")} style={{ marginRight: "10px" }}>
                        रद्द करा 
                      </Button> 
                      <Button color="primary" onClick={handleReset}>
                        रिसेट करा
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

export default Form24;
