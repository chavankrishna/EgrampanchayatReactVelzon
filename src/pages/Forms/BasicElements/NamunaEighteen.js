import React, { useState } from 'react';
import { Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';


const Namuna18Form = () => {
    const [formData, setFormData] = useState({
        remark: '',
        employeeId: '',
        employeeName: '',
        grampanchayatId: '',
        grampanchayatName: '',
        jamaTarikh: '',
        dhanadeshKramank: '',
        konakadunPraptZala: '',
        jamaTapshil: '',
        jamaRakkam: '',
        agrim: '',
        jamaEkun: '',
        adhyakshari: '',
        kharchTarikh: '',
        kharchTapshil: '',
        konasRakkamDili: '',
        kharchRakkam: '',
        agrimatunKharch: '',
        kharchEkun: '',
        swakshari: '',
        prarambhiShillak: '',
        prarambhiShillakJama: '',
        prarambhiShillakKharch: '',
        prarambhiShillakEkun: '',
        prarambhiShillakRokh: '',
        aarambhiShillak: '',
        aarambhiShillakJama: '',
        aarambhiShillakEkun: '',
        year: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/namua18', formData);
            console.log('Response:', response.data);
            setFormData({
                remark: '',
                employeeId: '',
                employeeName: '',
                grampanchayatId: '',
                grampanchayatName: '',
                jamaTarikh: '',
                dhanadeshKramank: '',
                konakadunPraptZala: '',
                jamaTapshil: '',
                jamaRakkam: '',
                agrim: '',
                jamaEkun: '',
                adhyakshari: '',
                kharchTarikh: '',
                kharchTapshil: '',
                konasRakkamDili: '',
                kharchRakkam: '',
                agrimatunKharch: '',
                kharchEkun: '',
                swakshari: '',
                prarambhiShillak: '',
                prarambhiShillakJama: '',
                prarambhiShillakKharch: '',
                prarambhiShillakEkun: '',
                prarambhiShillakRokh: '',
                aarambhiShillak: '',
                aarambhiShillakJama: '',
                aarambhiShillakEkun: '',
                year: '',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <h2>नमूना 18 फॉर्म</h2>
            <form onSubmit={handleSubmit}>
                <Row>
                   
                    <Col md={6}>
                        <FormGroup>
                            <Label for="employeeId">कर्मचारी आयडी</Label>
                            <Input type="hidden" id="employeeId" value={formData.employeeId} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="employeeName">कर्मचारी नाव</Label>
                            <Input type="hidden" id="employeeName" value={formData.employeeName} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="grampanchayatId">ग्रामपंचायत आयडी</Label>
                            <Input type="hidden" id="grampanchayatId" value={formData.grampanchayatId} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="grampanchayatName">ग्रामपंचायत नाव</Label>
                            <Input type="text" id="grampanchayatName" value={formData.grampanchayatName} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="jamaTarikh">तारीख</Label>
                            <Input type="date" id="jamaTarikh" value={formData.jamaTarikh} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="dhanadeshKramank">धनादेश क्रमांक</Label>
                            <Input type="text" id="dhanadeshKramank" value={formData.dhanadeshKramank} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="konakadunPraptZala">कोणाकडून प्राप्त झाला</Label>
                            <Input type="text" id="konakadunPraptZala" value={formData.konakadunPraptZala} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="jamaTapshil">तपशील</Label>
                            <Input type="text" id="jamaTapshil" value={formData.jamaTapshil} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="jamaRakkam">रक्कम</Label>
                            <Input type="text" id="jamaRakkam" value={formData.jamaRakkam} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="agrim">आग्रीम</Label>
                            <Input type="text" id="agrim" value={formData.agrim} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="jamaEkun">एकूण</Label>
                            <Input type="text" id="jamaEkun" value={formData.jamaEkun} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="adhyakshari">अध्यक्षरी</Label>
                            <Input type="text" id="adhyakshari" value={formData.adhyakshari} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="kharchTarikh">खर्च तारीख</Label>
                            <Input type="date" id="kharchTarikh" value={formData.kharchTarikh} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="kharchTapshil">प्रमानक क्रमांक</Label>
                            <Input type="text" id="kharchTapshil" value={formData.kharchTapshil} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="konasRakkamDili">कोणास रक्कम दिली</Label>
                            <Input type="text" id="konasRakkamDili" value={formData.konasRakkamDili} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="kharchRakkam">खर्च रक्कम</Label>
                            <Input type="text" id="kharchRakkam" value={formData.kharchRakkam} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="agrimatunKharch">आग्रिमातून खर्च</Label>
                            <Input type="text" id="agrimatunKharch" value={formData.agrimatunKharch} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="kharchEkun">खर्च एकूण</Label>
                            <Input type="text" id="kharchEkun" value={formData.kharchEkun} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="swakshari">स्वाक्षरी</Label>
                            <Input type="text" id="swakshari" value={formData.swakshari} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prarambhiShillak">प्रारंभिक शिलक</Label>
                            <Input type="text" id="prarambhiShillak" value={formData.prarambhiShillak} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prarambhiShillakJama">प्रारंभिक शिलक जमा</Label>
                            <Input type="text" id="prarambhiShillakJama" value={formData.prarambhiShillakJama} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prarambhiShillakKharch">प्रारंभिक शिलक खर्च</Label>
                            <Input type="text" id="prarambhiShillakKharch" value={formData.prarambhiShillakKharch} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prarambhiShillakEkun">प्रारंभिक शिलक एकूण</Label>
                            <Input type="text" id="prarambhiShillakEkun" value={formData.prarambhiShillakEkun} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="prarambhiShillakRokh">प्रारंभिक शिलक रोक</Label>
                            <Input type="text" id="prarambhiShillakRokh" value={formData.prarambhiShillakRokh} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="aarambhiShillak">आंतरमुखी शिलक</Label>
                            <Input type="text" id="aarambhiShillak" value={formData.aarambhiShillak} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="aarambhiShillakJama">आंतरमुखी शिलक जमा</Label>
                            <Input type="text" id="aarambhiShillakJama" value={formData.aarambhiShillakJama} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="aarambhiShillakEkun">आंतरमुखी शिलक एकूण</Label>
                            <Input type="text" id="aarambhiShillakEkun" value={formData.aarambhiShillakEkun} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="year">वर्ष</Label>
                            <Input type="number" id="year" value={formData.year} onChange={handleInputChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" type="submit">संपूर्ण करा</Button>
            </form>
        </Container>
    );
};

export default Namuna18Form;
