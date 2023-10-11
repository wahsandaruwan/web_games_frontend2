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

const Dashboard = () => {
  // Navigation
  const navigate = useNavigate();

  // Http success action state
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Selected date state
  const [SelectedDate, SetSelectedDate] = useState(null);

  // Kpi stats state
  const [KpiStats, SetKpiStats] = useState({});

  // Plays state
  const [Plays, SetPlays] = useState([]);

  // Scores state
  const [Scores, SetScores] = useState([]);

  // Sixes state
  const [Sixes, SetSixes] = useState([]);

  // Runs state
  const [Runs, SetRuns] = useState({
    totalScore: 0,
    totalSixes: 0,
    totalFours: 0,
  });

  console.log(Runs);

  // Gifts state
  const [Gifts, SetGifts] = useState([]);

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

    // Fetch
    HandleKpis();
    HandlePlays();
    HandleGifts();
    HandleScoresAndSixes();
    HandleOverallRuns();

    // Set up an interval to make the API call every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(() => {
      HandleKpis();
      HandlePlays();
      HandleGifts();
      HandleScoresAndSixes();
      HandleOverallRuns();
    }, 300000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Kpis stats fetch
  useEffect(() => {
    HandleKpis();
  }, [SelectedDate]);

  // Handle http responses and errors
  useEffect(() => {
    // When fail
    if (RequestError) {
      alert(RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        if (ResponseData.type == 1) {
          SetKpiStats(ResponseData);
        } else if (ResponseData.type == 2) {
          SetPlays(ResponseData.players);
        } else if (ResponseData.type == 3) {
          SetGifts(ResponseData.gifts);
        } else if (ResponseData.type == 4) {
          SetScores(ResponseData.scores);
          SetSixes(ResponseData.sixes);
        } else if (ResponseData.type == 5) {
          SetRuns({
            totalScore: ResponseData.totalScore,
            totalSixes: ResponseData.totalSixes,
            totalFours: ResponseData.totalFours,
          });
        }
      }
    }
  }, [ResponseData, RequestError]);

  // Function to handle kpis stats fetch
  const HandleKpis = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}kpis/all/stats/KeellsCricket/${SelectedDate}`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to handle plays fetch
  const HandlePlays = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}players/all/playcount/KeellsCricket`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to handle score and six count fetch
  const HandleScoresAndSixes = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}players/all/scoresix/KeellsCricket`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to handle overall runs fetch
  const HandleOverallRuns = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}players/all/runs/KeellsCricket`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to handle gifts fetch
  const HandleGifts = () => {
    // Send request
    SendRequest({
      method: "GET",
      url: `${Urls.baseUrl}gifts/all`,
      headers: {
        "content-type": "application/json",
      },
      data: {},
    });

    SetHttpSuccessAction(1);
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
        padding: "40px 0",
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
        {/* <select
          style={{
            padding: "10px",
            borderRadius: 5,
            fontSize: "0.8rem",
            border: "none",
            backgroundColor: "#eeae47",
            color: "#2c3e50",
            marginRight: 10,
          }}
        >
          <option value="KeellsRugby">Rugby Game</option>
          <option value="KeellsCricket">Cricket Game</option>
        </select> */}
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
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              color: "#000000",
              fontSize: "1.3rem",
              fontWeight: "bold",
              margin: "20px 0px",
            }}
          >
            Key Performance Indicators
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ecf0f1",
              padding: "10px 15px",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                color: "#000000",
                fontSize: "1rem",
                marginRight: "10px",
              }}
            >
              Filter KPIs by Date :
            </div>
            <DatePicker
              value={SelectedDate}
              onChange={(date) => SetSelectedDate(date)}
              minDate={new Date("10/10/2023")}
              maxDate={new Date("12/20/2023")}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : (
            <>
              <CommonCard
                icon="1"
                title="Link Open Count"
                value={KpiStats.linkOpenCount ? KpiStats.linkOpenCount : 0}
              />
              <CommonCard
                icon="1"
                title="Play Count"
                value={KpiStats.playCount ? KpiStats.playCount : 0}
              />
              <CommonCard
                icon="1"
                title="Game Win Count"
                value={KpiStats.gameWinCount ? KpiStats.gameWinCount : 0}
              />
              <CommonCard
                icon="1"
                title="Gift Win Count"
                value={KpiStats.giftWinCount ? KpiStats.giftWinCount : 0}
              />
              <CommonCard
                icon="1"
                title="DB Save Count"
                value={KpiStats.dbSaveCount ? KpiStats.dbSaveCount : 0}
              />
            </>
          )}
        </div>
      </div>
      <div>
        <p
          style={{
            color: "#000000",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "20px 0px",
          }}
        >
          Most Plays
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : Plays.length > 0 ? (
            Plays.map((item, index) =>
              index < 10 ? (
                <CommonCard
                  key={uuid()}
                  icon="2"
                  title={item.phoneNumber ? item.phoneNumber : "Fetching..."}
                  value={item.playCount ? item.playCount : 0}
                />
              ) : null
            )
          ) : (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              No Players Yet!
            </div>
          )}
        </div>
      </div>
      <div>
        <p
          style={{
            color: "#000000",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "20px 0px",
          }}
        >
          Most Scores
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : Scores.length > 0 ? (
            Scores.map((item, index) =>
              index < 10 ? (
                <CommonCard
                  key={uuid()}
                  icon="5"
                  title={item.phoneNumber ? item.phoneNumber : "Fetching..."}
                  value={item.score ? item.score : 0}
                />
              ) : null
            )
          ) : (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              No Players Yet!
            </div>
          )}
        </div>
      </div>
      <div>
        <p
          style={{
            color: "#000000",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "20px 0px",
          }}
        >
          Most Sixes
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : Sixes.length > 0 ? (
            Sixes.map((item, index) =>
              index < 10 ? (
                <CommonCard
                  key={uuid()}
                  icon="6"
                  title={item.phoneNumber ? item.phoneNumber : "Fetching..."}
                  value={item.sixCount ? item.sixCount : 0}
                />
              ) : null
            )
          ) : (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              No Players Yet!
            </div>
          )}
        </div>
      </div>
      <div>
        <p
          style={{
            color: "#000000",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "20px 0px",
          }}
        >
          Overall Runs
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : Runs ? (
            <>
              <CommonCard
                key={uuid()}
                icon="4"
                title="Total Score"
                value={Runs.totalScore}
              />
              <CommonCard
                key={uuid()}
                icon="4"
                title="Total Sixes"
                value={Runs.totalSixes}
              />
              <CommonCard
                key={uuid()}
                icon="4"
                title="Total Fours"
                value={Runs.totalFours}
              />
            </>
          ) : (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              No Runs Yet!
            </div>
          )}
        </div>
      </div>
      <div>
        <p
          style={{
            color: "#000000",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "20px 0px",
          }}
        >
          Available Gifts
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#5cd890",
            padding: "20px 0px",
            borderRadius: 15,
          }}
        >
          {IsLoading ? (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              Fetching Data...
            </div>
          ) : Gifts.length > 0 ? (
            Gifts.map((item, index) =>
              index < 5 ? (
                <CommonCard
                  key={uuid()}
                  icon="3"
                  title={item.giftName ? item.giftName : "Fetching..."}
                  value={item.giftQuantity ? item.giftQuantity : 0}
                />
              ) : null
            )
          ) : (
            <div style={{ color: "#000000", fontSize: "1rem" }}>
              No Gifts Yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
