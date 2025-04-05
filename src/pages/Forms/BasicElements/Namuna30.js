import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import "../BasicElements/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { format } from "date-fns";

const Namuna30 = () => {
  document.title = "नमुना ३० ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    employeeId: "",
    employeeName: "",
    gramPanchayatId: "",
    gramPanchayatName: "",
    lekhParikshanAhwalVarsh: "",
    lPAhwalPraptaJhalyachiDinank: "",
    ahwalatilAkshepanchiSankhya: "",
    ahwalatilAkshepanchiAnuKramank: "",
    kMAsanaraAkshepKramank: "",
    kMAsanaraAkshepSankhya: "",
    purtataKarvyachyaAkshepancheKramank: "",
    purtataKarvyachyaAkshepancheSankhya: "",
    gpPAkshepancheKramank: "",
    gpPKeleleAkshepancheSankhya: "",
    pKAPSamitiKadePathvilaJavakDinank: "",
    pKAPtSamitiKadePathvilakramank: "",
    pKAPSamitineJPKadePathvalaThravKrmank: "",
    pKAPSamitineJPKadePathvalychaJavakKrmank: "",
    pKAPSamitineJPKadePathvalychaDinank: "",
    jPYaniManjurKeleleAkshepKramank: "",
    jPYaniManjurKeleleAkshepSankya: "",
    sAVVKramankPustakiSamayojan: "",
    sAVVKramankVasuli: "",
    sAVVKramankMulyankan: "",
    sAVVKramankNiyambahya: "",
    sAVVKramankEkun: "",
    shera: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");   
  // console.log(report);
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
     // const startYearInMarathi = arabicToMarathiDigits(startYear);
     // const endYearInMarathi = arabicToMarathiDigits(endYear);
      return `${startYear} - ${endYear}`;   
    });
    setYearRanges(ranges);
  }, []);

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   // Check if the field is the date field and convert the date format
  //   setFormData({ ...formData, [id]: value });
  // };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const regex = /^[\u0900-\u097F A-Za-z\s]+$/; // Allows Hindi, Marathi & English

    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "shera" ) {
      if (value === "" || regex.test(value)) { 
        setError(""); // Clear error if valid  
      } else {
        setError("Only English, Marathi, and Hindi characters are allowed. Numbers and special characters are not allowed"); 
      }
    } 
    else if (id === "sAVVKramankNiyambahya" ) { 
      if (value === "" || regex.test(value)) {
       // setFormData((prev) => ({ ...prev, [id]: value }));
        setError1(""); // Clear error if valid
      } else {
        setError1("Only English, Marathi, and Hindi characters are allowed. Numbers and special characters are not allowed"); 
      }
    }
    else if (id === "sAVVKramankMulyankan" ) { 
      if (value === "" || regex.test(value)) {
       // setFormData((prev) => ({ ...prev, [id]: value }));
        setError2(""); // Clear error if valid
      } else {
        setError2("Only English, Marathi, and Hindi characters are allowed. Numbers and special characters are not allowed"); 
      }
    }
    else if (id === "sAVVKramankPustakiSamayojan") { 
      if (value === "" || regex.test(value)) {
       // setFormData((prev) => ({ ...prev, [id]: value }));
        setError3(""); // Clear error if valid
      } else {
        setError3("Only English, Marathi, and Hindi characters are allowed. Numbers and special characters are not allowed"); 
      }
    }



  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    if (!date) return ""; // Handle empty or invalid inputs
    const dateObj = new Date(date);
    if (isNaN(dateObj)) return ""; // Handle invalid dates
    return dateObj.toISOString().slice(0, 10); // Extract YYYY-MM-DD
  };
  

  function arabicToMarathiDigits(input) { 
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }


  const handleSubmit = async () => {
    try {
      // Convert date fields
      const formattedData = { ...formData };
      formattedData.lPAhwalPraptaJhalyachiDinank = convertDateFormat(formattedData.lPAhwalPraptaJhalyachiDinank);
      formattedData.pKAPSamitiKadePathvilaJavakDinank = convertDateFormat(formattedData.pKAPSamitiKadePathvilaJavakDinank);
      formattedData.pKAPSamitineJPKadePathvalychaDinank = convertDateFormat(formattedData.pKAPSamitineJPKadePathvalychaDinank);

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      // Send formatted data with token in headers
      const response = await axios.post("http://localhost:8080/lekhaparikshan/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      // Log success and navigate
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      console.log("Success:", successMessage);
      sessionStorage.setItem("sessionMessage", successMessage);

      // Navigate to the report page
      navigate("/नमुना-३०-अहवाल ");
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Log error for debugging
      console.error("Error occurred:", error);

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      employeeId: "",
      employeeName: "",
      gramPanchayatId: "",
      gramPanchayatName: "",

      lekhParikshanAhwalVarsh: "",

      lPAhwalPraptaJhalyachiDinank: "",

      ahwalatilAkshepanchiSankhya: "",
      ahwalatilAkshepanchiAnuKramank: "",

      kMAsanaraAkshepKramank: "",
      kMAsanaraAkshepSankhya: "",

      purtataKarvyachyaAkshepancheKramank: "",
      purtataKarvyachyaAkshepancheSankhya: "",

      gpPAkshepancheKramank: "",
      gpPKeleleAkshepancheSankhya: "",

      pKAPSamitiKadePathvilaJavakDinank: "",
      pKAPtSamitiKadePathvilakramank: "",

      pKAPSamitineJPKadePathvalaThravKrmank: "",
      pKAPSamitineJPKadePathvalychaJavakKrmank: "",
      pKAPSamitineJPKadePathvalychaDinank: "",

      jPYaniManjurKeleleAkshepKramank: "",
      jPYaniManjurKeleleAkshepSankya: "",

      sAVVKramankPustakiSamayojan: "",
      sAVVKramankVasuli: "",
      sAVVKramankMulyankan: "",
      sAVVKramankNiyambahya: "",
      sAVVKramankEkun: "",

      shera: "",
    });
  };

  //save and not navigate to report page
  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    // List of required fields
    const requiredFields = [
      "lekhParikshanAhwalVarsh",
      "lPAhwalPraptaJhalyachiDinank",
      "ahwalatilAkshepanchiSankhya",
      "ahwalatilAkshepanchiAnuKramank",
      "kMAsanaraAkshepKramank",
      "kMAsanaraAkshepSankhya",
      "purtataKarvyachyaAkshepancheKramank",
      "purtataKarvyachyaAkshepancheSankhya",
      "gpPAkshepancheKramank",
      "gpPKeleleAkshepancheSankhya",
      "pKAPSamitiKadePathvilaJavakDinank",
      "pKAPtSamitiKadePathvilakramank",
      "pKAPSamitineJPKadePathvalaThravKrmank",
      "pKAPSamitineJPKadePathvalychaJavakKrmank",
      "pKAPSamitineJPKadePathvalychaDinank",
      "jPYaniManjurKeleleAkshepKramank",
      "jPYaniManjurKeleleAkshepSankya",
      "sAVVKramankPustakiSamayojan",
      "sAVVKramankVasuli",
      "sAVVKramankMulyankan",
      "sAVVKramankNiyambahya",
      "sAVVKramankEkun",
      "shera",
    ];

    // Validate required fields
    // const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== ""); // Check if fields are non-empty
    // if (!isFormValid) {
    //   const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
    //   setErrorMessage(errorMessage);
    //   setSuccessMessage(""); // Clear any success messages
    //   return;
    // }

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      // Format data
      const formattedData = { ...formData };
      formattedData.lPAhwalPraptaJhalyachiDinank = convertDateFormat(formattedData.lPAhwalPraptaJhalyachiDinank);
      formattedData.pKAPSamitiKadePathvilaJavakDinank = convertDateFormat(formattedData.pKAPSamitiKadePathvilaJavakDinank);
      formattedData.pKAPSamitineJPKadePathvalychaDinank = convertDateFormat(formattedData.pKAPSamitineJPKadePathvalychaDinank);

      // Send data with token in headers
      const response = await axios.post("http://localhost:8080/lekhaparikshan/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      // Success response
      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages
      console.log("Response:", response.data);

      // Clear form data
      setFormData({
        id: "",
        employeeId: "",
        employeeName: "",
        gramPanchayatId: "",
        gramPanchayatName: "",
        lekhParikshanAhwalVarsh: "",
        lPAhwalPraptaJhalyachiDinank: "",
        ahwalatilAkshepanchiSankhya: "",
        ahwalatilAkshepanchiAnuKramank: "",
        kMAsanaraAkshepKramank: "",
        kMAsanaraAkshepSankhya: "",
        purtataKarvyachyaAkshepancheKramank: "",
        purtataKarvyachyaAkshepancheSankhya: "",
        gpPAkshepancheKramank: "",
        gpPKeleleAkshepancheSankhya: "",
        pKAPSamitiKadePathvilaJavakDinank: "",
        pKAPtSamitiKadePathvilakramank: "",
        pKAPSamitineJPKadePathvalaThravKrmank: "",
        pKAPSamitineJPKadePathvalychaJavakKrmank: "",
        pKAPSamitineJPKadePathvalychaDinank: "",
        jPYaniManjurKeleleAkshepKramank: "",
        jPYaniManjurKeleleAkshepSankya: "",
        sAVVKramankPustakiSamayojan: "",
        sAVVKramankVasuli: "",
        sAVVKramankMulyankan: "",
        sAVVKramankNiyambahya: "",
        sAVVKramankEkun: "",
        shera: "",
      });
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      // Log error for debugging
      console.error("Error occurred:", error);

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [successMessage]);

  // const handleSaveAndAddNew = () => {
  //   handleSubmit1();
  //   handleReset();
  // };
const breadcrumbTitle = "ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही"; // This could be dynamic
const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३० "; // Dynamic page title

const breadcrumbPaths = [
  "/dashboard", // Path for "डॅशबोर्ड" 
  "/नमुना-३०-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना ३० ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-३०-अहवाल ")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="lekhParikshanAhwalVarsh" className="form-label">
                            लेखापरिक्षण अहवाल वर्ष
                          </Label>
                          <Input type="select" id="lekhParikshanAhwalVarsh" value={formData.lekhParikshanAhwalVarsh} onChange={handleInputChange}>
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
                          <Label htmlFor="lPAhwalPraptaJhalyachiDinank" className="form-label">
                            लेखापरिक्षण अहवाल प्राप्त झाल्याचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="lPAhwalPraptaJhalyachiDinank" value={formData.lPAhwalPraptaJhalyachiDinank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="ahwalatilAkshepanchiSankhya" className="form-label">
                            अहवालांतील आक्षेपांची संख्या
                          </Label>
                          <Input type="number" className="form-control" id="ahwalatilAkshepanchiSankhya" value={formData.ahwalatilAkshepanchiSankhya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="ahwalatilAkshepanchiAnuKramank" className="form-label">
                            अहवालांतील आक्षेपांची अनुक्रमांक
                          </Label>
                          <Input type="number" className="form-control" id="ahwalatilAkshepanchiAnuKramank" value={formData.ahwalatilAkshepanchiAnuKramank} onChange={handleInputChange} />
                        </div>
                      </Col>               
                      <Col xxl={3} md={3}>    
                        <div>
                          <Label htmlFor="kMAsanaraAkshepKramank" className="form-label">  
                            केवळ माहितीसाठी असणारा आक्षेप क्रमांक   
                          </Label>
                          <Input type="number" className="form-control" id="kMAsanaraAkshepKramank" value={formData.kMAsanaraAkshepKramank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kMAsanaraAkshepSankhya" className="form-label">
                            केवळ माहितीसाठी असणारा आक्षेप संख्या
                          </Label>
                          <Input type="number" className="form-control" id="kMAsanaraAkshepSankhya" value={formData.kMAsanaraAkshepSankhya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purtataKarvyachyaAkshepancheKramank" className="form-label">
                            पुर्तता करावयाच्या आक्षेपांचे क्रमांक
                          </Label>
                          <Input type="number" className="form-control" id="purtataKarvyachyaAkshepancheKramank" value={formData.purtataKarvyachyaAkshepancheKramank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purtataKarvyachyaAkshepancheSankhya" className="form-label">
                            पुर्तता करावयाच्या आक्षेपांचे संख्या
                          </Label>
                          <Input type="number" className="form-control" id="purtataKarvyachyaAkshepancheSankhya" value={formData.purtataKarvyachyaAkshepancheSankhya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gpPAkshepancheKramank" className="form-label">
                            ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे क्रमांक
                          </Label>
                          <Input type="number" className="form-control" id="gpPAkshepancheKramank" value={formData.gpPAkshepancheKramank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gpPKeleleAkshepancheSankhya" className="form-label">
                            ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे संख्या
                          </Label>
                          <Input type="number" className="form-control" id="gpPKeleleAkshepancheSankhya" value={formData.gpPKeleleAkshepancheSankhya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pKAPSamitiKadePathvilaJavakDinank" className="form-label">
                            पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा जावक दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="pKAPSamitiKadePathvilaJavakDinank" value={formData.pKAPSamitiKadePathvilaJavakDinank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pKAPtSamitiKadePathvilakramank" className="form-label">
                            पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा क्रमांक
                          </Label>
                          <Input type="number" className="form-control" id="pKAPtSamitiKadePathvilakramank" value={formData.pKAPtSamitiKadePathvilakramank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pKAPSamitineJPKadePathvalaThravKrmank" className="form-label">
                            पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा ठराव क्रमांक
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="pKAPSamitineJPKadePathvalaThravKrmank"
                            value={formData.pKAPSamitineJPKadePathvalaThravKrmank}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pKAPSamitineJPKadePathvalychaJavakKrmank" className="form-label">
                            पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा जावक क्रमांक
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="pKAPSamitineJPKadePathvalychaJavakKrmank"
                            value={formData.pKAPSamitineJPKadePathvalychaJavakKrmank}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pKAPSamitineJPKadePathvalychaDinank" className="form-label">
                            पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="pKAPSamitineJPKadePathvalychaDinank" value={formData.pKAPSamitineJPKadePathvalychaDinank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jPYaniManjurKeleleAkshepKramank" className="form-label">
                            जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप क्रमांक
                          </Label>
                          <Input type="number" className="form-control" id="jPYaniManjurKeleleAkshepKramank" value={formData.jPYaniManjurKeleleAkshepKramank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jPYaniManjurKeleleAkshepSankya" className="form-label">
                            जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप संख्या
                          </Label>
                          <Input type="number" className="form-control" id="jPYaniManjurKeleleAkshepSankya" value={formData.jPYaniManjurKeleleAkshepSankya} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sAVVKramankPustakiSamayojan" className="form-label">
                            शिल्लक आक्षेपांची वर्गवारी व क्रमांक पुस्तकी समायोजन
                          </Label>
                          <Input type="text" className="form-control" id="sAVVKramankPustakiSamayojan" value={formData.sAVVKramankPustakiSamayojan} onChange={handleInputChange} />   
                          {error3 && <small style={{ color: "red" }}>{error3}</small>} 
                        </div>
                      </Col>
                      <Col xxl={3} md={3}> 
                        <div>
                          <Label htmlFor="sAVVKramankVasuli" className="form-label"> 
                            शिल्लक आक्षेपांची वर्गवारी व क्रमांक वसुली
                          </Label>
                          <Input type="number" className="form-control" id="sAVVKramankVasuli" value={formData.sAVVKramankVasuli} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sAVVKramankMulyankan" className="form-label">
                            शिल्लक आक्षेपांची वर्गवारी व क्रमांक मूल्यांकन
                          </Label>
                          <Input type="text" className="form-control" id="sAVVKramankMulyankan" value={formData.sAVVKramankMulyankan} onChange={handleInputChange} /> 
                          {error2 && <small style={{ color: "red" }}>{error2}</small>} 
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sAVVKramankNiyambahya" className="form-label">
                            शिल्लक आक्षेपांची वर्गवारी व क्रमांक नियमबाह्य
                          </Label>
                          <Input type="text" className="form-control" id="sAVVKramankNiyambahya" value={formData.sAVVKramankNiyambahya} onChange={handleInputChange} /> 
                          {error1 && <small style={{ color: "red" }}>{error1}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sAVVKramankEkun" className="form-label">
                            शिल्लक आक्षेपांची वर्गवारी व क्रमांक एकूण
                          </Label>
                          <Input type="number" className="form-control" id="sAVVKramankEkun" value={formData.sAVVKramankEkun} onChange={handleInputChange} />
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
                            rows="4" 

                          />
                          {error && <small style={{ color: "red" }}>{error}</small>}
                        </div>
                      </Col>

                      {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="year" className="form-label">वर्ष</Label>
                                                    <Input type="text" className="form-control" id="year" value={formData.year} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
                    </Row>
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="d-flex justify-content-end flex-wrap gap-2">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="primary" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="warning" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="danger" onClick={() => navigate("/नमुना-३०-अहवाल ")}>
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

export default Namuna30;
