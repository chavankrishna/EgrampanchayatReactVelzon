import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const View21 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state; // Access the passed data

  if (!record) {
    return <p>No data available</p>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="नमुना २१ - मोजमाप वही" pageTitle="डेटा पहा" className="custom-breadcrumb" />
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
                        <th>कर्मचारी आयडी</th>
                        <td>{record.employeeId}</td>
                      </tr>
                      <tr>
                        <th>कामाचे प्रत्यक्ष मोजमाप</th>
                        <td>{record.kamachePratyakshaMojmap}</td>
                      </tr>
                      <tr>
                        <th>काम करणाऱ्या अभिकरणाचे नाव</th>
                        <td>{record.kamkarnayaAgencyAbhikanacheNaaw}</td>
                      </tr>
                      <tr>
                        <th>कामाचे वर्णन</th>
                        <td>{record.kamacheWarnan}</td>
                      </tr>
                      <tr>
                        <th>वर्ष</th>
                        <td>{record.year}</td>
                      </tr>
                      <tr>
                        <th>शेरा</th>
                        <td>{record.remark}</td>
                      </tr>
                      <tr>
                        <th>मोजमाप</th>
                        <td>{record.mojmap}</td>
                      </tr>
                      <tr>
                        <th>कामाचे वर्णन कामाचे उपशीर्ष आणि क्षेत्राचे अधिकारी</th>
                        <td>{record.kamacheWarnanKamacheUpashirshVaKshetracheAdhikari}</td>
                      </tr>
                      <tr>
                        <th>मोजमापाचा तपशील परिमाण</th>
                        <td>{record.mojmapachaTapshilPariman}</td>
                      </tr>
                      <tr>
                        <th>मोजमापाचा तपशील लांबी</th>
                        <td>{record.mojmapachaTapshilLaambi}</td>
                      </tr>
                      <tr>
                        <th>मोजमापाचा तपशील रुंदी</th>
                        <td>{record.mojmapachaTapshilRundi}</td>
                      </tr>
                      <tr>
                        <th>मोजमापाचा तपशील खोली/उंची</th>
                        <td>{record.mojmapachaTapshilKholiUnchi}</td>
                      </tr>
                      <tr>
                        <th>मोजमापाचा तपशील (एकूण)</th>
                        <td>{record.mojmapachaTapshilEkun}</td>
                      </tr>
                      <tr>
                        <th>एकूण मोजमापाचा तपशील</th>
                        <td>{record.ekunMojmapachaTapshilEkunVaEkunParimanMaap}</td>
                      </tr>
                      <tr>
                        <th>दर</th>
                        <td>{record.dar}</td>
                      </tr>
                      <tr>
                        <th>रक्कम</th>
                        <td>{record.rakkam}</td>
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

export default View21;
