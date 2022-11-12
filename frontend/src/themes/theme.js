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
      main: "#4C94FF",
      light: "#C4DCFF",
    },
  },
  button: {
    textTransform: "none",
  },
});

export default theme;
