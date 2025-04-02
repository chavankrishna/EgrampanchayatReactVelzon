// import React, { useState, useEffect } from "react";
// import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import UiContent from "../../../Components/Common/UiContent";
// import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
// import { setSessionMessage, getSessionMessage } from '../BasicElements/finalconfig';  // Import session management functions

// const Namuna23 = () => {
//   document.title = "नमुना २३ - ताब्यातील रस्त्यांची नोंदवही";
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     id: "",
//     grampanchayatId: "",
//     grampanchayatName: "",
//     employeeId: "",
//     employeeName: "",
//     rastyacheNaaw: "",
//     gaawPaasun: "",
//     gaawParyant: "",
//     laambiKm: "",
//     rundiKm: "",
//     rastyachaPrakar: "",
//     purnKelyachiTarikh: "",
//     pratiKmRastaTayarKarnyasAalelaKharch: "",
//     durustyaChaluKharchRupaye: "",
//     durustyaChaluSwarup: "",
//     durustyaWisheshKharchRupaye: "",
//     durustyaWisheshSwarup: "",
//     durustyaMulBandhkamKharchRupaye: "",
//     durustyaMulBandhkamSwarup: "",
//     shera: "",
//     year: "",
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [yearRanges, setYearRanges] = useState([]);
//   const [dataList, setDataList] = useState([]);

//   // Get session message on page load
//   useEffect(() => {
//     const { type, message } = getSessionMessage();
//     if (type && message) {
//       if (type === "success") {
//         setSuccessMessage(message);
//         setErrorMessage("");
//       } else if (type === "error") {
//         setErrorMessage(message);
//         setSuccessMessage("");
//       }
//     }

//     // Generate Year Range List in Marathi
//     const currentYear = new Date().getFullYear();
//     const ranges = Array.from({ length: 100 }, (_, i) => {
//       const startYear = currentYear - i;
//       const endYear = startYear + 1;
//       const startYearInMarathi = arabicToMarathiDigits(startYear);
//       const endYearInMarathi = arabicToMarathiDigits(endYear);
//       return ${startYearInMarathi} - ${endYearInMarathi};
//     });
//     setYearRanges(ranges);
//   }, [dataList]);

//   // Arabic to Marathi digits conversion function
//   function arabicToMarathiDigits(input) {
//     const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//     return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
//   }

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   // Convert date format from dd/mm/yyyy to yyyy-mm-dd
//   const convertDateFormat = (date) => {
//     const dateObj = new Date(date);
//     return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
//   };

//   const handleSubmit = async () => {
//     try {
//       // Modify date format before sending the data
//       const formattedData = { ...formData, purnKelyachiTarikh: convertDateFormat(formData.purnKelyachiTarikh) };
//       const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", formattedData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       // Save success message in sessionStorage
//       const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
//       sessionStorage.setItem("sessionMessage", successMessage);  // Store the success message

//       // Navigate to the report page
//       navigate("/report23");
//     } catch (error) {
//       let errorMessage = "Failed to submit data. Please try again later.";
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }

//       // Save error message in sessionStorage
//       sessionStorage.setItem("sessionMessage", errorMessage);  // Store the error message
//       setErrorMessage(errorMessage);
//       setSuccessMessage("");  // Clear any previous success messages
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       id: "",
//       grampanchayatId: "",
//       grampanchayatName: "",
//       employeeId: "",
//       employeeName: "",
//       rastyacheNaaw: "",
//       gaawPaasun: "",
//       gaawParyant: "",
//       laambiKm: "",
//       rundiKm: "",
//       rastyachaPrakar: "",
//       purnKelyachiTarikh: "",
//       pratiKmRastaTayarKarnyasAalelaKharch: "",
//       durustyaChaluKharchRupaye: "",
//       durustyaChaluSwarup: "",
//       durustyaWisheshKharchRupaye: "",
//       durustyaWisheshSwarup: "",
//       durustyaMulBandhkamKharchRupaye: "",
//       durustyaMulBandhkamSwarup: "",
//       shera: "",
//       year: "",
//     });
//   };

//   const handleSaveAndAddNew = () => {
//     handleSubmit();
//     handleReset();
//   };

//   return (
//     <React.Fragment>
//       <UiContent />
//       <div className="page-content">
//         <Container fluid>
//           <BreadCrumb title="नमुना २३ ताब्यातील रस्त्यांची नोंदवही" pageTitle="Forms" className="custom-breadcrumb" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <PreviewCardHeader title="नमुना २३ ताब्यातील रस्त्यांची नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/report23")} />
//                 <CardBody className="card-body">
//                   <div className="live-preview">
//                     <Row className="gy-4">
//                     <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="rastyacheNaaw" className="form-label">
//                             रस्त्यांचे नाव
//                           </Label>
//                           <Input type="text" className="form-control" id="rastyacheNaaw" value={formData.rastyacheNaaw} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="gaawPaasun" className="form-label">
//                             गाव पासून
//                           </Label>
//                           <Input type="text" className="form-control" id="gaawPaasun" value={formData.gaawPaasun} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="gaawParyant" className="form-label">
//                             गाव पर्यंत
//                           </Label>
//                           <Input type="text" className="form-control" id="gaawParyant" value={formData.gaawParyant} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="laambiKm" className="form-label">
//                             लांबी (किलो मीटर)
//                           </Label>
//                           <Input type="text" className="form-control" id="laambiKm" value={formData.laambiKm} onChange={handleInputChange} />
//                         </div>
//                       </Col>
//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="rundiKm" className="form-label">
//                             रुंदी (किलो मीटर)
//                           </Label>
//                           <Input type="text" className="form-control" id="rundiKm" value={formData.rundiKm} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="rastyachaPrakar" className="form-label">
//                             रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा
//                           </Label>
//                           <Input type="text" className="form-control" id="rastyachaPrakar" value={formData.rastyachaPrakar} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="purnKelyachiTarikh" className="form-label">
//                             पूर्ण केल्याची तारीख
//                           </Label>
//                           <Input type="date" className="form-control" id="purnKelyachiTarikh" value={formData.purnKelyachiTarikh} onChange={handleInputChange} />
//                         </div>
//                       </Col>
//                       {/* <Col xxl={3} md={3}>
//       <div>
//         <Label htmlFor="purnKelyachiTarikh" className="form-label d-block">
//           पूर्ण केल्याची तारीख
//         </Label>
//         <DatePicker
//           selected={
//             formData.purnKelyachiTarikh ? new Date(formData.purnKelyachiTarikh) : null
//           }
//           onChange={handleDateClick}
//           dateFormat="dd/MM/yy"
//           className="form-control"
//           id="purnKelyachiTarikh"
//         />
//       </div>
//     </Col> */}

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="pratiKmRastaTayarKarnyasAalelaKharch" className="form-label">
//                             प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च
//                           </Label>
//                           <Input type="text" className="form-control" id="pratiKmRastaTayarKarnyasAalelaKharch" value={formData.pratiKmRastaTayarKarnyasAalelaKharch} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaChaluKharchRupaye" className="form-label">
//                             दुरुस्त्या चालू खर्च रुपये
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaChaluKharchRupaye" value={formData.durustyaChaluKharchRupaye} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaChaluSwarup" className="form-label">
//                             दुरुस्त्या चालू स्वरुप
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaChaluSwarup" value={formData.durustyaChaluSwarup} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaWisheshKharchRupaye" className="form-label">
//                             दुरुस्त्या विशेष खर्च रुपये
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaWisheshKharchRupaye" value={formData.durustyaWisheshKharchRupaye} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaWisheshSwarup" className="form-label">
//                             दुरुस्त्या विशेष स्वरुप
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaWisheshSwarup" value={formData.durustyaWisheshSwarup} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaMulBandhkamKharchRupaye" className="form-label">
//                             दुरुस्त्या मूळ बंधकाम खर्च रुपये
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaMulBandhkamKharchRupaye" value={formData.durustyaMulBandhkamKharchRupaye} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="durustyaMulBandhkamSwarup" className="form-label">
//                             दुरुस्त्या मूळ बंधकाम स्वरुप
//                           </Label>
//                           <Input type="text" className="form-control" id="durustyaMulBandhkamSwarup" value={formData.durustyaMulBandhkamSwarup} onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="shera" className="form-label">
//                             शेरा
//                           </Label>
//                           <textarea
//                             className="form-control"
//                             id="shera"
//                             value={formData.shera}
//                             onChange={handleInputChange}
//                             rows="4" // You can adjust the number of rows as needed
//                           />
//                         </div>
//                       </Col>
//                     </Row>
//                     {/* Other form fields go here */}

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="year" className="form-label">
//                             वर्ष
//                           </Label>
//                           <Input type="select" id="year" value={formData.year} onChange={handleInputChange}>
//                             {yearRanges.map((range, index) => (
//                               <option key={index} value={range}>
//                                 {range}
//                               </option>
//                             ))}
//                           </Input>
//                         </div>
//                       </Col>

//                     <div className="text-center mt-3">
//                       <Button color="primary" onClick={handleSubmit}>
//                         सादर करा
//                       </Button>
//                       <Button color="secondary" onClick={handleSaveAndAddNew} className="ms-2">
//                         नवा नोंद करा
//                       </Button>
//                       <Button color="danger" onClick={handleReset} className="ms-2">
//                         रीसेट करा
//                       </Button>
//                     </div>

//                     {successMessage && (
//                       <div className="mt-3 alert alert-success">
//                         {successMessage}
//                       </div>
//                     )}

//                     {errorMessage && (
//                       <div className="mt-3 alert alert-danger">
//                         {errorMessage}
//                       </div>
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Namuna23;

import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Label, Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import "../BasicElements/style.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions

const Namuna23 = () => {
  document.title = "नमुना २३ - ताब्यातील रस्त्यांची नोंदवही";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    rastyacheNaaw: "",
    gaawPaasun: "",
    gaawParyant: "",
    laambiKm: "",
    rundiKm: "",
    rastyachaPrakar: "",
    purnKelyachiTarikh: "",
    pratiKmRastaTayarKarnyasAalelaKharch: "",
    durustyaChaluKharchRupaye: "",
    durustyaChaluSwarup: "",
    durustyaWisheshKharchRupaye: "",
    durustyaWisheshSwarup: "",
    durustyaMulBandhkamKharchRupaye: "",
    durustyaMulBandhkamSwarup: "",
    shera: "",
    year: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearRanges, setYearRanges] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");
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
  }, []);

  // Arabic to Marathi digits conversion function
  function arabicToMarathiDigits(input) {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return input.toString().replace(/[0-9]/g, (digit) => marathiDigits[digit]);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // format as yyyy-mm-dd
  };

  const handleSubmit = async () => {
    try {
      const requiredFields = [
        "rastyacheNaaw",
        "gaawPaasun",
        "gaawParyant",
        "laambiKm",
        "rundiKm",
        "rastyachaPrakar",
        "purnKelyachiTarikh",
        "pratiKmRastaTayarKarnyasAalelaKharch",
        "durustyaChaluKharchRupaye",
        "durustyaChaluSwarup",
        "durustyaWisheshKharchRupaye",
        "durustyaWisheshSwarup",
        "durustyaMulBandhkamKharchRupaye",
        "durustyaMulBandhkamSwarup",
        "shera",
        "year",
      ];

      // Validate required fields
      const isFormValid = requiredFields.every(
        (field) => formData[field]?.trim() !== "" // Check if fields are non-empty
      );

      if (!isFormValid) {
        const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any success messages
        console.error("Validation failed: Missing required fields");
        return;
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        const errorMessage = "प्रवेश नाकारला. कृपया लॉगिन करा.";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any previous success messages
        return;
      }

      console.log("Token retrieved:", token);

      // Modify date format before sending the data
      const formattedData = {
        ...formData,
        purnKelyachiTarikh: convertDateFormat(formData.purnKelyachiTarikh),
      };

      console.log("Formatted data prepared:", formattedData);

      // Send the POST request with the token
      const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });

      console.log("Server response:", response.data);

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या जतन केली गेली आहे";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
      console.log("Success message stored in sessionStorage:", successMessage);

      // Navigate to the report page
      navigate("/नमुना-२३-अहवाल");
    } catch (error) {
      console.error("Error during form submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा";
      if (error.response) {
        console.error("Server error response:", error.response);
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
      console.log("Error message stored in sessionStorage:", errorMessage);

      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      grampanchayatId: "",
      grampanchayatName: "",
      employeeId: "",
      employeeName: "",
      rastyacheNaaw: "",
      gaawPaasun: "",
      gaawParyant: "",
      laambiKm: "",
      rundiKm: "",
      rastyachaPrakar: "",
      purnKelyachiTarikh: "",
      pratiKmRastaTayarKarnyasAalelaKharch: "",
      durustyaChaluKharchRupaye: "",
      durustyaChaluSwarup: "",
      durustyaWisheshKharchRupaye: "",
      durustyaWisheshSwarup: "",
      durustyaMulBandhkamKharchRupaye: "",
      durustyaMulBandhkamSwarup: "",
      shera: "",
      year: "",
    });
  };

  const handleSubmit1 = async () => {
    console.log("Sending data:", formData);

    const requiredFields = [
      "rastyacheNaaw",
      "gaawPaasun",
      "gaawParyant",
      "laambiKm",
      "rundiKm",
      "rastyachaPrakar",
      "purnKelyachiTarikh",
      "pratiKmRastaTayarKarnyasAalelaKharch",
      "durustyaChaluKharchRupaye",
      "durustyaChaluSwarup",
      "durustyaWisheshKharchRupaye",
      "durustyaWisheshSwarup",
      "durustyaMulBandhkamKharchRupaye",
      "durustyaMulBandhkamSwarup",
      "shera",
      "year",
    ];

    // Validate required fields
    const validateFields = (fields, data) => fields.every((field) => data[field]?.trim() !== "");

    if (!validateFields(requiredFields, formData)) {
      const errorMessage = "कृपया सर्व आवश्यक क्षेत्रे भरा";
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
      console.error("Validation failed: Missing required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formattedData = { ...formData, purnKelyachiTarikh: convertDateFormat(formData.purnKelyachiTarikh) };

      console.log("Formatted Data:", formattedData);

      const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const successMessage = "माहिती यशस्वीरीत्या जतन करण्यात आली आहे!";
      sessionStorage.setItem("sessionMessage", successMessage);
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Response:", response.data);

      // Reset the form fields
      setFormData({
        id: "",
        grampanchayatId: "",
        grampanchayatName: "",
        employeeId: "",
        employeeName: "",
        rastyacheNaaw: "",
        gaawPaasun: "",
        gaawParyant: "",
        laambiKm: "",
        rundiKm: "",
        rastyachaPrakar: "",
        purnKelyachiTarikh: "",
        pratiKmRastaTayarKarnyasAalelaKharch: "",
        durustyaChaluKharchRupaye: "",
        durustyaChaluSwarup: "",
        durustyaWisheshKharchRupaye: "",
        durustyaWisheshSwarup: "",
        durustyaMulBandhkamKharchRupaye: "",
        durustyaMulBandhkamSwarup: "",
        shera: "",
        year: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error);

      let errorMessage = "माहिती जतन करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        console.error("API Error Response:", error.response);
        errorMessage = error.response.data.message; // Use error message from the response
      }

      sessionStorage.setItem("sessionMessage", errorMessage);
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

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
  const breadcrumbTitle = "नमुना २३ ताब्यातील रस्त्यांची नोंदवही"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२३ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२३-अहवाल", // Path
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 70%;
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
                <PreviewCardHeader title="नमुना २३ ताब्यातील रस्त्यांची नोंदवही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-२३-अहवाल")} />
                <CardBody className="card-body">
                  {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}

                  <div className="live-preview">
                    <Row className="gy-4">
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rastyacheNaaw" className="form-label">
                            रस्त्यांचे नाव
                          </Label>
                          <Input type="text" className="form-control" id="rastyacheNaaw" value={formData.rastyacheNaaw} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gaawPaasun" className="form-label">
                            गाव पासून
                          </Label>
                          <Input type="text" className="form-control" id="gaawPaasun" value={formData.gaawPaasun} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="gaawParyant" className="form-label">
                            गाव पर्यंत
                          </Label>
                          <Input type="text" className="form-control" id="gaawParyant" value={formData.gaawParyant} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="laambiKm" className="form-label">
                            लांबी (किलो मीटर)
                          </Label>
                          <Input type="text" className="form-control" id="laambiKm" value={formData.laambiKm} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rundiKm" className="form-label">
                            रुंदी (किलो मीटर)
                          </Label>
                          <Input type="text" className="form-control" id="rundiKm" value={formData.rundiKm} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="rastyachaPrakar" className="form-label">
                            रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा
                          </Label>
                          <Input type="text" className="form-control" id="rastyachaPrakar" value={formData.rastyachaPrakar} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="purnKelyachiTarikh" className="form-label">
                            पूर्ण केल्याची तारीख
                          </Label>
                          <Input type="date" className="form-control" id="purnKelyachiTarikh" value={formData.purnKelyachiTarikh} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="pratiKmRastaTayarKarnyasAalelaKharch" className="form-label">
                            प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च
                          </Label>
                          <Input type="text" className="form-control" id="pratiKmRastaTayarKarnyasAalelaKharch" value={formData.pratiKmRastaTayarKarnyasAalelaKharch} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaChaluKharchRupaye" className="form-label">
                            दुरुस्त्या चालू खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaChaluKharchRupaye" value={formData.durustyaChaluKharchRupaye} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaChaluSwarup" className="form-label">
                            दुरुस्त्या चालू स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaChaluSwarup" value={formData.durustyaChaluSwarup} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaWisheshKharchRupaye" className="form-label">
                            दुरुस्त्या विशेष खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaWisheshKharchRupaye" value={formData.durustyaWisheshKharchRupaye} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaWisheshSwarup" className="form-label">
                            दुरुस्त्या विशेष स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaWisheshSwarup" value={formData.durustyaWisheshSwarup} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaMulBandhkamKharchRupaye" className="form-label">
                            दुरुस्त्या मूळ बंधकाम खर्च रुपये
                          </Label>
                          <Input type="text" className="form-control" id="durustyaMulBandhkamKharchRupaye" value={formData.durustyaMulBandhkamKharchRupaye} onChange={handleInputChange} />
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="durustyaMulBandhkamSwarup" className="form-label">
                            दुरुस्त्या मूळ बंधकाम स्वरुप
                          </Label>
                          <Input type="text" className="form-control" id="durustyaMulBandhkamSwarup" value={formData.durustyaMulBandhkamSwarup} onChange={handleInputChange} />
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
                        </div>
                      </Col>
                      <Col xxl={3} md={3}>
                        <div>
                          <Label htmlFor="year" className="form-label">
                            वर्ष
                          </Label>
                          <Input type="select" className="form-control" id="year" value={formData.lekhaparikshanaAhvalcheVrsh} onChange={handleInputChange}>
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

                    <div className="col-lg-12" style={{ marginTop: "20px" }}>
                      <div className="text-start">
                        <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                          जतन करा
                        </Button>
                        <Button color="success" onClick={handleSubmit1} style={{ marginRight: "10px" }}>
                          जतन करून नवीन माहिती भरा
                        </Button>
                        <Button color="danger" onClick={handleReset} style={{ marginRight: "10px" }}>
                          रीसेट करा
                        </Button>
                        <Button color="primary" onClick={() => navigate("/नमुना-२३-अहवाल")}>
                          रद्द करा
                        </Button>
                      </div>
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

export default Namuna23;
