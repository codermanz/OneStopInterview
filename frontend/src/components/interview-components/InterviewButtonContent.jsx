import React from "react";
import { Button } from "@mui/material";

function InterviewButtonContent(props) {
  return (
    <Button
      variant="contained"
      target="_blank"
      href={props.buttonLink}
      sx={{ margin: "10px" }}
    >
      {props.buttonText}
    </Button>
  );
}

export default InterviewButtonContent;
