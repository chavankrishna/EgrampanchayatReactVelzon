import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'datatables.net-bs5';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'jszip/dist/jszip';
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import $ from 'jquery';
import '../BasicElements/style.css';
import BreadCrumb from "../../../Components/Common/BreadCrumb"; 

const Namuna11Report = () => { 
    const [dataList, setDataList] = useState([]);
    const [modal_list, setModalList] = useState(false);
    const [modal_delete, setModalDelete] = useState(false);
    const [modal_view, setModalView] = useState(false);
    const [newRecord, setNewRecord] = useState({
        id: "",
        gramPanchayatId: "",
        gramPanchayatName: "",
        employeeId: "",
        employeeName: "",

        propertyOwnerName: "", 
        magniche_Swarup: "",
        magnisathi_Pradhikar: "",
        magni_Happta: "",
        magni_Rakam: "",
        magni_Total: "",
        deyakramankOR_Date: "",
        vasuli_PavtiKramankOR_Date: "",
        vasuli_Rakam: "",
        sut_AadheshachaKramankOR_Date: "",
        sut_Rakam: "",
        shillak: "",
        shera: "",
        year: "",

    });

    const navigate = useNavigate();  // Initialize the navigate function
    const tableRef = useRef(null);  // Create a ref for the table to avoid reinitialization

    const tog_list = () => setModalList(!modal_list);
    const tog_delete = () => setModalDelete(!modal_delete);
    const tog_view = () => setModalView(!modal_view);

    const [message, setMessage] = useState("");
    const [sessionMessage, setSessionMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    // Fetch data from API
    useEffect(() => {
        // Display session message if it exists
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
                    "http://localhost:8080/kirkolmagni_11/getAll",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // Pass the token in the headers
                        },
                    }
                );
                setDataList(response.data);
                
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
                                        <h1>नमुना ११ - किरकोळ मागणी नोंदवही</h1> 
                                        <div class="left" style="margin-top: -38px;">नमूना क्र. ११</div>
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

    // Handle input changes for new record
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value
        });
    };

    // Handle adding a new record  
    const handleAddRecord = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save', newRecord);
            if (response.data) {
                setDataList([...dataList, newRecord]); // Add the new record to the table
                setModalList(false); // Close the modal
                navigate('/Namuna06');  // Navigate to the '/nikita' route
            }
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    };

    //http://localhost:8080/kirkolmagni_11/deleteByID/${id}
    // 
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
            `http://localhost:8080/kirkolmagni_11/deleteByID/${id}`,
            {
                employeeId: "",
                employeeName: "",
                grampanchayatId: "",
                grampanchayatName: ""
            },
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
          window.location.href = "/नमुना-११-अहवाल";
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

    const breadcrumbTitle = "अहवाल-नमुना ११"; // This could be dynamic
    const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ११ - किरकोळ मागणी नोंदवही  "; // Dynamic page title
  
    // Define paths corresponding to each breadcrumb part
    const breadcrumbPaths = [
      "/dashboard", // Path for "डॅशबोर्ड"
      "/नमुना-११", // Path for "२५ - गुंतवणूक वही"
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
                                            <h4 className="card-title mb-0"> नमुना ११ - किरकोळ मागणी नोंदवही  </h4>
                                        </Col>
                                        <Col lg={4} className="text-end">
                                            <Button color="primary" onClick={() => navigate("/नमुना-११")}> 
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
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '-31px' }}>
                        
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

                                            {/* Table */}
                                            {dataList.length > 0 ? (
                                                <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                                                   <thead>
                                                    <tr>
                                                        <th>आयडी</th>
                                                        <th>क्रिया</th>
                                                        <th>ज्याने मागणीची रकम घ्यावयाची त्या इसमाचे नाव व पत्ता </th>
                                                        <th>मागणीचे स्वरूप </th>
                                                        <th>मागणीसाठी प्राधिकार </th>
                                                        <th>मागणी हप्ता</th>
                                                        <th>मागणी रकम</th>
                                                        <th>मागणी एकूण रकम </th>
                                                        <th>देयक क्रमांक / तारीख </th>
                                                        <th>वसूली झालेल्या रकम पावतीचा क्रमांक / तारीख</th>
                                                        <th>वसूली झालेल्या रकम रुपये </th>
                                                        <th>सूट आदेश  क्रमांक / तारीख</th>
                                                        <th>सूट रकम रुपये</th>
                                                        <th>शिलक</th>
                                                        <th>शेरा </th>
                                                        <th>वर्ष </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataList.map((data, index) => (
                                                        <tr key={index}>
                                                             <td>{data.id}</td>
                                                             <td>
                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        className="btn btn-sm btn-success edit-item-btn"
                                                                        onClick={() => navigate('/नमुना-११-अपडेट', { state: data })}
                                                                    >
                                                                        अद्यतन करा 
                                                                    </button>                                  
                                                                    <button
                                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                                        onClick={() => handleDelete(data.id)}
                                                                    >
                                                                        काढून टाका
                                                                    </button>
                                                                    <button className="btn btn-sm btn-primary remove-item-btn"  
                                                                            onClick={() => navigate('/नमुना-११-पाहणी-पृष्ठ', { state: data })}
                                                                    >
                                                                        डेटा पाहा
                                                                    </button> 
                                                                </div>
                                                            </td>
            
                                                            <td>{data.propertyOwnerName}</td>
                                                            <td>{data.magniche_Swarup}</td>
                                                           
                                                            <td>{data.magnisathi_Pradhikar}</td>
                                                           
                                                            <td>{data.magni_Happta}</td>
                                                            <td>{data. magni_Rakam}</td>
                                                            <td>{data.magni_Total}</td>
                                                            <td>{data.deyakramankOR_Date}</td>
                                                            <td>{data.vasuli_PavtiKramankOR_Date}</td>
                                                            <td>{data.vasuli_Rakam}</td>
                                                            <td>{data.sut_AadheshachaKramankOR_Date}</td>
                                                            <td>{data.sut_Rakam}</td>   
                                                            <td>{data.shillak}</td>
                                                            <td>{data.shera}</td>
                                                            <td>{data.year}</td>   

                                                        </tr>
                                                    ))}
                                                </tbody>
                                                </table>
                                            ) : (
                                                <p>No records available</p>  // Show message if no data is available
                                            )}

                                            {/* Pagination Container */}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                {/* DataTables pagination controls will automatically be placed here */}
                                            </div>
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

export default Namuna11Report; 