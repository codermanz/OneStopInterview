import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function FrontendStepTwoComponent() {
  return (
    <Box>
      <Typography>
        Second, learn the basics of package managers. Below are resources we
        compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.debian.org/doc/manuals/aptitude/pr01s02.en.html"
              underline="always"
            >
              {"What is a package manager?"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/"
              underline="always"
            >
              {"Learn the basics of using Node Package Manager (NPM)"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://linuxhint.com/yarn-introduction-and-tutorial/"
              underline="always"
            >
              {"Learn the basics of using Yet Another Resource Negotiator (YARN)"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default FrontendStepTwoComponent;
