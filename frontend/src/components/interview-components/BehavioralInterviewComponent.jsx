import React from "react";
import {
  Divider,
  Typography,
  ThemeProvider,
  createTheme,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InterviewButtonContent from "./InterviewButtonContent";

function BehavioralInterviewComponent() {
  // Theme for rounded corners to make the button resemble a pill
  const pillTheme = createTheme({
    shape: {
      borderRadius: 50,
    },
  });

  const rows = [
    {
      checked: false,
      question_name: "Two Sum",
      question_url: "https://leetcode.com/problems/two-sum/",
    },
    {
      checked: false,
      question_name: "Add Two Numbers",
      question_url: "https://leetcode.com/problems/add-two-numbers/",
    },
    {
      checked: false,
      question_name: "Longest Substring Without Repeated Characters",
      question_url:
        "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      checked: false,
      question_name: "Median of Two Sorted Arrays",
      question_url:
        "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
        Topic 1
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Checkbox checked={row.checked} />
                </TableCell>
                <TableCell align="left">{row.question_name}</TableCell>
                <TableCell align="center">
                  <a href={row.question_url} target="_blank" rel="noreferrer">
                    Link
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ margin: "20px" }} />

      <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
        Topic 2
      </Typography>
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
