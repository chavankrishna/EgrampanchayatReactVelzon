// UpdatePage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Table, Button, Card, CardBody, Col, Container, Label, Row, Form, ModalFooter, FormGroup } from "reactstrap";

import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

const View17 = () => {
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
    // If no state was passed (direct access to this page), fetch record by ID
    if (record.id) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/api/guntonukNamuna25/getById/${record.id}`);
          setRecord(response.data);
          console(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, record.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post(`http://localhost:8080/api/guntonukNamuna25/update/${record.id}`, record);

      // Check if the update was successful
      if (response.status === 200) {
        alert("Record updated successfully");
        navigate("/report"); // Navigate back to the report page after successful update
      }
    } catch (err) {
      setLoading(false);
      // Detailed error handling
      if (err.response) {
        // Server responded with a status code different from 2xx
        setError(`Error: ${err.response.data.message || "Error updating record"}`);
      } else if (err.request) {
        // Request was made but no response was received
        setError("Error: No response from server");
      } else {
        // Something else triggered the error
        setError(`Error: ${err.message}`);
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
    return `${day}-${month}-${year}`;
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
      <div className="page-content" style={{ backgroundColor: "#fbf7f4" }}>
        <Container fluid>
          <BreadCrumb title="गुंतवणूक वही" pageTitle="Forms" />
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="गुंतवणूक वही" buttonLabel="अहवाल" onButtonClick={() => navigate("/report")} />
                <CardBody className="card-body">
                  <div className="live-preview">
                    <Form onSubmit={handleSubmit}>
                      <Table bordered responsive className="table-custom">
                        <tbody>
                          <tr>
                            <th>कर्मचारी आयडी</th>
                            <td>{record.id}</td>
                          </tr>
                          <tr>
                            <th>गुंतवणुकीची तारीख</th>
                            <td>{formatDate(record.guntonukiciTarikha)}</td>
                          </tr>
                          <tr>
                            <th>गुंतवणुकीचा तपशील(बँकेत मुदत ठेव)</th>
                            <td>{record.guntonukiciTapisila}</td>
                          </tr>
                          <tr>
                            <th>गुंतवणुकीची रक्कम दर्शनी मूल्य</th>
                            <td>{record.guntonukichiRakamDarsaniMulya}</td>
                          </tr>
                          <tr>
                            <th>परिणत होण्याची तारीख</th>
                            <td>{formatDate(record.pranitHonachiTarkhi)}</td>
                          </tr>
                          <tr>
                            <th>गुंतवणुकीची रक्कम खरेदी किंमत</th>
                            <td>{record.guntonukichiRakamKharēdīKimata}</td>
                          </tr>
                          <tr>
                            <th>निव्वळ देय रक्कम</th>
                            <td>{record.nivalDyaRakam}</td>
                          </tr>
                          <tr>
                            <th>उपार्जित व्याजाची तारीख</th>
                            <td>{formatDate(record.uparichitVachanchiTarakhi)}</td>
                          </tr>
                          <tr>
                            <th>बदलीचा/पदोन्नतीचा दिनांक</th>
                            <td>{formatDate(record.badlichaPadrothrichaDinaka)}</td>
                          </tr>
                          <tr>
                            <th>दैनिक रोकड वहीतील जमा रक्कम</th>
                            <td>{record.dainikRokadBahithilJamaRakam}</td>
                          </tr>
                          <tr>
                            <th>प्रक्रांतीचा तपशील</th>
                            <td>{record.prakritischiTapasni}</td>
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

export default View17;
