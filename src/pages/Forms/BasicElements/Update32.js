import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker"; // Importing DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

// Define the authorities array here
const authorities = ["Authority 1", "Authority 2", "Authority 3", "Authority 4"];

const Update32 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Id :", formData.id);

  const handleDateChange = (dileliMulRakkamDate) => {
    setFormData((prevData) => ({
      ...prevData,
      दिलेलीमूळरक्कमदिनांक: dileliMulRakkamDate, // Update the specific date field
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
          const response = await axios.post(`http://localhost:8080/rakkampartavya/getById/${formData.id}`);
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
    const requiredFields = ["pavtiNumber", "dileliMulRakkamDate", "rakkam", "thevidaracheNav", "partavaKarnaryaPradhikaryacheNav", "shera"];

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

      // Make the API request with the token
      const response = await axios.post(`http://localhost:8080/rakkampartavya/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });

      // Success message and redirection
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-३२-अहवाल");
    } catch (err) {
      // Error handling
      let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; // Use specific message from server if available
      }
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setFormData({
      // gramPanchayatId: "",
      // gramPanchayatName: "",
      // employeeId: "",
      // employeeName: "",
      pavtiNumber: "",
      dileliMulRakkamDate: "", // Reset date to null
      rakkam: "",
      paratKaryachiRakkam: "",
      thevidaracheNav: "",
      partavaKarnaryaPradhikaryacheNav: "",
      shera: "",
    });
  };
  const breadcrumbTitle = "रक्कमेच्या परताव्यासाठीचा आदेश - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३२ "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३२-अहवाल", // Path for "२५ - गुंतवणूक वही"
    "", // Path for "अहवाल-२५"
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
                    {[
                      //   { label: "पावती क्रमांक", id: "pavtiNumber" },
                      //   { label: "रक्कम", id: "rakkam" },
                      //   { label: "परत करावयाची रकम", id: "paratKaryachiRakkam" },
                      //   { label: "ठेवीदाराचे नाव", id: "thevidaracheNav" },
                      //   { label: "परतावा करणाऱ्या प्राधिकाऱ्याचे नाव", id: "partavaKarnaryaPradhikaryacheNav" },
                      //   { label: "शेरा", id: "shera" },
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
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pavtiNumber" className="form-label">
                            पावती क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="pavtiNumber" value={formData.pavtiNumber} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dileliMulRakkamDate" className="form-label">
                            दिलेली मूळ रक्कम दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="dileliMulRakkamDate" value={formData.dileliMulRakkamDate} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rakkam" className="form-label">
                            रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="rakkam" value={formData.rakkam} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="paratKaryachiRakkam" className="form-label">
                            परत करावयाची रकम
                          </Label>
                          <Input type="text" className="form-control" id="paratKaryachiRakkam" value={formData.paratKaryachiRakkam} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="thevidaracheNav" className="form-label">
                            ठेवीदाराचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="thevidaracheNav" value={formData.thevidaracheNav} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="partavaKarnaryaPradhikaryacheNav" className="form-label">
                            परतावा करणाऱ्या प्राधिकाऱ्याचे नाव
                          </Label>
                          <Input type="select" className="form-control" id="partavaKarnaryaPradhikaryacheNav" value={formData.partavaKarnaryaPradhikaryacheNav} onChange={handleInputChange}>
                            <option value="">प्राधिकाऱ्याचे नाव</option>
                            {authorities.map((authority, index) => (
                              <option key={index} value={authority}>
                                {authority}
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
                  </Row>
                  {/* <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-३२-अहवाल")} style={{ marginLeft: "10px" }}>
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
                    <Button color="danger" onClick={() => navigate("/नमुना-३२-अहवाल")}>
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

export default Update32;
