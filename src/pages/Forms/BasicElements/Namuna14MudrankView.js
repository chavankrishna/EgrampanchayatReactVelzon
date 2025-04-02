import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const Namuna14MudrankView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const record = location.state; // Access the passed data

    if (!record) {
        return <p>No data available</p>;
    }

    const breadcrumbTitle = "डेटा पहा"; // This could be dynamic
    const breadcrumbPageTitle = "डॅशबोर्ड / मुद्रांक हिशोब नोंदवही"; // Dynamic page title
    const breadcrumbPaths = [
    "/dashboard", // Path for "डॅशबोर्ड"
    "/namuna14mudrank", // Path    
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
                    <BreadCrumb className="ps-4" title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />  
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
                                                <th>मिळालेले मुद्रांक प्रमाणक  क्रमांक</th>
                                                <td>{record.mMPramanakKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>मिळालेले मुद्रांकची किंमत</th>
                                                <td>{record.mMKimmat}</td>
                                            </tr>
                                            <tr>
                                                <th>वापरलेले मुद्रांक पावती क्रमांक</th>
                                                <td>{record.vMPavatiKramank}</td>
                                            </tr>
                                            <tr>
                                                <th>वापरलेले मुद्रांक पावती दिनांक </th>
                                                <td>{record.vMPavatiDinank} </td>  
                                            </tr>
                                            <tr>
                                                <th>वापरलेले चिकटवलेले मुद्रांकची किंमत</th>
                                                <td>{record.vMChitkavalyachiKimmat}</td>
                                            </tr>
                                            <tr>
                                                <th>दैनिक शिल्लक</th>
                                                <td>{record.dainikShillak}</td>
                                            </tr>
                                            <tr>
                                                <th> शेरा  </th>
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

export default Namuna14MudrankView;
