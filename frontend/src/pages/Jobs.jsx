import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import JobSearchDropdownsAndResults from "../components/jobs-components/JobSearchDropdownsAndResults";

function Jobs(props) {
  const [isUserLoggedIn, setUserLoggedIn] = useState(props.state.username);

  const jobTitleCategories = [
    { category: "Network and Systems Administrator" },
    { category: "Computer Support Specialist" },
    { category: "Business Intelligence Developer" },
    { category: "Android Developer" },
    { category: "IoS Developer" },
    { category: "UI Designer" },
    { category: "UX Designer" },
    { category: "Systems Administrator" },
    { category: "Python Developer" },
    { category: "Full-Stack Developer" },
    { category: "Database Administrator" },
    { category: "Business Systems Analyst" },
    { category: "Data Engineer" },
    { category: "Software Engineer" },
    { category: "Software Developer" },
    { category: "Front End Software Engineer" },
    { category: "Data Analyst" },
    { category: "Data Scientist" },
    { category: "Information Security Analyst" },
    { category: "Computer Systems Analyst" },
    { category: "Web Developer" },
    { category: "Sales Engineer" },
    { category: "Information Technology Manager" },
    { category: "Product Manager" },
    { category: "Project Manager" },
    { category: "Machine Learning Engineer" },
    { category: "ML/AI Engineer" },
    { category: "Computer Research Scientist" },
  ];
  const locationCategories = [
    { category: "New York NY" },
    { category: "Los Angeles CA" },
    { category: "San Francisco CA" },
    { category: "Austin TX" },
    { category: "Dallas TX" },
    { category: "Washington DC" },
    { category: "Glendale AZ" },
    { category: "Seattle WA" },
    { category: "Atlanta GA" },
    { category: "Denver CO" },
    { category: "Chicago IL" },
    { category: "Raleigh NC" },
  ];

  useEffect(() => {
    setUserLoggedIn(props.state.username);
  }, [props.state.username]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#151517",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ color: "white" }}>
          <div style={{ padding: "60px", margin: "auto", width: "90%" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Job Posting Board
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginBottom: "40px", color: "#4C94FF" }}
            >
              Search{" "}
              <strong style={{ color: "#C4DCFF" }}>available jobs</strong>{" "}
              within your domain of interest to see what opportunities you’ve
              got!
            </Typography>
            <div
              style={{ margin: "auto", padding: "20px", width: "100%" }}
              align-items="center"
              flex-direction="column"
              display="flex"
              justify-content="center"
            >
              {isUserLoggedIn ? (
                <JobSearchDropdownsAndResults
                  jobTitleCategories={jobTitleCategories}
                  locationCategories={locationCategories}
                />
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
                    Click Here to Log In to Start Your Job Search
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Jobs;
