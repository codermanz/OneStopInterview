import React from "react";
import { Typography, Link, Box, List, ListItem } from "@mui/material";

function FrontendStepFourComponent() {
  return (
    <Box>
      <Typography>
        Finally, learn how to deploy your websites. Below are resources we
        compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/"
              underline="always"
            >
              {"Deploying on Netlify"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://vercel.com/docs/concepts/deployments/overview"
              underline="always"
            >
              {"Deploying on Vercel"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://firebase.google.com/docs/hosting/quickstart"
              underline="always"
            >
              {"Deploying on Firebase"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://docs.github.com/en/pages/quickstart"
              underline="always"
            >
              {"Deploying on Github Pages"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default FrontendStepFourComponent;
