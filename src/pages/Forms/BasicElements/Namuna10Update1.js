import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../BasicElements/style.css";
import { Form } from "react-bootstrap";

const Namuna10Update1 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null); 
  const [rows, setRows] = useState(formData.taxDetails || []);   

  useEffect(() => {
    // Fetch data from backend if no state and if userId is available
    if (!state && formData.grampanchyatId) {    
      const fetchRecord = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/namuna/list/${formData.userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            }
          });
          setFormData(response.data);
          setRows(response.data.taxDetails || []);  
        } catch (err) {
          console.error('Error fetching record:', err);
          setError('Error fetching record');
        }
      };
      fetchRecord();
    }
  }, [state, formData.userId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async () => {  
    setLoading(true);   

    // Validate required fields  
    const requiredFields = ["userId", "receiptNo", "bookNo", "shri", "yearRange", "houseNo", "billNo", "date"];
    if (!requiredFields.every(field => formData[field]?.trim() !== '')) {
      alert('कृपया सर्व आवश्यक क्षेत्रे भरा');
      setLoading(false);
      return; 
    }

    // Add 'total' to each tax detail row     
    const updatedTaxDetails = rows.map(row => {
      const totalAmount = (Number(row.previousBalance) || 0) + (Number(row.currentBalance) || 0);
      return {  
        ...row,
        totalAmount, // Calculate totalAmount per row
        total: totalAmount, // Add total field in each row
      };
    });

    // Calculate the overall grossTotal (if needed at the top level)
    const grossTotal = updatedTaxDetails.reduce((sum, row) => sum + (Number(row.totalAmount) || 0), 0);

    // Prepare the final form data with updated tax details
    const updatedFormData = {
      ...formData,
      taxDetails: updatedTaxDetails,
      total: grossTotal, // Overall total (sum of all rows' totalAmount)
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/namuna/update/${formData.userId}`,
        updatedFormData, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token to request headers
          }
        }
      );


        const successMessage = "माहिती यशस्वीरीत्या अद्यतन करण्यात आली आहे!"; 
        sessionStorage.setItem("sessionMessage", successMessage); 
        setSuccessMessage(successMessage);

        setTimeout(() => { 
                    setSuccessMessage("");
                    sessionStorage.removeItem("sessionMessage");
                }, 5000); // 5000ms = 5 seconds 


     // alert('माहिती यशस्वीरीत्या जतन केली गेली आहे');
      navigate('/namuna10report1');
    } catch (err) {
      setError(`Error:  ${err.message}`); 
      console.error('Error updating record:', err);   
    } finally {
      setLoading(false);   
    }
  };

  const taxTypes = [
    { label: "घरपट्टी कर", value: "HOUSE_TAX" },
    { label: "दिवाबत्ती कर", value: "LIGHT_TAX" },
    { label: "आरोग्य कर", value: "HEALTH_TAX" },
    { label: "पाणी कर", value: "WATER_TAX" },
    { label: "नोटीस फी", value: "NOTICE_FEE" },
    { label: "इतर", value: "OTHER_TAX" },
  ];

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, taxType: "", previousBalance: "", currentBalance: "", totalAmount: "" }]);
  };

  const deleteRow = (id) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter(row => row.id !== id);
      
      // Only add a new row if all rows are deleted
      if (updatedRows.length === 0) {
        return [{ id: Date.now(), taxType: "", previousBalance: "", currentBalance: "" }];
      }
      
      return updatedRows;
    });    
  };
  
  const handleChange = (index, field, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row, i) => {
        if (i === index) {
          const updatedRow = { ...row, [field]: value };
          const prevBalance = Number(updatedRow.previousBalance) || 0;
          const currBalance = Number(updatedRow.currentBalance) || 0;
          updatedRow.totalAmount = prevBalance + currBalance;
          return updatedRow;
        }
        return row;
      });

      
      const grossTotal = updatedRows.reduce((sum, row) => sum + (Number(row.totalAmount) || 0), 0);

    
      setFormData((prevData) => ({
        ...prevData,
        taxDetails: updatedRows, 
        total: grossTotal,       
      }));

      return updatedRows;
    });
  };

  useEffect(() => {
    const total = rows.reduce((sum, row) => sum + (Number(row.totalAmount) || 0), 0);
    setFormData(prevData => ({
      ...prevData,
      total, // Updating total instead of grossTotal
    }));
  }, [rows]);

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
          <BreadCrumb title="जमा रकमांची नोंदवही" pageTitle="फॉर्म" className="custom-breadcrumb" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col xxl={12} md={12} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title mb-4">नमुना 10 - माहिती</h4>   
                      </div>
                      <div className="d-flex justify-content-start mt-3" >
                        <Button color="primary" onClick={() => navigate(-1)}>   
                          <i className="bx bx-arrow-back"></i> मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  {/* Form for basic data */}
                  {/*
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>श्रवापरकर्ता आयडी</th>
                        <td><Input type="text" id="userId" value={formData.userId} readOnly /></td>
                      </tr>
                      <tr>
                        <th>पावती नं</th>
                        <td><Input type="text" id="receiptNo" value={formData.receiptNo || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>बुक नं</th>
                        <td><Input type="text" id="bookNo" value={formData.bookNo || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>घर क्र</th>
                        <td><Input type="text" id="houseNo" value={formData.houseNo || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>बिल क्रमांक</th>
                        <td><Input type="text" id="billNo" value={formData.billNo || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>श्री</th>
                        <td><Input type="text" id="shri" value={formData.shri || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>वर्ष श्रेणी (पासून - पर्यंत)</th>
                        <td><Input type="text" id="yearRange" value={formData.yearRange || ''} onChange={handleInputChange} /></td>
                      </tr>
                      <tr>
                        <th>दिनांक</th>
                        <td><Input type="date" id="date" value={formData.date || ''} onChange={handleInputChange} /></td>
                      </tr>
                    </tbody>
                  </table>
                    */}
                <div className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="userId" className="form-label">वापरकर्ता आयडी</label>
                        <Input type="text" id="userId" value={formData.userId} readOnly className="form-control" />
                    </div>

                    <div className="col-md-3">  
                        <label htmlFor="receiptNo" className="form-label">पावती नं</label>
                        <Input type="number" id="receiptNo" value={formData.receiptNo || ''} onChange={handleInputChange} className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="bookNo" className="form-label">बुक नं</label>
                        <Input type="number" id="bookNo" value={formData.bookNo || ''} onChange={handleInputChange} className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="houseNo" className="form-label">घर क्र</label>
                        <Input type="number" id="houseNo" value={formData.houseNo || ''} onChange={handleInputChange} className="form-control" />
                    </div>

                    <div className="col-md-3">  
                        <label htmlFor="billNo" className="form-label">बिल क्रमांक</label>  
                        <Input 
                            type="number" 
                            id="billNo" 
                            value={formData.billNo || ''} 
                            className="form-control"
                            onChange={handleInputChange} 
                        />
                        
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="shri" className="form-label">श्री</label>  
                        <Input 
                            type="text" 
                            id="shri" 
                            value={formData.shri || ''}
                            className="form-control" 
                            onChange={(e) => {
                                const value = e.target.value;
                                /^[A-Za-z\s]*$/.test(value)
                                    ? (setFormData((prev) => ({ ...prev, shri: value })), setError(""))
                                    : setError("Only alphabets and spaces are allowed!");
                            }}

                        />
                        {error && <small className="text-danger">{error}</small>}
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="yearRange" className="form-label">वर्ष श्रेणी (पासून - पर्यंत)</label>
                        <Input type="text" id="yearRange" value={formData.yearRange || ''} onChange={handleInputChange} className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="date" className="form-label">दिनांक</label>
                        <Input 
                            type="date" 
                            id="date" 
                            value={formData.date || ''} 
                            className="form-control"  
                            onChange={handleInputChange}  
                        
                        />    
                    </div>
                </div>



                  {/* Editable Table for Tax Details */}              
                  <table className="table table-bordered mt-3">            
                    <thead>
                      <tr>
                        <th>तपशील</th>
                        <th>मागील बाकी (₹)</th>   
                        <th>चालू बाकी (₹)</th>
                        <th>एकूण रक्कम (₹)</th>
                        <th>क्रिया</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={row.id}>
                          <td>
                            <Form.Group controlId={`taxType-${index}`}>
                              <Form.Select value={row.taxType || ""} onChange={(e) => handleChange(index, "taxType", e.target.value)}>
                                <option value="">-- Select an option --</option>
                                {taxTypes.map((tax, i) => (
                                  <option key={i} value={tax.value}>{tax.label}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </td>
                          <td>
                            <Input type="number" value={row.previousBalance} onChange={(e) => handleChange(index, "previousBalance", e.target.value)} />
                          </td>
                          <td>
                            <Input type="number" value={row.currentBalance} onChange={(e) => handleChange(index, "currentBalance", e.target.value)} />
                          </td>
                          <td>
                            <Input type="number" value={row.totalAmount} readOnly />
                          </td>
                          <td>
                            {rows.length < 7 && <Button color="primary" onClick={addRow} style={{ marginRight: "5px" }}>+</Button>}
                            {rows.length > 1 && <Button color="danger" onClick={() => deleteRow(row.id)}>-</Button>}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3" className="text-end"><b>एकूण:</b></td>
                        <td><b>{formData.total || 0} ₹</b></td>
                        <td>
                          <input type="hidden" name="total" value={formData.total || 0} />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Submit Button */}
                  
                  <div className="col-lg-12" style={{ marginTop: "20px" }}>   
                    <div className="col-lg-12 d-flex justify-content-end flex-wrap" style={{ marginTop: "20px" }}>
                        <Button color="success" onClick={handleSubmit} disabled={loading} className="me-2 mb-2">
                            {loading ? 'अद्यतन करत आहे...' : 'अद्यतन करा'}    
                        </Button>    
                        <Button color="danger" onClick={() => navigate("/namuna10Report1")} className="mb-2">
                             रद्द करा  
                        </Button>
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

export default Namuna10Update1;   



