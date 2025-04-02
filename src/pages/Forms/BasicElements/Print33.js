import React, { useState, useEffect } from "react";
import axios from "axios";

function Print33() {
  // State variables
  const [dataList, setDataList] = useState([]);
  const [sessionMessage, setSessionMessage] = useState("");

  // Inline styles for table and other elements
  const containerStyle = {
    margin: "41px auto",
    width: "100%",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "18px",
    marginBottom: "20px",
    fontWeight: "bold",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  };

  const thTdStyle = {
    border: "1px solid black",
    padding: "10px",
    fontSize: "14px",
    maxWidth: "200px", // Set a maximum width for cells
    wordWrap: "break-word", // Allow long text to wrap to the next line
    wordBreak: "break-word", // Ensure proper wrapping for long words
    whiteSpace: "normal", // Enable text to wrap to the next line
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  };

  const buttonStyle = {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  useEffect(() => {
    // Display session message if it exists
    const message = sessionStorage.getItem("sessionMessage");
    if (message) {
      setSessionMessage(message); // Set the message to display
      sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
    }

    // Fetch data from the API
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token Inside Report : ", token);
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.post(
          "http://localhost:8080/Namuna33VrukshNondViha/getall",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the Bearer token
            },
          }
        );

        setDataList(response.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);

        // Optionally, you can set an error message to display on the UI
        setSessionMessage("डेटा मिळविण्यात त्रुटी आली आहे. कृपया नंतर पुन्हा प्रयत्न करा.");
      }
    };

    fetchData();
  }, []);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={containerStyle}>
      {/* Display Session Message */}
      {sessionMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            border: "1px solid #d6e9c6",
            borderRadius: "5px",
          }}
        >
          {sessionMessage}
        </div>
      )}

      {/* Table Title */}
      <h2 style={titleStyle}>C-गायन गायकन इतर शासकीय व खाजगी पदांतील परीक्षक सूची नोंदणी</h2>

      {/* Table */}
      <div id="print-area">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>अनुक्रमांक</th>
              <th style={thStyle}>नाव</th>
              <th style={thStyle}>वृक्ष क्रमांक C ते C</th>
              <th style={thStyle}>वृक्ष प्रकार</th>
              <th style={thStyle}>वृक्ष जोपासनेधी जबाबदारी</th>
              <th style={thStyle}>दिनांक</th>
              <th style={thStyle}>शेरा</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((data, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={thTdStyle}>{data.naav}</td>
                  <td style={thTdStyle}>{data.vrukshkrmank}</td>
                  <td style={thTdStyle}>{data.vrukshprakar}</td>
                  <td style={thTdStyle}>{data.vrukshjopasnechijababdari}</td>
                  <td style={thTdStyle}>{data.date}</td>
                  <td style={thTdStyle}>{data.shera}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={thTdStyle}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <button style={buttonStyle} onClick={handlePrint} id="print-button">
        Print
      </button>

      {/* CSS for hiding the print button when printing */}
      <style>
        {`
          @media print {
            #print-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Print33;
