import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const ViewDetails = () => {
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
                        title="कर आकारणी नोंदवही"
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
                                                <th>कर्मचारी आयडी</th>
                                                <td>{record.employeeId}</td>
                                            </tr>
                                            <tr>
                                                <th>रस्त्यांचे नाव</th>
                                                <td>{record.rastyacheNaav}</td>
                                            </tr>
                                            <tr>
                                                <th>मालमत्ता क्रमांक</th>
                                                <td>{record.malmattaKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>मालमत्तेचे वर्णन</th>
                                                <td>{record.malmattecheWarnan}</td>
                                            </tr>
                                            <tr>
                                                <th>मालकाचे नाव</th>
                                                <td>{record.malkacheNaav}</td>
                                            </tr>
                                            <tr>
                                                <th>भोगवटा करणारचे नाव</th>
                                                <td>{record.bhogvataKarnaracheNaav}</td>
                                            </tr>
                                            <tr>
                                                <th>क्षेत्रफळ</th>
                                                <td>{record.kshetraphal}</td>
                                            </tr>
                                           
                                            <tr>
                                                <th>वार्षिक भाडे किवा किंमतदार</th>
                                                <td>{record.warshikBhadeKinvaKimmatdar}</td>
                                            </tr>
                                            <tr>
                                                <th>घरपट्टी कर</th>
                                                <td>{record.karYadiGharpattiKar}</td>
                                            </tr>
                                            <tr>
                                                <th> वीज कर </th>
                                                <td>{record.karYadiWeejKar}</td>
                                            </tr>
                                            <tr>
                                                <th>आरोग्य कर</th>
                                                <td>{record.karYadiArogyaKar}</td>
                                            </tr>
                                            <tr>
                                                <th>पाणीपट्टी कर</th>
                                                <td>{record.karYadiPanipattiKa}</td>
                                            </tr>
                                            <tr>
                                                <th>एकूण</th>
                                                <td>{record.karYadiEkun}</td>
                                            </tr>
                                            <tr>
                                                <th>नक्कलफी</th>
                                                <td>{record.nakkalFee}</td>
                                            </tr>
                                            <tr>
                                                <th>रुजवातफी</th>
                                                <td>{record.rujuwatFee}</td>
                                            </tr>
                                            <tr>
                                                <th>कागदफी</th>
                                                <td>{record.kagadFee}</td>
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

export default ViewDetails;