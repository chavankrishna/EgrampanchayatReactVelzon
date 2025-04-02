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
import "./Report32";
import { setSessionMessage, getSessionMessage } from "../BasicElements/finalconfig";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Report23 = () => {
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
    rastyacheNaaw: "",
    gaawPaasun: "",
    gaawParyant: "",
    laambiKm: "",
    rundiKm: "",
    rastyachaPrakar: "",
    purnKelyachiTarikh: "",
    pratiKmRastaTayarKarnyasAalelaKharch: "",
    durustyaChaluKharchRupaye: "",
    durustyaChaluSwarup: "",
    durustyaWisheshKharchRupaye: "",
    durustyaWisheshSwarup: "",
    durustyaMulBandhkamKharchRupaye: "",
    durustyaMulBandhkamSwarup: "",
    shera: "",
    year: "",
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
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token Inside Report : ", token);
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.post(
          "http://localhost:8080/tabyatilRastyanchiNondWahi/getAll",
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
        `http://localhost:8080/tabyatilRastyanchiNondWahi/deleteById/${id}`,
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
      window.location.href = "/नमुना-२३-अहवाल";
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

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger search in DataTable
  };
  const breadcrumbTitle = "अहवाल-२३"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना २३ ताब्यातील रस्त्यांची नोंदवही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२३", // Path for "२५ - गुंतवणूक वही"
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
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">नमुना २३ ताब्यातील रस्त्यांची नोंदवही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-२३")}>
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
                              <th>रस्त्यांचे नाव</th>
                              <th>गाव पासून</th>
                              <th>गाव पर्यंत</th>
                              <th>लांबी (किलो मीटर)</th>
                              <th>रुंदी (किलो मीटर)</th>
                              <th>रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा</th>
                              <th>पूर्ण केल्याची तारीख</th>
                              <th>प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च</th>
                              <th>दुरुस्त्या चालू खर्च रुपये</th>
                              <th>दुरुस्त्या चालू स्वरुप</th>
                              <th>दुरुस्त्या विशेष खर्च रुपये</th>
                              <th>दुरुस्त्या विशेष स्वरुप</th>
                              <th>दुरुस्त्या मूळ बंधकाम खर्च रुपये</th>
                              <th> दुरुस्त्या मूळ बंधकाम स्वरुप</th>
                              <th>शेरा</th>
                              <th>वर्ष</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-२३-अपडेट", { state: data })}>
                                      अद्यतन करा
                                    </button>
                                    <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                      काढून टाका
                                    </button>
                                    <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-२३-पाहणी-पृष्ठ", { state: data })}>
                                      डेटा पाहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.rastyacheNaaw}</td>
                                <td>{data.gaawPaasun}</td>
                                <td>{data.gaawParyant}</td>
                                <td>{data.laambiKm}</td>
                                <td>{data.rundiKm}</td>
                                <td>{data.rastyachaPrakar}</td>
                                <td>{data.purnKelyachiTarikh}</td>
                                <td>{data.pratiKmRastaTayarKarnyasAalelaKharch}</td>
                                <td>{data.durustyaChaluKharchRupaye}</td>
                                <td>{data.durustyaChaluSwarup}</td>
                                <td>{data.durustyaWisheshKharchRupaye}</td>
                                <td>{data.durustyaWisheshSwarup}</td>
                                <td>{data.durustyaMulBandhkamKharchRupaye}</td>
                                <td>{data.durustyaMulBandhkamSwarup}</td>
                                <td>{data.shera}</td>
                                <td>{data.year}</td>
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
    </React.Fragment>
  );
};

export default Report23;
