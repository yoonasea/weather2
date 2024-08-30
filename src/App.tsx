import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Alert,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import { WeatherData } from "./interfaces";

const API_KEY = process.env.REACT_APP_API_KEY;
const SG = "Singapore";

const theme = createTheme({
  typography: {
    h1: {
      lineHeight: 1,
      color: "purple"
      // marginBottom: 0,
      // fontWeight: 200,
    },
    // h5: {
    //   fontWeight: 300,
    // },
  },
});

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>(SG);
  const [history, setHistory] = useState<string[]>(() => {
    // Initialize history from localStorage
    const storedHistory = localStorage.getItem("searchHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  // Fetch weather data
  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const [weatherResponse] = await Promise.all([axios.get(weatherApiUrl)]);

      const weather = weatherResponse.data;

      setWeatherData({
        temp: weather.main.temp,
        temp_min: weather.main.temp_min,
        temp_max: weather.main.temp_max,
        humidity: weather.main.humidity,
        weather: weather.weather,
      });

      setLoading(false);

      const updatedHistory = [city, ...history.filter((h) => h !== city)];
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch {
      setError("Invalid country or city.");
      setWeatherData(null);
      setLoading(false);
    }
  };

  // Fetch Singapore data on initial load
  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity]);

  const handleSearch = () => {
    if (searchQuery) {
      setCurrentCity(searchQuery);
      fetchWeatherData(searchQuery);
    }
  };

  const handleHistoryDelete = (cityToDelete: string) => {
    const updatedHistory = history.filter((h) => h !== cityToDelete);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          height: "100vh",
          backgroundImage: "url(/bg-light.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* search component */}
        <Box display="flex" alignItems="center">
          <Autocomplete
            freeSolo
            options={history}
            value={searchQuery}
            onChange={(event, newValue) => {
              setSearchQuery(newValue || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter city"
                fullWidth
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    transform: "none", // Ensure label does not float
                  },
                }}
              />
            )}
            onInputChange={(event, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            renderOption={(props, option) => {
              const { key, ...restProps } = props;
              const isDeletable = option !== SG;
              return (
                <li key={key} {...restProps}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography variant="body2" flexGrow={1}>
                      {option}
                    </Typography>
                    <IconButton
                      size="small"
                      edge="end"
                      color="inherit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHistoryDelete(option);
                      }}
                      disabled={!isDeletable}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </li>
              );
            }}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <IconButton
            onClick={handleSearch}
            color="primary"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              borderRadius: 1,
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {/* error component */}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!error && weatherData && (
              <WeatherDisplay
                weatherData={weatherData}
                currentCity={currentCity}
              />
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
