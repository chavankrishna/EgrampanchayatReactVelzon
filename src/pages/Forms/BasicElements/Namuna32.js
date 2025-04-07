import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import "../BasicElements/style.css";

const Namuna32 = () => {
  document.title = "नमुना ३२ - रक्कमेच्या परताव्यासाठीचा आदेश";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gramPanchayatId: "",
    gramPanchayatName: "",
    employeeId: "",
    employeeName: "",
    pavtiNumber: "",
    dileliMulRakkamDate: "",
    rakkam: "",
    paratKaryachiRakkam: "",
    thevidaracheNav: "",
    partavaKarnaryaPradhikaryacheNav: "",
    shera: "",
    // year: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [error,setError] = useState("");
  const [error1,setError1] = useState("");
  const [error2,setError2] = useState("");
  const [error3,setError3] = useState("");
  const [error4,setError4] = useState("");
  const [error5,setError5] = useState("");

  const [dataList, setDataList] = useState([]); 
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
  }, [dataList]);
  // Define the authorities array here
  const authorities = ["Authority 1", "Authority 2", "Authority 3", "Authority 4"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    //setFormData({ ...formData, [id]: value });
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const regex = /^[\u0900-\u097F A-Za-z\s]+$/; // Allows Hindi, Marathi & English 
    const regex1 = /^[0-9\u0966-\u096F]+$/; // Allows Hindi, Marathi & English numbers

    if (id === "thevidaracheNav") 
    {
        if (value === "" || regex.test(value)) {
            setError(""); // Clear error message if input is valid
        } else {
          setError("कृपया वैध नाव भरा (केवळ हिंदी, मराठी किंवा इंग्रजी अक्षरे)");
      }
    }
    else if(id === "shera")
    {
      if (value === "" || regex.test(value)) {
        setError1(""); // Clear error message if input is valid
       } else {
        setError1("कृपया वैध नाव भरा (केवळ हिंदी, मराठी किंवा इंग्रजी अक्षरे)");
       }

    }
    else if(id === "pavtiNumber") 
    {
      if (value === "" || regex1.test(value)) { 
        setError2(""); // Clear error message if input is valid
       } else {
        setError2("कृपया वैध पावती क्रमांक भरा (केवळ मराठी किंवा इंग्रजी अंक)");
       }
    }
    else if(id === "dileliMulRakkamDate" )
    {
      if (value === "") {
        setError3(""); // Clear error message if input is valid
      } else {
        const dateObj = new Date(value);
        const currentDate = new Date();
        if (dateObj > currentDate) {
          setError3("कृपया वैध दिनांक भरा (भविष्य दिनांक नाही)");
        } else {
          setError3(""); // Clear error message if input is valid
        }
      }
    }
    else if(id === "rakkam")
    {
      if (value === "" || regex1.test(value)) { 
        setError4(""); // Clear error message if input is valid
       } else {
        setError4("कृपया वैध रक्कम भरा (केवळ मराठी किंवा इंग्रजी अंक)");
       }
    }
    else if(id === "paratKaryachiRakkam")
    {
        if (value === "" || regex1.test(value)) { 
          setError5(""); // Clear error message if input is valid
         } else {
          setError5("कृपया वैध रक्कम भरा (केवळ मराठी किंवा इंग्रजी अंक)");
         }
    }

  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    const requiredFields = ["pavtiNumber", "dileliMulRakkamDate", "rakkam", "paratKaryachiRakkam", "thevidaracheNav", "partavaKarnaryaPradhikaryacheNav", "shera"];

    // Validate required fields
    const isFormValid = requiredFields.every(
      (field) => formData[field]?.trim() !== "" // Check if fields are non-empty
    );

    if (!isFormValid) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      const errorMessage = "तुम्ही लॉगिन केलेले नाहीत. कृपया लॉगिन करा.";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      return; // Exit if no token is found
    }

    try {
      // Modify date format before sending the data
      const formattedData = {
        ...formData,
        date: convertDateFormat(formData.dileliMulRakkamDate), // Ensure convertDateFormat is defined
      };

      const response = await axios.post("http://localhost:8080/rakkampartavya/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the request header
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Clear all fields after success
      setFormData({
        pavtiNumber: "",
        dileliMulRakkamDate: "",
        rakkam: "",
        paratKaryachiRakkam: "",
        thevidaracheNav: "",
        partavaKarnaryaPradhikaryacheNav: "",
        shera: "",
      });
    } catch (error) {
      console.error("Error occurred:", error); // Log the error for debugging

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      sessionStorage.setItem("sessionMessage", errorMessage); // Save error message in sessionStorage
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
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

  const handleSubmit = async () => {
    console.log("Sending data:", formData);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token is missing. User is not authenticated.");
      return; // Exit if no token is found
    }

    try {
      // Make the POST request with the token in the Authorization header
      const response = await axios.post("http://localhost:8080/rakkampartavya/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token in Authorization header
        },
      });

      console.log("Response:", response.data); // Log the response data

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे"; 
      sessionStorage.setItem("sessionMessage", successMessage); // Store success message

      // Remove it after 3 seconds (3000 milliseconds)
      setTimeout(() => { 
        sessionStorage.removeItem("sessionMessage");
      }, 3000);

      // Navigate to the report page
      navigate("/नमुना-३२-अहवाल");
    } catch (error) {
      console.error("Error occurred:", error); // Log the error for debugging

      // Set the error message
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use the response error message
      }

      // Save the error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);

      // Update the state for error message and clear success message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success message

      // Remove from storage and also clear the error message from state after 3 seconds
      setTimeout(() => {
        sessionStorage.removeItem("sessionMessage");
        setErrorMessage(""); // 👈 This clears it from UI
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

  const handleReset = () => {
    setFormData({
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      pavtiNumber: "",
      dileliMulRakkamDate: "",
      rakkam: "",
      paratKaryachiRakkam: "",
      thevidaracheNav: "",
      partavaKarnaryaPradhikaryacheNav: "",
      shera: "",
    });
  };
  const breadcrumbTitle = "नमुना ३२ रक्कमेच्या परताव्यासाठीचा आदेश"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३२ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३२-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना ३२ - रक्कमेच्या परताव्यासाठीचा आदेश" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-३२-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pavtiNumber" className="form-label">
                            पावती क्रमांक
                          </Label>
                          <Input type="text" className="form-control" id="pavtiNumber" value={formData.pavtiNumber} onChange={handleInputChange} />
                          {error2 && <small style={{ color: "red" }}>{error2}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="dileliMulRakkamDate" className="form-label">
                            दिलेली मूळ रक्कम दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="dileliMulRakkamDate" value={formData.dileliMulRakkamDate} onChange={handleInputChange} /> 
                          {error3 && <small style={{ color: "red" }}>{error3}</small>}
                        </div> 
                      </Col> 

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rakkam" className="form-label">
                            रक्कम
                          </Label>
                          <Input type="text" className="form-control" id="rakkam" value={formData.rakkam} onChange={handleInputChange} />
                          {error4 && <small style={{ color: "red" }}>{error4}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="paratKaryachiRakkam" className="form-label">
                            परत करावयाची रकम
                          </Label>
                          <Input type="text" className="form-control" id="paratKaryachiRakkam" value={formData.paratKaryachiRakkam} onChange={handleInputChange} />
                          {error5 && <small style={{ color: "red" }}>{error5}</small>}
                        </div>
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="thevidaracheNav" className="form-label">
                            ठेवीदाराचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="thevidaracheNav" value={formData.thevidaracheNav} onChange={handleInputChange} />
                          {error && <small style={{ color: "red" }}>{error}</small>} 
                        </div> 
                      </Col>

                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="partavaKarnaryaPradhikaryacheNav" className="form-label">
                            परतावा करणाऱ्या प्राधिकाऱ्याचे नाव
                          </Label>
                          <Input type="select" className="form-control" id="partavaKarnaryaPradhikaryacheNav" value={formData.partavaKarnaryaPradhikaryacheNav} onChange={handleInputChange}>
                            <option value="">प्राधिकाऱ्याचे नाव</option>
                            {authorities.map((authority, index) => (
                              <option key={index} value={authority}>
                                {authority}
                              </option>
                            ))}
                          </Input>
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
                            rows="4" // You can adjust the number of rows as needed
                          />
                          {error1 && <small style={{ color: "red" }}>{error1}</small>}
                             
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>
                    <div className="d-flex justify-content-end flex-wrap gap-2">
                      <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                        जतन करा
                      </Button>
                      <Button color="primary" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                        जतन करून नवीन माहिती भरा
                      </Button>
                      <Button color="warning" onClick={handleReset} style={{ marginRight: "10px" }}>
                        रीसेट करा
                      </Button>
                      <Button color="danger" onClick={() => navigate("/नमुना-३२-अहवाल")}>
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

export default Namuna32;
