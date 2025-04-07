import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const View28 = () => {
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
            `http://localhost:8080/masikvivaran/getById/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-२८ "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२८-अहवाल",
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
                        <th>सन मध्ये मागासवर्गीयांसाठी केलेली तरतूद</th>
                        <td>{record.sanMadhemagasvargiyansathiKeleliTartud}</td>
                      </tr>
                      <tr>
                        <th>सन</th>
                        <td>{record.san}</td>
                      </tr>
                      <tr>
                        <th>चालू महिन्यात प्राप्त झालेले उत्पन्न</th>
                        <td>{record.chaluMahinyatPraptaJhaleleUtpanna}</td>
                      </tr>
                      <tr>
                        <th>१५ टक्के खर्च करावयाची रक्कम</th>
                        <td>{record.fiftyTakkeKharchaKarychiRakkam}</td>
                      </tr>
                      <tr>
                        <th>खर्चाच्या बाबी बाबवार / योजनावार</th>
                        <td>{record.kharchachyaBabiYojanavar}</td>
                      </tr>
                      <tr>
                        <th>मागील महिन्यात झालेला खर्च</th>
                        <td>{record.magilMahinayatJhalelaKharcha}</td>
                      </tr>
                      <tr>
                        <th>चालू महिन्यात झालेला खर्च</th>
                        <td>{record.chaluMahinyatJhalelaKharcha}</td>
                      </tr>
                      <tr>
                        <th>एकूण खर्च</th>
                        <td>{record.ekunKharch}</td>
                      </tr>
                      <tr>
                        <th>खर्चाची टक्केवारी</th>
                        <td>{record.kharchachiTakkevari}</td>
                      </tr>
                      <tr>
                        <th>शेरा</th>
                        <td>{record.shera}</td>
                      </tr>
                      <tr>
                        <th>महिना</th>
                        <td>{record.month}</td>
                      </tr>
                      <tr>
                        <th>वर्ष</th>
                        <td>{record.year}</td>
                      </tr>{" "}
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

export default View28;
