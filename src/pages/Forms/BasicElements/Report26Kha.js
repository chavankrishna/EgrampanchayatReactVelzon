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
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import BreadCrumb from "../../../Components/Common/BreadCrumb";

// import "./Report26khaa.css";

const Report26Kha = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [modal_view, setModalView] = useState(false);
  const [newRecord, setNewRecord] = useState({
    id: "",
    mahina: "",
    praarabhitShillak: "",
    rakamJamaKileyachaMahina: "",
    mahinaAakhrichiShillakSachivakdila: "",
    mahinaAakhrichiShillakBanketila: "",
    mahinaAakhrichiShillakPostateil: "",
    alpabachatPramanapatrataGuntviloliRakam: "",
    banketaMudataThevitaGuntavililiRakam: "",
    ekun: "",
    shera: "",
  });
  const [viewRecord, setViewRecord] = useState(null);
  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const tableRef = useRef(null);

  const tog_list = (data) => {
    setViewRecord(data); // Set the selected row data
    setModalList(!modal_list);
  };
  const tog_delete = () => setModalDelete(!modal_delete);

  useEffect(() => {
    // Retrieve session message from sessionStorage
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Display the session message
      sessionStorage.removeItem("sessionMessage"); // Clear it after displaying
    }

    // Fetch data with token
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");

        // Log the token to verify
        console.log("Retrieved Token:", token);

        // Make an API call with the token in headers
        const response = await axios.post(
          "http://localhost:8080/api/grampanchayatKhaa26/getAll",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to Authorization header
            },
          }
        );

        // Log the response data for debugging
        console.log("Response Data:", response.data);

        // Set the fetched data to state
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
  const handleDelete = async (id) => {
    try {
      // Ask for user confirmation before deleting
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return; // Exit the function if the user clicks "Cancel"
      }

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }
      console.log("Token for delete request:", token);

      // Send the delete request with token in headers
      const response = await axios.post(
        `http://localhost:8080/api/grampanchayatKhaa26/delete/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );

      console.log("Delete response:", response.data);

      // Handle success
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      // Redirect to the report page
      window.location.href = "/नमुना-२६-ख-अहवाल";
    } catch (error) {
      console.error("Error deleting data:", error);

      // Handle error and store an appropriate message
      let errorMessage = "डेटा काढून टाकण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
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

  // Handle Search functionality using DataTable
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger DataTable search method
  };
  const breadcrumbTitle = "अहवाल-२६ख"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना २६ख मासिक खर्चाचे विवरण "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२६-ख", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 70%;
                    }
                `}
                
      </style>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} style={{ marginLeft: "60px" }} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">नमुना २६ मासिक खर्चाचे विवरण</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-२६-ख")}>
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

                      {dataList.length > 0 ? (
                        <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                          <thead>
                            <tr>
                              <th>अनुक्रमांक</th> {/* ID as first column */}
                              <th>ॲक्शन</th> {/* Action column moved to second position */}
                              <th>महिना</th>
                              <th>प्रारंभिक शिल्लक</th>
                              <th>रक्कम जमा केल्याचा महिना</th>
                              <th>रक्कम</th>
                              <th>महिना अखेरची बँकेतील शिल्लक</th>
                              <th>महिना अखेरची पोस्टातील शिल्लक</th>
                              <th>अल्पबचत प्रमांपत्रतात गुंतवलेली रक्कम</th>
                              <th>बँकेत मुदत ठेवीत गुंतवलेली रक्कम</th>
                              <th>एकूण</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-२६-ख-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>
                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-२६-ख-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.mahina}</td>
                                <td>{data.praarabhitShillak}</td>
                                <td>{data.rakamJamaKileyachaMahina}</td>
                                <td>{data.mahinaAakhrichiShillakSachivakdila}</td>
                                <td>{data.mahinaAakhrichiShillakBanketila}</td>
                                <td>{data.mahinaAakhrichiShillakPostateil}</td>
                                <td>{data.alpabachatPramanapatrataGuntviloliRakam}</td>
                                <td>{data.banketaMudataThevitaGuntavililiRakam}</td>
                                <td>{data.ekun}</td>
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

      {/* View Modal */}
      <Modal isOpen={modal_list} toggle={() => setModalList(!modal_list)}>
        <ModalHeader toggle={() => setModalList(!modal_list)}>View Record</ModalHeader>
        <ModalBody>
          {viewRecord ? (
            <div>
              <p>
                <strong>कर्मचारी आयडी:</strong> {viewRecord.id}
              </p>
              <p>
                <strong>महिना:</strong> {viewRecord.mahina}
              </p>
              <p>
                <strong>प्रारंभिक शिल्लक:</strong> {viewRecord.praarabhitShillak}
              </p>
              <p>
                <strong>रक्कम जमा केल्याचा महिना:</strong> {viewRecord.rakamJamaKileyachaMahina}
              </p>
              <p>
                <strong>रक्कम:</strong> {viewRecord.mahinaAakhrichiShillakSachivakdila}
              </p>
              <p>
                <strong>महिना अखेरची बँकेतील रक्कम:</strong> {viewRecord.mahinaAakhrichiShillakBanketila}
              </p>
              <p>
                <strong>महिना अखेरची पोस्टातील शिल्लक:</strong> {viewRecord.mahinaAakhrichiShillakPostateil}
              </p>
              <p>
                <strong>अल्पबचत प्रमांपत्रतात गुंतवलेली रक्कम:</strong> {viewRecord.alpabachatPramanapatrataGuntviloliRakam}
              </p>
              <p>
                <strong>बँकेत मुदत ठेवीत गुंतवलेली रक्कम:</strong> {viewRecord.banketaMudataThevitaGuntavililiRakam}
              </p>
              <p>
                <strong>एकूण:</strong> {viewRecord.ekun}
              </p>
              <p>
                <strong>शेरा:</strong> {viewRecord.shera}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalList(!modal_list)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Report26Kha;
