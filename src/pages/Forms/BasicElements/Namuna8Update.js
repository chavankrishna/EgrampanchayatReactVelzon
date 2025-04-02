import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../BasicElements/style.css";

const UpdatePage = () => {
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(state || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!state && formData.grampanchyatId) {
            const fetchRecord = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/kar-akarani/get_by_id/${formData.id}`);
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
            'rastyacheNaav', 'malmattaKramank','malmattecheWarnan', 'malkacheNaav','bhogvataKarnaracheNaav','kshetraphal', 'warshikBhadeKinvaKimmatdar','karYadiGharpattiKar','karYadiWeejKar','karYadiArogyaKar','karYadiPanipattiKar','karYadiEkun','nakkalFee','rujuwatFee','kagadFee'
        ];

        const isFormValid = requiredFields.every(field => formData[field]?.trim() !== '');
        if (!isFormValid) {
            alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/kar-akarani/save',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
            navigate('/Namuna8');
        } catch (error) {
            alert('Failed to submit data: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            id: '',  serialno: '',
            employeeid: '',
            employeeName: '',
            grampanchayatId: '',
            grampanchayatName: '',
            rastyacheNaav: '',
            malmattaKramank: '',
            malmattecheWarnan: '',
            malkacheNaav: '',
            bhogvataKarnaracheNaav: '',
            kshetraphal: '',
            warshikBhadeKinvaKimmatdar: '',
            karYadiGharpattiKar: '',
            karYadiWeejKar: '',
            karYadiArogyaKar: '',
            karYadiPanipattiKar: '',
            karYadiEkun: '',
            nakkalFee: '',
            rujuwatFee: '',
            kagadFee: '',
        });
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="जमा रकमांची नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <Row className="gy-4">
                                        <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4 className="card-title mb-4">कर आकारणी नोंदवही- अद्यतन करा</h4>
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
                                        
  { label: " रस्त्यांचे नाव ", id: "rastyacheNaav" },
  { label: " मालमत्ता क्रमांक", id: "malmattaKramank" },
  { label: "मालमत्तेचे वर्णन", id: "malmattecheWarnan" },
  { label: "मालकाचे नाव", id: "malkacheNaav" },
  { label: "भोगवटा करणारचे नाव", id: "bhogvataKarnaracheNaav" },
  { label: "क्षेत्रफळ", id: "kshetraphal" },
  { label: "वार्षिक भाडे किवा किंमतदार", id: "warshikBhadeKinvaKimmatdar" },
  { label: "वर्षघरपट्टी कर", id: "karYadiGharpattiKar" },
  { label: "आरोग्य कर", id: "karYadiArogyaKar" },
  { label: "पाणीपट्टी कर", id: "karYadiPanipattiKar" },
  { label: "एकूण", id: "karYadiEkun" },
  { label: "नक्कलफी", id: "nakkalFee" },
  { label: "रुजवातफी", id: "rujuwatFee" },
  { label: "कागदफी", id: "kagadFee" },
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
                                        <Button color="danger" onClick={() => navigate('/नमुना-८-अहवाल')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
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

export default UpdatePage;