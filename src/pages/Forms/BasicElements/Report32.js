import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "datatables.net-bs5";
import "datatables.net-buttons/js/dataTables.buttons";
import "jszip/dist/jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";
import $ from "jquery";
import "../BasicElements/style.css";
import "./Report32.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Report32 = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [newRecord, setNewRecord] = useState({
    id: "",
    // grampanchayatId: '',
    // grampanchayatName: '',
    // employeeId: '',
    // employeeName: '',
    pavtiNumber: "",
    dileliMulRakkamDate: "",
    rakkam: "",
    paratKaryachiRakkam: "",
    thevidaracheNav: "",
    partavaKarnaryaPradhikaryacheNav: "",
    shera: "",

    // year: ''
  });

  const navigate = useNavigate(); // Initialize the navigate function
  const tableRef = useRef(null); // Create a ref for the table to avoid reinitialization

  const tog_list = () => setModalList(!modal_list);
  const tog_delete = () => setModalDelete(!modal_delete);

  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch data from API
  useEffect(() => {
    // Retrieve the token from localStorage and log it
    const token = localStorage.getItem("token");
    console.log("Token retrieved from localStorage:", token); // Log the token for debugging

    // Retrieve and display session message if present
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    const fetchData = async () => {
      try {
        // Log the token to ensure it's available when fetching data
        console.log("Fetching data with token:", token);

        // Perform data fetching
        const response = await axios.post(
          "http://localhost:8080/rakkampartavya/getAll",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token in the Authorization header
            },
          }
        );

        // Set the fetched data into the state
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData(); // Only fetch data if the token is available
    } else {
      console.log("No token found, cannot fetch data");
    }
  }, []);

  // Initialize DataTable once
  useEffect(() => {
    if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
      $("#buttons-datatables").DataTable({
        dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
        buttons: [
          {
            extend: "copy",
            text: "Copy",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))", // Exclude the 'क्रिया' column (which is the 2nd column)
            },
          },
          {
            extend: "csv",
            text: "CSV",
            title: "Exported Data",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))", // Exclude the 'क्रिया' column
            },
            customize: function (csv) {
              const utf8BOM = "\uFEFF"; // UTF-8 BOM
              return utf8BOM + csv; // Return the final CSV with BOM
            },
          },
          {
            extend: "excel",
            text: "Excel",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))", // Exclude the 'क्रिया' column
            },
          },
          {
            extend: "print",
            text: "Print",
            action: function (e, dt, node, config) {
              // Redirect to custom page
              // window.location.href = "/print33";
              navigate("/print33");
            },
          },      
        ],
        paging: true,
        search: true,
        pageLength: 10,
        language: {
          emptyTable: "No data available in table",
          paginate: { previous: "Previous", next: "Next" },
          search: "Search records:",
        },
        columnDefs: [{ targets: -1, orderable: false }],
      });
    }
  }, [dataList]);
  // Handle input changes for new record
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value,
    });
  };

  // Handle adding a new record
  const handleAddRecord = async () => {
    try {
      const response = await axios.post("http://localhost:8080/rakkampartavya/create", newRecord);
      if (response.data) {
        setDataList([...dataList, newRecord]); // Add the new record to the table
        setModalList(false); // Close the modal
        navigate("/namuna32"); // Navigate to the '/nikita' route
      }
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------
  const handleDelete = async (id) => {
    try {
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return; // Exit the function if the user clicks "Cancel"
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token); // Log the token for debugging

      // Check if token exists
      if (!token) {
        console.log("No token found. User may not be logged in.");
        const errorMessage = "तुम्ही लॉगिन केलेले नाहीत. कृपया लॉगिन करा.";
        setErrorMessage(errorMessage);
        setSuccessMessage(""); // Clear any success messages
        return; // Exit if no token is found
      }

      // Perform the delete request with token authorization
      const response = await axios.post(
        `http://localhost:8080/rakkampartavya/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request header
          },
        }
      );

      // Redirect to the report page
      window.location.href = "/नमुना-३२-अहवाल"; // Alternatively, use navigate("/report32") if using React Router

      // Store the success message in sessionStorage
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage);
    } catch (error) {
      console.error("Error deleting data:", error);

      // Default error message
      let errorMessage = "डेटा काढण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";

      // Customize the error message based on the error response if available
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use the specific message from the server response
      }

      // Store the error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);

      // Update the error message state
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any success messages
    }
  };

  useEffect(() => {
    if (sessionMessage) {
      const timer = setTimeout(() => {
        setSessionMessage("");
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [sessionMessage]);
  //--------------------------------------------------------------------------------------------------

  // Handle Search functionality using DataTable
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger DataTable search method
  };
  const breadcrumbTitle = "अहवाल-३२"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ३२ रक्कमेच्या परताव्यासाठीचा आदेश "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३२", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 67%;
                    }
                `}
                
      </style>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  {/* <h4 className="card-title mb-0">नमुना ३२ - रक्कमेच्या परताव्यासाठीचा आदेश</h4> */}
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">नमुना ३२ रक्कमेच्या परताव्यासाठीचा आदेश</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-३२")}>
                        नवीन माहिती प्रविष्ट करा
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Show session message if available */}
                  {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}

                  <div className="table-responsive">
                    <div id="buttons-datatables_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                        <label htmlFor="search" className="me-2 mb-0">
                          शोधा:
                        </label>
                        <input
                          type="search"
                          id="search"
                          className="form-control form-control-sm"
                          placeholder="माहिती शोधा..."
                          onChange={handleSearch} // Trigger search when user types
                          aria-controls="buttons-datatables"
                          style={{
                            width: "300px",
                            maxWidth: "300px",
                            marginLeft: "10px",
                          }}
                        />
                      </div>

                      {/* Table */}
                      {dataList.length > 0 ? (
                        <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                          <thead>
                            <tr>
                              <th>आयडी</th> {/* ID as first column */}
                              <th>अॅक्शन</th> {/* Action column moved to second position */}
                              <th>पावती क्रमांक</th>
                              <th>दिलेली मूळ रक्कम दिनांक</th>
                              <th>रक्कम</th>
                              <th>परत करावयाची रकम</th>
                              <th>ठेवीदाराचे नाव</th>
                              <th>परतावा करणाऱ्या प्राधिकाऱ्याचे नाव</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{data.id}</td>
                                {/* <td>
                                                             <div className="d-flex gap-2">
                                                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={tog_list}>Edit</button>
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={tog_delete}>Remove</button>
                                                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={tog_delete}>View</button>
                                                                </div>
                                                                </td> */}

                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-३२-अपडेट", { state: data })}>
                                      एडिट करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>

                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-३२-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>

                                <td>{data.pavtiNumber}</td>
                                <td>{data.dileliMulRakkamDate}</td>
                                <td>{data.rakkam}</td>
                                <td>{data.paratKaryachiRakkam}</td>
                                <td>{data.thevidaracheNav}</td>
                                <td>{data.partavaKarnaryaPradhikaryacheNav}</td>
                                <td>{data.shera}</td>

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
                        <p>No records available</p> // Show message if no data is available
                      )}

                      {/* Pagination Container */}
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>{/* DataTables pagination controls will automatically be placed here */}</div>
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
            {/* <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
                        </div> */}

            <div className="mb-3">
              <label className="form-label">पावती क्रमांक</label>
              <input type="text" name="pavtiNumber" value={newRecord.pavtiNumber} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">दिलेली मूळ रक्कम दिनांक</label>
              <input type="text" name="dileliMulRakkamDate" value={newRecord.dileliMulRakkamDate} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">रक्कम</label>
              <input type="text" name="rakkam" value={newRecord.rakkam} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">परत करावयाची रकम</label>
              <input type="text" name="paratKaryachiRakkam" value={newRecord.paratKaryachiRakkam} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">ठेवीदाराचे नाव</label>
              <input type="text" name="thevidaracheNav" value={newRecord.thevidaracheNav} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">परतावा करणाऱ्या प्राधिकाऱ्याचे नाव</label>
              <input type="text" name="partavaKarnaryaPradhikaryacheNav" value={newRecord.partavaKarnaryaPradhikaryacheNav} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">शेरा </label>
              <input type="text" name="durustyaWisheshKharchRupaye" value={newRecord.durustyaWisheshKharchRupaye} onChange={handleInputChange} className="form-control" />
            </div>

            {/* <div className="mb-3">
                            <label className="form-label">दुरुस्त्या मूळ बंधकाम स्वरुप</label>
                            <input type="text" name="durustyaMulBandhkamSwarup" value={newRecord.durustyaMulBandhkamSwarup} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">शेरा</label>
                            <input type="text" name="shera" value={newRecord.shera} onChange={handleInputChange} className="form-control" />
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">वर्ष</label>
                            <input type="text" name="year" value={newRecord.year} onChange={handleInputChange} className="form-control" />
                        </div> */}
            {/* Repeat for other fields */}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddRecord}>
            Save
          </Button>
          <Button color="secondary" onClick={tog_list}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={modal_delete} toggle={tog_delete}>
        <ModalHeader toggle={tog_delete}>Delete Record</ModalHeader>
        <ModalBody>Are you sure you want to delete this record?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={tog_delete}>
            Delete
          </Button>
          <Button color="secondary" onClick={tog_delete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Report32;
