import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";

const UpdatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state && formData.grampanchyatId) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/Namuna06JamaRakmanchiNondvahi/get_by_id/${formData.id}`);
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
    const requiredFields = [
      "lekhaShirsh",
      "arthsankalpiyaAnudan",
      "mahinyaBaddalchiEkunRakkam",
      "maghilMahinyachaAkherparyantchiRakkam",
      "maghePasunPudheChaluEkunRakkam",
      "day",
      "value",
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
      const response = await axios.post("http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save", formData, { headers: { "Content-Type": "application/json" } });
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
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      createdDate: "",
      updatedDate: "",
      shera: "",
      year: "",
      lekhaShirsh: "",
      arthsankalpiyaAnudan: "",
      mahinyaBaddalchiEkunRakkam: "",
      maghilMahinyachaAkherparyantchiRakkam: "",
      maghePasunPudheChaluEkunRakkam: "",
      day: "",
      value: "",
      month: "",
    });
  };
  y;

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
                      { label: "लेखाशिर्ष", id: "lekhaShirsh" },
                      { label: " अर्थसंकलपीयअनुदान", id: "arthsankalpiyaAnudan" },
                      { label: "मासिकबदलचीकुलरक्कम", id: "mahinyaBaddalchiEkunRakkam" },
                      { label: "मागीलमहिन्याचाअखेरपर्यंतचीरक्कम", id: "maghilMahinyachaAkherparyantchiRakkam" },
                      { label: "मागेपासूनपुढेचालूएकूनरक्कम", id: "maghePasunPudheChaluEkunRakkam" },
                      { label: "दिवस", id: "day" },
                      { label: "मूल्य", id: "value" },
                      { label: "महिना", id: "month" },
                      { label: "वर्ष", id: "year" },
                      { label: "शेरा", id: "shera" },
                    ].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
                          {field.type === "select" ? (
                            <Input type="select" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange}>
                              {field.options.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Input>
                          ) : (
                            <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                          ) 
                          }
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-०६-अहवाल")} style={{ marginLeft: "10px" }}>
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

export default UpdatePage;
