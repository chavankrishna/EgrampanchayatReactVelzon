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

const Report30 = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [modal_view, setModalView] = useState(false);
  const [newRecord, setNewRecord] = useState({ 
    id: "",
    employeeId: "",
    employeeName: "",
    gramPanchayatId: "",
    gramPanchayatName: "",

    lekhParikshanAhwalVarsh: "",

    lPAhwalPraptaJhalyachiDinank: "",

    ahwalatilAkshepanchiSankhya: "",
    ahwalatilAkshepanchiAnuKramank: "",

    kMAsanaraAkshepKramank: "",
    kMAsanaraAkshepSankhya: "",

    purtataKarvyachyaAkshepancheKramank: "",
    purtataKarvyachyaAkshepancheSankhya: "",

    gpPAkshepancheKramank: "",
    gpPKeleleAkshepancheSankhya: "",

    pKAPSamitiKadePathvilaJavakDinank: "",
    pKAPtSamitiKadePathvilakramank: "",

    pKAPSamitineJPKadePathvalaThravKrmank: "",
    pKAPSamitineJPKadePathvalychaJavakKrmank: "",
    pKAPSamitineJPKadePathvalychaDinank: "",

    jPYaniManjurKeleleAkshepKramank: "",
    jPYaniManjurKeleleAkshepSankya: "",

    sAVVKramankPustakiSamayojan: "",
    sAVVKramankVasuli: "",
    sAVVKramankMulyankan: "",
    sAVVKramankNiyambahya: "",
    sAVVKramankEkun: "",

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
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        console.error("Token not found in localStorage");
        setErrorMessage("Authentication token is missing. Please log in.");
        return;
      }

      console.log("Using token:", token); // Log the token for debugging

      try {
        const response = await axios.post(
          "http://localhost:8080/lekhaparikshan/getAll",
          {}, // Send an empty payload if the API expects a POST request
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          }
        );
        setDataList(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        const errorMessage = error.response?.data?.message || "Unable to fetch data. Please try again.";
        setErrorMessage(errorMessage);
      }
    };

    fetchData();
  }, []);

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

  // Handle adding a new record
  const handleAddRecord = async () => {
    try {
      const response = await axios.post("http://localhost:8080/lekhaparikshan/create", newRecord);
      if (response.data) {
        setDataList([...dataList, newRecord]); // Add the new record to the table
        setModalList(false); // Close the modal
        navigate("/नमुना-३०"); // Navigate to the '/nikita' route
      }
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  //--------------------------
  const handleDelete = async (id) => {
    try {
      // Confirm delete operation
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return; // Exit the function if the user clicks "Cancel"
      }

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        const errorMessage = "Authentication token is missing. Please log in.";
        sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message
        setErrorMessage(errorMessage);
        return;
      }

      console.log("Using token:", token); // Log token for debugging

      // Make delete request with token in headers
      const response = await axios.post(
        `http://localhost:8080/lekhaparikshan/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to another page after successful deletion
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
      setSuccessMessage(successMessage);
      setErrorMessage(""); // Clear any error messages

      console.log("Delete response:", response.data);
      window.location.href = "/नमुना-३०-अहवाल";
    } catch (error) {
      console.error("Error deleting data:", error);
      let errorMessage = "Failed to delete data. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Use error message from the response
      }

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
  //-----------------------------------

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger search in DataTable
  };
  const breadcrumbTitle = "अहवाल-३०"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ३० ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३०", // Path for "२५ - गुंतवणूक वही"
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
                      <h4 className="card-title mb-0">नमुना ३० ग्रामपंचायत लेखा परीक्षण आक्षेप पूर्तता नोंदवही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-३०")}>
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
                              <th>लेखापरिक्षण अहवाल वर्ष</th>
                              <th>लेखापरिक्षण अहवाल प्राप्त झाल्याचा दिनांक</th>
                              <th>अहवालांतील आक्षेपांची संख्या </th>
                              <th>अहवालांतील आक्षेपांची अनुक्रमांक</th>
                              <th>केवळ माहितीसाठी असणारा आक्षेप क्रमांक</th>
                              <th>केवळ माहितीसाठी असणारा आक्षेप संख्या</th>
                              <th>पुर्तता करावयाच्या आक्षेपांचे क्रमांक</th>
                              <th> पुर्तता करावयाच्या आक्षेपांचे संख्या</th>
                              <th>ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे क्रमांक </th>
                              <th>ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे संख्या</th>
                              <th>पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा जावक दिनांक</th>
                              <th>पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा क्रमांक</th>
                              <th>पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा ठराव क्रमांक</th>
                              <th>पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा जावक क्रमांक</th>
                              <th>पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा दिनांक</th>
                              <th>जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप क्रमांक</th>
                              <th>जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप संख्या</th>
                              <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक पुस्तकी समायोजन</th>
                              <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक वसुली</th>
                              <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक मूल्यांकन</th>
                              <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक नियमबाह्य</th>
                              <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक एकूण</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-३०-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>
                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-३०-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.lekhParikshanAhwalVarsh}</td>
                                <td>{data.lPAhwalPraptaJhalyachiDinank}</td>
                                <td>{data.ahwalatilAkshepanchiSankhya}</td>
                                <td>{data.ahwalatilAkshepanchiAnuKramank}</td>
                                <td>{data.kMAsanaraAkshepKramank}</td>
                                <td>{data.kMAsanaraAkshepSankhya}</td>
                                <td>{data.purtataKarvyachyaAkshepancheKramank}</td>
                                <td>{data.purtataKarvyachyaAkshepancheSankhya}</td>
                                <td>{data.gpPAkshepancheKramank}</td>
                                <td>{data.gpPKeleleAkshepancheSankhya}</td>
                                <td>{data.pKAPSamitiKadePathvilaJavakDinank}</td>
                                <td>{data.pKAPtSamitiKadePathvilakramank}</td>
                                <td>{data.pKAPSamitineJPKadePathvalaThravKrmank}</td>
                                <td>{data.pKAPSamitineJPKadePathvalychaJavakKrmank}</td>
                                <td>{data.pKAPSamitineJPKadePathvalychaDinank}</td>
                                <td>{data.jPYaniManjurKeleleAkshepKramank}</td>
                                <td>{data.jPYaniManjurKeleleAkshepSankya}</td>
                                <td>{data.sAVVKramankPustakiSamayojan}</td>
                                <td>{data.sAVVKramankVasuli}</td>
                                <td>{data.sAVVKramankMulyankan}</td>
                                <td>{data.sAVVKramankNiyambahya}</td>
                                <td>{data.sAVVKramankEkun}</td>
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
        <ModalFooter>
          <Button color="primary" onClick={handleAddRecord}>
            Save
          </Button>
          <Button color="secondary" onClick={tog_list}>
            Cancel
          </Button>
        </ModalFooter>
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

export default Report30;
