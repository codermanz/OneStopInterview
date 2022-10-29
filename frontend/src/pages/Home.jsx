import React from "react";
import { Footer, Navbar } from "../components/index";

function Home() {
   return (
      <div className="bg-dark-bg h-screen text-white overflow-hidden">
         <Navbar />
         <span>Home View</span>
         <Footer />
      </div>
   );
}

export default Home;
