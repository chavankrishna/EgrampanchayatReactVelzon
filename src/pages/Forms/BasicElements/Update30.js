import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

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

const Update30 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {}); // state is used as the initial value for formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,

      लेखापरिक्षणअहवालप्राप्तझाल्याचादिनांक: lPAhwalPraptaJhalyachiDinank,
      पुर्तताकेलेलेआक्षेपपंचायतसमितीकडेपाठविल्याचाजावकदिनांक: pKAPSamitiKadePathvilaJavakDinank,
      पुर्तताकेलेलेआक्षेपपंचायतसमितीनेजिपकडेलेखापरिक्षकाकडेपाठविल्याचादिनांक: pKAPSamitineJPKadePathvalychaDinank, // Assuming your date field is "पूर्ण केल्याची तारीख"
    }));
  };

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

  useEffect(() => {
    if (!state && formData.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/lekhaparikshan/getById/${formData.id}`);
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, formData.id]);

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

    // Required fields validation
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

    // Check if any required field is missing
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      const errorMessage = `कृपया सर्व आवश्यक माहिती भरा: ${missingFields.join(", ")}`;
      setErrorMessage(errorMessage);
      setSuccessMessage("");
      setLoading(false);
      return;
    }

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      // Make update request
      const response = await axios.post(`http://localhost:8080/lekhaparikshan/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      // Handle successful update
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-३०-अहवाल");
    } catch (err) {
      // Handle errors
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message; // Handle token errors
      }
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setFormData({
      id: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
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
  const breadcrumbTitle = "ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३० "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३०-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 60%;
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
                        <h4 className="card-title mb-4">ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही - अद्यतन करा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          <i className="bx bx-arrow-back"></i>मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>
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
                        <Input type="text" className="form-control" id="ahwalatilAkshepanchiSankhya" value={formData.ahwalatilAkshepanchiSankhya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="ahwalatilAkshepanchiAnuKramank" className="form-label">
                          अहवालांतील आक्षेपांची अनुक्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="ahwalatilAkshepanchiAnuKramank" value={formData.ahwalatilAkshepanchiAnuKramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kMAsanaraAkshepKramank" className="form-label">
                          केवळ माहितीसाठी असणारा आक्षेप क्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="kMAsanaraAkshepKramank" value={formData.kMAsanaraAkshepKramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="kMAsanaraAkshepSankhya" className="form-label">
                          केवळ माहितीसाठी असणारा आक्षेप संख्या
                        </Label>
                        <Input type="text" className="form-control" id="kMAsanaraAkshepSankhya" value={formData.kMAsanaraAkshepSankhya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="purtataKarvyachyaAkshepancheKramank" className="form-label">
                          पुर्तता करावयाच्या आक्षेपांचे क्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="purtataKarvyachyaAkshepancheKramank" value={formData.purtataKarvyachyaAkshepancheKramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="purtataKarvyachyaAkshepancheSankhya" className="form-label">
                          पुर्तता करावयाच्या आक्षेपांचे संख्या
                        </Label>
                        <Input type="text" className="form-control" id="purtataKarvyachyaAkshepancheSankhya" value={formData.purtataKarvyachyaAkshepancheSankhya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="gpPAkshepancheKramank" className="form-label">
                          ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे क्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="gpPAkshepancheKramank" value={formData.gpPAkshepancheKramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="gpPKeleleAkshepancheSankhya" className="form-label">
                          ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे संख्या
                        </Label>
                        <Input type="text" className="form-control" id="gpPKeleleAkshepancheSankhya" value={formData.gpPKeleleAkshepancheSankhya} onChange={handleInputChange} />
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
                        <Input type="text" className="form-control" id="pKAPtSamitiKadePathvilakramank" value={formData.pKAPtSamitiKadePathvilakramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="pKAPSamitineJPKadePathvalaThravKrmank" className="form-label">
                          पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा ठराव क्रमांक
                        </Label>
                        <Input type="text" className="form-control" id="pKAPSamitineJPKadePathvalaThravKrmank" value={formData.pKAPSamitineJPKadePathvalaThravKrmank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="pKAPSamitineJPKadePathvalychaJavakKrmank" className="form-label">
                          पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा जावक क्रमांक
                        </Label>
                        <Input
                          type="text"
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
                        <Input type="text" className="form-control" id="jPYaniManjurKeleleAkshepKramank" value={formData.jPYaniManjurKeleleAkshepKramank} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="jPYaniManjurKeleleAkshepSankya" className="form-label">
                          जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप संख्या
                        </Label>
                        <Input type="text" className="form-control" id="jPYaniManjurKeleleAkshepSankya" value={formData.jPYaniManjurKeleleAkshepSankya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sAVVKramankPustakiSamayojan" className="form-label">
                          शिल्लक आक्षेपांची वर्गवारी व क्रमांक पुस्तकी समायोजन
                        </Label>
                        <Input type="text" className="form-control" id="sAVVKramankPustakiSamayojan" value={formData.sAVVKramankPustakiSamayojan} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sAVVKramankVasuli" className="form-label">
                          शिल्लक आक्षेपांची वर्गवारी व क्रमांक वसुली
                        </Label>
                        <Input type="text" className="form-control" id="sAVVKramankVasuli" value={formData.sAVVKramankVasuli} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sAVVKramankMulyankan" className="form-label">
                          शिल्लक आक्षेपांची वर्गवारी व क्रमांक मूल्यांकन
                        </Label>
                        <Input type="text" className="form-control" id="sAVVKramankMulyankan" value={formData.sAVVKramankMulyankan} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sAVVKramankNiyambahya" className="form-label">
                          शिल्लक आक्षेपांची वर्गवारी व क्रमांक नियमबाह्य
                        </Label>
                        <Input type="text" className="form-control" id="sAVVKramankNiyambahya" value={formData.sAVVKramankNiyambahya} onChange={handleInputChange} />
                      </div>
                    </Col>
                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="sAVVKramankEkun" className="form-label">
                          शिल्लक आक्षेपांची वर्गवारी व क्रमांक एकूण
                        </Label>
                        <Input type="text" className="form-control" id="sAVVKramankEkun" value={formData.sAVVKramankEkun} onChange={handleInputChange} />
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
                    {/* <Col sm={12}>
                      <Button color="success" onClick={handleSubmit}>
                        अद्यतन करा
                      </Button>
                      <Button color="primary" onClick={handleReset} style={{ marginLeft: "10px" }}>
                        रिसेट करा
                      </Button>
                      <Button color="danger" onClick={() => navigate("/नमुना-३०-अहवाल")} style={{ marginLeft: "10px" }}>
                        रद्द करा
                      </Button>
                    </Col> */}
                  </Row>
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-३०-अहवाल")}>
                      रद्द करा
                    </Button>
                  </ModalFooter>
                </CardBody>
                {/* Show session message if available */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Update30;
