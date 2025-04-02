import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent.js";
import BreadCrumb from '../../../Components/Common/BreadCrumb.js';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader.js';
import '../BasicElements/style.css';

function Namuna20() {
  document.title = "कामाच्या अंदाजाची नोंदवही";

  // const navigate = useNavigate();
  
  // Generate an array of the last 100 year ranges
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
    return `${startYearInMarathi}-${endYearInMarathi}`;
  });

  const days = ["१", "२", "३", "४", "५", "६", "७", "८", "९", "१०", "११", "१२", "१३", "१४", "१५", "१६", "१७", "१८", "१९", "२०", "२१", "२२", "२३", "२४", "२५", "२६", "२७", "२८", "२९", "३०", "३१"];
  // Define month names
  const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

  const [formData, setFormData] = useState({
    gramPanchayatId: "",
    gramPanchayatName: "",
    employeeId: "",
    employeeName: "",
    kramank: "",
    nidhicheShirsh: "",
    upaShirsh: "",
    madheHonyachyaSambhavKharchach: "",
    yanniKelelaAndaj: "",
    sarvasadharanGoshwaraParinam: "",
    sarvasadharanGoshwaraBaab: "",
    sarvasadharanGoshwaraDarRupaye: "",
    sarvasadharanGoshwaraPratteki: "",
    sarvasadharanGoshwaraRakkamDashan: "",
    mojmapAndajpatraKramank: "",
    mojmapAndajpatraLaambi: "",
    mojmapAndajpatraRundi: "",
    mojmapAndajpatraKholi: "",
    mojmapAndajpatraParimanDashanshat: "",
    ekun: "",
    year: "",
    remark: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const calculateTotalAmountForMonth = () => {
    let totalAmount = 0;

    // Check the day-wise value and calculate the total
    if (formData.day && formData.value) {
      const valuePerDay = parseFloat(formData.value);
      const dayIndex = parseInt(formData.day, 10) - 1;

      if (valuePerDay && dayIndex >= 0) {
        totalAmount = valuePerDay * (dayIndex + 1); // Multiply value by day count
      }
    }

    // Update the "महिन्याबद्दलची एकूण रक्कम" field with the total calculated
    setFormData((prevData) => ({
      ...prevData,
      mahinyaBaddalchiEkunRakkam: totalAmount.toString(),
    }));
  };

  const handleSubmit = async (formData) => {
    const requiredFields = [
      "lkramank",
      "nidhicheShirsh",
      "upaShirsh",
      "madheHonyachyaSambhavKharchach",
      "yanniKelelaAndaj",
      "sarvasadharanGoshwaraParinam",
      "sarvasadharanGoshwaraBaab",
      "sarvasadharanGoshwaraDarRupaye",
      "sarvasadharanGoshwaraPratteki",
      "sarvasadharanGoshwaraRakkamDashan",
      "mojmapAndajpatraKramank",
      "mojmapAndajpatraLaambi",
      "mojmapAndajpatraRundi",
      "mojmapAndajpatraKholi",
      "mojmapAndajpatraParimanDashanshat",
      "ekun",
      "year",
    ];
    const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== "");

    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return; // Stop submission if any required field is empty
    }

    try {
      const response = await axios.post("http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save", formData, { headers: { "Content-Type": "application/json" } });
      console.log("Response:", response.data);
      alert("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      navigate("/gaurireport");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert("Failed to submit data: " + error.response.data.message || "Unknown error");
      } else {
        alert("Error: " + error.message);
      }
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
      // Common Fields
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      kramank: "",
      nidhicheShirsh: "",
      upaShirsh: "",
      madheHonyachyaSambhavKharchach: "",
      yanniKelelaAndaj: "",
      sarvasadharanGoshwaraParinam: "",
      sarvasadharanGoshwaraBaab: "",
      sarvasadharanGoshwaraDarRupaye: "",
      sarvasadharanGoshwaraPratteki: "",
      sarvasadharanGoshwaraRakkamDashan: "",
      mojmapAndajpatraKramank: "",
      mojmapAndajpatraLaambi: "",
      mojmapAndajpatraRundi: "",
      mojmapAndajpatraKholi: "",
      mojmapAndajpatraParimanDashanshat: "",
      ekun: "",
      year: "",
      remark: "",
    });
  };

  const handleSaveAndAddNew = () => {
    handleSubmit();
    handleReset();
  };

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="कामाच्या अंदाजाची नोंदवही" pageTitle="Forms" className="custom-breadcrumb" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="कामाच्या अंदाजाची नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/Namuna20Report2")} />
                <CardBody className="card-body">
                  <BreadCrumb title="" pageTitle="कृपया माहिती भरा" />
                  <div className="live-preview">
                    <Row className="gy-4">
                      {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatId" className="form-label">ग्रामपंचायत आयडी </Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatId" value={formData.gramPanchayatId} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}

                      {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatName" className="form-label">ग्रामपंचायत नाव</Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatName" value={formData.gramPanchayatName} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}

                      {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="employeeId" className="form-label">कर्मचारी आयडी</Label>
                                                    <Input type="text" className="form-control" id="employeeId" value={formData.employeeId} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}

                      {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="employeeName" className="form-label">कर्मचारी नाव</Label>
                                                    <Input type="text" className="form-control" id="employeeName" value={formData.employeeName} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kramank" className="form-label">
                            क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="kramank" value={formData.kramank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="nidhicheShirsh" className="form-label">
                            निधिचे शीर्ष
                          </Label>
                          <Input type="text" className="form-control" id="nidhicheShirsh" value={formData.nidhicheShirsh} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="upaShirsh" className="form-label">
                            उपशीर्ष
                          </Label>
                          <Input type="text" className="form-control" id="upaShirsh" value={formData.upaShirsh} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="madheHonyachyaSambhavKharchach;" className="form-label">
                            {" "}
                            मध्ये होण्याचा संभाव्य खर्च{" "}
                          </Label>
                          <Input type="text" className="form-control" id="madheHonyachyaSambhavKharchach;" value={formData.madheHonyachyaSambhavKharchach} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="yanniKelelaAndaj" className="form-label">
                            यांनी केलेला अंदाज{" "}
                          </Label>
                          <Input type="text" className="form-control" id="yanniKelelaAndaj" value={formData.yanniKelelaAndaj} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sarvasadharanGoshwaraParinam" className="form-label">
                            सर्व साधारण गोषवर परिणाम{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sarvasadharanGoshwaraParinam" value={formData.sarvasadharanGoshwaraParinam} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sarvasadharanGoshwaraBaab" className="form-label">
                            देयक क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="deyaKramank" value={formData.sarvasadharanGoshwaraBaab} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sarvasadharanGoshwaraDarRupaye" className="form-label">
                            सर्व साधारण गोषवर दर रुपये{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sarvasadharanGoshwaraDarRupaye" value={formData.sarvasadharanGoshwaraDarRupaye} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sarvasadharanGoshwaraPratteki" className="form-label">
                            सर्व साधारण गोषवर प्रत्येकी{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sarvasadharanGoshwaraPratteki" value={formData.sarvasadharanGoshwaraPratteki} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sarvasadharanGoshwaraRakkamDashanshat" className="form-label">
                            सर्व साधारण गोषवर रक्कम दंशशा{" "}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="sarvasadharanGoshwaraRakkamDashanshat"
                            value={formData.sarvasadharanGoshwaraRakkamDashanshat}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mojmapAndajpatraKramank" className="form-label">
                            मोजमाप अंदाजपत्र क्रमांक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="mmojmapAndajpatraKramank" value={formData.mojmapAndajpatraKramank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mojmapAndajpatraLaambi" className="form-label">
                            मोजमाप अंदाजपत्र लांबी{" "}
                          </Label>
                          <Input type="text" className="form-control" id="mojmapAndajpatraLaambi" value={formData.mojmapAndajpatraLaambi} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mojmapAndajpatraRundi" className="form-label">
                            मोजमाप अंदाजपत्र रुंदी{" "}
                          </Label>
                          <Input type="text" className="form-control" id="mojmapAndajpatraRundi" value={formData.mojmapAndajpatraRundi} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mojmapAndajpatraKholi" className="form-label">
                            मोजमाप अंदाजपत्र खोली{" "}
                          </Label>
                          <Input type="text" className="form-control" id="mojmapAndajpatraKholi" value={formData.mojmapAndajpatraKholi} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mojmapAndajpatraParimanDashanshat" className="form-label">
                            मोजमाप अंदाजपत्र परिणाम दंशशा{" "}
                          </Label>
                          <Input type="text" className="form-control" id="mojmapAndajpatraParimanDashanshat" value={formData.mojmapAndajpatraParimanDashanshat} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="ekun" assName="form-label">
                            एकूण
                          </Label>
                          <Input type="ekun" className="form-control" id="ekun" value={formData.ekun} onChange={handleInputChange} required />
                        </div>
                      </Col>

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
                  </div>

                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSaveAndAddNew} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={() => (window.location.href = "/नमुना-२१")} style={{ marginRight: "10px" }}>
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
        </Container>
      </div>
    </React.Fragment>
  );
}


export default Namuna20;
