import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useLocation, useNavigate } from 'react-router-dom';



const Namuna06 = () => {
    document.title = "Namuna 06";


    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        lekhaShirsh:'',
        shera:'',
        arthsankalpiyaAnudan:'',
        mahinyaBaddalchiEkunRakkam:'',
        maghilMahinyachaAkherparyantchiRakkam:'',
        maghePasunPudheChaluEkunRakkam:'',
        day:'',
        value:'',
        month:'',
        year:'',
       
        
    });
    

    // const navigate = useNavigate();  // Initialize the navigate function


    const arabicToMarathiDigits = (num) => {
        const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return num.toString().split('').map(digit => marathiDigits[parseInt(digit)]).join('');
    };

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

    //  const currentYear = new Date().getFullYear();
    //  const yearOptions = Array.from({ length: 100 }, (_, i) => ${currentYear - i} : ${currentYear - i + 1});
    const currentYear = new Date().getFullYear();
    const yearRanges = Array.from({ length: 100 }, (_, i) => {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        const startYearInMarathi = arabicToMarathiDigits(startYear);
        const endYearInMarathi = arabicToMarathiDigits(endYear);
        return `${startYearInMarathi}-${endYearInMarathi}`;
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
                'http://localhost:8080/Namuna06JamaRakmanchiNondvahi/save',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
            if (error.response) console.error('Error response data:', error.response.data);
        }
    };
console.log("data",formData.year);
    // New function to fetch all data
    const fetchAllData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Namuna06JamaRakmanchiNondvahi/getall'); // Replace with your actual endpoint
            console.log('Fetched data:', response.data);
            setDataList(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) console.error('Error response data:', error.response.data);
        }
    };
    
    const handleSaveAndAddNew = () => {
         handleSubmit();
        handleReset();
    };
    const handleReset = () => {
        setFormData({
            lekhaShirsh:'',
        shera:'',
        arthsankalpiyaAnudan:'',
        mahinyaBaddalchiEkunRakkam:'',
        maghilMahinyachaAkherparyantchiRakkam:'',
        maghePasunPudheChaluEkunRakkam:'',
        day:'',
        value:'',
        month:'',
        year:'',
      
        });
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
                    <BreadCrumb title="जमा रकमांची नोंदवही" pageTitle="Forms" />
                     
                     

                    <Row>
                        <Col lg={12}>
                            <Card>
                                
                            <PreviewCardHeader
    title={<span style={{ fontWeight: 'bold' }}>जमा रकमांची नोंदवही</span>}
    buttonLabel="अहवाल"
    onButtonClick={() => navigate('/नमुना-०६-अहवाल')} // Use navigate directly
/>

                                                                        <CardBody className="card-body">
                                    
                          
                                    {/* <BreadCrumb title="फॉर्म" pageTitle="Home" /> */}
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                               
                                        <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="lekhaShirsh" className="form-label">लेखा शीर्ष</Label>
                                                    <Input type="text" className="form-control" id="lekhaShirsh" value={formData.lekhaShirsh} onChange={handleInputChange} />

                                                </div>
                                            </Col>
                                               

                                      

                                            <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="arthsankalpiyaAnudan" className="form-label">आर्थिक संकल्पीय अनुदान</Label>
                                                    <Input type="text" className="form-control" id="arthsankalpiyaAnudan" value={formData.arthsankalpiyaAnudan} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="mahinyaBaddalchiEkunRakkam" className="form-label">महिन्याबद्दलची एकूण रक्कम</Label>
                                                    <Input type="text" className="form-control" id="mahinyaBaddalchiEkunRakkam" value={formData.mahinyaBaddalchiEkunRakkam} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="maghilMahinyachaAkherparyantchiRakkam" className="form-label">मागील महिन्याचा अखेरपर्यंतची रक्कम</Label>
                                                    <Input type="text" className="form-control" id="maghilMahinyachaAkherparyantchiRakkam" value={formData.maghilMahinyachaAkherparyantchiRakkam} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="maghePasunPudheChaluEkunRakkam" className="form-label">मागे पासून पुढे चालू एकूण रक्कम</Label>
                                                    <Input type="text" className="form-control" id="maghePasunPudheChaluEkunRakkam" value={formData.maghePasunPudheChaluEkunRakkam} onChange={handleInputChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="day" className="form-label">दिवस</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="day" 
                                                        value={formData.day} 
                                                        onChange={handleInputChange}
                                                        // onBlur={calculateTotalAmountForMonth} // Calculate when day is selected
                                                    >
                                                        <option value="">दिवस निवडा</option>
                                                        {days.map((day) => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </Input>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={3}>
                                            <div>
                                                    <Label htmlFor="value" className="form-label">मूल्य</Label>
                                                    <Input type="text" className="form-control" id="value" value={formData.value} onChange={handleInputChange} />
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="month" className="form-label">महिना</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="month" 
                                                        value={formData.month} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">महिना निवडा</option>
                                                        {months.map((month, index) => (
                                                            <option key={index} value={index + 1}>{month}</option>
                                                        ))}
                                                    </Input>
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={3}>
                                                <div>
                                                    <Label htmlFor="year" className="form-label">वर्ष</Label>
                                                    <Input 
                                                        type="select" 
                                                        id="year" 
                                                        value={formData.year} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">वर्ष निवडा</option>
                                                        {yearRanges.map((yearRange) => (
                                                            <option key={yearRange} value={yearRange}>{yearRange}</option>
                                                        ))}
                                                    </Input>
                                                </div>
                                                </Col>
                                            

                                                <Col xxl={3} md={3}>
    <div>
        <Label htmlFor="shera" className="form-label">शेरा</Label>
        <textarea 
            className="form-control" 
            id="shera" 
            value={formData.shera} 
            onChange={handleInputChange} 
            rows="4" // You can adjust the number of rows as needed
        />
    </div>
</Col>

                                    


                                            
                                        </Row>
                                    </div>
                                    <div className="col-lg-12" style={{ marginTop: '20px' }}>
        <div className="text-start">
            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करा</Button>
            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>जतन करून नवीन माहिती भरा</Button>
            <Button color="danger" onClick={() => window.location.href = '/नमुना-०६-अहवाल'} style={{ marginRight: '10px' }}>रद्द करा</Button>
            <Button color="primary" onClick={handleReset} >रिसेट करा</Button>
        </div>
                                        </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Section to display fetched data */}
                   
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Namuna06;