import React, { useState } from "react";
import { Input, Button, Table } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

const Namuna18Form = () => {
  document.title = "Namuna 18";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jamaTarikh: "",
    dhanadeshKramank: "",
    konakadunPraptZala: "",
    jamaTapshil: "",
    jamaRakkam: "",
    agrim: "",
    jamaEkun: "",
    //adhyakshari:'',
    year: "",
    remark: "",
  });

  const arabicToMarathiDigits = (num) => {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((digit) => marathiDigits[parseInt(digit)])
      .join("");
  };

  // const currentYear = new Date().getFullYear();
  // const yearOptions = Array.from({ length: 100 }, (_, i) => ${currentYear - i} : ${currentYear - i + 1});
  const currentYear = new Date().getFullYear();
  const yearRanges = Array.from({ length: 100 }, (_, i) => {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    const startYearInMarathi = arabicToMarathiDigits(startYear);
    const endYearInMarathi = arabicToMarathiDigits(endYear);
    return `${startYearInMarathi}-${endYearInMarathi}`;
  });

  const [dataList, setDataList] = useState([]); // State for fetched data

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    console.log("Sending data:", formData);
    try {
      const response = await axios.post("http://localhost:8080/Namuna18KirkolRokadVahi/save", formData, { headers: { "Content-Type": "application/json" } });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) console.error("Error response data:", error.response.data);
    }
  };
  console.log("data", formData.year);
  // New function to fetch all data
  const fetchAllData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/Namuna18KirkolRokadVahi/getall"); // Replace with your actual endpoint
      console.log("Fetched data:", response.data);
      setDataList(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) console.error("Error response data:", error.response.data);
    }
  };
  // const handleSaveAndAddNew = () => {
  //     // handleSubmit();
  //     handleReset();
  // };
  const handleReset = () => {
    setFormData({
      jamaTarikh: "",
      dhanadeshKramank: "",
      konakadunPraptZala: "",
      jamaTapshil: "",
      jamaRakkam: "",
      agrim: "",
      jamaEkun: "",
      //adhyakshari:'',
      year: "",
      remark: "",
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
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="किरकोळ रोकड वही" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title={<span style={{ fontWeight: "bold" }}>किरकोळ रोकड वही</span>}
                  buttonLabel="अहवाल"
                  onButtonClick={() => navigate("/Namuna18Report")} // Use navigate directly
                />

                <CardBody className="card-body">
                  {/* <BreadCrumb title="फॉर्म" pageTitle="Home" /> */}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaTarikh" className="form-label">
                            जमा तारीख
                          </Label>
                          <Input type="date" className="form-control" id="jamaTarikh" value={formData.jamaTarikh} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dhanadeshKramank" className="form-label">
                            धनादेश क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="dhanadeshKramank" value={formData.dhanadeshKramank} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="konakadunPraptZala" className="form-label">
                            कोणाकडून प्राप्त झाला
                          </Label>
                          <Input type="text" className="form-control" id="konakadunPraptZala" value={formData.konakadunPraptZala} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaTapshil" className="form-label">
                            जमा तपशील
                          </Label>
                          <Input type="text" className="form-control" id="jamaTapshil" value={formData.jamaTapshil} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaRakkam" className="form-label">
                            जमा रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="jamaRakkam" value={formData.jamaRakkam} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="agrim" className="form-label">
                            अग्रिम
                          </Label>
                          <Input type="text" className="form-control" id="agrim" value={formData.agrim} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaEkun" className="form-label">
                            जमा एकूण
                          </Label>
                          <Input type="text" className="form-control" id="jamaEkun" value={formData.jamaEkun} onChange={handleInputChange} />
                        </div>
                      </Col>
                      {/* <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="adhyakshari" className="form-label">अध्यक्षारी</Label>
                                                    <Input type="text" className="form-control" id="adhyakshari" value={formData.adhyakshari} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="year" className="form-label">
                            वर्ष
                          </Label>
                          <Input type="select" id="year" value={formData.year} onChange={handleInputChange}>
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
                          <Label htmlFor="remark" className="form-label">
                            शेरा
                          </Label>
                          <textarea
                            className="form-control"
                            id="remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                            rows="4" // You can adjust the number of rows as needed
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={() => (window.location.href = "/report13")} style={{ marginRight: "10px" }}>
                        रद्द करा
                      </Button>
                      <Button color="primary" onClick={handleReset}>
                        रिसेट करा
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Section to display fetched data */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Namuna18Form;
