import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Table, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter, FormGroup } from "reactstrap";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import UiContent from "../../../Components/Common/UiContent";

const Namuna13View = () => {
  const { state } = useLocation(); // Access the passed record data from the previous page
  const navigate = useNavigate();

  const [record, setRecord] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("record", record);
  console.log("id", 99, record.id);
  useEffect(() => {
    console.log(state, record.id);
    const data = { state, id: record.id };
    console.log(data);

    // If record ID exists, fetch the record by ID
    if (record.id) {
      const fetchRecord = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found");
            return;
          }
          const response = await axios.post(
            `http://localhost:8080/karmachari-varg-wetan-shreni/get_by_id/${record.id}`,
            {}, // Request body (empty in this case)
            {
              headers: {
                Authorization: ` Bearer ${token}`, // Pass the token in the headers
              },
            }
          ); // Use backticks for template literal
          setRecord(response.data);
          console.log(response.data); // Corrected typo from console(response.data)
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, record.id]); // Dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        ` http://localhost:8080/karmachari-varg-wetan-shreni/update_by_id/${record.id}`,
        record, // Request body, sending 'record' data
        {
          headers: {
            Authorization: ` Bearer ${token} `, // Pass the token in the headers
          },
        }
      );
      // Use backticks for the URL

      // Check if the update was successful
      if (response) {
        alert("Record updated successfully");
        navigate("/report"); // Navigate back to the report page after successful update
      }
    } catch (err) {
      setLoading(false);
      // Detailed error handling
      if (err.response) {
        // Server responded with a status code different from 2xx
        setError(`Error: ${err.response.data.message || "Error updating record"}`); // Use backticks for template literal
      } else if (err.request) {
        // Request was made but no response was received
        setError("Error: No response from server");
      } else {
        // Something else triggered the error
        setError(`Error: ${err.message}`); // Use backticks for template literal
      }
      console.error("Error updating record:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
    return `${day}-${month}-${year}`; // Use backticks for template literal
  };

  const PreviewCardHeader = ({ title, buttonLabel, onButtonClick }) => (
    <div className="card-header d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{title}</h5>
      <Button color="primary" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </div>
    );
    const breadcrumbTitle = "डेटा पहा"; // This could be dynamic
    const breadcrumbPageTitle = "डॅशबोर्ड / अहवाल-१३ "; // Dynamic page title

    const breadcrumbPaths = [
      "/dashboard", // Path for "डॅशबोर्ड"
      "/नमुना-१३-अहवाल",
    ];
  return (
    <React.Fragment>
      <style>
        {`
                    .page-title-right {
                        margin-left: 82%;
                    }
                `}
                
      </style>
      <UiContent />
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title={breadcrumbTitle} pageTitle={breadcrumbPageTitle} paths={breadcrumbPaths} />
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="गुंतवणूक वही" buttonLabel="अहवाल" onButtonClick={() => navigate("/नमुना-१३-अहवाल")} />
                <CardBody className="card-body">
                  <div className="live-preview">
                    <Form onSubmit={handleSubmit}>
                      <Table bordered responsive className="table-custom">
                        <tbody>
                          <tr>
                            <th>पदनाम</th>
                            <td>{record.padnaam}</td>
                          </tr>
                          <tr>
                            <th>पदांची संख्या</th>
                            <td>{record.padanchiSankhya}</td>
                          </tr>
                          <tr>
                            <th>मंजूर पद आदेश क्रमांक</th>
                            <td>{record.manjurPadAdeshKramank}</td>
                          </tr>
                          <tr>
                            <th>मंजूर पद आदेश दिनांक</th>
                            <td>{record.manjurPadAdeshDinank}</td>
                          </tr>
                          <tr>
                            <th>पूर्णकालिक/अंशकालिक</th>
                            <td>{record.purnakalikAnshkalik}</td>
                          </tr>
                          <tr>
                            <th>मंजूर वेतन श्रेणी</th>
                            <td>{record.manjurWetanShreni}</td>
                          </tr>
                          <tr>
                            <th>कर्मचाऱ्याचे नाव</th>
                            <td>{record.karmacharyacheNaav}</td>
                          </tr>
                          <tr>
                            <th> नियुक्ती दिनांक</th>
                            <td>{formatDate(record.niyuktiDinank)}</td>
                          </tr>

                          <tr>
                            <th>शेरा</th>
                            <td>{record.remark}</td>
                          </tr>
                          <tr>
                            <th>महिना</th>
                            <td>{record.year}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Form>
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

export default Namuna13View;
