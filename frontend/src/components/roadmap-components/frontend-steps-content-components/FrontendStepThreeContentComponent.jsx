import React from "react";
import {
  Typography,
  Link,
  Box,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";

function FrontendStepThreeComponent() {
  return (
    <Box>
      <Typography>
        Third, pick a Javascript framework or library to learn. Below are
        resources we compiled to help you get started:
      </Typography>

      <Box sx={{ margin: "10px" }}>
        <Typography variant="h6" color="#4C94FF">
          React
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://reactjs.org/community/courses.html"
              underline="always"
            >
              {"Learn how to use React"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.fastcomet.com/blog/what-can-i-build-with-react-js"
              underline="always"
            >
              {"15 React project ideas to do"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          Angular
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.simplilearn.com/learn-angular-basics-free-course-skillup"
              underline="always"
            >
              {"Learn how to use Angular"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://hackr.io/blog/angular-projects"
              underline="always"
            >
              {"10 Angular project ideas to do"}
            </Link>
          </ListItem>
        </List>

        <Typography variant="h6" color="#4C94FF">
          Vue
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://vueschool.io/courses/vuejs-fundamentals"
              underline="always"
            >
              {"Learn how to use Vue"}
            </Link>
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <Link
              target="_blank"
              href="https://www.blog.duomly.com/vue-js-project-ideas-for-beginners/"
              underline="always"
            >
              {"9 Vue project ideas to do"}
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default FrontendStepThreeComponent;
