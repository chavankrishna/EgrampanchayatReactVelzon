import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const Namuna18View2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state; // Access the passed data

  if (!record) {
    return <p>No data available</p>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="किरकोळ रोकड वही" pageTitle="डेटा पहा" className="custom-breadcrumb" />
          <Row className="gy-4">
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row className="mb-4">
                    <Col className="d-flex justify-content-between align-items-center">
                      <h5>डेटा पहा</h5>
                      <Button color="primary" onClick={() => navigate(-1)}>
                        मागे जा
                      </Button>
                    </Col>
                  </Row>
                  <Table bordered responsive className="table-custom">
                    <tbody>
                      <tr>
                        <th>खर्च तारीख</th>
                        <td>{record.kharchTarikh}</td>
                      </tr>
                      <tr>
                        <th>खर्च तपशील</th>
                        <td>{record.kharchTapshil}</td>
                      </tr>
                      <tr>
                        <th>कोणास रक्कम दिली</th>
                        <td>{record.konasRakkamDili}</td>
                      </tr>
                      <tr>
                        <th>खर्च रक्कम </th>
                        <td>{record.kharchRakkam}</td>
                      </tr>
                      <tr>
                        <th>अग्रिमातून खर्च </th>
                        <td>{record.agrimatunKharch}</td>
                      </tr>
                      <tr>
                        <th>खर्च एकूण</th>
                        <td>{record.kharchEkun}</td>
                      </tr>
                      <tr>
                        <th>वर्ष</th>
                        <td>{record.kharchYear}</td>
                      </tr>

                      {/* <tr>
                                                <th>जमा एकूण </th>
                                                <td>{record.year}</td>
                                            </tr> */}
                      <tr>
                        <th>शेरा </th>
                        <td>{record.kharchShera}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Namuna18View2;