import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
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
    mode: "dark",
  },
  button: {
    textTransform: "none",
  },
  TextField: {
    color: "#FFFFF",
  },
});

export default theme;
