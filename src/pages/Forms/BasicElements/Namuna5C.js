import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { getSessionMessage } from "../BasicElements/finalconfig";

const namuna5C = () => {
  document.title = "नमुना नं.५ दैनिक रोकड वही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pavtiKramank: "",
    konakdunMilali: "",
    jamaRakkamTapshil: "",
    rokhRakkam: "",
    dhanadeshRakkam: "",
    dhanadeshKinvaRakkamJamaDinank: "",
    dhanadeshVatvilyachaDinank: "",
    shera: "",
    date: "",
    year: "",
    month: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  const [error8, setError8] = useState("");
  const [error9, setError9] = useState("");
  const [error10, setError10] = useState("");

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

    const currentYear = new Date().getFullYear();
    const ranges = Array.from({ length: 100 }, (_, i) => {
      const startYear = currentYear - i;
      const endYear = startYear + 1;
      const startYearInMarathi = arabicToMarathiDigits(startYear);
      const endYearInMarathi = arabicToMarathiDigits(endYear);
      return `${startYearInMarathi} - ${endYearInMarathi}`;
    });
    setYearRanges(ranges);
  }, []);

  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const regex = /^[0-9]+$/;
    const regex1 = /^[A-Za-z\s]+$/;
    const regex3 = /^[A-Za-z0-9\s]+$/;

    if (id === "pavtiKramank") {
      if (value === "" || regex.test(value)) {
        setError1("");
      } else {
        setError1("Allows only digits");
      }
    } else if (id === "konakdunMilali") {
      if (value === "" || regex1.test(value)) {
        setError2("");
      } else {
        setError2("allow only letters and spaces )");
      }
    } else if (id === "jamaRakkamTapshil") {
      if (value === "" || regex1.test(value)) {
        setError3("");
      } else {
        setError3("Allows English letters and spaces ");
      }
    } else if (id === "rokhRakkam") {
      if (value === "" || regex.test(value)) {
        setError4("");
      } else {
        setError4("allows only digits");
      }
    } else if (id === "dhanadeshRakkam") {
      if (value === "" || regex.test(value)) {
        setError5("");
      } else {
        setError5("allows only digits");
      }
    } else if (id === "dhanadeshKinvaRakkamJamaDinank") {
      if (value === "" || regex3.test(value)) {
        setError6("");
      }
    } else if (id === "dhanadeshVatvilyachaDinank") {
      if (value === "" || regex3.test(value)) {
        setError7("");
      }
    } else if (id === "month") {
      setError8("");
    } else if (id === "shera") {
      if (value === "" || regex3.test(value)) {
        setError9("");
      } else {
        setError9("कृपया योग्य शेरा भरा(allow only letters and digits)");
      }
    } else if (id === "year") {
      setError10("");
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "pavtiKramank",
      "konakdunMilali",
      "jamaRakkamTapshil",
      "rokhRakkam",
      "dhanadeshRakkam",
      "dhanadeshKinvaRakkamJamaDinank",
      "dhanadeshVatvilyachaDinank",
      "shera",
      "year",
      "month"
    ];

    const hasEmptyFields = requiredFields.some((field) => {
      const value = formData[field];
      return value === undefined || value === null || value.toString().trim() === "";
    });

    if (
      error1 || error2 || error3 || error4 || error5 ||
      error6 || error7 || error8 || error9 || error10 || hasEmptyFields
    ) {
      setErrorMessage("कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await axios.post(
        "http://localhost:8080/Namuna5C_DainikRokadVahi/save",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-५-अहवाल");
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };
  const handleReset = () => {
    setFormData({
      pavtiKramank: "",
      konakdunMilali: "",
      jamaRakkamTapshil: "",
      rokhRakkam: "",
      dhanadeshRakkam: "",
      dhanadeshKinvaRakkamJamaDinank: "",
      dhanadeshVatvilyachaDinank: "",
      shera: "",
      date: "",
      year: "",
      month: "",
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

  const handleSubmit1 = async () => {
    const token = localStorage.getItem("token");

    const requiredFields = [
      "pavtiKramank",
      "konakdunMilali",
      "jamaRakkamTapshil",
      "rokhRakkam",
      "dhanadeshRakkam",
      "dhanadeshKinvaRakkamJamaDinank",
      "dhanadeshVatvilyachaDinank",
      "shera",
      "year",
      "month"
    ];

    const hasEmptyFields = requiredFields.some((field) => {
      const value = formData[field];
      return value === undefined || value === null || value.toString().trim() === "";
    });

    if (
      error1 || error2 || error3 || error4 || error5 ||
      error6 || error7 || error8 || error9 || error10 || hasEmptyFields
    ) {
      setErrorMessage("कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/Namuna5C_DainikRokadVahi/save",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      setFormData({
        pavtiKramank: "",
        konakdunMilali: "",
        jamaRakkamTapshil: "",
        rokhRakkam: "",
        dhanadeshRakkam: "",
        dhanadeshKinvaRakkamJamaDinank: "",
        dhanadeshVatvilyachaDinank: "",
        shera: "",
        date: "",
        year: "",
        month: "",
      });
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const breadcrumbTitle = "दैनिक रोकड वही";
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-५ ";
  const breadcrumbPaths = [
    "/dashboard",
    "/नमुना-५-अहवाल",
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
              justify-content: center;
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
                <PreviewCardHeader title="नमुना-५ - दैनिक रोकड वही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-५-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pavtiKramank" className="form-label">
                            पावती क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="pavtiKramank" value={formData.pavtiKramank} onChange={handleInputChange} />
                          {error1 && <div className="text-danger">{error1}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="konakdunMilali" className="form-label">
                            कोणाकडून मिळाली ते
                          </Label>
                          <Input type="text" className="form-control" id="konakdunMilali" value={formData.konakdunMilali} onChange={handleInputChange} />
                          {error2 && <div className="text-danger"> {error2} </div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaRakkamTapshil" className="form-label">
                            जमा रकमे संबंधी तपशील
                          </Label>
                          <Input type="text" className="form-control" id="jamaRakkamTapshil" value={formData.jamaRakkamTapshil} onChange={handleInputChange} />
                          {error3 && <div className="text-danger">{error3}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rokhRakkama" className="form-label">
                            रोख रक्कम रुपये
                          </Label>
                          <Input type="text" className="form-control" id="rokhRakkam" value={formData.rokhRakkam} onChange={handleInputChange} />
                          {error4 && <div className="text-danger">{error4}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dhanadeshRakkam" className="form-label">
                            धनादेश चेक रुपये
                          </Label>
                          <Input type="text" className="form-control" id="dhanadeshRakkam" value={formData.dhanadeshRakkam} onChange={handleInputChange} />
                          {error5 && <div className="text-danger">{error5}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dhanadeshKinvaRakkamJamaDinank" className="form-label">
                            धनादेश बँकेत जमा केल्याचा दिनांक
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="dhanadeshKinvaRakkamJamaDinank"
                            name="dhanadeshKinvaRakkamJamaDinank"
                            value={formData.dhanadeshKinvaRakkamJamaDinank}
                            onChange={handleInputChange}
                          />
                          {error6 && <div className="text-danger">{error6}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dhanadeshVatvilyachaDinank" className="form-label">
                            रोख रक्कम जमा केल्याचा दिनांक
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="dhanadeshVatvilyachaDinank"
                            name="dhanadeshVatvilyachaDinank"
                            value={formData.dhanadeshVatvilyachaDinank}
                            onChange={handleInputChange}
                          />
                          {error7 && <div className="text-danger">{error7}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="month" className="form-label">
                            महिना
                          </Label>
                          <Input type="select" id="month" value={formData.month} onChange={handleInputChange}>
                            <option value="">महिना निवडा</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", { month: "long" })}
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
                            {yearRanges.map((range, index) => (
                              <option key={index} value={range}>
                                {range}
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
                            rows="3"
                          />
                          {error9 && <small style={{ color: "red" }}>{error9}</small>}
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
                      <Button color="primary" onClick={() => navigate("/नमुना-५-अहवाल")}>
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

export default namuna5C;