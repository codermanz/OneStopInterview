import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function BackendStepOneComponent() {
  return (
    <Box>
      <Typography>
        Begin by choosing a programming language. Below are resources we
        compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <Typography variant="h6" color="#4C94FF">
          Javascript
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/catalog/language/javascript"
              underline="always"
            >
              {"Learn the basics of Javascript"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.toptal.com/javascript/interview-questions"
              underline="always"
            >
              {"Javascript programming questions"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          PHP
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/catalog/language/php"
              underline="always"
            >
              {"Learn the basics of PHP"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.interviewbit.com/php-interview-questions/"
              underline="always"
            >
              {"PHP programming questions"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          Java
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/catalog/language/java"
              underline="always"
            >
              {"Learn the basics of Java"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.tutorialspoint.com/java/java_interview_questions.htm"
              underline="always"
            >
              {"Java programming questions"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          Python
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/catalog/language/python"
              underline="always"
            >
              {"Learn the basics of Python"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.interviewbit.com/python-interview-questions/"
              underline="always"
            >
              {"Python programming questions"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default BackendStepOneComponent;
