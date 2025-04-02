import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const ViewDetails18 = () => {
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
                        title="किरकोळ रोकड वही"
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
                                                <th>जमा तारीख</th>
                                                <td>{record.jamaTarikh}</td>
                                            </tr>
                                            <tr>
                                                <th>धनादेश क्रमांक</th>
                                                <td>{record.dhanadeshKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>कोणाकडून प्राप्त झाला</th>
                                                <td>{record.konakadunPraptZala}</td>
                                            </tr>
                                            <tr>
                                                <th>जमा तपशील </th>
                                                <td>{record.jamaTapshil}</td>
                                            </tr>
                                            <tr>
                                                <th>जमा रक्कम </th>
                                                <td>{record.jamaRakkam}</td>
                                            </tr>
                                            <tr>
                                                <th>अग्रिम</th>
                                                <td>{record.agrim}</td>
                                            </tr>
                                            <tr>
                                                <th>शेरा</th>
                                                <td>{record.jamaEkun}</td>
                                            </tr>
                                           
                                            <tr>
                                                <th>जमा एकूण </th>
                                                <td>{record.year}</td>
                                            </tr>
                                            <tr>
                                                <th>शेरा </th>
                                                <td>{record.remark}</td>
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

export default ViewDetails18;