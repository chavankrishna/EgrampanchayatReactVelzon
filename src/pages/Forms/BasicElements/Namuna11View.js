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
                        title="किरकोळ मागणी नोंदवही"
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
                                                <td>{record.id}</td>
                                            </tr>
                                            <tr>
                                                <th>ज्याने मागणीची रकम घ्यावयाची त्या इसमाचे नाव व पत्ता </th>
                                                <td>{record.propertyOwnerName}</td>
                                            </tr>
                                            <tr>
                                                <th>मागणीचे स्वरूप</th>
                                                <td>{record.magniche_Swarup}</td>
                                            </tr>
                                            <tr>
                                                <th>मागणीसाठी प्राधिकार</th>
                                                <td>{record.magnisathi_Pradhikar}</td>
                                            </tr>
                                            <tr>
                                                <th>मागणी हप्ता </th>
                                                <td>{record.magni_Happta}</td>
                                            </tr>
                                            <tr>
                                                <th>मागणी रकम</th>
                                                <td>{record.magni_Rakam}</td>
                                            </tr>
                                            <tr>
                                                <th>मागणी एकूण रकम</th>
                                                <td>{record.magni_Total}</td>
                                            </tr>
                                           
                                            <tr>
                                                <th>देयक क्रमांक / तारीख</th>
                                                <td>{record.deyakramankOR_Date}</td>
                                            </tr>
                                            <tr>
                                                <th>वसूली झालेल्या रकम पावतीचा क्रमांक / तारीख </th>
                                                <td>{record.vasuli_PavtiKramankOR_Date}</td>
                                            </tr>
                                            <tr>
                                                <th>वसूली झालेल्या रकम रुपये</th>
                                                <td>{record.vasuli_Rakam}</td>
                                            </tr>
                                            <tr>
                                                <th>सूट आदेश  क्रमांक / तारीख </th> 
                                                <td>{record.sut_AadheshachaKramankOR_Date}</td> 
                                            </tr>
                                            <tr>
                                                <th>सूट रकम रुपये </th>
                                                <td>{record.sut_Rakam}</td>
                                            </tr>
                                            <tr>
                                                <th>शिलक</th>
                                                <td>{record.shillak}</td>
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

export default ViewDetails;