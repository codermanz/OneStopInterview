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
    <div className="bg-dark-bg h-screen text-white overflow-hidden">
      <Navbar />
      <Typography variant="h2" gutterBottom>
        Technical and Behavioral Interview
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "40px"}}>
         Practice your interviewing skills with these selected questions
      </Typography>
      <ThemeProvider theme={darkTheme}>
        <Accordion
          sx={{ width: "50%"}}
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
          sx={{ width: "50%" }}
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
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default InterviewPage;
