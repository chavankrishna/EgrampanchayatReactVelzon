import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useProfile } from "../Components/Hooks/UserHooks";
import { logoutUser } from "../slices/auth/login/thunk";
import { useDispatch } from "react-redux";
const AuthProtected = (props) => {
  const { userProfile, loading, token } = useProfile(); // Assumes this hook manages profile and token
  const [username, setUsername] = useState("Admin"); // Default username is 'Admin'
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state is null to represent "loading"
  const dispatch = useDispatch();
  // Check token in localStorage when component mounts
  useEffect(() => {
    const data = localStorage.getItem("token");   
    console.log(data);
    if (data) {
      // If token found, set the authorization header
      setAuthorization(data);

      // Retrieve the user data (username) from localStorage or userProfile
      const user = JSON.parse(localStorage.getItem("authUser"));
      if (user) {
        setUsername(user.username || user.first_name || "Admin"); // Fallback to 'Admin' if no username or first name
      }

      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Loading state while determining authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to the login page
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected content
  return (
    <div>
      <h2>Welcome, {username}!</h2> {/* Display username here */}
      {props.children} {/* Render the protected content */}
    </div>
  );
};
const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
