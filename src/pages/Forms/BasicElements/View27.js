import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View27 = () => {
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
            `http://localhost:8080/api/LekhaparikshanAaksheepanNamuna27/getById/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२७ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२७-अहवाल",
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
                        <th>लेखापरीक्षण अहवालाचे वर्ष</th>
                        <td>{record.lekhaparikshanaAhvalcheVrsh}</td>
                      </tr>
                      <tr>
                        <th>लेखापरीक्षण अहवालातील परिच्छेद संख्या</th>
                        <td>{record.lekhaparikshanaAhvalatilaParicchhedaSamkhaya}</td>
                      </tr>
                      <tr>
                        <th>ग्रामपंचायतीने या महिन्यात पूर्तता केलेल्या परिच्छेदांची संख्या</th>
                        <td>{record.grampanchayattineeYaMahinyataPootartaKelelyaPariccchhedanchiSaikhaya}</td>
                      </tr>
                      <tr>
                        <th>पंचायत समितीने आक्षेपाद्वारे मान्य केलेल्या पूर्ततांची संख्या</th>
                        <td>{record.panchayatSamittineAakshepaadaraMaanyaKeleylyaaPootartachiSaikhaya}</td>
                      </tr>
                      <tr>
                        <th>लेखापरीक्षकाने ज्या बाबतीत पूर्तता मान्य केली आहे त्या आक्षेपांची संख्या</th>
                        <td>{record.lekhaparikshkaneChyaBabatitPootartaMaanyaKeliAaheTyaAaksheepaanchyaaSakhaya}</td>
                      </tr>
                      <tr>
                        <th>प्रलंबित असलेल्या आक्षेपांची संख्या (३-६)</th>
                        <td>{record.prlabitAsalellyaAakshepachiSakhaya}</td>
                      </tr>
                      <tr>
                        <th>पूर्तता न केल्याबद्दलची कारणे</th>
                        <td>{record.pootartaNaKelelayabghlachiKaarana}</td>
                      </tr>
                      <tr>
                        <th>शेरा</th>
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

export default View27;
