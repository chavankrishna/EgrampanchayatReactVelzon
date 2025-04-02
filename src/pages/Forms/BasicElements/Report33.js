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

const Report33 = () => {
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
    naav: "",
    vrukshkrmank: "",
    vrukshprakar: "",
    vrukshjopasnechijababdari: "",
    shera: "",
    date: "",
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
    // Display session message if it exists
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    // Fetch data from the API
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token Inside Report : ", token);
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.post(
          "http://localhost:8080/Namuna33VrukshNondViha/getall",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the Bearer token
            },
          }
        );

        setDataList(response.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);

        // Optionally, you can set an error message to display on the UI
        setSessionMessage("डेटा मिळविण्यात त्रुटी आली आहे. कृपया नंतर पुन्हा प्रयत्न करा.");
      }
    };

    fetchData();
  }, []);

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
          // {
          //   extend: "csv",
          //   text: "CSV",
          //   title: "Exported Data",
          //   exportOptions: {
          //     columns: ":visible:not(:nth-child(2))", // Exclude the 'क्रिया' column
          //   },
          //   customize: function (csv) {
          //     const utf8BOM = "\uFEFF"; // UTF-8 BOM
          //     return utf8BOM + csv; // Return the final CSV with BOM
          //   },
          // },
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

  //----------------------------------------------------------------------------------------------------
  //Delete Code
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
        `http://localhost:8080/Namuna33VrukshNondViha/delete_by_id/${id}`,
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
      window.location.href = "/नमुना-३३-अहवाल";
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
  //------------------------------------------------------------------------------------------------------------------

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger search in DataTable
  };
  const breadcrumbTitle = "अहवाल-३३"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ३३ वृक्ष नोंदवही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३३", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 77%;
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
                      <h4 className="card-title mb-0"></h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-३३")}>
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
                              <th>नाव</th>
                              <th>वृक्ष क्रमांक Cते C</th>
                              <th>वृक्ष प्रकार</th>
                              <th>वृक्ष जोपासनेधी जबाबदारी</th>
                              <th>दिनांक</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => navigate("/नमुना-३३-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>
                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-३३-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.naav}</td>
                                <td>{data.vrukshkrmank}</td>
                                <td>{data.vrukshprakar}</td>
                                <td>{data.vrukshjopasnechijababdari}</td>
                                <td>{data.shera}</td>
                                <td>{data.date}</td>
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
    </React.Fragment>
  );
};

export default Report33;
