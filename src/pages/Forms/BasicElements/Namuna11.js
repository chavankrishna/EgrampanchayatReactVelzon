import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent.js";
import BreadCrumb from "../../../Components/Common/BreadCrumb.js";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader.js";
import "../BasicElements/style.css";
import { useNavigate } from "react-router-dom";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";    

const Namuna11 = () => {
  document.title = "किरकोळ मागणी नोंदवही";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const [successMessage, setSuccessMessage] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);

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
    // setFormData({ ...formData, [id]: value });
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
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

  // const calculateTotalAmountForMonth = () => {
    // let totalAmount = 0;

    // Check the day-wise value and calculate the total
    // if (formData.day && formData.value) {
    //   const valuePerDay = parseFloat(formData.value);
    //   const dayIndex = parseInt(formData.day, 10) - 1;

    //   if (valuePerDay && dayIndex >= 0) {
    //     totalAmount = valuePerDay * (dayIndex + 1); // Multiply value by day count
    //   }
    // }

    // Update the "महिन्याबद्दलची एकूण रक्कम" field with the total calculated
    // setFormData((prevData) => ({
    //   ...prevData,
    //   mahinyaBaddalchiEkunRakkam: totalAmount.toString(),
    // }));
  // };

  const handleSubmit = async () => {
    //e.preventDefault(); // prevent page reload
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

    //const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== "");

    // const isFormValid = requiredFields.every((field) => {
    //   const value = formData[field];
    //   if (typeof value === "string") {
    //     return value.trim() !== "";
    //   }
    //   return value !== null && value !== undefined && value !== "";
    // });

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
    

    // if (!isFormValid) {  
    //   alert("कृपया सर्व आवश्यक क्षेत्रे भरा"); 
    //   return; // Stop submission if any required field is empty
    // }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }
      const response = await axios.post(
        "http://localhost:8080/kirkolmagni_11/create", 
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
      navigate("/नमुना-११-अहवाल");

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
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
  
      propertyOwnerName: "",
      magniche_Swarup: "",
      magnisathi_Pradhikar: "",
      magni_Happta: "",
      magni_Rakam: "",
      magni_Total: "",
      deyakramankOR_Date: "",
      //deyaKramankTarikha: "",
      vasuli_PavtiKramankOR_Date: "",
     // vasuliJhaleleRakamaPavtichaKramankTarkhi: "",
      vasuli_Rakam: "",
      sut_AadheshachaKramankOR_Date,
      
      //sutiAadeshachaKramank: "",
      //sutiAadeshachaKramankTharki: "",
      sut_Rakam: "",
      shillak: "",
      shera: "",
      year: "",
    });
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData); 
    const token = localStorage.getItem("token");
    console.log("Inside Submit Token: ", token);
  
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
    

    // if (!isFormValid) {  
    //   alert("कृपया सर्व आवश्यक क्षेत्रे भरा"); 
    //   return; // Stop submission if any required field is empty
    // }

    try {
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   throw new Error("User not authenticated. Please log in.");
      // }
      const response = await axios.post(
        "http://localhost:8080/kirkolmagni_11/create", 
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

       // ✅ Automatically hide success message after 5 seconds
       setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
  
      console.log("Response:", response.data);

      setFormData({
        gramPanchayatId: "",
        gramPanchayatName: "",
        employeeId: "",
        employeeName: "",
    
        propertyOwnerName: "",
        magniche_Swarup: "",
        magnisathi_Pradhikar: "",
        magni_Happta: "",
        magni_Rakam: "",
        magni_Total: "",
        deyakramankOR_Date: "",
        //deyaKramankTarikha: "",
        vasuli_PavtiKramankOR_Date: "",
       // vasuliJhaleleRakamaPavtichaKramankTarkhi: "",
        vasuli_Rakam: "",
        sut_AadheshachaKramankOR_Date,
        
        //sutiAadeshachaKramank: "",
        //sutiAadeshachaKramankTharki: "",
        sut_Rakam: "",
        shillak: "",
        shera: "",
        year: "",
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


  const breadcrumbTitle = "किरकोळ मागणी नोंदवही"; // This could be dynamic    
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-११ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"  
    "/नमुना-११-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना ११ - किरकोळ मागणी नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-११-अहवाल")} />
                <CardBody className="card-body">
                   {/* Show session message if available */}
                   {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                   {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="propertyOwnerName" className="form-label">
                            ज्याने मागणीची रकम घ्यावयाची त्या इसमाचे नाव व पत्ता{" "}
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="propertyOwnerName"
                            value={formData.propertyOwnerName}
                            onChange={handleInputChange}
                          />
                          {error1 && <div style={{ color: "red" }}>{error1}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magniche_Swarup" className="form-label">
                            मागणीचे स्वरूप
                          </Label>
                          <Input 
                            type="text" 
                            className="form-control" 
                            id="magniche_Swarup" 
                            value={formData.magniche_Swarup} 
                            onChange={handleInputChange} 
                          />
                          {error2 && <div style={{ color: "red" }}>{error2}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magnisathi_Pradhikar" className="form-label">
                            {" "}
                            मागणीसाठी प्राधिकार{" "}
                          </Label>
                          <Input 
                            type="text" 
                            className="form-control" 
                            id="magnisathi_Pradhikar" 
                            value={formData.magnisathi_Pradhikar} 
                            onChange={handleInputChange} 
                          />
                          {error3 && <div style={{ color: "red" }}>{error3}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div> 
                          <Label htmlFor="magni_Happta" className="form-label">
                            मागणी हप्ता{" "}
                          </Label>
                          <Input 
                            type="text" 
                            className="form-control" 
                            id="magni_Happta" 
                            value={formData.magni_Happta} 
                            onChange={handleInputChange} 
                          />
                          {error4 && <div style={{ color: "red" }}>{error4}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magni_Rakam" className="form-label">
                            {" "}
                            मागणी रकम{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magni_Rakam" value={formData.magni_Rakam} onChange={handleInputChange} />
                          {error5 && <div style={{ color: "red" }}>{error5}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="magni_Total" className="form-label">
                            मागणी एकूण रकम{" "}
                          </Label>
                          <Input type="text" className="form-control" id="magni_Total" value={formData.magni_Total} onChange={handleInputChange} />  
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="deyakramankOR_Date" className="form-label">
                            देयक क्रमांक व तारीख{" "}
                          </Label>
                          <Input type="date" className="form-control" id="deyakramankOR_Date" value={formData.deyakramankOR_Date} onChange={handleInputChange} />   
                          {error6 && <div style={{ color: "red" }}>{error6}</div>} 
                        </div>
                      </Col>


                      <Col xxl={3} md={3}> 
                        <div>
                          <Label htmlFor="vasuli_PavtiKramankOR_Date" className="form-label">
                            वसूली झालेल्या रकम पावतीचा क्रमांक व तारीख {" "} 
                          </Label>
                          <Input 
                            type="date"
                            className="form-control"
                            id="vasuli_PavtiKramankOR_Date"
                            value={formData.vasuli_PavtiKramankOR_Date}
                            onChange={handleInputChange}
                          />
                          {error7 && <div style={{ color: "red" }}>{error7}</div>}
                        </div>
                      </Col>


                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vasuli_Rakam" className="form-label">
                            वसूली झालेल्या रकम रुपये
                          </Label>
                          <Input type="text" className="form-control" id="vasuli_Rakam" value={formData.vasuli_Rakam} onChange={handleInputChange} />
                          {error8 && <div style={{ color: "red" }}>{error8}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sut_AadheshachaKramankOR_Date" className="form-label">
                            सूट आदेश क्रमांक व तारीख {" "}
                          </Label>
                          <Input type="date" className="form-control" id="sut_AadheshachaKramankOR_Date" value={formData.sut_AadheshachaKramankOR_Date} onChange={handleInputChange} />
                          {error9 && <div style={{ color: "red" }}>{error9}</div>}
                        </div>
                      </Col>

                      

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sut_Rakam" className="form-label">
                            सूट रकम रुपये{" "}
                          </Label>
                          <Input type="text" className="form-control" id="sut_Rakam" value={formData.sut_Rakam} onChange={handleInputChange} /> 
                          {error10 && <div style={{ color: "red" }}>{error10}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="shillak" className="form-label">
                            शिलक{" "}
                          </Label>
                          <Input type="text" className="form-control" id="shillak" value={formData.shillak} onChange={handleInputChange} />
                          {error11 && <div style={{ color: "red" }}>{error11}</div>} 
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
                          {error12 && <div style={{ color: "red" }}>{error12}</div>}
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
                    <div className="d-flex justify-content-end flex-wrap gap-2"> 
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा 
                      </Button>
                      <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="danger" onClick={() => (window.location.href = "/नमुना-११-अहवाल")} style={{ marginRight: "10px" }}>
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
