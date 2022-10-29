import React from "react";

function Navbar() {
   return (
      <div
         className="text-white sticky flex-none top-0 m-0 h-14 border-b border-slate-300/10 
      backdrop-blur-sm shadow-lg">
         <div className="max-w-8xl mx-auto">
            <div className="py-4 mx-16">
               <div className="relateive flex items-center">
                  <a href="../" className="mr-8">
                     <span>One Stop Interview</span>
                  </a>
                  <ul className="flex space-x-8">
                     <li>Interview Prep</li>
                     <li>Resume</li>
                     <li>Jobs</li>
                     <li>Forums</li>
                     <li>Roadmap</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Navbar;
