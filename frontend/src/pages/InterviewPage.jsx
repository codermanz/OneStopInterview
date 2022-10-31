import React from "react";
import { Footer, Navbar } from "../components/index";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TechnicalInterviewComponent from "../components/interview-components/TechnicalInterviewComponent";
import BehavioralInterviewComponent from "../components/interview-components/BehavioralInterviewComponent";

function InterviewPage() {
  // Handle the state changes so only one panel in the accordion
  // is open at a time
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
  return (
    <div
      className="bg-dark-bg h-screen text-white overflow-hidden"
      style={{ overflow: "auto" }}
    >
      <Navbar />
      <div style={{ padding: "60px", margin: "auto", width: "80%" }}>
        <Typography variant="h2" align="center" gutterBottom>
          Technical and Behavioral Interview Questions
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginBottom: "40px", color: "#4C94FF" }}
        >
          Practice your <strong style={{color: "#C4DCFF"}}>interview</strong> taking skills with these selected questions.
        </Typography>
        <ThemeProvider theme={darkTheme}>
          <div style={{margin: "auto", padding:"20px", width: "80%"}}>
            <Accordion
              sx={{ padding: "10px" }}
              expanded={expanded === "frontend-panel"}
              onChange={handleChange("frontend-panel")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="roadmap-accordion-frontend-panel"
              >
                <Typography variant="h5">
                  Technical Interview Questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TechnicalInterviewComponent />
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{  padding: "10px" }}
              expanded={expanded === "backend-panel"}
              onChange={handleChange("backend-panel")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="roadmap-accordion-backendend-panel"
              >
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
      <Footer />
    </div>
  );
}

export default InterviewPage;
