import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const Namuna06View = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const record = location.state; // Access the passed data 

    if (!record) {
        return <p>No data available</p>;  
    }

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
                    <BreadCrumb
                        title="नमुना ६ - जमा व दिलेल्या रकमांची नोंदणी"
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
                                                <th>आयडी</th>
                                                <td>{record.id}</td>
                                            </tr>
                                            <tr>
                                                <th>लेखाशीर्ष</th>
                                                <td>{record.lekhaShirsh}</td>
                                            </tr>
                                            <tr>
                                                <th>अर्थसंकल्पीय अनुदान</th>
                                                <td>{record.arthsankalpiyaAnudan}</td>
                                            </tr>
                                            <tr>
                                                <th>दिवस</th>
                                                <td>{record.day}</td>
                                            </tr>
                                            <tr>
                                                <th>मूल्य</th>
                                                <td>{record.value}</td>
                                            </tr>
                                            <tr>
                                                <th>वर्ष</th>
                                                <td>{record.year}</td>
                                            </tr>
                                            <tr>
                                                <th>शेरा</th>
                                                <td>{record.shera}</td>
                                            </tr>
                                           
                                            <tr>
                                                <th>महिन्याबद्दलची एकूण रक्कम</th>
                                                <td>{record.mahinyaBaddalchiEkunRakkam}</td>
                                            </tr>
                                            <tr>
                                                <th>मागील महिन्याचा अखेरपर्यंतची रक्कम </th>
                                                <td>{record.maghilMahinyachaAkherparyantchiRakkam}</td>
                                            </tr>
                                            <tr>
                                                <th>मागे पासून पुढे चालू एकूण रक्कम </th>
                                                <td>{record.maghePasunPudheChaluEkunRakkam}</td>
                                            </tr>
                                            <tr>
                                                <th>महिना</th>
                                                <td>{record.month}</td>
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

export default Namuna06View;