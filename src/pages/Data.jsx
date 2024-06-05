// ----------Inbuilt components and modules----------
import { useState, useEffect, useContext } from "react";

// ----------Third-party components and modules----------
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// ----------Custom components and modules----------
import { CommonCard } from "../components";
import { UrlContext } from "../contexts";
import { UseHttpRequest } from "../hooks";

const Data = () => {
  // Navigation
  const navigate = useNavigate();

  // Http success action state
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Urls context
  const { Urls } = useContext(UrlContext);

  // Http request custom hook
  const { IsLoading, ResponseData, RequestError, SendRequest } =
    UseHttpRequest();

  // Get user auth status
  const isLoggedIn = localStorage.getItem("user");

  // Kpis stats, plays and gifts fetch
  useEffect(() => {
    if (!isLoggedIn) {
      // Navigate to login
      navigate("/", { replace: true });
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
        window.open(
          "https://k2games.online/downloads/all-players-cricket.xlsx",
          "_blank"
        );
      } else if (HttpSuccessAction == 2) {
        window.open(
          "https://cricket.k2games.online/downloads/all-kpis-cricket.xlsx",
          "_blank"
        );
      }
    }
  }, [ResponseData, RequestError]);

  // Function to get all players
  const HandleGetAllPlayers = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}players/all/KeellsCricket`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to get all kpis
  const HandleGetAllKpis = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}kpis/all/KeellsCricket`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(2);
  };

  // Function to handle logout
  const HandleLogOut = () => {
    localStorage.removeItem("user");
    // Navigate to login
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        width: "80%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#5cd890",
          padding: "20px",
          borderRadius: 15,
          marginTop: 10,
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            fontSize: "0.8rem",
            border: "none",
            backgroundColor: "#ecf0f1",
            color: "#000000",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => HandleGetAllPlayers()}
        >
          Download All Players
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            fontSize: "0.8rem",
            border: "none",
            backgroundColor: "#ecf0f1",
            color: "#000000",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => HandleGetAllKpis()}
        >
          Download All Kpis
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            fontSize: "0.8rem",
            border: "none",
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onClick={() =>
            confirm("You want to logout!") ? HandleLogOut() : null
          }
        >
          Logout
        </button>
      </div>
      {IsLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ marginTop: "20px", color: "#000000", fontSize: "1rem" }}>
            Preparing the file...
          </p>
        </div>
      ) : null}
    </div>
  );
};
export default Data;
