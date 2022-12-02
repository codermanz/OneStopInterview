import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function BackendStepThreeComponent() {
  return (
    <Box>
      <Typography>
        Third, learn several backend concepts. Below are resources we
        compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.venafi.com/blog/what-are-differences-between-http-https-0"
              underline="always"
            >
              {"HTTP vs HTTPS"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.redhat.com/en/topics/api/what-is-a-rest-api"
              underline="always"
            >
              {"REST API"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/"
              underline="always"
            >
              {"Web Sockets"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm"
              underline="always"
            >
              {"MVC Architecture"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default BackendStepThreeComponent;
