import React,{ ReactNode } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { WeatherDisplayProps } from "../interfaces";
import { capitalizeWords, formatTemperature } from "../utils";
interface WeatherRowProps {
  children: ReactNode;
}
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  currentCity,
}) => {
  const theme = useTheme();
  const { temp, temp_min, temp_max, humidity, weather } = weatherData;
  const currentDate = moment().format("DD MMM YYYY | h.mmA");
  // Use media queries to determine the current breakpoint
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmAndUp = useMediaQuery(theme.breakpoints.up("sm"));

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

  const WeatherRow = ({ children }: WeatherRowProps) => (
    <Grid container justifyContent="space-between" alignItems="flex-end">
      {children}
    </Grid>
  );

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
          <WeatherRow>
            <Temp /> <Desc />
          </WeatherRow>
          <WeatherRow>
            <TempHL /> <Humidity />
          </WeatherRow>
          <WeatherRow>
            <City /> <Timestamp />
          </WeatherRow>
        </div>
      )}
      {isSmAndUp && (
        <div>
          <WeatherRow>
            <Temp />
          </WeatherRow>
          <WeatherRow>
            <TempHL />
          </WeatherRow>
          <WeatherRow>
            <City /> <Timestamp /> <Humidity /> <Desc />
          </WeatherRow>
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
