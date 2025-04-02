import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useNavigate ,Link} from 'react-router-dom';
import 'datatables.net-bs5';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'jszip/dist/jszip';
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import $ from 'jquery';
import 'react-data-table-component-extensions/dist/index.css';

const Gaurireport = () => {
    const [dataList, setDataList] = useState([]);
    const [modal_list, setModalList] = useState(false);
    const [modal_delete, setModalDelete] = useState(false);
    const [newRecord, setNewRecord] = useState({
        id: '',
        employeeId: '',
        employeeName: '',
        grampanchayatId: '',
        grampanchayatName: '',
        createdDate: '',
        updatedDate: '',
        remark: '',
        year: '',
    
        // MojmaapWahi Fields
        lekhaShirsh: '',
        arthsankalpiyaAnudan: '',
        mahinyaBaddalchiEkunRakkam: '',
        maghilMahinyachaAkherparyantchiRakkam: '',
        maghePasunPudheChaluEkunRakkam: '',
        day: '',
        value: '',
        month: '',
        year: '',
       
    });
    const navigate = useNavigate();  // Initialize the navigate function

    const tog_list = () => setModalList(!modal_list);
    const tog_delete = () => setModalDelete(!modal_delete);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/Namuna06JamaRakmanchiNondvahi/getall');
                setDataList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Initialize DataTable with export buttons
    $(document).ready(function () {
        const table = $('#buttons-datatables').DataTable({
            dom: 'Bfrtip',  // Button and search feature
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            paging: true,
            search: true,
            columnDefs: [
                { targets: -1, orderable: false } // Disable sorting for action column
            ]
        });

        // Apply custom styling to the search input box
        $('.dataTables_filter input')
            .css({
                'marginLeft': '.5em',
                'display': 'inline-block',
                'width': '300px' // Adjust width as per requirement
            });
    });
}, []);  // Ensuring that fetchData runs only once during component mount

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
            const response = await axios.post('http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save', newRecord);
            if (response.data) {
                setDataList([...dataList, newRecord]); // Add the new record to the table
                setModalList(false); // Close the modal
                navigate('/Namuna06');  // Navigate to the '/nikita' route
            }
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                <BreadCrumb title="report" pageTitle="Forms" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">जमा रकमांची नोंदवही</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <div id="buttons-datatables_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                          
                                            <table id="buttons-datatables" className="display table table-bordered dataTable no-footer">
                                            <thead>
                                                    <tr>
                                                       <th>id</th>
                                                       <th>Action</th>
                                                          <th>लेखाशीर्ष</th>
                                                        <th>अर्थसंकल्पीय अनुदान</th>
                                                        <th>महिन्याबद्दलची एकूण रक्कम</th>
                                                        <th>मागील महिन्याचा अखेरपर्यंतची रक्कम</th>
                                                        <th>शेरा</th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataList.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{data.id}</td>
                                                             <td>
                                                                <div className="d-flex gap-2">
                                                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={tog_list}>Edit</button>
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={tog_delete}>Remove</button>
                                                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={tog_delete}>View</button>
                                                                </div>
                                                            </td>
                                                             <td>{data.lekhaShirsh}</td>
                                                            <td>{data.arthsankalpiyaAnudan}</td>
                                                           
                                                            <td>{data.mahinyaBaddalchiEkunRakkam}</td>
                                                           
                                                            <td>{data.maghilMahinyachaAkherparyantchiRakkam}</td>
                                                            <td>{data.shera}</td>
                                                           
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="d-flex justify-content-end">
                                                <div className="pagination-wrap hstack gap-2">
                                                    <Link className="page-item pagination-prev disabled" to="#">
                                                        Previous
                                                    </Link>
                                                    <ul className="pagination listjs-pagination mb-0"></ul>
                                                    <Link className="page-item pagination-next" to="#">
                                                        Next
                                                    </Link>
                                                </div>
                                            </div>
                                            {/* Pagination (can be handled by DataTables automatically) */}
                                        </div>
                                    </div>

                                      
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={tog_list}>
                <ModalHeader toggle={tog_list}>Add New Record</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
                        </div>
                        {/* Repeat for other fields */}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddRecord}>Save</Button>
                    <Button color="secondary" onClick={tog_list}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={modal_delete} toggle={tog_delete}>
                <ModalHeader toggle={tog_delete}>Delete Record</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this record?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={tog_delete}>Delete</Button>
                    <Button color="secondary" onClick={tog_delete}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default Gaurireport;