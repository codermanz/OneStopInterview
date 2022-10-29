import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, InterviewPage, Login, ResumeTips, Roadmap } from "./pages";
function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/interview" element={<InterviewPage />} />
               <Route path="/resume-tips" element={<ResumeTips />} />
               <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
