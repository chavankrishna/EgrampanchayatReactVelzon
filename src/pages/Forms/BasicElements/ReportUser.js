import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import $ from "jquery";

const ReportUser = () => {
  const [formData, setFormData] = useState(null);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [sessionMessage, setSessionMessage] = useState("");

  useEffect(() => {
    // Get the form data from sessionStorage
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []); // Empty array ensures it runs once when component is mounted

  // Initialize DataTable (if required)
  useEffect(() => {
    if (tableRef.current && !$.fn.dataTable.isDataTable("#buttons-datatables")) {
      $("#buttons-datatables").DataTable({
        dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
        paging: true,
        searching: true,
        pageLength: 10,
        language: {
          emptyTable: "No data available in table",
          paginate: { previous: "Previous", next: "Next" },
          search: "Search records:",
        },
      });
    }
  }, [formData]); // Reinitialize table when formData changes

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
      return () => clearTimeout(timer);
    }
  }, [sessionMessage]);

  const breadcrumbTitle = "अहवाल";
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल";
  const breadcrumbPaths = ["/dashboard", "/report"];

  return (
    <React.Fragment>
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <Button style={{ width: "13%", justifyContent: "left", marginLeft: "86%", marginTop: "1%" }} color="primary" onClick={() => navigate("/komal")} className="btn btn-sm">
                  वापरकर्ता जोडा
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

                    {formData ? (
                      <table id="buttons-datatables" className="display table table-bordered" ref={tableRef}>
                        <thead>
                          <tr>
                            <th>आयडी</th>
                            <th>क्रिया</th>
                            <th>कर्मचारी आयडी</th>
                            <th>कर्मचारी नाव</th>
                            <th>ग्रामपंचायत आयडी</th>
                            <th>ग्रामपंचायतीचे नाव</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td> {/* Assuming you're adding one row per data entry */}
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-primary">अद्यतन करा</button>
                                <button className="btn btn-sm btn-primary">डेटा पहा</button>
                                <button className="btn btn-sm btn-danger">काढून टाका</button>
                              </div>
                            </td>
                            <td>{formData.employee_id}</td>
                            <td>{formData.employee_name}</td>
                            <td>{formData.grampanchyat_id}</td>
                            <td>{formData.grampanchyat_name}</td>
                          </tr>
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

export default ReportUser;
