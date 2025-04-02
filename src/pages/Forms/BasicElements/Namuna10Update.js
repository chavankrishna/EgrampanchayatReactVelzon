import React, { useState, useEffect } from "react";                
import {               
  Input,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Row,
  Table
} from "reactstrap";    
import axios from "axios";   
import { useNavigate, useParams, useLocation } from "react-router-dom"; // <-- Added useLocation here
import UiContent from "../../../Components/Common/UiContent";   
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";

const Namuna10Update = () => {  
  const { state } = useLocation(); // Access the passed record data from the previous page
  const navigate = useNavigate();
  const { userId } = useParams(); // Fetch from URL if not passed via state

  console.log(state);
  console.log(userId);


 // const userId = state?.userId; // Extract userId safely
 // const userData = state?.data; // Full user data 

 // const [formData, setFormData] = useState(state || {});
  const [formData, setFormData] = useState(state || { taxDetails: [] });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const taxTypeMapping = {    
    "HOUSE_TAX": "घर कर",
    "LIGHT_TAX": "प्रकाश कर",
    "HEALTH_TAX": "आरोग्य कर",    
    "WATER_TAX": "पाणी कर",
    "NOTICE_FEE": "सूचना शुल्क",
    "OTHER_TAX": "इतर कर"
};

const taxTypes = Object.keys(taxTypeMapping).map(key => ({
    value: key,
    label: taxTypeMapping[key]
}));

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const id = state?.userId || userId;  // Fallback to userId from URL
        if (!id) return;

        const response = await axios.get(`http://localhost:8080/api/namuna/${id}`);
        setFormData(response.data || {});
      } catch (err) {
        console.error("Error fetching record:", err);
        setError("Error fetching record");
      }
    };

    if (!state || !state.userId) {
      fetchRecord();
    }
  }, [state, userId]); 
  

  //
  const handleInputChange = (e) => {   
    const { id, value } = e.target;
    const newValue = value ? parseFloat(value) : 0;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: value };
      return newFormData;
    });
  };

  

  const handleSubmit = async () => {
    const requiredFields = [
        "userId",
        "receiptNo",
        "bookNo",
        "shri",
        "yearRange", 
        "houseNo",
        "billNo",
        "date",
        "taxDetails",
    ];

    const isValid = requiredFields.every(
      (field) =>
        formData[field] && // Ensure the field exists
        (typeof formData[field] === "string" ? formData[field].trim() !== "" : true)
    );
  
    if (!isValid) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return;
    }


    try { 
      const response = await axios.put(   
        `http://localhost:8080/api/namuna/update/${formData.userId}`,
        formData,
        { headers: { "Content-Type": "application/json" } } 
      );

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे"; // Marathi message
      sessionStorage.setItem("sessionMessage", successMessage);

      // alert(successMessage);
      navigate("/namuna10report");
    } catch (error) { 
      let errorMessage = error.response?.data?.message || error.message || "Unknown error"; 

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);  

      // alert(errorMessage);
    }
  };


  const handleReset = () => {
    setFormData(prevState => ({
      userId: "",
      receiptNo: "",
      bookNo: "",
      shri: "",
      yearRange: "",
      houseNo: "",
      billNo: "",
      date: "",
      taxDetails: prevState.taxDetails?.map(tax => ({
        taxType: tax.taxType,
        previousBalance: "",
        currentBalance: "",
        totalAmount: "",
        total: ""
      })) || [],
    }));
  };
  

  const handleSaveAndAddNew = () => {    
    handleSubmit();                      
    handleReset();           
  };   

  const handleTaxChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedTaxDetails = prevData.taxDetails.map((tax, i) =>
        i === index ? { ...tax, [field]: value === "" ? "" : parseFloat(value) || 0 } : tax
      );
      return { ...prevData, taxDetails: updatedTaxDetails };
    });
  };
  
 
  return (
    <React.Fragment>
        <style>
          {`
             .page-title-right {
                  margin-left: 73%;
                }
          `}
        </style>   
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="कर वसूली पावती नमुना नं. १० नोंद वही"
            pageTitle="फॉर्म"
            className="custom-breadcrumb"
          />
          <Row>  
            <Col lg={12}> 
              <Card>
                <CardBody>
                  <Row className="gy-4">
                    <Col
                      xxl={12}
                      md={12}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h4 className="card-title mb-4">
                         कर वसूली पावती नमुना नं. १० नोंद वही - अद्यतन करा
                        </h4>
                      </div>
                      <div>
                        <Button color="primary" onClick={() => navigate(-1)}>
                          मागे जा
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Row className="gy-4">
                    {[
                        { label: "वापरकर्ता आयडी", id: "userId" }, 
                        { label: "पावती नं", id: "receiptNo" },
                        { label: "बुक नं", id: "bookNo" },
                        { label: "घर क", id: "houseNo" },
                        { label: "बिल क्रमांक", id: "billNo" },
                        { label: "श्री", id: "shri" }, 
                        { label: "वर्ष श्रेणी (पासून - पर्यंत)", id: "yearRange" },
                        { label: "दिनांक", id: "date" },
                    ].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
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

                  {/* Tax Details Section */}     
                  <div className="table-responsive mt-3">  
                    <h1> Tax Details </h1>  
                    <Table bordered striped hover className="text-center align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>कर प्रकार</th>
                          <th>मागील शिल्लक</th>
                          <th>वर्तमान शिल्लक</th>
                          <th>एकूण रक्कम</th>
                          <th>एकूण</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {
                          formData.taxDetails.map((tax, taxIndex) => (
                          <tr key={taxIndex}> 
                            <td>{taxTypeMapping[tax.taxType] || tax.taxType}</td> 
                            <td>
                              <Input
                                type="number"
                                value={tax.previousBalance || ""}
                                onChange={(e) =>
                                  handleTaxChange(taxIndex, "previousBalance", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="number"
                                value={tax.currentBalance || ""}
                                onChange={(e) =>
                                  handleTaxChange(taxIndex, "currentBalance", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="number"
                                value={tax.totalAmount || ""}
                                onChange={(e) =>
                                  handleTaxChange(taxIndex, "totalAmount", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                type="number"
                                value={tax.total || ""}
                                onChange={(e) =>
                                  handleTaxChange(taxIndex, "total", e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div> 

                  <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit} disabled={loading}>
                      {loading ? "अद्यतन करत आहे..." : "अद्यतन करा"}
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => navigate("/namuna10")}
                      style={{ marginLeft: "10px" }}
                    >
                      रद्द करा
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleReset}
                      style={{ marginLeft: "10px" }}
                    >
                      रिसेट करा
                    </Button>
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

export default Namuna10Update;   
