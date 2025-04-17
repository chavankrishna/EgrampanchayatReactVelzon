import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

import { date } from "jszip/dist/jszip";

const Namuna33 = () => {
  document.title = "नमुना ३३ - वृक्ष नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    naav: "",
    vrukshkrmank: "",
    vrukshprakar: "",
    vrukshjopasnechijababdari: "",
    shera: "",
    date: "",
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

    const regex = /^[0-9\u0966-\u096F]+$/; // Allows Hindi, Marathi & English numbers
    const regex1 = /^[\u0900-\u097F A-Za-z\s]+$/; // Allows Hindi, Marathi & English letters and spaces 
    const regex2 = /^[0-9\u0966-\u096F]+-[0-9\u0966-\u096F]+$/;


    if(id === "naav")
    {
      if(value ==="" || regex1.test(value))
      {
        setError1("");
      }
      else
      {
        setError1("कृपया योग्य नाव भरा");
      }
    }
    else if(id === "vrukshkrmank")
    {
      if(value ==="" || regex2.test(value))
      {
        setError2("");
      }
      else
      {
        setError2("कृपया योग्य वृक्ष क्रमांक भरा (range like 1-10)");
      }
    }
    else if(id === "vrukshprakar")
    {
      if(value ==="" || regex1.test(value))
      {
        setError3("");
      }
      else
      {
        setError3("कृपया योग्य वृक्ष प्रकार भरा");
      }
    }
    else if(id === "vrukshjopasnechijababdari")
    {
      if(value ==="" || regex1.test(value))
      {
        setError4("");
      }
      else
      {
        setError4("कृपया योग्य वृक्ष जोपासनेधी जबाबदारी भरा");
      }
    }
    else if(id === "shera")
    {
      if(value ==="" || regex1.test(value))
      {
        setError5("");
      }
      else
      {
        setError5("कृपया योग्य शेरा भरा");
      }
    }
    else if(id === "date")
    {
      if(value ==="")
      {
        setError6("")
      }
      else
      {
        const dateObj = new Date(value);
        const currentDate = new Date();
        if (dateObj > currentDate) {
          setError6("कृपया वैध दिनांक भरा (भविष्य दिनांक नाही)");
        } else {
          setError6("");
        }
      }
    }



  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };

  const handleSubmit = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Format the date field before sending the data
      const formattedData = {
        ...formData,
        date: convertDateFormat(formData.date), // Ensure this function is defined
      };

      // Send a POST request with the token in the Authorization header
      const response = await axios.post("http://localhost:8080/Namuna33VrukshNondViha/save", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });

      // Handle success
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      // Navigate to the report page
      navigate("/नमुना-३३-अहवाल");
    } catch (error) {
      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

      // Handle error
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      naav: "",
      vrukshkrmank: "",
      vrukshprakar: "",
      vrukshjopasnechijababdari: "",
      shera: "",
      date: "",
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

    const requiredFields = ["naav", "vrukshkrmank", "vrukshprakar", "vrukshjopasnechijababdari", "shera", "date"];

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

    try {
      // Modify date format before sending the data
      const formattedData = {
        ...formData,
        date: convertDateFormat(formData.date), // Ensure convertDateFormat is defined
      };

      const response = await axios.post("http://localhost:8080/Namuna33VrukshNondViha/save", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure Bearer token format
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Save success message in sessionStorage
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Clear all fields after success
      setFormData({
        naav: "",
        vrukshkrmank: "",
        vrukshprakar: "",
        vrukshjopasnechijababdari: "",
        shera: "",
        date: "",
      });
    } catch (error) {
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
  const breadcrumbTitle = "नमुना ३३ वृक्ष नोंदवही"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३३ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३३-अहवाल", // Path
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
                <PreviewCardHeader title="नमुना ३३ वृक्ष नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-३३-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="naav" className="form-label">
                            नाव
                          </Label>
                          <Input type="text" className="form-control" id="naav" value={formData.naav} onChange={handleInputChange} />
                          {error1 && <div className="text-danger">{error1}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vrukshkrmank" className="form-label">
                            वृक्ष क्रमांक Cते C ( ex. 1-10)
                          </Label>
                          <Input type="text" className="form-control" id="vrukshkrmank" value={formData.vrukshkrmank} onChange={handleInputChange} /> 
                          { error2 && <div className="text-danger"> {error2} </div> }
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vrukshprakar" className="form-label">
                            वृक्ष प्रकार
                          </Label>
                          <Input type="text" className="form-control" id="vrukshprakar" value={formData.vrukshprakar} onChange={handleInputChange} />
                          {error3 && <div className="text-danger">{error3}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="vrukshjopasnechijababdari" className="form-label">
                            वृक्ष जोपासनेधी जबाबदारी
                          </Label>
                          <Input type="text" className="form-control" id="vrukshjopasnechijababdari" value={formData.vrukshjopasnechijababdari} onChange={handleInputChange} />
                          {error4 && <div className="text-danger">{error4}</div>}
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="date" className="form-label">
                            दिनांक
                          </Label>
                          <Input type="date" className="form-control" id="date" value={formData.date} onChange={handleInputChange} />
                          {error6 && <div className="text-danger">{error6}</div>}
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
                          {error5 && <div className="text-danger">{error5}</div>}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* </Row> */}
                  {/* Other form fields go here */}
                  {/* <Row className="gy-4">
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
                    </Row> */}

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

export default Namuna33;
