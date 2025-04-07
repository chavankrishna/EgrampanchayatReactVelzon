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
import "./Report28.css";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig"; // Import session management functions
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Report28 = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [modal_view, setModalView] = useState(false);
  const [newRecord, setNewRecord] = useState({
    id: "",
    sanMadhemagasvargiyansathiKeleliTartud: "",
    san: "",
    chaluMahinyatPraptaJhaleleUtpanna: "",
    fiftyTakkeKharchaKarychiRakkam: "",
    kharchachyaBabiYojanavar: "",
    magilMahinayatJhalelaKharcha: "",
    chaluMahinyatJhalelaKharcha: "",
    ekunKharch: "",
    kharchachiTakkevari: "",
    shera: "",
    month: "",
    year: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function
  const tableRef = useRef(null); // Create a ref for the table to avoid reinitialization
  const tog_list = () => setModalList(!modal_list);
  const tog_delete = () => setModalDelete(!modal_delete);
  const tog_view = () => setModalView(!modal_view);

  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve and display session message if it exists
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Log the token for debugging (make sure not to log sensitive info in production)
    console.log("Token retrieved:", token);

    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/masikvivaran/getAll",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to the request headers
            },
          }
        );

        // Log the response for debugging
        console.log("Fetched data:", response.data);

        setDataList(response.data); // Store the fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Log the error if fetching fails
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  // Initialize DataTable
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
            extend: "pdf",
            text: "PDF",
            title: "Exported Data",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))", // Exclude the 'क्रिया' column
            },
            customize: function (doc) {
              const headers = [];
              $("#buttons-datatables thead tr th").each(function () {
                headers.push($(this).text().trim());
              });

              const rows = [];
              $("#buttons-datatables tbody tr").each(function () {
                const rowData = [];
                $(this)
                  .find("td")
                  .each(function () {
                    rowData.push($(this).text().trim());
                  });
                rows.push(rowData);
              });

              doc.content = [
                {
                  table: {
                    headerRows: 1,
                    widths: Array(headers.length).fill("*"),
                    body: [
                      headers, // Header row
                      ...rows, // Data rows
                    ],
                  },
                  layout: "lightHorizontalLines",
                },
              ];

              doc.styles = {
                tableHeader: {
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  color: "#000",
                },
                tableData: {
                  fontSize: 10,
                  alignment: "center",
                },
              };

              return doc;
            },
          },
          {
            extend: "print",
            text: "Print",
            customize: function (win) {
              $(win.document.body).find("header, footer, .breadcrumb, .btn, .page-title, .card-header").hide();
              $(win.document.body).find("table").addClass("table-bordered table-sm");
              $(win.document.body).find("table").css("width", "100%");

              // Hide the 'क्रिया' column during print
              $(win.document.body).find("th:nth-child(2), td:nth-child(2)").hide(); // Hide the second column

              // Apply your custom header above the table
              const headerHtml = `
                                <div class="header-container">
                                    <div class="header-row">
                                        <div class="left">महाराष्ट्र ग्रामपंचायत लेखा संहिता - २०११</div>
                                    </div>
                                    <h1>मागासवर्गीयांसाठी १५ टक्के (शिस्त त्यानंतर विविध केलेला) करावाचे खर्चाचे मासिक विवरण</h1>
                                    <div class="left" style="margin-top: -38px;">नमूना क्र. २८</div>
                                    <div class="header-row">
                                        <div class="left">नियम २५(७) पहा</div>
                                    </div>
                                    <div class="center-section">
                                        <div>ग्रामपंचायत <span></span></div>
                                        <div>तालुका <span></span></div>
                                        <div>जिल्हा <span></span></div>
                                    </div>
                                </div>
                             <div class="footer">
        <div class="footer-left">
          <p>प्रति, मे, गटविकास अधिकारी पंचायत समिती .............. यांना सादर &nbsp; <b>सचिवाची सही</b></p>
        </div>
      </div>
   
                            `;

              $(win.document.body).prepend(headerHtml);
            },
          },
        ],
        paging: true,
        searching: true,
        pageLength: 10,
        language: {
          emptyTable: "No data available in table",
          paginate: { previous: "मागील", next: "पुढील" },
          search: "Search records:",
        },
        columnDefs: [{ targets: -1, orderable: false }], // Disable sorting on the last column (actions column)
      });
    }
  }, [dataList]);

  //---------------------------------------------------------------------------------------------------------------------------------------------------
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
      // Confirm if the user really wants to delete the data
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return; // Exit the function if the user clicks "Cancel"
      }

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token is missing. User is not authenticated.");
        return; // Exit the function if no token is found
      }

      console.log("Token found:", token); // Log the token for debugging purposes

      // Make the API request to delete data
      const response = await axios.post(
        `http://localhost:8080/masikvivaran/delete/${id}`,
        {
          "employeeId": "",
          "employeeName": "",
          "gramPanchayatId": "",
          "gramPanchayatName": ""
        }, // Pass any necessary data here if needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Redirect after success
      window.location.href = "/नमुना-२८-अहवाल";

      // Save success message in sessionStorage
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message

      console.log("Delete successful:", response.data); // Log the success response for debugging
    } catch (error) {
      console.error("Error deleting data:", error); // Log the error for debugging

      let errorMessage = "डेटा काढण्यामध्ये अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message

      setErrorMessage(errorMessage); // Update state with the error message
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

  // Handle Search functionality using DataTable
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger DataTable search method
  };

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
  const breadcrumbTitle = "अहवाल-२८"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना २८ मासिक विवरण नोंदवही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२८", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
                {`
                .page-title-right {
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .page-title-right {
                    justify-content: center; /* Center align on smaller screens */
                    }
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
                      <h4 className="card-title mb-0">नमुना २८ जमा रकमांची नोंदवही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-२८")}>
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
                      {/* Search Box Container */}
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                        <label htmlFor="search" className="me-2 mb-0">
                          शोधा:
                        </label>
                        <input
                          type="search"
                          id="search"
                          className="form-control form-control-sm"
                          placeholder="माहिती शोधा..."
                          onChange={handleSearch} // Trigger search when user types
                          aria-controls="buttons-datatables"
                          style={{
                            width: "300px", // Adjust width as per requirement
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
                              <th>अनुक्रमांक</th> {/* Serial Number Column */}
                              <th>ॲक्शन</th>
                              <th>सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद</th>
                              <th>सन</th>
                              <th>चालू महिन्यात प्राप्त झालेले उत्पन्न</th>
                              <th>१५ टक्के खर्च करावयाची रक्कम</th>
                              <th>खर्चाच्या बाबी बाबवार / योजनावार</th>
                              <th>मागील महिन्यात झालेला खर्च</th>
                              <th>चालू महिन्यात झालेला खर्च</th>
                              <th>एकूण खर्च</th>
                              <th>खर्चाची टक्केवारी</th>
                              <th>शेरा</th>
                              <th>महिना</th>
                              <th>वर्ष</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-२८-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>

                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-२८-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.sanMadhemagasvargiyansathiKeleliTartud}</td>
                                <td>{data.san}</td>
                                <td>{data.chaluMahinyatPraptaJhaleleUtpanna}</td>
                                <td>{data.fiftyTakkeKharchaKarychiRakkam}</td>
                                <td>{data.kharchachyaBabiYojanavar}</td>
                                <td>{data.magilMahinayatJhalelaKharcha}</td>
                                <td>{data.chaluMahinyatJhalelaKharcha}</td>
                                <td>{data.ekunKharch}</td>
                                <td>{data.kharchachiTakkevari}</td>
                                <td>{data.shera}</td>
                                <td>{data.month}</td>
                                <td>{data.year}</td>
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

export default Report28;
