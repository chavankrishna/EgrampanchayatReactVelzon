import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
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
import { setSessionMessage, getSessionMessage } from "./finalconfig"; 
import $ from "jquery";
import "../BasicElements/style.css";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Namuna06Report = () => {
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [modal_view, setModalView] = useState(false);

  const [sessionMessage, setSessionMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const [newRecord, setNewRecord] = useState({
    id: "",
    employeeId: "",
    employeeName: "",
    grampanchayatId: "",
    grampanchayatName: "",
    createdDate: "",
    updatedDate: "",
    shera: "",
    year: "",

    // MojmaapWahi Fields
    lekhaShirsh: "",
    arthsankalpiyaAnudan: "",
    mahinyaBaddalchiEkunRakkam: "",
    maghilMahinyachaAkherparyantchiRakkam: "",
    maghePasunPudheChaluEkunRakkam: "",
    day: "",
    value: "",
    month: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function
  const tableRef = useRef(null); // Create a ref for the table to avoid reinitialization

  const tog_list = () => setModalList(!modal_list);
  const tog_delete = () => setModalDelete(!modal_delete);
  const tog_view = () => setModalView(!modal_view);


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
            "http://localhost:8080/Namuna06JamaRakmanchiNondvahi/getall",
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
                                          <h1>नमुना ६ - जमा व दिलेल्या रकमांची नोंदणी</h1> 
                                          <div class="left" style="margin-top: -38px;">नमूना क्र. ६</div>
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



         useEffect(() => {
            if (sessionMessage) {
              const timer = setTimeout(() => {
                setSessionMessage("");
              }, 3000);
        
              return () => clearTimeout(timer); // Clean up timer on component unmount
            }
          }, [sessionMessage]);
          //------------------------------------------------------------------------------------------------------------------
        
          const handleSearch = (e) => {
            const searchQuery = e.target.value;
            const dataTable = $("#buttons-datatables").DataTable();
            dataTable.search(searchQuery).draw(); // Trigger search in DataTable
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
                const response = await axios.delete(
                  `http://localhost:8080/Namuna06JamaRakmanchiNondvahi/delete_by_id/${id}`,
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
                window.location.href = "/नमुना-६-अहवाल";  
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

 

  const breadcrumbTitle = "अहवाल-६"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ६ - जमा व दिलेल्या रकमांची नोंदणी "; // Dynamic page title

  // Define paths corresponding to each breadcrumb part
  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-६", // 
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
                      <h4 className="card-title mb-0"> नमुना ६ - जमा व दिलेल्या रकमांची नोंदणी </h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-६")}> 
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
                        placeholder="माहिती शोधा..."
                        onChange={handleSearch} // Trigger search when user types
                        style={{ width: "300px", maxWidth: "300px", marginLeft: "10px" }}
                      />
                    </div> 

                    {/* Table */}
                    {dataList.length > 0 ? (
                      <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                        <thead>
                          <tr>
                            <th>आयडी</th>
                            <th>क्रिया</th>
                            <th>लेखाशीर्ष</th>
                            <th>अर्थसंकल्पीय अनुदान</th>
                            <th>महिन्याबद्दलची एकूण रक्कम</th>
                            <th>मागील महिन्याचा अखेरपर्यंतची रक्कम</th>
                            <th>मागे पासून पुढे चालू एकूण रक्कम</th>
                            <th>दिवस</th>
                            <th>महिना</th>
                            <th>वर्ष</th>
                            <th>मूल्य</th>
                            <th>शेरा</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataList.map((data, index) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-success edit-item-btn" onClick={() => navigate("/नमुना-६-अपडेट", { state: data })}>
                                    अद्यतन करा
                                  </button>
                                  <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => handleDelete(data.id)}>
                                    काढून टाका
                                  </button>

                                  <button className="btn btn-sm btn-primary remove-item-btn" onClick={() => navigate("/नमुना-६-पाहणी-पृष्ठ", { state: data })}>
                                    डेटा पाहा
                                  </button>
                                </div>
                              </td>
                              <td>{data.lekhaShirsh}</td>
                              <td>{data.arthsankalpiyaAnudan}</td>

                              <td>{data.mahinyaBaddalchiEkunRakkam}</td>

                              <td>{data.maghilMahinyachaAkherparyantchiRakkam}</td>
                              <td>{data.maghePasunPudheChaluEkunRakkam}</td>
                              <td>{data.day}</td>
                              <td>{data.month}</td>
                              <td>{data.year}</td>
                              <td>{data.value}</td>
                              <td>{data.shera}</td> 
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal
            <Modal isOpen={modal_list} toggle={tog_list}>
                <ModalHeader toggle={tog_list}>Add New Record</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input type="text" name="employeeId" value={newRecord.employeeId} onChange={handleInputChange} className="form-control" />
                        </div>
                        {/* Repeat for other fields */}
      {/* </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddRecord}>Save</Button>
                    <Button color="secondary" onClick={tog_list}>Cancel</Button>
                </ModalFooter>
            // </Modal> */}

      {/* <Modal isOpen={modal_delete} toggle={() => toggleDeleteModal(null)}>
    <ModalHeader toggle={() => toggleDeleteModal(null)}>Delete Record</ModalHeader>
    <ModalBody>
        Are you sure you want to delete this record? ID: {recordToDelete}
    </ModalBody>
    <ModalFooter>
        <Button color="danger" onClick={handleDeleteRecord}>Delete</Button>
        <Button color="secondary" onClick={() => toggleDeleteModal(null)}>Cancel</Button>
    </ModalFooter>
</Modal> */}

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

export default Namuna06Report;
