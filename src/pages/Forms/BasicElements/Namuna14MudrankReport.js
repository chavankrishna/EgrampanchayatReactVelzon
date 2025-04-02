import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody,CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
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

const Namuna14MudrankReport = () => { 
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
        const response = await axios.get(
          "http://localhost:8080/namuna14/getAll",
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
        pageLength: 5,
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
  const handleDelete = async (id) => {   
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.delete( 
        `http://localhost:8080/namuna14/deleteByID/${id}`,   
        {},
        {
          headers: {   
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );

      window.location.href = "/namuna14mudrankreport";

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
  const breadcrumbTitle = "अहवाल-14"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / 14 - मुद्रांक हिशोब नोंद वही "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/namuna14mudrank", // Path for "14 -  मुद्रांक हिशोब नोंद वही"
    "/namuna14mudrankreport", // Path for "अहवाल-14"
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
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                    <Row>
                        <Col lg={8}>
                            <h4 className="card-title mb-0">मुद्रांक हिशोब नोंद वही</h4>
                        </Col>
                        <Col lg={4} className="text-end">
                            <Button color="primary" onClick={() => navigate("/namuna14mudrank")}>
                                नवीन माहिती प्रविष्ट करा
                            </Button>
                        </Col>
                    </Row>
                </CardHeader> 
                <CardBody>
                  {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}

                  <div className="table-responsive">
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                      
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
                            <th>आयडी</th>
                            <th>क्रिया</th> 
                            <th>मिळालेले मुद्रांक प्रमाणक क्रमांक</th>
                            <th>मिळालेले मुद्रांकची किंमत</th> 
                            <th>वापरलेले मुद्रांकची पावती क्रमांक</th>
                            <th>वापरलेले मुद्रांक पावती दिनांक</th> 
                            <th>वापरलेले चिकटवलेले मुद्रांकची किंमत</th>  
                            <th>दैनिक शिल्लक</th>
                            <th>शेरा</th>                               
                          </tr>
                        </thead>
                        <tbody>
                          {dataList.map((data, index) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>    
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-success" 
                                    onClick={() => navigate('/namuna14mudrankupdate', { state: data })}
                                  >
                                    अद्यतन करा
                                  </button>
                                  <button className="btn btn-sm btn-primary"  
                                    onClick={() => navigate('/namuna14mudrankview', { state: data })}
                                  >    
                                    डेटा पहा
                                  </button>

                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                      const isConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
                                      if (isConfirmed) {
                                        handleDelete(data.id); // Directly call handleDelete with the record   
                                      }
                                    }}
                                  >
                                    काढून टाका 
                                  </button>
                                </div>
                              </td>
                              <td>{data.mMPramanakKramank}</td>  
                              <td>{data.mMKimmat}</td>
                              <td>{data.vMPavatiKramank}</td>

                              <td>
                                {data.vMPavatiDinank
                                    ? (() => {
                                        const date = new Date(data.vMPavatiDinank);
                                        const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
                                        const year = date.getFullYear();
                                        return `${day}-${month}-${year}`;
                                    })()
                                    : ''}
                                </td>

                              <td>{data.vMChitkavalyachiKimmat}</td>
                              <td>{data.dainikShillak}</td> 
                              <td>{data.shera}</td>
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

export default Namuna14MudrankReport;
