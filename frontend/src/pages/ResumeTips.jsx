import React from "react";
import { useState } from "react";
import { Typography, createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import List from "../components/Joblist-components/List";

function ResumeTips() {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div
      className="bg-dark-bg h-screen text-white overflow-hidden"
      style={{ overflow: "auto" }}>
      <div style={{ padding: "60px", margin: "auto", width: "80%" }}>
        <Typography variant="h2" align="center" gutterBottom>
          Resume Tips
        </Typography>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginBottom: "40px", color: "#4C94FF" }}>
          Customize
          <strong style={{ color: "#C4DCFF" }}> your resume </strong>
          with recommended keywords based on your dream job position.
        </Typography>

        <div
          style={{ margin: "auto", padding: "20px", width: "80%" }}
          align-items="center"
          flex-direction="column"
          display="flex"
          justify-content="center">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search"
            fullWidth
            onChange={inputHandler}
            style={{
              backgroundColor: "white",
            }}
            InputProps={{
              style: {
                color: "black",
              },
            }}
          />
          <List input={inputText} />
        </div>
      </div>
    </div>
  );
}

export default ResumeTips;
