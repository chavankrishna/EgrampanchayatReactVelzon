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
                    const response = await axios.post(`http://localhost:8080/Namuna06JamaRakmanchiNondvahi/get_by_id/${formData.id}`);
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
            'dinank', 'milaleleMudrankPramanakKramank','milaleleMudrankachiKimmat', 'waparleleMudrankPavtiKramankDinank','waparleleChitkavleleMudrankachiKimmat','dainikShillak', 'year'
        ];

        const isFormValid = requiredFields.every(field => formData[field]?.trim() !== '');
        if (!isFormValid) {
            alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
            navigate('/Namuna14');
        } catch (error) {
            alert('Failed to submit data: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            id: '', employeeId: '', employeeName: '', grampanchayatId: '', grampanchayatName: '',
            createdDate: '', updatedDate: '', shera: '', year: '',
            dinank: '', milaleleMudrankPramanakKramank: '', milaleleMudrankachiKimmat: '',
          waparleleMudrankPavtiKramankDinank: '', waparleleChitkavleleMudrankachiKimmat: '', dainikShillak: '', shera: '', year: '',
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
                                        
  { label: " दिनांक ", id: "dinank" },
  { label: " मिळालेले मुद्रांक प्रमाणक  क्रमांक", id: "milaleleMudrankPramanakKramank" },
  { label: "मिळालेले मुद्रांकची किंमत", id: "milaleleMudrankachiKimmat" },
  { label: "वापरलेले मुद्रांक पावती क्रमांक दिनांक", id: "waparleleMudrankPavtiKramankDinank" },
  { label: "वापरलेले चिकटवलेले मुद्रांकची किंमत", id: "waparleleChitkavleleMudrankachiKimmat" },
  { label: "दिवस", id: "day" },
  { label: "दैनिक शिल्लक", id: "dainikShillak" },
  { label: "महिना", id: "month" },
  { label: "वर्ष", id: "year" },
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
                                        <Button color="danger" onClick={() => navigate('/नमुना-१४-अहवाल')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
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