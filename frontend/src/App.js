import React from "react";
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

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="bg-dark-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/interview" element={<InterviewPage />} />
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
