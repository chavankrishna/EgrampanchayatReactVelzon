import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
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
//import "./Namuna32Report";
import { setSessionMessage } from "./finalconfig";
import BreadCrumb from "../../../Components/Common/BreadCrumb"; 

const Namuna23Report = () => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [sessionMessage, setSessionMessage] = useState("");

  useEffect(() => {
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message);
      sessionStorage.removeItem("sessionMessage");
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.post(
          "http://localhost:8080/tabyatilRastyanchiNondWahi/getAll",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
              columns: ":visible:not(:nth-child(2))",
            },
          },
          {
            extend: "csv",
            text: "CSV",
            title: "Exported Data",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))",
            },
            customize: function (csv) {
              const utf8BOM = "\uFEFF";
              return utf8BOM + csv;
            },
          },
          {
            extend: "excel",
            text: "Excel",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))",
            },
          },
          {
            extend: "pdf",
            text: "PDF",
            title: "Exported Data",
            exportOptions: {
              columns: ":visible:not(:nth-child(2))",
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
                    body: [headers, ...rows],
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
              $(win.document.body)
                .find("header, footer, .breadcrumb, .btn, .page-title, .card-header")
                .hide();
              $(win.document.body)
                .find("table")
                .addClass("table-bordered table-sm")
                .css("width", "100%");
              $(win.document.body).find("th:nth-child(2), td:nth-child(2)").hide();

              const headerHtml = `
                <div class="header-container">
                  <div class="header-row">
                    <div class="left">नमुना-२३-ताब्यातील रस्त्यांची नोंदवही</div>
                  </div>
                  <h1>ताब्यातील रस्त्यांची नोंदवही</h1>
                  <div class="left" style="margin-top: -38px;">नमुना नं. २३</div>
                  <div class="header-row">
                    <div class="left">नियम १६(१) व (२) आणि २२(१) पहा</div>
                  </div>
                  <div class="center-section">
                    <div>ग्रामपंचायत <span>____</span></div>
                    <div>तालुका <span>____</span></div>
                    <div>जिल्हा <span>____</span></div>
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
        columnDefs: [{ targets: -1, orderable: false }],
      });
    }
  }, [dataList]);

  const handleDelete = async (id) => {
    try {
      const userConfirmed = window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?");
      if (!userConfirmed) {
        console.log("User canceled the delete operation.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }
      console.log("Token for delete request:", token);

      const response = await axios.post(
        `http://localhost:8080/tabyatilRastyanchiNondWahi/deleteById/${id}`,
        {
          employeeId: "",
          employeeName: "",
          grampanchayatId: "",
          grampanchayatName: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", response.data);

      const successMessage = "डेटा यशस्वीरित्या काढून टाकला गेला";
      sessionStorage.setItem("sessionMessage", successMessage);
      window.location.href = "/नमुना-२३-अहवाल";
    } catch (error) {
      console.error("Error deleting data:", error);
      let errorMessage = "डेटा काढून टाकण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      sessionStorage.setItem("sessionMessage", errorMessage);
      setSessionMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (sessionMessage) {
      const timer = setTimeout(() => {
        setSessionMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sessionMessage]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    const dataTable = $("#buttons-datatables").DataTable();
    dataTable.search(searchQuery).draw();
  };

  const breadcrumbTitle = "अहवाल-२३";
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना-२३ ताब्यातील रस्त्यांची नोंदवही ";
  const breadcrumbPaths = ["/dashboard", "/नमुना-२३"];

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
              justify-content: center;
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
                      <h4 className="card-title mb-0">नमुना-२३ ताब्यातील रस्त्यांची नोंदवही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button color="primary" onClick={() => navigate("/नमुना-२३")}>
                        नवीन माहिती प्रविष्ट करा
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {sessionMessage && <div className="alert alert-info">{sessionMessage}</div>}
                  <div className="table-responsive">
                    <div id="buttons-datatables_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "-31px" }}>
                        <input
                          type="search"
                          id="search"
                          className="form-control form-control-sm"
                          placeholder="माहिती शोधा..."
                          onChange={handleSearch}
                          aria-controls="buttons-datatables"
                          style={{ width: "200px", maxWidth: "200px", marginLeft: "10px" }}
                        />
                      </div>
                      {dataList.length > 0 ? (
                        <table id="buttons-datatables" className="display table table-bordered dataTable no-footer" ref={tableRef}>
                          <thead>
                            <tr>
                              <th>अनुक्रमांक</th>
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
                              <th>दुरुस्त्या मूळ बंधकाम स्वरुप</th>
                              <th>शेरा</th>
                              <th>वर्ष</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex gap-2" style={{ flexWrap: "nowrap", alignItems: "center" }}>
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      style={{ whiteSpace: "nowrap" }}
                                      onClick={() => navigate("/नमुना-२३-अपडेट", { state: data })}
                                    >
                                      अद्यतन करा
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      style={{ whiteSpace: "nowrap" }}
                                      onClick={() => handleDelete(data.id)}
                                    >
                                      काढून टाका
                                    </button>
                                    <button
                                      className="btn btn-sm btn-primary remove-item-btn"
                                      style={{ whiteSpace: "nowrap" }}
                                      onClick={() => navigate("/नमुना-२३-पाहणी-पृष्ठ", { state: data })}
                                    >
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

export default Namuna23Report;