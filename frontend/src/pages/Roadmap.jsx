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

  // Handle accordion state change
  const [expanded, setExpanded] = useState(false);

  // Handle roadmap question IDs
  let roadmapQuestions = {
    frontend_id: null,
    backend_id: null,
  };

  const [frontendID, setFrontendID] = useState();
  const [backendID, setBackendID] = useState();

  // Checkbox checkmarks and labels
  const [isFrontendChecked, setIsFrontendChecked] = useState(false);
  const [isBackendChecked, setIsBackendChecked] = useState(false);
  const [frontendCheckboxLabel, setFrontendCheckboxLabel] = useState(
    "Please log in to save your frontend roadmap progress"
  );
  const [backendCheckboxLabel, setBackendCheckboxLabel] = useState(
    "Please log in to save your backend roadmap progress"
  );

  // Handle if loading bar should be shown
  const [loading, setLoading] = useState(true);

  // Handle change of accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getIsFrontendBackendChecked = async () => {
    // First, retrieve the roadmap questions.
    if (isUserLoggedIn) {
      axiosInstance
        .get(`/questionsBank/`)
        .then((res) => {
          const result = res.data;
          const ids = result.filter(
            (obj) => obj.question_category === "roadmaps"
          );

          // Get the question ID for backend and frontend roadmap
          const fe = ids.find(
            (obj) => obj.question_name === "Frontend Roadmap"
          );
          const be = ids.find((obj) => obj.question_name === "Backend Roadmap");

          roadmapQuestions = {
            frontend_id: fe.id,
            backend_id: be.id,
          };

          // Second, determine the state of the roadmap checkboxes
          axiosInstance
            .get(`/userProgress/`)
            .then((userProgressResult) => {
              setFrontendID(roadmapQuestions.frontend_id);
              setBackendID(roadmapQuestions.backend_id);

              // Iterate through userProgressResult.data to get just question ID numbers
              let questionIDArray = [];
              userProgressResult.data.forEach((item) =>
                questionIDArray.push(item["question_id"])
              );

              // Determine the checkbox states
              if (questionIDArray.includes(roadmapQuestions.frontend_id)) {
                // If the user answered frontend question, marked and disabled
                setIsFrontendChecked(true);
                setFrontendCheckboxLabel(
                  "You have marked frontend roadmap as completed"
                );
              } else {
                // If the user has not answered, not marked and not disabled
                setIsFrontendChecked(false);
                setFrontendCheckboxLabel("Mark frontend roadmap as completed");
              }

              if (questionIDArray.includes(roadmapQuestions.backend_id)) {
                // If the user answered backend question, marked and disabled
                setIsBackendChecked(true);
                setBackendCheckboxLabel(
                  "You have marked backend roadmap as completed"
                );
              } else {
                // If the user has not answered, not marked and not disabled
                setIsBackendChecked(false);
                setBackendCheckboxLabel("Mark backend roadmap as completed");
              }
            })
            .catch((err) => {
              let errorBody = err.response;
              return Promise.resolve(errorBody);
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

  // Executed on page load
  useEffect(() => {
    getIsFrontendBackendChecked();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Use dark theme components
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}>
      <Box
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          width: "100%",
          color: "white",
          backgroundColor: "#151517",
        }}
      >
        <div style={{ padding: "60px", margin: "auto", width: "80%" }}>
          <Typography variant="h2" align="center" gutterBottom>
            Frontend and Backend Roadmap
          </Typography>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: "40px", color: "#4C94FF" }}>
            Not sure where to begin your programming journey? Check out our
            <strong style={{ color: "#C4DCFF" }}> roadmap </strong>below.
          </Typography>

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
                  <Typography variant="h5">Frontend Roadmap</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <FrontendRoadmapComponent />
                </AccordionDetails>
                <CheckboxRoadmapComponent
                  isFrontendOrBackend={"Frontend"}
                  isDisabled={
                    isUserLoggedIn && !isFrontendChecked ? false : true
                  }
                  isChecked={isFrontendChecked}
                  frontend_id={frontendID}
                  labelText={frontendCheckboxLabel}
                />
              </Accordion>

              <Accordion
                sx={{ padding: "10px" }}
                expanded={expanded === "backend-panel"}
                onChange={handleChange("backend-panel")}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="roadmap-accordion-backendend-panel">
                  <Typography variant="h5">Backend Roadmap</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BackendRoadmapComponent />
                </AccordionDetails>
                <CheckboxRoadmapComponent
                  isFrontendOrBackend={"Backend"}
                  isDisabled={
                    isUserLoggedIn && !isBackendChecked ? false : true
                  }
                  isChecked={isBackendChecked}
                  backend_id={backendID}
                  labelText={backendCheckboxLabel}
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
