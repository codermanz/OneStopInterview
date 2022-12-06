import React from "react";
import { Box, Button, styled } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import ProgressBar from "./Progressbar";
import axiosInstance from "../axios";
import Loader from "./Loader";

function Sidebar({ progress }) {
  const progressList = [
    { title: "My Progress", bgcolor: "#6a1b9a", completed: progress },
    /*
    { title: "Behavioral Interview Questions", bgcolor: "#00695c", completed: 30 },
    { title: "Frontend roadmap", bgcolor: "#ef6c00", completed: 53 },
    { title: "Backend roadmap", bgcolor: "#d64161", completed: 90 },
    */
  ];

  const SideButton = styled(Button)({
    color: "white",
    backgroundColor: "#31306b",
  });

  const handleClearProgress = () => {
    axiosInstance
      .put(`/user/clearProgress/`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "25%",
          minHeight: "calc(100vh - 74px)",
          backgroundColor: "#081727",
          position: "sticky",
          top: "74px",
        }}>
        <Box
          sx={{
            backgroundColor: "#101F33",
            paddingY: theme.spacing(3),
          }}>
          {progressList.map((item, idx) => (
            <ProgressBar
              key={idx}
              title={item.title}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))}
          <SideButton variant="contained" onClick={handleClearProgress}>
            Clear Progress
          </SideButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
