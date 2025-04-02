import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

// Define month names
const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
//---------------------------------------------------------------------------------------

const Update26Kha = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {}); // state is used as the initial value for formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Id :", formData.id);

  useEffect(() => {
    if (!state && formData.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080"/api/grampanchayatKhaa26"/getById/${formData.id}`);
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, formData.id]);

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? value : "";

    //Addition of of 4 fields in 5th one
    // Helper function to detect Marathi numerals
    const isMarathiInput = (text) => /^[\u0966-\u096F]+$/.test(text);

    // Helper function to convert Marathi numerals to English
    const convertToEnglish = (marathiNum) => {
      const marathiToEnglishMap = {
        "०": "0",
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
      };
      return marathiNum.replace(/[\u0966-\u096F]/g, (m) => marathiToEnglishMap[m]);
    };

    // Helper function to convert English numerals to Marathi
    const convertToMarathi = (num) => {
      const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return String(num)
        .split("")
        .map((digit) => (/\d/.test(digit) ? marathiDigits[digit] : digit))
        .join("");
    };

    // Update formData state with parsed values for calculations
    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: value };

      // Check each field, convert to English if in Marathi for calculation
      const mahinaAakhrichiShillakBanketila =
        parseFloat(isMarathiInput(newFormData.mahinaAakhrichiShillakBanketila) ? convertToEnglish(newFormData.mahinaAakhrichiShillakBanketila) : newFormData.mahinaAakhrichiShillakBanketila) || 0;
      const mahinaAakhrichiShillakPostateil =
        parseFloat(isMarathiInput(newFormData.mahinaAakhrichiShillakPostateil) ? convertToEnglish(newFormData.mahinaAakhrichiShillakPostateil) : newFormData.mahinaAakhrichiShillakPostateil) || 0;
      const alpabachatPramanapatrataGuntviloliRakam =
        parseFloat(
          isMarathiInput(newFormData.alpabachatPramanapatrataGuntviloliRakam)
            ? convertToEnglish(newFormData.alpabachatPramanapatrataGuntviloliRakam)
            : newFormData.alpabachatPramanapatrataGuntviloliRakam
        ) || 0;
      const banketaMudataThevitaGuntavililiRakam =
        parseFloat(
          isMarathiInput(newFormData.banketaMudataThevitaGuntavililiRakam) ? convertToEnglish(newFormData.banketaMudataThevitaGuntavililiRakam) : newFormData.banketaMudataThevitaGuntavililiRakam
        ) || 0;

      // Calculate the sum
      const sum = mahinaAakhrichiShillakBanketila + mahinaAakhrichiShillakPostateil + alpabachatPramanapatrataGuntviloliRakam + banketaMudataThevitaGuntavililiRakam;

      // Detect if all inputs are in Marathi or English, then set total accordingly
      const allInMarathi =
        isMarathiInput(newFormData.mahinaAakhrichiShillakBanketila) ||
        isMarathiInput(newFormData.mahinaAakhrichiShillakPostateil) ||
        isMarathiInput(newFormData.alpabachatPramanapatrataGuntviloliRakam) ||
        isMarathiInput(newFormData.banketaMudataThevitaGuntavililiRakam);

      newFormData.ekun = allInMarathi ? convertToMarathi(sum) : sum.toString();

      return newFormData;
    });

    //-----------------------------------------------------------------------------------
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "mahina",
      "praarabhitShillak",
      "rakamJamaKileyachaMahina",
      "mahinaAakhrichiShillakSachivakdila",
      "mahinaAakhrichiShillakBanketila",
      "mahinaAakhrichiShillakPostateil",
      "alpabachatPramanapatrataGuntviloliRakam",
      "banketaMudataThevitaGuntavililiRakam",
      "ekun",
      "shera",
    ];

    // Validate required fields
    const isFormValid = requiredFields.every(
      (field) => formData[field]?.trim() !== "" // Ensure fields are non-empty
    );

    if (!isFormValid) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा.";
      setErrorMessage(errorMessage);
      setSuccessMessage("");
      setLoading(false);
      return;
    }

    try {
      // Retrieve token for authentication (if needed)
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");

      // Log formData for debugging
      console.log("Sending formData:", formData);

      const response = await axios.post(`http://localhost:8080/api/grampanchayatKhaa26/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if required
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");

      // Log response for debugging
      console.log("Response:", response.data);

      navigate("/नमुना-२६-ख-अहवाल");
    } catch (err) {
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }

      // Log error for debugging
      console.error("Error:", err.response || err);

      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };

  const handleReset = () => {
    setFormData({
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      mahina: "",
      praarabhitShillak: "",
      rakamJamaKileyachaMahina: "",
      mahinaAakhrichiShillakSachivakdila: "",
      mahinaAakhrichiShillakBanketila: "",
      mahinaAakhrichiShillakPostateil: "",
      alpabachatPramanapatrataGuntviloliRakam: "",
      banketaMudataThevitaGuntavililiRakam: "",
      ekun: "",
      shera: "",
    });
  };
  const breadcrumbTitle = "मासिक खर्चाचे विवरण - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२६ख "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२६-ख-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 69%;
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
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">मासिक खर्चाचे विवरण</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate("/नमुना-२६-ख-अहवाल")}>
                          <i className="bx bx-arrow-back"></i>मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="gy-4">
                    {[].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
                          {field.type === "select" ? (
                            <Input type="select" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange}>
                              {field.options.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Input>
                          ) : (
                            <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                          )}
                        </div>
                      </Col>
                    ))}

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="mahina" className="form-label">
                          महिना
                        </Label>
                        <Input type="select" id="mahina" value={formData.mahina} onChange={handleInputChange}>
                          <option value="">महिना निवडा</option>
                          {months.map((mahina, index) => (
                            <option key={index} value={mahina}>
                              {mahina}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="praarabhitShillak" className="form-label">
                          प्रारंभिक शिल्लक
                        </Label>
                        <Input type="text" className="form-control" id="praarabhitShillak" value={formData.praarabhitShillak} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="rakamJamaKileyachaMahina" className="form-label">
                          रक्कम जमा केल्याचा महिना
                        </Label>
                        <Input type="select" className="form-control" id="rakamJamaKileyachaMahina" value={formData.rakamJamaKileyachaMahina} onChange={handleInputChange}>
                          <option value="">महिना निवडा</option>
                          {months.map((rakamJamaKileyachaMahina, index) => (
                            <option key={index} value={rakamJamaKileyachaMahina}>
                              {rakamJamaKileyachaMahina}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="mahinaAakhrichiShillakSachivakdila" className="form-label">
                          रक्कम
                        </Label>
                        <Input type="text" className="form-control" id="mahinaAakhrichiShillakSachivakdila" value={formData.mahinaAakhrichiShillakSachivakdila} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="mahinaAakhrichiShillakBanketila" className="form-label">
                          महिना अखेरची बँकेतील रक्कम
                        </Label>
                        <Input type="text" className="form-control" id="mahinaAakhrichiShillakBanketila" value={formData.mahinaAakhrichiShillakBanketila} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="mahinaAakhrichiShillakPostateil" className="form-label">
                          महिना अखेरची पोस्टातील शिल्लक
                        </Label>
                        <Input type="text" className="form-control" id="mahinaAakhrichiShillakPostateil" value={formData.mahinaAakhrichiShillakPostateil} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="alpabachatPramanapatrataGuntviloliRakam" className="form-label">
                          अल्पबचतीत गुंतवलेली रक्कम
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="alpabachatPramanapatrataGuntviloliRakam"
                          value={formData.alpabachatPramanapatrataGuntviloliRakam}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="banketaMudataThevitaGuntavililiRakam" className="form-label">
                          बँकेत मुदत ठेवीत गुंतवलेली रक्कम
                        </Label>
                        <Input type="text" className="form-control" id="banketaMudataThevitaGuntavililiRakam" value={formData.banketaMudataThevitaGuntavililiRakam} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
                      <div>
                        <Label htmlFor="ekun" className="form-label">
                          एकूण
                        </Label>
                        <Input type="text" className="form-control" id="ekun" value={formData.ekun} onChange={handleInputChange} />
                      </div>
                    </Col>

                    <Col xxl={3} md={4}>
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
                  {/* <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२६-ख-अहवाल")} style={{ marginLeft: "10px" }}>
                      रद्द करा
                    </Button>
                    <Button color="primary" onClick={handleReset} style={{ marginLeft: "10px" }}>
                      रिसेट करा
                    </Button>
                  </div> */}
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२६-ख-अहवाल")}>
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

export default Update26Kha;
