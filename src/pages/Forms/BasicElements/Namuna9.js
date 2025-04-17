import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody,Table } from "reactstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import "../BasicElements/style.css";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';

import { date } from "jszip/dist/jszip";

const Namuna9 = () => {  

  const taxTypes = [
    { label: 'घरपटी कर', key: 'Ghar' },
    { label: 'वीज कर', key: 'Vij' },
    { label: 'आरोग्य कर', key: 'Arogya' },
    { label: 'पाणीपट्टी कर', key: 'Pani' }
  ];

  const sections = [
    { label: 'ना कर', prefix: 'na_' },
    { label: 'वसुली कर', prefix: 'vasuli_' }
  ];

  const [selectedTaxType, setSelectedTaxType] = useState('');
  const [selectedSection, setSelectedSection] = useState('na_');


  document.title = "नमुना ९ - आकारणी केलेल्या खर्चाची मागणी नोंदवही";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    //id: "",
    year: "",
    employeeId: "",
    employeeName: "", 
    grampanchayatId: "",
    grampanchayatName: "",
    remark: "",
    serialNo: "",
    milkat_Number: "",
    propertyOwnerName: "",

    na_GharMagilBaki: "",
    na_GharChaluKar: "",
    na_GharTotal: "",

    na_VijMagilBaki: "",
    na_VijChaluKar: "",
    na_VijTotal: "",

    na_ArogyaMagilBaki: "",
    na_ArogyaChaluKar: "",
    na_ArogyaTotal: "",

    na_PaniMagilBaki: "",
    na_PaniChaluKar: "",
    na_PaniTotal: "",

    na_TotalKar: "",

    bookNo: "",
    bookNoOR_Date: "",
    pavti_Number: "",

    vasuli_GharMagilBaki: "",
    vasuli_GharChaluKar: "",
    vasuli_GharTotal: "",

    vasuli_VijMagilBaki: "",
    vasuli_VijChaluKar: "",
    vasuli_VijTotal: "",

    vasuli_ArogyaMagilBaki: "",
    vasuli_ArogyaChaluKar: "",
    vasuli_ArogyaTotal: "",

    vasuli_PaniMagilBaki: "",
    vasuli_PaniChaluKar: "",
    vasuli_PaniTotal: "",

    vasuli_TotalKar: "",

    sutManjuriHukmacha_Ullekh: "",
    sutManjuriHukmacha_Shera: ""
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



    if(id === "serialNo")
    {
      if(value ==="" || regex.test(value))
      {
        setError1("");
      }
      else
      {
        setError1("कृपया योग्य अनुक्रमांक भरा(allows only digits)");
      }
    }
    else if(id === "milkat_Number")
    {
      if(value ==="" || regex.test(value))
      {
        setError2("");
      }
      else
      {
        setError2("कृपया योग्य मिळकत नंबर भरा(allows only digits)");
      }
    }
    else if(id === "propertyOwnerName")
    {
      if(value ==="" || regex1.test(value))
      {
        setError3("");
      }
      else
      {
        setError3("कृपया योग्य मालमत्ताधारकाचे नाव भरा(allow only letters and spaces)");
      }
    }
    else if(id === "bookNo")
    {
      if(value ==="" || regex.test(value))
      {
        setError4("");
      }
      else
      {
        setError4("कृपया योग्य बुक क्रमांक भरा(allows only digits)");
      }
    }
    else if (id === "bookNoOR_Date") {
        const selectedDate = new Date(value);
        const today = new Date();
      
        // Reset time part for accurate comparison
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
      
        if (!value) {
          setError5("कृपया दिनांक भरा.");
        } else if (selectedDate > today) {
          setError5("दिनांक भविष्यातील असू शकत नाही.");
        } else {
          setError5(""); // No error
        }
    }      
    else if(id === "pavti_Number") 
    {
      if(value ==="" || regex.test(value))
      {
        setError6("");
      }
        else
        {
            setError6("कृपया योग्य पावती क्रमांक भरा(allows only digits)");
        }
    }
    else if(id === "sutManjuriHukmacha_Ullekh")
    {
      if(value ==="" || regex1.test(value))
      {
        setError7("");
      }
      else
      {
        setError7("कृपया योग्य सुट मंजुरी हुकमाचा उल्लेख भरा(allow only letters and spaces)");
      }
    }
    else if(id === "sutManjuriHukmacha_Shera") 
    {
      if(value ==="" || regex3.test(value))
      {
        setError8("");
      }
      else
      {
        setError8("कृपया योग्य सुट मंजुरी हुकमाचा शेरा भरा(allow only letters and digits)");
      }
    } 
  };



  const handleInputChange1 = (e, fieldName) => {
    const updatedForm = {
      ...formData,
      [fieldName]: e.target.value
    };

    // Auto-calculate Total
    const prefix = selectedSection + selectedTaxType;
    const magil = +updatedForm[`${prefix}MagilBaki`] || 0;
    const chalu = +updatedForm[`${prefix}ChaluKar`] || 0;
    updatedForm[`${prefix}Total`] = magil + chalu;

    setFormData(updatedForm);
  };



  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };


  const handleSubmit = async () => {
    e.preventDefault(); // Prevent default form submission
    // List all required fields
    const requiredFields = [
    //id: "",
    //employeeId: "",
    //employeeName: "",
    //grampanchayatId: "",
    //grampanchayatName: "",
    "year",
    "remark",
    "serialNo",
    "milkat_Number",
    "propertyOwnerName",
    "na_GharMagilBaki",
    "na_GharChaluKar",
    "na_GharTotal",
    "na_VijMagilBaki",
    "na_VijChaluKar",
    "na_VijTotal",
    "na_ArogyaMagilBaki",
    "na_ArogyaChaluKar",
    "na_ArogyaTotal",
    "na_PaniMagilBaki",
    "na_PaniChaluKar",
    "na_PaniTotal",
    "na_TotalKar",
    "bookNo",
    "bookNoOR_Date",
    "pavti_Number",
    "vasuli_GharMagilBaki",
    "vasuli_GharChaluKar",
    "vasuli_GharTotal",
    "vasuli_VijMagilBaki",
    "vasuli_VijChaluKar",
    "vasuli_VijTotal",
    "vasuli_ArogyaMagilBaki",
    "vasuli_ArogyaChaluKar",
    "vasuli_ArogyaTotal",
    "vasuli_PaniMagilBaki",
    "vasuli_PaniChaluKar",
    "vasuli_PaniTotal",
    "vasuli_TotalKar",
    "sutManjuriHukmacha_Ullekh",
    "sutManjuriHukmacha_Shera"
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
      }, 5000); 

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
      navigate("/नमुना-९-अहवाल");
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
       //id: "",
    year: "",
    employeeId: "",
    employeeName: "",
    grampanchayatId: "",
    grampanchayatName: "",
    remark: "",
    serialNo: "",
    milkat_Number: "",
    propertyOwnerName: "",
    na_GharMagilBaki: "",
    na_GharChaluKar: "",
    na_GharTotal: "",
    na_VijMagilBaki: "",
    na_VijChaluKar: "",
    na_VijTotal: "",
    na_ArogyaMagilBaki: "",
    na_ArogyaChaluKar: "",
    na_ArogyaTotal: "",
    na_PaniMagilBaki: "",
    na_PaniChaluKar: "",
    na_PaniTotal: "",
    na_TotalKar: "",
    bookNo: "",
    bookNoOR_Date: "",
    pavti_Number: "",
    vasuli_GharMagilBaki: "",
    vasuli_GharChaluKar: "",
    vasuli_GharTotal: "",
    vasuli_VijMagilBaki: "",
    vasuli_VijChaluKar: "",
    vasuli_VijTotal: "",
    vasuli_ArogyaMagilBaki: "",
    vasuli_ArogyaChaluKar: "",
    vasuli_ArogyaTotal: "",
    vasuli_PaniMagilBaki: "",
    vasuli_PaniChaluKar: "",
    vasuli_PaniTotal: "",
    vasuli_TotalKar: "",
    sutManjuriHukmacha_Ullekh: "",
    sutManjuriHukmacha_Shera: ""
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
      "year",
    "remark",
    "serialNo",
    "milkat_Number",
    "propertyOwnerName",
    "na_GharMagilBaki",
    "na_GharChaluKar",
    "na_GharTotal",
    "na_VijMagilBaki",
    "na_VijChaluKar",
    "na_VijTotal",
    "na_ArogyaMagilBaki",
    "na_ArogyaChaluKar",
    "na_ArogyaTotal",
    "na_PaniMagilBaki",
    "na_PaniChaluKar",
    "na_PaniTotal",
    "na_TotalKar",
    "bookNo",
    "bookNoOR_Date",
    "pavti_Number",
    "vasuli_GharMagilBaki",
    "vasuli_GharChaluKar",
    "vasuli_GharTotal",
    "vasuli_VijMagilBaki",
    "vasuli_VijChaluKar",
    "vasuli_VijTotal",
    "vasuli_ArogyaMagilBaki",
    "vasuli_ArogyaChaluKar",
    "vasuli_ArogyaTotal",
    "vasuli_PaniMagilBaki",
    "vasuli_PaniChaluKar",
    "vasuli_PaniTotal",
    "vasuli_TotalKar",
    "sutManjuriHukmacha_Ullekh",
    "sutManjuriHukmacha_Shera"
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
        year: "",
        //employeeId: "",
        // employeeName: "",
        //grampanchayatId: "",
        // grampanchayatName: "",
        remark: "",
        serialNo: "",
        milkat_Number: "",
        propertyOwnerName: "",
        na_GharMagilBaki: "",
        na_GharChaluKar: "",
        na_GharTotal: "",
        na_VijMagilBaki: "",
        na_VijChaluKar: "",
        na_VijTotal: "",
        na_ArogyaMagilBaki: "",
        na_ArogyaChaluKar: "",
        na_ArogyaTotal: "",
        na_PaniMagilBaki: "",
        na_PaniChaluKar: "",
        na_PaniTotal: "",
        na_TotalKar: "",
        bookNo: "",
        bookNoOR_Date: "",
        pavti_Number: "",
        vasuli_GharMagilBaki: "",
        vasuli_GharChaluKar: "",
        vasuli_GharTotal: "",
        vasuli_VijMagilBaki: "",
        vasuli_VijChaluKar: "",
        vasuli_VijTotal: "",
        vasuli_ArogyaMagilBaki: "",
        vasuli_ArogyaChaluKar: "",
        vasuli_ArogyaTotal: "",
        vasuli_PaniMagilBaki: "",
        vasuli_PaniChaluKar: "",
        vasuli_PaniTotal: "",
        vasuli_TotalKar: "",
        sutManjuriHukmacha_Ullekh: "",
        sutManjuriHukmacha_Shera: ""
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


  const breadcrumbTitle = "नमुना ९ - आकारणी केलेल्या खर्चाची मागणी नोंदवही"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-९ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"  
    "/नमुना-९-अहवाल", // Path
  ];




  const [rows, setRows] = useState([  
      { id: 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }  
  ]); 


const [regularRows, setRegularRows] = useState([
    { id: Date.now(), section: "", taxType: "", amount: "" }
]);

const handleRegularChange = (index, key, value) => {
    const updatedRows = [...regularRows];
    updatedRows[index][key] = value;
    setRegularRows(updatedRows);
};

 // ✅ Function to add a new row  
 const addRow = () => {
  setRows([...rows, { id: rows.length + 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }]);
};

// ✅ Function to delete a specific row
const deleteRow = (id) => {  
  setRows(prevRows => prevRows.filter(row => row.id !== id));
};

// const addRegularRow = () => {
//     setRegularRows([...regularRows, { id: Date.now(), section: "", taxType: "", amount: "" }]);
// };

// const deleteRegularRow = (id) => {
//     setRegularRows(regularRows.filter(row => row.id !== id));
// };



  const renderFields = () => {
    if (!selectedTaxType) return null;
    const base = selectedSection + selectedTaxType;
    return (
      <div className="card p-3 shadow-sm">
        <div className="row mb-2">
          <div className="col-md-4">
            <label>मागील बाकी</label>
            <input
              type="number"
              className="form-control"
              value={formData[`${base}MagilBaki`] || ''}
              onChange={(e) => handleInputChange(e, `${base}MagilBaki`)}
            />
          </div>
          <div className="col-md-4">
            <label>चालू कर</label>
            <input
              type="number"
              className="form-control"
              value={formData[`${base}ChaluKar`] || ''}
              onChange={(e) => handleInputChange(e, `${base}ChaluKar`)}
            />
          </div>
          <div className="col-md-4">
            <label>एकूण</label>
            <input
              type="number"
              className="form-control bg-light"
              value={formData[`${base}Total`] || ''}
              readOnly
            />
          </div>
        </div>
      </div>
    );
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
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="नमुना ९ - आकारणी केलेल्या खर्चाची मागणी नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-९-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="serialNo" className="form-label">
                            अनुक्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="serialNo" value={formData.serialNo} onChange={handleInputChange} />
                          {error1 && <div className="text-danger">{error1}</div>}
                        </div>
                      </Col> 
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="milkat_Number" className="form-label">
                             मिळकत नंबर  
                          </Label>
                          <Input type="text" className="form-control" id="milkat_Number" value={formData.milkat_Number} onChange={handleInputChange} /> 
                          { error2 && <div className="text-danger"> {error2} </div> }
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="propertyOwnerName" className="form-label">
                             मालमत्ताधारकाचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="propertyOwnerName" value={formData.propertyOwnerName} onChange={handleInputChange} />
                          {error3 && <div className="text-danger">{error3}</div>}
                        </div>
                      </Col>  
                      <Col xxl={3} md={3}>  
                        <div>
                          <Label htmlFor="bookNo" className="form-label"> 
                             बुक क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="bookNo" value={formData.bookNo} onChange={handleInputChange} />
                          {error4 && <div className="text-danger">{error4}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="bookNoOR_Date" className="form-label">
                            बुक दिनांक 
                          </Label>
                          <Input 
                            type="date" 
                            className="form-control" 
                            id="bookNoOR_Date" 
                            value={formData.bookNoOR_Date} 
                            onChange={handleInputChange}
                            // max={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD 
                          />
                          {error5 && <div className="text-danger">{error5}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pavti_Number" className="form-label">
                            पावती क्रमांक  
                          </Label>
                          <Input type="text" className="form-control" id="pavti_Number" value={formData.pavti_Number} onChange={handleInputChange} />
                          {error6 && <div className="text-danger">{error6}</div>}
                        </div>
                      </Col> 


                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sutManjuriHukmacha_Ullekh" className="form-label">
                            सूत्र मंजुरी हुकुमाचा उल्लेख 
                          </Label>
                          <Input type="text" className="form-control" id="sutManjuriHukmacha_Ullekh" value={formData.sutManjuriHukmacha_Ullekh} onChange={handleInputChange} />
                          {error7 && <div className="text-danger">{error7}</div>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="sutManjuriHukmacha_Shera" className="form-label">
                            सूत्र मंजुरी हुकुमाचा शेरा
                          </Label>
                          <Input type="text" className="form-control" id="sutManjuriHukmacha_Shera" value={formData.sutManjuriHukmacha_Shera} onChange={handleInputChange} />
                          {error8 && <div className="text-danger">{error8}</div>}
                        </div>
                      </Col>
                    </Row>

                  
                  <Row className="gy-4">
                    <Col xxl={12} md={12}>    
                        <div>
                            <Label className="form-label"> रेगुलर खाते येणे रकमा </Label>    
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>तपशील</th>    
                                        <th>मागील बाकी (₹)</th>    
                                        <th>चालू बाकी (₹)</th>        
                                        <th>एकूण रक्कम (₹)</th>           
                                        <th>क्रिया</th>        
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => {                 
                                        const selectedOptions = rows                     
                                            .filter((_, i) => i !== index)              
                                            .map(row => row.detail);

                                        return (                          
                                            <tr key={row.id}>           
                                                <td>
                                                    <Form.Group controlId={`taxType-${index}`}>           
                                                        <Form.Select                                   
                                                            value={row.detail}
                                                            onChange={(e) => handleChange(index, "detail", e.target.value)}
                                                        >
                                                            <option value="">-- Select an option --</option>
                                                            {taxTypes
                                                                .filter((tax) => !selectedOptions.includes(tax.value) || row.detail === tax.value)
                                                                .map((tax, i) => (
                                                                    <option key={i} value={tax.value}>
                                                                        {tax.label}
                                                                    </option>
                                                                ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="₹"
                                                        value={row.previousBalance}
                                                        onChange={(e) => handleChange(index, "previousBalance", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="₹"
                                                        value={row.currentBalance}
                                                        onChange={(e) => handleChange(index, "currentBalance", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="₹"
                                                        value={row.totalAmount}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    {rows.length < 7 && (
                                                        <Button color="primary" onClick={addRow} style={{ marginRight: "5px" }}>+</Button>
                                                    )}
                                                    {rows.length > 1 && (
                                                        <Button color="danger" onClick={() => deleteRow(row.id)}>-</Button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {/* Total Calculation Row */}      
                                    <tr>   
                                        <td colSpan="3" className="text-end"><b>एकूण:</b></td>
                                        <td><b>{rows.reduce((sum, row) => sum + Number(row.totalAmount || 0), 0)} ₹</b></td>
                                        <td>
                                            <input 
                                                type="hidden" 
                                                name="total" 
                                                value={rows.reduce((sum, row) => sum + Number(row.totalAmount || 0), 0)} 
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
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
                      <Button color="primary" onClick={() => navigate("/नमुना-९-अहवाल")}> 
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

export default Namuna9;
