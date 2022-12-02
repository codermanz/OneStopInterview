import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FrontendStepOneContentComponent from "./frontend-steps-content-components/FrontendStepOneContentComponent";
import FrontendStepTwoContentComponent from "./frontend-steps-content-components/FrontendStepTwoContentComponent";
import FrontendStepThreeContentComponent from "./frontend-steps-content-components/FrontendStepThreeContentComponent";
import FrontendStepFourContentComponent from "./frontend-steps-content-components/FrontendStepFourContentComponent";

function FrontendRoadmapComponent() {
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
        expanded={expanded === "frontend-step-one-panel"}
        onChange={handleChange("frontend-step-one-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-frontend-step-one-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            1. Javascript, HTML, and CSS
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FrontendStepOneContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "frontend-step-two-panel"}
        onChange={handleChange("frontend-step-two-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-frontend-step-two-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            2. Package Managers
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FrontendStepTwoContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "frontend-step-three-panel"}
        onChange={handleChange("frontend-step-three-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-frontend-step-three-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            3. Javascript Frameworks and Libraries
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FrontendStepThreeContentComponent />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ padding: "10px" }}
        expanded={expanded === "frontend-step-four-panel"}
        onChange={handleChange("frontend-step-four-panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="roadmap-accordion-frontend-step-four-panel"
        >
          <Typography variant="h6" sx={{ margin: "10px", color: "#FFCD4C" }}>
            4. Deploying Websites
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FrontendStepFourContentComponent />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FrontendRoadmapComponent;
