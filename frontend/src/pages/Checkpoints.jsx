import React from "react";
import { useState } from "react";
import checkpointList from "../components/Joblist-components/ListData.json";
import { Typography } from "@mui/material";

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleChecked = (e) => {
    setChecked(!checked);
  };

  return (
    <div
      className="bg-dark-bg h-screen text-white overflow-hidden"
      style={{ overflow: "auto" }}>
      {checkpointList.map((item, index) => {
        return (
          <div align="center" style={{ marginBottom: "90px" }}>
            <Typography
              variant="h4"
              align="center"
              color="rgba(51,102,204)"
              gutterBottom>
              {item.text}
            </Typography>
            {item.skills.map((skill, index) => {
              return (
                <div align="left" style={{ marginTop: "20px", width: "250px" }}>
                  <input
                    key={index}
                    type="checkbox"
                    name={skill}
                    value={skill}
                  />
                  <label>{skill}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
