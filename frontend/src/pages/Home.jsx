import React from "react";
import { Button, Box, Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import theme from "../themes/theme";

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container>
          <Grid
            item
            sm={2}
            md={7}
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                paddingTop: "20px",
                paddingLeft: "100px",
                flexDirection: "column",
              }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "30px", color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/progress">Tracking Progress</Link>
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "30px", color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/interview">Interview Prep</Link>
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "30px", color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/resume-tips">Resume Review</Link>
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "30px", color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/jobs">Job Searching</Link>
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "30px", color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/forums">Discussion Board</Link>
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ color: "#C4DCFF" }}>
                <CircleIcon
                  fontSize="small"
                  sx={{ p: "2px", marginRight: "10px" }}
                />
                <Link to="/roadmap">Roadmap</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid display="flex" justifyContent="center" minWidth="100vw">
            <Box
              sx={{
                my: 3,
                mx: 2,
              }}>
              <Button
                fullWidth
                variant="contained"
                href="/login"
                sx={{
                  mt: 1,
                  mb: 2,
                  position: "relative",
                  fontSize: "20px",
                  bgcolor: "rgba(51,102,204)",
                  borderRadius: "50px",
                }}>
                Get Started
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
