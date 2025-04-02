import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import '../BasicElements/style.css';

const Namuna8 = () => {
    document.title = "कर आकारणी नोंदवही";

    // const navigate = useNavigate();

    // Generate an array of the last 100 year ranges
    const arabicToMarathiDigits = (num) => {
        const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return num.toString().split('').map(digit => marathiDigits[parseInt(digit)]).join('');
    };
    
    const currentYear = new Date().getFullYear();
    const yearRanges = Array.from({ length: 100 }, (_, i) => {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        const startYearInMarathi = arabicToMarathiDigits(startYear);
        const endYearInMarathi = arabicToMarathiDigits(endYear);
        return `${startYearInMarathi}-${endYearInMarathi}`;
    });

    const days = [
        '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२', '१३', '१४', 
        '१५', '१६', '१७', '१८', '१९', '२०', '२१', '२२', '२३', '२४', '२५', '२६', 
        '२७', '२८', '२९', '३०', '३१'
    ];
      // Define month names
      const months = [
        'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
        'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
    ];

    const [formData, setFormData] = useState({
        serialno: '',
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
        kagadFee: ''
    });

    const [dataList, setDataList] = useState([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const calculateTotalAmountForMonth = () => {
        let totalAmount = 0;

        // Check the day-wise value and calculate the total
        if (formData.day && formData.value) {
            const valuePerDay = parseFloat(formData.value);
            const dayIndex = parseInt(formData.day, 10) - 1;

            if (valuePerDay && dayIndex >= 0) {
                totalAmount = valuePerDay * (dayIndex + 1); // Multiply value by day count
            }
        }
        
        // Update the "महिन्याबद्दलची एकूण रक्कम" field with the total calculated
        setFormData(prevData => ({
            ...prevData,
            mahinyaBaddalchiEkunRakkam: totalAmount.toString(),
        }));
    };

    const handleSubmit = async (formData) => {
        const requiredFields = ['rastyacheNaav', 'malmattaKramank','malmattecheWarnan', 'malkacheNaav','bhogvataKarnaracheNaav','kshetraphal', 'warshikBhadeKinvaKimmatdar', 'karYadiGharpattiKar','karYadiWeejKar','karYadiArogyaKar','karYadiPanipattiKar','karYadiEkun','nakkalFee','rujuwatFee','kagadFee'];
        const isFormValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    
        if (!isFormValid) {
            alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
            return; // Stop submission if any required field is empty
        }
    
        try {
            const response = await axios.post(
                'http://localhost:8080/kar-akarani/create',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response:', response.data);
            alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
            navigate('/Namuna8Report');
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                alert('Failed to submit data: ' + error.response.data.message || 'Unknown error');
            } else {
                alert('Error: ' + error.message);
            }
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

    const handleReset = () => {
        setFormData({
            // Common Fields
            serialno: '',
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
            kagadFee: ''
        });
    };
    

    const handleSaveAndAddNew = () => {
        handleSubmit();
        handleReset();
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="कर आकारणी नोंदवही " pageTitle="Forms" className="custom-breadcrumb"/>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="कर आकारणी नोंदवही"buttonLabel="अहवाल" 
                                    onButtonClick={() => navigate('/Namuna08Report2')} />
                                <CardBody className="card-body">
                                    <BreadCrumb title="" pageTitle=" " />
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            {/* /*<Col xxl={3} md={3}>
                                                { <div>
                                                    <Label htmlFor="serialno" className="form-label">अनुक्रमांक</Label>
                                                    <Input type="text" className="form-control" id="serialno" value={formData.serialno} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}
                                            {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="employeeId" className="form-label">कर्मचारी आयडी</Label>
                                                    <Input type="text" className="form-control" id="employeeId" value={formData.employeeId} onChange={handleInputChange} />
                                                </div>
                                            </Col>  */}

                                            {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="employeeName" className="form-label">कर्मचारी नाव</Label>
                                                    <Input type="text" className="form-control" id="employeeName" value={formData.employeeName} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatId" className="form-label">ग्रामपंचायत आयडी</Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatName" value={formData.gramPanchayatId} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}

                                            {/* <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="gramPanchayatName" className="form-label">ग्रामपंचायत नाव</Label>
                                                    <Input type="text" className="form-control" id="gramPanchayatName" value={formData.gramPanchayatName} onChange={handleInputChange} />
                                                </div>
                                            </Col> */}



                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="rastyacheNaav" className="form-label">रस्त्यांचे नाव</Label>
                                                    <Input type="text" className="form-control" id="rastyacheNaav" value={formData.rastyacheNaav} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="malmattaKramank" className="form-label">मालमत्ता क्रमांक</Label>
                                                    <Input type="text" className="form-control" id="malmattaKramank" value={formData.malmattaKramank} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="malmattecheWarnan" className="form-label">मालमत्तेचे वर्णन</Label>
                                                    <Input type="text" className="form-control" id="malmattecheWarnan" value={formData.malmattecheWarnan} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="malkacheNaav" className="form-label">मालकाचे नाव</Label>
                                                    <Input type="text" className="form-control" id="malkacheNaav" value={formData.malkacheNaav} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="bhogvataKarnaracheNaav" className="form-label">भोगवटा करणारचे नाव</Label>
                                                    <Input type="text" className="form-control" id="bhogvataKarnaracheNaav" value={formData.bhogvataKarnaracheNaav} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="kshetraphal" className="form-label">क्षेत्रफळ</Label>
                                                    <Input type="text" className="form-control" id="kshetraphal" value={formData.kshetraphal} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="warshikBhadeKinvaKimmatdar" className="form-label">वार्षिक भाडे किवा किंमतदार </Label>
                                                    <Input type="text" className="form-control" id="warshikBhadeKinvaKimmatdar" value={formData.warshikBhadeKinvaKimmatdar} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="karYadiGharpattiKar" className="form-label">घरपट्टी कर</Label>
                                                    <Input type="text" className="form-control" id="karYadiGharpattiKar" value={formData.karYadiGharpattiKar} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="karYadiWeejKar" className="form-label"> वीज कर</Label>
                                                    <Input type="text" className="form-control" id="karYadiWeejKar" value={formData.karYadiWeejKar} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="karYadiArogyaKar" className="form-label">आरोग्य कर</Label>
                                                    <Input type="text" className="form-control" id="karYadiArogyaKar" value={formData.karYadiArogyaKar} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="karYadiPanipattiKar" className="form-label">पाणीपट्टी कर </Label>
                                                    <Input type="text" className="form-control" id="karYadiPanipattiKar" value={formData.karYadiPanipattiKar} onChange={handleInputChange} required />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="karYadiEkun" className="form-label">एकूण</Label>
                                                    <Input type="text" className="form-control" id="karYadiEkun" value={formData.karYadiEkun} onChange={handleInputChange} required />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="nakkalFee" className="form-label">नक्कलफी</Label>
                                                    <Input type="text" className="form-control" id="nakkalFee" value={formData.nakkalFee} onChange={handleInputChange} required />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="rujuwatFee" className="form-label">रुजवातफी</Label>
                                                    <Input type="text" className="form-control" id="rujuwatFee" value={formData.rujuwatFee} onChange={handleInputChange} required />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="kagadFee" className="form-label">कागदफी</Label>
                                                    <Input type="text" className="form-control" id="kagadFee" value={formData.kagadFee} onChange={handleInputChange} required />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
        <div className="text-start">
            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करा</Button>
            <Button color="success" onClick={handleSaveAndAddNew} style={{ marginRight: '10px' }}>जतन करून नवीन माहिती भरा</Button>
            <Button color="danger" onClick={() => window.location.href = '/नमुना-२१'} style={{ marginRight: '10px' }}>रद्द करा</Button>
            <Button color="primary" onClick={handleReset} >रिसेट करा</Button>
        </div>
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

export default Namuna8;