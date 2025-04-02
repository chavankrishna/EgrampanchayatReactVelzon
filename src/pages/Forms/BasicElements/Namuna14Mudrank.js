import React, { useState,useEffect } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent.js";
import BreadCrumb from '../../../Components/Common/BreadCrumb.js';
import { Card, CardBody,CardHeader, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader.js';
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";
import '../BasicElements/style.css';
import { useNavigate } from 'react-router-dom'; 

const Namuna14Mudrank = () => {           
  document.title = "मुद्रांक हिशोब नोंदवही";       
  
  const [error,setError] = useState("");       
  const [error1,setError1] = useState("");     
  
  const navigate = useNavigate();                                    

  const [formData, setFormData] = useState({          
   // gramPanchayatName: "",
   // gramPanchayatId: "",
   // employeeName: "",
   // employeeId: "",
   // updateDate: "",
   // createdDate: "",
    mMPramanakKramank: "",     
    mMKimmat: "",
    vMPavatiKramank: "",   
    vMPavatiDinank: "",
    vMChitkavalyachiKimmat: "",
    dainikShillak: "",
    shera: ""
  });


  const [dataList, setDataList] = useState([]); 
  const [successMessage, setSuccessMessage] = useState("");  

  useEffect(() => { 
    // Retrieve success message from sessionStorage
    const storedMessage = sessionStorage.getItem("sessionMessage");  
    if (storedMessage) {
      setSuccessMessage(storedMessage);  // Set the success message in state
      sessionStorage.removeItem("sessionMessage"); 
  
      // Remove the message after 5 seconds (5000ms)
      const timer = setTimeout(() => {
        setSuccessMessage("");  // Clear message after timeout
      }, 5000);
  
      // Cleanup function to clear timeout if component unmounts before timeout completes
      return () => clearTimeout(timer);
    }
  }, []);    
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (navigateOnSuccess = true) => {
    const requiredFields = [
      "mMPramanakKramank",
      "mMKimmat",
      "vMPavatiKramank",
      "vMPavatiDinank",
      "vMChitkavalyachiKimmat",
      "dainikShillak",
      "shera"
    ];
  
    // Check if any field is empty or null
    const isFormValid = requiredFields.every((field) => {
      const value = formData[field];
  
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (typeof value === "number") {
        return !isNaN(value);
      } else if (value instanceof Date) {
        return value.toString() !== "Invalid Date";
      }
      return value !== null && value !== undefined;
    });
  
    if (!isFormValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/namuna14/create", formData, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Response:", response.data);
  
      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";  
      sessionStorage.setItem("sessionMessage", successMessage); 
      setSuccessMessage(successMessage);  // Update state for UI
  
      // Remove the success message after 5 seconds   
      setTimeout(() => {
        setSuccessMessage("");  // Clear state after 5 seconds
        sessionStorage.removeItem("sessionMessage");  // Remove sessionStorage after 5 seconds
      }, 5000);  // 5000ms = 5 seconds    
      
  
      // Navigate to another page if 'navigateOnSuccess' is true
      if (navigateOnSuccess) {
        navigate("/namuna14mudrankreport");
      }
  
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  
  const handleReset = () => {
    setFormData({
      mMPramanakKramank: "",
      mMKimmat: "",
      vMPavatiKramank: "",
      vMPavatiDinank: "",
      vMChitkavalyachiKimmat: "",
      dainikShillak: "",
      shera: "" 
    });
  };
  
  const handleSaveAndAddNew = () => {   
    handleSubmit(false);  // Pass false to prevent navigation on success
    handleReset();   
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
          <BreadCrumb title=" मुद्रांक हिशोब नोंदवही " pageTitle="डॅशबोर्ड" className="ps-4" /> 

          <Row>
            <Col lg={12}> 
              <Card>
               {/* <PreviewCardHeader title="मुद्रांक हिशोब नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/namuna14mudrankreport")} />  */}
                
                <CardHeader>
                  <Row>
                    <Col lg={8}>
                        <h4 className="card-title mb-0">मुद्रांक हिशोब नोंद वही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/namuna14mudrankreport")}>
                        अहवाल
                      </Button>
                    </Col>
                  </Row>
                </CardHeader> 


                <CardBody className="card-body">  
                { successMessage && (
                  <div className="m-4 alert alert-success" role="alert"> 
                    {successMessage}
                  </div>
                )}
                  <div className="live-preview"> 
                    <Row className="gy-4">
                     
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="mMPramanakKramank" className="form-label">
                            मिळालेले मुद्रांक प्रमाणक क्रमांक  
                          </Label>
                          <Input 
                            type="number" 
                            className="form-control" 
                            id="mMPramanakKramank" 
                            value={formData.mMPramanakKramank} 
                            onChange={handleInputChange}   
                          />
                        </div>
                      </Col>  

                      <Col xxl={3} md={3}>        
                        <div>
                          <Label htmlFor="mMKimmat" className="form-label">    
                            मिळालेले मुद्रांकची किंमत     
                          </Label>   
                          <Input 
                            type="number" 
                            className="form-control" 
                            id="mMKimmat" 
                            value={formData.mMKimmat} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </Col>


                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vMPavatiKramank" className="form-label">
                            वापरलेले मुद्रांकची पावती क्रमांक      
                          </Label>   
                          <Input 
                            type="number" 
                            className="form-control" 
                            id="vMPavatiKramank" 
                            value={formData.vMPavatiKramank} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vMPavatiDinank" className="form-label">
                            वापरलेले मुद्रांक पावती दिनांक {" "}   
                          </Label>
                          <Input
                                type="date"
                                id="vMPavatiDinank"
                                className="form-control"
                                value={formData.vMPavatiDinank}  
                                max={new Date().toISOString().split("T")[0]} // Restrict future dates
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value <= new Date().toISOString().split("T")[0]) {   
                                        setFormData((prev) => ({ ...prev, vMPavatiDinank: value }));   
                                        setError1(""); // Clear error if valid
                                    } else {
                                        setError1("Future dates are not allowed!");
                                        }
                                }}   
                          />
                          {error1 && <small className="text-danger">{error1}</small>} {/* Error message */}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vMChitkavalyachiKimmat" className="form-label">
                            {" "}
                            वापरलेले चिकटवलेले मुद्रांकची किंमत{" "}
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="vMChitkavalyachiKimmat" 
                            value={formData.vMChitkavalyachiKimmat}
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
                          <Input 
                            type="number" 
                            className="form-control" 
                            id="dainikShillak" 
                            value={formData.dainikShillak} 
                            onChange={handleInputChange} 
                          />
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
                        </div>
                      </Col>

                    </Row>  
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>  
                    <div className="text-start">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="primary" onClick={handleSaveAndAddNew} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="warning" onClick={handleReset}  style={{ marginRight: "10px" }} >
                        रिसेट करा
                      </Button>    
                      <Button color="danger" onClick={() => (window.location.href = "/namuna14mudrankreport")} style={{ marginRight: "10px" }}>
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

export default Namuna14Mudrank;
 
