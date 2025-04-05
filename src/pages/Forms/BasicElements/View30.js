import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View30 = () => {
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
            `http://localhost:8080/lekhaparikshan/getById/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३० "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३०-अहवाल",
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
                        <th>लेखापरिक्षण अहवाल वर्ष</th>
                        <td>{record.lekhParikshanAhwalVarsh}</td>
                      </tr>
                      <tr>
                        <th>लेखापरिक्षण अहवाल प्राप्त झाल्याचा दिनांक</th>
                        <td>{record.lPAhwalPraptaJhalyachiDinank}</td>
                      </tr>
                      <tr>
                        <th>अहवालांतील आक्षेपांची संख्या</th>
                        <td>{record.ahwalatilAkshepanchiSankhya}</td>
                      </tr>
                      <tr>
                        <th>अहवालांतील आक्षेपांची अनुक्रमांक</th>
                        <td>{record.ahwalatilAkshepanchiAnuKramank}</td>
                      </tr>
                      <tr>
                        <th>केवळ माहितीसाठी असणारा आक्षेप क्रमांक</th>
                        <td>{record.kMAsanaraAkshepKramank}</td>
                      </tr>
                      <tr>
                        <th>केवळ माहितीसाठी असणारा आक्षेप संख्या</th>
                        <td>{record.kMAsanaraAkshepSankhya}</td>
                      </tr>
                      <tr>
                        <th>पुर्तता करावयाच्या आक्षेपांचे क्रमांक</th>
                        <td>{record.purtataKarvyachyaAkshepancheKramank}</td>
                      </tr>

                      <tr>
                        <th>पुर्तता करावयाच्या आक्षेपांचे संख्या</th>
                        <td>{record.purtataKarvyachyaAkshepancheSankhya}</td>
                      </tr>
                      <tr>
                        <th>ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे क्रमांक</th>
                        <td>{record.gpPAkshepancheKramank}</td>
                      </tr>
                      <tr>
                        <th>ग्रामपंचायतीने पुर्तता केलेले आक्षेपांचे संख्या</th>
                        <td>{record.gpPKeleleAkshepancheSankhya}</td>
                      </tr>
                      <tr>
                        <th>पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा जावक दिनांक</th>
                        <td>{record.pKAPSamitiKadePathvilaJavakDinank}</td>
                      </tr>
                      <tr>
                        <th>पुर्तता केलेले आक्षेप पंचायत समितीकडे पाठविल्याचा क्रमांक</th>
                        <td>{record.pKAPtSamitiKadePathvilakramank}</td>
                      </tr>
                      <tr>
                        <th> पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा ठराव क्रमांक</th>
                        <td>{record.pKAPSamitineJPKadePathvalaThravKrmank}</td>
                      </tr>
                      <tr>
                        <th>पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा जावक क्रमांक</th>
                        <td>{record.pKAPSamitineJPKadePathvalychaJavakKrmank}</td>
                      </tr>

                      <tr>
                        <th>पुर्तता केलेले आक्षेपपंचायत समितीने जि.प.कडे/लेखा परिक्षकाकडे पाठविल्याचा दिनांक</th>
                        <td>{record.pKAPSamitineJPKadePathvalychaDinank}</td>
                      </tr>
                      <tr>
                        <th> जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप क्रमांक</th>
                        <td>{record.jPYaniManjurKeleleAkshepKramank}</td>
                      </tr>
                      <tr>
                        <th> जि.प. लेखा परिक्षक यांनी मंजूर केलेले आक्षेप संख्या</th>
                        <td>{record.jPYaniManjurKeleleAkshepSankya}</td>
                      </tr>
                      <tr>
                        <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक पुस्तकी समायोजन</th>
                        <td>{record.sAVVKramankPustakiSamayojan}</td>
                      </tr>
                      <tr>
                        <th> शिल्लक आक्षेपांची वर्गवारी व क्रमांक वसुली</th>
                        <td>{record.sAVVKramankVasuli}</td>
                      </tr>
                      <tr>
                        <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक मूल्यांकन</th>
                        <td>{record.sAVVKramankMulyankan}</td>
                      </tr>
                      <tr>
                        <th> शिल्लक आक्षेपांची वर्गवारी व क्रमांक नियमबाह्य</th>
                        <td>{record.sAVVKramankNiyambahya}</td>
                      </tr>
                      <tr>
                        <th>शिल्लक आक्षेपांची वर्गवारी व क्रमांक एकूण</th>
                        <td>{record.sAVVKramankEkun}</td>
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

export default View30;
