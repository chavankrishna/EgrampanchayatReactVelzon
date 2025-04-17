import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Namuna2View = () => { 
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
            `localhost:8080/Namuna02PunarniyojanVaNiyatVatap/get_by_id/${record.id}`,
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
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना २ - अहवाल "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-२-अहवाल",
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
                        <th>जमा रकमेचे मुख्य शिर्षक</th>
                        <td>{record.jamaRakmecheMukhyaShirshak}</td>
                    </tr>
                    <tr>
                        <th>मंजूर अर्थसंकल्प</th>
                        <td>{record.manjurArthsankalp}</td>
                    </tr>
                    <tr>
                        <th>सुधारित अंदाज</th>
                        <td>{record.sudharitAndaz}</td>
                    </tr>
                    <tr>
                        <th>सुधारित अधिक(+) किंवा वजा(-)</th>
                        <td>{record.sudharitAdhikVaja}</td> 
                    </tr>
                    <tr>
                        <th>खर्चाचे प्रमुख शिर्षक</th>
                        <td>{record.kharchachePramukhShirsh}</td> 
                    </tr>
                        <tr>
                        <th>मंजूर रक्कम</th>
                        <td>{record.manjurRakkam}</td>
                        </tr>
                        <tr>
                        <th>खर्चाचा सुधारित अंदाज</th>
                        <td>{record.kharchachaSudharitAndaz}</td>
                        </tr>
                        <tr>
                        <th>खर्चाचा अधिक(+) किंवा वजा(-)</th>
                        <td>{record.kharchachaAdhikVaja}</td>
                        </tr>
                        <tr>
                        <th>शेरा</th>
                        <td>{record.shera}</td>
                        </tr>
                        <tr>
                        <th>ज्ञापन रुपये</th>
                        <td>{record.dnyapanRupees}</td>
                        </tr>
                        <tr>
                        <th>महिना</th>
                        <td>{record.month}</td>
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

export default Namuna2View;
