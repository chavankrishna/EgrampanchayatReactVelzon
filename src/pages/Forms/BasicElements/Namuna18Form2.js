import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent";

import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';



const Namuna18Form2 = () => {
  document.title = "Namuna 18";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kharchTarikh: "",
    kharchTapshil: "",
    konasRakkamDili: "",
    kharchRakkam: "",
    agrimatunKharch: "",
    kharchEkun: "",
    //adhyakshari:'',
    kharchYear: "",
    kharchShera: "",
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
      kharchTarikh: "",
      kharchTapshil: "",
      konasRakkamDili: "",
      kharchRakkam: "",
      agrimatunKharch: "",
      kharchEkun: "",
      //adhyakshari:'',
      kharchYear: "",
      kharchShera: "",
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
                  onButtonClick={() => navigate("/Namuna18Report2")} // Use navigate directly
                />

                <CardBody className="card-body">
                  {/* <BreadCrumb title="फॉर्म" pageTitle="Home" /> */}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchTarikh" className="form-label">
                            खर्च तारीख
                          </Label>
                          <Input type="date" className="form-control" id="kharchTarikh" value={formData.kharchTarikh} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchTapshil" className="form-label">
                            खर्च तपशील
                          </Label>
                          <Input type="text" className="form-control" id="kharchTapshil" value={formData.kharchTapshil} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="konasRakkamDili" className="form-label">
                            कोणास रक्कम दिली
                          </Label>
                          <Input type="text" className="form-control" id="konasRakkamDili" value={formData.konasRakkamDili} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchRakkam" className="form-label">
                            खर्च रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="kharchRakkam" value={formData.kharchRakkam} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="agrimatunKharch" className="form-label">
                            अग्रिमातून खर्च
                          </Label>
                          <Input type="text" className="form-control" id="agrimatunKharch" value={formData.agrimatunKharch} onChange={handleInputChange} />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchEkun" className="form-label">
                            खर्च एकूण
                          </Label>
                          <Input type="text" className="form-control" id="kharchEkun" value={formData.kharchEkun} onChange={handleInputChange} />
                        </div>
                      </Col>

                      {/* <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="kharchYear" className="form-label">जमा एकूण</Label>
                                                    <Input type="text" className="form-control" id="kharchYear" value={formData.kharchYear} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
                      {/* <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="adhyakshari" className="form-label">अध्यक्षारी</Label>
                                                    <Input type="text" className="form-control" id="adhyakshari" value={formData.adhyakshari} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchYear" className="form-label">
                            वर्ष
                          </Label>
                          <Input type="select" id="kharchYear" value={formData.kharchYear} onChange={handleInputChange}>
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
                          <Label htmlFor="kharchShera" className="form-label">
                            शेरा
                          </Label>
                          <textarea
                            className="form-control"
                            id="kharchShera"
                            value={formData.kharchShera}
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

export default Namuna18Form2;