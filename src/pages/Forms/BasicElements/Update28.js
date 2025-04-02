import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

//------------------------------------------------------------------------------------------------------------------------------------//
// Utility function to normalize Marathi digits to English digits
const normalizeDigitsToEnglish = (input) => {
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

  return input.replace(/[०-९]/g, (digit) => marathiToEnglishMap[digit]);
};

// Utility function to convert English digits to Marathi digits
const convertDigitsToMarathi = (input) => {
  const englishToMarathiMap = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };

  return input.replace(/[0-9]/g, (digit) => englishToMarathiMap[digit]);
};
//-------------------------------------------------------------------------------------------------------------------------------//

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
//----------------------------------------------------------------------------------------
//month vla logic
// Define month names in marathi
const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
//-------------------------------------------------------------------------------------------

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
//-------------------------------------------------------------------

const Update28 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dataList, setDataList] = useState([]);
  console.log("Id :", formData.id);

  useEffect(() => {
    if (!state && formData.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/masikvivaran/getById/${formData.id}`);
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
    const newValue = value || "";

    setFormData((prevState) => {
      // Start with the updated state
      const updatedFormData = { ...prevState, [id]: newValue };

      // 1. Handle "magilMahinayatJhalelaKharcha" and "chaluMahinyatJhalelaKharcha"
      if (id === "magilMahinayatJhalelaKharcha" || id === "chaluMahinyatJhalelaKharcha") {
        const isMarathi = /[०-९]/.test(value); // Detect if Marathi
        const lastMonthExpense = parseFloat(normalizeDigitsToEnglish(updatedFormData.magilMahinayatJhalelaKharcha) || "0");
        const currentMonthExpense = parseFloat(normalizeDigitsToEnglish(updatedFormData.chaluMahinyatJhalelaKharcha) || "0");

        // Perform addition
        const totalExpense = (lastMonthExpense + currentMonthExpense).toFixed(2);

        // Set ekunKharch based on input type
        updatedFormData.ekunKharch = isMarathi ? convertDigitsToMarathi(totalExpense) : totalExpense;
      }

      // 2. Handle "चालू महिन्यात प्राप्त झालेले उत्पन्न" (chaluMahinyatPraptaJhaleleUtpanna)
      if (id === "chaluMahinyatPraptaJhaleleUtpanna") {
        const isMarathi = /[०-९]/.test(value); // Detect if Marathi
        const normalizedValue = normalizeDigitsToEnglish(value); // Convert to English digits
        const income = parseFloat(normalizedValue) || 0; // Convert to number or default to 0
        const calculatedValue = (income * 0.15).toFixed(2); // Calculate 15%

        // Set fiftyTakkeKharchaKarychiRakkam based on input type
        updatedFormData.fiftyTakkeKharchaKarychiRakkam = isMarathi ? convertDigitsToMarathi(calculatedValue) : calculatedValue;
      }

      return updatedFormData; // Return the final updated state
    });
    //------------------------------------------------------------------------------------------------------------------------------------
  };

  //----------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
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
      setLoading(false);
      return;
    }

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token is missing. User is not authenticated.");
        return; // Exit the function if no token is found
      }

      console.log("Token found:", token); // Log the token for debugging purposes

      // Log the request data
      console.log("Sending update request with data:", formData);

      // Make the API request to update data
      const response = await axios.post(`http://localhost:8080/masikvivaran/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Log the successful response
      console.log("Response:", response.data);

      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-२८-अहवाल");
    } catch (err) {
      console.error("Error updating data:", err); // Log the error for debugging

      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
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

  const breadcrumbTitle = " मासिक विवरण नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२८ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२८-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
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
                <CardBody>
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">जमा रकमांची नोंदवही- अद्यतन करा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
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
                          {field.type === "dropdown" ? (
                            <Input type="select" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange}>
                              {field.options.map((option, i) => (
                                <option key={i} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                          ) : (
                            <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                          )}
                        </div>
                      </Col>
                    ))}
                    {/* //----------------------------------------------------------------------- */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sanMadhemagasvargiyansathiKeleliTartud" className="form-label">
                          सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद
                        </Label>
                        <Input type="text" id="sanMadhemagasvargiyansathiKeleliTartud" className="form-control" value={formData.sanMadhemagasvargiyansathiKeleliTartud} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* ---------------------? */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="san" className="form-label">
                          सन
                        </Label>
                        <Input type="select" id="san" className="form-control" value={formData.san} onChange={handleInputChange}>
                          <option value="">वर्ष निवडा</option>
                          {SinglegenerateYear().map((san) => (
                            <option key={san} value={san}>
                              {san}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                    {/* -------------------------------? */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="chaluMahinyatPraptaJhaleleUtpanna" className="form-label">
                          चालू महिन्यात झालेला खर्च
                        </Label>
                        <Input type="text" id="chaluMahinyatPraptaJhaleleUtpanna" className="form-control" value={formData.chaluMahinyatPraptaJhaleleUtpanna} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* -------------------------------- */}

                    {/* /* 15 टक्के खर्च करावयाची रक्कम */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="fiftyTakkeKharchaKarychiRakkam" className="form-label">
                          १५ टक्के खर्च करावयाची रक्कम
                        </Label>
                        <Input
                          type="text"
                          id="fiftyTakkeKharchaKarychiRakkam"
                          className="form-control"
                          value={formData.fiftyTakkeKharchaKarychiRakkam}
                          readOnly // Make it read-only since it is auto-calculated
                        />
                      </div>
                    </Col>
                    {/* ----------------------------------- */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kharchachyaBabiYojanavar" className="form-label">
                          खर्चाच्या बाबी बाबवार / योजनावार
                        </Label>
                        <Input type="text" id="kharchachyaBabiYojanavar" className="form-control" value={formData.kharchachyaBabiYojanavar} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* ----------------------- */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="magilMahinayatJhalelaKharcha" className="form-label">
                          मागील महिन्यात झालेला खर्च
                        </Label>
                        <Input type="text" id="magilMahinayatJhalelaKharcha" className="form-control" value={formData.magilMahinayatJhalelaKharcha} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* -------------------------- */}
                    {/* चालू महिन्यात झालेला खर्च */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="chaluMahinyatJhalelaKharcha" className="form-label">
                          चालू महिन्यात झालेला खर्च
                        </Label>
                        <Input type="text" id="chaluMahinyatJhalelaKharcha" className="form-control" value={formData.chaluMahinyatJhalelaKharcha} onChange={handleInputChange} />
                      </div>
                    </Col>
                    {/* ------------------------------------- */}
                    {/* एकूण खर्च */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="ekunKharch" className="form-label">
                          एकूण खर्च
                        </Label>
                        <Input
                          type="text"
                          id="ekunKharch"
                          className="form-control"
                          value={formData.ekunKharch}
                          readOnly // Make it read-only as it's auto-calculated
                        />
                      </div>
                    </Col>
                    {/* ------------------------------ */}

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kharchachiTakkevari" className="form-label">
                          खर्चाची टक्केवारी
                        </Label>
                        <Input type="text" id="kharchachiTakkevari" className="form-control" value={formData.kharchachiTakkevari} onChange={handleInputChange} />
                      </div>
                    </Col>

                    {/* ------------------------------------ */}
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
                    {/* //----------------------------------- */}
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
                    {/* ------------------------------ */}
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="shera" className="form-label">
                          शेरा
                        </Label>
                        <Input type="textarea" id="shera" className="form-control" value={formData.shera} onChange={handleInputChange} />
                      </div>
                    </Col>
                  </Row>
                  <br></br>

                  {/* <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२८-अहवाल")} style={{ marginLeft: "10px" }}>
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
                    <Button color="danger" onClick={() => navigate("/नमुना-२८-अहवाल")}>
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

export default Update28;
