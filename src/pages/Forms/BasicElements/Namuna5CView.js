import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Table, Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Namuna5CView = () => { 
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
            "localhost:8080/Namuna5C_DainikRokadVahi/get_by_id/${record.id}",
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
  const breadcrumbPageTitle = "डॅशबोर्ड / नमुना ५- अहवाल "; // Dynamic page title

  const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/नमुना-५-अहवाल",
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
                        <th> पावती क्रमांक</th>
                        <td>{record.pavtiKramank}</td>
                    </tr>
                    <tr>
                        <th> कोणाकडून मिळाली ते</th>
                        <td>{record.konakdunMilali}</td>
                    </tr>
                    <tr>
                        <th>जमा रकमे संबंधी तपशील</th>
                        <td>{record.jamaRakkamTapshil}</td>
                    </tr>
                    <tr>
                        <th> रोख रक्कम रुपये</th>
                        <td>{record.rokhRakkam}</td>  {/* record.rokhRakkama */}
                    </tr>
                    <tr>
                        <th>  धनादेश चेक रुपये</th>
                        <td>{record.dhanadeshRakkam}</td> 
                    </tr>
                        <tr>
                        <th> धनादेश बँकेत जमा केल्याचा दिनांक</th>
                        <td>{record.dhanadeshKinvaRakkamJamaDinank}</td>
                        </tr>
                        <tr>
                        <th> रोख रक्कम जमा केल्याचा दिनांक</th>
                        <td>{record.dhanadeshVatvilyachaDinank}</td>
                        </tr>
                        
                        <tr>
                        <th>शेरा</th>
                        <td>{record.shera}</td>
                        </tr>
                        <tr>
                        <th> वर्ष</th>
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

export default Namuna5CView;