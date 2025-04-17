import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";

const UpdatePage = () => {
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(state || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
        if (!state && formData.id) {
            const fetchRecord = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/kirkolmagni_11/getBYID/${formData.id}`);
                    setFormData(response.data);
                } catch (err) {
                    console.error('Error fetching record:', err);
                    setError('Error fetching record');
                }
            };
            fetchRecord();
        }
    }, [state, formData.id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const newValue = value ? value : '';

        setFormData(prevData => ({
            ...prevData,
            [id]: newValue
        }));

    const regex = /^[0-9]+$/; // Allows digits only 
    const regex1 = /^[A-Za-z\s]+$/; // Allows English letters and spaces 
    const regex2 = /^[0-9\u0966-\u096F]+-[0-9\u0966-\u096F]+$/; // Allows Marathi digits and hyphen 
    const regex3 = /^[A-Za-z0-9\s]+$/;   // Allow English letters, digits, and spaces  

    if(id === "propertyOwnerName")
    {
        if(value==="" || regex1.test(value) )
        {
            setError1("");
        }
        else
        {
            setError1("कृपया इंग्रजी अक्षरे वापरा");
        }
    }
    else if(id === "magniche_Swarup" )
    {
        if(value==="" || regex1.test(value) )
        {
            setError2("");
        }
        else
        {
            setError2("कृपया इंग्रजी अक्षरे वापरा");
        }
    }
    else if(id === "magnisathi_Pradhikar" )
    {
      if(value==="" || regex1.test(value) )
      {
          setError3("");
      }
      else
      {
          setError3("कृपया इंग्रजी अक्षरे वापरा");
      }
    }
    else if(id === "magni_Happta")
    {
      if(value==="" || regex.test(value))
      {
          setError4("");
      }
      else
      {
          setError4("कृपया अंक टाका");
      }
    }
    else if(id === "magni_Rakam")
    {
      if(value==="" || regex.test(value) )
      {
          setError5("");
      }
      else
      {
          setError5("कृपया अंक टाका");
      }
    }
    else if (id === "deyakramankOR_Date") {
      const selectedDate = new Date(value);
      const now = new Date(); // current system date and time
    
      if (!value) {
        setError6("कृपया तारीख निवडा");
      } else if (selectedDate.getTime() > now.getTime()) {
        setError6("तारीख व वेळ वर्तमान वेळेपेक्षा पुढे असू शकत नाही");
      } else {
        setError6("");
      }
    }
    else if(id === "vasuli_PavtiKramankOR_Date") 
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
    else if(id === "vasuli_Rakam")
    {
      if(value==="" || regex.test(value) )
      {
          setError8("");
      }
      else
      {
          setError8("कृपया अंक टाका");
      }
    }
    else if(id === "sut_AadheshachaKramankOR_Date")
    {
      const selectedDate = new Date(value);    
      const now = new Date(); // current system date and time   
    
      if (!value) {
        setError9("कृपया तारीख निवडा");
      } else if (selectedDate.getTime() > now.getTime()) {
        setError9("तारीख व वेळ वर्तमान वेळेपेक्षा पुढे असू शकत नाही");
      } else {
        setError9("");
      }
    }
    else if(id === "sut_Rakam")
    {
      if(value==="" || regex.test(value) )
      {
          setError10("");
      }
      else
      {
          setError10("कृपया अंक टाका");
      }
    }
    else if(id === "shillak")
    {
      if(value==="" || regex3.test(value) )
      {
          setError11("");
      }
      else
      {
          setError11("कृपया इंग्रजी अक्षरे वापरा");
      }
    }
    else if(id === "shera") 
    {
        if(value==="" || regex3.test(value) )
        {
            setError12("");
        }
        else
        {
            setError12("कृपया इंग्रजी अक्षरे वापरा");
        }
    }
 };

    const handleSubmit = async () => { 
        setLoading(true);
        const requiredFields = [
            //"gramPanchayatId",
            //"gramPanchayatName",
            //"employeeId",
            //"employeeName",
        
            "propertyOwnerName",
            "magniche_Swarup",
            "magnisathi_Pradhikar",
            "magni_Happta",
            "magni_Rakam",
            "magni_Total",
            "deyakramankOR_Date",
            "vasuli_PavtiKramankOR_Date",
            "vasuli_Rakam",
            "sut_AadheshachaKramankOR_Date",
            "sut_Rakam",
            "shillak",
            "shera",
            "year",
          ];

        // const isFormValid = requiredFields.every(field => formData[field]?.trim() !== '');
        // if (!isFormValid) {
        //     alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
        //     setLoading(false);
        //     return;
        // }

            // Check if any required field is empty
            const hasEmptyFields = requiredFields.some((field) => {
                const value = formData[field];
                return value === undefined || value === null || value.toString().trim() === "";
            });
        
            if (
                error1 || error2 || error3 || error4 || error5 ||
                error6 || error7 || error8 || error9 || error10 || error11 || error12 || hasEmptyFields
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
            const response = await axios.post(
                `http://localhost:8080/kirkolmagni_11/updateById/${formData.id}`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            // Handle success
            console.log("Server response received:", response.data); // Log server response
            const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
            sessionStorage.setItem("sessionMessage", successMessage); // Store success message
            setSuccessMessage(successMessage);
            setErrorMessage("");
            navigate('/नमुना-११-अहवाल');   
        } catch (error) {
            alert('Failed to submit data: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
             // gramPanchayatId: "",
            // gramPanchayatName: "",
            // employeeId: "",
            // employeeName: "",

            propertyOwnerName: "", 
            magniche_Swarup: "",
            magnisathi_Pradhikar: "",
            magni_Happta: "",
            magni_Rakam: "",
            magni_Total: "",
            deyakramankOR_Date: "",
            vasuli_PavtiKramankOR_Date: "",
            vasuli_Rakam: "",
            sut_AadheshachaKramankOR_Date: "",
            sut_Rakam: "",
            shillak: "",
            shera: "",
            year: "",
       
        });
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="किरकोळ मागणी नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                         {/* Show session message if available */}
                                         {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                                         <Row className="gy-4">
                                            <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h4 className="card-title mb-4">किरकोळ मागणी नोंदवही- अद्यतन करा</h4>
                                                </div>
                                                <div>
                                                    <Button color="primary" onClick={() => navigate(-1)}>
                                                        <i className="bx bx-arrow-back"></i> मागे जा  
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="gy-4">
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="propertyOwnerName" className="form-label">ज्याने मागणीची रकम घ्यावयाची त्या इसमाचे नाव व पत्ता{" "}</Label>
                                                    <Input type="text" className="form-control" id="propertyOwnerName" value={formData.propertyOwnerName} onChange={handleInputChange} />  
                                                    {error1 && <div className="text-danger">{error1}</div>}
                                                </div>
                                            </Col> 

                                            <Col xxl={3} md={3}> 
                                                <div>
                                                    <Label htmlFor="magniche_Swarup" className="form-label">मागणीचे स्वरूप</Label>
                                                    <Input type="text" className="form-control" id="magniche_Swarup" value={formData.magniche_Swarup} onChange={handleInputChange} />
                                                    {error2 && <div className="text-danger">{error2}</div>}
                                                </div>
                                            </Col>  

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="magnisathi_Pradhikar" className="form-label">मागणीसाठी प्राधिकार</Label>
                                                    <Input type="text" className="form-control" id="magnisathi_Pradhikar" value={formData.magnisathi_Pradhikar} onChange={handleInputChange} />
                                                    {error3 && <div className="text-danger">{error3}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="magni_Happta" className="form-label">मागणी हप्ता</Label>
                                                    <Input type="text" className="form-control" id="magni_Happta" value={formData.magni_Happta} onChange={handleInputChange} />
                                                    {error4 && <div className="text-danger">{error4}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="magni_Rakam" className="form-label">मागणी रक्कम</Label>
                                                    <Input type="text" className="form-control" id="magni_Rakam" value={formData.magni_Rakam} onChange={handleInputChange} />
                                                    {error5 && <div className="text-danger">{error5}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="magni_Total" className="form-label">मागणी एकूण रक्कम</Label>
                                                    <Input type="text" className="form-control" id="magni_Total" value={formData.magni_Total} onChange={handleInputChange} />
                                                    
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="deyakramankOR_Date" className="form-label">देयक क्रमांक / तारीख</Label>
                                                    <Input type="text" className="form-control" id="deyakramankOR_Date" value={formData.deyakramankOR_Date} onChange={handleInputChange} />
                                                    {error6 && <div className="text-danger">{error6}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="vasuli_PavtiKramankOR_Date" className="form-label">वसूली पावती क्रमांक / तारीख</Label>
                                                    <Input type="text" className="form-control" id="vasuli_PavtiKramankOR_Date" value={formData.vasuli_PavtiKramankOR_Date} onChange={handleInputChange} />
                                                    {error7 && <div className="text-danger">{error7}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="vasuli_Rakam" className="form-label">वसूली रक्कम</Label>
                                                    <Input type="text" className="form-control" id="vasuli_Rakam" value={formData.vasuli_Rakam} onChange={handleInputChange} />
                                                    {error8 && <div className="text-danger">{error8}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="sut_AadheshachaKramankOR_Date" className="form-label">सूट आदेशाचा क्रमांक / तारीख</Label>
                                                    <Input type="text" className="form-control" id="sut_AadheshachaKramankOR_Date" value={formData.sut_AadheshachaKramankOR_Date} onChange={handleInputChange} />
                                                    {error9 && <div className="text-danger">{error9}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="sut_Rakam" className="form-label">सूट रक्कम</Label>
                                                    <Input type="text" className="form-control" id="sut_Rakam" value={formData.sut_Rakam} onChange={handleInputChange} />
                                                    {error10 && <div className="text-danger">{error10}</div>} 
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="shillak" className="form-label">शिलक</Label>
                                                    <Input type="text" className="form-control" id="shillak" value={formData.shillak} onChange={handleInputChange} />
                                                    {error11 && <div className="text-danger">{error11}</div>} 
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="shera" className="form-label">शेरा</Label>
                                                    <Input type="text" className="form-control" id="shera" value={formData.shera} onChange={handleInputChange} />
                                                    {error12 && <div className="text-danger">{error12}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="year" className="form-label">वर्ष</Label>
                                                    <Input type="text" className="form-control" id="year" value={formData.year} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="col-lg-12" style={{ marginTop: "20px" }}>
                                          <div className="d-flex justify-content-end flex-wrap gap-2"> 
                                            <Button color="success" onClick={handleSubmit}>अद्यतन करा</Button>
                                            <Button color="danger" onClick={() => navigate('/नमुना-११-अहवाल')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
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

export default UpdatePage;