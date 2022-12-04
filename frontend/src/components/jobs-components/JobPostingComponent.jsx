import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

function JobPostingComponent() {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      sx={{
        position: "flex",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "1200px",
          height: "100%",
          backgroundColor: "#101F33",
          color: "white",
          border: "1px solid white",
          borderRadius: "12px",
          paddingLeft: "30px",
        }}
      >
        <Grid container spacing={2} alignItems="center" paddingTop={3} paddingLeft={3} paddingRight={3}>
          <Grid item xs={1}>
            <Avatar src ="https://drive.google.com/file/d/17rd9-ssPcqNO1fas0g5Wmr0Zteylhx6w/view?usp=sharing" variant="rounded" sx={{ width: 56, height: 56 }}>
            </Avatar>
          </Grid>
          <Grid item xs={11} sx={{ flexDirection: "column", display: "flex" }}>
            <Typography variant="h6" sx={{ color: "#40577D" }}>
              Atlassian
            </Typography>
            <Typography variant="h5" sx={{ color: "#F8FAFC" }}><Link sx={{ color: "#F8FAFC" }} target="_blank"
              href="https://www.codecademy.com/learn/learn-node-js">Product Designer</Link></Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ alignItems: "center", flexDirection: "row", display: "flex" }}
          >
            <PlaceOutlinedIcon fontSize="medium" style={{ color: "#40577D" }} />
            <Typography
              variant="h6"
              sx={{ color: "#40577D", marginLeft: "10px" }}
            >
              Dublin, Ireland
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{width:"400px"}}>
          <Grid container spacing={1} paddingTop={1} paddingRight={2} paddingLeft={2} paddingBottom={3}>
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#0F0C07",
                }}
              >
                <Typography sx={{ color: "#2684FF" }}>Full-time</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#0F0C07"
                }}
              >
                <Typography sx={{ color: "#2684FF" }}>Remote</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default JobPostingComponent;
