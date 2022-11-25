import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function FrontendStepOneComponent() {
  return (
    <Box>
      <Typography>
        Begin by learning the basics of Javascript, HTML, and CSS. Below are
        resources we compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank" 
              href="https://www.codecademy.com/catalog/language/html-css"
              underline="always"
            >
              {"Learn the basics of HTML and CSS with CodeAcademy"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank" 
              href="https://www.codecademy.com/catalog/language/javascript"
              underline="always"
            >
              {"Learn the basics of Javascript with CodeAcademy"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank" 
              href="https://skillcrush.com/blog/projects-you-can-do-with-javascript/"
              underline="always"
            >
              {"21 Javascript project ideas to do"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default FrontendStepOneComponent;
