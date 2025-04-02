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
                        title="मुद्रांक हिशोब नोंदवही"
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
                                                <th>दिनांक </th>
                                                <td>{record.dinank}</td>
                                            </tr>
                                            <tr>
                                                <th>मिळालेले मुद्रांक प्रमाणक  क्रमांक</th>
                                                <td>{record.milaleleMudrankPramanakKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>मिळालेले मुद्रांकची किंमत</th>
                                                <td>{record.milaleleMudrankachiKimmat}</td>
                                            </tr>
                                            <tr>
                                                <th>वापरलेले मुद्रांक पावती क्रमांक दिनांक</th>
                                                <td>{record.waparleleMudrankPavtiKramankDinank }</td>
                                            </tr>
                                            <tr>
                                                <th>वापरलेले चिकटवलेले मुद्रांकची किंमत</th>
                                                <td>{record.waparleleChitkavleleMudrankachiKimmat}</td>
                                            </tr>
                                            <tr>
                                                <th>दैनिक शिल्लक</th>
                                                <td>{record.dainikShillak}</td>
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