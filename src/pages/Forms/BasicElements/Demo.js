// // import React, { useEffect, useState, useRef } from "react";
// // import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "datatables.net-bs5";
// // import "datatables.net-buttons/js/dataTables.buttons";
// // import "jszip/dist/jszip";
// // import "pdfmake/build/pdfmake";
// // import "pdfmake/build/vfs_fonts";
// // import "datatables.net-buttons/js/buttons.html5";
// // import "datatables.net-buttons/js/buttons.print";
// // import "datatables.net-buttons/js/buttons.colVis";
// // import $ from "jquery";
// // import "../BasicElements/style.css";

// // const Demo = () => {
// //   const [dataList, setDataList] = useState([]);
// //   const [modal_list, setModalList] = useState(false);
// //   const [modal_delete, setModalDelete] = useState(false);
// //   const [modal_view, setModalView] = useState(false);
// //   const [newRecord, setNewRecord] = useState({
// //     id: "",
// //     sanMadhemagasvargiyansathiKeleliTartud: "",
// //     san: "",
// //     chaluMahinyatPraptaJhaleleUtpanna: "",
// //     fiftyTakkeKharchaKarychiRakkam: "",
// //     kharchachyaBabiYojanavar: "",
// //     magilMahinayatJhalelaKharcha: "",
// //     chaluMahinyatJhalelaKharcha: "",
// //     ekunKharch: "",
// //     kharchachiTakkevari: "",
// //     shera: "",
// //     month: "",
// //     year: "",
// //   });

// //   const navigate = useNavigate(); // Initialize the navigate function
// //   const tableRef = useRef(null); // Create a ref for the table to avoid reinitialization

// //   const tog_list = () => setModalList(!modal_list);
// //   const tog_delete = () => setModalDelete(!modal_delete);
// //   const tog_view = () => setModalView(!modal_view);

// //   // Fetch data from API
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.post("http://localhost:8080/masikvivaran/getAll");
// //         setDataList(response.data);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     fetchData();

// //     // Initialize DataTable once
// //     if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
// //       const table = $("#buttons-datatables").DataTable({
// //         dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
// //         buttons: ["copy", "csv", "excel", "pdf", "print"],
// //         paging: true,
// //         search: true,
// //         pageLength: 25,
// //         language: {
// //           emptyTable: "टेबलमध्ये डेटा उपलब्ध नाही",
// //           paginate: {
// //             previous: "मागील",
// //             next: "पुढे",
// //           },
// //           search: "रेकॉर्ड शोधा:",
// //         },
// //         columnDefs: [{ targets: -1, orderable: false }],
// //       });
// //     }
// //   }, []);

// //   // Handle input changes for new record
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewRecord({
// //       ...newRecord,
// //       [name]: value,
// //     });
// //   };

// //   // Handle adding a new record
// //   const handleAddRecord = async () => {
// //     try {
// //       const response = await axios.post("http://localhost:8080/masikvivaran/create", newRecord);
// //       if (response.data) {
// //         setDataList([...dataList, newRecord]); // Add the new record to the table
// //         setModalList(false); // Close the modal
// //         navigate("/"); // Navigate to the '/nikita' route
// //       }
// //     } catch (error) {
// //       console.error("Error adding new record:", error);
// //     }
// //   };
// //   const handleDelete = async (id) => {
// //     // Confirm deletion with the user
// //     if (window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?")) {
// //       try {
// //         // Ensure URL is wrapped in quotes
// //         const response = await axios.post(`http://localhost:8080/masikvivaran/delete/${id}`);

// //         if (response.status === 200) {
// //           // Remove the deleted record from the state
// //           setDataList(dataList.filter((item) => item.id !== id));
// //           alert("डेटा यशस्वीरित्या काढून टाकला गेला.");
// //         }
// //       } catch (error) {
// //         console.error("Error deleting data:", error);
// //         alert("डेटा काढून टाकताना त्रुटी आली.");
// //       }
// //     }
// //   };

// //   const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
// //     <div className="card-header d-flex justify-content-between align-items-center">
// //       <h5 className="mb-0">{title}</h5>
// //       <Button color="primary" onClick={onButtonClick}>
// //         {buttonLabel}
// //       </Button>
// //     </div>
// //   );

// //   return (
// //     <React.Fragment>
// //       <div className="page-content">
// //         <Container fluid>
// //           <Row>
// //             <Col lg={12}>
// //               <Card>
// //                 {/* <CardHeader>
// //                                     <h4 className="card-title mb-0">जमा रकमांची नोंदवही</h4>
// //                                 </CardHeader> */}
// //                 <PreviewCardHeader title="जमा रकमांची नोंदवही" buttonLabel="नवीन माहिती प्रविष्ट करा " onButtonClick={() => navigate("/Namuna06")} />
// //                 <CardBody>
// //                   <div className="table-responsive">
// //                     <div id="buttons-datatables_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
// //                       {/* Search Box Container */}
// //                       <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
// //                         <label htmlFor="search" className="me-2 mb-0">
// //                           शोधा:
// //                         </label>
// //                         <input
// //                           type="search"
// //                           id="search"
// //                           className="form-control form-control-sm"
// //                           placeholder="रेकॉर्ड शोधा."
// //                           aria-controls="buttons-datatables"
// //                           style={{
// //                             width: "300px", // Adjust width as per requirement
// //                             maxWidth: "300px",
// //                             marginLeft: "10px",
// //                           }}
// //                         />
// //                       </div>

// //                       {/* Table */}
// //                       {dataList.length > 0 ? (
// //                         <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
// //                           <thead>
// //                             <tr>
// //                               <th>ID</th>
// //                               <th>Action</th>
// //                               <th>सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद</th>
// //                               <th>सन</th>
// //                               <th>चालू महिन्यात प्राप्त झालेले उत्पन्न</th>
// //                               <th>१५ टक्के खर्च करावयाची रक्कम</th>
// //                               <th>खर्चाच्या बाबी बाबवार / योजनावार</th>
// //                               <th>मागील महिन्यात झालेला खर्च</th>
// //                               <th>चालू महिन्यात झालेला खर्च</th>
// //                               <th>एकूण खर्च</th>
// //                               <th>खर्चाची टक्केवारी</th>
// //                               <th>शेरा</th>
// //                               <th>महिना</th>
// //                               <th>वर्ष</th>
// //                             </tr>
// //                           </thead>
// //                           <tbody>
// //                             {dataList.map((data, index) => (
// //                               <tr key={index}>
// //                                 <td>{data.id}</td>
// //                                 <td>
// //                                   <div className="d-flex gap-2">
// //                                     <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/update28", { state: data })}>
// //                                       एडिट करा
// //                                     </button>
// //                                     <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
// //                                       काढून टाका
// //                                     </button>

// //                                     <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/view28", { state: data })}>
// //                                       डेटा पाहा
// //                                     </button>
// //                                   </div>
// //                                 </td>
// //                                 <td>{data.sanMadhemagasvargiyansathiKeleliTartud}</td>
// //                                 <td>{data.san}</td>
// //                                 <td>{data.chaluMahinyatPraptaJhaleleUtpanna}</td>
// //                                 <td>{data.fiftyTakkeKharchaKarychiRakkam}</td>
// //                                 <td>{data.kharchachyaBabiYojanavar}</td>
// //                                 <td>{data.magilMahinayatJhalelaKharcha}</td>
// //                                 <td>{data.chaluMahinyatJhalelaKharcha}</td>
// //                                 <td>{data.ekunKharch}</td>
// //                                 <td>{data.kharchachiTakkevari}</td>
// //                                 <td>{data.shera}</td>
// //                                 <td>{data.month}</td>
// //                                 <td>{data.year}</td>
// //                                 {/* <td>
// //                                                                 <div className="d-flex gap-2">
// //                                                                     <button className="btn btn-sm btn-success edit-item-btn" onClick={tog_list}>Edit</button>
// //                                                                     <button className="btn btn-sm btn-danger remove-item-btn" onClick={tog_delete}>Remove</button>
// //                                                                     <button className="btn btn-sm btn-primary remove-item-btn" onClick={tog_delete}>View</button>
// //                                                                 </div>
// //                                                             </td> */}
// //                               </tr>
// //                             ))}
// //                           </tbody>
// //                         </table>
// //                       ) : (
// //                         <p>No records available</p> // Show message if no data is available
// //                       )}

// //                       {/* Pagination Container */}
// //                       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>{/* DataTables pagination controls will automatically be placed here */}</div>
// //                     </div>
// //                   </div>
// //                 </CardBody>
// //               </Card>
// //             </Col>
// //           </Row>
// //         </Container>
// //       </div>

// //       {/* Add Modal */}
// //       <Modal isOpen={modal_list} toggle={tog_list}>
// //         <ModalHeader toggle={tog_list}>Add New Record</ModalHeader>
// //         <ModalBody>
// //           <form>
// //             <div className="mb-3">
// //               <label className="form-label">Employee ID</label>
// //               <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
// //             </div>
// //             {/* Repeat for other fields */}
// //           </form>
// //         </ModalBody>
// //         <ModalFooter>
// //           <Button color="primary" onClick={handleAddRecord}>
// //             Save
// //           </Button>
// //           <Button color="secondary" onClick={tog_list}>
// //             Cancel
// //           </Button>
// //         </ModalFooter>
// //       </Modal>

// //       {/* <Modal isOpen={modal_delete} toggle={() => toggleDeleteModal(null)}>
// //     <ModalHeader toggle={() => toggleDeleteModal(null)}>Delete Record</ModalHeader>
// //     <ModalBody>
// //         Are you sure you want to delete this record? ID: {recordToDelete}
// //     </ModalBody>
// //     <ModalFooter>
// //         <Button color="danger" onClick={handleDeleteRecord}>Delete</Button>
// //         <Button color="secondary" onClick={() => toggleDeleteModal(null)}>Cancel</Button>
// //     </ModalFooter>
// // </Modal> */}

// //       <Modal isOpen={modal_view} toggle={tog_view}>
// //         <ModalHeader toggle={tog_delete}>View Record</ModalHeader>
// //         <ModalFooter>
// //           <Button color="danger" onClick={tog_view}>
// //             View
// //           </Button>
// //           <Button color="secondary" onClick={tog_view}>
// //             Cancel
// //           </Button>
// //         </ModalFooter>
// //       </Modal>
// //     </React.Fragment>
// //   );
// // };

// // export default Demo;

// // UpdatePage.js
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Input, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter, FormGroup } from "reactstrap";
// import UiContent from "../../../Components/Common/UiContent";
// import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

// const Demo = () => {
//   const { state } = useLocation(); // Access the passed record data from the previous page
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});

//   const [record, setRecord] = useState(state || {});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // If no state was passed (direct access to this page), fetch record by ID
//     if (!state && record.grampanchyatId) {
//       const fetchRecord = async () => {
//         try {
//           const response = await axios.post(`http://localhost:8080/masikvivaran/getById/${record.id}`);
//           setRecord(response.data);
//         } catch (err) {
//           console.error("Error fetching record:", err);
//           setError("Error fetching record");
//         }
//       };
//       fetchRecord();
//     }
//   }, [state, record.id]);
//   //-----------------------------------------------------------------------------------------------------------------------------

//   const handleSaveAndAddNew = () => {
//     handleSubmit();
//     handleReset();
//   };

//   const handleReset = () => {
//     setFormData({
//       id: "",
//       gramPanchayatId: "",
//       gramPanchayatName: "",
//       employeeId: "",
//       employeeName: "",
//       sanMadhemagasvargiyansathiKeleliTartud: "",
//       san: "",
//       chaluMahinyatPraptaJhaleleUtpanna: "",
//       fiftyTakkeKharchaKarychiRakkam: "",
//       kharchachyaBabiYojanavar: "",
//       magilMahinayatJhalelaKharcha: "",
//       chaluMahinyatJhalelaKharcha: "",
//       ekunKharch: "",
//       kharchachiTakkevari: "",
//       shera: "",
//       month: "",
//       year: "",
//     });
//   };

//   //-----------------------------------------------------------------------------------------
//   const [dataList, setDataList] = useState([]);

//   //----------------------------------------------------------------------------------
//   //Code Declaration for 15%
//   // Helper functions
//   const detectNumeralTypeee = (numString) => {
//     if (/^[0-9]+$/.test(numString)) return "english";
//     if (/^[०-९]+$/.test(numString)) return "marathi";
//     return "english"; // Default to English if undetected
//   };

//   const ToMarathiDigitsss = (num) => {
//     const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//     return num.toString().replace(/[0-9]/g, (digit) => marathiDigits[parseInt(digit)]);
//   };

//   // Helper function to convert Marathi digits to Arabic (for calculations)
//   const toArabicc = (numString) => {
//     const marathiToArabicDigits = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
//     return numString.replace(/[०-९]/g, (digit) => marathiToArabicDigits[digit]);
//   };

//   //--------------------------------------------------------------------------------------------------------------

//   const handleInputChangee = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => {
//       const newData = { ...prevData, [id]: value };
//       //--------------------------------------------------------------------------------------
//       // Check if the changed field is 'chaluMahinyatPraptaJhaleleUtpanna'
//       //15% vla logic
//       if (id === "chaluMahinyatPraptaJhaleleUtpanna") {
//         const numeralType = detectNumeralType(value);
//         const utpanna = parseFloat(numeralType === "marathi" ? toArabicc(value) : value);

//         if (!isNaN(utpanna)) {
//           const calculatedValue = (utpanna * 0.15).toFixed(2);
//           // Convert calculated value back to the detected numeral type
//           newData.fiftyTakkeKharchaKarychiRakkam = numeralType === "marathi" ? ToMarathiDigitsss(calculatedValue) : calculatedValue;
//         } else {
//           newData.fiftyTakkeKharchaKarychiRakkam = ""; // Clear if input is invalid
//         }
//       }

//       return newData;

//       //-------------------------------------------------------------------------------------------------
//     });
//   };
//   // const handleInputChange = (e) => {
//   //   const { id, value } = e.target;
//   //   setFormData({ ...record, [id]: value });
//   // };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...record,
//       [name]: value,
//     });
//   };

//   // -----------------------------------------------------

//   // //double year vla logic
//   // Generate an array of the last 100 year ranges
//   const arabicToMarathiDigits = (num) => {
//     const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//     return num
//       .toString()
//       .split("")
//       .map((digit) => marathiDigits[parseInt(digit)])
//       .join("");
//   };
//   const currentYear = new Date().getFullYear();
//   const yearRanges = Array.from({ length: 100 }, (_, i) => {
//     const startYear = currentYear - i;
//     const endYear = startYear + 1;
//     const startYearInMarathi = arabicToMarathiDigits(startYear);
//     const endYearInMarathi = arabicToMarathiDigits(endYear);
//     return `${startYearInMarathi} -${endYearInMarathi}`;
//   });

//   // --------------------------------------------------------------

//   //Single Year Vla Logic
//   // Function to convert Arabic digits to Marathi digits
//   const arabicToMarathiDigitss = (num) => {
//     const marathiDigitss = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//     return num
//       .toString()
//       .split("")
//       .map((digit) => marathiDigitss[parseInt(digit)])
//       .join("");
//   };
//   // Function to generate Single years in Marathi
//   const SinglegenerateYear = () => {
//     const currentYear = new Date().getFullYear();
//     const startYear = currentYear - 100; // Start 100 years back
//     const years = [];
//     for (let i = startYear; i <= currentYear; i++) {
//       // Convert each year to Marathi digits
//       const yearInMarathi = arabicToMarathiDigitss(i);
//       years.push(yearInMarathi);
//     }
//     return years;
//   };
//   // ---------------------------------------------------------------------

//   //month vla logic
//   // Define month names in marathi
//   const months = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
//   //--------------------------------------------------------------------------

//   //Ye Code hai addition of two fields in marathi, English ke lea
//   // Function to convert Marathi/Hindi digits to Arabic digits (0-9)
//   const marathiHindiToArabic = (numString) => {
//     const marathiHindiDigits = {
//       "०": "0",
//       "१": "1",
//       "२": "2",
//       "३": "3",
//       "४": "4",
//       "५": "5",
//       "६": "6",
//       "७": "7",
//       "८": "8",
//       "९": "9",
//     };
//     return numString.replace(/[०-९]/g, (digit) => marathiHindiDigits[digit]);
//   };
//   //Addition of two fields in third field
//   // Helper function to detect numeral type
//   const detectNumeralType = (numString) => {
//     if (/^[0-9]+$/.test(numString)) return "english";
//     if (/^[०-९]+$/.test(numString)) return "marathi";
//     if (/^[०-९]+$/.test(numString)) return "hindi";
//     return "english"; // Default to English if undetected
//   };

//   // Function to convert Marathi/Hindi digits to Arabic
//   const toArabic = (numString) => {
//     const digitsMap = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
//     return numString.replace(/[०-९]/g, (digit) => digitsMap[digit]);
//   };

//   // Function to convert Arabic digits to Marathi/Hindi
//   const fromArabic = (num, numeralType) => {
//     const marathiHindiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//     return numeralType === "english" ? num.toString() : num.toString().replace(/[0-9]/g, (digit) => marathiHindiDigits[parseInt(digit)]);
//   };

//   // Main useEffect to calculate and format `ekunKharch`
//   useEffect(() => {
//     const { magilMahinayatJhalelaKharcha, chaluMahinyatJhalelaKharcha } = record;

//     // Determine numeral type based on input format
//     const numeralType = detectNumeralType(magilMahinayatJhalelaKharcha || chaluMahinyatJhalelaKharcha || "0");

//     // Convert inputs to Arabic for addition
//     const magilExpense = parseFloat(toArabic(magilMahinayatJhalelaKharcha || "0"));
//     const chaluExpense = parseFloat(toArabic(chaluMahinyatJhalelaKharcha || "0"));
//     const totalExpense = magilExpense + chaluExpense;

//     // Convert totalExpense back to original numeral type
//     const formattedTotal = totalExpense === 0 ? "" : fromArabic(totalExpense, numeralType);

//     //Here Setting Values In Ekun
//     // Set `ekunKharch` in the correct format
//     setFormData((prevState) => ({
//       ...prevState,
//       ekunKharch: formattedTotal,
//     }));
//   }, [record.magilMahinayatJhalelaKharcha, record.chaluMahinyatJhalelaKharcha]);

//   //---------------------------------------------------------------//---------------------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null); // Clear any previous errors
//     try {
//       const response = await axios.post(`http://localhost:8080/masikvivaran/update/${record.id}`, record);

//       // Check if the update was successful
//       if (response.code === "00") {
//         alert("Record updated successfully");
//         navigate("/report28"); // Navigate back to the report page after successful update
//       }
//     } catch (err) {
//       setLoading(false);
//       // Detailed error handling
//       if (err.response) {
//         // Server responded with a status code different from 2xx
//         setError(`Error: ${err.response.data.message || "Error updating record"}`);
//       } else if (err.request) {
//         // Request was made but no response was received
//         setError("Error: No response from server");
//       } else {
//         // Something else triggered the error
//         setError(`Error: ${err.message}`);
//       }
//       console.error("Error updating record:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
//     <div className="card-header d-flex justify-content-between align-items-center">
//       <h5 className="mb-0">{title}</h5>
//       <Button color="primary" onClick={onButtonClick}>
//         {buttonLabel}
//       </Button>
//     </div>
//   );
//   return (
//     <React.Fragment>
//       <UiContent />
//       <div className="page-content">
//         <Container fluid>
//           <BreadCrumb title="नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही" pageTitle="Forms" className="custom-breadcrumb" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <PreviewCardHeader title="नमुना २८ - मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही" buttonLabel="मागे जा" onButtonClick={() => navigate("/report28")} />
//                 <CardBody className="card-body">
//                   <div className="live-preview">
//                     <Row className="gy-4">
//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="sanMadhemagasvargiyansathiKeleliTartud" className="form-label">
//                             सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद
//                           </Label>
//                           <Input
//                             type="text"
//                             className="form-control"
//                             id="sanMadhemagasvargiyansathiKeleliTartud"
//                             value={record.sanMadhemagasvargiyansathiKeleliTartud}
//                             name="sanMadhemagasvargiyansathiKeleliTartud"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="san" className="form-label">
//                             सन{" "}
//                           </Label>
//                           {/* <Input type="text" className="form-control" id="san" value={formData.san} onChange={handleInputChange} /> */}
//                           <Input type="select" id="san" value={record.san} name="san" onChange={handleInputChange}>
//                             <option value="">वर्ष निवडा</option>
//                             {SinglegenerateYear().map((san) => (
//                               <option key={san} value={san}>
//                                 {san}
//                               </option>
//                             ))}
//                           </Input>
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="chaluMahinyatPraptaJhaleleUtpanna" className="form-label">
//                             चालू महिन्यात प्राप्त झालेले उत्पन्न
//                           </Label>
//                           <Input
//                             type="text"
//                             className="form-control"
//                             id="chaluMahinyatPraptaJhaleleUtpanna"
//                             value={record.chaluMahinyatPraptaJhaleleUtpanna}
//                             name="chaluMahinyatPraptaJhaleleUtpanna"
//                             onChange={handleInputChangee}
//                           />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="fiftyTakkeKharchaKarychiRakkam" className="form-label">
//                             १५ टक्के खर्च करावयाची रक्कम
//                           </Label>
//                           <Input type="text" className="form-control" id="fiftyTakkeKharchaKarychiRakkam" value={record.fiftyTakkeKharchaKarychiRakkam} readOnly />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="kharchachyaBabiYojanavar" className="form-label">
//                             खर्चाच्या बाबी बाबवार / योजनावार
//                           </Label>
//                           <Input
//                             type="text"
//                             className="form-control"
//                             id="kharchachyaBabiYojanavar"
//                             value={record.kharchachyaBabiYojanavar}
//                             name="kharchachyaBabiYojanavar"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="magilMahinayatJhalelaKharcha" className="form-label">
//                             मागील महिन्यात झालेला खर्च{" "}
//                           </Label>
//                           <Input
//                             type="text"
//                             className="form-control"
//                             id="magilMahinayatJhalelaKharcha"
//                             value={record.magilMahinayatJhalelaKharcha}
//                             name="magilMahinayatJhalelaKharcha"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="chaluMahinyatJhalelaKharcha" className="form-label">
//                             चालू महिन्यात झालेला खर्च
//                           </Label>
//                           <Input
//                             type="text"
//                             className="form-control"
//                             id="chaluMahinyatJhalelaKharcha"
//                             value={record.chaluMahinyatJhalelaKharcha}
//                             name="chaluMahinyatJhalelaKharcha"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <Label htmlFor="ekunKharch" className="form-label">
//                           एकूण खर्च
//                         </Label>
//                         <Input
//                           type="text"
//                           className="form-control"
//                           id="ekunKharch"
//                           value={record.ekunKharch}
//                           disabled // Make it read-only since it will be calculated
//                         />
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="kharchachiTakkevari" className="form-label">
//                             खर्चाची टक्केवारी
//                           </Label>
//                           <Input type="text" className="form-control" id="kharchachiTakkevari" value={record.kharchachiTakkevari} name="kharchachiTakkevari" onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="shera" className="form-label">
//                             शेरा
//                           </Label>
//                           <Input type="text" className="form-control" id="shera" value={record.shera} name="shera" onChange={handleInputChange} />
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="month" className="form-label">
//                             महिना
//                           </Label>
//                           <Input type="select" className="form-control" id="month" value={record.month} name="month" onChange={handleInputChange}>
//                             <option value="">महिना निवडा</option>
//                             {months.map((month, index) => (
//                               <option key={index} value={month}>
//                                 {month}
//                               </option>
//                             ))}
//                           </Input>
//                         </div>
//                       </Col>

//                       <Col xxl={3} md={3}>
//                         <div>
//                           <Label htmlFor="year" className="form-label">
//                             वर्ष
//                           </Label>
//                           <Input type="select" id="year" value={record.year} name="year" onChange={handleInputChange}>
//                             <option value="">वर्ष निवडा</option>
//                             {yearRanges.map((yearRange) => (
//                               <option key={yearRange} value={yearRange}>
//                                 {yearRange}
//                               </option>
//                             ))}
//                           </Input>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <div className="col-lg-12" style={{ marginTop: "20px" }}>
//                     <div className="text-start">
//                       <Button color="success" onClick={handleSubmit} style={{ marginRight: "10px" }}>
//                         जतन करा
//                       </Button>
//                       <Button color="primary" onClick={handleSaveAndAddNew} style={{ marginRight: "10px" }}>
//                         जतन करून नवीन माहिती भरा
//                       </Button>
//                       <Button color="warning" onClick={handleReset} style={{ marginRight: "10px" }}>
//                         रीसेट करा
//                       </Button>
//                       <Button color="danger" onClick={() => (window.location.href = "cancel_page.php")}>
//                         रद्द करा
//                       </Button>
//                     </div>
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

// export default Demo;
