import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../BasicElements/style.css";

const Namuna18Update = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state && formData.grampanchyatId) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/Namuna18KirkolRokadVahi/get_by_id/${formData.id}`);
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
    const requiredFields = ["jamaTarikh", "dhanadeshKramank", "konakadunPraptZala", "jamaTapshil", "jamaRakkam", "agrim", "jamaEkun", "year", "remark"];

    const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");
    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/Namuna18KirkolRokadVahi/update/${formData.id}`, formData, { headers: { "Content-Type": "application/json" } });
      alert("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      navigate("/Namuna18Report");
    } catch (error) {
      alert("Failed to submit data: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      jamaTarikh: "",
      dhanadeshKramank: "",
      konakadunPraptZala: "",
      jamaTapshil: "",
      jamaRakkam: "",
      agrim: "",
      jamaEkun: "",
      // adhyakshari:'',
      year: "",
      remark: "",
    });
  };

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="किरकोळ रोकड वही" pageTitle="फॉर्म" className="custom-breadcrumb" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">किरकोळ रोकड वही- अद्यतन करा</h4>
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
                      { label: " जमा तारीख", id: "jamaTarikh" },
                      { label: "धनादेश क्रमांक", id: "dhanadeshKramank" },

                      { label: "कोणाकडून प्राप्त झाला", id: "konakadunPraptZala" },
                      { label: "जमा तपशील", id: "jamaTapshil" },
                      { label: "जमा रक्कम", id: "jamaRakkam" },
                      { label: "अग्रिम", id: "agrim" },
                      { label: "जमा एकूण", id: "jamaEkun" },
                      //   { label: "अध्यक्षारी", id: "adhyakshari" },

                      {
                        label: "वर्ष",
                        id: "year",
                        type: "dropdown",
                        options: Array.from({ length: 100 }, (_, i) => {
                          const startYear = new Date().getFullYear() - i;
                          const endYear = startYear + 1;
                          return { label: `${startYear}-${endYear}`, value: `${startYear}-${endYear}` };
                        }),
                      },

                      {
                        label: "शेरा",
                        id: "remark",
                        type: "textarea",
                      },
                    ].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
                          {field.type === "dropdown" ? (
                            <Input type="select" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange}>
                              <option value="">निवडा</option>
                              {field.options.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Input>
                          ) : field.type === "textarea" ? (
                            <Input type="textarea" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} rows="3" />
                          ) : (
                            <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button color="danger" onClick={() => navigate("/Namuna18Report")} style={{ marginLeft: "10px" }}>
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

export default Namuna18Update;