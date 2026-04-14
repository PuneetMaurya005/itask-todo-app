import React from 'react'
import { FaTasks } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="flex justify-between p-5 bg-violet-900 text-white">
      <div className="logo">
        <span className="font-bold text-xt mx-8 flex gap-2 ">iTask < FaTasks size={20} /></span>
      </div>
      <ul className="flex gap-7">
        <li className='cursor-pointer hover:font-bold transition-all flex gap-2'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all flex gap-2'>Your Tasks</li>
      </ul>
    </nav>
  )
}