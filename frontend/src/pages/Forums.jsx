import React from "react";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Forums() {
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
        Interactive Forums
      </Typography>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ marginBottom: "40px", color: "#4C94FF" }}>
        Explore our
        <strong style={{ color: "#C4DCFF" }}> discussion board </strong>
        to interact with others<br/>and promote learning of technical topics.
      </Typography>

      <div
        style={{ margin: "auto", padding: "20px", width: "60%" }}
        align-items="center"
        flex-direction="column"
        display="flex"
        justify-content="center">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 10,
              fontSize: "17px",
              bgcolor: "rgba(51,102,204)",
              borderRadius: "50px",
            }}>
               <a type="button" href="/forums/posts/">Navigate to the Forum</a>
            </Button>
      </div>
    </div>
  </div>
);
}

export default Forums;
