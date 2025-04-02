import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View22 = () => {
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
            `http://localhost:8080/sthavarMalmatta/getById2/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२२ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२२-अहवाल",
  ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 82%;
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
                        <th>संपादनाची खरेदीची किंवा उभारणीचा दिनांक</th>
                        <td>{record.sanpadanchiKharediKinwaUbharnichaDinank}</td>
                      </tr>
                      <tr>
                        <th>ज्या अन्वये मालमत्ता संपादित केली त्या आदेशाचे व पंचायत ठरावाचे क्रमांक</th>
                        <td>{record.jAMSamKTyaadeshacheVPanchTharKramank}</td>
                      </tr>
                      <tr>
                        <th>ज्या अन्वये मालमत्ता संपादित केली त्या आदेशाचे व पंचायत ठरावाचे दिनांक</th>
                        <td>{record.jAMSamKTyaadeshacheVPanchTharDinak}</td>
                      </tr>
                      <tr>
                        <th>मालमतेचा भूमापन क्रमांक</th>
                        <td>{record.malmattechaBhumapanKramank}</td>
                      </tr>

                      <tr>
                        <th>मालमत्तेचे वर्णन</th>
                        <td>{record.malmattechaBhumapanMalmattecheVarnan}</td>
                      </tr>
                      <tr>
                        <th>कोणत्या कारणासाठी वापर केला</th>
                        <td>{record.konatyaKarnaSaathiWaparKela}</td>
                      </tr>
                      <tr>
                        <th>उभारणीचा किंवा संपादनाचा खर्च</th>
                        <td>{record.ubharniKinwaSampadanachaKharch}</td>
                      </tr>

                      <tr>
                        <th>वर्ष अखेरीस घटलेली किंमत</th>
                        <td>{record.warshaAkherisGhatleliKinmat}</td>
                      </tr>
                      <tr>
                        <th>मालमत्तेची विल्हेवाट लावण्यासाठी पंचायतीच्या ठरावाचा क्रमांक</th>
                        <td>{record.malmattechiVilhewatKramank}</td>
                      </tr>
                      <tr>
                        <th>मालमत्तेची विल्हेवाट लावण्यासाठी पंचायतीच्या ठरावाचा दिनांक</th>
                        <td>{record.malmattechiVilhewatDinank}</td>
                      </tr>
                      <tr>
                        <th>मालमत्तेची विल्हेवाट लावण्यासाठी कलम ५५ प्राधिकाऱ्याच्या आदेशाचा क्रमांक</th>
                        <td>{record.malmattechiVilhewatKalam55Kramank}</td>
                      </tr>
                      <tr>
                        <th>मालमत्तेची विल्हेवाट लावण्यासाठी कलम ५५ प्राधिकाऱ्याच्या आदेशाचा दिनांक</th>
                        <td>{record.malmattechiVilhewatKalam55Dinank}</td>
                      </tr>

                      <tr>
                        <th>दिनांक</th>
                        <td>{record.durustyawarKinwaFerfaravarDinank}</td>
                      </tr>
                      <tr>
                        <th>चालू दुरुस्तया रुपये</th>
                        <td>{record.durustyawarKinwaFerfaravarChaluDurustyaRupaye}</td>
                      </tr>

                      <tr>
                        <th>विशेष दुरुस्त्या रुपये</th>
                        <td>{record.durustyawarKinwaFerfaravarWisheshDurustyaRupaye}</td>
                      </tr>
                      <tr>
                        <th>मुळ बांधकाम रुपये</th>
                        <td>{record.durustyawarKinwaFerfaravarMulBandhKaamRupaye}</td>
                      </tr>
                      <tr>
                        <th>मुळ बाधकामाचे कामाचे स्वरुप</th>
                        <td>{record.durustyawarKinwaFerfaravarMulBandhkaamcheSwarup}</td>
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

export default View22;
