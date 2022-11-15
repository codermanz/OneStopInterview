import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";

function Sidebar(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "25%",
          minHeight: "calc(100vh - 74px)",
          borderColor: "white",
          borderWidth: "thick",
          position: "sticky",
          top: "74px",
        }}>
        <Typography variant="h3" sx={{ color: "white" }}>
          {props.progress}% Completed
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
