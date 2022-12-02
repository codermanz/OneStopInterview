import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import ProgressBar from "./Progressbar";

function Sidebar(props) {

  const progressList = [
    { title: "My Progress", bgcolor: "#6a1b9a", completed: props.progress } 
    /*
    { title: "Behavioral Interview Questions", bgcolor: "#00695c", completed: 30 },
    { title: "Frontend roadmap", bgcolor: "#ef6c00", completed: 53 },
    { title: "Backend roadmap", bgcolor: "#d64161", completed: 90 },
    */
  ];

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
          {progressList.map((item, idx) => (
            <ProgressBar key={idx} title={item.title} bgcolor={item.bgcolor} completed={item.completed} />
          ))}
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
