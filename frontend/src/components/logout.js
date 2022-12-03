import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("user/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    props.setState({ username: null, progress: null });
    navigate("/login");
  });

  return <div>Logout</div>;
}
