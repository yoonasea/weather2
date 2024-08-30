import React from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { WeatherDisplayProps } from "../interfaces";
import { capitalizeWords, formatTemperature } from "../utils";

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  currentCity,
}) => {
  const theme = useTheme();
  const { temp, temp_min, temp_max, humidity, weather } = weatherData;
  const currentDate = moment().format("DD MMM YYYY | h.mmA");
  // Use media queries to determine the current breakpoint
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const Temp = () => {
    return <Typography variant="h1">{formatTemperature(temp)}</Typography>;
  };
  const Desc = () => {
    return (
      <Typography variant="body2">
        {capitalizeWords(weather[0].description)}
      </Typography>
    );
  };
  const TempHL = () => {
    return (
      <Typography variant="body2">
        H: {formatTemperature(temp_max)} | L: {formatTemperature(temp_min)}
      </Typography>
    );
  };
  const Humidity = () => {
    return <Typography variant="body2">{`Humidity: ${humidity}%`}</Typography>;
  };
  const City = () => {
    return (
      <Typography variant="body1">{capitalizeWords(currentCity)}</Typography>
    );
  };
  const Timestamp = () => {
    return <Typography variant="body2">{currentDate} </Typography>;
  };

  return (
    <Box
      mt={10}
      sx={{
        padding: 2,
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <Typography variant="body1">Today's Weather</Typography>
        {isXs && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Temp /> <Desc />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TempHL /> <Humidity />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <City /> <Timestamp />
            </div>
          </div>
        )}
        {isSm && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Temp />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TempHL />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <City /> <Timestamp /> <Humidity /> <Desc />
            </div>
          </div>
        )}
      </div>

      <Box
        display="flex"
        justifyContent="center"
        sx={{
          position: "absolute",
          top: -100,
          right: 0,
          width: 180,
          height: "auto",
        }}
      >
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default WeatherDisplay;
