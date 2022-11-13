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
import { Navbar, Logout, Wrapper } from "./components";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="bg-dark-bg">
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route path="/resume-tips" element={<ResumeTips />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route
                path="/resume-tips/checkpoints"
                element={<Checkpoints />}
              />
              <Route path="/register" element={<Registration />} />
              <Route path="/logout" element={<Logout />}></Route>
            </Routes>
          </Wrapper>
        </div>
      </Router>
    </>
  );
}

export default App;
