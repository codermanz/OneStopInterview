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

function Roadmap() {
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

  return (
    <div className="bg-dark-bg h-screen text-white overflow-hidden">
      <Navbar />
      <Typography variant="h2" gutterBottom>
        Frontend and Backend Roadmap
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "40px" }}>
        Not sure where to begin your programming journey? Check out our roadmap
        below.
      </Typography>
      <ThemeProvider theme={darkTheme}>
        <Accordion
          sx={{ width: "50%" }}
          expanded={expanded === "frontend-panel"}
          onChange={handleChange("frontend-panel")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="roadmap-accordion-frontend-panel"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
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
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default Roadmap;
