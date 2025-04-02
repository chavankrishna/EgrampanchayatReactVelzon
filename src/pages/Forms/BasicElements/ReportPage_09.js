// import React, { useEffect, useState, useRef } from "react";

// import { Button, Card, CardBody, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
// import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import UiContent from "../../../Components/Common/UiContent";

// const ReportPage_09 = () => {
//   const [dataList, setDataList] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null); // Store selected record for deletion
//   const [modalDelete, setModalDelete] = useState(false); // Control modal visibility
//   const tableRef = useRef(null);
//   const navigate = useNavigate();
//   const [sessionMessage, setSessionMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState(""); // State to track success
//   const [errorMessage, setErrorMessage] = useState(""); // State to track error
//   // Fetch success message from sessionStorage
//   useEffect(() => {
//     const message = sessionStorage.getItem("sessionMessage");
//     if (message) {
//       setSessionMessage(message);
//       sessionStorage.removeItem("sessionMessage");
//     }

//     // Fetch the data
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/egram9/getAllRecord");
//         setDataList(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Initialize DataTable
//   useEffect(() => {
//     if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
//       $("#buttons-datatables").DataTable({
//         dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
//         buttons: ["copy", "csv", "excel", "pdf", "print"],
//         paging: true,
//         search: true,
//         pageLength: 10,
//         language: {
//           emptyTable: "No data available in table",
//           paginate: { previous: "Previous", next: "Next" },
//           search: "Search records:",
//         },
//         columnDefs: [{ targets: -1, orderable: false }],
//       });
//     }
//   }, [dataList]);

//   // Handle Delete Record
//   const handleDelete = async (selectedRecord) => {
//     try {
//       const response = await axios.post(`http://localhost:8080/egram9/DeleteById/${selectedRecord.id}`); // Use backticks for the template literal

//       // Redirect after a successful delete
//       window.location.href = "/report09";

//       // Set a success message in session storage
//       const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
//       sessionStorage.setItem("sessionMessage", successMessage);
//     } catch (error) {
//       console.error("Error deleting data:", error);

//       // Default error message
//       let errorMessage = "Failed to submit data. Please try again later.";

//       // Update error message if server response is available
//       if (error.response) {
//         errorMessage = error.response.data.message || errorMessage;
//       }

//       // Set error message in session storage and update UI
//       sessionStorage.setItem("sessionMessage", errorMessage);
//       setErrorMessage(errorMessage);
//       setSuccessMessage(""); // Clear any previous success messages
//     }
//   };

//   // Handle Search functionality using DataTable
//   const handleSearch = (e) => {
//     const searchQuery = e.target.value;
//     const dataTable = $("#buttons-datatables").DataTable();
//     dataTable.search(searchQuery).draw();
//   };
//   useEffect(() => {
//     if (sessionMessage) {
//       const timer = setTimeout(() => {
//         setSessionMessage("");
//       }, 5000);

//       return () => clearTimeout(timer); // Clean up timer on component unmount
//     }
//   }, [sessionMessage]);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
//     return `${day}-${month}-${year}`; // Use backticks for template literal
//   };

//   return (
//     <React.Fragment>
//       <UiContent />
//       <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
//         <Container fluid>
//           <BreadCrumb title="कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही" pageTitle="Namuna09" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <Button style={{ width: "13%", justifyContent: "left", marginLeft: "86%", marginTop: "1%" }} color="primary" onClick={() => navigate("/namuna09")} className="btn btn-sm">
//                   नवीन माहिती प्रविष्ट करा
//                 </Button>
//                 <CardBody>
//                   {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}

//                   <div className="table-responsive">
//                     <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
//                       <label htmlFor="search" className="me-2 mb-0">
//                         Search:
//                       </label>
//                       <input
//                         type="search"
//                         id="search"
//                         className="form-control form-control-sm"
//                         placeholder="Search data..."
//                         onChange={handleSearch}
//                         style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
//                       />
//                     </div>

//                     {dataList.length > 0 ? (
//                       <table id="buttons-datatables" className="display table table-bordered" ref={tableRef}>
//                         <thead>
//                           <tr>
//                             <th>Id</th>
//                             <th>
//                               Action
//                               <tr>one</tr>
//                               <tr>two</tr>
//                             </th>
//                             <th>मिळकत नंबर</th>
//                             <th>मिळकतीचे नाव व ज्या इसमाकडून कर येणे असेल त्या इस्माचे नाव</th>
//                             <th>रेग्युलर खाते येणे रकमी घरपट्टी(मागील बाकी)</th>
//                             <th>रेग्युलर खाते येणे रकमी घरपट्टी(चालू कर)</th>
//                             <th>रेग्युलर खाते येणे रकमी घरपट्टी(एकूण)</th>
//                             <th>रेग्युलर खाते येणे रकमी वीज कर(मागील बाकी)</th>
//                             <th>रेग्युलर खाते येणे रकमी वीज कर(चालू कर)</th>
//                             <th>रेग्युलर खाते येणे रकमी वीज कर(एकूण)</th>
//                             <th>रेग्युलर खाते येणे रकमी आरोग्य कर(मागील बाकी)</th>
//                             <th>रेग्युलर खाते येणे रकमी आरोग्य कर(चालू कर)</th>
//                             <th>रेग्युलर खाते येणे रकमी आरोग्य कर(एकूण)</th>
//                             <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(मागील बाकी)</th>
//                             <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(चालू कर)</th>
//                             <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(एकूण)</th>
//                             <th>एकूण येणे कर</th>
//                             <th>बुक नंबर</th>
//                             <th>पावती तारीख</th>
//                             <th>पावती नंबर</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(मागील बाकी)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(चालू कर)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(एकूण)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(मागील बाकी)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(चालू कर)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(एकूण)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(मागील बाकी)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(चालू कर)</th>
//                             <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(एकूण)</th>
//                             <th>पाणीपट्टी/बोअरवेल(मागील बाकी)</th>
//                             <th>पाणीपट्टी/बोअरवेल(चालू कर)</th>
//                             <th>पाणीपट्टी/बोअरवेल(एकूण)</th>
//                             <th>एकूण वसूल कर रक्कम रूपये</th>
//                             <th>सूट मंजूर देणाऱ्या हुकूमचे उल्लेख</th>
//                             <th>सूट मंजूर देणाऱ्या हुकूमचे शेरा</th>
//                             <th>वर्ष</th>
//                             <th>शेरा</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {dataList.map((data, index) => (
//                             <tr key={index}>
//                               <td>{data.id}</td>
//                               <td>
//                                 <div className="d-flex gap-2">
//                                   <button className="btn btn-sm btn-primary" onClick={() => navigate("/namuna13_update", { state: data })}>
//                                     अद्यतन करा
//                                   </button>
//                                   <button className="btn btn-sm btn-primary" onClick={() => navigate("/namuna09_view", { state: { id: data.id } })}>
//                                     डेटा पहा
//                                   </button>

//                                   <button
//                                     className="btn btn-sm btn-danger"
//                                     onClick={() => {
//                                       const isConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
//                                       if (isConfirmed) {
//                                         handleDelete(data); // Directly call handleDelete with the record
//                                       }
//                                     }}
//                                   >
//                                     काढून टाका
//                                   </button>
//                                 </div>
//                               </td>
//                               <td>{data.milkat_Number}</td>
//                               <td>{data.propertyOwnerName}</td>
//                               <td>{data.na_GharMagilBaki}</td>
//                               <td>{data.na_GharChaluKar}</td>
//                               <td>{data.na_GharTotal}</td>
//                               <td>{data.na_VijMagilBaki}</td>
//                               <td>{data.na_VijChaluKar}</td>
//                               <td>{data.na_VijTotal}</td>
//                               <td>{data.na_ArogyaMagilBaki}</td>
//                               <td>{data.na_ArogyaChaluKar}</td>
//                               <td>{data.na_ArogyaTotal}</td>
//                               <td>{data.na_PaniMagilBaki}</td>
//                               <td>{data.na_PaniChaluKar}</td>
//                               <td>{data.na_PaniTotal}</td>
//                               <td>{data.na_TotalKar}</td>
//                               <td>{data.bookNo}</td>
//                               <td>{data.bookNoOR_Date}</td>
//                               <td>{data.pavti_Number}</td>
//                               <td>{data.vasuli_GharMagilBaki}</td>
//                               <td>{data.vasuli_GharMagilBaki}</td>
//                               <td>{data.vasuli_GharTotal}</td>
//                               <td>{data.vasuli_VijMagilBaki}</td>
//                               <td>{data.vasuli_VijChaluKar}</td>
//                               <td>{data.vasuli_VijTotal}</td>
//                               <td>{data.vasuli_ArogyaMagilBaki}</td>
//                               <td>{data.vasuli_ArogyaChaluKar}</td>
//                               <td>{data.vasuli_ArogyaTotal}</td>
//                               <td>{data.vasuli_PaniMagilBaki}</td>
//                               <td>{data.vasuli_PaniChaluKar}</td>
//                               <td>{data.vasuli_PaniTotal}</td>
//                               <td>{data.vasuli_TotalKar}</td>
//                               <td>{data.sutManjuriHukmacha_Ullekh}</td>
//                               <td>{data.sutManjuriHukmacha_Shera}</td>

//                               <td>{data.year}</td>
//                               <td>{data.remark}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     ) : (
//                       <p>No records available</p>
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

// export default ReportPage_09;
