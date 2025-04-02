import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const View24 = () => {
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
                    <BreadCrumb
                        title="नमुना २४ - जमिनीची नोंद वही"
                        pageTitle="डेटा पहा"
                        className="custom-breadcrumb"
                    />
                    <Row className="gy-4">
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col className="d-flex justify-content-between align-items-center">
                                            <h5>डेटा पहा</h5>
                                            <Button color="primary" onClick={() => navigate(-1)}>मागे जा</Button>
                                        </Col>
                                    </Row>
                                    <Table bordered responsive className="table-custom">
                                    <tbody>
  <tr>
    <th>हस्तांतरित खरेदी किंवा संपादित केलेली तारीख</th>
    <td>{record.hastantaritKharidiKinwaSampaditKelyachiTarikh}</td>
  </tr>
  <tr>
    <th>कोणत्या कारणासाठी</th>
    <td>{record.konatyaKarnasaathi}</td>
  </tr>
  <tr>
    <th>कोणाकडून</th>
    <td>{record.konakadun}</td>
  </tr>
  <tr>
    <th>करारनामा / निविदा / निर्देशांक</th>
    <td>{record.kararnamaNiwadaNirdeshank}</td>
  </tr>
  <tr>
    <th>जमिनीचे क्षेत्रफळ</th>
    <td>{record.jaminicheKshetraphal}</td>
  </tr>
  <tr>
    <th>भूमापन क्रमांक इत्यादी</th>
    <td>{record.bhumapanKramankEtyadi}</td>
  </tr>
  <tr>
    <th>आकारणी</th>
    <td>{record.aakarni}</td>
  </tr>
  <tr>
    <th>जमिनीच्या सीमा</th>
    <td>{record.jaminichyaSeema}</td>
  </tr>
  <tr>
    <th>जमिनी सह खरेदी / संपादन / इमारती</th>
    <td>{record.jaminisahKharediSampadanEmarati}</td>
  </tr>
  <tr>
    <th>जमिनीची व इमारतीची विल्हेवाट</th>
    <td>{record.jaminichiWaEmartichiWilhewat}</td>
  </tr>
  <tr>
    <th>विक्रीपासून मिळालेली रक्कम</th>
    <td>{record.vikriPaasunMilaleliRakkam}</td>
  </tr>
  <tr>
    <th>प्रमाणकाचा क्रमांक व दिनांक</th>
    <td>{record.pramanakachaKramankWaDinank}</td>
  </tr>
  <tr>
    <th>मालमत्तेची विल्हेवाट पंचायत ठराव</th>
    <td>{record.malmattechiWilhewatPanchayatichaTharav}</td>
  </tr>
  <tr>
    <th>मालमत्तेची विल्हेवाट कलम ५५</th>
    <td>{record.malmattechiWilhewatKalam55}</td>
  </tr>
  <tr>
    <th>वर्ष</th>
    <td>{record.year}</td>
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

export default View24;
