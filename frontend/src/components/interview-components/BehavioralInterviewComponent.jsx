import React from "react";
import {
  Divider,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import InterviewButtonContent from "./InterviewButtonContent";

function BehavioralInterviewComponent() {
  // Theme for rounded corners to make the button resemble a pill
  const pillTheme = createTheme({
    shape: {
      borderRadius: 50,
    },
  });

  /*
    BehavioralInterviewComponent will return:
    - Behavioral interview topics
    - Pill-shaped buttons that opens an external website when clicked
  */
  return (
    <div>
      <Typography variant="h6" sx={{ margin: "10px" }}>Topic 1</Typography>
      <ThemeProvider theme={pillTheme}>
        <InterviewButtonContent
          buttonText={"Question 1 Topic 1"}
          buttonLink={"http://www.google.com/"}
        />
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
      </ThemeProvider>

      <Divider sx={{ margin: "20px" }} />

      <Typography variant="h6" sx={{ margin: "10px" }}>Topic 2</Typography>
      <ThemeProvider theme={pillTheme}>
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
      </ThemeProvider>

      <Divider sx={{ margin: "20px" }} />

      <Typography variant="h6" sx={{ margin: "10px" }}>Topic 2</Typography>
      <ThemeProvider theme={pillTheme}>
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
      </ThemeProvider>

      <Divider sx={{ margin: "20px" }} />

      <Typography variant="h6" sx={{ margin: "10px" }}>Topic 2</Typography>
      <ThemeProvider theme={pillTheme}>
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
      </ThemeProvider>

      <Divider sx={{ margin: "20px" }} />

      <Typography variant="h6" sx={{ margin: "10px" }}>Topic 2</Typography>
      <ThemeProvider theme={pillTheme}>
        <InterviewButtonContent
          buttonText={"Question 1 Topic 2"}
          buttonLink={"http://www.google.com/"}
        />
      </ThemeProvider>
    </div>
  );
}

export default BehavioralInterviewComponent;
