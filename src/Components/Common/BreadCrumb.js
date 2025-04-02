import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle, paths = [] }) => {
  // Split the pageTitle into an array based on " / "
  const breadcrumbParts = pageTitle.split(" / ");

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">{title}</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                {/* Loop through breadcrumb parts and generate links */}
                {breadcrumbParts.map((part, index) => (
                  <li key={index} className="breadcrumb-item">
                    {/* Check if path is available and link to it */}
                    <Link to={paths[index] || "#"}>{part}</Link>
                  </li>
                ))}
                {/* Active breadcrumb part */}
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
