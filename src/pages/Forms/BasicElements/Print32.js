// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Print32() {
//   // State variables
//   const [dataList, setDataList] = useState([]);
//   const [sessionMessage, setSessionMessage] = useState("");

//   // Inline styles for table and other elements
//   const containerStyle = {
//     margin: "41px auto",
//     width: "100%",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     fontSize: "18px",
//     marginBottom: "20px",
//     fontWeight: "bold",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     textAlign: "center",
//   };

//   const thTdStyle = {
//     border: "1px solid black",
//     padding: "10px",
//     fontSize: "14px",
//     maxWidth: "200px", // Set a maximum width for cells
//     wordWrap: "break-word", // Allow long text to wrap to the next line
//     wordBreak: "break-word", // Ensure proper wrapping for long words
//     whiteSpace: "normal", // Enable text to wrap to the next line
//   };

//   const thStyle = {
//     ...thTdStyle,
//     backgroundColor: "#f0f0f0",
//     fontWeight: "bold",
//   };

//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto",
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "16px",
//   };

//   const printAreaStyle = {
//     marginTop: "20px",
//   };

//   useEffect(() => {
//     // Retrieve the token from localStorage and log it
//     const token = localStorage.getItem("token");
//     console.log("Token retrieved from localStorage:", token); // Log the token for debugging

//     // Retrieve and display session message if present
//     const message = sessionStorage.getItem("sessionMessage");
//     if (message) {
//       setSessionMessage(message); // Set the message to display
//       sessionStorage.removeItem("sessionMessage"); // Clear the session message after displaying it
//     }

//     const fetchData = async () => {
//       try {
//         // Log the token to ensure it's available when fetching data
//         console.log("Fetching data with token:", token);

//         // Perform data fetching
//         const response = await axios.post(
//           "http://localhost:8080/rakkampartavya/getAll",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Add token in the Authorization header
//             },
//           }
//         );

//         // Set the fetched data into the state
//         setDataList(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (token) {
//       fetchData(); // Only fetch data if the token is available
//     } else {
//       console.log("No token found, cannot fetch data");
//     }
//   }, []);

//   // Function to handle printing
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Display Session Message */}
//       {sessionMessage && (
//         <div
//           style={{
//             marginBottom: "20px",
//             padding: "10px",
//             backgroundColor: "#dff0d8",
//             color: "#3c763d",
//             border: "1px solid #d6e9c6",
//             borderRadius: "5px",
//           }}
//         >
//           {sessionMessage}
//         </div>
//       )}

//       {/* Table Title */}
//       <h2 style={titleStyle}>C गायकन इसतर शासकीय व खासगी परिषकी परीक्षा सर्ची नोंदणी</h2>

//       {/* Print Button */}
//       <button style={buttonStyle} onClick={handlePrint}>
//         Print
//       </button>

//       {/* Table */}
//       <div id="print-area" style={printAreaStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>आयडी</th> {/* ID Column */}
//               <th style={thStyle}>पावती क्रमांक</th> {/* Pavti Number Column */}
//               <th style={thStyle}>दिलेली मूळ रक्कम दिनांक</th> {/* Original Amount Date */}
//               <th style={thStyle}>रक्कम</th> {/* Amount */}
//               <th style={thStyle}>परत करावयाची रकम</th> {/* Refund Amount */}
//               <th style={thStyle}>ठेवीदाराचे नाव</th> {/* Depositor's Name */}
//               <th style={thStyle}>परतावा करणाऱ्या प्राधिकाऱ्याचे नाव</th> {/* Refunding Officer's Name */}
//               <th style={thStyle}>शेरा</th> {/* Remarks */}
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length > 0 ? (
//               dataList.map((data, index) => (
//                 <tr key={index}>
//                   <td style={thTdStyle}>{data.id}</td> {/* Assuming 'id' is the ID field */}
//                   <td style={thTdStyle}>{data.pavtiNumber}</td> {/* Pavti Number */}
//                   <td style={thTdStyle}>{data.dileliMulRakkamDate}</td> {/* Original Amount Date */}
//                   <td style={thTdStyle}>{data.rakkam}</td> {/* Amount */}
//                   <td style={thTdStyle}>{data.paratKaryachiRakkam}</td> {/* Refund Amount */}
//                   <td style={thTdStyle}>{data.thevidaracheNav}</td> {/* Depositor's Name */}
//                   <td style={thTdStyle}>{data.partavaKarnaryaPradhikaryacheNav}</td> {/* Refunding Officer's Name */}
//                   <td style={thTdStyle}>{data.shera}</td> {/* Remarks */}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" style={thTdStyle}>
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Print32;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Print32() {
  // State variables
  const [dataList, setDataList] = useState([]);

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

  const printAreaStyle = {
    marginTop: "20px",
  };

  useEffect(() => {
    // Retrieve the token from localStorage and log it
    const token = localStorage.getItem("token");
    console.log("Token retrieved from localStorage:", token); // Log the token for debugging

    const fetchData = async () => {
      try {
        // Log the token to ensure it's available when fetching data
        console.log("Fetching data with token:", token);

        // Perform data fetching
        const response = await axios.post(
          "http://localhost:8080/rakkampartavya/getAll",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token in the Authorization header
            },
          }
        );

        // Set the fetched data into the state
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData(); // Only fetch data if the token is available
    } else {
      console.log("No token found, cannot fetch data");
    }
  }, []);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={containerStyle}>
      {/* Table Title */}
      <h2 style={titleStyle}>C गायकन इसतर शासकीय व खासगी परिषकी परीक्षा सर्ची नोंदणी</h2>

      {/* Print Button */}
      <button style={buttonStyle} onClick={handlePrint}>
        Print
      </button>

      {/* Table */}
      <div id="print-area" style={printAreaStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>आयडी</th> {/* ID Column */}
              <th style={thStyle}>पावती क्रमांक</th> {/* Pavti Number Column */}
              <th style={thStyle}>दिलेली मूळ रक्कम दिनांक</th> {/* Original Amount Date */}
              <th style={thStyle}>रक्कम</th> {/* Amount */}
              <th style={thStyle}>परत करावयाची रकम</th> {/* Refund Amount */}
              <th style={thStyle}>ठेवीदाराचे नाव</th> {/* Depositor's Name */}
              <th style={thStyle}>परतावा करणाऱ्या प्राधिकाऱ्याचे नाव</th> {/* Refunding Officer's Name */}
              <th style={thStyle}>शेरा</th> {/* Remarks */}
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((data, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{data.id}</td> {/* Assuming 'id' is the ID field */}
                  <td style={thTdStyle}>{data.pavtiNumber}</td> {/* Pavti Number */}
                  <td style={thTdStyle}>{data.dileliMulRakkamDate}</td> {/* Original Amount Date */}
                  <td style={thTdStyle}>{data.rakkam}</td> {/* Amount */}
                  <td style={thTdStyle}>{data.paratKaryachiRakkam}</td> {/* Refund Amount */}
                  <td style={thTdStyle}>{data.thevidaracheNav}</td> {/* Depositor's Name */}
                  <td style={thTdStyle}>{data.partavaKarnaryaPradhikaryacheNav}</td> {/* Refunding Officer's Name */}
                  <td style={thTdStyle}>{data.shera}</td> {/* Remarks */}
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
    </div>
  );
}

export default Print32;
