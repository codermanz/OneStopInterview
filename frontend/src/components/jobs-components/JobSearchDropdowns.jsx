import {
  Box,
  FormControl,
  InputLabel,
  Select,
  createTheme,
  ThemeProvider,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from "react";

function JobSearchDropdowns(props) {
  const [selectedJobCategory, setJobCategory] = React.useState("");
  const [selectedLocationCategory, setLocationCategory] = React.useState("");
  // Use dark theme components
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCD4C"),
    backgroundColor: "#FFCD4C",
    '&:hover': {
      backgroundColor: "#F9BF2B",
    },
  }));

  const handleJobChange = (event) => {
    setJobCategory(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocationCategory(event.target.value);
  };
  console.log("selectedJobCategory: ", selectedJobCategory);
  console.log("selectedLocationCategory: ", selectedLocationCategory);

  // const getJobs = async () => {
  //   axiosInstance
  //     .get(`/jobPostingsStatic/`)
  //     .then((res) => {
  //       console.log("im in getJobs result");
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       let errorBody = err.response;
  //       return Promise.resolve(errorBody);
  //     });
  // };

  // useEffect(() => {
  //   getJobs();
  // }, []);
  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={4}>
        <FormControl
          fullWidth
          variant="filled"
          sx={{
            backgroundColor: "#101F33",
            border: "1px solid white",
            borderRadius: "12px",
          }}
        >
          <InputLabel id="job-title-category-label" sx={{ color: "#F8FAFC" }}>
          Select a  Job Title Category
          </InputLabel>
          <ThemeProvider theme={darkTheme}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select a Job Title Category"
              value={selectedJobCategory}
              onChange={handleJobChange}
            >
              {props.jobTitleCategories.map((title) => {
                return (
                  <MenuItem value={title.category}>{title.category}</MenuItem>
                );
              })}
            </Select>
          </ThemeProvider>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl
          variant="filled"
          fullWidth
          sx={{
            backgroundColor: "#101F33",
            border: "1px solid white",
            borderRadius: "12px",
          }}
        >
          <InputLabel id="location-category-label" sx={{ color: "#F8FAFC" }}>
            Select a Location Category
          </InputLabel>
          <ThemeProvider theme={darkTheme}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select a Location Category"
              value={selectedLocationCategory}
              onChange={handleLocationChange}
            >
              {props.locationCategories.map((location) => {
                return (
                  <MenuItem value={location.category}>
                    {location.category}
                  </MenuItem>
                );
              })}
            </Select>
          </ThemeProvider>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <ColorButton
          type="submit"
          size="medium"
          fullWidth
          variant="contained"
          sx={{
            borderRadius: "20px",
          }}
        >
          <a type="button" href="/forums/postlist">
            Start Your Job Search
          </a>
        </ColorButton>
      </Grid>
    </Grid>
  );
}

export default JobSearchDropdowns;
