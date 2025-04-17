import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Col, Container, Label, Row, ModalFooter } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

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

const Namuna5CUpdate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {}); // state is used as the initial value for formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      दिनांक: date, // Assuming your date field is "पूर्ण केल्याची तारीख"
    }));
  };

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
          const response = await axios.post(`http://localhost:8080/Namuna5C_DainikRokadVahi/get_by_id/${formData.id}`);
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, formData.id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? value : "";

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async () => {
    console.log("Starting form submission..."); // Log the start of the submission
    setLoading(true); // Indicate loading state
    const requiredFields = [
      "pavtiKramank",
      "konakdunMilali",
      "jamaRakkamTapshil",
      "rokhRakkam",
      "dhanadeshRakkam",
      "dhanadeshKinvaRakkamJamaDinank",
      "dhanadeshVatvilyachaDinank",
      "shera",
      "date",
      "year",
      "month"
      ];

    try {
      // Validate required fields
      console.log("Validating required fields:", requiredFields); // Log required fields
      //const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");

      const isFormValid = requiredFields.every((field) => {
        const value = formData[field];
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return value !== null && value !== undefined && value !== ""; // for numbers and other types
      });
      


      if (!isFormValid) {
        const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा.";
        console.log("Validation failed. Missing required fields."); // Log validation failure
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success messages
        setLoading(false); // Stop loading
        return; // Exit function
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
      const response = await axios.post(`http://localhost:8080/Namuna5C_DainikRokadVahi/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${token}`, // Include the Bearer token
        },
      });

      // Handle success
      console.log("Server response received:", response.data); // Log server response
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Store success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear error messages

      console.log("Navigating to the report page..."); // Log navigation अहवाल-२
      navigate("/नमुना-५-अहवाल");
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
      // gramPanchayatId: "",
      // gramPanchayatName: "",
      // employeeId: "",
      // employeeName: "",
      // grampanchayatId: "",
      // grampanchayatName: "",
      // employeeId: "",
      // employeeName: "",
      pavtiKramank: "",
        konakdunMilali: "",
        jamaRakkamTapshil: "",
        rokhRakkam: "",
        dhanadeshRakkam: "",
        dhanadeshKinvaRakkamJamaDinank: "",
        dhanadeshVatvilyachaDinank: "",
        shera: "",
        date: "",
        year: "",
        month: "",
    });
  };
  const breadcrumbTitle = "नमुना-५ - दैनिक रोकड वही - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना-५-अहवाल "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-५-अहवाल", // "
    "", //
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
                <CardBody>
                  {/* Show session message if available */}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">नमुना ५ -दैनिक रोकड वही - अद्यतन करा</h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          <i className="bx bx-arrow-back"></i>मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>



                  <Row className="gy-4">
                   <Col xxl={3} md={3}>
                            <div>
                            <Label htmlFor="pavtiKramank" className="form-label">
                              पावती क्रमांक
                            </Label>
                            <Input type="text" className="form-control" id="pavtiKramank" value={formData.pavtiKramank} onChange={handleInputChange} />
                          </div>
                          </Col>

                        <Col xxl={3} md={3}>
                          <div>
                             <Label htmlFor="konakdunMilali" className="form-label">
                               कोणाकडून मिळाली ते
                             </Label>
                             <Input type="text" className="form-control" id="konakdunMilali" value={formData.konakdunMilali} onChange={handleInputChange} />
                           </div>
                         </Col>

                         <Col xxl={3} md={3}>
                             <div>
                              <Label htmlFor="jamaRakkamTapshil" className="form-label">
                                जमा रकमे संबंधी तपशील
                              </Label>
                              <Input type="text" className="form-control" id="jamaRakkamTapshil" value={formData.jamaRakkamTapshil} onChange={handleInputChange} />
                            </div>
                         </Col>

                     <Col xxl={3} md={3}>
                            <div>
                              <Label htmlFor="rokhRakkama" className="form-label">
                                रोख रक्कम रुपये
                              </Label>
                              <Input type="text" className="form-control" id="rokhRakkam" value={formData.rokhRakkam} onChange={handleInputChange} />                       
                            </div>
                       </Col>

                         <Col xxl={3} md={3}>
                             <div>
                             <Label htmlFor="dhanadeshRakkam" className="form-label">
                               धनादेश चेक रुपये
                             </Label>
                             <Input type="text" className="form-control" id="dhanadeshRakkam" value={formData.dhanadeshRakkam} onChange={handleInputChange} />
                           </div>
                         </Col>

                              <Col xxl={3} md={3}>
                                <div>
                                <Label htmlFor="dhanadeshKinvaRakkamJamaDinank" className="form-label">
                                  धनादेश बँकेत जमा केल्याचा दिनांक
                                </Label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  id="dhanadeshKinvaRakkamJamaDinank"
                                  name="dhanadeshKinvaRakkamJamaDinank"
                                  value={formData.dhanadeshKinvaRakkamJamaDinank}
                                  onChange={handleInputChange}/>
                              </div>
                              </Col>

                              <Col xxl={3} md={3}>
                              <div>
                               <Label htmlFor="dhanadeshVatvilyachaDinank" className="form-label">
                                 रोख रक्कम जमा केल्याचा दिनांक
                               </Label>
                               <Input
                                 type="date"
                                 className="form-control"
                                 id="dhanadeshVatvilyachaDinank"
                                 name="dhanadeshVatvilyachaDinank"
                                 value={formData.dhanadeshVatvilyachaDinank}
                                 onChange={handleInputChange} />
                             </div>
                           </Col>

                           <Col xxl={3} md={3}>
                           <div>
                             <Label htmlFor="month" className="form-label">
                               महिना
                             </Label>
                             <Input type="select" id="month" value={formData.month} onChange={handleInputChange}>
                               <option value="">महिना निवडा</option>
                               {Array.from({ length: 12 }, (_, i) => (
                                 <option key={i} value={i + 1}>
                                   {new Date(0, i).toLocaleString("default", { month: "long" })}
                                 </option>
                               ))}
                             </Input>
                           </div>
                            </Col>

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
                                rows="2"/>
                                </div>
                                </Col>
                              </Row>




                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-५-अहवाल")}>
                      रद्द करा
                    </Button> 
                  </ModalFooter>       
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Namuna5CUpdate;