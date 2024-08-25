// src/components/GoogleCallbackHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      // Store the token in sessionStorage
      sessionStorage.setItem("authToken", token);
      // Redirect to the dashboard or home page
      navigate("/");
    } else {
      // Handle error or redirect to login if no token found
      navigate("/");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallbackHandler;
