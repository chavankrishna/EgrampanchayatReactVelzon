// import React, { useState, useEffect } from 'react';

// import { useNavigate, useLocation } from 'react-router-dom';

// import axios from 'axios';

// import { Input,Table, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter,FormGroup } from 'reactstrap';

// import BreadCrumb from '../../../Components/Common/BreadCrumb';
// import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
// import UiContent from "../../../Components/Common/UiContent";


// const Namuna09_view = () => {
//     const { state } = useLocation(); // Access the passed record data from the previous page
//     const navigate = useNavigate();

//     const [record, setRecord] = useState(state || {});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     console.log('record',record);
//     console.log ('id',99,record.id);               
//     useEffect(() => {
//         console.log(state, record.id);
//         const data = { state, id: record.id };
//         console.log(data);

//         // If record ID exists, fetch the record by ID
//         if (record.id) {
//             const fetchRecord = async () => {
//                 try {
                   
//                     const response = await axios.post(`http://localhost:8080/egram9/getById/${record.id}`,
//                         {}, // Request body (empty in this case)
                       
//                     ); // Use backticks for template literal
//                     setRecord(response.data);
//                     console.log(response.data); // Corrected typo from console(response.data)
//                 } catch (err) {
//                     console.error('Error fetching record:', err);
//                     setError('Error fetching record');
//                 }
//             };
//             fetchRecord();
//         }
//     }, [state, record.id]); // Dependency array




//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     setError(null); // Clear any previous errors

//     //     try {
//     //         const token = localStorage.getItem("token");
//     //     if (!token) {
//     //       console.error("No token found");
//     //       return;
//     //     }
//     //     const response = await axios.post(
//     //         http://localhost:8080/karmachari-varg-wetan-shreni/update_by_id/${record.id},
//     //         record, // Request body, sending 'record' data
//     //         {
//     //             headers: {
//     //                 Authorization: Bearer ${token}  // Pass the token in the headers
//     //             }
//     //         }
//     //     );
//     //      // Use backticks for the URL
            
//     //         // Check if the update was successful
//     //         if (response.status === 200) {
//     //             alert('Record updated successfully');
//     //             navigate('/report09'); // Navigate back to the report page after successful update
//     //         }
//     //     } catch (err) {
//     //         setLoading(false);
//     //         // Detailed error handling
//     //         if (err.response) {
//     //             // Server responded with a status code different from 2xx
//     //             setError(Error: ${err.response.data.message || 'Error updating record'}); // Use backticks for template literal
//     //         } else if (err.request) {
//     //             // Request was made but no response was received
//     //             setError('Error: No response from server');
//     //         } else {
//     //             // Something else triggered the error
//     //             setError(Error: ${err.message}); // Use backticks for template literal
//     //         }
//     //         console.error('Error updating record:', err);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const day = date.getDate().toString().padStart(2, '0');
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
//         return `${day}-${month}-${year}`; // Use backticks for template literal
//     };

//     const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
//         <div className="card-header d-flex justify-content-between align-items-center">
//             <h5 className="mb-0">{title}</h5>
//             <Button color="primary" onClick={onButtonClick}>
//                 {buttonLabel}
//             </Button>
//         </div>
//     );
//     return (
//         <React.Fragment>
//         <UiContent />
//         <div className="page-content" style={{backgroundColor: '#fbf7f4'}}>
//             <Container fluid>
//                 <BreadCrumb title="कर मागणी नोंदवही" pageTitle="Forms" />
//                 <Row>
//                     <Col lg={12}>
//                         <Card>
//                             <PreviewCardHeader
//                                 title="कर मागणी नोंदवही"
//                                 buttonLabel="अहवाल"
//                                 onButtonClick={() => navigate('/report09')}
//                             />
//                             <CardBody className="card-body">
//                                 <div className="live-preview">
//                                     <Form>
//                                     <Table bordered responsive className="table-custom">
//                                         <tbody>
//                                             <tr>
//                                                 <th>मिळकत नंबर</th>
//                                                 <td>{record.milkat_Number}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>मिळकतीचे नाव व ज्या इसमाकडून कर येणे असेल त्या इस्माचे नाव</th>
//                                                 <td>{record.propertyOwnerName}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी घरपट्टी(मागील बाकी)</th>
//                                                 <td>{record.na_GharMagilBaki}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी घरपट्टी(चालू कर)</th>
//                                                 <td>{record.na_GharChaluKar}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी घरपट्टी(एकूण)</th>
//                                                 <td>{record.na_GharTotal}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी वीज कर(मागील बाकी)</th>
//                                                 <td>{record.na_VijMagilBaki}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी वीज कर(चालू कर)</th>
//                                                 <td>{record.na_VijChaluKar}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी वीज कर(एकूण)</th>
//                                                 <td>{record.na_VijTotal}</td>
//                                             </tr>
                                            
//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी आरोग्य कर(मागील बाकी)</th>
//                                                 <td>{record.na_ArogyaMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी आरोग्य कर(चालू कर)</th>
//                                                 <td>{record.na_ArogyaChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी आरोग्य कर(एकूण)</th>
//                                                 <td>{record.na_ArogyaTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(मागील बाकी)</th>
//                                                 <td>{record.na_PaniMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(चालू कर)</th>
//                                                 <td>{record.na_PaniChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते येणे रकमी पाणीपट्टी कर(एकूण)</th>
//                                                 <td>{record.na_PaniTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>एकूण येणे कर</th>
//                                                 <td>{record.na_TotalKa}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>बुक नंबर</th>
//                                                 <td>{record.bookNo}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>पावती तारीख</th>
//                                                 <td>{formatDate(record.bookNoOR_Date)}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>पावती नंबर</th>
//                                                 <td>{record.pavti_Number}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(मागील बाकी)</th>
//                                                 <td>{record.vasuli_GharMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(चालू कर)</th>
//                                                 <td>{record.vasuli_GharChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा घरपट्टी(एकूण)</th>
//                                                 <td>{record.vasuli_GharTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(मागील बाकी)</th>
//                                                 <td>{record.vasuli_VijMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(चालू कर)</th>
//                                                 <td>{record.vasuli_VijChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा वीज कर(एकूण)</th>
//                                                 <td>{record.vasuli_VijTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(मागील बाकी)</th>
//                                                 <td>{record.vasuli_ArogyaMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(चालू कर)</th>
//                                                 <td>{record.vasuli_ArogyaChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>रेग्युलर खाते वसूल केलेल्या रकमा आरोग्य कर(एकूण)</th>
//                                                 <td>{record.vasuli_ArogyaTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>पाणीपट्टी/बोअरवेल(मागील बाकी)</th>
//                                                 <td>{record.vasuli_PaniMagilBaki}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>पाणीपट्टी/बोअरवेल(चालू कर)</th>
//                                                 <td>{record.vasuli_PaniChaluKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>पाणीपट्टी/बोअरवेल(एकूण)</th>
//                                                 <td>{record.vasuli_PaniTotal}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>एकूण वसूल कर रक्कम रूपये</th>
//                                                 <td>{record.vasuli_TotalKar}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>सूट मंजूर देणाऱ्या हुकूमचे उल्लेख</th>
//                                                 <td>{record.sutManjuriHukmacha_Ullekh}</td>
//                                             </tr>

//                                             <tr>
//                                                 <th>सूट मंजूर देणाऱ्या हुकूमचे शेरा</th>
//                                                 <td>{record.sutManjuriHukmacha_Shera}</td>
//                                             </tr>

                                            
//                                             <tr>
//                                                 <th>शेरा</th>
//                                                 <td>{record.remark}</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>महिना</th>
//                                                 <td>{record.year}</td>
//                                             </tr>

//                                         </tbody>
//                                     </Table>


//                                     </Form>
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     </React.Fragment>
//     );
// };

// export default Namuna09_view;
