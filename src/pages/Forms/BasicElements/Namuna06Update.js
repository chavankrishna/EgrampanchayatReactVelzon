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
            'lekhaShirsh', 'arthsankalpiyaAnudan', 'mahinyaBaddalchiEkunRakkam',
            'maghilMahinyachaAkherparyantchiRakkam', 'maghePasunPudheChaluEkunRakkam',
            'day', 'value', 'month', 'year'
        ];

        const isFormValid = requiredFields.every(field => formData[field]?.trim() !== '');
        if (!isFormValid) {
            alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
            setLoading(false);
            return;
        }

        // try {
        //     const response = await axios.post(
        //         'http://localhost:8080/Namuna06JamaRakmanchiNondvahi/update',
        //         formData,
        //         { headers: { 'Content-Type': 'application/json' } }
        //     );
        //     alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
        //     navigate('/Namuna06');
        // }  
        try {
          const response = await axios.post(
              `http://localhost:8080/Namuna06JamaRakmanchiNondvahi/update/${formData.id}`,
              formData,
              { headers: { 'Content-Type': 'application/json' } }
          );
      
         
              alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
              navigate('/नमुना-०६-अहवाल'); // Navigate back to the report page after successful update
          
      } catch (err) {
          setLoading(false);
          if (err.response) {
              setError(`Error: ${err.response.data.message || 'Error updating record'}`);
          } else if (err.request) {
              setError('Error: No response from server');
          } else {
              setError(`Error: ${err.message}`);
          }
          console.error('Error updating record:', err);
      } finally {
          setLoading(false);
      }
    }; 

    const handleReset = () => {
        setFormData({
            shera: '', year: '',
            lekhaShirsh: '', arthsankalpiyaAnudan: '', mahinyaBaddalchiEkunRakkam: '',
            maghilMahinyachaAkherparyantchiRakkam: '', maghePasunPudheChaluEkunRakkam: '',
            day: '', value: '', month: ''
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
  { label: "लेखाशिर्ष", id: "lekhaShirsh" },
  { label: " अर्थसंकलपीयअनुदान", id: "arthsankalpiyaAnudan" },
  { label: "मासिकबदलचीकुलरक्कम", id: "mahinyaBaddalchiEkunRakkam" },
  { label: "मागीलमहिन्याचाअखेरपर्यंतचीरक्कम", id: "maghilMahinyachaAkherparyantchiRakkam" },
  { label: "मागेपासूनपुढेचालूएकूनरक्कम", id: "maghePasunPudheChaluEkunRakkam" },
  {
    label: "दिवस",
    id: "day",
    type: "dropdown",
    options: Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))
  },
  {
    label: "महिना",
    id: "month",
    type: "dropdown",
    options: [
      { label: "जानेवारी", value: "January" },
      { label: "फेब्रुवारी", value: "February" },
      { label: "मार्च", value: "March" },
      { label: "एप्रिल", value: "April" },
      { label: "मे", value: "May" },
      { label: "जून", value: "June" },
      { label: "जुलै", value: "July" },
      { label: "ऑगस्ट", value: "August" },
      { label: "सप्टेंबर", value: "September" },
      { label: "ऑक्टोबर", value: "October" },
      { label: "नोव्हेंबर", value: "November" },
      { label: "डिसेंबर", value: "December" },
    ]
  },
  {
    label: "वर्ष",
    id: "year",
    type: "dropdown",
    options: Array.from({ length: 100 }, (_, i) => {
      const startYear = new Date().getFullYear() - i;
      const endYear = startYear + 1;
      return { label: `${startYear}-${endYear}`, value: `${startYear}-${endYear}` };
    })
  },
  
  {
    label: "शेरा",
    id: "shera",
    type: "textarea",
  },
].map((field, index) => (
  <Col key={index} xxl={3} md={3}>
    <div>
      <Label htmlFor={field.id} className="form-label">{field.label}</Label>
      {field.type === "dropdown" ? (
        <Input
          type="select"
          id={field.id}
          className="form-control"
          value={formData[field.id] || ""}
          onChange={handleInputChange}
        >
          <option value="">निवडा</option>
          {field.options.map((option, idx) => (
            <option key={idx} value={option.value}>{option.label}</option>
          ))}
        </Input>
      ) : field.type === "textarea" ? (
        <Input
          type="textarea"
          id={field.id}
          className="form-control"
          value={formData[field.id] || ""}
          onChange={handleInputChange}
          rows="3"
        />
      ) : (
        <Input
          type="text"
          id={field.id}
          className="form-control"
          value={formData[field.id] || ""}
          onChange={handleInputChange}
        />
      )}
    </div>
  </Col>
))}

                                    </Row>
                                    <div className="text-start" style={{ marginTop: '20px' }}>
                                        <Button color="success" onClick={handleSubmit}>अद्यतन करा</Button>
                                        <Button color="danger" onClick={() => navigate('/नमुना-०६-अहवाल')} style={{ marginLeft: '10px' }}>रद्द करा</Button>
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