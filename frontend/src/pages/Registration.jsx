import React from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import { Register } from "../components/index";

function Registration() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        <Register />
      </Box>
    </ThemeProvider>
  );
}

export default Registration;
