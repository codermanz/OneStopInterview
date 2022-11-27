import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TechnicalInterviewComponent from "../components/interview-components/TechnicalInterviewComponent";
import BehavioralInterviewComponent from "../components/interview-components/BehavioralInterviewComponent";
import { Sidebar, Loader } from "../components/index";
import { useEffect } from "react";
import axiosInstance from "../axios";

function InterviewPage(props) {
  // Handle the state changes so only one panel in the accordion
  // is open at a time
  const [expanded, setExpanded] = useState(false);
  const [appState, setAppState] = useState({
    loading: false,
    username: null,
    postProgress: null,
  });

  const [questions, setQuestions] = useState();

  const handleCheck = (e) => {
    const questionID = { question_id: e.target.value };
    axiosInstance
      .post(`/userProgress/`, questionID)
      .then((res) => {})
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getQuestions = async () => {
    axiosInstance
      .get(`/questionsBank/`)
      .then((res) => {
        console.log("Trying to get questions.");
        const result = res.data;
        console.log(result);
        setQuestions(result);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  useEffect(() => {
    if (props.state.progress != null) {
      setAppState(props.state);
    }
  }, [props.state]);

  useEffect(() => {
    getQuestions();
  }, []);

  // Use dark theme components
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  /*
      InterviewPage.jsx will return:
      - 2 Accordion components for Technical and Behavioral Interview Questions
   */
  if (questions === undefined || appState.postProgress === null) {
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
      {appState.progress != null ? (
        <Sidebar progress={appState.progress} />
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
          <div style={{ padding: "60px", margin: "auto", width: "80%" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Technical and Behavioral Interview Questions
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography variant="h5" sx={{ color: "white" }}>
                Progress buttons
              </Typography>
              <Box sx={{ paddingY: "6px" }}>
                <Button variant="contained" value="1" onClick={handleCheck}>
                  Contains Duplicate
                </Button>
              </Box>
              <Box sx={{ paddingY: "6px" }}>
                <Button variant="contained" value="2" onClick={handleCheck}>
                  Two Sum
                </Button>
              </Box>
              <Box sx={{ paddingY: "6px" }}>
                <Button variant="contained" value="3" onClick={handleCheck}>
                  Best Time To Buy And Sell Stock
                </Button>
              </Box>
            </Box>
            <ThemeProvider theme={darkTheme}>
              <div style={{ margin: "auto", padding: "20px", width: "80%" }}>
                <Accordion
                  sx={{ padding: "10px" }}
                  expanded={expanded === "frontend-panel"}
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
                    <TechnicalInterviewComponent />
                  </AccordionDetails>
                </Accordion>

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
                    <BehavioralInterviewComponent />
                  </AccordionDetails>
                </Accordion>
              </div>
            </ThemeProvider>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default InterviewPage;
