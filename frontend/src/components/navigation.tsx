'use client';

import { useState } from "react";
import { SearchIcon, MenuIcon, XIcon } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-black/10 backdrop-blur-md shadow-md pry-ff">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-[var(--txt-clr)] text-lg font-bold">LarksPod</h1>

        {/* Navigation Links - Hidden on small screens, visible on md and up */}
        <ul className="hidden md:flex items-center gap-6 text-[var(--txt-clr)] uppercase text-sm">
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer">home</li>
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer">about</li>
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer">contact</li>
          <li>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md focus-within:ring-2 ring-[var(--acc-clr)]">
              <input
                type="search"
                placeholder="Stream podcast..."
                className="bg-transparent outline-none text-sm text-[var(--txt-clr)] placeholder:text-[var(--txt-clr)] w-36 md:w-48"
              />
              <SearchIcon className="text-[var(--txt-clr)] w-4 h-4" />
            </div>
            {/* Sign In Button for Mobile (optional, can be moved inside mobile menu) */}
            <button className="md:hidden text-[var(--bg-clr)] border border-[var(--txt-clr)] px-4 py-1 rounded bg-[var(--txt-clr)] transition cursor-pointer">
                Sign In
            </button>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile - Visible on small screens, hidden on md and up */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="text-[var(--txt-clr)] focus:outline-none cursor-pointer">
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" /> // 'X' icon when menu is open
            ) : (
              <MenuIcon className="w-6 h-6" /> // Hamburger icon when menu is closed
            )}
          </button>
        </div>

        {/* Sign In Button - Visible on md and up */}
        <button
          className="hidden md:block text-[var(--bg-clr)] border border-[var(--txt-clr)] px-4 py-1 rounded bg-[var(--txt-clr)] transition cursor-pointer">
          Sign In
        </button>
      </div>

      {/* Mobile Menu - Conditionally rendered based on isMobileMenuOpen state */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center py-4 text-white uppercase text-sm space-y-4">
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer" onClick={toggleMobileMenu}>home</li>
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer" onClick={toggleMobileMenu}>about</li>
          <li className="hover:text-[var(--acc-clr)] transition-colors cursor-pointer" onClick={toggleMobileMenu}>contact</li>
          <li>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md focus-within:ring-2 ring-[var(--acc-clr)]">
              <input
                type="search"
                placeholder="Stream podcast..."
                className="bg-transparent outline-none text-sm text-[var(--txt-clr)] placeholder:text-[var(--txt-clr)] w-36"
              />
              <SearchIcon className="text-[var(--txt-clr)] w-4 h-4" />
            </div>
          </li>
          <li>
            <button className="text-[var(--bg-clr)] border border-[var(--txt-clr)] px-4 py-1 rounded bg-[var(--txt-clr)] transition cursor-pointer" onClick={toggleMobileMenu}>
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}