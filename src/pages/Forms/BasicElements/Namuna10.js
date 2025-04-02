import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import "../BasicElements/style.css";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';



const Namuna10 = () => {         
  document.title = "Namuna 10";    
  const navigate = useNavigate();         

  const [formData, setFormData] = useState({      
    userId: "",
    receiptNo: "",
    bookNo: "",
    shri: "",
    yearRange: "",
    houseNo: "",
    billNo: "",
    previousBalance: "",
    currentBalance: "",
    totalAmount: "",
    total: "",
    date: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]); 
  const [error, setError] = useState(""); // State for error message
  const [error1, setError1] = useState(""); // State for error message
  const [error2, setError2] = useState(""); // State for error message

  useEffect(() => {
    const { type, message } = getSessionMessage();   
    if (type && message) {
      if (type === "success") {
        setSuccessMessage(message);  
        setErrorMessage("");   
      } else {
        setErrorMessage(message);
        setSuccessMessage("");
      }
    }
    
    const currentYear = new Date().getFullYear();
    const ranges = Array.from({ length: 50 }, (_, i) => {
      const year = currentYear - i;
      return `${year}-${year + 1}`;
    });
    setYearRanges(ranges);
  }, []);


  const convertDateFormat = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];   
  };    
                   

const handleSubmit = async (e, resetForm = false) => {   
    e.preventDefault(); // Prevent default form submission

    // Check required fields
    const requiredFields = [ 
        "userId",
        "receiptNo",
        "bookNo",
        "shri",
        "yearRange",
        "houseNo",
        "billNo",
        "date",
    ];

    // Updated validation check
    const isFormValid = requiredFields.every((field) =>
        formData[field] && String(formData[field]).trim() !== ""
    );

    console.log("Form Data:", formData); // Debugging: Check if formData has all values

    if (!isFormValid) {
        setErrorMessage("कृपया सर्व आवश्यक क्षेत्रे भरा");
        setSuccessMessage("");
        return;
    }

    try {
        const token = localStorage.getItem("token");

        // Format tax details correctly
        const formattedTaxDetails = rows.map((row) => ({
            taxType: row.detail, // Assuming 'detail' contains tax type
            previousBalance: Number(row.previousBalance) || 0,
            currentBalance: Number(row.currentBalance) || 0,
            totalAmount: Number(row.totalAmount) || 0,
            total: Number(row.totalAmount) || 0,
        }));

        // Construct final payload
        const formattedData = {
            ...formData,
            date: convertDateFormat(formData.date),
            taxDetails: formattedTaxDetails, // Attach tax details
        };

        console.log("Sending data:", formattedData); // Debugging: Check final data before submission

        const response = await axios.post("http://localhost:8080/api/namuna/save", formattedData, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
        sessionStorage.setItem("sessionMessage", successMessage);
        setSuccessMessage(successMessage);
        setErrorMessage("");   

        // Automatically remove success message after 5 seconds
        setTimeout(() => {
            setSuccessMessage("");
            sessionStorage.removeItem("sessionMessage");
        }, 5000); // 5000ms = 5 seconds

        if (resetForm) {          
            // Reset form data for new entry
            setFormData({         
                userId: "",
                receiptNo: "",
                bookNo: "",
                shri: "",
                yearRange: "",
                houseNo: "",
                billNo: "",
                date: "",
                taxDetails: [],
            }); 
            setRows([  
              { id: 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }  
            ]);
                     
        } else {
            navigate("/namuna10Report1"); // Redirect after success        
        }
    } catch (error) {     
        let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";       
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }         
        console.error("Error occurred:", error);
        sessionStorage.setItem("sessionMessage", errorMessage);
        setErrorMessage(errorMessage);
        setSuccessMessage("");
    }
};


// Separate function for "Save & New"
const handleSubmit1 = (e) => {
    handleSubmit(e, true);
};


const handleReset = () => { 
  setFormData({
    userId: "",
    receiptNo: "",
    bookNo: "",
    shri: "",
    yearRange: "",  // Clearing dropdown value
    houseNo: "",
    billNo: "",
    taxDetails: [],
    previousBalance: "",
    currentBalance: "",
    totalAmount: "",
    total: "",
    date: "",
  });
  setRows([  
    { id: 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }  
  ]); 
 

  // Clear dynamically added tax details
  //setRows([{ id: 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }]);

 // const successMessage = "माहिती यशस्वीरीत्या रिसेट करण्यात आली आहे!";
 // sessionStorage.setItem("sessionMessage", successMessage);
 // setSuccessMessage(successMessage);
 // setErrorMessage("");   
 // Automatically remove success message after 5 seconds
 //   setTimeout(() => {
 //         setSuccessMessage("");
 //          sessionStorage.removeItem("sessionMessage");
 //     }, 5000); // 5000ms = 5 seconds
 // Clear success and error messages
 
  setSuccessMessage("");
  setErrorMessage("");
};   

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );

  useEffect(() => {                         
    if (successMessage) {                                      
      const timer = setTimeout(() => {                    
        setSuccessMessage(""); // Clear success message after 5 seconds
      }, 5000);         

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }          
  }, [successMessage]);       

  const [rows, setRows] = useState([  
    { id: 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }  
  ]);  

  const taxTypes = [
    { label: "घरपट्टी कर", value: "HOUSE_TAX" },     
    { label: "दिवाबत्ती कर", value: "LIGHT_TAX" },    
    { label: "आरोग्य कर", value: "HEALTH_TAX" },      
    { label: "पाणी कर", value: "WATER_TAX" },        
    { label: "नोटीस फी", value: "NOTICE_FEE" },      
    { label: "इतर", value: "OTHER_TAX" },
  ];    
  

  // ✅ Function to add a new row  
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, detail: "", previousBalance: "", currentBalance: "", totalAmount: "" }]);
  };

  // ✅ Function to delete a specific row
  const deleteRow = (id) => {  
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const handleChange = (index, field, value) => {   
    setRows((prevRows) => {
      return prevRows.map((row, i) => {
        if (i === index) {
          const updatedRow = {
            ...row,
            [field]: value,
          };
  
          // Ensure calculations use numbers
          const prevBalance = Number(updatedRow.previousBalance) || 0;
          const currBalance = Number(updatedRow.currentBalance) || 0;
  
          return {
            ...updatedRow,
            totalAmount: prevBalance + currBalance,
          };
        }
        return row;
      });
    });
  };



  

//  Function to calculate the total sum of "totalAmount"
const total = rows.reduce((sum, row) => sum + (Number(row.totalAmount) || 0), 0);

useEffect(() => {
  setFormData((prevState) => ({
    ...prevState,
    total: total, // Updating total in formData
  }));
}, [total]); // Use 'total' instead of 'rows' to avoid unnecessary re-renders     

  const breadcrumbTitle = "नवीन माहिती प्रविष्ट करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / कर वसूली पावती नमुना नं. १० "; // Dynamic page title   
const breadcrumbPaths = [
  "/dashboard", // Path for "डॅशबोर्ड"
  "/namuna10", // Path
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
          <BreadCrumb className="ps-4" title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>  
              <Card>
                <PreviewCardHeader title="कर वसूली पावती नमुना नं. १० - नवीन माहिती प्रविष्ट करा" buttonLabel="अहवाल" onButtonClick={() => navigate("/namuna10Report1")} />
                <CardBody className="card-body">   
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}  
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}        
                  <div className="live-preview">  
                  <Row className="gy-4">
                    <Col xxl={3} md={3}> 
                      <div>
                        <Label htmlFor="receiptNo" className="form-label">पावती नं</Label>   
                        <Input 
                            type="number" 
                            id="receiptNo" 
                            className="form-control"  
                            value={formData.receiptNo} 
                            onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
                        />
                      </div>    
                    </Col>

                    <Col xxl={3} md={3}>      
                        <div>
                            <Label htmlFor="bookNo" className="form-label">बुक नं</Label> 
                            <Input 
                                type="number" 
                                id="bookNo" 
                                className="form-control"   
                                value={formData.bookNo} 
                                onChange={(e) => setFormData({ ...formData, bookNo: e.target.value })}
                            />
                        </div>    
                    </Col>

                    <Col xxl={3} md={3}>
                        <div>
                            <Label htmlFor="houseNo" className="form-label">घर क्र</Label>
                            <Input 
                                type="number" 
                                id="houseNo" 
                                className="form-control" 
                                value={formData.houseNo} 
                                onChange={
                                  (e) => setFormData({ ...formData, houseNo: e.target.value })
                                }
                            />
                        </div>
                    </Col>

                    <Col xxl={3} md={3}>
                        <div>
                            <Label htmlFor="billNo" className="form-label">बिल क्रमांक</Label>
                            <Input 
                                type="number" 
                                id="billNo" 
                                className="form-control" 
                                value={formData.billNo} 
                                onChange={(e) => setFormData({ ...formData, billNo: e.target.value })}
                            />
                        </div>
                    </Col>

                    <Col xxl={3} md={3}>
                        <div>
                            <Label htmlFor="shri" className="form-label">श्री</Label>
                            <Input 
                                type="text" 
                                id="shri" 
                                className="form-control" 
                                value={formData.shri} 
                                onChange={(e) => {
                                  const value = e.target.value;
                                  /^[A-Za-z\s]*$/.test(value)
                                      ? (setFormData((prev) => ({ ...prev, shri: value })), setError(""))
                                      : setError("Only alphabets and spaces are allowed!");
                              }}

                            />
                            {error && <small className="text-danger">{error}</small>} {/* Error message */} 
                        </div> 
                    </Col> 

                    {/*
                                  
                    */}

                      <Col xxl={3} md={3}>             
                        <div>                         
                            <Label htmlFor="userId" className="form-label"> वापरकर्ता आयडी</Label> 
                            <Input 
                                type="text" 
                                id="userId"   
                                name="userId" 
                                className="form-control" 
                                value={formData.userId} 
                                onChange={(e) => {
                                  const value = e.target.value;
                                  /^[A-Za-z0-9]*$/.test(value) 
                                  ? (setFormData((prev) => ({ ...prev, userId: value })), setError1(""))
                                  : setError1("Only alphanumeric characters are allowed!"); 
                                }}
                            />
                            {error1 && <small className="text-danger">{error1}</small>} {/* Error message */}  
                        </div>
                      </Col>

                    <Col xxl={3} md={3}>
                        <div>
                            <Label htmlFor="yearRange" className="form-label">वर्ष श्रेणी (पासून - पर्यंत)</Label>
                            <Input 
                                type="select" 
                                id="yearRange" 
                                className="form-control"
                                value={formData.yearRange} 
                                onChange={(e) => setFormData({ ...formData, yearRange: e.target.value })}
                            >
                                <option value="">वर्ष निवडा</option>
                                {Array.from({ length: 50 }, (_, i) => {  
                                    const year = new Date().getFullYear() - i;
                                    return (
                                        <option key={year} value={`${year}-${year + 1}`}>
                                            {year} - {year + 1}
                                        </option>
                                    );
                                })}
                            </Input>
                        </div>
                    </Col>

                    <Col xxl={3} md={3}>
                      <div>
                        <Label htmlFor="date" className="form-label">दिनांक</Label>
                        <Input
                          type="date"
                          id="date"
                          className="form-control"
                          value={formData.date}
                          max={new Date().toISOString().split("T")[0]} // Restrict future dates
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value <= new Date().toISOString().split("T")[0]) {
                                setFormData((prev) => ({ ...prev, date: value }));
                                setError2(""); // Clear error if valid
                            } else {
                                setError2("Future dates are not allowed!");
                            }
                          }}
                        />
                        {error2 && <small className="text-danger">{error2}</small>} {/* Error message */}
                      </div>
                    </Col>
 

                    <Col xxl={12} md={12}>    
                        <div>
                            <Label className="form-label">वर्षानुसार थकबाकी तपशील</Label>   
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
                   <div className="col-lg-12 d-flex justify-content-end flex-wrap" style={{ marginTop: "20px" }}>
                      <Button color="success" onClick={handleSubmit} className="me-2 mb-2">
                        जतन करा
                      </Button>
                      <Button color="primary" onClick={handleSubmit1} className="me-2 mb-2">
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="warning" onClick={handleReset} className="me-2 mb-2">
                        रीसेट करा
                      </Button>
                      <Button color="danger" onClick={() => navigate("/namuna10Report1")} className="mb-2">
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

export default Namuna10;  
