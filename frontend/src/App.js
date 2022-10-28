import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Footer, Navbar} from './components'
import {Home, InterviewPage, Login, ResumeTips, Roadmap} from './pages'
function App() {
   return (
      <>
         <Navbar />
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/interview" element={<InterviewPage />} />
               <Route path="/resume-tips" element={<ResumeTips />} />
               <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
         </Router>
         <Footer />
      </>
   );
}

export default App;
