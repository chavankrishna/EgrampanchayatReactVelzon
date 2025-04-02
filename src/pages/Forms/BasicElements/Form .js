import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Card, CardBody, Container, FormGroup } from "reactstrap";
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Form = () => {
  document.title = "गुंतवणूक वही";

  const initialFormData = {
    guntonukiciTarikha: "",
    guntonukiciTapisila: "",
    guntonukichiRakamDarsaniMulya: "",
    guntonukichiRakamKharēdīKimata: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error
  const navigate = useNavigate();
  useEffect(() => {
    const { type, message } = getSessionMessage(); // Fetch the session message
    if (type && message) {
      if (type === "success") {
        setSuccessMessage(message);
        setErrorMessage("");
      } else if (type === "error") {
        setErrorMessage(message);
        setSuccessMessage("");
      }
    }
  }, []); // Empty array ensures this runs only once when the component is mounted
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Submit form data
  // Handle Submit function in BasicElements component
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Save form data to sessionStorage
      sessionStorage.setItem("formData", JSON.stringify(formData));

      // Set success message
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");

      // Redirect to the report page
      navigate("/report_user");
    } catch (error) {
      console.log(error);
      let errorMessage = error.response?.data?.message || "माहिती यशस्वीरीत्या जतन केली गेली नाही";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
    }
  };

  const renderInputFields = () => {
    return Object.keys(initialFormData).map((field, index) => (
      <Col xxl={3} md={6} key={index}>
        <div>
          <Label htmlFor={field} className="form-label">
            {/* Replace underscores with spaces and capitalize each word */}
            {field.replace(/([A-Z])/g, " $1").toUpperCase()}
          </Label>
          <Input type={field.includes("date") ? "date" : field.includes("number") ? "number" : "text"} className="form-control" id={field} value={formData[field]} onChange={handleInputChange} />
        </div>
      </Col>
    ));
  };
  const handleSaveAndNew = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post("http://localhost:8080/api/guntonukNamuna25/add", formData, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });

      // Save success message and reset form for new entry
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setFormData(initialFormData); // Reset form fields
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Failed to submit data. Please try again later.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
    }
  };
  const breadcrumbTitle = "वापरकर्ता जोडा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड  "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    // "/nikita",              // Path for "२५ - गुंतवणूक वही"
    // "/report"               // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">वापरकर्ता जोडा</h4>
                      </div>
                      <div>
                        {/* <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button> */}
                        <Button color="primary" onClick={() => navigate("/report_user")}>
                          अहवाल
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="live-preview">
                    <Row className="gy-4">
                      {/* Date Picker Fields */}

                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="employee_id" className="form-label">
                            कर्मचारी आयडी{" "}
                          </Label>
                          <Input type="text" className="form-control" id="employee_id" value={formData.employee_id} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="employee_name" className="form-label">
                            कर्मचारी नाव{" "}
                          </Label>
                          <Input type="text" className="form-control" id="employee_name" value={formData.employee_name} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="grampanchyat_id" className="form-label">
                            ग्रामपंचायत आयडी{" "}
                          </Label>
                          <Input type="text" className="form-control" id="grampanchyat_id" value={formData.grampanchyat_id} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="grampanchyat_name" className="form-label">
                            ग्रामपंचायतीचे नाव{" "}
                          </Label>
                          <Input type="text" className="form-control" id="grampanchyat_name" value={formData.grampanchyat_name} onChange={handleInputChange} />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Success/ Error Message */}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}

                  <div className="col-lg-12">
                    <div className="d-flex justify-content-start button-container">
                      <Button color="success" onClick={handleSubmit}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSaveAndNew}>
                        जतन करून नवीन माहिती भरा
                      </Button>

                      <Button color="danger" onClick={() => (window.location.href = "/report")}>
                        रद्द करा
                      </Button>
                      <Button color="primary" onClick={resetForm}>
                        रिसेट करा
                      </Button>
                    </div>
                  </div>

                  {/* 
                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
        <div className="text-start">
            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करा</Button>
            <Button color="success"  style={{ marginRight: '10px' }}>जतन करून नवीन माहिती भरा</Button>
            <Button color="danger" onClick={() => window.location.href = 'cancel_page.php'} style={{ marginRight: '10px' }}>रद्द करा</Button>
            <Button color="primary"  >रिसेट करा</Button>
        </div>
    </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Form;
