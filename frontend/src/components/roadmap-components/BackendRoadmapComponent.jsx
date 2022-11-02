import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackendStepOneContentComponent from "./backend-steps-content-components/BackendStepOneContentComponent";
import BackendStepTwoContentComponent from "./backend-steps-content-components/BackendStepTwoContentComponent";
import BackendStepThreeContentComponent from "./backend-steps-content-components/BackendStepThreeContentComponent";
import BackendStepFourContentComponent from "./backend-steps-content-components/BackendStepFourContentComponent";

function BackendRoadmapComponent() {
  // Handle the state changes so only one panel in the accordion
  // is open at a time
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "backend-step-one-panel"}
        onChange={handleChange("backend-step-one-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-backend-step-one-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            1. Programming Languages
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <BackendStepOneContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "backend-step-two-panel"}
        onChange={handleChange("backend-step-two-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-backend-step-two-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            2. Frameworks
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <BackendStepTwoContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "backend-step-three-panel"}
        onChange={handleChange("backend-step-three-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-backend-step-three-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            3. Backend Concepts
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <BackendStepThreeContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "backend-step-four-panel"}
        onChange={handleChange("backend-step-four-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-backend-step-four-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            4. Databases
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <BackendStepFourContentComponent />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BackendRoadmapComponent;
