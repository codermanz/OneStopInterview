import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
function Navbar() {
  return (
    <div
      className='text-white sticky flex-none top-0 m-0 h-14 border-b border-slate-300/10 
            backdrop-blur-sm shadow-lg'>
      <div className='max-w-8xl mx-auto'>
        <div className='py-4 mx-16'>
          <div className='relative flex items-center'>
            <a href='../' className='mr-48 flex'>
              <span> ONE STOP INTERVIEW </span>
            </a>
            <ul className='flex space-x-16'>
              <li className='hover:text-theme-blue hover:cursor-pointer'>
                <Link to='/interview'>Interview Prep</Link>
              </li>
              <li className='hover:text-theme-blue hover:cursor-pointer'>
                <Link to='/resume-tips'>Resume</Link>
              </li>
              <li className='hover:text-theme-blue hover:cursor-pointer'>
                Jobs
              </li>
              <li className='hover:text-theme-blue hover:cursor-pointer'>
                Forums
              </li>
              <li className='hover:text-theme-blue hover:cursor-pointer'>
                <Link to='/roadmap'>Roadmap</Link>
              </li>
            </ul>
            <div className='ml-24 hover:text-theme-blue hover:cursor-pointer'>
              <a href='/login/'>Login/Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
