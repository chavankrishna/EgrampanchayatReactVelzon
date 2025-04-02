import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent.js";
import BreadCrumb from '../../../Components/Common/BreadCrumb.js';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader.js';
import '../BasicElements/style.css';

const Namuna14 = () => {   
  document.title = "मुद्रांक हिशोब नोंदवही";

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
    dinank: "",
    milaleleMudrankPramanakKramank: "",
    milaleleMudrankachiKimmat: "",
    waparleleMudrankPavtiKramankDinank: "",
    waparleleChitkavleleMudrankachiKimmat: "",
    dainikShillak: "",
    shera: "",
    year: "",
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
      "dinank",
      "milaleleMudrankPramanakKramank",
      "milaleleMudrankachiKimmat",
      "waparleleMudrankPavtiKramankDinank",
      "waparleleChitkavleleMudrankachiKimmat",
      "dainikShillak",
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
      dinank: "",
      milaleleMudrankPramanakKramank: "",
      milaleleMudrankachiKimmat: "",
      waparleleMudrankPavtiKramankDinank: "",
      waparleleChitkavleleMudrankachiKimmat: "",
      dainikShillak: "",
      shera: "",
      year: "",
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
          <BreadCrumb title=" मुद्रांक हिशोब नोंदवही " pageTitle="Forms" className="custom-breadcrumb" />

          <Row>
            <Col lg={12}>q
              <Card>
                <PreviewCardHeader title="मुद्रांक हिशोब नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/Namuna14Report2")} />
                <CardBody className="card-body">
                  <BreadCrumb title="" pageTitle=" " />      
                  <div className="live-preview">
                    <Row className="gy-4">     
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dinank" className="form-label">     
                            दिनांक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="dinank" value={formData.dinank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="milaleleMudrankPramanakKramank" className="form-label">
                            मिळालेले मुद्रांक प्रमाणक क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="milaleleMudrankPramanakKramank" value={formData.milaleleMudrankPramanakKramank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="milaleleMudrankachiKimmat" className="form-label">
                            {" "}
                            मिळालेले मुद्रांकची किंमत
                          </Label>
                          <Input type="text" className="form-control" id="milaleleMudrankachiKimmat" value={formData.milaleleMudrankachiKimmat} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="waparleleMudrankPavtiKramankDinank" className="form-label">
                            वापरलेले मुद्रांक पावती क्रमांक दिनांक{" "}   
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="waparleleMudrankPavtiKramankDinank "
                            value={formData.waparleleMudrankPavtiKramankDinank}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="waparleleChitkavleleMudrankachiKimmat" className="form-label">
                            {" "}
                            वापरलेले चिकटवलेले मुद्रांकची किंमत{" "}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="waparleleChitkavleleMudrankachiKimmat"
                            value={formData.waparleleChitkavleleMudrankachiKimmat}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dainikShillak" className="form-label">
                            दैनिक शिल्लक
                          </Label>
                          <Input type="text" className="form-control" id="dainikShillak" value={formData.dainikShillak} onChange={handleInputChange} required />
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
};

export default Namuna14;
