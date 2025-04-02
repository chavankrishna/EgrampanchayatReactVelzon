// // import React, { useState, useEffect } from "react";
// // import { Input, Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap";
// // import axios from "axios";
// // import { useNavigate, useParams, useLocation } from "react-router-dom"; // <-- Added useLocation here
// // import UiContent from "../../../Components/Common/UiContent";
// // import BreadCrumb from "../../../Components/Common/BreadCrumb";
// // import "../BasicElements/style.css";

// // const Demo3 = () => {
// //   const { state } = useLocation(); // Access the passed record data from the previous page
// //   const navigate = useNavigate();
// //   const years = [];
// //   const [formData, setFormData] = useState(state || {});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [selectedYear, setSelectedYear] = useState(""); // Initialize with an empty string
// //   //const id = data?.id;

// //   useEffect(() => {
// //     if (!state && formData.grampanchyatId) {
// //       const fetchRecord = async () => {
// //         try {
// //           const response = await axios.post(`http://localhost:8080/masikvivaran/getById/${record.id}`);
// //           setFormData(response.data);
// //         } catch (err) {
// //           console.error("Error fetching record:", err);
// //           setError("Error fetching record");
// //         }
// //       };
// //       fetchRecord();
// //     }
// //   }, [state, formData.id]);

// //   //----------------------------------------------------------------------------------------------------------------------------------------------

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     const newValue = value ? parseFloat(value) : 0;
// //     //

// //     setFormData((prevData) => {
// //       const newFormData = { ...prevData, [id]: value };
// //       // Example integration with { label: "सन", id: "san" }
// //       // Dropdown component for years

// //       // Calculate product for mojmapachaTapshilEkun
// //       // if (
// //       //     id === 'mojmapachaTapshilLaambi' ||
// //       //     id === 'mojmapachaTapshilRundi' ||
// //       //     id === 'mojmapachaTapshilKholiUnchi'
// //       // ) {
// //       //     const laambi = parseFloat(newFormData.mojmapachaTapshilLaambi) || 0;
// //       //     const rundi = parseFloat(newFormData.mojmapachaTapshilRundi) || 0;
// //       //     const kholiUnchi = parseFloat(newFormData.mojmapachaTapshilKholiUnchi) || 0;
// //       //     newFormData.mojmapachaTapshilEkun = (laambi * rundi * kholiUnchi).toString();
// //       // }

// //       // // Calculate sum for ekunMojmapachaTapshilEkunVaEkunParimanMaap
// //       // const mojmapachaTapshilEkun = parseFloat(newFormData.mojmapachaTapshilEkun) || 0;
// //       // const ekunParimanMaap = parseFloat(newFormData.ekunParimanMaapPurvicheHajeriPramaneWarnanKarave) || 0;
// //       // newFormData.ekunMojmapachaTapshilEkunVaEkunParimanMaap = (mojmapachaTapshilEkun + ekunParimanMaap).toString();

// //       // return newFormData;
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     const requiredFields = [
// //       "id",
// //       "gramPanchayatId",
// //       "gramPanchayatName",
// //       "employeeId",
// //       "employeeName",
// //       "sanMadhemagasvargiyansathiKeleliTartud",
// //       "san",
// //       "chaluMahinyatPraptaJhaleleUtpanna",
// //       "fiftyTakkeKharchaKarychiRakkam",
// //       "kharchachyaBabiYojanavar",
// //       "magilMahinayatJhalelaKharcha",
// //       "chaluMahinyatJhalelaKharcha",
// //       "ekunKharch",
// //       "kharchachiTakkevari",
// //       "shera",
// //       "month",
// //       "year",
// //     ];

// //     if (!requiredFields.every((field) => formData[field] && formData[field].trim() !== "")) {
// //       alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(`http://localhost:8080/masikvivaran/update/${formData.id}`, formData, { headers: { "Content-Type": "application/json" } });
// //       alert("माहिती यशस्वीरीत्या जतन केली गेली आहे");
// //       navigate("/नमुना-२१-report");
// //     } catch (error) {
// //       alert("Failed to submit data: " + (error.response?.data?.message || "Unknown error"));
// //     }
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       id: "",
// //       gramPanchayatId: "",
// //       gramPanchayatName: "",
// //       employeeId: "",
// //       employeeName: "",
// //       sanMadhemagasvargiyansathiKeleliTartud: "",
// //       san: "",
// //       chaluMahinyatPraptaJhaleleUtpanna: "",
// //       fiftyTakkeKharchaKarychiRakkam: "",
// //       kharchachyaBabiYojanavar: "",
// //       magilMahinayatJhalelaKharcha: "",
// //       chaluMahinyatJhalelaKharcha: "",
// //       ekunKharch: "",
// //       kharchachiTakkevari: "",
// //       shera: "",
// //       month: "",
// //       year: "",
// //     });
// //   };

// //   const handleSaveAndAddNew = () => {
// //     handleSubmit();
// //     handleReset();
// //   };

// //   return (
// //     <React.Fragment>
// //       <UiContent />
// //       <div className="page-content">
// //         <Container fluid>
// //           <BreadCrumb title="नमुना २१ - मोजमाप वही" pageTitle="फॉर्म" className="custom-breadcrumb" />
// //           <Row>
// //             <Col lg={12}>
// //               <Card>
// //                 <CardBody>
// //                   <Row className="gy-4">
// //                     <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
// //                       <div>
// //                         <h4 className="card-title mb-4">मोजमाप वही - अद्यतन करा</h4>
// //                       </div>
// //                       <div>
// //                         <Button color="primary" onClick={() => navigate(-1)}>
// //                           <i className="bx bx-arrow-back"></i>मागे जा
// //                         </Button>
// //                       </div>
// //                     </Col>
// //                   </Row>
// //                   <Row className="gy-4">
// //                     {[
// //                       { label: "सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद", id: "sanMadhemagasvargiyansathiKeleliTartud" },
// //                       { label: "सन", id: "san" },
// //                       { label: "चालू महिन्यात प्राप्त झालेले उत्पन्न", id: "chaluMahinyatPraptaJhaleleUtpanna" },
// //                       { label: "१५ टक्के खर्च करावयाची रक्कम", id: "fiftyTakkeKharchaKarychiRakkam" },
// //                       { label: "खर्चाच्या बाबी बाबवार / योजनावार", id: "kharchachyaBabiYojanavar" },
// //                       { label: "मागील महिन्यात झालेला खर्च", id: "magilMahinayatJhalelaKharcha" },
// //                       { label: "चालू महिन्यात झालेला खर्च", id: "chaluMahinyatJhalelaKharcha" },
// //                       { label: "एकूण खर्च", id: "ekunKharch" },
// //                       { label: "खर्चाची टक्केवारी", id: "kharchachiTakkevari" },
// //                       { label: "शेरा", id: "shera" },
// //                       { label: "महिना", id: "month" },
// //                       { label: "वर्ष", id: "year" },
// //                     ].map((field, index) => (
// //                       <Col key={index} xxl={3} md={3}>
// //                         <div>
// //                           <Label htmlFor={field.id} className="form-label">
// //                             {field.label}
// //                           </Label>
// //                           {field.type === "select" ? (
// //                             <Input type="select" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange}>
// //                               {field.options.map((option, i) => (
// //                                 <option key={i} value={option}>
// //                                   {option}
// //                                 </option>
// //                               ))}
// //                             </Input>
// //                           ) : (
// //                             <Input type="text" id={field.id} className="form-control" value={formData[field.id] || ""} onChange={handleInputChange} />
// //                           )}
// //                         </div>
// //                       </Col>
// //                     ))}
// //                   </Row>
// //                   <div className="text-start" style={{ marginTop: "20px" }}>
// //                     <Button color="success" onClick={handleSubmit}>
// //                       अद्यतन करा
// //                     </Button>
// //                     <Button color="danger" onClick={() => navigate("/report28")} style={{ marginLeft: "10px" }}>
// //                       रद्द करा
// //                     </Button>
// //                     <Button color="primary" onClick={handleReset} style={{ marginLeft: "10px" }}>
// //                       रिसेट करा
// //                     </Button>
// //                   </div>
// //                 </CardBody>
// //               </Card>
// //             </Col>
// //           </Row>
// //         </Container>
// //       </div>
// //     </React.Fragment>
// //   );
// // };

// // export default Demo3;

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import axios from "axios";
// // // import { Input, Button, Card, CardBody, Col, Container, Label, Row, Form } from "reactstrap";
// // // import UiContent from "../../../Components/Common/UiContent";
// // // import BreadCrumb from "../../../Components/Common/BreadCrumb";
// // // import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

// // // const Demo3 = () => {
// // //   const { state } = useLocation(); // Access the passed record data from the previous page
// // //   const navigate = useNavigate();
// // //   const [record, setRecord] = useState(state || {});
// // //   const [formData, setFormData] = useState({});
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   // If no state was passed, fetch record by ID
// // //   useEffect(() => {
// // //     if (!state && record.id) {
// // //       const fetchRecord = async () => {
// // //         try {
// // //           const response = await axios.get(`http://localhost:8080/masikvivaran/getById/${record.id}`);
// // //           setRecord(response.data);
// // //         } catch (err) {
// // //           console.error("Error fetching record:", err);
// // //           setError("Error fetching record");
// // //         }
// // //       };
// // //       fetchRecord();
// // //     }
// // //   }, [state, record.id]);

// // //   //   const handleInputChange = (e) => {
// // //   //     const { name, value } = e.target;
// // //   //     setRecord((prevState) => ({
// // //   //       ...prevState,
// // //   //       [name]: value,
// // //   //     }));
// // //   //   };
// // //    const handleInputChangee = (e) => {
// // //      const { id, value } = e.target;
// // //      setFormData((prevData) => {
// // //        const newData = { ...prevData, [id]: value };
// // //        //--------------------------------------------------------------------------------------
// // //        // Check if the changed field is 'chaluMahinyatPraptaJhaleleUtpanna'
// // //        //15% vla logic
// // //        if (id === "chaluMahinyatPraptaJhaleleUtpanna") {
// // //          const numeralType = detectNumeralType(value);
// // //          const utpanna = parseFloat(numeralType === "marathi" ? toArabicc(value) : value);

// // //          if (!isNaN(utpanna)) {
// // //            const calculatedValue = (utpanna * 0.15).toFixed(2);
// // //            // Convert calculated value back to the detected numeral type
// // //            newData.fiftyTakkeKharchaKarychiRakkam = numeralType === "marathi" ? ToMarathiDigitsss(calculatedValue) : calculatedValue;
// // //          } else {
// // //            newData.fiftyTakkeKharchaKarychiRakkam = ""; // Clear if input is invalid
// // //          }
// // //        }

// // //        return newData;

// // //        //-------------------------------------------------------------------------------------------------
// // //      });
// // //    };

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({
// // //       ...record,
// // //       [name]: value,
// // //     });
// // //   };

// // //   //Single Year Vla Logic
// // //   // Function to convert Arabic digits to Marathi digits
// // //   const arabicToMarathiDigitss = (num) => {
// // //     const marathiDigitss = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
// // //     return num
// // //       .toString()
// // //       .split("")
// // //       .map((digit) => marathiDigitss[parseInt(digit)])
// // //       .join("");
// // //   };
// // //   // Function to generate Single years in Marathi
// // //   const SinglegenerateYear = () => {
// // //     const currentYear = new Date().getFullYear();
// // //     const startYear = currentYear - 100; // Start 100 years back
// // //     const years = [];
// // //     for (let i = startYear; i <= currentYear; i++) {
// // //       // Convert each year to Marathi digits
// // //       const yearInMarathi = arabicToMarathiDigitss(i);
// // //       years.push(yearInMarathi);
// // //     }
// // //     return years;
// // //   };
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       // Send update request
// // //       const response = await axios.post(`http://localhost:8080/masikvivaran/update/${record.id}`, record);

// // //       // Check if the update was successful
// // //       if (response.status === 200) {
// // //         alert("Record updated successfully");
// // //         navigate("/report28"); // Navigate back to the report page after successful update
// // //       } else {
// // //         setError("Failed to update record");
// // //       }
// // //     } catch (err) {
// // //       setLoading(false);
// // //       // Detailed error handling
// // //       if (err.response) {
// // //         setError(`Error: ${err.response.data.message || "Error updating record"}`);
// // //       } else if (err.request) {
// // //         setError("Error: No response from server");
// // //       } else {
// // //         setError(`Error: ${err.message}`);
// // //       }
// // //       console.error("Error updating record:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Reset the form
// // //   const handleReset = () => {
// // //     setRecord({
// // //       id: "",
// // //       gramPanchayatId: "",
// // //       gramPanchayatName: "",
// // //       employeeId: "",
// // //       employeeName: "",
// // //       sanMadhemagasvargiyansathiKeleliTartud: "",
// // //       san: "",
// // //       chaluMahinyatPraptaJhaleleUtpanna: "",
// // //       fiftyTakkeKharchaKarychiRakkam: "",
// // //       kharchachyaBabiYojanavar: "",
// // //       magilMahinayatJhalelaKharcha: "",
// // //       chaluMahinyatJhalelaKharcha: "",
// // //       ekunKharch: "",
// // //       kharchachiTakkevari: "",
// // //       shera: "",
// // //       month: "",
// // //       year: "",
// // //     });
// // //   };

// // //   // Detect numeral type (English, Marathi, Hindi)
// // //   const detectNumeralType = (numString) => {
// // //     if (/^[0-9]+$/.test(numString)) return "english";
// // //     if (/^[०-९]+$/.test(numString)) return "marathi";
// // //     if (/^[०-९]+$/.test(numString)) return "hindi";
// // //     return "english"; // Default to English if undetected
// // //   };

// // //   // Convert Marathi digits to Arabic
// // //   const toArabic = (numString) => {
// // //     const digitsMap = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
// // //     return numString.replace(/[०-९]/g, (digit) => digitsMap[digit]);
// // //   };

// // //   // Convert Arabic digits back to Marathi
// // //   const fromArabic = (num, numeralType) => {
// // //     const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
// // //     return numeralType === "english" ? num.toString() : num.toString().replace(/[0-9]/g, (digit) => marathiDigits[parseInt(digit)]);
// // //   };

// // //   useEffect(() => {
// // //     const { magilMahinayatJhalelaKharcha, chaluMahinyatJhalelaKharcha } = record;
// // //     const numeralType = detectNumeralType(magilMahinayatJhalelaKharcha || chaluMahinyatJhalelaKharcha || "0");

// // //     const magilExpense = parseFloat(toArabic(magilMahinayatJhalelaKharcha || "0"));
// // //     const chaluExpense = parseFloat(toArabic(chaluMahinyatJhalelaKharcha || "0"));
// // //     const totalExpense = magilExpense + chaluExpense;

// // //     const formattedTotal = totalExpense === 0 ? "" : fromArabic(totalExpense, numeralType);

// // //     setRecord((prevState) => ({
// // //       ...prevState,
// // //       ekunKharch: formattedTotal,
// // //     }));
// // //   }, [record.magilMahinayatJhalelaKharcha, record.chaluMahinyatJhalelaKharcha]);

// // //   const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

// // //   // For years, create an array of the last 100 years
// // //   const arabicToMarathiDigits = (num) => {
// // //     const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
// // //     return num
// // //       .toString()
// // //       .split("")
// // //       .map((digit) => marathiDigits[parseInt(digit)])
// // //       .join("");
// // //   };
// // //   const currentYear = new Date().getFullYear();
// // //   const yearRanges = Array.from({ length: 100 }, (_, i) => {
// // //     const startYear = currentYear - i;
// // //     const endYear = startYear + 1;
// // //     const startYearInMarathi = arabicToMarathiDigits(startYear);
// // //     const endYearInMarathi = arabicToMarathiDigits(endYear);
// // //     return `${startYearInMarathi} -${endYearInMarathi}`;
// // //   });

// // //   return (
// // //     <React.Fragment>
// // //       <UiContent />
// // //       <div className="page-content">
// // //         <Container fluid>
// // //           <BreadCrumb title="नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही" pageTitle="Forms" />
// // //           <Row>
// // //             <Col lg={12}>
// // //               <Card>
// // //                 <PreviewCardHeader title="नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही" buttonLabel="मागे जा" onButtonClick={() => navigate("/report28")} />
// // //                 <CardBody className="card-body">
// // //                   <div className="live-preview">
// // //                     <Row className="gy-4">
// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="sanMadhemagasvargiyansathiKeleliTartud" className="form-label">
// // //                             सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद
// // //                           </Label>
// // //                           <Input
// // //                             type="text"
// // //                             className="form-control"
// // //                             id="sanMadhemagasvargiyansathiKeleliTartud"
// // //                             value={record.sanMadhemagasvargiyansathiKeleliTartud}
// // //                             name="sanMadhemagasvargiyansathiKeleliTartud"
// // //                             onChange={handleInputChange}
// // //                           />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="san" className="form-label">
// // //                             सन{" "}
// // //                           </Label>
// // //                           {/* <Input type="text" className="form-control" id="san" value={formData.san} onChange={handleInputChange} /> */}
// // //                           <Input type="select" id="san" value={record.san} name="san" onChange={handleInputChange}>
// // //                             <option value="">वर्ष निवडा</option>
// // //                             {SinglegenerateYear().map((san) => (
// // //                               <option key={san} value={san}>
// // //                                 {san}
// // //                               </option>
// // //                             ))}
// // //                           </Input>
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="chaluMahinyatPraptaJhaleleUtpanna" className="form-label">
// // //                             चालू महिन्यात प्राप्त झालेले उत्पन्न
// // //                           </Label>
// // //                           <Input
// // //                             type="text"
// // //                             className="form-control"
// // //                             id="chaluMahinyatPraptaJhaleleUtpanna"
// // //                             value={record.chaluMahinyatPraptaJhaleleUtpanna}
// // //                             name="chaluMahinyatPraptaJhaleleUtpanna"
// // //                             onChange={handleInputChangee}
// // //                           />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="fiftyTakkeKharchaKarychiRakkam" className="form-label">
// // //                             १५ टक्के खर्च करावयाची रक्कम
// // //                           </Label>
// // //                           <Input type="text" className="form-control" id="fiftyTakkeKharchaKarychiRakkam" value={record.fiftyTakkeKharchaKarychiRakkam} readOnly />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="kharchachyaBabiYojanavar" className="form-label">
// // //                             खर्चाच्या बाबी बाबवार / योजनावार
// // //                           </Label>
// // //                           <Input
// // //                             type="text"
// // //                             className="form-control"
// // //                             id="kharchachyaBabiYojanavar"
// // //                             value={record.kharchachyaBabiYojanavar}
// // //                             name="kharchachyaBabiYojanavar"
// // //                             onChange={handleInputChange}
// // //                           />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="magilMahinayatJhalelaKharcha" className="form-label">
// // //                             मागील महिन्यात झालेला खर्च{" "}
// // //                           </Label>
// // //                           <Input
// // //                             type="text"
// // //                             className="form-control"
// // //                             id="magilMahinayatJhalelaKharcha"
// // //                             value={record.magilMahinayatJhalelaKharcha}
// // //                             name="magilMahinayatJhalelaKharcha"
// // //                             onChange={handleInputChange}
// // //                           />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="chaluMahinyatJhalelaKharcha" className="form-label">
// // //                             चालू महिन्यात झालेला खर्च
// // //                           </Label>
// // //                           <Input
// // //                             type="text"
// // //                             className="form-control"
// // //                             id="chaluMahinyatJhalelaKharcha"
// // //                             value={record.chaluMahinyatJhalelaKharcha}
// // //                             name="chaluMahinyatJhalelaKharcha"
// // //                             onChange={handleInputChange}
// // //                           />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <Label htmlFor="ekunKharch" className="form-label">
// // //                           एकूण खर्च
// // //                         </Label>
// // //                         <Input
// // //                           type="text"
// // //                           className="form-control"
// // //                           id="ekunKharch"
// // //                           value={record.ekunKharch}
// // //                           disabled // Make it read-only since it will be calculated
// // //                         />
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="kharchachiTakkevari" className="form-label">
// // //                             खर्चाची टक्केवारी
// // //                           </Label>
// // //                           <Input type="text" className="form-control" id="kharchachiTakkevari" value={record.kharchachiTakkevari} name="kharchachiTakkevari" onChange={handleInputChange} />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="shera" className="form-label">
// // //                             शेरा
// // //                           </Label>
// // //                           <Input type="text" className="form-control" id="shera" value={record.shera} name="shera" onChange={handleInputChange} />
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="month" className="form-label">
// // //                             महिना
// // //                           </Label>
// // //                           <Input type="select" className="form-control" id="month" value={record.month} name="month" onChange={handleInputChange}>
// // //                             <option value="">महिना निवडा</option>
// // //                             {months.map((month, index) => (
// // //                               <option key={index} value={month}>
// // //                                 {month}
// // //                               </option>
// // //                             ))}
// // //                           </Input>
// // //                         </div>
// // //                       </Col>

// // //                       <Col xxl={3} md={3}>
// // //                         <div>
// // //                           <Label htmlFor="year" className="form-label">
// // //                             वर्ष
// // //                           </Label>
// // //                           <Input type="select" id="year" value={record.year} name="year" onChange={handleInputChange}>
// // //                             <option value="">वर्ष निवडा</option>
// // //                             {yearRanges.map((yearRange) => (
// // //                               <option key={yearRange} value={yearRange}>
// // //                                 {yearRange}
// // //                               </option>
// // //                             ))}
// // //                           </Input>
// // //                         </div>
// // //                       </Col>
// // //                     </Row>

// // //                     <Row className="gy-4">
// // //                       <Col>
// // //                         <Button onClick={handleSubmit} disabled={loading}>
// // //                           {loading ? "Updating..." : "Submit"}
// // //                         </Button>
// // //                         <Button onClick={handleReset} disabled={loading}>
// // //                           Reset
// // //                         </Button>
// // //                       </Col>
// // //                     </Row>
// // //                   </div>
// // //                 </CardBody>
// // //               </Card>
// // //             </Col>
// // //           </Row>
// // //         </Container>
// // //       </div>
// // //     </React.Fragment>
// // //   );
// // // };

// // // export default Demo3;
// import React, { useEffect, useState, useRef } from "react";
// import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "datatables.net-bs5";
// import "datatables.net-buttons/js/dataTables.buttons";
// import "jszip/dist/jszip";
// import "pdfmake/build/pdfmake";
// import "pdfmake/build/vfs_fonts";
// import "datatables.net-buttons/js/buttons.html5";
// import "datatables.net-buttons/js/buttons.print";
// import "datatables.net-buttons/js/buttons.colVis";
// import $ from "jquery";
// import "../BasicElements/style.css";
// import "./Report23.css";

// const Report23 = () => {
//   const [dataList, setDataList] = useState([]);
//   const [modal_list, setModalList] = useState(false);
//   const [modal_delete, setModalDelete] = useState(false);
//   const [modal_view, setModalView] = useState(false);
//   const [newRecord, setNewRecord] = useState({
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

//   const navigate = useNavigate();
//   const tableRef = useRef(null);
//   const tog_list = () => setModalList(!modal_list);
//   const tog_delete = () => setModalDelete(!modal_delete);
//   const tog_view = () => setModalView(!modal_view);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/getAll");
//       setDataList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();

//     if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
//       // Ensure data is available before initializing DataTable
//       $(tableRef.current).DataTable({
//         dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
//         buttons: ["copy", "csv", "excel", "pdf", "print"],
//         paging: true,
//         search: true,
//         pageLength: 10,
//         language: {
//           emptyTable: "No data available in table",
//           paginate: {
//             previous: "Previous",
//             next: "Next",
//           },
//           search: "Search records:",
//         },
//         columnDefs: [{ targets: -1, orderable: false }],
//       });
//     }
//   }, [dataList]);

//   // Handle input changes for new record
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecord({
//       ...newRecord,
//       [name]: value,
//     });
//   };

//   // Handle adding a new record
//   const handleAddRecord = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/tabyatilRastyanchiNondWahi/create", newRecord);
//       if (response.data) {
//         setDataList([...dataList, newRecord]); // Add the new record to the table
//         setModalList(false); // Close the modal
//         navigate("/"); // Navigate to the '/nikita' route
//       }
//     } catch (error) {
//       console.error("Error adding new record:", error);
//     }
//   };
//   const handleDelete = async (id) => {
//     if (window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?")) {
//       try {
//         const response = await axios.post(http://localhost:8080/tabyatilRastyanchiNondWahi/deleteById/${id});
//         if (response.data.code === "00") {
//           // setDataList(dataList.filter((item) => item.id !== id)); // Remove deleted item
//           fetchData();
//           alert("डेटा यशस्वीरित्या काढून टाकला गेला.");
//         }
//       } catch (error) {
//         console.error("Error deleting data:", error.response || error);
//         alert("डेटा काढून टाकताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const searchQuery = e.target.value;
//     const dataTable = $("#buttons-datatables").DataTable();
//     dataTable.search(searchQuery).draw(); // Trigger search in DataTable
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader>
//                   <Row>
//                     <Col lg={8}>
//                       <h4 className="card-title mb-0">नमुना २३ ताब्यातील रस्त्यांची नोंदवही</h4>
//                     </Col>
//                     <Col lg={4} className="text-end">
//                       <Button color="primary" onClick={() => navigate("/namuna23")}>
//                         नवीन माहिती प्रविष्ट करा
//                       </Button>
//                     </Col>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="table-responsive">
//                     <div id="buttons-datatables_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
//                       <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
//                         <label htmlFor="search" className="me-2 mb-0">
//                           शोधा:
//                         </label>
//                         <input
//                           type="search"
//                           id="search"
//                           className="form-control form-control-sm"
//                           placeholder="माहिती शोधा..."
//                           onChange={handleSearch}
//                           aria-controls="buttons-datatables"
//                           style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
//                         />
//                       </div>

//                       {dataList.length > 0 ? (
//                         <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
//                           <thead>
//                             <tr>
//                               <th>अनुक्रमांक</th> {/* Serial Number Column */}
//                               <th>ॲक्शन</th>
//                               <th>रस्त्यांचे नाव</th>
//                               <th>गाव पासून</th>
//                               <th>गाव पर्यंत</th>
//                               <th>लांबी (किलो मीटर)</th>
//                               <th>रुंदी (किलो मीटर)</th>
//                               <th>रस्त्याचा प्रकार</th>
//                               <th>पूर्ण केल्याची तारीख</th>
//                               <th>प्रति किलोमीटर खर्च</th>
//                               <th>दुरुस्ती खर्च</th>
//                               <th>दुरुस्ती स्वरुप</th>
//                               <th>विशेष खर्च</th>
//                               <th>विशेष स्वरुप</th>
//                               <th>मूळ बंधकाम खर्च</th>
//                               <th>मूळ बंधकाम स्वरुप</th>
//                               <th>शेरा</th>
//                               <th>वर्ष</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {dataList.map((data, index) => (
//                               <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                   <div className="d-flex gap-2">
//                                     <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/update23", { state: data })}>
//                                       अद्यतन करा
//                                     </button>
//                                     <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
//                                       काढून टाका
//                                     </button>
//                                     <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/view23", { state: data })}>
//                                       डेटा पाहा
//                                     </button>
//                                   </div>
//                                 </td>
//                                 <td>{data.rastyacheNaaw}</td>
//                                 <td>{data.gaawPaasun}</td>
//                                 <td>{data.gaawParyant}</td>
//                                 <td>{data.laambiKm}</td>
//                                 <td>{data.rundiKm}</td>
//                                 <td>{data.rastyachaPrakar}</td>
//                                 <td>{data.purnKelyachiTarikh}</td>
//                                 <td>{data.pratiKmRastaTayarKarnyasAalelaKharch}</td>
//                                 <td>{data.durustyaChaluKharchRupaye}</td>
//                                 <td>{data.durustyaChaluSwarup}</td>
//                                 <td>{data.durustyaWisheshKharchRupaye}</td>
//                                 <td>{data.durustyaWisheshSwarup}</td>
//                                 <td>{data.durustyaMulBandhkamKharchRupaye}</td>
//                                 <td>{data.durustyaMulBandhkamSwarup}</td>
//                                 <td>{data.shera}</td>
//                                 <td>{data.year}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       ) : (
//                         <p>No records available</p>
//                       )}
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Add Modal */}
//       <Modal isOpen={modal_list} toggle={tog_list}>
//         <ModalHeader toggle={tog_list}>Add New Record</ModalHeader>
//         <ModalBody>
//           <form>
//             <div className="mb-3">
//               <label className="form-label">Employee ID</label>
//               <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
//             </div>
//             {/* Repeat for other fields */}
//           </form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={handleAddRecord}>
//             Save
//           </Button>
//           <Button color="secondary" onClick={tog_list}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//       <Modal isOpen={modal_view} toggle={tog_view}>
//         <ModalHeader toggle={tog_delete}>View Record</ModalHeader>
//         <ModalFooter>
//           <Button color="danger" onClick={tog_view}>
//             View
//           </Button>
//           <Button color="secondary" onClick={tog_view}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </React.Fragment>
//   );
// };

// export default Report23;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View33 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state; // Access the passed data

  if (!record) {
    return <p>No data available</p>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="वृक्ष नोंदवही" pageTitle="डेटा पहा" className="custom-breadcrumb" />
          <Row className="gy-4">
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="mb-4">
                    <Col className="d-flex justify-content-between align-items-center">
                      <h5>डेटा पहा</h5>
                      <Button color="primary" onClick={() => navigate(-1)}>
                        मागे जा
                      </Button>
                    </Col>
                  </Row>
                  <Table bordered responsive className="table-custom">
                    <tbody>
                      <tr>
                        <th>नाव</th>
                        <td>{record.naav}</td>
                      </tr>
                      <tr>
                        <th>वृक्ष क्रमांक Cते C</th>
                        <td>{record.vrukshkrmank}</td>
                      </tr>
                      <tr>
                        <th>वृक्ष प्रकार</th>
                        <td>{record.vrukshprakar}</td>
                      </tr>
                      <tr>
                        <th>वृक्ष जोपासनेधी जबाबदारी</th>
                        <td>{record.vrukshjopasnechijababdari}</td>
                      </tr>
                      <tr>
                        <th>दिनांक</th>
                        <td>{record.date}</td>
                      </tr>
                      <tr>
                        <th>शेरा</th>
                        <td>{record.shera}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default View33;

