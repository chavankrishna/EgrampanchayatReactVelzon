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

const Update22 = () => {
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

      संपादनाचीखरेदीचीकिंवाउभारणीचादिनांक: sanpadanchiKharediKinwaUbharnichaDinank,
      ज्याअन्वयेमालमत्तासंपादितकेलीत्याआदेशाचेवपंचायतठरावाचेदिनांक: jAMSamKTyaadeshacheVPanchTharDinak,
      दिनांक: durustyawarKinwaFerfaravarDinank,
      मालमत्तेचीविल्हेवाटलावण्यासाठीपंचायतीच्याठरावाचादिनांक: malmattechiVilhewatDinank,
      मालमत्तेचीविल्हेवाटलावण्यासाठीकलम५५प्राधिकाऱ्याच्याआदेशाचादिनांक: malmattechiVilhewatKalam55Dinank,
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
          const response = await axios.post(`http://localhost:8080/sthavarMalmatta/getById/${formData.id}`);
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
    // Log the token from sessionStorage or localStorage
    const token = localStorage.getItem("token") || localStorage.getItem("token");
    console.log("Token used for request:", token); // Log the token for debugging purposes

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
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/sthavarMalmatta/updateById/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding token to headers
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-२२-अहवाल");
    } catch (err) {
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
      id: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
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
  const breadcrumbTitle = "ग्रामपंचायत स्थावर मालमत्ता नोंदवही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२२ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२२-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 64%;
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
                        <h4 className="card-title mb-4">ग्रामपंचायत स्थावर मालमत्ता नोंदवही - अद्यतन करा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          <i className="bx bx-arrow-back"></i>मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>
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
                      <Button color="danger" onClick={() => navigate("/report22")} style={{ marginLeft: "10px" }}>
                        रद्द करा
                      </Button>
                    </Col> */}
                  </Row>
                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२२-अहवाल")}>
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

export default Update22;
