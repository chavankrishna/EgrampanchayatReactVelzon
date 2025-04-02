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

const Form21 = () => {
  document.title = "नमुना २१ - मोजमाप वही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Common Fields
    id: "",
    employeeId: "",
    employeeName: "",
    grampanchayatId: "",
    grampanchayatName: "",
    createdDate: "",
    updatedDate: "",
    remark: "",
    year: "",

    // MojmaapWahi Fields
    kamachePratyakshaMojmap: "",
    kamkarnayaAgencyAbhikanacheNaaw: "",
    kamacheWarnan: "",
    mojmap: "",
    kamacheWarnanKamacheUpashirshVaKshetracheAdhikari: "",
    mojmapachaTapshilPariman: "",
    mojmapachaTapshilLaambi: "",
    mojmapachaTapshilRundi: "",
    mojmapachaTapshilKholiUnchi: "",
    mojmapachaTapshilEkun: "",
    ekunParimanMaapPurvicheHajeriPramaneWarnanKarave: "",
    ekunMojmapachaTapshilEkunVaEkunParimanMaap: "", // New field for the sum
    dar: "",
    rakkam: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? parseFloat(value) : 0; // Convert value to float for calculations

    // Update formData state
    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: value };

      // Check if any of the three fields for multiplication have changed
      if (id === "mojmapachaTapshilLaambi" || id === "mojmapachaTapshilRundi" || id === "mojmapachaTapshilKholiUnchi") {
        // Multiply the fields if all are numbers
        const laambi = parseFloat(newFormData.mojmapachaTapshilLaambi) || 0;
        const rundi = parseFloat(newFormData.mojmapachaTapshilRundi) || 0;
        const kholiUnchi = parseFloat(newFormData.mojmapachaTapshilKholiUnchi) || 0;

        const result = laambi * rundi * kholiUnchi;
        newFormData.mojmapachaTapshilEkun = result.toString(); // Update the result to 'mojmapachaTapshilEkun'
      }

      // Addition of 'mojmapachaTapshilEkun' and 'ekunParimanMaapPurvicheHajeriPramaneWarnanKarave'
      const mojmapachaTapshilEkun = parseFloat(newFormData.mojmapachaTapshilEkun) || 0;
      const ekunParimanMaapPurvicheHajeriPramaneWarnanKarave = parseFloat(newFormData.ekunParimanMaapPurvicheHajeriPramaneWarnanKarave) || 0;

      const sum = mojmapachaTapshilEkun + ekunParimanMaapPurvicheHajeriPramaneWarnanKarave;
      newFormData.ekunMojmapachaTapshilEkunVaEkunParimanMaap = sum.toString(); // Update the sum to 'ekunMojmapachaTapshilEkunVaEkunParimanMaap'

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
      "remark",
      "year",
      "kamachePratyakshaMojmap",
      "kamkarnayaAgencyAbhikanacheNaaw",
      "kamacheWarnan",
      "mojmap",
      "kamacheWarnanKamacheUpashirshVaKshetracheAdhikari",
      "mojmapachaTapshilPariman",
      "mojmapachaTapshilLaambi",
      "mojmapachaTapshilRundi",
      "mojmapachaTapshilKholiUnchi",
      "mojmapachaTapshilEkun",
      "ekunParimanMaapPurvicheHajeriPramaneWarnanKarave",
      "ekunMojmapachaTapshilEkunVaEkunParimanMaap",
      "dar",
      "rakkam",
    ];

    const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== "");

    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return; // Stop submission if any required field is empty
    }

    try {
      const response = await axios.post("http://localhost:8080/mojmaapWahi/create", formData, { headers: { "Content-Type": "application/json" } });
      console.log("Response:", response.data);
      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      navigate("/report-details");
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
      // Common Fields
      id: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      createdDate: "",
      updatedDate: "",
      remark: "",
      year: "",

      // MojmaapWahi Fields
      kamachePratyakshaMojmap: "",
      kamkarnayaAgencyAbhikanacheNaaw: "",
      kamacheWarnan: "",
      mojmap: "",
      kamacheWarnanKamacheUpashirshVaKshetracheAdhikari: "",
      mojmapachaTapshilPariman: "",
      mojmapachaTapshilLaambi: "",
      mojmapachaTapshilRundi: "",
      mojmapachaTapshilKholiUnchi: "",
      mojmapachaTapshilEkun: "",
      ekunParimanMaapPurvicheHajeriPramaneWarnanKarave: "",
      ekunMojmapachaTapshilEkunVaEkunParimanMaap: "",
      dar: "",
      rakkam: "",
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
          <BreadCrumb title="नमुना २१ - मोजमाप वही" pageTitle="फॉर्म" className="custom-breadcrumb" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">मोजमाप वही - नवीन माहिती भरा</h4>
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
                        <Label htmlFor="kamachePratyakshaMojmap" className="form-label">
                          कामाचे प्रत्यक्ष मोजमाप
                        </Label>
                        <Input type="text" className="form-control" id="kamachePratyakshaMojmap" value={formData.kamachePratyakshaMojmap} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kamkarnayaAgencyAbhikanacheNaaw" className="form-label">
                          काम करणाऱ्या अभिकरणाचे नाव
                        </Label>
                        <Input type="text" className="form-control" id="kamkarnayaAgencyAbhikanacheNaaw" value={formData.kamkarnayaAgencyAbhikanacheNaaw} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kamacheWarnan" className="form-label">
                          कामाचे वर्णन
                        </Label>
                        <Input type="text" className="form-control" id="kamacheWarnan" value={formData.kamacheWarnan} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmap" className="form-label">
                          मोजमाप
                        </Label>
                        <Input type="text" className="form-control" id="mojmap" value={formData.mojmap} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kamacheWarnanKamacheUpashirshVaKshetracheAdhikari" className="form-label">
                          कामाचे उपशीर्ष व क्षेत्राचे अधिकारी
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="kamacheWarnanKamacheUpashirshVaKshetracheAdhikari"
                          value={formData.kamacheWarnanKamacheUpashirshVaKshetracheAdhikari}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmapachaTapshilPariman" className="form-label">
                          मोजमापाचा तपशील (परिमाण)
                        </Label>
                        <Input type="text" className="form-control" id="mojmapachaTapshilPariman" value={formData.mojmapachaTapshilPariman} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmapachaTapshilLaambi" className="form-label">
                          मोजमापाचा तपशील (लांबी)
                        </Label>
                        <Input type="text" className="form-control" id="mojmapachaTapshilLaambi" value={formData.mojmapachaTapshilLaambi} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmapachaTapshilRundi" className="form-label">
                          मोजमापाचा तपशील (रुंदी)
                        </Label>
                        <Input type="text" className="form-control" id="mojmapachaTapshilRundi" value={formData.mojmapachaTapshilRundi} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmapachaTapshilKholiUnchi" className="form-label">
                          मोजमापाचा तपशील (खोली/उंची)
                        </Label>
                        <Input type="text" className="form-control" id="mojmapachaTapshilKholiUnchi" value={formData.mojmapachaTapshilKholiUnchi} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mojmapachaTapshilEkun" className="form-label">
                          मोजमापाचा तपशील (एकूण)
                        </Label>
                        <Input type="text" className="form-control" id="mojmapachaTapshilEkun" value={formData.mojmapachaTapshilEkun} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="ekunParimanMaapPurvicheHajeriPramaneWarnanKarave" className="form-label">
                          एकूण परिमाण (पूर्वीच्या हजेरीप्रमाणे)
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="ekunParimanMaapPurvicheHajeriPramaneWarnanKarave"
                          value={formData.ekunParimanMaapPurvicheHajeriPramaneWarnanKarave}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="ekunMojmapachaTapshilEkunVaEkunParimanMaap" className="form-label">
                          एकूण मोजमापाचा तपशील
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="ekunMojmapachaTapshilEkunVaEkunParimanMaap"
                          value={formData.ekunMojmapachaTapshilEkunVaEkunParimanMaap}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="dar" className="form-label">
                          दर
                        </Label>
                        <Input type="text" className="form-control" id="dar" value={formData.dar} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="rakkam" className="form-label">
                          रक्कम
                        </Label>
                        <Input type="text" className="form-control" id="rakkam" value={formData.rakkam} onChange={handleInputChange} />
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
                        <Label htmlFor="remark" className="form-label">
                          शेरा
                        </Label>
                        <textarea
                          className="form-control"
                          id="remark"
                          value={formData.remark}
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

export default Form21;
