import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1a244d] to-[#0f172a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition ml-5">
          ModernShop
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-300">
          <button className="cursor-pointer hover:text-white transition">Privacy Policy</button>
          <button className="cursor-pointer hover:text-white transition">Terms & Conditions</button>
          <button className="cursor-pointer hover:text-white transition">Help Center</button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-400 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>

  )
}

export default Footer