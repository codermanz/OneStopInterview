import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
function Sidebar() {
  const [toggle, setToggle] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      {toggle ? (
        <Box
          sx={{
            width: "25%",
            minHeight: "calc(100vh - 74px)",
            borderColor: "white",
            borderWidth: "thick",
            position: "sticky",
            top: "74px",
          }}>
          <Button
            variant="contained"
            color="neutral"
            onClick={() => setToggle(!toggle)}>
            Toggle Off!
          </Button>
          <Typography variant="h3" sx={{ color: "white" }}>
            Sidebar!
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="neutral"
          onClick={() => setToggle(!toggle)}>
          Toggle On
        </Button>
      )}
    </ThemeProvider>
  );
}

export default Sidebar;
