import React from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import WeatherIcon from "./WeatherIcon";
import { capitalizeWords, formatTemperature } from "../utils";

interface WeatherDisplayProps {
  weatherData: {
    temp: number;
    humidity: number;
    weather: { description: string; icon: string }[];
  };
  currentCity: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  currentCity,
}) => {
  const theme = useTheme();
  const { temp, humidity, weather } = weatherData;
  const currentDate = moment().format("DD MMM YYYY | h.mmA");
  // Use media queries to determine the current breakpoint
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const Temp = () => {
    return <Typography variant="h1">{formatTemperature(temp)}</Typography>;
  };
  const Desc = () => {
    return (
      <Typography variant="body1">
        {capitalizeWords(weather[0].description)}
      </Typography>
    );
  };
  const TempHL = () => {
    return <Typography variant="body1">H : L</Typography>;
  };
  const Humidity = () => {
    return <Typography variant="body1">{`Humidity: ${humidity}%`}</Typography>;
  };
  const City = () => {
    return (
      <Typography variant="body1">{capitalizeWords(currentCity)}</Typography>
    );
  };
  const Timestamp = () => {
    return <Typography variant="body1">{currentDate} </Typography>;
  };

  return (
    <Box
      // textAlign="center"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        borderRadius: 1,
        padding: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <Typography variant="body1">Today's Weather</Typography>
        {isXs && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'flex-end' }}>
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

      <Box display="flex" justifyContent="center">
        <WeatherIcon
          icon={weather[0].icon}
          description={weather[0].description}
        />
      </Box>
    </Box>
  );
};

export default WeatherDisplay;
