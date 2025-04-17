import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Namuna06Update = () => {  
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(state || {}); 
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
      });

    useEffect(() => {
      if (!state && formData.grampanchyatId) {
          const fetchRecord = async () => {
              try {
                  const response = await axios.post(`http://localhost:8080/Namuna06JamaRakmanchiNondvahi/get_by_id/${formData.id}`);
                  setFormData(response.data);
              } catch (err) {
                  console.error('Error fetching record:', err);
                  setError('Error fetching record');
              }
          };
          fetchRecord();
      }
  }, [state, formData.id]);


  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");       
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        //const newValue = value ? value : '';

        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
  
        const regex1 = /^[\u0900-\u097Fa-zA-Z\s]+$/;   // For Marathi and English letters and spaces
        const regex2 = /^[\u0966-\u096F0-9]+$/; // For Marathi digits and Arabic numerals
        const regex3 = /^[\u0900-\u097F\u0966-\u096Fa-zA-Z0-9\s]+$/; // for marathi and english letters and digits and spaces

        if(id==="lekhaShirsh")
          {
              if(value ==="" || regex1.test(value) )
              {
                  setError1("");
              }
              else
              {
                  setError1("only marathi and english letters are allowed");
              }
          }
          else if(id==="arthsankalpiyaAnudan")
          {
              if(value ==="" || regex2.test(value) )
              {
                  setError2("");
              }
              else
              {
                  setError2("only marathi and english digits are allowed");
              }
          }
          else if(id==="mahinyaBaddalchiEkunRakkam")
          {
              if(value ==="" || regex2.test(value) )
              {
                  setError3("");
              }
              else
              {
                  setError3("only marathi and english digits are allowed");
              }
          }
          else if(id==="maghilMahinyachaAkherparyantchiRakkam")
          {
              if(value ==="" || regex2.test(value) )
              {
                  setError4("");
              }
              else
              {
                  setError4("only marathi and english digits are allowed");
              }
          }
          else if(id==="maghePasunPudheChaluEkunRakkam")
          {
              if(value ==="" || regex2.test(value) )
              {
                  setError5("");
              }
              else
              {
                  setError5("only marathi and english digits are allowed");
              }
          }
          else if(id==="value")
          {
              if(value ==="" || regex2.test(value) )
              {
                  setError6("");
              }
              else
              {
                  setError6("only marathi and english digits are allowed");
              }
          }
          else if(id==="shera")
          {
              if(value ==="" || regex3.test(value) )
              {
                  setError7("");
              }
              else
              {
                  setError7("only marathi and english letters and digits are allowed");
              }
          }
    };



    const handleSubmit = async () => {
        setLoading(true);
         const requiredFields = [
            "lekhaShirsh",
            "shera",
            "arthsankalpiyaAnudan",
            "mahinyaBaddalchiEkunRakkam",
            "maghilMahinyachaAkherparyantchiRakkam",
            "maghePasunPudheChaluEkunRakkam",
            "day",
            "value",
            "month",
            "year",
          // Add other required fields here if any
        ];

        


 
        try {

          // Check if any required field is empty
        const hasEmptyFields = requiredFields.some((field) => {
          const value = formData[field];
          return value === undefined || value === null || value.toString().trim() === "";
        });

        // Check for validation errors or empty fields
        if (
          error1 || error2 || error3 || error4 || error5 ||
          error6 || error7 || hasEmptyFields 
        ) {
          setErrorMessage("कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.");
          setSuccessMessage("");
           // Auto-clear error after 5 seconds
          setTimeout(() => {
            setErrorMessage("");
          }, 3000); 
    
          return; // stop submission if errors or empty fields
        }

          // Retrieve the token from localStorage
      console.log("Retrieving token from localStorage..."); // Log token retrieval
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User not authenticated."); // Log missing token
        throw new Error("User not authenticated. Please log in.");
      }
      console.log("Token retrieved successfully:", token); // Log retrieved token

      // Send the update request with token in the headers
      console.log("Sending data to the server:", formData); // Log data being sent

          const response = await axios.post(
              `http://localhost:8080/Namuna06JamaRakmanchiNondvahi/update/${formData.id}`,
              formData,
              { headers: { 'Content-Type': 'application/json' } }
          );
      

          console.log("Server response received:", response.data); // Log server response
          const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
          sessionStorage.setItem("sessionMessage", successMessage); // Store success message
          setSuccessMessage(successMessage);
          setErrorMessage(""); // Clear error messages
         
          //alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
          navigate('/नमुना-६-अहवाल'); // Navigate back to the report page after successful update
          
      } catch (err) {
        console.error("Error updating data:", err); // Log error details

        // Handle error
        let errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message; // Use error message from response
        }
        console.log("Error message:", errorMessage); // Log error message
        sessionStorage.setItem("sessionMessage", errorMessage); // Store error message
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success messages
      } finally {
        setLoading(false); // Stop loading
        console.log("Form submission completed."); // Log completion
      }
    }; 

    const handleReset = () => {
        setFormData({
            shera: '', year: '',
            lekhaShirsh: '', arthsankalpiyaAnudan: '', mahinyaBaddalchiEkunRakkam: '',
            maghilMahinyachaAkherparyantchiRakkam: '', maghePasunPudheChaluEkunRakkam: '',
            day: '', value: '', month: ''
        });
    };

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
                    <BreadCrumb title="जमा रकमांची नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
                    <Row className="gy-4"> 
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                  {/* Show session message if available */}
                                   {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                                    <Row className="gy-4">
                                        <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4 className="card-title mb-4">जमा रकमांची नोंदवही- अद्यतन करा</h4>
                                            </div>
                                            <div>
                                                <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="gy-4">
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="lekhaShirsh" className="form-label">लेखाशीर्ष</Label>
                                            <Input type="text" id="lekhaShirsh" value={formData.lekhaShirsh} onChange={handleInputChange} placeholder="लेखाशीर्ष" />
                                            {error1 && <span className="text-danger">{error1}</span>}
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="arthsankalpiyaAnudan" className="form-label">अर्थसंकल्पीय अनुदान</Label>
                                            <Input type="text" id="arthsankalpiyaAnudan" value={formData.arthsankalpiyaAnudan} onChange={handleInputChange} placeholder="अर्थसंकल्पीय अनुदान" />
                                            {error2 && <span className="text-danger">{error2}</span>}
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="mahinyaBaddalchiEkunRakkam" className="form-label">महिन्या बद्दलची एकूण रक्कम</Label>
                                            <Input type="text" id="mahinyaBaddalchiEkunRakkam" value={formData.mahinyaBaddalchiEkunRakkam} onChange={handleInputChange} placeholder="महिन्या बद्दलची एकूण रक्कम" />
                                            {error3 && <span className="text-danger">{error3}</span>}
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="maghilMahinyachaAkherparyantchiRakkam" className="form-label">मागील महिन्याचा अखेर पर्यंतची रक्कम</Label>
                                            <Input type="text" id="maghilMahinyachaAkherparyantchiRakkam" value={formData.maghilMahinyachaAkherparyantchiRakkam} onChange={handleInputChange} placeholder="मागील महिन्याचा अखेर पर्यंतची रक्कम" />
                                            {error4 && <span className="text-danger">{error4}</span>}
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="maghePasunPudheChaluEkunRakkam" className="form-label">मागे पासून पुढे चालू एकूण रक्कम</Label>
                                            <Input type="text" id="maghePasunPudheChaluEkunRakkam" value={formData.maghePasunPudheChaluEkunRakkam} onChange={handleInputChange} placeholder="मागे पासून पुढे चालू एकूण रक्कम" />
                                            {error5 && <span className="text-danger">{error5}</span>}
                                        </Col>  
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="day" className="form-label">दिवस</Label>
                                            <Input type="text" id="day" value={formData.day} onChange={handleInputChange} placeholder="दिवस" />    
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="value" className="form-label">मूल्य</Label>
                                            <Input type="text" id="value" value={formData.value} onChange={handleInputChange} placeholder="मूल्य" />
                                            {error6 && <span className="text-danger">{error6}</span>} 
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="year" className="form-label">वर्ष</Label>
                                            <Input type="text" id="year" value={formData.year} onChange={handleInputChange} placeholder="वर्ष" />
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="shera" className="form-label">शेरा</Label>
                                            <Input type="text" id="shera" value={formData.shera} onChange={handleInputChange} placeholder="शेरा" />
                                            {error7 && <span className="text-danger">{error7}</span>}   
                                        </Col>
                                        <Col xxl={3} md={6} xs={12}>
                                            <Label htmlFor="month" className="form-label">महिना</Label>
                                            <Input type="text" id="month" value={formData.month} onChange={handleInputChange} placeholder="महिना" />
                                        </Col>
                                    </Row>
                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
                                      <div className="d-flex justify-content-end flex-wrap gap-2">
                                        <Button color="success" onClick={handleSubmit}>अद्यतन करा</Button>
                                        <Button color="danger" onClick={() => navigate('/नमुना-६-अहवाल')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
                                        <Button color="primary" onClick={handleReset} style={{ marginLeft: '10px' }}>रिसेट करा</Button>
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

export default Namuna06Update; 



