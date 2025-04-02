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
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // <-- Added useLocation here
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import "../BasicElements/style.css";

const Update21 = () => {
  const { state } = useLocation(); // Access the passed record data from the previous page
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state && formData.grampanchyatId) {
      const fetchRecord = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/mojmaapWahi/getById/${formData.id}`
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Error fetching record");
        }
      };
      fetchRecord();
    }
  }, [state, formData.id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newValue = value ? parseFloat(value) : 0;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: value };

      // Calculate product for `mojmapachaTapshilEkun`
      if (
        id === "mojmapachaTapshilLaambi" ||
        id === "mojmapachaTapshilRundi" ||
        id === "mojmapachaTapshilKholiUnchi"
      ) {
        const laambi = parseFloat(newFormData.mojmapachaTapshilLaambi) || 0;
        const rundi = parseFloat(newFormData.mojmapachaTapshilRundi) || 0;
        const kholiUnchi =
          parseFloat(newFormData.mojmapachaTapshilKholiUnchi) || 0;
        newFormData.mojmapachaTapshilEkun = (
          laambi *
          rundi *
          kholiUnchi
        ).toString();
      }

      // Calculate sum for `ekunMojmapachaTapshilEkunVaEkunParimanMaap`
      const mojmapachaTapshilEkun =
        parseFloat(newFormData.mojmapachaTapshilEkun) || 0;
      const ekunParimanMaap =
        parseFloat(
          newFormData.ekunParimanMaapPurvicheHajeriPramaneWarnanKarave
        ) || 0;
      newFormData.ekunMojmapachaTapshilEkunVaEkunParimanMaap = (
        mojmapachaTapshilEkun + ekunParimanMaap
      ).toString();

      return newFormData;
    });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "remark",
      "year",
      "kamachePratyakshaMojmap",
      "kamkarnayaAgencyAbhikanacheNaaw",
      "kamacheWarnan",
      "mojmap",
      "kamacheWarnanKamacheUpashirshVaKshetracheAdhikari",
      "mojmapachaTapshilPariman",
      "mojmapachaTapshilLaambi",
      "mojmapachaTapshilRundi",
      "mojmapachaTapshilKholiUnchi",
      "mojmapachaTapshilEkun",
      "ekunParimanMaapPurvicheHajeriPramaneWarnanKarave",
      "ekunMojmapachaTapshilEkunVaEkunParimanMaap",
      "dar",
      "rakkam",
    ];

    if (
      !requiredFields.every(
        (field) => formData[field] && formData[field].trim() !== ""
      )
    ) {
      alert("कृपया सर्व आवश्यक क्षेत्रे भरा");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/mojmaapWahi/updateById/${formData.id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Save success message in sessionStorage
      const successMessage = "माहिती यशस्वीरीत्या अद्यतन केली गेली आहे"; // Marathi message
      sessionStorage.setItem("sessionMessage", successMessage);

      // alert(successMessage);
      navigate("/report-details");
    } catch (error) {
      let errorMessage =
        "Failed to submit data: " +
        (error.response?.data?.message || "Unknown error");

      // Save error message in sessionStorage
      sessionStorage.setItem("sessionMessage", errorMessage);

      // alert(errorMessage);
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      employeeId: "",
      employeeName: "",
      grampanchayatId: "",
      grampanchayatName: "",
      createdDate: "",
      updatedDate: "",
      remark: "",
      year: "",
      kamachePratyakshaMojmap: "",
      kamkarnayaAgencyAbhikanacheNaaw: "",
      kamacheWarnan: "",
      mojmap: "",
      kamacheWarnanKamacheUpashirshVaKshetracheAdhikari: "",
      mojmapachaTapshilPariman: "",
      mojmapachaTapshilLaambi: "",
      mojmapachaTapshilRundi: "",
      mojmapachaTapshilKholiUnchi: "",
      mojmapachaTapshilEkun: "",
      ekunParimanMaapPurvicheHajeriPramaneWarnanKarave: "",
      ekunMojmapachaTapshilEkunVaEkunParimanMaap: "",
      dar: "",
      rakkam: "",
    });
  };

  const handleSaveAndAddNew = () => {
    handleSubmit();
    handleReset();
  };

  function generateYearOptions(startYear, count) {
    const options = [];
    for (let i = 0; i < count; i++) {
      const currentYear = startYear - i;
      const nextYear = currentYear + 1;
      options.push(
        `${currentYear}-${nextYear}`.replace(/\d/g, (d) => "०१२३४५६७८९"[d])
      );
    }
    return options;
  }

  // Example: Generate last 100 years from 2024
  const yearOptions = generateYearOptions(2024, 100);

  console.log(yearOptions);

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="नमुना २१ - मोजमाप वही"
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
                          मोजमाप वही - अद्यतन करा
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
                      {
                        label: "कामाचे प्रत्यक्ष मोजमाप",
                        id: "kamachePratyakshaMojmap",
                      },
                      {
                        label: "काम करणाऱ्या अभिकरणाचे नाव",
                        id: "kamkarnayaAgencyAbhikanacheNaaw",
                      },
                      { label: "कामाचे वर्णन", id: "kamacheWarnan" },
                      { label: "मोजमाप", id: "mojmap" },
                      {
                        label: "कामाचे वर्णन व कामाचे उपशीर्षक",
                        id: "kamacheWarnanKamacheUpashirshVaKshetracheAdhikari",
                      },
                      {
                        label: "मोजमापाचा तपशील परिमाण",
                        id: "mojmapachaTapshilPariman",
                      },
                      {
                        label: "मोजमापाचा तपशील लांबी",
                        id: "mojmapachaTapshilLaambi",
                      },
                      {
                        label: "मोजमापाचा तपशील रुंदी",
                        id: "mojmapachaTapshilRundi",
                      },
                      {
                        label: "मोजमापाचा तपशील खोली उंची",
                        id: "mojmapachaTapshilKholiUnchi",
                      },
                      {
                        label: "मोजमापाचा तपशील एकूण",
                        id: "mojmapachaTapshilEkun",
                      },
                      {
                        label: "एकूण परिमाण माप पूर्वीचे हजर प्रामाणे",
                        id: "ekunParimanMaapPurvicheHajeriPramaneWarnanKarave",
                      },
                      {
                        label: "एकूण मोजमापाचा तपशील एकूण",
                        id: "ekunMojmapachaTapshilEkunVaEkunParimanMaap",
                      },
                      { label: "दर", id: "dar" },
                      { label: "रक्कम", id: "rakkam" },
                      {
                        label: "वर्ष",
                        id: "year",
                        type: "select",
                        options: yearOptions,
                      },
                      {
                        label: "शेरा",
                        id: "remark",
                        type: "textarea",
                        rows: 4,
                      }, // Updated field
                    ].map((field, index) => (
                      <Col key={index} xxl={3} md={3}>
                        <div>
                          <Label htmlFor={field.id} className="form-label">
                            {field.label}
                          </Label>
                          {field.type === "select" ? (
                            <Input
                              type="select"
                              id={field.id}
                              className="form-control"
                              value={formData[field.id] || ""}
                              onChange={handleInputChange}
                            >
                              {field.options.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Input>
                          ) : field.type === "textarea" ? (
                            <Input
                              type="textarea"
                              id={field.id}
                              className="form-control"
                              rows={field.rows}
                              value={formData[field.id] || ""}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <Input
                              type="text"
                              id={field.id}
                              className="form-control"
                              value={formData[field.id] || ""}
                              onChange={handleInputChange}
                            />
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-start" style={{ marginTop: "20px" }}>
                    <Button color="success" onClick={handleSubmit}>
                      अद्यतन करा
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => navigate("/form-details")}
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

export default Update21;
