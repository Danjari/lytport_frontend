'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50"
      style={{ height: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-md"
            src="./logo.png"
            alt="Logo"
          />
          <h1 className="text-xl font-bold ml-3 hidden sm:block tracking-wide">
            LytportAI
          </h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-400 transition-all duration-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex space-x-8 absolute md:static top-16 left-0 w-full md:w-auto from-gray-800 via-blue-900 to-gray-800 md:bg-transparent md:space-x-8 md:p-0 p-4`}
        >
          <Link href="/">
            <span className="block hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Dashboard
            </span>
          </Link>
          <Link href="../insights">
            <span className="block hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Insights
            </span>
          </Link>
          <Link href="../chatWithData">
            <span className="block hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Chat With Data
            </span>
          </Link>
          <Link href="../report">
            <span className="block hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Report
            </span>
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications Button */}
          <button className="text-gray-300 hover:text-blue-400 transition-all duration-200">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V8a6 6 0 10-12 0v6a2.032 2.032 0 01-.595 1.595L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6"
              ></path>
            </svg>
          </button>

          <div className="relative">
            <UserButton
              appearance={{
                elements: {
                  userButtonOuterIdentifier: 'text-white',
                },
              }}
              showName={true}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}