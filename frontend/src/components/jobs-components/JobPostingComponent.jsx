import React from "react";
import { Button, Box, Grid, Typography } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

function JobPostingComponent(props) {
  return (
    <Button
      href={props.job_url}
      target="_blank"
      sx={{
        margin: "5px",
        textTransform: "none",
        width: "100%",
        height: "100%",
        backgroundColor: "#101F33",
        border: "1px solid silver",
        borderRadius: "12px",
        paddingLeft: "30px",
      }}
    >
      <Grid container spacing={2} alignItems="center" padding={2}>
        <Grid item xs={7}>
          <Grid container spacing={2} alignItems="center" paddingLeft={3}>
            <Grid
              item
              xs={12}
              sx={{ flexDirection: "column", display: "flex" }}
            >
              <Typography variant="h6" sx={{ color: "#FFCD4C" }}>
                {props.company}
              </Typography>
              <Typography variant="h4" sx={{ color: "#F8FAFC" }}>
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <Grid container padding={1}  direction="column" spacing={1} alignItems="left">
            <Grid
              item
              xs={4}
              sx={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box sx={{
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#0F0C07",
                }}>
                <PlaceOutlinedIcon
                  fontSize="small"
                  style={{ marginLeft: "5px", color: "#2684FF" }}
                />
                <Typography
                  variant="body"
                  sx={{ color: "#2684FF", marginLeft: "10px", marginRight: "5px" }}
                >
                  {props.location}
                </Typography>
              </Box>
            </Grid>
            {props.salary ? (<Grid
              item
              xs={4}
              sx={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box sx={{
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#0F0C07",
                }}>
                <MonetizationOnOutlinedIcon
                  fontSize="small"
                  style={{ marginLeft: "5px", color: "#2684FF" }}
                />
                <Typography
                  variant="body"
                  sx={{ color: "#2684FF", marginLeft: "10px", marginRight: "10px"}}
                >
                  {props.salary}
                </Typography>
              </Box>
            </Grid>) : (null)}
            <Grid
              item
              xs={3}
              sx={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Box sx={{
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  backgroundColor: "#0F0C07",
                }}>
                <CalendarMonthOutlinedIcon
                  fontSize="small"
                  style={{ marginLeft: "5px", color: "#2684FF" }}
                />
                <Typography
                  variant="body"
                  sx={{ color: "#2684FF", marginLeft: "10px", marginRight:"10px" }}
                >
                  {props.posted_date}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

export default JobPostingComponent;
