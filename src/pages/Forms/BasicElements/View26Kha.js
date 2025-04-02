import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View26Kha = () => {
  const { state } = useLocation(); // Access the passed record data from the previous page
  const navigate = useNavigate();
  const [record, setRecord] = useState(state || {});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(state, record.id);
    const data = { state, id: record.id };
    console.log(data);

    // If record ID exists, fetch the record by ID
    if (record.id) {
      const fetchRecord = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("Token", token);

          if (!token) {
            console.error("No token found");
            return;
          }
          const response = await axios.post(
            `http://localhost:8080/api/grampanchayatKhaa26/getById/${record.id}`,
            {}, // Request body (empty in this case)
            {
              headers: {
                Authorization: ` Bearer ${token}`, // Pass the token in the headers
              },
            }
          ); // Use backticks for template literal
          setRecord(response.data);
          console.log(response.data); // Corrected typo from console(response.data)
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, record.id]); // Dependency array
  const breadcrumbTitle = "डेटा पहा"; // This could be dynamic
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२६ख "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२६-ख-अहवाल",
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 81%;
                    }
                `}
                
      </style>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row className="gy-4">
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="mb-4">
                    <Col className="d-flex justify-content-between align-items-center">
                      <h5>डेटा पहा</h5>
                      <Button color="primary" onClick={() => navigate(-1)}>
                        मागे जा
                      </Button>
                    </Col>
                  </Row>
                  <Table bordered responsive className="table-custom">
                    <tbody>
                      <tr>
                        <th>महिना</th>
                        <td>{record.mahina}</td>
                      </tr>
                      <tr>
                        <th>प्रारंभिक शिल्लक</th>
                        <td>{record.praarabhitShillak}</td>
                      </tr>
                      <tr>
                        <th>रक्कम जमा केल्याचा महिना</th>
                        <td>{record.rakamJamaKileyachaMahina}</td>
                      </tr>
                      <tr>
                        <th>महिना अखेरीची शिल्लक सचिवाकडील हातची शिल्लक</th>
                        <td>{record.mahinaAakhrichiShillakSachivakdila}</td>
                      </tr>
                      <tr>
                        <th>महिना अखेरीची शिल्लक बँकेतील शिल्लक</th>
                        <td>{record.mahinaAakhrichiShillakBanketila}</td>
                      </tr>
                      <tr>
                        <th>महिना अखेरीची शिल्लक पोस्टातील शिल्लक</th>
                        <td>{record.mahinaAakhrichiShillakPostateil}</td>
                      </tr>
                      <tr>
                        <th>अल्पबचत प्रमाणपत्रात गुंतविलेली रक्कम</th>
                        <td>{record.alpabachatPramanapatrataGuntviloliRakam}</td>
                      </tr>
                      <tr>
                        <th>बँकेत मुदत ठेवीत गुंतविलेली रक्कम</th>
                        <td>{record.banketaMudataThevitaGuntavililiRakam}</td>
                      </tr>
                      <tr>
                        <th>एकूण (५ ते ९)</th>
                        <td>{record.ekun}</td>
                      </tr>
                      <tr>
                        <th>शेरा (नियमापेक्षा जास्त रक्कम अधिक कालावधीसाठी हाती शिल्लक ठेवली असेल तर त्याबाबतची कारणे)</th>
                        <td>{record.shera}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default View26Kha;
