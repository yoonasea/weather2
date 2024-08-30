import React from "react";
import { Box } from "@mui/material";

interface WeatherIconProps {
  icon: string;
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, description }) => {
  return (
    <Box
      sx={{
        width: "70px",
        height: "70px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={{
          width: "140%",
          height: "140%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default WeatherIcon;
