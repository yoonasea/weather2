import { createTheme } from "@mui/material/styles";

// Define color constants
const PRIMARY_MAIN = "#6f43c7";
const SECONDARY_MAIN = "#ccb1e3";

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
    },
    secondary: {
      main: SECONDARY_MAIN,
    },
  },
  typography: {
    h1: {
      lineHeight: 1,
      color: PRIMARY_MAIN,
    },
    body1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: SECONDARY_MAIN,
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: PRIMARY_MAIN,
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: PRIMARY_MAIN,
          borderRadius: '10px',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${SECONDARY_MAIN} ${PRIMARY_MAIN}`,
        },
        '::-webkit-scrollbar-button': {
          display: 'none',
        },
      },
    },
  },
});

export default theme;
