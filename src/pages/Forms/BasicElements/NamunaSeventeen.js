import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

import "../BasicElements/style.css"
const BasicElements = () => {
    document.title = "Namuna 02";
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        gramPanchayatId: '',
        gramPanchayatName: '',
        employeeId: '',
        employeeName: '',
        jamaRakmecheMukhyaShirshak: '',
        manjurArthsankalp: '',
        sudharitAndaz: '',
        sudharitAdhikVaja: '',
        kharchachePramukhShirsh: '',
        manjurRakkam: '',
        kharchachaSudharitAndaz: '',
        kharchachaAdhikVaja: '',
        shera: '',
        month: '',
        dnyapanRupees: '',
        year: ''
    });

    const [dataList, setDataList] = useState([]); // State for fetched data

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async () => {
        console.log("Sending data:", formData);
        try {
            const response = await axios.post(
                'http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/save',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response:', response.data);
            navigate('/report'); // Redirect to the report page using navigate
        } catch (error) {
            console.error('Error:', error);
            if (error.response) console.error('Error response data:', error.response.data);
        }
    };

    // New function to fetch all data
    const fetchAllData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/getall'); // Replace with your actual endpoint
            console.log('Fetched data:', response.data);
            setDataList(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) console.error('Error response data:', error.response.data);
        }
    };
    const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
        <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{title}</h5>
            <Button color="primary" onClick={onButtonClick}>
                {buttonLabel}
            </Button>
        </div>
    );
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                <BreadCrumb title="नमुना १७" pageTitle="Forms" className="custom-breadcrumb" />


<Row>
    <Col lg={12}>
        <Card>
        <PreviewCardHeader 
    title="माहिती समाविष्ट करा" 
    buttonLabel="Report" 
    onButtonClick={() => navigate('/report')} // Use navigate directly
 />

                                <CardBody className="card-body">
                                   
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatId" className="form-label">ग्रामपंचायत आयडी </Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatId" value={formData.gramPanchayatId} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatName" className="form-label">ग्रामपंचायत नाव</Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatName" value={formData.gramPanchayatName} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="employeeId" className="form-label">कर्मचारी आयडी</Label>
                                                    <Input type="text" className="form-control" id="employeeId" value={formData.employeeId} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="employeeName" className="form-label">कर्मचारी नाव</Label>
                                                    <Input type="text" className="form-control" id="employeeName" value={formData.employeeName} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="jamaRakmecheMukhyaShirshak" className="form-label">जमा रकमेचे मुख्य शीर्षक</Label>
                                                    <Input type="text" className="form-control" id="jamaRakmecheMukhyaShirshak" value={formData.jamaRakmecheMukhyaShirshak} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="manjurArthsankalp" className="form-label">मंजूर अर्थसंकल्प</Label>
                                                    <Input type="text" className="form-control" id="manjurArthsankalp" value={formData.manjurArthsankalp} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="sudharitAndaz" className="form-label">सुधारित अंदाज</Label>
                                                    <Input type="text" className="form-control" id="sudharitAndaz" value={formData.sudharitAndaz} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="sudharitAdhikVaja" className="form-label">सुधारित अधिक वजा</Label>
                                                    <Input type="text" className="form-control" id="sudharitAdhikVaja" value={formData.sudharitAdhikVaja} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="kharchachePramukhShirsh" className="form-label">खर्चाचे प्रमुख शीर्ष</Label>
                                                    <Input type="text" className="form-control" id="kharchachePramukhShirsh" value={formData.kharchachePramukhShirsh} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="manjurRakkam" className="form-label">मंजूर रक्कम</Label>
                                                    <Input type="text" className="form-control" id="manjurRakkam" value={formData.manjurRakkam} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="kharchachaSudharitAndaz" className="form-label">खर्चाचा सुधारित अंदाज</Label>
                                                    <Input type="text" className="form-control" id="kharchachaSudharitAndaz" value={formData.kharchachaSudharitAndaz} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="kharchachaAdhikVaja" className="form-label">खर्चाचा अधिक वजा</Label>
                                                    <Input type="text" className="form-control" id="kharchachaAdhikVaja" value={formData.kharchachaAdhikVaja} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="shera" className="form-label">शेरा</Label>
                                                    <Input type="text" className="form-control" id="shera" value={formData.shera} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="month" className="form-label">महिना</Label>
                                                    <Input type="text" className="form-control" id="month" value={formData.month} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dnyapanRupees" className="form-label">दिवसांत रुपयांचा वापर</Label>
                                                    <Input type="text" className="form-control" id="dnyapanRupees" value={formData.dnyapanRupees} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="year" className="form-label">वर्ष</Label>
                                                    <Input type="text" className="form-control" id="year" value={formData.year} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="text-end">
                                            <Button color="success" onClick={handleSubmit}>Save</Button>
                                            <Button color="danger" onClick={() => window.location.href = 'cancel_page.php'}>Cancel</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Section to display fetched data */}
                    <Row>
                        <Col lg={16}>
                            <Card>
                                <CardBody>
                                    {dataList.length > 0 && (
                                        <>
                                            <h4>Fetched Data</h4>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>ग्रामपंचायत आयडी</th>
                                                        <th>ग्रामपंचायत नाव</th>
                                                        <th>कर्मचारी आयडी</th>
                                                        <th>कर्मचारी नाव</th>
                                                        <th>जमा रकमेचे मुख्य शीर्षक</th>
                                                        <th>मंजूर अर्थसंकल्प</th>
                                                        <th>सुधारित अंदाज</th>
                                                        <th>सुधारित अधिक वजा</th>
                                                        <th>खर्चाचे प्रमुख शीर्ष</th>
                                                        <th>मंजूर रक्कम</th>
                                                        <th>खर्चाचा सुधारित अंदाज</th>
                                                        <th>खर्चाचा अधिक वजा</th>
                                                        <th>शेरा</th>
                                                        <th>महिना</th>
                                                        <th>दिवसांत रुपयांचा वापर</th>
                                                        <th>वर्ष</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataList.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{data.gramPanchayatId}</td>
                                                            <td>{data.gramPanchayatName}</td>
                                                            <td>{data.employeeId}</td>
                                                            <td>{data.employeeName}</td>
                                                            <td>{data.jamaRakmecheMukhyaShirshak}</td>
                                                            <td>{data.manjurArthsankalp}</td>
                                                            <td>{data.sudharitAndaz}</td>
                                                            <td>{data.sudharitAdhikVaja}</td>
                                                            <td>{data.kharchachePramukhShirsh}</td>
                                                            <td>{data.manjurRakkam}</td>
                                                            <td>{data.kharchachaSudharitAndaz}</td>
                                                            <td>{data.kharchachaAdhikVaja}</td>
                                                            <td>{data.shera}</td>
                                                            <td>{data.month}</td>
                                                            <td>{data.dnyapanRupees}</td>
                                                            <td>{data.year}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BasicElements;
