import React, { useEffect, useState, useMemo } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import "../BasicElements/style.css";
import "./Report.css";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Namuna10Report1 = () => {
  const [dataList, setDataList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");   
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");  

  useEffect(() => {
    // Retrieve success message from sessionStorage
    const storedMessage = sessionStorage.getItem("sessionMessage");
    if (storedMessage) {
        setMessage(storedMessage);
        sessionStorage.removeItem("sessionMessage");

        // Remove the message after 5 seconds (5000ms)
        const timer = setTimeout(() => {
            setMessage("");    
        }, 5000);  

        // Cleanup function to clear timeout if component unmounts before time completes
        return () => clearTimeout(timer);
    }
}, []);   


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/namuna/list");
        const apiData = response.data ? response.data : response;
        if (Array.isArray(apiData) && apiData.length > 0) {
          setDataList(apiData);
        } else {
          console.warn("No data available.");
          setDataList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataList([]);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?")) {
      try {
        await axios.delete(`http://localhost:8080/api/namuna/delete/${userId}`);
        setDataList((prev) => prev.filter((item) => item.userId !== userId));

        const successMessage = "माहिती यशस्वीरीत्या काढून टाकण्यात  आली आहे!";
        sessionStorage.setItem("sessionMessage", successMessage);
        setSuccessMessage(successMessage);
        setErrorMessage("");   

        // Automatically remove success message after 5 seconds
        setTimeout(() => {
            setSuccessMessage("");
            sessionStorage.removeItem("sessionMessage");
        }, 5000);

      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const exportPDF = () => {
    if (dataList.length === 0) {
      alert("No data available to export.");
      return;
    }

    const doc = new jsPDF();
    doc.text("कर वसूली पावती नमुना नं. १० नोंद वही", 20, 10);
    autoTable(doc, {
      head: [["आयडी", "पावती नं", "बुक नं", "घर क्र", "बिल क्रमांक", "श्री"]],
      body: dataList.map((row, index) => [
        index + 1,
        row.receiptNo,
        row.bookNo,
        row.houseNo,
        row.billNo,
        row.shri,
      ]),
    });
    doc.save("Report.pdf");
  };


  const copyToClipboard = () => {
    if (dataList.length === 0) {
      alert("No data available to copy.");
      return;
    }
  
    // Convert data to CSV format
    const csvHeader = ["आयडी", "पावती नं", "बुक नं", "घर क्र", "बिल क्रमांक", "श्री"];
    const csvRows = dataList.map((row, index) => 
      [index + 1, row.receiptNo, row.bookNo, row.houseNo, row.billNo, row.shri].join("\t") // Using tab separator for better readability
    );   
  
    const csvContent = [csvHeader.join("\t"), ...csvRows].join("\n");
  
    // Copy to clipboard
    navigator.clipboard.writeText(csvContent)
      .then(() => alert("Data copied to clipboard!"))
      .catch((err) => console.error("Error copying data:", err));
  };


  const columns = useMemo(
    () => [
      { id: "id", header: "आयडी", accessorFn: (row, index) => index + 1 },
      {
        id: "actions",
        header: "क्रिया",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Button
              color="success"
              size="sm"
              //onClick={() => navigate("/namuna10update1", { state: { userId: row.original.userId, data: row.original } })}
              onClick={() => navigate("/namuna10update1", { state: row.original })} 
            >
              अद्यतन करा
            </Button> 
            <Button
              color="danger"
              size="sm"
              onClick={() => handleDelete(row.original.userId)}
            >
              काढून टाका
            </Button>
            <Button
              color="primary"
              size="sm"
              onClick={() => navigate("/namuna10view", { state: row.original })}
            >
              माहिती पहा
            </Button>
          </div>
        ),
      },
      { id: "receiptNo", header: "पावती नं", accessorKey: "receiptNo" },
      { id: "bookNo", header: "बुक नं", accessorKey: "bookNo" },
      { id: "houseNo", header: "घर क्र", accessorKey: "houseNo" },
      { id: "billNo", header: "बिल क्रमांक", accessorKey: "billNo" },
      { id: "shri", header: "श्री", accessorKey: "shri" },
      
    ],
    [navigate]
  );

  const table = useReactTable({
    data: dataList ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
  });


  const breadcrumbTitle = "अहवाल"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / कर वसूली पावती नमुना नं. १० "; // Dynamic page title
  const breadcrumbPaths = [
  "/dashboard", // Path for "डॅशबोर्ड"
  "/namuna10", // Path    
  ];


  const totalEntries = dataList.length;
  const currentPage = pagination.pageIndex; // Use pageIndex as the current page
  const pageSize = pagination.pageSize;
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  return (
    <> 
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
        <BreadCrumb className="ps-4" title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                  
                <Row>
                  <Col lg={8}>
                    <h4 className="card-title mb-0">कर वसूली पावती नमुना नं. १० नोंद वही</h4>
                  </Col>
                  <Col lg={4} className="text-end">
                    <Button color="primary" onClick={() => navigate("/namuna10")}>
                      नवीन माहिती प्रविष्ट करा
                    </Button>
                  </Col>
                </Row>

                {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}  
                {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>} 
                {message && <div className="mt-3 alert alert-success">{message}</div>} 

                {dataList.length === 0 ? (
                  <div className="text-center py-4">माहिती उपलब्ध नाही</div>    
                ) : (
                  <>
                    <Row className="my-3">
                      <Col lg={6} className="d-flex justify-content-start align-items-center gap-2">
                        <CSVLink data={dataList} filename="Report.csv">
                          <Button color="light" className="p-2 border bg-light text-dark" size="sm">CSV</Button>
                        </CSVLink>
                        <Button color="light" className="p-2 border bg-light text-dark" size="sm" onClick={exportPDF}>PDF</Button>
                        <Button color="light" className="p-2 border bg-light text-dark" size="sm" onClick={() => window.print()}>Print</Button>
                        <Button color="light" className="p-2 border bg-light text-dark" size="sm" onClick={copyToClipboard}>Copy</Button>
                      </Col>

                      <Col lg={6} className="d-flex justify-content-end align-items-center" > 
                        <input
                          type="text"
                          className="form-control"
                          placeholder="माहिती शोधा..."
                          onChange={(e) => setGlobalFilter(e.target.value)}      
                          style={{ width: "50%", height: "30px" }}
                        />
                      </Col>
                      
                    </Row>

                    <table className="table table-bordered">
                      <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row) => (
                          <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>


                    <div>
                        {/* Display Entry Range */}
                        <p>
                          <strong>Showing {startIndex} to {endIndex} out of {totalEntries} entries</strong>
                        </p>

                        {/* Pagination Controls */}
                        <nav style={{marginTop : "-30px" }} >
                          <ul className="pagination">

                             {/* Previous Page Button sign */}
                             <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                              <button
                                className="page-link"
                                onClick={() => table.previousPage()} 
                                disabled={currentPage === 0}
                              >
                               <span> &laquo; </span> 
                              </button>
                            </li>

                            {/* Previous Page Button text */}
                            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                              <button
                                className="page-link"
                                onClick={() => table.previousPage()}
                                disabled={currentPage === 0}
                              >
                                मागील पान
                              </button>
                            </li>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].map((_, index) => (
                              <li key={index} className={`page-item ${currentPage === index ? "active" : ""}`}>
                                <button
                                  className="page-link"
                                  onClick={() => table.setPageIndex(index)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}

                            {/* Next Page Button text*/}
                            <li className={`page-item ${currentPage >= totalPages - 1 ? "disabled" : ""}`}>
                              <button
                                className="page-link"
                                onClick={() => table.nextPage()}
                                disabled={currentPage >= totalPages - 1}
                              >
                                पुढील पान 
                              </button>

                            </li>

                            {/* Next Page Button sign*/}
                            <li className={`page-item ${currentPage >= totalPages - 1 ? "disabled" : ""}`}>
                                <button
                                  className="page-link"
                                  onClick={() => table.nextPage()}
                                  disabled={currentPage >= totalPages - 1}
                                >
                                <span>&raquo;</span> 
                                </button>
                            </li>

                          </ul>
                        </nav>
                      </div> 


                  {  /*
                    
                    <div className="d-flex justify-content-end align-items-center gap-2">
                      <Button className="p-2 border bg-transparent text-primary" size="md" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        मागील पान 
                      </Button>
                      <span className="fw-bold">पान {pagination.pageIndex + 1}</span>
                      <Button className="p-2 border bg-transparent text-primary" size="md" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        पुढील पान 
                      </Button>
                    </div>

                  */ }

                  </>
                )}    
              </CardBody>  
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Namuna10Report1;  
