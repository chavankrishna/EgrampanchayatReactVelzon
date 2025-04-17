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

const Namuna2Update = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {}); // state is used as the initial value for formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          const response = await axios.post(`http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/get_by_id/${formData.id}`);
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
    // const newValue = value ? value : "";

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [id]: newValue,
    // })); 

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const regex = /^[0-9]+$/; // Allows digits only
    const regex1 = /^[A-Za-z\s]+$/; // Allows English letters and spaces 
    const regex2 = /^[0-9\u0966-\u096F]+-[0-9\u0966-\u096F]+$/;
    const regex3 = /^[A-Za-z0-9\s]+$/;   // Allow English letters, digits, and spaces



    if(id === "jamaRakmecheMukhyaShirshak")
    {
      if(value ==="" || regex1.test(value))
      {
        setError1("");
      }
      else
      {
        setError1("Allows English letters and spaces");
      }
    }
    else if(id === "manjurArthsankalp")
    {
      if(value ==="" || regex.test(value))
      {
        setError2("");
      }
      else
      {
        setError2("कृपया योग्य मंजूर अर्थसंकल्प भरा(allows only digits)");
      }
    }
    else if(id === "sudharitAndaz")
    {
      if(value ==="" || regex.test(value))
      {
        setError3("");
      }
      else
      {
        setError3("कृपया योग्य सुधारित अंदाज भरा(allows only digits)");
      }
    }
    else if(id === "sudharitAdhikVaja")
    {
      if(value ==="" || regex.test(value))
      {
        setError4("");
      }
      else
      {
        setError4("कृपया योग्य सुधारित अधिक(+) किंवा वजा(-) भरा(allows only digits)");
      }
    }
    else if(id === "kharchachePramukhShirsh")
    {
      if(value ==="" || regex1.test(value))
      {
        setError5("");
      }
      else
      {
        setError5("कृपया योग्य खर्चाचे प्रमुख शिर्षक भरा(allow only letters and spaces)");
      }
    }
    else if(id === "manjurRakkam")
    {
      if(value ==="" || regex.test(value))
      {
        setError6("");
      }
        else
        {
            setError6("कृपया योग्य मंजूर रक्कम भरा(allows only digits)");
        }
    }
    else if(id === "kharchachaSudharitAndaz")
    {
      if(value ==="" || regex.test(value))
      {
        setError7("");
      }
      else
      {
        setError7("कृपया योग्य खर्चाचा सुधारित अंदाज भरा(allows only digits)");
      }
    }
    else if(id === "kharchachaAdhikVaja")
    {
      if(value ==="" || regex.test(value))
      {
        setError8("");
      }
      else
      {
        setError8("कृपया योग्य खर्चाचा अधिक(+) किंवा वजा(-) भरा(allows only digits)");
      }
    }
    else if(id === "shera")
    {
      if(value ==="" || regex3.test(value))
      {
        setError9("");
      }
      else
      {
        setError9("कृपया योग्य शेरा भरा(allow only letters and digits)");
      }
    }
    else if(id === "dnyapanRupees")
    {
      if(value ==="" || regex.test(value))
      {
        setError10("");
      }
      else
      {
        setError10("कृपया योग्य ज्ञापन रुपये भरा(allows only digits)");
      }
    }

  };

  const handleSubmit = async () => {
    console.log("Starting form submission..."); // Log the start of the submission
    setLoading(true); // Indicate loading state
    const requiredFields = [  
        "jamaRakmecheMukhyaShirshak",
        "manjurArthsankalp",
        "sudharitAndaz",
        "sudharitAdhikVaja",
        "kharchachePramukhShirsh",
        "manjurRakkam",
        "kharchachaSudharitAndaz",
        "kharchachaAdhikVaja",
        "shera",
        "dnyapanRupees",
      ];   

    try {
      // Validate required fields
      console.log("Validating required fields:", requiredFields); // Log required fields
      const isFormValid = requiredFields.every((field) => formData[field]?.trim() !== "");
      if (!isFormValid || error1 || error2 || error3 || error4 || error5 || error6 || error7 || error8 || error9 || error10) {
        const errorMessage = "कृपया सर्व इनपुट योग्य प्रकारे व पूर्ण भरा.";
        console.log("Validation failed. Missing required fields."); // Log validation failure  
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear success messages
        setLoading(false); // Stop loading
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); 
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
      const response = await axios.post(`http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/update/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });

      // Handle success
      console.log("Server response received:", response.data); // Log server response
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage); // Store success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear error messages

      console.log("Navigating to the report page..."); // Log navigation अहवाल-२
      navigate("/नमुना-२-अहवाल");
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
      gramPanchayatId: "",
      gramPanchayatName: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      jamaRakmecheMukhyaShirshak: "",
        manjurArthsankalp: "",
        sudharitAndaz: "",
        sudharitAdhikVaja: "",
        kharchachePramukhShirsh: "",
        manjurRakkam: "",
        kharchachaSudharitAndaz: "",
        kharchachaAdhikVaja: "",
        shera: "",
        month: "",
        year: "",
        dnyapanRupees: ""
    });
  };
  const breadcrumbTitle = "नमुना २ - पुनर्विनियोजन व नियत वाटप यांचे विवरणपत्र - अद्यतन करा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना-२-अहवाल "; // Dynamic page title
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२-अहवाल", // "
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
                        <h4 className="card-title mb-4">नमुना २ - पुनर्विनियोजन व नियत वाटप यांचे विवरणपत्र - अद्यतन करा</h4>
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
      <Label htmlFor="jamaRakmecheMukhyaShirshak" className="form-label">
        जमा रकमेचे मुख्य शिर्षक
      </Label>
      <Input
        type="text"
        className="form-control"
        id="jamaRakmecheMukhyaShirshak"
        value={formData.jamaRakmecheMukhyaShirshak}
        onChange={handleInputChange}
      />
      {error1 && <div className="text-danger">{error1}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="manjurArthsankalp" className="form-label">
        मंजूर अर्थसंकल्प
      </Label>
      <Input
        type="text"
        className="form-control"
        id="manjurArthsankalp"
        value={formData.manjurArthsankalp}
        onChange={handleInputChange}
      />
      {error2 && <div className="text-danger">{error2}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="sudharitAndaz" className="form-label">
        सुधारित अंदाज
      </Label>
      <Input
        type="text"
        className="form-control"
        id="sudharitAndaz"
        value={formData.sudharitAndaz}
        onChange={handleInputChange}
      />
      {error3 && <div className="text-danger">{error3}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="sudharitAdhikVaja" className="form-label">
        सुधारित अधिक वजा
      </Label>
      <Input
        type="text"
        className="form-control"
        id="sudharitAdhikVaja"
        value={formData.sudharitAdhikVaja}
        onChange={handleInputChange}
      />
      {error4 && <div className="text-danger">{error4}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="kharchachePramukhShirsh" className="form-label">
        खर्चाचे प्रमुख शिर्षक
      </Label>
      <Input
        type="text"
        className="form-control"
        id="kharchachePramukhShirsh"
        value={formData.kharchachePramukhShirsh}
        onChange={handleInputChange}
      />
      {error5 && <div className="text-danger">{error5}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="manjurRakkam" className="form-label">
        मंजूर रक्कम
      </Label>
      <Input
        type="text"
        className="form-control"
        id="manjurRakkam"
        value={formData.manjurRakkam}
        onChange={handleInputChange}
      />
      {error6 && <div className="text-danger">{error6}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="kharchachaSudharitAndaz" className="form-label">
        खर्चाचा सुधारित अंदाज
      </Label>
      <Input
        type="text"
        className="form-control"
        id="kharchachaSudharitAndaz"
        value={formData.kharchachaSudharitAndaz}
        onChange={handleInputChange}
      />
      {error7 && <div className="text-danger">{error7}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="kharchachaAdhikVaja" className="form-label">
        खर्चाचा अधिक वजा
      </Label>
      <Input
        type="text"
        className="form-control"
        id="kharchachaAdhikVaja"
        value={formData.kharchachaAdhikVaja}
        onChange={handleInputChange}
      />
      {error8 && <div className="text-danger">{error8}</div>} {/* Display error message */}
    </div>
  </Col>

  <Col xxl={3} md={3}>
    <div>
      <Label htmlFor="dnyapanRupees" className="form-label">
        ज्ञानपण रुपये
      </Label>
      <Input
        type="text"
        className="form-control"
        id="dnyapanRupees"
        value={formData.dnyapanRupees}
        onChange={handleInputChange}
      />
      {error10 && <div className="text-danger">{error10}</div>} {/* Display error message */}
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
        rows="4"
      />
      {error9 && <div className="text-danger">{error9}</div>} {/* Display error message */}
    </div>
  </Col>
</Row>




                  <ModalFooter>
                    <Button color="success" type="submit" disabled={loading} style={{ marginRight: "2%" }} onClick={handleSubmit}>
                      {loading ? "अद्यतन करा..." : "अद्यतन करा"}
                    </Button>
                    <Button color="danger" onClick={() => navigate("/नमुना-२-अहवाल")}>
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

export default Namuna2Update;
