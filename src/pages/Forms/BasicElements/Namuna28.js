import React, { useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

import "../BasicElements/style.css";

const Namuna28 = () => {
  document.title = "नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    gramPanchayatId: "",
    gramPanchayatName: "",
    employeeId: "",
    employeeName: "",
    sanMadhemagasvargiyansathiKeleliTartud: "",
    san: "",
    chaluMahinyatPraptaJhaleleUtpanna: "",
    fiftyTakkeKharchaKarychiRakkam: "",
    kharchachyaBabiYojanavar: "",
    magilMahinayatJhalelaKharcha: "",
    chaluMahinyatJhalelaKharcha: "",
    ekunKharch: "",
    kharchachiTakkevari: "",
    shera: "",
    month: "",
    year: "",
  });
  //---------------------------------------------------------------------

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [yearRanges, setYearRanges] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");

  const [dataList, setDataList] = useState([]);
  // Get session message on page load
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
  }, [dataList]);
  //Rest of the code is given below
  //-----------------------------------------------------------------------------------------
  const handleInputChangee = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [id]: value };
      //--------------------------------------------------------------------------------------
      // Check if the changed field is 'chaluMahinyatPraptaJhaleleUtpanna'
      //15% vla logic
      if (id === "chaluMahinyatPraptaJhaleleUtpanna") {
        const numeralType = detectNumeralType(value);
        const utpanna = parseFloat(numeralType === "marathi" ? toArabicc(value) : value);

        if (!isNaN(utpanna)) {
          const calculatedValue = (utpanna * 0.15).toFixed(2);
          // Convert calculated value back to the detected numeral type
          newData.fiftyTakkeKharchaKarychiRakkam = numeralType === "marathi" ? ToMarathiDigitsss(calculatedValue) : calculatedValue;
        } else {
          newData.fiftyTakkeKharchaKarychiRakkam = ""; // Clear if input is invalid
        }
      }

      return newData;

      //-------------------------------------------------------------------------------------------------
    });
  };
  //----------------------------------------------------------------------------------
  //Code Declaration for 15%
  // Helper functions
  const detectNumeralTypeee = (numString) => {
    if (/^[0-9]+$/.test(numString)) return "english";
    if (/^[०-९]+$/.test(numString)) return "marathi";
    return "english"; // Default to English if undetected
  };

  const ToMarathiDigitsss = (num) => {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num.toString().replace(/[0-9]/g, (digit) => marathiDigits[parseInt(digit)]);
  };

  // Helper function to convert Marathi digits to Arabic (for calculations)
  const toArabicc = (numString) => {
    const marathiToArabicDigits = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
    return numString.replace(/[०-९]/g, (digit) => marathiToArabicDigits[digit]);
  };

  //--------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // -----------------------------------------------------

  // //double year vla logic
  // Generate an array of the last 100 year ranges
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

  // --------------------------------------------------------------

  //Single Year Vla Logic
  // Function to convert Arabic digits to Marathi digits
  const arabicToMarathiDigitss = (num) => {
    const marathiDigitss = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((digit) => marathiDigitss[parseInt(digit)])
      .join("");
  };
  // Function to generate Single years in Marathi
  const SinglegenerateYear = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100; // Start 100 years back
    const years = [];
    for (let i = startYear; i <= currentYear; i++) {
      // Convert each year to Marathi digits
      const yearInMarathi = arabicToMarathiDigitss(i);
      years.push(yearInMarathi);
    }
    return years;
  };

  // ---------------------------------------------------------------------

  //month vla logic
  // Define month names in marathi
  const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
  //--------------------------------------------------------------------------

  //Ye Code hai addition of two fields in marathi, Emglish and hindi ke lea
  // Function to convert Marathi/Hindi digits to Arabic digits (0-9)
  const marathiHindiToArabic = (numString) => {
    const marathiHindiDigits = {
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
    return numString.replace(/[०-९]/g, (digit) => marathiHindiDigits[digit]);
  };
  //Addition of two fields in third field
  // Helper function to detect numeral type
  const detectNumeralType = (numString) => {
    if (/^[0-9]+$/.test(numString)) return "english";
    if (/^[०-९]+$/.test(numString)) return "marathi";
    if (/^[०-९]+$/.test(numString)) return "hindi";
    return "english"; // Default to English if undetected
  };

  // Function to convert Marathi/Hindi digits to Arabic
  const toArabic = (numString) => {
    const digitsMap = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
    return numString.replace(/[०-९]/g, (digit) => digitsMap[digit]);
  };

  // Function to convert Arabic digits to Marathi/Hindi
  const fromArabic = (num, numeralType) => {
    const marathiHindiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return numeralType === "english" ? num.toString() : num.toString().replace(/[0-9]/g, (digit) => marathiHindiDigits[parseInt(digit)]);
  };

  // Main useEffect to calculate and format `ekunKharch`
  useEffect(() => {
    const { magilMahinayatJhalelaKharcha, chaluMahinyatJhalelaKharcha } = formData;

    // Determine numeral type based on input format
    const numeralType = detectNumeralType(magilMahinayatJhalelaKharcha || chaluMahinyatJhalelaKharcha || "0");

    // Convert inputs to Arabic for addition
    const magilExpense = parseFloat(toArabic(magilMahinayatJhalelaKharcha || "0"));
    const chaluExpense = parseFloat(toArabic(chaluMahinyatJhalelaKharcha || "0"));
    const totalExpense = magilExpense + chaluExpense;

    // Convert totalExpense back to original numeral type
    const formattedTotal = totalExpense === 0 ? "" : fromArabic(totalExpense, numeralType);

    // Set `ekunKharch` in the correct format
    setFormData((prevState) => ({
      ...prevState,
      ekunKharch: formattedTotal,
    }));
  }, [formData.magilMahinayatJhalelaKharcha, formData.chaluMahinyatJhalelaKharcha]);
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleSubmit = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        // If no token found, log out and redirect to the login page
        const errorMessage = "आपले सत्र समाप्त झाले आहे. कृपया पुन्हा लॉगिन करा.";
        sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
        navigate("/login"); // Redirect to login page
        return;
      }

      // Log the form data and token for debugging
      console.log("Submitting form with data:", formData);
      console.log("Authorization token:", token);

      // Make the API call with the token in the headers
      const response = await axios.post("http://localhost:8080/masikvivaran/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      // Log the response for debugging
      console.log("Response from API:", response);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store success message

      // Navigate to the report page
      navigate("/नमुना-२८-अहवाल");
    } catch (error) {
      // Log the error for debugging
      console.error("Error during submit:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Store the error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------

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
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      sanMadhemagasvargiyansathiKeleliTartud: "",
      san: "",
      chaluMahinyatPraptaJhaleleUtpanna: "",
      fiftyTakkeKharchaKarychiRakkam: "",
      kharchachyaBabiYojanavar: "",
      magilMahinayatJhalelaKharcha: "",
      chaluMahinyatJhalelaKharcha: "",
      ekunKharch: "",
      kharchachiTakkevari: "",
      shera: "",
      month: "",
      year: "",
    });
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is missing!");
      setErrorMessage("Token is missing. Please log in again.");
      setSuccessMessage(""); // Clear any success messages
      return;
    }

    // Log the token (for debugging purposes)
    console.log("Using token:", token);

    const requiredFields = [
      "sanMadhemagasvargiyansathiKeleliTartud",
      "san",
      "chaluMahinyatPraptaJhaleleUtpanna",
      "fiftyTakkeKharchaKarychiRakkam",
      "kharchachyaBabiYojanavar",
      "magilMahinayatJhalelaKharcha",
      "chaluMahinyatJhalelaKharcha",
      "ekunKharch",
      "kharchachiTakkevari",
      "shera",
      "month",
      "year",
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
      // Sending the data to the backend with token in the headers
      const response = await axios.post("http://localhost:8080/masikvivaran/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to the header
        },
      });

      // Handle successful response
      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Clear all form fields after success
      setFormData({
        // id: "",
        // gramPanchayatId: "",
        // gramPanchayatName: "",
        // employeeId: "",
        // employeeName: "",
        sanMadhemagasvargiyansathiKeleliTartud: "",
        san: "",
        chaluMahinyatPraptaJhaleleUtpanna: "",
        fiftyTakkeKharchaKarychiRakkam: "",
        kharchachyaBabiYojanavar: "",
        magilMahinayatJhalelaKharcha: "",
        chaluMahinyatJhalelaKharcha: "",
        ekunKharch: "",
        kharchachiTakkevari: "",
        shera: "",
        month: "",
        year: "",
      });
    } catch (error) {
      // Handle error response
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [successMessage]);

  const breadcrumbTitle = "नमुना २८ मासिक विवरण नोंदवही"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२८ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२८-अहवाल", // Path
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 71%;
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
                <PreviewCardHeader title="नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२८-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sanMadhemagasvargiyansathiKeleliTartud" className="form-label">
                            सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="sanMadhemagasvargiyansathiKeleliTartud"
                            value={formData.sanMadhemagasvargiyansathiKeleliTartud}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="san" className="form-label">
                            सन
                          </Label>
                          {/* <Input type="text" className="form-control" id="san" value={formData.san} onChange={handleInputChange} /> */}
                          <Input type="select" id="san" value={formData.san} onChange={handleInputChange}>
                            {SinglegenerateYear().map((san) => (
                              <option key={san} value={san}>
                                {san}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="chaluMahinyatPraptaJhaleleUtpanna" className="form-label">
                            चालू महिन्यात प्राप्त झालेले उत्पन्न
                          </Label>
                          <Input type="text" className="form-control" id="chaluMahinyatPraptaJhaleleUtpanna" value={formData.chaluMahinyatPraptaJhaleleUtpanna} onChange={handleInputChangee} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="fiftyTakkeKharchaKarychiRakkam" className="form-label">
                            १५ टक्के खर्च करावयाची रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="fiftyTakkeKharchaKarychiRakkam" value={formData.fiftyTakkeKharchaKarychiRakkam} readOnly />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchachyaBabiYojanavar" className="form-label">
                            खर्चाच्या बाबी बाबवार / योजनावार
                          </Label>
                          <Input type="text" className="form-control" id="kharchachyaBabiYojanavar" value={formData.kharchachyaBabiYojanavar} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magilMahinayatJhalelaKharcha" className="form-label">
                            मागील महिन्यात झालेला खर्च{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magilMahinayatJhalelaKharcha" value={formData.magilMahinayatJhalelaKharcha} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="chaluMahinyatJhalelaKharcha" className="form-label">
                            चालू महिन्यात झालेला खर्च
                          </Label>
                          <Input type="text" className="form-control" id="chaluMahinyatJhalelaKharcha" value={formData.chaluMahinyatJhalelaKharcha} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <Label htmlFor="ekunKharch" className="form-label">
                          एकूण खर्च
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="ekunKharch"
                          value={formData.ekunKharch}
                          disabled // Make it read-only since it will be calculated
                        />
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchachiTakkevari" className="form-label">
                            खर्चाची टक्केवारी
                          </Label>
                          <Input type="text" className="form-control" id="kharchachiTakkevari" value={formData.kharchachiTakkevari} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="month" className="form-label">
                            महिना
                          </Label>
                          <Input type="select" className="form-control" id="month" value={formData.month} onChange={handleInputChange}>
                            <option value="">महिना निवडा</option>
                            {months.map((month, index) => (
                              <option key={index} value={month}>
                                {month}
                              </option>
                            ))}
                          </Input>
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
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="primary" onClick={() => navigate("/नमुना-२८-अहवाल")}>
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

export default Namuna28;
