import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axiosInstance from "../../axios";

function sortQuestions(questions) {
  if (questions) {
    const categoryMap = new Map();
    questions.forEach((item) => {
      let category = item.question_category;
      if (categoryMap.has(category)) {
        categoryMap.set(category, [item, ...categoryMap.get(category)]);
      } else {
        categoryMap.set(category, [item]);
      }
    });
    let sortedQuestionsByCategory = {};
    for (const [key, value] of categoryMap) {
      // Sort values alphabetically
      value.sort((a, b) => a.question_name.localeCompare(b.question_name));
      sortedQuestionsByCategory[key] = value;
    }
    return sortedQuestionsByCategory;
  }
  return null;
}

function TechnicalInterviewComponent(props) {
  const questions = props.questions
    ? Object.entries(sortQuestions(props.questions))
    : null;

  const [checkedQuestions, setCheckedQuestions] = useState(new Map());

  const completedQuestions = props.progress
    ? props.progress.map((item) => item.question_id)
    : [];

  useEffect(() => {
    if (questions) {
      // Make map of questions
      let tempMap = new Map();
      questions.forEach((item) => {
        let questionList = item[1];
        questionList.forEach((q) => {
          tempMap.set(q.id, false);
        });
      });
      // Map the completed questions to question check map
      if (completedQuestions.length !== 0) {
        completedQuestions.forEach((q) => {
          if (tempMap.has(q)) tempMap.set(q, true);
        });
      }
      setCheckedQuestions(tempMap);
    }
  }, []);

  const handleCheck = (e) => {
    setCheckedQuestions(checkedQuestions.set(e.target.value, true));
    e.currentTarget.disabled = true;
    const questionID = { question_id: e.target.value };
    axiosInstance
      .post(`/userProgress/`, questionID)
      .then((res) => {})
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  return (
    <div>
      {questions && completedQuestions && checkedQuestions.size !== 0 ? (
        questions.map((value, index) => {
          return (
            <Box key={index}>
              <Typography
                variant="h6"
                sx={{ margin: "10px", color: "#FFCD4C" }}>
                {value[0]}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Completed</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Solve Problem</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value[1]?.map((question, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell component="th" scope="row">
                          <Checkbox
                            defaultChecked={checkedQuestions.get(question.id)}
                            onChange={handleCheck}
                            value={question.id}
                          />
                        </TableCell>
                        <TableCell align="left">
                          {question.question_name}
                        </TableCell>
                        <TableCell align="left">
                          <a
                            href={question.question_url}
                            target="_blank"
                            noreferrer="true"
                            rel="noreferrer">
                            Link Here
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ margin: "20px" }} />
            </Box>
          );
        })
      ) : (
        <Typography>Please log in to see questions.</Typography>
      )}
    </div>
  );
}

export default TechnicalInterviewComponent;
