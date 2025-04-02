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

const Report21 = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");

  const [dataList, setDataList] = useState([]);
  const [modal_list, setModalList] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  const [newRecord, setNewRecord] = useState({
    id: "",
    remark: "",
    year: "",
    kamachePratyakshaMojmap: "",
    kamkarnayaAgencyAbhikanacheNaaw: "",
    kamacheWarnan: "",
    mojmap: "",
    kamacheWarnanKamacheUpashirshVaKshetracheAdhikari: "",
    mojmapachaTapshilPariman: "",
    mojmapachaTapshilLaambi: "",
    mojmapachaTapshilRundi: "",
    mojmapachaTapshilKholiUnchi: "",
    mojmapachaTapshilEkun: "",
    ekunParimanMaapPurvicheHajeriPramaneWarnanKarave: "",
    ekunMojmapachaTapshilEkunVaEkunParimanMaap: "",
    dar: "",
    rakkam: "",
  });
  const [viewRecord, setViewRecord] = useState(null);

  const navigate = useNavigate();
  const tableRef = useRef(null);

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
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/mojmaapWahi/getAll"
        );
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    if (
      tableRef.current &&
      !$.fn.dataTable.isDataTable("#buttons-datatables")
    ) {
      $("#buttons-datatables").DataTable({
        dom: '<"row" <"col-md-6" B>>t<"row" <"col-md-6" i><"col-md-6" p>>',
        buttons: ["copy", "csv", "excel", "pdf", "print"],
        paging: true,
        search: true,
        pageLength: 5,
        language: {
          emptyTable: "कोणतीही माहिती उपलब्ध नाही",
          paginate: {
            previous: "मागील पान",
            next: "पुढील पान",
          },
          search: "Search records:",
        },
        columnDefs: [{ targets: -1, orderable: false }],
      });
    }
  }, [dataList]);

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
        "http://localhost:8080/mojmaapWahi/create",
        newRecord
      );
      if (response.data) {
        setDataList([...dataList, newRecord]);
        setModalList(false);
        navigate("/form-details");
      }
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "तुम्हाला खात्री आहे का की तुम्हाला हा डेटा काढून टाकायचा आहे?"
      )
    ) {
      try {
        const response = await axios.post(
          `http://localhost:8080/mojmaapWahi/deleteById/${id}`
        );
        if (response.status === 200) {
          // Remove the deleted record from the state
          setDataList(dataList.filter((item) => item.id !== id));
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={8}>
                      <h4 className="card-title mb-0">नमुना २१ - मोजमाप वही</h4>
                    </Col>
                    <Col lg={4} className="text-end">
                      <Button
                        color="primary"
                        onClick={() => navigate("/form-details")}
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

                  <div className="table-responsive">
                    <div
                      id="buttons-datatables_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginBottom: "-31px",
                          marginTop: "15px", // Add spacing between the elements
                        }}
                      >
                        <label htmlFor="search" className="me-2 mb-0">
                          शोधा:
                        </label>
                        <input
                          type="search"
                          id="search"
                          className="form-control form-control-sm"
                          placeholder="माहिती शोधा..."
                          onChange={handleSearch}
                          style={{
                            width: "300px",
                            maxWidth: "300px",
                            marginLeft: "10px",
                          }}
                        />
                      </div>

                      {dataList.length > 0 ? (
                        <table
                          id="buttons-datatables"
                          className="display table table-bordered dataTable no-footer"
                          ref={tableRef}
                        >
                          <thead>
                            <tr>
                              <th>आयडी</th>
                              <th>अॅक्शन</th>
                              <th>कामाचे प्रत्यक्ष मोजमाप</th>
                              <th>काम करणाऱ्या अभिकरणाचे नाव</th>
                              <th>कामाचे वर्णन</th>
                              <th>वर्ष</th>
                              <th>शेरा</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataList.map((data, index) => (
                              <tr key={index}>
                                {/* Display sequential ID */}
                                <td>{index + 1}</td>{" "}
                                {/* Index + 1 will ensure it starts from 1 */}
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      onClick={() =>
                                        navigate("/update-details", {
                                          state: data,
                                        })
                                      }
                                    >
                                      अद्यतन करा
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      onClick={() => handleDelete(data.id)}
                                    >
                                      काढून टाका
                                    </button>
                                    <button
                                      className="btn btn-sm btn-primary view-item-btn"
                                      onClick={() =>
                                        navigate("/view-details", {
                                          state: data,
                                        })
                                      }
                                    >
                                      माहिती पहा
                                    </button>
                                  </div>
                                </td>
                                <td>{data.kamachePratyakshaMojmap}</td>
                                <td>{data.kamkarnayaAgencyAbhikanacheNaaw}</td>
                                <td>{data.kamacheWarnan}</td>
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
                  </div>
                </CardBody>
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
                <strong>कर्मचारी आयडी:</strong> {viewRecord.employeeId}
              </p>
              <p>
                <strong>कामाचे प्रत्यक्ष मोजमाप:</strong>{" "}
                {viewRecord.kamachePratyakshaMojmap}
              </p>
              <p>
                <strong>काम करणाऱ्या अभिकरणाचे नाव:</strong>{" "}
                {viewRecord.kamkarnayaAgencyAbhikanacheNaaw}
              </p>
              <p>
                <strong>कामाचे वर्णन:</strong> {viewRecord.kamacheWarnan}
              </p>
              <p>
                <strong>वर्ष:</strong> {viewRecord.year}
              </p>
              <p>
                <strong>शेरा:</strong> {viewRecord.remark}
              </p>
              <p>
                <strong>मोजमाप:</strong> {viewRecord.mojmap}
              </p>
              <p>
                <strong>
                  कामाचे वर्णन कामाचे उपशीर्ष आणि क्षेत्राचे अधिकारी:
                </strong>{" "}
                {viewRecord.kamacheWarnanKamacheUpashirshVaKshetracheAdhikari}
              </p>
              <p>
                <strong>मोजमापाचा तपशील परिमाण:</strong>{" "}
                {viewRecord.mojmapachaTapshilPariman}
              </p>
              <p>
                <strong>मोजमापाचा तपशील लांबी:</strong>{" "}
                {viewRecord.mojmapachaTapshilLaambi}
              </p>
              <p>
                <strong>मोजमापाचा तपशील रंडी:</strong>{" "}
                {viewRecord.mojmapachaTapshilRundi}
              </p>
              <p>
                <strong>मोजमापाचा तपशील खोली उंची:</strong>{" "}
                {viewRecord.mojmapachaTapshilKholiUnchi}
              </p>
              <p>
                <strong>मोजमापाचा तपशील एकूण:</strong>{" "}
                {viewRecord.mojmapachaTapshilEkun}
              </p>
              <p>
                <strong>
                  एकूण परिमाण माप पूर्वीचे हजरि प्रमाणे वर्णन करावे:
                </strong>{" "}
                {viewRecord.ekunParimanMaapPurvicheHajeriPramaneWarnanKarave}
              </p>
              <p>
                <strong>एकूण मोजमापाचा तपशील एकूण आणि एकूण परिमाण माप:</strong>{" "}
                {viewRecord.ekunMojmapachaTapshilEkunVaEkunParimanMaap}
              </p>
              <p>
                <strong>दर:</strong> {viewRecord.dar}
              </p>
              <p>
                <strong>रक्कम:</strong> {viewRecord.rakkam}
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
    </React.Fragment>
  );
};

export default Report21;
