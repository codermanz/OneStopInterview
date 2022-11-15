import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}>
        <Sidebar />
        <main>{children}</main>
      </Box>
    </div>
  );
};

export default Wrapper;
