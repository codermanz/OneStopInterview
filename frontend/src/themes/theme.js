import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  Typography: {
    color: "#FFFFF",
  },
  common: {
    bgColor: "#151517",
    lightGray: "#121212",
  },
  palette: {
    primary: {
      main: "#FFFFF",
      light: "#C4DCFF",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    mode: "dark",
  },
  Button: {
    textTransform: "none",
  },
  TextField: {
    color: "#FFFFF",
  },
});

export default theme;
