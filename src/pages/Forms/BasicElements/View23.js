import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View23 = () => {
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
            `http://localhost:8080/tabyatilRastyanchiNondWahi/getById/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२३ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२३-अहवाल",
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
                        <th>रस्त्यांचे नाव</th>
                        <td>{record.rastyacheNaaw}</td>
                      </tr>
                      <tr>
                        <th>गाव पासून</th>
                        <td>{record.gaawPaasun}</td>
                      </tr>
                      <tr>
                        <th>गाव पर्यंत</th>
                        <td>{record.gaawParyant}</td>
                      </tr>
                      <tr>
                        <th>लांबी (किलो मीटर)</th>
                        <td>{record.laambiKm}</td>
                      </tr>
                      <tr>
                        <th>रुंदी (किलो मीटर)</th>
                        <td>{record.rundiKm}</td>
                      </tr>
                      <tr>
                        <th>रस्त्याचा प्रकार खडीचा, बिन खडीचा, डांबरी किंवा सिमेंटचा</th>
                        <td>{record.rastyachaPrakar}</td>
                      </tr>
                      <tr>
                        <th>पूर्ण केल्याची तारीख</th>
                        <td>{record.purnKelyachiTarikh}</td>
                      </tr>
                      <tr>
                        <th>प्रति किलोमीटर रस्ता तयार करण्यास आलेला खर्च</th>
                        <td>{record.pratiKmRastaTayarKarnyasAalelaKharch}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या चालू खर्च रुपये</th>
                        <td>{record.durustyaChaluKharchRupaye}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या चालू स्वरुप</th>
                        <td>{record.durustyaChaluSwarup}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या विशेष खर्च रुपये</th>
                        <td>{record.durustyaWisheshKharchRupaye}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या विशेष स्वरुप</th>
                        <td>{record.durustyaWisheshSwarup}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या मूळ बंधकाम खर्च रुपये</th>
                        <td>{record.durustyaMulBandhkamKharchRupaye}</td>
                      </tr>
                      <tr>
                        <th>दुरुस्त्या मूळ बंधकाम स्वरुप</th>
                        <td>{record.durustyaMulBandhkamSwarup}</td>
                      </tr>
                      <tr>
                        <th>शेरा</th>
                        <td>{record.shera}</td>
                      </tr>
                      <tr>
                        <th>वर्ष</th>
                        <td>{record.year}</td>
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

export default View23;
