import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
// import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import "../BasicElements/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";

const Namuna22 = () => {
  document.title = "नमुना २२ - स्थावर मालमत्ता नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    sanpadanchiKharediKinwaUbharnichaDinank: "",
    malmattechaBhumapanMalmattecheVarnan: "",
    konatyaKarnaSaathiWaparKela: "",
    ubharniKinwaSampadanachaKharch: "",
    durustyawarKinwaFerfaravarDinank: "",
    durustyawarKinwaFerfaravarChaluDurustyaRupaye: "",
    durustyawarKinwaFerfaravarWisheshDurustyaRupaye: "",
    durustyawarKinwaFerfaravarMulBandhKaamRupaye: "",
    durustyawarKinwaFerfaravarMulBandhkaamcheSwarup: "",
    warshaAkherisGhatleliKinmat: "",
    //------------------------------------------------
    jAMSamKTyaadeshacheVPanchTharKramank: "",
    jAMSamKTyaadeshacheVPanchTharDinak: "",
    malmattechaBhumapanKramank: "",

    malmattechiVilhewatKramank: "",
    malmattechiVilhewatDinank: "",
    malmattechiVilhewatKalam55Kramank: "",
    malmattechiVilhewatKalam55Dinank: "",

    shera: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dataList, setDataList] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");

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
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };

  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }
  //double year vla logic
  const currentYear = new Date().getFullYear();
  const yearRanges = Array.from({ length: 100 }, (_, i) => {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    const startYearInMarathi = arabicToMarathiDigits(startYear);
    const endYearInMarathi = arabicToMarathiDigits(endYear);
    return `${startYearInMarathi} -${endYearInMarathi}`;
  });
  const handleSubmit = async () => {
    try {
      // Log initial submission
      console.log("Form submission started:", formData);

      // Convert date fields
      const formattedData = { ...formData };
      formattedData.sanpadanchiKharediKinwaUbharnichaDinank = convertDateFormat(formattedData.sanpadanchiKharediKinwaUbharnichaDinank);
      formattedData.jAMSamKTyaadeshacheVPanchTharDinak = convertDateFormat(formattedData.jAMSamKTyaadeshacheVPanchTharDinak);
      formattedData.durustyawarKinwaFerfaravarDinank = convertDateFormat(formattedData.durustyawarKinwaFerfaravarDinank);
      formattedData.malmattechiVilhewatDinank = convertDateFormat(formattedData.malmattechiVilhewatDinank);
      formattedData.malmattechiVilhewatKalam55Dinank = convertDateFormat(formattedData.malmattechiVilhewatKalam55Dinank);

      console.log("Formatted data prepared:", formattedData);

      // Get the token
      const token = localStorage.getItem("token"); // Adjust key based on your storage mechanism
      console.log("Retrieved token:", token);

      if (!token) {
        const errorMessage = "प्रवेश नाकारला. कृपया लॉगिन करा.";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any previous success messages
        return;
      }

      // Send the request
      const response = await axios.post("http://localhost:8080/sthavarMalmatta/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      console.log("Server response:", response.data);

      // Set success message and redirect
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage);
      console.log("Success message set in session:", successMessage);

      // Navigate to the report page
      navigate("/नमुना-२२-अहवाल");
    } catch (error) {
      console.error("Error during form submission:", error);

      // Handle and display error messages
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        console.error("Server error response:", error.response);
        errorMessage = error.response.data.message || errorMessage;
      }

      sessionStorage.setItem("sessionMessage", errorMessage);
      console.log("Error message set in session:", errorMessage);

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
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      sanpadanchiKharediKinwaUbharnichaDinank: "",
      jAMSamKTyaadeshacheVPanchTharKramank: "",
      jAMSamKTyaadeshacheVPanchTharDinak: "",
      malmattechaBhumapanKramank: "",
      malmattechaBhumapanMalmattecheVarnan: "",
      konatyaKarnaSaathiWaparKela: "",
      ubharniKinwaSampadanachaKharch: "",

      warshaAkherisGhatleliKinmat: "",
      malmattechiVilhewatKramank: "",
      malmattechiVilhewatDinank: "",
      malmattechiVilhewatKalam55Kramank: "",
      malmattechiVilhewatKalam55Dinank: "",
      durustyawarKinwaFerfaravarDinank: "",
      durustyawarKinwaFerfaravarChaluDurustyaRupaye: "",
      durustyawarKinwaFerfaravarWisheshDurustyaRupaye: "",
      durustyawarKinwaFerfaravarMulBandhKaamRupaye: "",
      durustyawarKinwaFerfaravarMulBandhkaamcheSwarup: "",
      shera: "",
    });
  };

  //save and not navigate to report page
  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    const requiredFields = [
      "sanpadanchiKharediKinwaUbharnichaDinank",
      "jAMSamKTyaadeshacheVPanchTharKramank",
      "jAMSamKTyaadeshacheVPanchTharDinak",
      "malmattechaBhumapanKramank",
      "malmattechaBhumapanMalmattecheVarnan",
      "konatyaKarnaSaathiWaparKela",
      "ubharniKinwaSampadanachaKharch",
      "warshaAkherisGhatleliKinmat",
      "malmattechiVilhewatKramank",
      "malmattechiVilhewatDinank",
      "malmattechiVilhewatKalam55Kramank",
      "malmattechiVilhewatKalam55Dinank",
      "durustyawarKinwaFerfaravarDinank",
      "durustyawarKinwaFerfaravarChaluDurustyaRupaye",
      "durustyawarKinwaFerfaravarWisheshDurustyaRupaye",
      "durustyawarKinwaFerfaravarMulBandhKaamRupaye",
      "durustyawarKinwaFerfaravarMulBandhkaamcheSwarup",
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
      // Get the token from localStorage and log it
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token); // Log the token for debugging

      // Check if the token exists
      if (!token) {
        const errorMessage = "तुम्ही लॉगिन केलेले नाहीत. कृपया लॉगिन करा.";
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any success messages
        return; // Exit the function if no token is found
      }

      // Prepare the data
      const formattedData = { ...formData };
      formattedData.sanpadanchiKharediKinwaUbharnichaDinank = convertDateFormat(formattedData.sanpadanchiKharediKinwaUbharnichaDinank);
      formattedData.jAMSamKTyaadeshacheVPanchTharDinak = convertDateFormat(formattedData.jAMSamKTyaadeshacheVPanchTharDinak);
      formattedData.durustyawarKinwaFerfaravarDinank = convertDateFormat(formattedData.durustyawarKinwaFerfaravarDinank);
      formattedData.malmattechiVilhewatDinank = convertDateFormat(formattedData.malmattechiVilhewatDinank);
      formattedData.malmattechiVilhewatKalam55Dinank = convertDateFormat(formattedData.malmattechiVilhewatKalam55Dinank);

      // Send the POST request with the token included in the headers
      const response = await axios.post("http://localhost:8080/sthavarMalmatta/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Reset form data
      setFormData({
        id: "",
        employeeId: "",
        employeeName: "",
        gramPanchayatId: "",
        gramPanchayatName: "",
        sanpadanchiKharediKinwaUbharnichaDinank: "",
        jAMSamKTyaadeshacheVPanchTharKramank: "",
        jAMSamKTyaadeshacheVPanchTharDinak: "",
        malmattechaBhumapanKramank: "",
        malmattechaBhumapanMalmattecheVarnan: "",
        konatyaKarnaSaathiWaparKela: "",
        ubharniKinwaSampadanachaKharch: "",
        warshaAkherisGhatleliKinmat: "",
        malmattechiVilhewatKramank: "",
        malmattechiVilhewatDinank: "",
        malmattechiVilhewatKalam55Kramank: "",
        malmattechiVilhewatKalam55Dinank: "",
        durustyawarKinwaFerfaravarDinank: "",
        durustyawarKinwaFerfaravarChaluDurustyaRupaye: "",
        durustyawarKinwaFerfaravarWisheshDurustyaRupaye: "",
        durustyawarKinwaFerfaravarMulBandhKaamRupaye: "",
        durustyawarKinwaFerfaravarMulBandhkaamcheSwarup: "",
        shera: "",
      });
    } catch (error) {
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
  const breadcrumbTitle = "नमुना २२ ग्रामपंचायत स्थावर मालमत्ता नोंदवही"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२२ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२२-अहवाल", // Path
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 66%;
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
                <PreviewCardHeader title="नमुना २२ - स्थावर मालमत्ता नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२२-अहवाल")} />
                <CardBody className="card-body">
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}

                  <div className="live-preview"></div>
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="sanpadanchiKharediKinwaUbharnichaDinank" className="form-label">
                            संपादनाची खरेदीची किंवा उभारणीचा दिनांक
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="sanpadanchiKharediKinwaUbharnichaDinank"
                            value={formData.sanpadanchiKharediKinwaUbharnichaDinank}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="jAMSamKTyaadeshacheVPanchTharKramank" className="form-label">
                            ज्या अन्वये मालमत्ता संपादित केली त्या आदेशाचे व पंचायत ठरावाचे क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="jAMSamKTyaadeshacheVPanchTharKramank" value={formData.jAMSamKTyaadeshacheVPanchTharKramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="jAMSamKTyaadeshacheVPanchTharDinak" className="form-label">
                            ज्या अन्वये मालमत्ता संपादित केली त्या आदेशाचे व पंचायत ठरावाचे दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="jAMSamKTyaadeshacheVPanchTharDinak" value={formData.jAMSamKTyaadeshacheVPanchTharDinak} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechaBhumapanKramank" className="form-label">
                            मालमतेचा भूमापन क्रमांक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="malmattechaBhumapanKramank" value={formData.malmattechaBhumapanKramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechaBhumapanMalmattecheVarnan" className="form-label">
                            मालमत्तेचे वर्णन
                          </Label>
                          <Input type="text" className="form-control" id="malmattechaBhumapanMalmattecheVarnan" value={formData.malmattechaBhumapanMalmattecheVarnan} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="konatyaKarnaSaathiWaparKela" className="form-label">
                            कोणत्या कारणासाठी वापर केला
                          </Label>
                          <Input type="text" className="form-control" id="konatyaKarnaSaathiWaparKela" value={formData.konatyaKarnaSaathiWaparKela} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="ubharniKinwaSampadanachaKharch" className="form-label">
                            उभारणीचा किंवा संपादनाचा खर्च
                          </Label>
                          <Input type="text" className="form-control" id="ubharniKinwaSampadanachaKharch" value={formData.ubharniKinwaSampadanachaKharch} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="warshaAkherisGhatleliKinmat" className="form-label">
                            वर्ष अखेरीस घटलेली किंमत
                          </Label>
                          <Input type="text" className="form-control" id="warshaAkherisGhatleliKinmat" value={formData.warshaAkherisGhatleliKinmat} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechiVilhewatKramank" className="form-label">
                            मालमत्तेची विल्हेवाट लावण्यासाठी पंचायतीच्या ठरावाचा क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="malmattechiVilhewatKramank" value={formData.malmattechiVilhewatKramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechiVilhewatDinank" className="form-label">
                            मालमत्तेची विल्हेवाट लावण्यासाठी पंचायतीच्या ठरावाचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="malmattechiVilhewatDinank" value={formData.malmattechiVilhewatDinank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechiVilhewatKalam55Kramank" className="form-label">
                            मालमत्तेची विल्हेवाट लावण्यासाठी कलम ५५ प्राधिकाऱ्याच्या आदेशाचा क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="malmattechiVilhewatKalam55Kramank" value={formData.malmattechiVilhewatKalam55Kramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="malmattechiVilhewatKalam55Dinank" className="form-label">
                            मालमत्तेची विल्हेवाट लावण्यासाठी कलम ५५ प्राधिकाऱ्याच्या आदेशाचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="malmattechiVilhewatKalam55Dinank" value={formData.malmattechiVilhewatKalam55Dinank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <h5 className="mb-0">नमुना २२ - दुरुस्त्यावर किंवा फेरफारावर वर्षभरात खर्च करण्यात आलेली रक्कम</h5>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="durustyawarKinwaFerfaravarDinank" className="form-label">
                            दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="durustyawarKinwaFerfaravarDinank" value={formData.durustyawarKinwaFerfaravarDinank} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="durustyawarKinwaFerfaravarChaluDurustyaRupaye" className="form-label">
                            चालू दुरुस्तया रुपये
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="durustyawarKinwaFerfaravarChaluDurustyaRupaye"
                            value={formData.durustyawarKinwaFerfaravarChaluDurustyaRupaye}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="durustyawarKinwaFerfaravarWisheshDurustyaRupaye" className="form-label">
                            विशेष दुरुस्त्या रुपये
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="durustyawarKinwaFerfaravarWisheshDurustyaRupaye"
                            value={formData.durustyawarKinwaFerfaravarWisheshDurustyaRupaye}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="durustyawarKinwaFerfaravarMulBandhKaamRupaye" className="form-label">
                            मुळ बांधकाम रुपये
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="durustyawarKinwaFerfaravarMulBandhKaamRupaye"
                            value={formData.durustyawarKinwaFerfaravarMulBandhKaamRupaye}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="durustyawarKinwaFerfaravarMulBandhkaamcheSwarup" className="form-label">
                            मुळ बाधकामाचे कामाचे स्वरुप
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="durustyawarKinwaFerfaravarMulBandhkaamcheSwarup"
                            value={formData.durustyawarKinwaFerfaravarMulBandhkaamcheSwarup}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={4}>
                        <div>
                          <Label htmlFor="shera" className="form-label">
                            शेरा
                          </Label>
                          <Input type="textarea" className="form-control" id="shera" value={formData.shera} onChange={handleInputChange} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="primary" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="warning" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="danger" onClick={() => (window.location.href = "/नमुना-२२-अहवाल")}>
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
export default Namuna22;
