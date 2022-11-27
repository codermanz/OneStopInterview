import React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
function Error() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" color="white" mt={4}>
          Uh oh! This page doesn't exist or you lack permissions to view it!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Error;
