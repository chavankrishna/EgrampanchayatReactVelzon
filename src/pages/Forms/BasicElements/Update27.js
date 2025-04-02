import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker"; // Importing DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Update27 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [dataList, setDataList] = useState([]);
  console.log("Id :", formData.id);

  useEffect(() => {
    if (!state && formData.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/getById/${formData.id}`);
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
    setFormData({ ...formData, [id]: value });

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

  const handleSubmit = async () => {
    setLoading(true); // Show loading state

    // Define required fields for validation
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

    // Validate if all required fields are filled
    const isFormValid = requiredFields.every(
      (field) => formData[field]?.trim() !== "" // Check if fields are non-empty
    );

    if (!isFormValid) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
      setLoading(false); // Hide loading state
      return; // Exit the function if validation fails
    }

    try {
      // Retrieve the token from sessionStorage
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle the case where there is no token (e.g., redirect to login)
        const errorMessage = "आपले सत्र समाप्त झाले आहे. कृपया पुन्हा लॉगिन करा.";
        sessionStorage.setItem("sessionMessage", errorMessage); // Store the session error message
        navigate("/login"); // Redirect to login page if no token is found
        return;
      }

      // Make the API call with the token in the headers
      const response = await axios.post(`http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any previous error messages
      navigate("/नमुना-२७-अहवाल"); // Redirect to the report page
    } catch (err) {
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; // Use error message from response
      }
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    } finally {
      setLoading(false); // Hide loading state once the request is complete
    }
  };

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

  const breadcrumbTitle = " रक्कमेच्या परताव्यासाठीचा आदेश - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२७"; // Dynamic page title

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
                        margin-left: 65%;
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
                  {/* Show session message if available */}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">रक्कमेच्या परताव्यासाठीचा आदेश- अद्यतन करा</h4>
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
                          <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                        </div>
                      </Col>
                    ))}
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
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya" className="form-label" style={{ marginTop: "21px" }}>
                            लेखापरीक्षकाने ज्या बाबतीत पूर्तता मान्य केली आहे त्या आक्षेपांची संख्या
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya"
                            value={formData.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="prlabitAsalellyaAakshepachiSakhaya" className="form-label" style={{ marginTop: "41px" }}>
                            प्रलंबित असलेल्या आक्षेपांची संख्या (३-६)
                          </Label>
                          <Input type="text" className="form-control" id="prlabitAsalellyaAakshepachiSakhaya" value={formData.prlabitAsalellyaAakshepachiSakhaya} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pootartaNaKelelayabghlachiKaarana" className="form-label" style={{ marginTop: "41px" }}>
                            पूर्तता न केल्याबद्दलची कारणे
                          </Label>
                          <Input type="text" className="form-control" id="pootartaNaKelelayabghlachiKaarana" value={formData.pootartaNaKelelayabghlachiKaarana} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="shera" className="form-label" style={{ marginTop: "41px" }}>
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
                  </Row>
                  <br></br>
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२७-अहवाल")}>
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

export default Update27;
