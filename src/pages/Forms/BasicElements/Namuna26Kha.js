import React, { useState, useEffect } from "react";
import { Input, Button, Table, Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Namuna26Kha = () => {
  document.title = "नमुना २६ - मासिक खर्चाचे विवरण";
  const navigate = useNavigate();

  // Define month names
  const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

  const [formData, setFormData] = useState({
    grampanchyatId: "",
    grampanchyatName: "",
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

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");

  const [dataList, setDataList] = useState([]);

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
    // Generate Year Range List in Marathi
    const currentYear = new Date().getFullYear();
    const ranges = Array.from({ length: 100 }, (_, i) => {
      const startYear = currentYear - i;
      const endYear = startYear + 1;
      const startYearInMarathi = arabicToMarathiDigits(startYear);
      const endYearInMarathi = arabicToMarathiDigits(endYear);
      return `${startYearInMarathi} - ${endYearInMarathi}`;
    });
    setYearRanges(ranges);
  }, [dataList]);

  // Arabic to Marathi digits conversion function
  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

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
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

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
      (field) => formData[field]?.trim() !== "" // Check if fields are non-empty
    );

    if (!isFormValid) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      return;
    }

    try {
      // Retrieve token
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");

      // Log the token for debugging
      console.log("Retrieved Token:", token);

      const response = await axios.post("http://localhost:8080/api/grampanchayatKhaa26/add", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Clear all fields after success
      setFormData({
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
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      // Log the error response for debugging
      console.error("Error Response:", error.response);

      sessionStorage.setItem("sessionMessage", errorMessage); // Save error message in sessionStorage
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleSubmit = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      console.log("Sending data:", formData);

      // Send the POST request with token authorization
      const response = await axios.post("http://localhost:8080/api/grampanchayatKhaa26/add", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      console.log("Response received:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      // Navigate to the report page
      navigate("/नमुना-२६-ख-अहवाल");
    } catch (error) {
      console.error("Error during submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setFormData({
      grampanchyatId: "",
      grampanchyatName: "",
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

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [successMessage]);
  const breadcrumbTitle = "नमुना २६ख मासिक खर्चाचे विवरण"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२६ख "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२६-ख-अहवाल", // Path
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 70%;
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
                <PreviewCardHeader title="नमुना २६ - मासिक खर्चाचे विवरण" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२६-ख-अहवाल")} />
                <CardBody className="card-body">
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
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
                            महिना अखेरची बँकेतील शिल्लक
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
                            अल्पबचत प्रमाणपत्रात गुंतवलेली रक्कम
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
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="primary" onClick={() => navigate("/नमुना-२६-ख-अहवाल")}>
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

export default Namuna26Kha;
