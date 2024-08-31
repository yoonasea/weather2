// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f43c7",
    },
  },
  typography: {
    h1: {
      lineHeight: 1,
      color: "#6f43c7",
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
          backgroundColor: '#ccb1e3',
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#6f43c7',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#6f43c7',
          borderRadius: '10px',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#ccb1e3 #6f43c7',
        },
        '::-webkit-scrollbar-button': {
          display: 'none',
        },
      },
    },
  },
});

export default theme;
