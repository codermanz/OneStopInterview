import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  InterviewPage,
  Login,
  ResumeTips,
  Roadmap,
  Registration,
  Checkpoints,
} from "./pages";
import { Navbar, Logout } from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import axiosInstance from "./axios";

function App() {
  const [appState, setAppState] = useState({
    loading: true,
    username: null,
    postProgress: null,
  });

  const handleLoadingChange = (newValue) => {
    setAppState({
      ...appState,
      loading: newValue,
    });
  };

  useEffect(() => {
    axiosInstance
      .get(`/user/userInfo/`)
      .then((res) => {
        console.log("Trying to get userInfo");
        const result = res.data;
        console.log(result);
        setAppState({
          loading: false,
          username: result.user_name,
          progress: result.progress_percentage,
        });
      })
      .catch((err) => console.log(err));
  }, [setAppState]);

  return (
    <>
      <CssBaseline />
      <Router>
        <div className="bg-dark-bg">
          <Navbar state={appState} onLoadingChange={handleLoadingChange} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/interview"
              element={<InterviewPage state={appState} />}
            />
            <Route path="/resume-tips" element={<ResumeTips />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/resume-tips/checkpoints" element={<Checkpoints />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
