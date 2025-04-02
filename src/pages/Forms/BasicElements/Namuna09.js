// import React, { useState,useEffect} from 'react'

// import { Input, Button, Row, Col, Label, Card, CardBody, Container,FormGroup } from 'reactstrap';

// import axios from 'axios';

// import { useNavigate } from 'react-router-dom';

// import { setSessionMessage, getSessionMessage } from '../BasicElements/config1';
// import BreadCrumb from '../../../Components/Common/BreadCrumb';
// import UiContent from "../../../Components/Common/UiContent";

// const Namuna09 = () => {
//     document.title = "नमुना ०९";

//     const initialFormData = {
//         milkat_Number:'',
//         propertyOwnerName: '',
//         na_GharMagilBaki: '',
//         na_GharChaluKar: '',
//         na_GharTotal: '',
//         na_VijMagilBaki: '',
//         na_VijChaluKar: '',
//         na_VijTotal: '',
//         na_ArogyaMagilBaki: '',
//         na_ArogyaChaluKar: '',
//         na_ArogyaTotal: '',
//         na_PaniMagilBaki:'',
//         na_PaniChaluKar: '',
//         na_PaniTotal: '',
//         na_TotalKar: '',
//         bookNo: '',
//         bookNoOR_Date: '',
//         pavti_Number:'',
//         vasuli_GharMagilBaki: '',
//         vasuli_GharChaluKar:'',
//         vasuli_GharTotal: '',
//         vasuli_VijMagilBaki: '',
//         vasuli_VijChaluKar: '',
//         vasuli_VijTotal: '',
//         vasuli_ArogyaMagilBaki: '',
//         vasuli_ArogyaChaluKar: '',
//         vasuli_ArogyaTotal: '',
//         vasuli_PaniMagilBaki: '',
//         vasuli_PaniChaluKar: '',
//         vasuli_PaniTotal:'',
//         vasuli_TotalKar: '',
//         sutManjuriHukmacha_Ullekh: '',
//         sutManjuriHukmacha_Shera:'',
//         remark: '',
//         year: ''
//       };

//       const [formData, setFormData] = useState(initialFormData);

//       const [successMessage, setSuccessMessage] = useState(""); // State to track success
//       const [errorMessage, setErrorMessage] = useState(""); // State to track error
//       const navigate = useNavigate();
//       useEffect(() => {
//         const { type, message } = getSessionMessage(); // Fetch the session message
//         if (type && message) {
//           if (type === "success") {
//             setSuccessMessage(message);
//             setErrorMessage("");
//           } else if (type === "error") {
//             setErrorMessage(message);
//             setSuccessMessage("");
//           }
//         }
//       }, []); // Empty array ensures this runs only once when the component is mounted
//       const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [id]: value }));
//       };

//       const resetForm = () => {
//         setFormData(initialFormData);
//       };
//       const dropDown = ["option1", "option2", "option3", "option4"];

//       const arabicToMarathiDigits = (num) => {
//         const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//         return num
//           .toString()
//           .split("")
//           .map((digit) => marathiDigits[parseInt(digit)])
//           .join("");
//       };
//       const currentYear = new Date().getFullYear();
//       const yearRanges = Array.from({ length: 100 }, (_, i) => {
//         const startYear = currentYear - i;
//         const endYear = startYear + 1;
//         const startYearInMarathi = arabicToMarathiDigits(startYear);
//         const endYearInMarathi = arabicToMarathiDigits(endYear);
//         return `${startYearInMarathi} -${endYearInMarathi}`;
//       });

//       useEffect(() => {
//         // Helper function to calculate totals
//         const calculateTotal = (field1, field2, totalField) => {
//           const value1 = formData[field1] || "0";
//           const value2 = formData[field2] || "0";

//           // Determine numeral type based on input format (Marathi or Arabic numerals)
//           const numeralType = detectNumeralType(value1 || value2);

//           // Convert inputs to Arabic numerals for calculation
//           const num1 = parseFloat(toArabic(value1));
//           const num2 = parseFloat(toArabic(value2));

//           // Calculate total
//           const total = num1 + num2;

//           // Convert the total back to the original numeral system
//           const formattedTotal = total === 0 ? "" : fromArabic(total, numeralType);

//           // Update the form data with the calculated total
//           setFormData((prevState) => ({
//             ...prevState,
//             [totalField]: formattedTotal,
//           }));
//         };

//         // Call the calculateTotal function for each group of related fields
//         calculateTotal("na_GharMagilBaki", "na_GharChaluKar", "na_GharTotal");
//         calculateTotal("na_VijMagilBaki", "na_VijChaluKar", "na_VijTotal");
//         calculateTotal("na_ArogyaMagilBaki", "na_ArogyaChaluKar", "na_ArogyaTotal");
//         calculateTotal("na_PaniMagilBaki", "na_PaniChaluKar", "na_PaniTotal");
//         calculateTotal("vasuli_GharMagilBaki", "vasuli_GharChaluKar", "vasuli_GharTotal");
//         calculateTotal("vasuli_VijMagilBaki", "vasuli_VijChaluKar", "vasuli_VijTotal");
//         calculateTotal("vasuli_ArogyaMagilBaki", "vasuli_ArogyaChaluKar", "vasuli_ArogyaTotal");
//         calculateTotal("vasuli_PaniMagilBaki", "vasuli_PaniChaluKar", "vasuli_PaniTotal");

//       }, [
//         formData.na_GharMagilBaki,
//         formData.na_GharChaluKar,
//         formData.na_VijMagilBaki,
//         formData.na_VijChaluKar,
//         formData.na_ArogyaMagilBaki,
//         formData.na_ArogyaChaluKar,
//         formData.na_PaniMagilBaki,
//         formData.na_PaniChaluKar,
//         formData.vasuli_GharMagilBaki,
//         formData.vasuli_GharChaluKar,
//         formData.vasuli_VijMagilBaki,
//         formData.vasuli_VijChaluKar,
//         formData.vasuli_ArogyaMagilBaki,
//         formData.vasuli_ArogyaChaluKar,
//         formData.vasuli_PaniMagilBaki,
//         formData.vasuli_PaniChaluKar,
//       ]);

//       const handleSubmit = async () => {
//         const requiredFields = [
//         "milkat_Number",
//         "propertyOwnerName",
//         "na_GharMagilBaki",
//         "na_GharChaluKar",
//         "na_GharTotal",
//         "na_VijMagilBaki",
//         "na_VijChaluKar",
//         "na_VijTotal",
//         "na_ArogyaMagilBaki",
//         "na_ArogyaChaluKar",
//         "na_ArogyaTotal",
//         "na_PaniMagilBaki",
//         "na_PaniChaluKar",
//         "na_PaniTotal",
//         "na_TotalKar",
//         "bookNo",
//         "bookNoOR_Date",
//         "pavti_Number",
//         "vasuli_GharMagilBaki",
//         "vasuli_GharChaluKar",
//         "vasuli_GharTotal",
//         "vasuli_VijMagilBaki",
//         "vasuli_VijChaluKar",
//         "vasuli_VijTotal",
//         "vasuli_ArogyaMagilBaki",
//         "vasuli_ArogyaChaluKar",
//         "vasuli_ArogyaTotal",
//         "vasuli_PaniMagilBaki",
//         "vasuli_PaniChaluKar",
//         "vasuli_PaniTotal",
//         "vasuli_TotalKar",
//         "sutManjuriHukmacha_Ullekh",
//         "sutManjuriHukmacha_Shera",
//         "remark",
//         "year"
//         ];

//         // Validate required fields
//         for (let field of requiredFields) {
//           if (!formData[field] || formData[field].trim() === "") {
//             const errorMessage = "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा"; // Customize field name for user-friendly message
//             setErrorMessage(errorMessage);
//             setSuccessMessage("");
//             return;
//           }
//         }

//         try {
//           const response = await axios.post(
//             "http://localhost:8080/egram9/create",
//             formData,
//             { headers: { "Content-Type": "application/json" } }
//           );

//           sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
//           setSuccessMessage("माहिती यशस्वीरीत्या जतन केली गेली आहे");
//           setErrorMessage(""); // Clear error messages
//           navigate("/report09");
//         } catch (error) {
//           let errorMessage = error.response?.data?.message || "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
//           sessionStorage.setItem("sessionMessage", errorMessage);
//           setErrorMessage(errorMessage);
//           setSuccessMessage("");
//         }
//       };

//       const renderInputFields = () => {
//         return Object.keys(initialFormData).map((field, index) => (
//           <Col xxl={3} md={6} key={index}>
//             <div>
//               <Label htmlFor={field} className="form-label">
//                 {/* Replace underscores with spaces and capitalize each word */}
//                 {field.replace(/([A-Z])/g, " $1").toUpperCase()}
//               </Label>
//               <Input type={field.includes("date") ? "date" : field.includes("number") ? "number" : "text"} className="form-control" id={field} value={formData[field]} onChange={handleInputChange} />
//             </div>
//           </Col>
//         ));
//       };
//       const handleSaveAndNew = async () => {
//         const requiredFields = [
//         "milkat_Number",
//         "propertyOwnerName",
//         "na_GharMagilBaki",
//         "na_GharChaluKar",
//         "na_GharTotal",
//         "na_VijMagilBaki",
//         "na_VijChaluKar",
//         "na_VijTotal",
//         "na_ArogyaMagilBaki",
//         "na_ArogyaChaluKar",
//         "na_ArogyaTotal",
//         "na_PaniMagilBaki",
//         "na_PaniChaluKar",
//         "na_PaniTotal",
//         "na_TotalKar",
//         "bookNo",
//         "bookNoOR_Date",
//         "pavti_Number",
//         "vasuli_GharMagilBaki",
//         "vasuli_GharChaluKar",
//         "vasuli_GharTotal",
//         "vasuli_VijMagilBaki",
//         "vasuli_VijChaluKar",
//         "vasuli_VijTotal",
//         "vasuli_ArogyaMagilBaki",
//         "vasuli_ArogyaChaluKar",
//         "vasuli_ArogyaTotal",
//         "vasuli_PaniMagilBaki",
//         "vasuli_PaniChaluKar",
//         "vasuli_PaniTotal",
//         "vasuli_TotalKar",
//         "sutManjuriHukmacha_Ullekh",
//         "sutManjuriHukmacha_Shera",
//         "remark",
//         "year"
//         ];

//         for (let field of requiredFields) {
//             if (!formData[field] || formData[field].trim() === "") {
//               console.error(`Field '${field}' is empty or invalid`);
//               setErrorMessage(`Please fill out the '${field}' field.`);
//               return;
//             }
//           }

//         try {
//           const response = await axios.post("http://localhost:8080/egram9/create", formData, {
//             headers: { "Content-Type": "application/json" },
//           });

//           // Save success message and reset form for new entry
//           sessionStorage.setItem("sessionMessage", "माहिती यशस्वीरीत्या जतन केली गेली आहे");
//           setSuccessMessage("माहिती यशस्वीरीत्या जतन केली गेली आहे");
//           setErrorMessage(""); // Clear error messages
//           setFormData(initialFormData); // Reset form fields for new entry
//         } catch (error) {
//           let errorMessage = error.response?.data?.message || "डेटा सबमिट करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
//           sessionStorage.setItem("sessionMessage", errorMessage);
//           setErrorMessage(errorMessage);
//           setSuccessMessage(""); // Clear success message
//         }
//       };

//       // Define months for the select dropdown
//       const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

//       const detectNumeralType = (numString) => {
//         if (/^[0-9]+$/.test(numString)) return "english";
//         if (/^[०-९]+$/.test(numString)) return "marathi";
//         if (/^[०-९]+$/.test(numString)) return "hindi";
//         return "english"; // Default to English if undetected
//       };

//       // Function to convert Marathi/Hindi digits to Arabic
//       const toArabic = (numString) => {
//         const digitsMap = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
//         return numString.replace(/[०-९]/g, (digit) => digitsMap[digit]);
//       };

//       // Function to convert Arabic digits to Marathi/Hindi
//       const fromArabic = (num, numeralType) => {
//         const marathiHindiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//         return numeralType === "english" ? num.toString() : num.toString().replace(/[0-9]/g, (digit) => marathiHindiDigits[parseInt(digit)]);
//       };

// useEffect(() => {
//   // Extract the values for the relevant "total" fields
//   const totalGhar = formData.na_GharTotal || "0";
//   const totalVij = formData.na_VijTotal || "0";
//   const totalArogya = formData.na_ArogyaTotal || "0";
//   const totalPani = formData.na_PaniTotal || "0";

//   // Convert the fields to Arabic numerals (if in Marathi or Hindi numerals)
//   const ghar = parseFloat(toArabic(totalGhar));
//   const vij = parseFloat(toArabic(totalVij));
//   const arogya = parseFloat(toArabic(totalArogya));
//   const pani = parseFloat(toArabic(totalPani));

//   // Calculate the total sum
//   const totalKar = ghar + vij + arogya + pani;

//   // Convert the total sum back to the original numeral format (if needed)
//   const formattedTotalKar = totalKar === 0 ? "" : fromArabic(totalKar, detectNumeralType(totalGhar || totalVij || totalArogya || totalPani));

//   // Update the na_TotalKar field in the form data
//   setFormData((prevState) => ({
//     ...prevState,
//     na_TotalKar: formattedTotalKar,
//   }));
// }, [
//   formData.na_GharTotal,
//   formData.na_VijTotal,
//   formData.na_ArogyaTotal,
//   formData.na_PaniTotal,
// ]);

// useEffect(() => {
//     // Extract the values for the relevant "total" fields
//     const totalGhar1 = formData.vasuli_GharTotal || "0";
//     const totalVij1 = formData.vasuli_VijTotal || "0";
//     const totalArogya1 = formData.vasuli_ArogyaTotal || "0";
//     const totalPani1 = formData.vasuli_PaniTotal || "0";

//     // Convert the fields to Arabic numerals (if in Marathi or Hindi numerals)
//     const ghar = parseFloat(toArabic(totalGhar1));
//     const vij = parseFloat(toArabic(totalVij1));
//     const arogya = parseFloat(toArabic(totalArogya1));
//     const pani = parseFloat(toArabic(totalPani1));

//     // Calculate the total sum
//     const totalKar1 = ghar + vij + arogya + pani;

//     // Convert the total sum back to the original numeral format (if needed)
//     const formattedTotalKar = totalKar1 === 0 ? "" : fromArabic(totalKar1, detectNumeralType(totalGhar1 || totalVij1 || totalArogya1 || totalPani1));

//     // Update the na_TotalKar field in the form data
//     setFormData((prevState) => ({
//       ...prevState,
//       vasuli_TotalKar: formattedTotalKar,
//     }));
//   }, [
//     formData.vasuli_GharTotal,
//     formData.vasuli_VijTotal,
//     formData.vasuli_ArogyaTotal,
//     formData.vasuli_PaniTotal,
//   ]);

//     return (
//         <React.Fragment>
//             <UiContent />
//             <div className="page-content" style={{backgroundColor: '#fbf7f4'}}>
//                 <Container fluid>
//                     <BreadCrumb title="" pageTitle="Forms" />

//                     <Row>
//                         <Col lg={12}>
//                             <Card>
//                             <CardBody>
//                                 {/* <div className="card-header d-flex justify-content-between align-items-center">
//                                     <h5 className="mb-0">गुंतवणूक वही</h5>
//                                     <Button color="primary" onClick={() => navigate('/report')}>
//                                         Report
//                                     </Button>
//                                 </div> */}
//                                 {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//                                 <Row className="gy-4">
//                                         <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
//                                             <div>
//                                                 <h4 className="card-title mb-4"><strong>कर मागणी नोंदवही</strong></h4>
//                                             </div>
//                                             <div>

//                                     <Button color="primary" onClick={() => navigate('/report09')}>
//                                     मागे जा
//                                     </Button>
//                                             </div>
//                                         </Col>
//                                     </Row>

//                                     <div className="live-preview">

//                                         {/* Regular Kar Section */}
//                                         <h5 className="mt-4 "><strong>रेग्युलर कर</strong></h5>

//                                         <Row className="gy-4">
//                                             {/* Date Picker Fields */}
//                                             <Col xxl={3} md={3}>

//                                            <div>
//                                                        <Label htmlFor="milkat_Number" className="form-label" style = {{marginTop:'25px'}}>मिळकत नंबर</Label>
//                                                        <Input type="text" className="form-control" id="milkat_Number" value={formData.milkat_Number} onChange={handleInputChange}/>

//                                            </div>
//                                         </Col>
//                                               <Col xxl={3} md={3}>
//                                                  <div>
//                                                     <Label htmlFor="propertyOwnerName" className="form-label" >मिळकतीचे नाव व ज्या इसमाकडून कर येणे असेल त्या इस्माचे नाव</Label>
//                                                     <Input type="text" className="form-control" id="propertyOwnerName" value={formData.propertyOwnerName} onChange={handleInputChange}/>
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_GharMagilBaki" className="form-label">रेग्युलर खाते येणे रकमी घरपट्टी (मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="na_GharMagilBaki" value={formData.na_GharMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_GharChaluKar" className="form-label">रेग्युलर खाते येणे रकमी घरपट्टी<br />(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="na_GharChaluKar" value={formData.na_GharChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_GharTotal" className="form-label">रेग्युलर खाते येणे रकमी घरपट्टी<br />(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="na_GharTotal" value={formData.na_GharTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_VijMagilBaki" className="form-label">रेग्युलर खाते येणे रकमी वीज कर(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="na_VijMagilBaki" value={formData.na_VijMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_VijChaluKar" className="form-label">रेग्युलर खाते येणे रकमी वीज कर<br />(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="na_VijChaluKar" value={formData.na_VijChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                             <div>
//                                                     <Label htmlFor="na_VijTotal" className="form-label">रेग्युलर खाते येणे रकमी वीज कर<br/>(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="na_VijTotal" value={formData.na_VijTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_ArogyaMagilBaki" className="form-label">रेग्युलर खाते येणे रकमी आरोग्य कर(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="na_ArogyaMagilBaki" value={formData.na_ArogyaMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_ArogyaChaluKar" className="form-label">रेग्युलर खाते येणे रकमी आरोग्य कर(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="na_ArogyaChaluKar" value={formData.na_ArogyaChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_ArogyaTotal" className="form-label">रेग्युलर खाते येणे रकमी आरोग्य कर<br />(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="na_ArogyaTotal" value={formData.na_ArogyaTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_PaniMagilBaki" className="form-label">रेग्युलर खाते येणे रकमी पाणीपट्टी कर(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="na_PaniMagilBaki" value={formData.na_PaniMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_PaniChaluKar" className="form-label">रेग्युलर खाते येणे रकमी पाणीपट्टी कर(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="na_PaniChaluKar" value={formData.na_PaniChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_PaniTotal" className="form-label">रेग्युलर खाते येणे रकमी पाणीपट्टी कर<br />(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="na_PaniTotal" value={formData.na_PaniTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="na_TotalKar" className="form-label" style = {{marginTop:'25px'}}>एकूण येणे कर</Label>
//                                                     <Input type="text" className="form-control" id="na_TotalKar" value={formData.na_TotalKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="bookNo" className="form-label" style = {{marginTop:'25px'}}>बुक नंबर</Label>
//                                                     <Input type="text" className="form-control" id="bookNo" value={formData.bookNo} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="bookNoOR_Date" className="form-label">पावती तारीख</Label>
//                                                     <Input type="date" className="form-control" id="bookNoOR_Date" value={formData.bookNoOR_Date} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="pavti_Number" className="form-label">पावती नंबर</Label>
//                                                     <Input type="text" className="form-control" id="pavti_Number" value={formData.pavti_Number} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             </Row>
//                                             </div>
//                                             </CardBody>
//                                             </Card>
//                                             </Col>
//                                             </Row>
//                                             <Row>
//                         <Col lg={12}>
//                             <Card>
//                             <CardBody>
//                                             <div className="live-preview">

//                                             <h5 className="mt-4"><strong>वसुली कर</strong></h5>
//                                             <Row className="gy-4" style={{ marginTop: '1px'}}>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_GharMagilBaki" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_GharMagilBaki" value={formData.vasuli_GharMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_GharChaluKar" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_GharChaluKar" value={formData.vasuli_GharChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_GharTotal" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_GharTotal" value={formData.vasuli_GharTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_VijMagilBaki" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_VijMagilBaki" value={formData.vasuli_VijMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_VijChaluKar" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_VijChaluKar" value={formData.vasuli_VijChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_VijTotal" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_VijTotal" value={formData.vasuli_VijTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_ArogyaMagilBaki" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_ArogyaMagilBaki" value={formData.vasuli_ArogyaMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_ArogyaChaluKar" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_ArogyaChaluKar" value={formData.vasuli_ArogyaChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_ArogyaTotal" className="form-label">रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_ArogyaTotal" value={formData.vasuli_ArogyaTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_PaniMagilBaki" className="form-label">पाणीपट्टी/बोअरवेल <br />(मागील बाकी)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_PaniMagilBaki" value={formData.vasuli_PaniMagilBaki} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_PaniChaluKar" className="form-label">पाणीपट्टी/बोअरवेल <br />(चालू कर)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_PaniChaluKar" value={formData.vasuli_PaniChaluKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_PaniTotal" className="form-label">पाणीपट्टी/बोअरवेल<br />(एकूण)</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_PaniTotal" value={formData.vasuli_PaniTotal} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="vasuli_TotalKar" className="form-label">एकूण वसूल कर रक्कम रूपये</Label>
//                                                     <Input type="text" className="form-control" id="vasuli_TotalKar" value={formData.vasuli_TotalKar} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="sutManjuriHukmacha_Ullekh" className="form-label">सूट मंजूर देणाऱ्या हुकूमचे उल्लेख</Label>
//                                                     <Input type="text" className="form-control" id="sutManjuriHukmacha_Ullekh" value={formData.sutManjuriHukmacha_Ullekh} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="sutManjuriHukmacha_Shera" className="form-label">सूट मंजूर देणाऱ्या हुकूमचे शेरा </Label>
//                                                     <Input type="text" className="form-control" id="sutManjuriHukmacha_Shera" value={formData.sutManjuriHukmacha_Shera} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                             <Col xxl={3} md={3}>
//                                                 <div>
//                                                 <Label htmlFor="year" className="form-label">
//                                                     वर्ष
//                                                 </Label>
//                                                 <Input type="select" id="year" value={formData.year} onChange={handleInputChange}>
//                                                     <option value="">वर्ष निवडा</option>
//                                                     {yearRanges.map((yearRange) => (
//                                                     <option key={yearRange} value={yearRange}>
//                                                         {yearRange}
//                                                     </option>
//                                                     ))}
//                                                 </Input>
//                                                 </div>
//                                             </Col>
//                                             <Col xxl={3} md={6}>
//                                                 <div>
//                                                     <Label htmlFor="remark" className="form-label">शेरा</Label>
//                                                     <Input type="textarea" className="form-control" id="remark" value={formData.remark} onChange={handleInputChange} />
//                                                 </div>
//                                             </Col>

//                                         </Row>
//                                     </div>

//                                     {/* Success/ Error Message */}
//                                     {successMessage && <div className="alert alert-success">{successMessage}</div>}

//                                     <div className="col-lg-12">
//                                         <div className="d-flex justify-content-start button-container">
//                                         <Button color="success" onClick={handleSubmit}>जतन करा</Button>
//                                             <Button color="success" onClick={handleSaveAndNew}>जतन करून नवीन माहिती भरा</Button>

//                                             <Button color="danger" onClick={() => window.location.href = '/report09'}>रद्द करा</Button>
//                                             <Button color="primary" onClick={resetForm}>रिसेट करा</Button>
//                                         </div>
//                                     </div>

//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </React.Fragment>
//     );
// };

// export default Namuna09;
