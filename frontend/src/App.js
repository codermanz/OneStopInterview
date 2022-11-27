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
  Error,
} from "./pages";
import { Navbar, Logout, Loader } from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import axiosInstance from "./axios";

function App() {
  const [appState, setAppState] = useState({
    username: null,
    postProgress: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Get User Info");
    axiosInstance
      .get(`/user/userInfo/`)
      .then((res) => {
        console.log("Trying to get userInfo");
        const result = res.data;
        console.log(result);
        setLoading(false);
        setAppState({
          username: result.user_name,
          progress: result.progress_percentage,
        });
      })
      .catch((err) => {
        setLoading(false);
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  }, [appState]);

  return (
    <>
      <CssBaseline />
      <Router>
        <div className="bg-dark-bg">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Navbar state={appState} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/interview"
                  element={<InterviewPage state={appState} />}
                />
                <Route path="/resume-tips" element={<ResumeTips />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route
                  path="/resume-tips/checkpoints"
                  element={<Checkpoints />}
                />
                <Route path="/register" element={<Registration />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
