import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TechnicalInterviewComponent from "../components/interview-components/TechnicalInterviewComponent";
import BehavioralInterviewComponent from "../components/interview-components/BehavioralInterviewComponent";
import { Sidebar, Loader } from "../components/index";
import { useEffect } from "react";
import axiosInstance from "../axios";
import theme from "../themes/theme";

function InterviewPage(props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [questions, setQuestions] = useState();
  const [progress, setProgress] = useState();
  const [progressPercentage, setProgressPercentage] = useState(null);
  const [checkedQuestions, setCheckedQuestions] = useState(new Map());

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getQuestions = async () => {
    axiosInstance
      .get(`/questionsBank/`)
      .then((res) => {
        const result = res.data.filter(
          (obj) => obj.question_category !== "roadmaps"
        );
        setQuestions(result);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      })
      .then(() => {
        axiosInstance
          .get(`/userProgress/`)
          .then((res) => {
            setProgress(res.data);
          })
          .catch((err) => {
            let errorBody = err.response;
            return Promise.resolve(errorBody);
          })
          .then(() => {
            setLoading(false);
          });
      });
  };

  const getUserProgress = async () => {
    axiosInstance
      .get(`/user/userInfo/`)
      .then((res) => {
        const result = res.data;
        setProgressPercentage(result.progress_percentage);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  useEffect(() => {
    if (props.state.progress != null) {
      setLoggedIn(true);
      if (progressPercentage == null) {
        setProgressPercentage(props.state.progress);
      }
    }
  }, [props.state, progressPercentage]);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    getUserProgress();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}>
      {props.state.progress != null && progressPercentage != null ? (
        <Sidebar progress={progressPercentage}/>
      ) : null}
      <Box
        sx={{
          backgroundColor: "#151517",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}>
        <Box sx={{ color: "white" }}>
          <div style={{ padding: "60px", margin: "auto", width: "100%" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Technical Interview Questions
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginBottom: "40px", color: "#4C94FF" }}>
              Practice your{" "}
              <strong style={{ color: "#C4DCFF" }}>interview</strong> taking
              skills with these selected questions.
            </Typography>
            <ThemeProvider theme={theme}>
              <div style={{ margin: "auto", padding: "20px", width: "100%" }}>
                <Accordion
                  sx={{ padding: "10px" }}
                  defaultExpanded={true}
                  expanded={true}
                  onChange={handleChange("frontend-panel")}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="roadmap-accordion-frontend-panel">
                    <Typography variant="h5">
                      Technical Interview Questions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TechnicalInterviewComponent
                      questions={questions}
                      progress={progress}
                      checkedQuestions={checkedQuestions}
                      setCheckedQuestions={setCheckedQuestions}
                      getProgress={getUserProgress}
                    />
                  </AccordionDetails>
                </Accordion>
                {/*
                <Accordion
                  sx={{ padding: "10px" }}
                  expanded={expanded === "backend-panel"}
                  onChange={handleChange("backend-panel")}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="roadmap-accordion-backendend-panel">
                    <Typography variant="h5">
                      Behavioral Interview Questions
                    </Typography>
                  </AccordionSummary>
                    <AccordionDetails>
                      <BehavioralInterviewComponent questions={questions} />
                    </AccordionDetails>
                </Accordion>
                */}
              </div>
            </ThemeProvider>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default InterviewPage;
