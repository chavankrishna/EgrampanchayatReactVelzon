import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
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
import "./Report.css";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import ReactPaginate from "react-paginate";
import Index from "../../Landing/OnePage";
const Namuna10Report = () => { 
  //const [data, setData] = useState([]); 
 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const tableRef=useRef(null);
  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState(""); 
  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);  
const[filteredData,setFilteredData]=useState([])
  const [newRecord, setNewRecord] = useState({ 
        userId:"",
        receiptNo: "",
        bookNo: "",
        shri: "",
        yearRange: "", 
        houseNo: "",
        billNo: "",
        date: "",
        taxDetails : "",
        previousBalance: "",
        currentBalance: "",  
        totalAmount: "",
        total: "",
}
);
  const [viewRecord, setViewRecord] = useState(null); 
  const navigate = useNavigate();
 const {state}=location;
 useEffect(() => {
  if (fromDate && toDate) {
    const startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0); // Normalize to start of the day
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999); // Normalize to end of the day

    const filtered = dataList.filter((item) => {
      const checkInDate = new Date(item.checkInDate);
      checkInDate.setHours(0, 0, 0, 0); // Ensure date-only comparison

      return checkInDate >= startDate && checkInDate <= endDate;
    });

    setFilteredData(filtered);
    setPageCount(Math.ceil(filtered.length / itemsPerPage)); // Recalculate pages after filtering
  } else {
    setFilteredData(dataList);
    setPageCount(Math.ceil(dataList.length / itemsPerPage)); // Recalculate pages without filter
  }
}, [fromDate, toDate, dataList]);


const indexOfLastItem = (currentPage + 1) * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;


const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

useEffect(() => {
  if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
    const dataTable = $("#buttons-datatables").DataTable({
      processing: true,
      serverSide: false,
      paging: true,
      searching: false,
      pageLength: 10, // Set initial page length
      lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]], // Allow changing items per page
      dom: 't<"row"<"col-md-6"i><"col-md-6"p>>', // Table and pagination structure
      language: {
        emptyTable: "No data available in table",
        paginate: { previous: "Previous", next: "Next" },
      },
      columnDefs: [{ targets: -1, orderable: false }],
    });

    return () => {
      dataTable.destroy(); // Destroy DataTable on cleanup
    };
  }
}, [filteredData]); // Re-run whenever filteredData changes

useEffect(() => {
  if (filteredData.length === 0 && $.fn.DataTable.isDataTable("#buttons-datatables")) {
    $("#buttons-datatables").DataTable().clear().draw(); // Clear table contents
  }
}, [filteredData]);
  const tog_list = (data) => {  
    setViewRecord(data); // Set the selected row data
    setModalList(!modal_list);   
  };
  const tog_delete = () => setModalDelete(!modal_delete);  

  useEffect(() => { 
    // Retrieve the session message from sessionStorage when the component mounts
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {  
      setSessionMessage(message); // Set the message to display
      
      // Remove the session message **after 5 seconds**
      const timer = setTimeout(() => {
        setSessionMessage(""); 
        sessionStorage.removeItem("sessionMessage"); 
      }, 3000); 

    // Cleanup timeout when component unmounts
    //return () => clearTimeout(timer);
     // sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }
    const currentItems = filteredData.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/namuna/list"
        );
        const apiData = response.data ? response.data : response;

        if (Array.isArray(apiData)) { 
          setDataList(apiData);
          setFilteredData(apiData);
          //setReceipts(apiData);
        } else {
          console.error("Unexpected API response format.");
          setDataList([]);
        }

       // setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);  
      }
    };
    fetchData();    
  }, [state]);

  const handleInputChange = (e) => {  
    const { name, value } = e.target;     
    setNewRecord({
      ...newRecord,     
      [name]: value,         
    });
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/namuna/save",
        newRecord
      );
      if (response.data) {
        setDataList([...dataList, newRecord]);  
        setModalList(false);
        navigate("/namuna10"); 
      }
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (
      window.confirm(
        "तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?"
      )
    ) {  
      try {     
        const response = await axios.delete(    
          `http://localhost:8080/api/namuna/delete/${userId}` 
        );
        if (response.status === 200) {  
          // Remove the deleted record from the state
          //setDataList((prevDataList) => prevDataList.filter((item) => item.userId !== userId)); 
          //alert("डेटा यशस्वीरित्या काढून टाकला गेला.");  
          
          setDataList((prevDataList) => { 
            const updatedList = prevDataList.filter((item) => item.userId !== userId);
           // return [...updatedList]; 
            
            return updatedList.length > 0 ? [...updatedList] : updatedList ; // Ensure re-render
           
           // if (updatedList.length === 0) {  
           //   return []; 
           // }
           // return updatedList;

          });

  

          alert("डेटा यशस्वीरित्या काढून टाकला गेला.");
        }
      } catch (error) {    
        console.error("Error deleting data:", error); 
        alert("डेटा काढून टाकताना त्रुटी आली.");
      }
    }
  };   

  // Handle Search functionality using DataTable
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw(); // Trigger DataTable search method    
  };

  const breadcrumbTitle = "अहवाल"; // This could be dynamic                                      
  const breadcrumbPageTitle = "डॅशबोर्ड / कर वसूली पावती नमुना नं. १० "; // Dynamic page title       
const breadcrumbPaths = [                                                
  "/dashboard", // Path for "डॅशबोर्ड"
  "/namuna10", // Path    
];
  return (
    <>    
     <style>    
            {`
               .page-title-right {
                            margin-left: 75%;
                        }
                    `}
                    
    </style>
          <UiContent />
      <div className="page-content">
        <Container fluid> 
            <BreadCrumb className="ps-4" title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">कर वसूली पावती नमुना नं. १० - अहवाल </h4>  
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button
                        color="primary"
                        onClick={() => navigate("/namuna10")} 
                        style={{ marginBottom: "1px" }} // Add spacing below the button
                      >    
                        नवीन माहिती प्रविष्ट करा   
                      </Button>        
                    </Col>
                  </Row>

                  {/* Show session message if available */}
                  {sessionMessage && (
                    <div className="alert alert-info">{sessionMessage}</div>
                  )}


<CardBody>
                  <div className="table-responsive">
                    {filteredData.length > 0 ?(
                      <table id="button-datatables" className=" table table-striped">

                     
                  
                    
                     
                     
                            <thead>
                              <tr>
                                <th>आयडी</th>
                                <th>क्रिया</th>
                                <th>पावती नं</th>
                                <th>बुक नं</th>
                                <th>घर क्र</th>
                                <th>बिल क्रमांक</th>    
                                <th>श्री</th>     
                              </tr>   
                            </thead>
                            <tbody>
                              {currentItems.map((data, index) => (    
                                <tr key={index}>
                                  {/* Display sequential ID */}
                                  <td>{index + 1}</td>{" "}
                                  {/* Index + 1 will ensure it starts from 1 */} 
                                  <td>
                                    <div className="d-flex gap-2"> 
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => 
                                          navigate("/namuna10update", {  
                                            state: data,  
                                          })     
                                        }         
                                      >
                                        अद्यतन करा 
                                      </button>
                                      <button 
                                        key={data.userId}  
                                        className="btn btn-sm btn-danger remove-item-btn"   
                                        onClick={() => 
                                          handleDelete(data.userId) 
                                        }      
                                      >
                                        काढून टाका  
                                      </button>  
                                      <button
                                        className="btn btn-sm btn-primary view-item-btn"
                                        onClick={() =>
                                          navigate("/namuna10view", {
                                            state: data,
                                          })
                                        }
                                      >
                                        माहिती पहा
                                      </button>
                                    </div>
                                  </td>
                                  <td>{data.receiptNo}</td>
                                  <td>{data.bookNo}</td>
                                  <td>{data.houseNo}</td>
                                  <td>{data.billNo}</td>
                                  <td>{data.shri}</td>  
                                </tr>
                              ))}
                           </tbody>
                        </table>
                      ) : (
                        <p>No data available</p>
                             )}
            
                   </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
        {/* Showing X to Y of Z entries */}
        <div>{showingText}</div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
                  </CardBody>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* View Modal */}
      <Modal isOpen={modal_list} toggle={() => setModalList(!modal_list)}>
        <ModalHeader toggle={() => setModalList(!modal_list)}>
          View Record
        </ModalHeader>  
        <ModalBody>            
          {viewRecord ? (                 
           <div>
           <p>
             <strong>पावती नं</strong>{" "}        
             {viewRecord.receiptNo}
           </p>
           <p>
             <strong>बुक नं</strong> 
             {viewRecord.bookNo} 
           </p>
           <p>
             <strong>घर क्र</strong> 
             {viewRecord.houseNo}
           </p>
           <p>
             <strong>बिल क्रमांक</strong>{" "} 
             {viewRecord.billNo}
           </p> 
           <p>
             <strong>श्री</strong> 
             {viewRecord.shri}
           </p>
           <p>
             <strong>वर्ष श्रेणी (पासून - पर्यंत)</strong>{" "}
             {viewRecord.yearRange} 
           </p> 
           <p>
             <strong>दिनांक</strong>   
             {viewRecord.date}   
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
    </>
  );
};
export default Namuna10Report;   






