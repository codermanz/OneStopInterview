import {
  FormControl,
  InputLabel,
  Select,
  createTheme,
  ThemeProvider,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import JobPostingComponent from "./JobPostingComponent";
import axiosInstance from "../../axios";

function JobSearchDropdowns(props) {
  const [selectedJobCategory, setJobCategory] = React.useState("");
  const [selectedLocationCategory, setLocationCategory] = React.useState("");
  const [isGetRequestFailed, setGetRequestFailed] = React.useState(false);
  const [showJobPostings, setShowJobPostings] = React.useState(false);
  const [jobPostingsArray, setJobPostingsArray] = React.useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCD4C"),
    backgroundColor: "#FFCD4C",
    "&:hover": {
      backgroundColor: "#F9BF2B",
    },
  }));

  const handleJobChange = (event) => {
    setJobCategory(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocationCategory(event.target.value);
  };

  const handleJobLocationSearch = (event) => {
    setShowJobPostings(true);
    getJobs();
  };

  const getJobs = async () => {
    axiosInstance
      .get(
        `/jobPostingsStatic/?job_title=${selectedJobCategory}&location=${selectedLocationCategory}`
      )
      .then((res) => {
        console.log("im in getJobs result");
        console.log(res);
        setJobPostingsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        setShowJobPostings(false);
        setJobCategory("");
        setLocationCategory("");
        setGetRequestFailed(true);
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

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
            Select a Job Title Category
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
                  <MenuItem key={title.category} value={title.category}>
                    {title.category}
                  </MenuItem>
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
                  <MenuItem key={location.category} value={location.category}>
                    {location.category}
                  </MenuItem>
                );
              })}
            </Select>
          </ThemeProvider>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        {selectedJobCategory && selectedLocationCategory ? (
          <ColorButton
            type="submit"
            size="medium"
            fullWidth
            variant="contained"
            onClick={handleJobLocationSearch}
            sx={{
              borderRadius: "20px",
            }}
          >
            Start Your Job Search
          </ColorButton>
        ) : (
          <ThemeProvider theme={darkTheme}>
            <Button
              size="medium"
              fullWidth
              variant="contained"
              disabled
              sx={{
                borderRadius: "20px",
              }}
            >
              Select a Job Title and Location
            </Button>
          </ThemeProvider>
        )}
      </Grid>
      <Grid item xs={12}>
        {!isGetRequestFailed ? (
          <>
            {showJobPostings
              ? jobPostingsArray.map((entry) => {
                  return (
                    <JobPostingComponent
                      key={`${entry.title}+${entry.company}+${entry.location}`}
                      job_url={entry.job_url}
                      company={entry.company}
                      title={entry.title}
                      location={entry.location}
                      salary={entry.salary}
                      posted_date={entry.posted_date}
                    />
                  );
                })
              : null}
          </>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 10,
              fontSize: "17px",
              bgcolor: "rgba(51,102,204)",
              borderRadius: "50px",
            }}
          >
            <a type="button" href="/login">
              You Have Been Logged Out. Click Here to Log In.
            </a>
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default JobSearchDropdowns;
