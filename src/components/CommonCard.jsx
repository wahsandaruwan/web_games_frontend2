import * as SolidIcons from "@heroicons/react/24/solid";
import { truncateString, addLeadingZero } from "../helpers";

const CommonCard = ({ icon, title, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#ecf0f1",
        flexBasis: "19%",
        borderRadius: 10,
        padding: 20,
      }}
      className="common-card"
    >
      <div
        style={{
          color: "#000000",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {truncateString(title, 20)}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50px", height: "50px" }}>
          {icon == "1" ? (
            <SolidIcons.PresentationChartLineIcon
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
          {icon == "2" ? (
            <SolidIcons.PlayCircleIcon
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
          {icon == "3" ? (
            <SolidIcons.GiftIcon style={{ width: "100%", height: "100%" }} />
          ) : null}
          {icon == "4" ? (
            <SolidIcons.ChartBarSquareIcon
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
          {icon == "5" ? (
            <SolidIcons.FireIcon style={{ width: "100%", height: "100%" }} />
          ) : null}
          {icon == "6" ? (
            <SolidIcons.FlagIcon style={{ width: "100%", height: "100%" }} />
          ) : null}
        </div>
        <div
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          {addLeadingZero(value)}
        </div>
      </div>
    </div>
  );
};
export default CommonCard;
