import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import "../BasicElements/style.css";

// --------------------------------------------------------------
const Namuna27 = () => {
  document.title = "नमुना २७ - लेखा परीक्षणातील आक्षेपांच्या मासिक विवरण";
  const navigate = useNavigate();

  const [error,setError] = useState("");
  const [error1,setError1] = useState("");
  const [error2,setError2] = useState("");
  const [error3,setError3] = useState("");
  const [error4,setError4] = useState("");
  const [error5,setError5] = useState("");
  const [error6,setError6] = useState("");
  const [error7,setError7] = useState("");


  const [formData, setFormData] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    lekhaparikshanaAhvalcheVrsh: "",
    lekhaparikshanaAhvalatilaParicchhedaSamkhaya: "",
    grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya: "",
    panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya: "",
    lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya: "",
    prlabitAsalellyaAakshepachiSakhaya: "",
    pootartaNaKelelayabghlachiKaarana: "",
    shera: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
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

    // Arabic to Marathi digits conversion function
    function arabicToMarathiDigits(input) {
      const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    //setFormData({ ...formData, [id]: value });

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const regex = /^[0-9\u0966-\u096F]+$/; // Allows Hindi, Marathi & English numbers
    const regex1 = /^[\u0900-\u097F A-Za-z\s]+$/; // Allows Hindi, Marathi & English letters and spaces 


    if(id === "lekhaparikshanaAhvalatilaParicchhedaSamkhaya" ) 
    {
        if(value === "" || regex.test(value)) {
            setError("");
        }
        else
        {
            setError("कृपया फक्त अंक भरा");  
        }
    } 
    else if(id === "grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya")
    {
      if(value === "" || regex.test(value)) {
        setError1("");
      }
      else
      {
        setError1("कृपया फक्त अंक भरा");
      }
    }
    else if(id === "panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya")
    {
      if(value === "" || regex.test(value)) {
        setError2("");
      }
      else
      {
        setError2("कृपया फक्त अंक भरा");
      }
    }
    else if(id === "lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya")
    {
      if(value === "" || regex.test(value)) {
        setError3("");
      }
      else
      {
        setError3("कृपया फक्त अंक भरा");
      }
    }
    else if(id === "pootartaNaKelelayabghlachiKaarana")
    {
      if(value === "" || regex1.test(value)) {
        setError4("");
      }
      else
      {
        setError4("कृपया फक्त मराठी किंवा इंग्रजी अक्षरे भरा");
      }
    }
    else if(id === "shera")
    {
      if(value === "" || regex1.test(value)) {
        setError5("");
      }
      else
      {
        setError5("कृपया फक्त मराठी किंवा इंग्रजी अक्षरे भरा");
      }
    }



    const isMarathiInput = (text) => /^[\u0966-\u096F]+$/.test(text);

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
      const lekhaparikshanaAhvalatilaParicchhedaSamkhaya =
        parseFloat(
          isMarathiInput(newFormData.lekhaparikshanaAhvalatilaParicchhedaSamkhaya)
            ? convertToEnglish(newFormData.lekhaparikshanaAhvalatilaParicchhedaSamkhaya)
            : newFormData.lekhaparikshanaAhvalatilaParicchhedaSamkhaya
        ) || 0;
      const grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya =
        parseFloat(
          isMarathiInput(newFormData.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya)
            ? convertToEnglish(newFormData.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya)
            : newFormData.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya
        ) || 0;
      const panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya =
        parseFloat(
          isMarathiInput(newFormData.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya)
            ? convertToEnglish(newFormData.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya)
            : newFormData.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya
        ) || 0;
      const lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya =
        parseFloat(
          isMarathiInput(newFormData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya)
            ? convertToEnglish(newFormData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya)
            : newFormData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya
        ) || 0;

      // Calculate the sum
      const sum =
        lekhaparikshanaAhvalatilaParicchhedaSamkhaya +
        grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya +
        panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya +
        lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya;

      // Detect if all inputs are in Marathi or English, then set total accordingly
      const allInMarathi =
        isMarathiInput(newFormData.lekhaparikshanaAhvalatilaParicchhedaSamkhaya) ||
        isMarathiInput(newFormData.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya) ||
        isMarathiInput(newFormData.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya) ||
        isMarathiInput(newFormData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya);

      newFormData.prlabitAsalellyaAakshepachiSakhaya = allInMarathi ? convertToMarathi(sum) : sum.toString();

      return newFormData;
    });
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Log the token retrieval for debugging
      console.log("Retrieved Token:", token);

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Log the data being sent for debugging
      console.log("Sending data:", formData);

      // Send the POST request with token authorization
      const response = await axios.post("http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/add", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Log the response for debugging
      console.log("Response received:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      // Navigate to the report page
      navigate("/नमुना-२७-अहवाल");
    } catch (error) {
      console.error("Error during submission:", error);

      // Log the error response for debugging
      if (error.response) {
        console.log("Error Response:", error.response.data);
      }

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  //---------------------------------------------------------------------------------------------------------------------------------------------
  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    const requiredFields = [
      "lekhaparikshanaAhvalcheVrsh",
      "lekhaparikshanaAhvalatilaParicchhedaSamkhaya",
      "grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya",
      "panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya",
      "lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya",
      "prlabitAsalellyaAakshepachiSakhaya",
      "pootartaNaKelelayabghlachiKaarana",
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
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      // Log token for debugging
      console.log("Retrieved Token:", token);

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Send the POST request with token authorization
      const response = await axios.post("http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/add", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Log the response for debugging
      console.log("Response:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      // Clear all fields after success
      setFormData({
        lekhaparikshanaAhvalcheVrsh: "",
        lekhaparikshanaAhvalatilaParicchhedaSamkhaya: "",
        grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya: "",
        panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya: "",
        lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya: "",
        prlabitAsalellyaAakshepachiSakhaya: "",
        pootartaNaKelelayabghlachiKaarana: "",
        shera: "",
      });
    } catch (error) {
      console.error("Error during submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      sessionStorage.setItem("sessionMessage", errorMessage); // Save error message in sessionStorage
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
  //----------------------------------------------------------------------------------------

  const handleReset = () => {
    setFormData({
      id: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      lekhaparikshanaAhvalcheVrsh: "",
      lekhaparikshanaAhvalatilaParicchhedaSamkhaya: "",
      grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya: "",
      panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya: "",
      lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya: "",
      prlabitAsalellyaAakshepachiSakhaya: "",
      pootartaNaKelelayabghlachiKaarana: "",
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
  const breadcrumbTitle = "नमुना २७ लेखा परीक्षणातील आक्षेपांच्या मासिक विवरण"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२७ "; // Dynamic page title
  // Define paths corresponding to each breadcrumb part

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२७-अहवाल", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
                {`
                .page-title-right {
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .page-title-right {
                    justify-content: center; /* Center align on smaller screens */
                    }
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
                <PreviewCardHeader title="नमुना २७ - लेखा परीक्षणातील आक्षेपांच्या मासिक विवरण" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२७-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="lekhaparikshanaAhvalcheVrsh" className="form-label" style={{ marginTop: "21px" }}>
                            लेखापरीक्षण अहवालाचे वर्ष
                          </Label>
                          <Input type="select" className="form-control" id="lekhaparikshanaAhvalcheVrsh" value={formData.lekhaparikshanaAhvalcheVrsh} onChange={handleInputChange}>
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
                          <Label htmlFor="lekhaparikshanaAhvalatilaParicchhedaSamkhaya" className="form-label" style={{ marginTop: "21px" }}>
                            लेखापरीक्षण अहवालातील परिच्छेद संख्या
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lekhaparikshanaAhvalatilaParicchhedaSamkhaya"
                            value={formData.lekhaparikshanaAhvalatilaParicchhedaSamkhaya}
                            onChange={handleInputChange}
                          />
                          {error && <small style={{ color: "red" }}>{error}</small>} 
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya" className="form-label">
                            ग्रामपंचायतीने या महिन्यात पूर्तता केलेल्या परिच्छेदांची संख्या
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya"
                            value={formData.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya}
                            onChange={handleInputChange}
                          />
                          { error1 && <small style={{ color: "red" }}>{error1}</small> }
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya" className="form-label">
                            पंचायत समितीने आक्षेपाद्वारे मान्य केलेल्या पूर्ततांची संख्या
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya"
                            value={formData.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya}
                            onChange={handleInputChange}
                          />
                          {error2 && <small style={{ color: "red" }}>{error2}</small>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya" className="form-label">
                            लेखापरीक्षकाने ज्या बाबतीत पूर्तता मान्य केली आहे त्या आक्षेपांची संख्या
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya"
                            value={formData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya}
                            onChange={handleInputChange}
                          />
                          {error3 && <small style={{ color: "red" }}>{error3}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="prlabitAsalellyaAakshepachiSakhaya" className="form-label" style={{ marginTop: "21px" }}>
                            प्रलंबित असलेल्या आक्षेपांची संख्या (३-६)
                          </Label>
                          <Input type="text" className="form-control" id="prlabitAsalellyaAakshepachiSakhaya" value={formData.prlabitAsalellyaAakshepachiSakhaya} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pootartaNaKelelayabghlachiKaarana" className="form-label" style={{ marginTop: "21px" }}>
                            पूर्तता न केल्याबद्दलची कारणे
                          </Label>
                          <Input type="text" className="form-control" id="pootartaNaKelelayabghlachiKaarana" value={formData.pootartaNaKelelayabghlachiKaarana} onChange={handleInputChange} />
                          {error4 && <small style={{ color: "red" }}>{error4}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="shera" className="form-label" style={{ marginTop: "21px" }}>
                            शेरा
                          </Label>
                          <textarea
                            className="form-control"
                            id="shera"
                            value={formData.shera}
                            onChange={handleInputChange}
                            rows="4" // You can adjust the number of rows as needed
                          />
                          {error5 && <small style={{ color: "red" }}>{error5}</small>}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="d-flex justify-content-end flex-wrap gap-2">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="primary" onClick={() => navigate("/नमुना-२७-अहवाल")}>
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

export default Namuna27;
