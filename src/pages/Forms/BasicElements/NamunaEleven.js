import React, { useState } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent.js";
import BreadCrumb from "../../../Components/Common/BreadCrumb.js";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader.js";
import "../BasicElements/style.css";

const Namuna11 = () => {
  document.title = "किरकोळ मागणी नोंदवही";

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
    jayaniMagnichiRakaGhyavayaachiTyaEsamachaNavaNvaPataa: "",
    maganichiSvarup: "",
    maganisathiPradhikar: "",
    magniHafta: "",
    magniRakam: "",
    magniEkunRakam: "",
    deyaKramank: "",
    deyaKramankTarikha: "",
    vasuliJhaleleRakamakPavtichaKramank: "",
    vasuliJhaleleRakamaPavtichaKramankTarkhi: "",
    vasuliJhaleleRakamaRamkamRupaye: "",
    sutiAadeshachaKramank: "",
    sutiAadeshachaKramankTharki: "",
    suitRakamRupaye: "",
    silaka: "",
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
      jayaniMagnichiRakaGhyavayaachiTyaEsamachaNavaNvaPataa: "",
      maganichiSvarup: "",
      maganisathiPradhikar: "",
      magniHafta: "",
      magniRakam: "",
      magniEkunRakam: "",
      deyaKramank: "",
      deyaKramankTarikha: "",
      vasuliJhaleleRakamakPavtichaKramank: "",
      vasuliJhaleleRakamaPavtichaKramankTarkhi: "",
      vasuliJhaleleRakamaRamkamRupaye: "",
      sutiAadeshachaKramank: "",
      sutiAadeshachaKramankTharki: "",
      suitRakamRupaye: "",
      silaka: "",
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
          <BreadCrumb title=" किरकोळ मागणी नोंदवही " pageTitle="Forms" className="custom-breadcrumb" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="किरकोळ मागणी नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-११")} />
                <CardBody className="card-body">
                  <BreadCrumb title="" pageTitle=" " />
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jayaniMagnichiRakaGhyavayaachiTyaEsamachaNavaNvaPataa" className="form-label">
                            ज्याने मागणीची रकम घ्यावयाची त्या इसमाचे नाव व पत्ता{" "}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="jayaniMagnichiRakaGhyavayaachiTyaEsamachaNavaNvaPataa"
                            value={formData.jayaniMagnichiRakaGhyavayaachiTyaEsamachaNavaNvaPataa}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="maganichiSvarup" className="form-label">
                            मागणीचे स्वरूप
                          </Label>
                          <Input type="text" className="form-control" id="maganichiSvarup" value={formData.maganichiSvarup} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="maganisathiPradhikar" className="form-label">
                            {" "}
                            मागणीसाठी प्राधिकार{" "}
                          </Label>
                          <Input type="text" className="form-control" id="maganisathiPradhikar" value={formData.maganisathiPradhikar} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magniHafta" className="form-label">
                            मागणी हप्ता{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magniHafta " value={formData.magniHafta} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magniRakam" className="form-label">
                            {" "}
                            मागणी रकम{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magniRakam" value={formData.magniRakam} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magniEkunRakam" className="form-label">
                            मागणी एकूण रकम{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magniEkunRakam" value={formData.magniEkunRakam} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="deyaKramank" className="form-label">
                            देयक क्रमांक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="deyaKramank" value={formData.deyaKramank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="deyaKramankTarikha" className="form-label">
                            देयक क्रमांक तारीख{" "}
                          </Label>
                          <Input type="text" className="form-control" id="deyaKramankTarikha" value={formData.deyaKramankTarikha} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vasuliJhaleleRakamakPavtichaKramank" className="form-label">
                            वसूली झालेल्या रकम पावतीचा क्रमांक{" "}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="vasuliJhaleleRakamakPavtichaKramank"
                            value={formData.vasulijhalelerakamakpavtichakramank}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vasuliJhaleleRakamaPavtichaKramankTarkhi" className="form-label">
                            वसूली झालेल्या रकम पावतीचा तारीख
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="vasuliJhaleleRakamaPavtichaKramankTarkhi"
                            value={formData.vasuliJhaleleRakamaPavtichaKramankTarkhi}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vasuliJhaleleRakamaRamkamRupaye" className="form-label">
                            वसूली झालेल्या रकम रुपये
                          </Label>
                          <Input type="text" className="form-control" id="vasuliJhaleleRakamaRamkamRupaye" value={formData.vasuliJhaleleRakamaRamkamRupaye} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sutiAadeshachaKramank" className="form-label">
                            सूट आदेश क्रमांक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sutiAadeshachaKramank" value={formData.sutiAadeshachaKramank} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sutiAadeshachaKramankTharki" className="form-label">
                            {" "}
                            सूट आदेश क्रमांक तारीख{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sutiAadeshachaKramankTharki" value={formData.sutiAadeshachaKramankTharki} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="suitRakamRupaye" className="form-label">
                            सूट रकम रुपये{" "}
                          </Label>
                          <Input type="text" className="form-control" id="suitRakamRupaye" value={formData.suitRakamRupaye} onChange={handleInputChange} required />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="silaka" className="form-label">
                            शिलक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="silaka" value={formData.silaka} onChange={handleInputChange} required />
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

export default Namuna11;
