import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { Loader } from "../components/index";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FrontendRoadmapComponent from "../components/roadmap-components/FrontendRoadmapComponent";
import BackendRoadmapComponent from "../components/roadmap-components/BackendRoadmapComponent";
import CheckboxRoadmapComponent from "../components/roadmap-components/CheckboxRoadmapComponent";
import { useEffect } from "react";
import axiosInstance from "../axios";

function Roadmap(props) {
  // If isUserLoggedIn is null, no user is logged in
  const isUserLoggedIn = props.state.username ? true : false;

  // Handle if loading bar should be shown
  const [loading, setLoading] = useState(true);

  // Handle roadmap IDs
  const [roadmapQuestions, setRoadmapQuestions] = useState({
    frontend_id: null,
    backend_id: null,
  });

  // Get the question ID for roadmaps
  const getQuestions = async () => {
    // The get request will only be executed if the user is logged in
    if (isUserLoggedIn) {
      axiosInstance
      .get(`/questionsBank/`)
      .then((res) => {
        console.log("did the get request for question bank")
        const result = res.data;
        const ids = result.filter(
          (obj) => obj.question_category === "roadmaps"
        );
        
        // Get the question ID for backend and frontend roadmap
        const fe = ids.find((obj) => obj.question_name === "Frontend Roadmap");
        const be = ids.find((obj) => obj.question_name === "Backend Roadmap");

        // Set the frontend and backend question id
        setRoadmapQuestions({
          frontend_id: fe.id,
          backend_id: be.id,
        });
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      })
      .then(() => {
        setLoading(false);
      });
    } else {
      // If the user is not logged in, stop loading and show the page
      //  without doing the get request
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Handle accordion state change
  const [expanded, setExpanded] = useState(false);

  // Handle change of accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Use dark theme components
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
      }}
    >
      <Box
        sx={{ minHeight: "100vh", color: "white", backgroundColor: "#151517" }}
      >
        <div style={{ padding: "60px", margin: "auto", width: "80%" }}>
          <Typography variant="h2" align="center" gutterBottom>
            Frontend and Backend Roadmap
          </Typography>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: "40px", color: "#4C94FF" }}
          >
            Not sure where to begin your programming journey? Check out our
            <strong style={{ color: "#C4DCFF" }}> roadmap </strong>below.
          </Typography>

          <ThemeProvider theme={darkTheme}>
            <div style={{ margin: "auto", padding: "20px", width: "80%" }}>
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
                  <Typography variant="h5">Frontend Roadmap</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <FrontendRoadmapComponent />
                </AccordionDetails>
                <CheckboxRoadmapComponent
                  isFrontendOrBackend={"Frontend"}
                  isEnabled={isUserLoggedIn}
                  frontend_id={roadmapQuestions?.frontend_id}
                  labelText={
                    isUserLoggedIn
                      ? "Mark frontend roadmap as completed"
                      : "Please log in to save your frontend roadmap progress"
                  }
                />
              </Accordion>

              <Accordion
                sx={{ padding: "10px" }}
                expanded={expanded === "backend-panel"}
                onChange={handleChange("backend-panel")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="roadmap-accordion-backendend-panel"
                >
                  <Typography variant="h5">Backend Roadmap</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BackendRoadmapComponent />
                </AccordionDetails>
                <CheckboxRoadmapComponent
                  isFrontendOrBackend={"Backend"}
                  isEnabled={isUserLoggedIn}
                  backend_id={roadmapQuestions?.backend_id}
                  labelText={
                    isUserLoggedIn
                      ? "Mark backend roadmap as completed"
                      : "Please log in to save your backend roadmap progress"
                  }
                />
              </Accordion>
            </div>
          </ThemeProvider>
        </div>
      </Box>
    </Box>
  );
}

export default Roadmap;
