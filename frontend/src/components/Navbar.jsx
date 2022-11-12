import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: "18px",
    },
  },
});

function Navbar() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            color: "white",
            top: "0px",
            position: "sticky",
            zIndex: 999,
            height: "74px",
            borderBottomWidth: "1px",
            borderColor: "rgb(203 213 225 / 0.1)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
          }}>
          <Box px={6}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: "74px", width: "auto" }}
              />
              <Typography variant="h4" pl={6} sx={{ fontWeight: "bold" }}>
                One Stop Interview
              </Typography>
            </Link>
          </Box>
          <Box
            px={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}>
            <Box>
              <Link to="/interview">
                <Button type="text">Interview Prep</Button>
              </Link>
            </Box>
            <Box>
              <Link to="/resume-tips">
                <Button type="text">Resume</Button>
              </Link>
            </Box>
            <Box>
              <Button type="text">Jobs</Button>
            </Box>
            <Box>
              <Button type="text">Forums</Button>
            </Box>
            <Box>
              <Link to="/roadmap">
                <Button type="text">Roadmap</Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: "1",
            }}
            mr={5}>
            <Link to="/login">
              <Typography sx={{ fontSize: "18px" }} pr={4}>
                Login/Signup
              </Typography>
            </Link>
            <Avatar />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Navbar;
