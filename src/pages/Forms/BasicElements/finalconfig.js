// src/BasicElements/config1.js

export const setSessionMessage = (type, message) => {
  // Store both type (success/error) and message in sessionStorage
  sessionStorage.setItem("messageType", type);
  sessionStorage.setItem("message", message);
};

export const getSessionMessage = () => {
  // Retrieve message and type from sessionStorage
  const messageType = sessionStorage.getItem("messageType");
  const message = sessionStorage.getItem("message");

  // Clear message from sessionStorage after reading
  sessionStorage.removeItem("messageType");
  sessionStorage.removeItem("message");

  return { messageType, message };
};
