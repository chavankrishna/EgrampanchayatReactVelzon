import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Namuna23 = () => {
  document.title = "नमुना-२३ ताब्यातील रस्त्यांची नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    rastyacheNaaw: "",
    gaawPaasun: "",
    gaawParyant: "",
    laambiKm: "",
    rundiKm: "",
    rastyachaPrakar: "",
    purnKelyachiTarikh: "",
    pratiKmRastaTayarKarnyasAalelaKharch: "",
    durustyaChaluKharchRupaye: "",
    durustyaChaluSwarup: "",
    durustyaWisheshKharchRupaye: "",
    durustyaWisheshSwarup: "",
    durustyaMulBandhkamKharchRupaye: "",
    durustyaMulBandhkamSwarup: "",
    shera: "",
    year: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");
  const [dataList, setDataList] = useState([]);

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
  const [error11, setError11] = useState("");
  const [error12, setError12] = useState("");
  const [error13, setError13] = useState("");
  const [error14, setError14] = useState("");
  const [error15, setError15] = useState("");
  const [error16, setError16] = useState("");

  // Get session message on page load
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
    // Generate Year Range List in Marathi
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

  // Arabic to Marathi digits conversion function
  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    const regex = /^[0-9]+$/;
    const regex1 = /^[A-Za-z\u0900-\u097F\s]+$/;
    const regex3 = /^[A-Za-z0-9\u0900-\u097F\s]+$/;

    if (id === "rastyacheNaaw") {
      if (value === "" || regex1.test(value)) {
        setError1("");
      } else {
        setError1("फक्त अक्षरे आणि स्पेस वापरा");
      }
    } else if (id === "gaawPaasun") {
      if (value === "" || regex1.test(value)) {
        setError2("");
      } else {
        setError2("फक्त अक्षरे आणि स्पेस वापरा");
      }
    } else if (id === "gaawParyant") {
      if (value === "" || regex1.test(value)) {
        setError3("");
      } else {
        setError3("फक्त अक्षरे आणि स्पेस वापरा");
      }
    } else if (id === "laambiKm") {
      if (value === "" || regex.test(value)) {
        setError4("");
      } else {
        setError4("फक्त अंक वापरा");
      }
    } else if (id === "rundiKm") {
      if (value === "" || regex.test(value)) {
        setError5("");
      } else {
        setError5("फक्त अंक वापरा");
      }
    } else if (id === "rastyachaPrakar") {
      if (value === "" || regex3.test(value)) {
        setError6("");
      } else {
        setError6("फक्त अक्षरे, अंक आणि स्पेस वापरा");
      }
    } else if (id === "purnKelyachiTarikh") {
      setError7("");
    } else if (id === "pratiKmRastaTayarKarnyasAalelaKharch") {
      if (value === "" || regex.test(value)) {
        setError8("");
      } else {
        setError8("फक्त अंक वापरा");
      }
    } else if (id === "durustyaChaluKharchRupaye") {
      if (value === "" || regex.test(value)) {
        setError9("");
      } else {
        setError9("फक्त अंक वापरा");
      }
    } else if (id === "durustyaChaluSwarup") {
      if (value === "" || regex3.test(value)) {
        setError10("");
      } else {
        setError10("फक्त अक्षरे, अंक आणि स्पेस वापरा");
      }
    } else if (id === "durustyaWisheshKharchRupaye") {
      if (value === "" || regex.test(value)) {
        setError11("");
      } else {
        setError11("फक्त अंक वापरा");
      }
    } else if (id === "durustyaWisheshSwarup") {
      if (value === "" || regex3.test(value)) {
        setError12("");
      } else {
        setError12("फक्त अक्षरे, अंक आणि स्पेस वापरा");
      }
    } else if (id === "durustyaMulBandhkamKharchRupaye") {
      if (value === "" || regex.test(value)) {
        setError13("");
      } else {
        setError13("फक्त अंक वापरा");
      }
    } else if (id === "durustyaMulBandhkamSwarup") {
      if (value === "" || regex3.test(value)) {
        setError14("");
      } else {
        setError14("फक्त अक्षरे, अंक आणि स्पेस वापरा");
      }
    } else if (id === "year") {
      setError15("");
    } else if (id === "shera") {
      if (value === "" || regex3.test(value)) {
        setError16("");
      } else {
        setError16("फक्त अक्षरे, अंक आणि स्पेस वापरा");
      }
    }
  };

  // Convert date format from dd/mm/yyyy to YYYY-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as YYYY-mm-dd
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "rastyacheNaaw",
      "gaawPaasun",
      "gaawParyant",
      "laambiKm",
      "rundiKm",
      "rastyachaPrakar",
      "purnKelyachiTarikh",
      "pratiKmRastaTayarKarnyasAalelaKharch",
      "durustyaChaluKharchRupaye",
      "durustyaChaluSwarup",
      "durustyaWisheshKharchRupaye",
      "durustyaWisheshSwarup",
      "durustyaMulBandhkamKharchRupaye",
      "durustyaMulBandhkamSwarup",
      "shera",
      "year",
    ];

    // Validate required fields
    const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");
    if (!isFormValid || error1 || error2 || error3 || error4 || error5 || error6 || error7 || error8 || error9 || error10 || error11 || error12 || error13 || error14 || error15 || error16) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे योग्य प्रकारे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      console.error("Validation failed: Missing required fields");
      return;
    }

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        const errorMessage = "प्रवेश नाकारला. कृपया लॉगिन करा.";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any previous success messages
        return;
      }

      console.log("Token retrieved:", token);

      // Modify date format before sending the data
      const formattedData = {
        ...formData,
        purnKelyachiTarikh: convertDateFormat(formData.purnKelyachiTarikh),
      };

      console.log("Formatted data prepared:", formattedData);

      // Send the POST request with the token
      const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${token}`, // Add the token here
        },
      });

      console.log("Server response:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
      console.log("Success message stored in sessionStorage:", successMessage);

      // Navigate to the report page
      navigate("/नमुना-२३-अहवाल");
    } catch (error) {
      console.error("Error during form submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा";
      if (error.response) {
        console.error("Server error response:", error.response);
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      console.log("Error message stored in sessionStorage:", errorMessage);

      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      rastyacheNaaw: "",
      gaawPaasun: "",
      gaawParyant: "",
      laambiKm: "",
      rundiKm: "",
      rastyachaPrakar: "",
      purnKelyachiTarikh: "",
      pratiKmRastaTayarKarnyasAalelaKharch: "",
      durustyaChaluKharchRupaye: "",
      durustyaChaluSwarup: "",
      durustyaWisheshKharchRupaye: "",
      durustyaWisheshSwarup: "",
      durustyaMulBandhkamKharchRupaye: "",
      durustyaMulBandhkamSwarup: "",
      shera: "",
      year: "",
    });
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    const requiredFields = [
      "rastyacheNaaw",
      "gaawPaasun",
      "gaawParyant",
      "laambiKm",
      "rundiKm",
      "rastyachaPrakar",
      "purnKelyachiTarikh",
      "pratiKmRastaTayarKarnyasAalelaKharch",
      "durustyaChaluKharchRupaye",
      "durustyaChaluSwarup",
      "durustyaWisheshKharchRupaye",
      "durustyaWisheshSwarup",
      "durustyaMulBandhkamKharchRupaye",
      "durustyaMulBandhkamSwarup",
      "shera",
      "year",
    ];

    // Validate required fields
    const validateFields = (fields, data) => fields.every((field) => data[field]?.trim() !== "");

    if (!validateFields(requiredFields, formData) || error1 || error2 || error3 || error4 || error5 || error6 || error7 || error8 || error9 || error10 || error11 || error12 || error13 || error14 || error15 || error16) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे योग्य प्रकारे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      console.error("Validation failed: Missing required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formattedData = { ...formData, purnKelyachiTarikh: convertDateFormat(formData.purnKelyachiTarikh) };

      console.log("Formatted Data:", formattedData);

      const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Reset the form fields
      setFormData({
        id: "",
        grampanchayatId: "",
        grampanchayatName: "",
        employeeId: "",
        employeeName: "",
        rastyacheNaaw: "",
        gaawPaasun: "",
        gaawParyant: "",
        laambiKm: "",
        rundiKm: "",
        rastyachaPrakar: "",
        purnKelyachiTarikh: "",
        pratiKmRastaTayarKarnyasAalelaKharch: "",
        durustyaChaluKharchRupaye: "",
        durustyaChaluSwarup: "",
        durustyaWisheshKharchRupaye: "",
        durustyaWisheshSwarup: "",
        durustyaMulBandhkamKharchRupaye: "",
        durustyaMulBandhkamSwarup: "",
        shera: "",
        year: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        console.error("API Error Response:", error.response);
        errorMessage = error.response.data.message; // Use error message from the response
      }

      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [successMessage]);

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
  const breadcrumbTitle = " नमुना-२३ ताब्यातील रस्त्यांची नोंदवही "; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड /  अहवाल-२३  "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२३-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना-२३ ताब्यातील रस्त्यांची नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२३-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rastyacheNaaw" className="form-label">
                            रस्त्यांचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="rastyacheNaaw" value={formData.rastyacheNaaw} onChange={handleInputChange} />
                          {error1 && <div className="text-danger">{error1}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gaawPaasun" className="form-label">
                            गाव पासून
                          </Label>
                          <Input type="text" className="form-control" id="gaawPaasun" value={formData.gaawPaasun} onChange={handleInputChange} />
                          {error2 && <div className="text-danger">{error2}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gaawParyant" className="form-label">
                            गाव पर्यंत
                          </Label>
                          <Input type="text" className="form-control" id="gaawParyant" value={formData.gaawParyant} onChange={handleInputChange} />
                          {error3 && <div className="text-danger">{error3}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="laambiKm" className="form-label">
                            लांबी (किलो मीटर)
                          </Label>
                          <Input type="text" className="form-control" id="laambiKm" value={formData.laambiKm} onChange={handleInputChange} />
                          {error4 && <div className="text-danger">{error4}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rundiKm" className="form-label">
                            रुंदी (किलो मीटर)
                          </Label>
                          <Input type="text" className="form-control" id="rundiKm" value={formData.rundiKm} onChange={handleInputChange} />
                          {error5 && <div className="text-danger">{error5}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rastyachaPrakar" className="form-label">
                            रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा
                          </Label>
                          <Input type="text" className="form-control" id="rastyachaPrakar" value={formData.rastyachaPrakar} onChange={handleInputChange} />
                          {error6 && <div className="text-danger">{error6}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purnKelyachiTarikh" className="form-label">
                            पूर्ण केल्याची तारीख
                          </Label>
                          <Input type="date" className="form-control" id="purnKelyachiTarikh" value={formData.purnKelyachiTarikh} onChange={handleInputChange} />
                          {error7 && <div className="text-danger">{error7}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pratiKmRastaTayarKarnyasAalelaKharch" className="form-label">
                            प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च
                          </Label>
                          <Input type="text" className="form-control" id="pratiKmRastaTayarKarnyasAalelaKharch" value={formData.pratiKmRastaTayarKarnyasAalelaKharch} onChange={handleInputChange} />
                          {error8 && <div className="text-danger">{error8}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaChaluKharchRupaye" className="form-label">
                            दुरुस्त्या चालू खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaChaluKharchRupaye" value={formData.durustyaChaluKharchRupaye} onChange={handleInputChange} />
                          {error9 && <div className="text-danger">{error9}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaChaluSwarup" className="form-label">
                            दुरुस्त्या चालू स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaChaluSwarup" value={formData.durustyaChaluSwarup} onChange={handleInputChange} />
                          {error10 && <div className="text-danger">{error10}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaWisheshKharchRupaye" className="form-label">
                            दुरुस्त्या विशेष खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaWisheshKharchRupaye" value={formData.durustyaWisheshKharchRupaye} onChange={handleInputChange} />
                          {error11 && <div className="text-danger">{error11}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaWisheshSwarup" className="form-label">
                            दुरुस्त्या विशेष स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaWisheshSwarup" value={formData.durustyaWisheshSwarup} onChange={handleInputChange} />
                          {error12 && <div className="text-danger">{error12}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaMulBandhkamKharchRupaye" className="form-label">
                            दुरुस्त्या मूळ बंधकाम खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaMulBandhkamKharchRupaye" value={formData.durustyaMulBandhkamKharchRupaye} onChange={handleInputChange} />
                          {error13 && <div className="text-danger">{error13}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaMulBandhkamSwarup" className="form-label">
                            दुरुस्त्या मूळ बंधकाम स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaMulBandhkamSwarup" value={formData.durustyaMulBandhkamSwarup} onChange={handleInputChange} />
                          {error14 && <div className="text-danger">{error14}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="year" className="form-label">
                            वर्ष
                          </Label>
                          <Input type="select" className="form-control" id="year" value={formData.lekhaparikshanaAhvalcheVrsh} onChange={handleInputChange}>
                            <option value="">वर्ष निवडा</option>
                            {yearRanges.map((yearRange) => (
                              <option key={yearRange} value={yearRange}>
                                {yearRange}
                              </option>
                            ))}
                          </Input>
                          {error15 && <div className="text-danger">{error15}</div>}
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
                            rows="2" // You can adjust the number of rows as needed
                          />
                          {error16 && <div className="text-danger">{error16}</div>}
                        </div>
                      </Col>
                    </Row>
                    <div className="col-lg-12" style={{ marginTop: "20px" }}>
                      <div className="text-end">
                        <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                          जतन करा
                        </Button>
                        <Button color="primary" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                          जतन करून नवीन माहिती भरा
                        </Button>
                        <Button color="warning" onClick={handleReset} style={{ marginRight: "10px" }}>
                          रीसेट करा
                        </Button>
                        <Button color="danger" onClick={() => navigate("/नमुना-२३-अहवाल")}>
                          रद्द करा
                        </Button>
                      </div>
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

export default Namuna23;