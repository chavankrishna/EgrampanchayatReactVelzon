// src/Components/Report.js
import React, { useEffect, useState } from 'react';
import { Table, Card, CardBody } from 'reactstrap';
import axios from 'axios';

const Report = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/Namuna02PunarniyojanVaNiyatVatap/getall');
                setDataList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, []);

    return (
        <Card>
            <CardBody>
                {dataList.length > 0 ? (
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
                ) : (
                    <p>No data available.</p>
                )}
            </CardBody>
        </Card>
    );
};

export default Report;
