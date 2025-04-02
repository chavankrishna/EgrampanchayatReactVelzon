import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View32 = () => {
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
            `http://localhost:8080/rakkampartavya/getById/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-३२ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-३२-अहवाल",
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
                        <th>पावती क्रमांक</th>
                        <td>{record.pavtiNumber}</td>
                      </tr>
                      <tr>
                        <th>दिलेली मूळ रक्कम दिनांक</th>
                        <td>{record.dileliMulRakkamDate}</td>
                      </tr>
                      <tr>
                        <th>रक्कम</th>
                        <td>{record.rakkam}</td>
                      </tr>
                      <tr>
                        <th>परत करावयाची रकम</th>
                        <td>{record.paratKaryachiRakkam}</td>
                      </tr>
                      <tr>
                        <th>ठेवीदाराचे नाव</th>
                        <td>{record.thevidaracheNav}</td>
                      </tr>
                      <tr>
                        <th>परतावा करणाऱ्या प्राधिकाऱ्याचे नाव</th>
                        <td>{record.partavaKarnaryaPradhikaryacheNav}</td>
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

export default View32;
