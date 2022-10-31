import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, InterviewPage, Login, ResumeTips, Roadmap } from "./pages";
import { Navbar } from "./components";
function App() {
   return (
      <>
         <Router>
            <div className="bg-dark-bg">
               <Navbar />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/interview" element={<InterviewPage />} />
                  <Route path="/resume-tips" element={<ResumeTips />} />
                  <Route path="/roadmap" element={<Roadmap />} />
               </Routes>
            </div>
         </Router>
      </>
   );
}

export default App;
