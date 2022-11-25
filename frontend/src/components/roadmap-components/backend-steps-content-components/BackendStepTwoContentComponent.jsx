import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function BackendStepTwoComponent() {
  return (
    <Box>
      <Typography>
        Second, choose a framework based on the programming language you learned.
        Below are resources we compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <Typography variant="h6" color="#4C94FF">
          Javascript
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/learn/learn-node-js"
              underline="always"
            >
              {"Learn the basics of Node.js"}
            </Link>
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.codecademy.com/learn/learn-express"
              underline="always"
            >
              {"Learn the basics of Express.js"}
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
              href="https://laravel.com/docs/5.1/quickstart"
              underline="always"
            >
              {"Learn the basics of Laravel"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://ptrdev.com/symfony-tutorial-for-beginners/"
              underline="always"
            >
              {"Learn the basics of Symfony"}
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
              href="https://www.tutorialspoint.com/spring/index.htm"
              underline="always"
            >
              {"Learn the basics of Spring"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.tutorialspoint.com/gwt/index.htm"
              underline="always"
            >
              {"Learn the basics of Google Web Toolkit"}
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
              href="https://www.w3schools.com/django/"
              underline="always"
            >
              {"Learn the basics of Django"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://flask.palletsprojects.com/en/2.2.x/tutorial/"
              underline="always"
            >
              {"Learn the basics of Flask"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default BackendStepTwoComponent;
