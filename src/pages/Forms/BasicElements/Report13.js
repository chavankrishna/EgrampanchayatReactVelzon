import React, { useEffect, useState, useRef } from "react";

import { Button, Card, CardBody, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";

const ReportPage_13 = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Store selected record for deletion
  const [modalDelete, setModalDelete] = useState(false); // Control modal visibility
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error
  const [newRecord, setNewRecord] = useState({
    id: "",
    grampanchayatId: "",
    grampanchayatName: "",
    employeeId: "",
    employeeName: "",
    padnaam: "",
    padanchiSankhya: "",
    manjurPadAdeshKramank: "",
    manjurPadAdeshDinank: "",
    purnakalikAnshkalik: "",
    manjurWetanShreni: "",
    karmacharyacheNaav: "",
    niyuktiDinank: "",
    year: "",
    remark: "",
  });
  // Fetch success message from sessionStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.post(
          "http://localhost:8080/karmachari-varg-wetan-shreni/getall",
          {}, // No body payload
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataList(response.data); // Update dataList state
        console.log("Fetched data:", response.data); // Debugging
      } catch (error) {
        console.error("Error fetching data:", error);
        setSessionMessage("डेटा मिळविण्यात त्रुटी आली आहे. कृपया नंतर पुन्हा प्रयत्न करा.");
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
  // Handle Delete Record
  const handleDelete = async (selectedRecord) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Make the delete request with the token in the headers
      const response = await axios.post(
        `http://localhost:8080/karmachari-varg-wetan-shreni/delete_by_id/${selectedRecord.id}`, // Use backticks for the template literal
        {}, // Empty body for POST request
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );

      console.log("Response:", response);

      // Redirect after a successful delete
      window.location.href = "/नमुना-१३-अहवाल";

      // Set a success message in session storage
      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage);
    } catch (error) {
      console.error("Error deleting data:", error);

      // Default error message
      let errorMessage = "Failed to delete data. Please try again later.";

      // Update error message if server response is available
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Set error message in session storage and update UI
      sessionStorage.setItem("sessionMessage", errorMessage);
      setErrorMessage(errorMessage);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  // Handle Search functionality using DataTable
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw();
  };
  useEffect(() => {
    if (sessionMessage) {
      const timer = setTimeout(() => {
        setSessionMessage("");
      }, 5000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [sessionMessage]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
    return `${day}-${month}-${year}`; // Use backticks for template literal
  };
  const breadcrumbTitle = "अहवाल-१३"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना १३ कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-१३", // Path for "२५ - गुंतवणूक वही"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 64%;
                    }
                `}
                
      </style>
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <Button style={{ width: "13%", justifyContent: "left", marginLeft: "86%", marginTop: "1%" }} color="primary" onClick={() => navigate("/नमुना-१३")} className="btn btn-sm">
                  नवीन माहिती प्रविष्ट करा
                </Button>
                <CardBody>
                  {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}

                  <div className="table-responsive">
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                      <label htmlFor="search" className="me-2 mb-0">
                        Search:
                      </label>
                      <input
                        type="search"
                        id="search"
                        className="form-control form-control-sm"
                        placeholder="Search data..."
                        onChange={handleSearch}
                        style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
                      />
                    </div>

                    {dataList.length > 0 ? (
                      <table id="buttons-datatables" className="display table table-bordered" ref={tableRef}>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Action</th>
                            <th>पदनाम</th>
                            <th>पदांची संख्या</th>
                            <th>मंजूर पदे आदेश क्रमांक</th>
                            <th>मंजूर पदे आदेश दिनांक</th>
                            <th>पूर्णकालिक/अंशकालिक</th>
                            <th>मंजूर वेतन श्रेणी</th>
                            <th>नियुक्त केलेल्या कर्मचाऱ्यांचे नाव</th>
                            <th>नियुक्तीचा दिनांक</th>
                            <th>वर्ष</th>
                            <th>शेरा</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataList.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-primary" onClick={() => navigate("/नमुना-१३-अपडेट", { state: data })}>
                                    अद्यतन करा
                                  </button>
                                  <button className="btn btn-sm btn-primary" onClick={() => navigate("/नमुना-१३-पाहणी-पृष्ठ", { state: { id: data.id } })}>
                                    डेटा पहा
                                  </button>

                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                      const isConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
                                      if (isConfirmed) {
                                        handleDelete(data); // Directly call handleDelete with the record
                                      }
                                    }}
                                  >
                                    काढून टाका
                                  </button>
                                </div>
                              </td>
                              <td>{data.padnaam}</td>
                              <td>{data.padanchiSankhya}</td>

                              <td>{data.manjurPadAdeshKramank}</td>
                              <td>{data.manjurPadAdeshDinank}</td>
                              <td>{data.purnakalikAnshkalik}</td>
                              <td>{data.manjurWetanShreni}</td>
                              <td>{data.karmacharyacheNaav}</td>
                              <td>{data.niyuktiDinank}</td>
                              <td>{data.year}</td>
                              <td>{data.remark}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No records available</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReportPage_13;
