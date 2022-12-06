import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import axiosInstance from "../../axios";

function CheckboxRoadmapComponent(props) {
  const [checked, setChecked] = useState(props.isChecked);
  const [isDisabled, setIsDisabled] = useState(props.isDisabled);
  const [labelText, setLabelText] = useState(props.labelText);
  const [frontendID, setFrontendID] = useState(props.frontend_id);
  const [backendID, setBackendID] = useState(props.backend_id);

  useEffect(() => {
    setChecked(props.isChecked);
  }, [props.isChecked]);

  useEffect(() => {
    setIsDisabled(props.isDisabled);
  }, [props.isDisabled]);

  useEffect(() => {
    setLabelText(props.labelText);
  }, [props.labelText]);

  useEffect(() => {
    setFrontendID(props.frontend_id);
  }, [props.frontend_id]);

  useEffect(() => {
    setBackendID(props.backend_id);
  }, [props.backend_id]);

  const handleChange = (event) => {
    setChecked(true);
    // !checked means that the checkbox has the checkmark on it
    if (!checked) {
      let questionID = { question_id: null };

      // Get the question ID passed from Roadmap
      if (props.isFrontendOrBackend === "Frontend") {
        questionID = { question_id: frontendID };
      } else if (props.isFrontendOrBackend === "Backend") {
        questionID = { question_id: backendID };
      }

      // Post the userProgress with the questionID
      if (questionID.question_id) {
        axiosInstance
          .post(`/userProgress/`, questionID)
          .then(() => {
            setLabelText("Marked as completed");
            setIsDisabled(true);
            window.location.reload(false);
          })
          .catch((err) => {
            let errorBody = err.response;
            return Promise.resolve(errorBody);
          })
          .then(() => {
            setIsDisabled(true);
          });
      }
    }
  };

  return (
    <FormGroup sx={{ padding: "20px" }}>
      <FormControlLabel
        label={labelText}
        control={
          <Checkbox
            disabled={isDisabled}
            checked={checked}
            onChange={handleChange}
          />
        }
      />
    </FormGroup>
  );
}

export default CheckboxRoadmapComponent;
