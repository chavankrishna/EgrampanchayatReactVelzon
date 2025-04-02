import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UiContent from "../../../Components/Common/UiContent"; 
import BreadCrumb from '../../../Components/Common/BreadCrumb';   
import "../BasicElements/style.css";    

const Namuna14MudrankUpdate = () => {    
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(state || {});     
    const [loading, setLoading] = useState(false);     
    const [error, setError] = useState(null);   
    const [successMessage,setSuccessMessage] = useState(""); 

    useEffect(() => {
        if (!state && formData.id) {
            const fetchRecord = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/namuna14/getByID/${formData.id}`);
                    setFormData(response.data);
                } catch (err) {
                    console.error('Error fetching record:', err);
                    setError('Error fetching record');
                }
            };
            fetchRecord();
        }
    }, [state, formData.id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const newValue = value ? value : '';

        setFormData(prevData => ({
            ...prevData,
            [id]: newValue
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const requiredFields = [
      
            "mMPramanakKramank",
            "mMKimmat",
            "vMPavatiKramank",
            "vMPavatiDinank",
            "vMChitkavalyachiKimmat",
            "dainikShillak",
            "shera"
          ];

        const isFormValid = requiredFields.every(field => formData[field]?.trim() !== '');
        if (!isFormValid) {
            alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put( 
                `http://localhost:8080/namuna14/updateByID/${formData.id}`,
                formData,
                { headers: { 'Content-Type': 'application/json' } } 
            );
            
            // alert('माहिती यशस्वीरीत्या अद्यतन केली गेली आहे');  

            navigate('/namuna14mudrankreport');   
            
            const successMessage = "माहिती यशस्वीरीत्या अद्यतन करण्यात आली आहे!";  
            sessionStorage.setItem("sessionMessage", successMessage);
            setSuccessMessage(successMessage);  // Update state for UI
        
            // Remove the success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage("");  // Clear state after 5 seconds
                sessionStorage.removeItem("sessionMessage");  // Remove sessionStorage after 5 seconds
            }, 5000);  // 5000ms = 5 seconds
         
        } catch (error) {
            alert('Failed to submit data: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            id: '', employeeId: '', employeeName: '', grampanchayatId: '', grampanchayatName: '',
            createdDate: '', updatedDate: '', 
            
            mMPramanakKramank: '',
            mMKimmat:'',
            vMPavatiKramank:'',
            vMPavatiDinank:'',
            vMChitkavalyachiKimmat:'',
            dainikShillak:'',
            shera:''
            
        });
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="मुद्रांक हिशोब नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <Row className="gy-4">
                                        <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4 className="card-title mb-4">जमा रकमांची नोंदवही- अद्यतन करा</h4>
                                            </div>
                                            <div>
                                                <Button color="primary" onClick={() => navigate(-1)}>
                                                    <i className="bx bx-arrow-back"></i>मागे जा
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="gy-4">
                                    {[  
                                        { label: "मिळालेले मुद्रांक प्रमाणक क्रमांक", id: "mMPramanakKramank" },
                                        { label: "मिळालेले मुद्रांकची किंमत", id: "mMKimmat" },
                                        { label: "वापरलेले मुद्रांक पावती क्रमांक ", id: "vMPavatiKramank" },
                                        { label: "वापरलेले मुद्रांक पावती दिनांक", id: "vMPavatiDinank" },
                                        { label: "वापरलेले चिकटवलेले मुद्रांकची किंमत", id: "vMChitkavalyachiKimmat" },
                                        { label: "दैनिक शिल्लक", id: "dainikShillak" },
                                        { label: "शेरा", id: "shera" },
                                     ].map((field, index) => (
                                    <Col key={index} xxl={3} md={3}>
                                        <div>
                                        <Label htmlFor={field.id} className="form-label">{field.label}</Label>
                                        <Input
                                            type="text"
                                            id={field.id}
                                            className="form-control"
                                            value={formData[field.id] || ""}
                                            onChange={handleInputChange}
                                        />
                                        </div>
                                    </Col>
                                    ))}

                                    </Row>
                                    <div className="text-start" style={{ marginTop: '20px' }}>
                                        <Button color="success" onClick={handleSubmit}>अद्यतन करा</Button>
                                        <Button color="danger" onClick={() => navigate('/namuna14mudrankreport')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
                                        <Button color="primary" onClick={handleReset} style={{ marginLeft: '10px' }}>रिसेट करा</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Namuna14MudrankUpdate;