import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'datatables.net-bs5';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'jszip/dist/jszip';
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import $ from 'jquery';
import '../BasicElements/style.css';

const Namuna18Report = () => {
    const [dataList, setDataList] = useState([]);
    const [modal_list, setModalList] = useState(false);
    const [modal_delete, setModalDelete] = useState(false);
    const [modal_view, setModalView] = useState(false);


    const [newRecord, setNewRecord] = useState({
            jamaTarikh: '',
            dhanadeshKramank: '',
            konakadunPraptZala: '',
            jamaTapshil: '',
            jamaRakkam: '',
            agrim: '',
            jamaEkun: '',
            adhyakshari:'',
            year: '',
            remark: '',
    });

    const navigate = useNavigate();  // Initialize the navigate function
    const tableRef = useRef(null);  // Create a ref for the table to avoid reinitialization

    const tog_list = () => setModalList(!modal_list);
    const tog_delete = () => setModalDelete(!modal_delete);
    const tog_view = () => setModalView(!modal_view);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/Namuna18KirkolRokadVahi/getall');
                setDataList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Initialize DataTable once
        if (tableRef.current && !$.fn.dataTable.isDataTable('#buttons-datatables')) {
            const table = $('#buttons-datatables').DataTable({
                dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',  
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print' 
                ],
                paging: true,
                search: true,  
                pageLength: 25,  
                language: {
                    emptyTable: "टेबलमध्ये डेटा उपलब्ध नाही",
                    paginate: {
                        previous: "मागील",
                        next: "पुढे"
                    },
                    search: "रेकॉर्ड शोधा:" 
                },
                columnDefs: [
                    { targets: -1, orderable: false } 
                ]
            });
            
        }
    }, [dataList]);

    // Handle input changes for new record
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value
        });
    };

    // Handle adding a new record
    const handleAddRecord = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Namuna18KirkolRokadVahi/save', newRecord);
            if (response.data) {
                setDataList([...dataList, newRecord]); // Add the new record to the table
                setModalList(false); // Close the modal
                navigate('/Namuna06');  // Navigate to the '/nikita' route
            }
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    };
    const handleDelete = async (id) => {
        // Confirm deletion with the user
        if (window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?")) {
            try {
                // Ensure URL is wrapped in quotes
                const response = await axios.post(`http://localhost:8080/Namuna18KirkolRokadVahi/delete_by_id/${id}`);
                
                if (response.status === 200) {
                    // Remove the deleted record from the state
                    setDataList(dataList.filter((item) => item.id !== id));
                    alert("डेटा यशस्वीरित्या काढून टाकला गेला.");
                }
            } catch (error) {
                console.error("Error deleting data:", error);
                alert("डेटा काढून टाकताना त्रुटी आली.");
            }
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

    // Handle Search functionality using DataTable
    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        const dataTable = $('#buttons-datatables').DataTable();
        dataTable.search(searchQuery).draw(); // Trigger DataTable search method
    };



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                {/* <CardHeader>
                                    <h4 className="card-title mb-0">जमा रकमांची नोंदवही</h4>
                                </CardHeader> */}
                                <PreviewCardHeader 
                                    title="किरकोळ रोकड वही" 
                                    buttonLabel="नवीन माहिती प्रविष्ट करा " 
                                    onButtonClick={() => navigate('/Namuna18Form')} 
                                />
                                <CardBody>
                                <div className="table-responsive">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '-31px' }}>
                                            <label htmlFor="search" className="me-2 mb-0">Search:</label>
                                            <input 
                                                type="search" 
                                                id="search" 
                                                className="form-control form-control-sm" 
                                                placeholder="Search data..."
                                                onChange={handleSearch} // Trigger search when user types
                                                style={{ width: '300px', maxWidth: '300px', marginLeft: '10px' }} 
                                            />
                                        </div>


                                            {/* Table */}
                                            {dataList.length > 0 ? (
                                                <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                                                   <thead>
                                                    <tr>
                                                    <th>Sr.No</th>
                                                       <th>Action</th>
                                                          <th>जमा तारीख</th>
                                                        <th>धनादेश क्रमांक</th>
                                                        <th>कोणाकडून प्राप्त झाला</th>
                                                        <th>जमा तपशील</th>
                                                        <th>शेरा</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {dataList.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.id}</td>
                                                       <td>
                                                             <div className="d-flex gap-2">
                                                             <button
                                                                  className="btn btn-sm btn-success edit-item-btn"
                                                                   onClick={() => navigate('/Namuna18Update', { state: data })}
                                                                >
                                                                              एडिट करा
                                                                     </button>                                  
                                                                     <button
                        className="btn btn-sm btn-danger remove-item-btn"
                        onClick={() => handleDelete(data.id)}
                    >
                        काढून टाका
                    </button>


                                                                    <button className="btn btn-sm btn-primary remove-item-btn"  onClick={() => navigate('/ViewDetails18', { state: data })}
                                                                >
                                                                              डेटा पाहा
                                                                     </button> 
                                                                </div>
                                                                </td>
                                                                <td>{data.jamaTarikh}</td>
                                                            <td>{data.dhanadeshKramank}</td>
                                                           
                                                            <td>{data.konakadunPraptZala}</td>
                                                           
                                                            <td>{data.jamaTapshil}</td>
                                                            <td>{data.remark}</td>
                                                            {/* <td>
                                                                <div className="d-flex gap-2">
                                                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={tog_list}>Edit</button>
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={tog_delete}>Remove</button>
                                                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={tog_delete}>View</button>
                                                                </div>
                                                            </td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                </table>
                                            ) : (
                                                <p>No records available</p>  // Show message if no data is available
                                            )}

                                            {/* Pagination Container */}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                {/* DataTables pagination controls will automatically be placed here */}
                                            </div>
                                        </div>
                                    
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add Modal
            <Modal isOpen={modal_list} toggle={tog_list}>
                <ModalHeader toggle={tog_list}>Add New Record</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
                        </div>
                        {/* Repeat for other fields */}
                    {/* </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddRecord}>Save</Button>
                    <Button color="secondary" onClick={tog_list}>Cancel</Button>
                </ModalFooter>
            // </Modal> */} 

            {/* <Modal isOpen={modal_delete} toggle={() => toggleDeleteModal(null)}>
    <ModalHeader toggle={() => toggleDeleteModal(null)}>Delete Record</ModalHeader>
    <ModalBody>
        Are you sure you want to delete this record? ID: {recordToDelete}
    </ModalBody>
    <ModalFooter>
        <Button color="danger" onClick={handleDeleteRecord}>Delete</Button>
        <Button color="secondary" onClick={() => toggleDeleteModal(null)}>Cancel</Button>
    </ModalFooter>
</Modal> */}


            <Modal isOpen={modal_view} toggle={tog_view}>
                <ModalHeader toggle={tog_delete}>View Record</ModalHeader>
                <ModalFooter>
                    <Button color="danger" onClick={tog_view}>View</Button>
                    <Button color="secondary" onClick={tog_view}>Cancel</Button>
                </ModalFooter>
            </Modal>
     
        </React.Fragment>
    );
};

export default Namuna18Report;