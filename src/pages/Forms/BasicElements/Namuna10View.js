import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from "../../../Components/Common/UiContent";

const Namuna10View = () => {                          
    const { id } = useParams(); // Get ID from URL     
    const location = useLocation();          
    const navigate = useNavigate();                      
    const [record, setRecord] = useState(location.state || null);     
    const [loading, setLoading] = useState(!record);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (id) {
                    const response = await axios.get(`http://localhost:8080/api/namuna/list/${id}`);
                    const apiData = response.data ? response.data : response;
                    setRecord(apiData); 
                    //console.log(apiData)
                } else {
                    const response = await axios.get("http://localhost:8080/api/namuna/list");  
                    const apiData = response.data ? response.data : response;
                    if (apiData.length > 0) {    
                        const firstRecord = apiData[0];     
                        setRecord(firstRecord);
                        navigate(`/namuna10view`, { state: firstRecord });
                    } else {
                        setError("No records found.");
                    }
                }  
            } catch (error) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        if (!record) {
            fetchData();
        }
    }, [id, record, navigate]);

    const taxTypeMapping = {
        "HOUSE_TAX": "घर कर",
        "LIGHT_TAX": "प्रकाश कर",
        "HEALTH_TAX": "आरोग्य कर",
        "WATER_TAX": "पाणी कर",
        "NOTICE_FEE": "सूचना शुल्क",
        "OTHER_TAX": "इतर कर"
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!record) return <p>No data available</p>;

    const total1 = record.taxDetails.reduce((acc, tax) => acc + tax.totalAmount, 0);

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
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="माहिती"
                        pageTitle="डॅशबोर्ड / कर वसूली पावती नमुना नं. १० "
                        paths={["/dashboard", "/namuna10view"]}
                    />
                    <Row className="gy-4">
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col className="d-flex justify-content-between align-items-center">
                                            <h5>कर वसूली पावती नमुना नं. १० - माहिती</h5>
                                            <Button color="primary" onClick={() => navigate(-1)}>मागे जा</Button>
                                        </Col>
                                    </Row>
                                    
                                    <Table bordered responsive>
                                        <tbody>
                                            <tr><th>पावती नं</th><td>{record.receiptNo}</td></tr>
                                            <tr><th>बुक नं</th><td>{record.bookNo}</td></tr>
                                            <tr><th>घर क्र</th><td>{record.houseNo}</td></tr>
                                            <tr><th>बिल क्रमांक</th><td>{record.billNo}</td></tr>
                                            <tr><th>श्री</th><td>{record.shri}</td></tr>
                                            <tr><th>वापरकर्ता आयडी</th><td>{record.userId}</td></tr>
                                            <tr><th>वर्ष श्रेणी (पासून - पर्यंत)</th><td>{record.yearRange}</td></tr>
                                            <tr><th>दिनांक</th><td>{record.date}</td></tr>

                                            <tr><th className='text-center' colSpan="2"><h3>Tax Details</h3></th></tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <Table className="table table-sm table-bordered">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>कर प्रकार</th>
                                                                <th>मागील शिल्लक</th>
                                                                <th>वर्तमान शिल्लक</th>
                                                                <th>एकूण रक्कम</th>
                          
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {record.taxDetails.map((tax, index) => (
                                                                <tr key={index}>
                                                                    <td>{taxTypeMapping[tax.taxType] || tax.taxType}</td>
                                                                    <td>{tax.previousBalance}</td>
                                                                    <td>{tax.currentBalance}</td>
                                                                    <td>{tax.totalAmount}</td>
                                                              
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                          <tr>
                                                            <td colSpan="3" className="text-end"><strong>एकूण:</strong></td>
                                                            <td><strong>{total1} ₹</strong></td>
                                                          </tr>
                                                        </tfoot>
                                                    </Table>
                                                </td>
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

export default Namuna10View;
