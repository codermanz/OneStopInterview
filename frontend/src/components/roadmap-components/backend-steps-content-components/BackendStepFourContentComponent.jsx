import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function BackendStepFourComponent() {
  return (
    <Box>
      <Typography>
        Finally, learn about databases. Below are resources we compiled to help
        you get started:
      </Typography>
      <Box sx={{ margin: "10px" }}>
        <Typography variant="h6" color="#4C94FF">
          SQL Databases
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.mysqltutorial.org/"
              underline="always"
            >
              {"Learn the basics of MySQL"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.postgresqltutorial.com/"
              underline="always"
            >
              {"Learn the basics of PostgreSQL"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          NoSQL Databases
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.mongodb.com/docs/manual/tutorial/"
              underline="always"
            >
              {"Learn the basics of MongoDB"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.tutorialspoint.com/dynamodb/index.htm"
              underline="always"
            >
              {"Learn the basics of DynamoDB"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default BackendStepFourComponent;
