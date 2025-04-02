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
                        title="कामाच्या अंदाजाची नोंदवही"
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
                                                <th>क्रमांक</th>
                                                <td>{record.kramank}</td>
                                            </tr>
                                            <tr>
                                                <th>निधिचे शीर्ष</th>
                                                <td>{record.nidhicheShirsh}</td>
                                            </tr>
                                            <tr>
                                                <th>उपशीर्ष</th>
                                                <td>{record.upaShirsh}</td>
                                            </tr>
                                            <tr>
                                                <th>मध्ये होण्याचा संभाव्य खर्च</th>
                                                <td>{record.madheHonyachyaSambhavKharchach}</td>
                                            </tr>
                                            <tr>
                                                <th>यांनी केलेला अंदाज </th>
                                                <td>{record.yanniKelelaAndaj}</td>
                                            </tr>
                                            <tr>
                                                <th>सर्व साधारण गोषवर परिणाम </th>
                                                <td>{record.sarvasadharanGoshwaraParinam}</td>
                                            </tr>
                                           
                                            <tr>
                                                <th>देयक क्रमांक</th>
                                                <td>{record.deyaKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>सर्व साधारण गोषवर दर रुपये </th>
                                                <td>{record.sarvasadharanGoshwaraDarRupaye}</td>
                                            </tr>
                                            <tr>
                                                <th>सर्व साधारण गोषवर प्रत्येकी</th>
                                                <td>{record.sarvasadharanGoshwaraPratteki}</td>
                                            </tr>
                                            <tr>
                                                <th>सर्व साधारण गोषवर रक्कम दंशशा </th>
                                                <td>{record.sarvasadharanGoshwaraRakkamDashanshat}</td>
                                            </tr>
                                            <tr>
                                                <th>मोजमाप अंदाजपत्र क्रमांक </th>
                                                <td>{record.mmojmapAndajpatraKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>मोजमाप अंदाजपत्र लांबी </th>
                                                <td>{record.mojmapAndajpatraLaambi}</td>
                                            </tr>
                                            <tr>
                                                <th>मोजमाप अंदाजपत्र रुंदी</th>
                                                <td>{record.mojmapAndajpatraRundi}</td>
                                            </tr>
                                            <tr>
                                                <th>मोजमाप अंदाजपत्र खोली </th>
                                                <td>{record.mojmapAndajpatraKholi}</td>
                                            </tr>
                                            <tr>
                                                <th>मोजमाप अंदाजपत्र परिणाम दंशशा </th>
                                                <td>{record.mojmapAndajpatraParimanDashanshat}</td>
                                            </tr>
                                            <tr>
                                                <th>एकूण</th>
                                                <td>{record.ekun}</td>
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

export default ViewDetails;