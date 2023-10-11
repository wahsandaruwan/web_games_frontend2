// ----------Inbuilt components and modules----------
import { useState, useEffect, useContext } from "react";

// ----------Third-party components and modules----------
import { useNavigate } from "react-router-dom";

// ----------Custom components and modules----------
import { UrlContext } from "../contexts";
import { UseHttpRequest } from "../hooks";
import { ValidateForm } from "../validations";

const Login = () => {
  // Navigation
  const navigate = useNavigate();

  // Http success action state
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Login data state
  const [LoginData, setLoginData] = useState({
    emailAddress: "",
    password: "",
  });

  // Urls context
  const { Urls } = useContext(UrlContext);

  // Http request custom hook
  const { IsLoading, ResponseData, RequestError, SendRequest } =
    UseHttpRequest();

  // Check the user login
  useEffect(() => {
    if (localStorage.getItem("user")) {
      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    }
  }, []);

  // Handle http responses and errors
  useEffect(() => {
    // When fail
    if (RequestError) {
      alert(RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        alert(ResponseData.success.message);
        localStorage.setItem("user", true);

        // Navigate to dashboard
        navigate("/dashboard", { replace: true });
      }
    }
  }, [ResponseData, RequestError]);

  // Function to handle login
  const HandleLogin = () => {
    // Validate form inputs
    const formError = ValidateForm(LoginData);

    if (formError) {
      alert(formError);
      return;
    }

    // Send request
    SendRequest({
      method: "POST",
      url: `${Urls.baseUrl}users/login`,
      headers: {
        "content-type": "application/json",
      },
      data: LoginData,
    });

    SetHttpSuccessAction(1);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "300px",
          backgroundColor: "#eeae47",
          padding: "20px",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            marginBottom: 5,
            color: "#2c3e50",
          }}
        >
          Login
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 10,
              borderRadius: 5,
              border: "none",
              color: "#000000",
              fontSize: "0.8rem",
            }}
            type="text"
            placeholder="Enter your email..."
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                emailAddress: e.target.value,
              }))
            }
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 10,
              borderRadius: 5,
              border: "none",
              color: "#000000",
              fontSize: "0.8rem",
            }}
            type="password"
            placeholder="Enter your password..."
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <button
            style={{
              width: "100%",
              padding: "10px 20px",
              marginTop: 10,
              borderRadius: 5,
              fontSize: "0.8rem",
              border: "none",
              backgroundColor: "#2c3e50",
              color: "#ecf0f1",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onClick={() => HandleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
