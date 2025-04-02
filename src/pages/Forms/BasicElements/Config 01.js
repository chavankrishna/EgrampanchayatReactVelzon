// config.js
// const api = {
//     baseUrl: 'http://localhost:8080/api',  // Your backend base URL for API calls
//   };
const setSessionMessage = (type, message) => {
    // Store the message type (success or error) and content in sessionStorage
    sessionStorage.setItem('messageType', type);
    sessionStorage.setItem('messageContent', message);
};

const getSessionMessage = () => {
    // Retrieve message type and content from sessionStorage
    const type = sessionStorage.getItem('messageType');
    const message = sessionStorage.getItem('messageContent');

    // Clear the message from sessionStorage after retrieving
    sessionStorage.removeItem('messageType');
    sessionStorage.removeItem('messageContent');

    return { type, message };
};

export { setSessionMessage, getSessionMessage };