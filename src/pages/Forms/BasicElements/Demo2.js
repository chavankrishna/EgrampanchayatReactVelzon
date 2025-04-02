import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";

const Demo2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  //const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (!state && formData.grampanchyatId) {
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

  //Rest of the code is given below
  //-----------------------------------------------------------------------------------------
  const [dataList, setDataList] = useState([]);
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

  //--------------------------------------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? value : "";

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const requiredFields = [
      "id",
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

    const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");
    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`localhost:8080/masikvivaran/update/${formData.id}`, {
        headers: { "Content-Type": "application/json" },
      });
      alert("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      navigate("/Namuna06");
    } catch (error) {
      alert("Failed to submit data: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="जमा रकमांची नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
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
                    {[
                      { label: "सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद", id: "sanMadhemagasvargiyansathiKeleliTartud" },
                      { label: " सन", id: "san" },
                      { label: "चालू महिन्यात प्राप्त झालेले उत्पन्न", id: "chaluMahinyatPraptaJhaleleUtpanna" },
                      { label: "१५ टक्के खर्च करावयाची रक्कम", id: "fiftyTakkeKharchaKarychiRakkam" },
                      { label: "खर्चाच्या बाबी बाबवार / योजनावार", id: "kharchachyaBabiYojanavar" },
                      { label: "मागील महिन्यात झालेला खर्च", id: "magilMahinayatJhalelaKharcha" },
                      { label: "चालू महिन्यात झालेला खर्च", id: "chaluMahinyatJhalelaKharcha" },
                      { label: "एकूण खर्च", id: "ekunKharch" },
                      { label: "खर्चाची टक्केवारी", id: "kharchachiTakkevari" },
                      { label: "शेरा", id: "shera" },
                      { label: "महिना", id: "month" },
                      { label: "वर्ष", id: "year" },
                    ].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
                          <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/report28")} style={{ marginLeft: "10px" }}>
                      रद्द करा
                    </Button>
                    <Button color="primary" onClick={handleReset} style={{ marginLeft: "10px" }}>
                      रिसेट करा
                    </Button>
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

export default Demo2;
