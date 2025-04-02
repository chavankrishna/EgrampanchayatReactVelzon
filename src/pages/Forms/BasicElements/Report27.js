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
import "./Report23.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Report27 = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [modal_view, setModalView] = useState(false);
  const [newRecord, setNewRecord] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    lekhaparikshanaAhvalcheVrsh: "",
    lekhaparikshanaAhvalatilaParicchhedaSamkhaya: "",
    grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya: "",
    panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya: "",
    lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya: "",
    prlabitAsalellyaAakshepachiSakhaya: "",
    pootartaNaKelelayabghlachiKaarana: "",
    shera: "",
  });

  const navigate = useNavigate();
  const tableRef = useRef(null);
  const tog_list = () => setModalList(!modal_list);
  const tog_delete = () => setModalDelete(!modal_delete);
  const tog_view = () => setModalView(!modal_view);

  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve session message if available
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    // Define the fetchData function
    const fetchData = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authentication token not found. Please log in again.");
          return; // Exit if no token is found
        }

        // Send the POST request with token authorization
        const response = await axios.post(
          "http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/getAll",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the header
            },
          }
        );

        // Set the data into the state after a successful response
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData on component mount
    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Initialize DataTable
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

  //---------------------------------------------------------------------------------------------------
  const handleDelete = async (id) => {
    try {
      // Confirm with the user before deleting
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return; // Exit the function if the user clicks "Cancel"
      }

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found. Please log in again.");
        return; // Exit if no token is found
      }

      // Send the DELETE request with token authorization
      const response = await axios.post(
        `http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      );

      // Redirect to the report page after successful deletion
      window.location.href = "/नमुना-२७-अहवाल";

      // Save success message in sessionStorage
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
    } catch (error) {
      console.error("Error deleting data:", error);
      let errorMessage = "डेटा काढून टाकण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message

      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
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

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger search in DataTable
  };
  const breadcrumbTitle = "अहवाल-२७ "; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना २७ लेखा परीक्षणातील आक्षेपांच्या मासिक विवरण "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२७", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 62%;
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
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">नमुना २७ जमा रकमांची नोंदवही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-२७")}>
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
                          onChange={handleSearch}
                          aria-controls="buttons-datatables"
                          style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
                        />
                      </div>

                      {dataList.length > 0 ? (
                        <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                          <thead>
                            <tr>
                              <th>अनुक्रमांक</th> {/* Serial Number Column */}
                              <th>ॲक्शन</th>
                              <th>लेखापरीक्षण अहवालाचे वर्ष</th>
                              <th>लेखापरीक्षण अहवालातील परिच्छेद संख्या</th>
                              <th>ग्रामपंचायतीने या महिन्यात पूर्तता केलेल्या परिच्छेदांची संख्या</th>
                              <th>पंचायत समितीने आक्षेपाद्वारे मान्य केलेल्या पूर्ततांची संख्या</th>
                              <th>लेखापरीक्षकाने ज्या बाबतीत पूर्तता मान्य केली आहे त्या आक्षेपांची संख्या</th>
                              <th>प्रलंबित असलेल्या आक्षेपांची संख्या (३-६)</th>
                              <th>पूर्तता न केल्याबद्दलची कारणे</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-२७-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>
                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-२७-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.lekhaparikshanaAhvalcheVrsh}</td>
                                <td>{data.lekhaparikshanaAhvalatilaParicchhedaSamkhaya}</td>
                                <td>{data.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya}</td>
                                <td>{data.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya}</td>
                                <td>{data.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya}</td>
                                <td>{data.prlabitAsalellyaAakshepachiSakhaya}</td>
                                <td>{data.pootartaNaKelelayabghlachiKaarana}</td>
                                <td>{data.shera}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No records available</p>
                      )}
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
        {/* <ModalFooter>
          <Button color="primary" onClick={handleAddRecord}>
            Save
          </Button>
          <Button color="secondary" onClick={tog_list}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
      <Modal isOpen={modal_view} toggle={tog_view}>
        <ModalHeader toggle={tog_delete}>View Record</ModalHeader>
        <ModalFooter>
          <Button color="danger" onClick={tog_view}>
            View
          </Button>
          <Button color="secondary" onClick={tog_view}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Report27;
