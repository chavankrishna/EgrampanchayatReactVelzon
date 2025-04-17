import React, { useState, useEffect } from "react";

import { Input, Button, Row, Col, Label, Card, CardBody, Container, FormGroup } from "reactstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent"; // Import session management functions

const Namuna13 = () => {
  document.title = "नमुना १३ - कर्मचारी  वर्गाची सूची व वेतनश्रेणी नोंदवही " ; // Set the document title

  const navigate = useNavigate();

  const initialFormData = {
    padnaam: "",
    padanchiSankhya: "",
    manjurPadAdeshKramank: "",
    manjurPadAdeshDinank: "",
    purnakalikAnshkalik: "",
    manjurWetanShreni: "",
    karmacharyacheNaav: "",
    niyuktiDinank: "",
    year: "",
    remark: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error

  //const [yearRanges, setYearRanges] = useState([]);
  
  const [dataList, setDataList] = useState([]);

    const [error1,setError1] = useState("");
    const [error2,setError2] = useState("");
    const [error3,setError3] = useState("");
    const [error4,setError4] = useState("");
    const [error5,setError5] = useState("");
    const [error6,setError6] = useState("");
    const [error7,setError7] = useState("");
    const [error8,setError8] = useState("");
    const [error9,setError9] = useState("");
    const [error10,setError10] = useState("");
    const [error11,setError11] = useState("");
    const [error12,setError12] = useState("");
  
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
    
    const regex = /^[0-9]+$/; // Allows digits only
    const regex1 = /^[A-Za-z\s]+$/; // Allows English letters and spaces 
    const regex2 = /^[0-9\u0966-\u096F]+-[0-9\u0966-\u096F]+$/; // Allows Marathi digits and hyphen 
    const regex3 = /^[A-Za-z0-9\s]+$/;   // Allow English letters, digits, and spaces  

    if(id ==="padanchiSankhya")
    {
      if(value === "" || regex.test(value))
      {
        setError1("");
      }
      else
      {
        setError1("कृपया फक्त अंक भरा");
      }
    }
    else if(id === "manjurPadAdeshKramank")
    {
      if(value ==="" || regex.test(value))
      {
        setError2("");
      }
      else
      {
        setError2("कृपया फक्त अंक भरा");
      }
    }
    else if(id === "purnakalikAnshkalik")
    {
      if(value === "" || regex1.test(value))
      {
        setError3("");
      }
      else
      {
        setError3("कृपया फक्त इंग्रजी अक्षरे भरा");
      }
    }
    else if(id === "manjurWetanShreni")
    {
      if(value === "" || regex1.test(value))
      {
        setError4("");
      }
      else
      {
        setError4("कृपया फक्त इंग्रजी अक्षरे भरा");
      }
    }
    else if(id === "karmacharyacheNaav")
    {
      if(value === "" || regex1.test(value))
      {
        setError5("");
      }
      else
      {
        setError5("कृपया फक्त इंग्रजी अक्षरे भरा");
      }
    }
    else if(id === "remark")
    {
      if(value === "" || regex3.test(value))
      {
        setError6("");
      }
      else
      {
        setError6("कृपया इंग्रजी अक्षरे, अंक भरा");
      }
    }
    else if(id === "manjurPadAdeshDinank")
    {
        const selectedDate = new Date(value);    
        const now = new Date(); // current system date and time   
      
        if (!value) {
          setError7("कृपया तारीख निवडा");
        } else if (selectedDate.getTime() > now.getTime()) {
          setError7("तारीख व वेळ वर्तमान वेळेपेक्षा पुढे असू शकत नाही");
        } else {
          setError7("");
        }
    }
    else if(id === "niyuktiDinank")
    {
        const selectedDate = new Date(value);    
        const now = new Date(); // current system date and time   
      
        if (!value) {
          setError8("कृपया तारीख निवडा");
        } else if (selectedDate.getTime() > now.getTime()) {
          setError8("तारीख व वेळ वर्तमान वेळेपेक्षा पुढे असू शकत नाही");
        } else {
          setError8("");
        }
    }


  };

  const resetForm = () => {
    setFormData(initialFormData);
  };
  const dropDown = ["option1", "option2", "option3", "option4"];

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
    return `${startYearInMarathi} -${endYearInMarathi}`;
  });

  const handleSubmit = async () => {
    const requiredFields = [
      "padnaam",
      "padanchiSankhya",
      "manjurPadAdeshKramank",
      "manjurPadAdeshDinank",
      "purnakalikAnshkalik",
      "manjurWetanShreni",
      "karmacharyacheNaav",
      "niyuktiDinank",
      "year",
      "remark",
    ];

       // Check if any required field is empty
       const hasEmptyFields = requiredFields.some((field) => {
        const value = formData[field];
        return value === undefined || value === null || value.toString().trim() === "";
      });
  
      if (
        error1 || error2 || error3 || error4 || error5 ||
        error6 || error7 || error8 || hasEmptyFields
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
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/karmachari-varg-wetan-shreni/create",
        formData, // Use the entire formData object directly
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Correctly send the token in the Authorization header
          },
        }
      );

      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");
      navigate("/नमुना-१३-अहवाल");

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

  // const renderInputFields = () => {
  //   return Object.keys(initialFormData).map((field, index) => (
  //     <Col xxl={3} md={6} key={index}>
  //       <div>
  //         <Label htmlFor={field} className="form-label">
  //           {/* Replace underscores with spaces and capitalize each word */}
  //           {field.replace(/([A-Z])/g, " $1").toUpperCase()}
  //         </Label>
  //         <Input type={field.includes("date") ? "date" : field.includes("number") ? "number" : "text"} className="form-control" id={field} value={formData[field]} onChange={handleInputChange} />
  //       </div>
  //     </Col>
  //   ));
  // };

  const handleSaveAndNew = async () => {
    const requiredFields = [
      "padnaam",
      "padanchiSankhya",
      "manjurPadAdeshKramank",
      "manjurPadAdeshDinank",
      "purnakalikAnshkalik",
      "manjurWetanShreni",
      "karmacharyacheNaav",
      "niyuktiDinank",
      "year",
      "remark",
    ];

    // Validate required fields
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        const errorMessage = `कृपया '${field}' क्षेत्र भरा!`; // Customize field name for user-friendly message
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success message
        return; // Stop the submission
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post("http://localhost:8080/karmachari-varg-wetan-shreni/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Save success message and reset form for new entry
      sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setSuccessMessage("माहिती यशस्वीरीत्या जतन केली गेली आहे");
      setErrorMessage(""); // Clear error messages
      setFormData(initialFormData); // Reset form fields for new entry
    } catch (error) {
      let errorMessage = error.response?.data?.message || "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear success message
    }
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData); 
    const token = localStorage.getItem("token");
    console.log("Inside Submit Token: ", token);

    const requiredFields = [
      "padnaam",
      "padanchiSankhya",
      "manjurPadAdeshKramank",
      "manjurPadAdeshDinank",
      "purnakalikAnshkalik",
      "manjurWetanShreni",
      "karmacharyacheNaav",
      "niyuktiDinank",
      "year",
      "remark",
    ];

       // Check if any required field is empty
       const hasEmptyFields = requiredFields.some((field) => {
        const value = formData[field];
        return value === undefined || value === null || value.toString().trim() === "";
      });
  
      if (
        error1 || error2 || error3 || error4 || error5 ||
        error6 || error7 || error8 || hasEmptyFields
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
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   console.error("No token found");
      //   return;
      // }
      const response = await axios.post(
        "http://localhost:8080/karmachari-varg-wetan-shreni/create",
        formData, // Use the entire formData object directly
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Correctly send the token in the Authorization header
          },
        }
      );

      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage("");

       // ✅ Automatically hide success message after 5 seconds
       setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      console.log("Response:", response.data);

      setFormData(initialFormData);

    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
  
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage("");

      //❗Automatically hide error message after 5 seconds
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


const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
);  

  // Define months for the select dropdown
const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
const breadcrumbTitle = "नमुना १३ - कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही"; // This could be dynamic
const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-१३ "; // Dynamic page title

const breadcrumbPaths = [
  "/dashboard", // Path for "डॅशबोर्ड"
  "/नमुना-१३-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना १३ - कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-१३-अहवाल")} />
                <CardBody>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}

                  <div className="live-preview">
                    <Row className="gy-4">
                      {/* Date Picker Fields */}
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="padnaam" className="form-label">
                            पदनाम
                          </Label>
                          <Input type="select" className="form-control" id="padnaam" value={formData.padnaam} onChange={handleInputChange}>
                            <option value="">Select padnaam</option>
                            {dropDown.map((padnaam, index) => (
                              <option key={index} value={padnaam}>
                                {padnaam}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="padanchiSankhya" className="form-label">
                            पदांची संख्या
                          </Label>
                          <Input type="text" className="form-control" id="padanchiSankhya" value={formData.padanchiSankhya} onChange={handleInputChange} />
                          {error1 && <div style={{ color: "red" }}>{error1}</div>} 
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurPadAdeshKramank" className="form-label">
                            मंजूर पदे आदेश क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="manjurPadAdeshKramank" value={formData.manjurPadAdeshKramank} onChange={handleInputChange} />
                          {error2 && <div style={{ color: "red" }}>{error2}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurPadAdeshDinank" className="form-label">
                            मंजूर पदे आदेश दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="manjurPadAdeshDinank" value={formData.manjurPadAdeshDinank} onChange={handleInputChange} />
                          {error7 && <div style={{ color: "red" }}>{error7}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purnakalikAnshkalik" className="form-label">
                            पूर्णकालिक/अंशकालिक
                          </Label>
                          <Input type="text" className="form-control" id="purnakalikAnshkalik" value={formData.purnakalikAnshkalik} onChange={handleInputChange} />
                          {error3 && <div style={{ color: "red" }}>{error3}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="manjurWetanShreni" className="form-label">
                            मंजूर वेतन श्रेणी
                          </Label>
                          <Input type="text" className="form-control" id="manjurWetanShreni" value={formData.manjurWetanShreni} onChange={handleInputChange} />
                          {error4 && <div style={{ color: "red" }}>{error4}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="karmacharyacheNaav" className="form-label">
                            नियुक्त केलेल्या कर्मचाऱ्यांचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="karmacharyacheNaav" value={formData.karmacharyacheNaav} onChange={handleInputChange} />
                          {error5 && <div style={{ color: "red" }}>{error5}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="niyuktiDinank" className="form-label">
                            नियुक्तीचा दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="niyuktiDinank" value={formData.niyuktiDinank} onChange={handleInputChange} />
                          {error8 && <div style={{ color: "red" }}>{error8}</div>}
                        </div> 
                      </Col>

                      {/* <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dainikRokadBahithilJamaRakam" className="form-label">दैनिक रोकड वहीतील जमा रक्कम </Label>
                                                    <Input type="number" className="form-control" id="dainikRokadBahithilJamaRakam" value={formData.dainikRokadBahithilJamaRakam} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="prakritischiTapasni" className="form-label">प्रक्रांतीचा तपशील </Label>
                                                    <Input type="text" className="form-control" id="prakritischiTapasni" value={formData.prakritischiTapasni} onChange={handleInputChange} />
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
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="remark" className="form-label">
                            शेरा
                          </Label>
                          <Input type="textarea" className="form-control" id="remark" value={formData.remark} onChange={handleInputChange} />
                          {error6 && <div style={{ color: "red" }}>{error6}</div>}
                        </div>
                      </Col> 
                    </Row>
                  </div>

                  {/* Success/ Error Message */}
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="d-flex justify-content-end flex-wrap gap-2"> 
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={resetForm} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="primary" onClick={() => (window.location.href = "/नमुना-१३-अहवाल")}>
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

export default Namuna13;
