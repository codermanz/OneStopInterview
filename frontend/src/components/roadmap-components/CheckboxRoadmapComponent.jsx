import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import axiosInstance from "../../axios";

function CheckboxRoadmapComponent(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    
    // !checked means that the checkbox has the checkmark on it
    if (!checked) {
      let questionID = { question_id: null };

      // Get the question ID passed from Roadmap
      if (props.isFrontendOrBackend === "Frontend") {
        questionID = { question_id: props.frontend_id };
      } else if (props.isFrontendOrBackend === "Backend") {
        questionID = { question_id: props.backend_id };
      }

      // Post the userProgress with the questionID
      if (questionID.question_id) {
        axiosInstance
          .post(`/userProgress/`, questionID)
          .then(() => {
            // Disable the checkbox so it can't be clicked again
            event.target.setAttribute("disabled", "");
          })
          .catch((err) => {
            // Disable the checkbox so it can't be clicked again
            event.target.setAttribute("disabled", "");

            let errorBody = err.response;
            return Promise.resolve(errorBody);
          });
      }
    } else {
      console.log("currently NOT checked");
    }
  };

  return (
    <FormGroup sx={{ padding: "20px" }}>
      <FormControlLabel
        label={props.labelText}
        control={
          <Checkbox
            disabled={!props.isEnabled}
            checked={checked}
            onChange={handleChange}
          />
        }
      />
    </FormGroup>
  );
}

export default CheckboxRoadmapComponent;
