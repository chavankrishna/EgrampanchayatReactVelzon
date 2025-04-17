import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

import { date } from "jszip/dist/jszip";      

const Namuna2 = () => {  
  document.title = "नमुना-२ - पुनर्विनियोजन व नियत वाटप यांचे विवरणपत्र";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // employeeId: "",
    // employeeName: "",
    // grampanchayatId: "",
    // grampanchayatName: "",
    jamaRakmecheMukhyaShirshak: "",
    manjurArthsankalp: "",
    sudharitAndaz: "",
    sudharitAdhikVaja: "",
    kharchachePramukhShirsh: "",
    manjurRakkam: "",
    kharchachaSudharitAndaz: "",
    kharchachaAdhikVaja: "",
    shera: "",
    month: "",
    year: "",
    dnyapanRupees: ""
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
  }, [dataList]);

  // Arabic to Marathi digits conversion function
  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    //setFormData({ ...formData, [id]: value });
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const regex = /^[0-9]+$/; // Allows digits only
    const regex1 = /^[A-Za-z\s]+$/; // Allows English letters and spaces 
    const regex2 = /^[0-9\u0966-\u096F]+-[0-9\u0966-\u096F]+$/; // Allows Marathi digits and hyphen 
    const regex3 = /^[A-Za-z0-9\s]+$/;   // Allow English letters, digits, and spaces   



    if(id === "jamaRakmecheMukhyaShirshak")
    {
      if(value ==="" || regex1.test(value))
      {
        setError1("");
      }
      else
      {
        setError1("Allows English letters and spaces");
      }
    }
    else if(id === "manjurArthsankalp")
    {
      if(value ==="" || regex.test(value))
      {
        setError2("");
      }
      else
      {
        setError2("कृपया योग्य मंजूर अर्थसंकल्प भरा(allows only digits)");
      }
    }
    else if(id === "sudharitAndaz")
    {
      if(value ==="" || regex.test(value))
      {
        setError3("");
      }
      else
      {
        setError3("कृपया योग्य सुधारित अंदाज भरा(allows only digits)");
      }
    }
    else if(id === "sudharitAdhikVaja")
    {
      if(value ==="" || regex.test(value))
      {
        setError4("");
      }
      else
      {
        setError4("कृपया योग्य सुधारित अधिक(+) किंवा वजा(-) भरा(allows only digits)");
      }
    }
    else if(id === "kharchachePramukhShirsh")
    {
      if(value ==="" || regex1.test(value))
      {
        setError5("");
      }
      else
      {
        setError5("कृपया योग्य खर्चाचे प्रमुख शिर्षक भरा(allow only letters and spaces)");
      }
    }
    else if(id === "manjurRakkam")
    {
      if(value ==="" || regex.test(value))
      {
        setError6("");
      }
        else
        {
            setError6("कृपया योग्य मंजूर रक्कम भरा(allows only digits)");
        }
    }
    else if(id === "kharchachaSudharitAndaz")
    {
      if(value ==="" || regex.test(value))
      {
        setError7("");
      }
      else
      {
        setError7("कृपया योग्य खर्चाचा सुधारित अंदाज भरा(allows only digits)");
      }
    }
    else if(id === "kharchachaAdhikVaja")
    {
      if(value ==="" || regex.test(value))
      {
        setError8("");
      }
      else
      {
        setError8("कृपया योग्य खर्चाचा अधिक(+) किंवा वजा(-) भरा(allows only digits)");
      }
    }
    else if(id === "shera")
    {
      if(value ==="" || regex3.test(value))
      {
        setError9("");
      }
      else
      {
        setError9("कृपया योग्य शेरा भरा(allow only letters and digits)");
      }
    }
    else if(id === "dnyapanRupees")
    {
      if(value ==="" || regex.test(value))
      {
        setError10("");
      }
      else
      {
        setError10("कृपया योग्य ज्ञापन रुपये भरा(allows only digits)");
      }
    }

  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };


  const handleSubmit = async () => {
    // List all required fields
    const requiredFields = [
      "jamaRakmecheMukhyaShirshak",
      "manjurArthsankalp",
      "sudharitAndaz",
      "sudharitAdhikVaja",
      "kharchachePramukhShirsh",
      "manjurRakkam",
      "kharchachaSudharitAndaz",
      "kharchachaAdhikVaja",
      "shera",
      "dnyapanRupees",
      // Add other required fields here if any
    ];
  
    // Check if any required field is empty
    const hasEmptyFields = requiredFields.some((field) => {
      const value = formData[field];
      return value === undefined || value === null || value.toString().trim() === "";
    });
  
    // Check for validation errors or empty fields
    if (
      error1 || error2 || error3 || error4 || error5 ||
      error6 || error7 || error8 || error9 || error10 || hasEmptyFields
    ) {
      setErrorMessage("कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.");
      setSuccessMessage("");
       // Auto-clear error after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); 

      return; // stop submission if errors or empty fields
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }
  
      const response = await axios.post(
        "http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/save",
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
      navigate("/नमुना-२-अहवाल");
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
       // employeeId: "",
       // employeeName: "",
       // grampanchayatId: "",
       // grampanchayatName: "",
        jamaRakmecheMukhyaShirshak: "",
        manjurArthsankalp: "",
        sudharitAndaz: "",
        sudharitAdhikVaja: "",
        kharchachePramukhShirsh: "",
        manjurRakkam: "",
        kharchachaSudharitAndaz: "",
        kharchachaAdhikVaja: "",
        shera: "",
        month: "",
        year: "",
        dnyapanRupees: ""
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
    console.log("Sending data:", formData); 
    const token = localStorage.getItem("token");
    console.log("Inside Submit Token: ", token);
  
    const requiredFields = [
      "jamaRakmecheMukhyaShirshak",
      "manjurArthsankalp",
      "sudharitAndaz",
      "sudharitAdhikVaja",
      "kharchachePramukhShirsh",
      "manjurRakkam",
      "kharchachaSudharitAndaz",
      "kharchachaAdhikVaja",
      "shera",
      "dnyapanRupees",
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
  
      // ❗ Automatically hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
  
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/save",
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
  
      // ✅ Automatically hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
  
      console.log("Response:", response.data);
  
      // Clear all fields after success
      setFormData({
        jamaRakmecheMukhyaShirshak: "",
        manjurArthsankalp: "",
        sudharitAndaz: "",
        sudharitAdhikVaja: "",
        kharchachePramukhShirsh: "",
        manjurRakkam: "",
        kharchachaSudharitAndaz: "",
        kharchachaAdhikVaja: "",
        shera: "",
        month: "",
        year: "",
        dnyapanRupees: "",
      });
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
  
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");
  
      // ❗ Automatically hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
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


  const breadcrumbTitle = "पुनर्विनियोजन व नियत वाटप यांचे विवरणपत्र"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"  
    "/नमुना-२-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना-२ - पुनर्विनियोजन व नियत वाटप यांचे विवरणपत्र" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="jamaRakmecheMukhyaShirshak" className="form-label">
                             जमा रकमेचे मुख्य शिर्षक
                          </Label>
                          <Input type="text" className="form-control" id="jamaRakmecheMukhyaShirshak" value={formData.jamaRakmecheMukhyaShirshak} onChange={handleInputChange} />
                          {error1 && <div className="text-danger">{error1}</div>}
                        </div>
                      </Col> 
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurArthsankalp" className="form-label">
                            मंजूर अर्थसंकल्प 
                          </Label>
                          <Input type="text" className="form-control" id="manjurArthsankalp" value={formData.manjurArthsankalp} onChange={handleInputChange} /> 
                          { error2 && <div className="text-danger"> {error2} </div> }
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sudharitAndaz" className="form-label">
                            सुधारित अंदाज
                          </Label>
                          <Input type="text" className="form-control" id="sudharitAndaz" value={formData.sudharitAndaz} onChange={handleInputChange} />
                          {error3 && <div className="text-danger">{error3}</div>}
                        </div>
                      </Col>  
                      <Col xxl={3} md={3}>  
                        <div>
                          <Label htmlFor="sudharitAdhikVaja" className="form-label"> 
                            सुधारित अधिक(+) किंवा वजा(-) 
                          </Label>
                          <Input type="text" className="form-control" id="sudharitAdhikVaja" value={formData.sudharitAdhikVaja} onChange={handleInputChange} />
                          {error4 && <div className="text-danger">{error4}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchachePramukhShirsh" className="form-label">
                            खर्चाचे प्रमुख शिर्षक
                          </Label>
                          <Input type="text" className="form-control" id="kharchachePramukhShirsh" value={formData.kharchachePramukhShirsh} onChange={handleInputChange} />
                          {error5 && <div className="text-danger">{error5}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurRakkam" className="form-label">
                            मंजूर रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="manjurRakkam" value={formData.manjurRakkam} onChange={handleInputChange} />
                          {error6 && <div className="text-danger">{error6}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchachaSudharitAndaz" className="form-label">
                            खर्चाचा सुधारित अंदाज
                          </Label>
                          <Input type="text" className="form-control" id="kharchachaSudharitAndaz" value={formData.kharchachaSudharitAndaz} onChange={handleInputChange} />
                          {error7 && <div className="text-danger">{error7}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="kharchachaAdhikVaja" className="form-label">
                            खर्चाचा अधिक(+) किंवा वजा(-) 
                          </Label>
                          <Input type="text" className="form-control" id="kharchachaAdhikVaja" value={formData.kharchachaAdhikVaja} onChange={handleInputChange} />
                          {error8 && <div className="text-danger">{error8}</div>}
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
                                    rows="3" // You can adjust the number of rows as needed
                                />
                            {error9 && <small style={{ color: "red" }}>{error9}</small>}
                                                   
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
                        <Col>
                            <div>
                            <Label htmlFor="dnyapanRupees" className="form-label">
                                ज्ञापन रुपये 
                            </Label>
                            <Input type="text" className="form-control" id="dnyapanRupees" value={formData.dnyapanRupees} onChange={handleInputChange} />
                            {error10 && <div className="text-danger">{error10}</div>}
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
                      <Button color="primary" onClick={() => navigate("/नमुना-३३-अहवाल")}>
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

export default Namuna2;
