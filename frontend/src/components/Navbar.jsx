import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { PlusIcon, Sun, Moon } from "lucide-react";

function Navbar() {
   const [isDark, setIsDark] = useState(() => {
      return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
     }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
     };

  return (
    <header className="bg-base-200 border-b border-base-300">
      <div className="navbar max-w-6xl mx-auto px-4">
        
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            📝 Note App
          </Link>
        </div>

        {/* Right */}
        <div className="flex-none gap-2">
          
          {/* 🌙 Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* ➕ Create Button */}
          <Link to="/create" className="btn btn-primary btn-sm">
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;