import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
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

const Report25 = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Store selected record for deletion
  const [modalDelete, setModalDelete] = useState(false); // Control modal visibility
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to track success
  const [errorMessage, setErrorMessage] = useState(""); // State to track error
  // Fetch success message from sessionStorage
  useEffect(() => {
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message);
      sessionStorage.removeItem("sessionMessage");
    } 

    // Fetch the data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const response = await axios.post(
          "http://localhost:8080/api/guntonukNamuna25/getAll",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          }
        );
        setDataList(response.data);
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
                                        <div class="left">महाराष्ट्र ग्रामपंचायत लेखा प्रणाली - २०११</div>
                                    </div>
                                    <h1>गुंतवणूक नोंदवही</h1>
                                    <div class="left" style="margin-top: -38px;">नमुना नं . २५</div>
                                    <div class="header-row">
                                        <div class="left">नियम १६(१) व (२) आणि २२(१) पहा</div>
                                    </div>
                                    <div class="center-section">
                                        <div>ग्रामपंचायत <span>________</span></div>
                                        <div>तालुका <span>________</span></div>
                                        <div>जिल्हा <span>________</span></div>
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

  // Handle Delete Record
  const handleDelete = async (selectedRecord) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        `http://localhost:8080/api/guntonukNamuna25/deleteById/${selectedRecord.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );

      window.location.href = "/report";

      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage); // Store the success message
    } catch (error) {
      console.error("Error deleting data:", error);
      let errorMessage = "Failed to submit data. Please try again later.";   
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      sessionStorage.setItem("sessionMessage", errorMessage); // Store the error message

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
    return `${day}-${month}-${year}`;
  };
  // const breadcrumbTitle = "";  // This could be dynamic
  // const breadcrumbPageTitle = "डॅशबोर्ड / २५ - गुंतवणूक वही / अहवाल-२५";  // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbTitle = "अहवाल-२५"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / २५ - गुंतवणूक वही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/nikita", // Path for "२५ - गुंतवणूक वही"
    "/report", // Path for "अहवाल-२५"
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 78%;
                    }
                `}
                
      </style>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <Button style={{ width: "13%", justifyContent: "left", marginLeft: "86%", marginTop: "1%" }} color="primary" onClick={() => navigate("/नमुना-२५")} className="btn btn-sm">
                  नवीन माहिती प्रविष्ट करा
                </Button>
                <CardBody>
                  {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}

                  <div className="table-responsive">
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                      <label htmlFor="search" className="me-2 mb-0">
                        शोधा:
                      </label>
                      <input
                        type="search"
                        id="search"
                        className="form-control form-control-sm"
                        placeholder="डेटा शोधा..."
                        onChange={handleSearch}
                        style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
                      />
                    </div>

                    {dataList.length > 0 ? (
                      <table id="buttons-datatables" className="display table table-bordered" ref={tableRef}>
                        <thead>
                          <tr>
                            <th>कर्मचारी आयडी</th>   
                            <th>क्रिया</th>
                            <th>गुंतवणुकीची तारीख</th>
                            <th>गुंतवणुकीचा तपशील(बँकेत मुदत ठेव)</th>   
                            <th>गुंतवणुकीची रक्कम दर्शनी मूल्य </th>
                            <th>गुंतवणुकीची रक्कम खरेदी किंमत </th>
                            <th>परिणत होण्याची तारीख</th>
                            <th>निव्वळ देय रक्कम</th>
                            <th>उपार्जित व्याजाची तारीख</th>
                            <th>बदलीचा/पदोन्नतीचा दिनांक</th>
                            <th>दैनिक रोकड वहीतील जमा रक्कम </th>
                            <th>प्रक्रांतीचा तपशील</th>
                            <th>महिना</th>
                            <th>शेरा</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataList.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-primary" onClick={() => navigate("/नमुना-२५-अपडेट", { state: data })}>
                                    अद्यतन करा
                                  </button>
                                  <button className="btn btn-sm btn-primary" onClick={() => navigate("/नमुना-२५-पाहणी-पृष्ठ", { state: { id: data.id } })}>
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
                              <td>{formatDate(data.guntonukiciTarikha)}</td>
                              <td>{data.guntonukiciTapisila}</td>
                              <td>{data.guntonukichiRakamDarsaniMulya}</td>
                              <td>{data.guntonukichiRakamKharēdīKimata}</td>
                              <td>{formatDate(data.pranitHonachiTarkhi)}</td>
                              <td>{data.nivalDyaRakam}</td>
                              <td>{formatDate(data.uparichitVachanchiTarakhi)}</td>
                              <td>{formatDate(data.badlichaPadrothrichaDinaka)}</td>
                              <td>{data.dainikRokadBahithilJamaRakam}</td>
                              <td>{data.prakritischiTapasni}</td>
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

export default Report25;
