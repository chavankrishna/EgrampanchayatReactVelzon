import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useLocation, useNavigate } from 'react-router-dom';
//import { useNavigate } from "react-router-dom"; 



const Namuna06 = () => {
    document.title = "जमा व दिलेल्या रकमांची नोंदणी";
    const navigate = useNavigate(); 

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const [formData, setFormData] = useState({
        lekhaShirsh:'',
        shera:'',
        arthsankalpiyaAnudan:'',
        mahinyaBaddalchiEkunRakkam:'',
        maghilMahinyachaAkherparyantchiRakkam:'',
        maghePasunPudheChaluEkunRakkam:'',
        day:'',
        value:'',
        month:'',
        year:'',
    });
    

    // const navigate = useNavigate();  // Initialize the navigate function


    const arabicToMarathiDigits = (num) => {
        const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return num.toString().split('').map(digit => marathiDigits[parseInt(digit)]).join('');
    };

    const days = [
        '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२', '१३', '१४', 
        '१५', '१६', '१७', '१८', '१९', '२०', '२१', '२२', '२३', '२४', '२५', '२६', 
        '२७', '२८', '२९', '३०', '३१'
    ];

    // Define month names
    const months = [
        'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
        'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
    ];

    //  const currentYear = new Date().getFullYear();
    //  const yearOptions = Array.from({ length: 100 }, (_, i) => ${currentYear - i} : ${currentYear - i + 1});
    const currentYear = new Date().getFullYear();
    const yearRanges = Array.from({ length: 100 }, (_, i) => {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        const startYearInMarathi = arabicToMarathiDigits(startYear); 
        const endYearInMarathi = arabicToMarathiDigits(endYear);
        return `${startYearInMarathi}-${endYearInMarathi}`;
    });


    const [dataList, setDataList] = useState([]); // State for fetched data


    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");       
    const [error4, setError4] = useState("");
    const [error5, setError5] = useState("");
    const [error6, setError6] = useState("");
    const [error7, setError7] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        //setFormData({ ...formData, [id]: value });
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
        // List all required fields
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
      
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("User not authenticated. Please log in.");
          }
      
          const response = await axios.post(
            "http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save",
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
          navigate("/नमुना-६-अहवाल");
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
        lekhaShirsh:'',
        shera:'',
        arthsankalpiyaAnudan:'',
        mahinyaBaddalchiEkunRakkam:'',
        maghilMahinyachaAkherparyantchiRakkam:'',
        maghePasunPudheChaluEkunRakkam:'',
        day:'',
        value:'',
        month:'',
        year:'',
      
        });
    };

    
    const handleSubmit1 = async () => { 
        console.log("Sending data:", formData); 
        const token = localStorage.getItem("token");
        console.log("Inside Submit Token: ", token);
      
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
        ];
      
        const hasEmptyFields = requiredFields.some((field) => {
          const value = formData[field];
          return value === undefined || value === null || value.toString().trim() === "";   
        });
      
        if (
          error1 || error2 || error3 || error4 || error5 ||
          error6 || error7 || hasEmptyFields   
        ) {
          setErrorMessage("कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.");
          setSuccessMessage("");
      
          // ❗ Automatically hide error message after 5 seconds
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
      
          return;
        }
      
        try {
          const response = await axios.post(
            "http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save",
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
          }, 3000);
      
          console.log("Response:", response.data);
      
          // Clear all fields after success
          setFormData({
            lekhaShirsh:'',
            shera:'',
            arthsankalpiyaAnudan:'',
            mahinyaBaddalchiEkunRakkam:'',
            maghilMahinyachaAkherparyantchiRakkam:'',
            maghePasunPudheChaluEkunRakkam:'',
            day:'',
            value:'',
            month:'',
            year:'', 
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
          }, 3000);
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


  const breadcrumbTitle = "जमा व दिलेल्या रकमांची नोंदणी"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-६ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"  
    "/नमुना-६-अहवाल", // Path
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
                                <PreviewCardHeader title="जमा व दिलेल्या रकमांची नोंदणी"
                                    buttonLabel="अहवाल"
                                    onButtonClick={() => navigate('/नमुना-६-अहवाल')} // Use navigate directly
                                />
                                <CardBody className="card-body">
                                    {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                                    {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                                    <div className="live-preview">
                                        <Row className="gy-4">       
                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="lekhaShirsh" className="form-label">लेखा शीर्ष</Label>
                                                    <Input type="text" className="form-control" id="lekhaShirsh" value={formData.lekhaShirsh} onChange={handleInputChange} />
                                                    {error1 && <div className="text-danger">{error1}</div>}
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="arthsankalpiyaAnudan" className="form-label">आर्थिक संकल्पीय अनुदान</Label>
                                                    <Input type="text" className="form-control" id="arthsankalpiyaAnudan" value={formData.arthsankalpiyaAnudan} onChange={handleInputChange} />
                                                    {error2 && <div className="text-danger">{error2}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="mahinyaBaddalchiEkunRakkam" className="form-label">महिन्याबद्दलची एकूण रक्कम</Label>
                                                    <Input type="text" className="form-control" id="mahinyaBaddalchiEkunRakkam" value={formData.mahinyaBaddalchiEkunRakkam} onChange={handleInputChange} />
                                                    {error3 && <div className="text-danger">{error3}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="maghilMahinyachaAkherparyantchiRakkam" className="form-label">मागील महिन्याचा अखेरपर्यंतची रक्कम</Label>
                                                    <Input type="text" className="form-control" id="maghilMahinyachaAkherparyantchiRakkam" value={formData.maghilMahinyachaAkherparyantchiRakkam} onChange={handleInputChange} />
                                                    {error4 && <div className="text-danger">{error4}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="maghePasunPudheChaluEkunRakkam" className="form-label">मागे पासून पुढे चालू एकूण रक्कम</Label>
                                                    <Input type="text" className="form-control" id="maghePasunPudheChaluEkunRakkam" value={formData.maghePasunPudheChaluEkunRakkam} onChange={handleInputChange} />
                                                    {error5 && <div className="text-danger">{error5}</div>}
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="day" className="form-label">दिवस</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="day" 
                                                        value={formData.day} 
                                                        onChange={handleInputChange} 
                                                        // onBlur={calculateTotalAmountForMonth} // Calculate when day is selected
                                                    >
                                                        <option value="">दिवस निवडा</option>
                                                        {days.map((day) => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </Input>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="value" className="form-label">मूल्य</Label>
                                                    <Input type="text" className="form-control" id="value" value={formData.value} onChange={handleInputChange} />
                                                    {error6 && <div className="text-danger">{error6}</div>}
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="month" className="form-label">महिना</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="month" 
                                                        value={formData.month} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">महिना निवडा</option>
                                                        {months.map((month, index) => (
                                                            <option key={index} value={month}>{month}</option> 
                                                        ))}
                                                    </Input>
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6} xs={12}>
                                                <div>
                                                    <Label htmlFor="year" className="form-label">वर्ष</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="year" 
                                                        value={formData.year} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">वर्ष निवडा</option>
                                                        {yearRanges.map((yearRange) => (
                                                            <option key={yearRange} value={yearRange}>{yearRange}</option>
                                                        ))}
                                                    </Input>
                                                </div>
                                            </Col>
                                                <Col xxl={3} md={6} xs={12}>
                                                    <div>
                                                        <Label htmlFor="shera" className="form-label">शेरा</Label>
                                                        <textarea 
                                                            className="form-control" 
                                                            id="shera" 
                                                            value={formData.shera} 
                                                            onChange={handleInputChange} 
                                                            rows="3" // You can adjust the number of rows as needed 
                                                        />
                                                        {error7 && <div className="text-danger">{error7}</div>}
                                                    </div>
                                                </Col>
                                        </Row>
                                    </div>
                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
                                        <div className="d-flex justify-content-end flex-wrap gap-2">
                                            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करा</Button>
                                            <Button color="success" onClick={handleSubmit1} style={{ marginRight: '10px' }}>जतन करून नवीन माहिती भरा</Button>
                                            <Button color="danger" onClick={() => window.location.href = '/नमुना-६-अहवाल'} style={{ marginRight: '10px' }}>रद्द करा</Button>
                                            <Button color="primary" onClick={handleReset} >रिसेट करा</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Section to display fetched data */}
                   
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Namuna06;