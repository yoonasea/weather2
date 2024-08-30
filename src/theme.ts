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
});

export default theme;
