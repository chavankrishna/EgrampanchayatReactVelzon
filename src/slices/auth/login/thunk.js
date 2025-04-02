//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postFakeLogin, postJwtLogin, postSocialLogin } from "../../../helpers/fakebackend_helper";
import axios from "axios";
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from "./reducer";

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (username, password, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure content-type is set
        },
      }
    );

    // Log the full response for debugging
    console.log("Full response from backend:", response);

    // Assuming login success if the response contains token

    var data = await response.data;
    return data;
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = (username, password) => async (dispatch) => {
  try {
    const credentials = { username, password };

    // Call backend API to log out
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      // Remove the token from localStorage after successful logout
      localStorage.removeItem("token");

      // Dispatch success action
      dispatch(logoutUserSuccess(true));
      return true; // Return true to indicate success
    } else {
      // Handle API error
      const error = await response.json();
      dispatch(apiError(error));
      return false;
    }
  } catch (error) {
    // Dispatch general API error
    dispatch(apiError(error));
    return false;
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
    //   response = postSocialLogin(data);
    // }

    const socialdata = await response;
    if (socialdata) {
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history("/dashboard");
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
