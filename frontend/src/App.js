import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
function App() {
   return (
      <>
         <Header />
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>
         </Router>
         <Footer />
      </>
   );
}

export default App;
