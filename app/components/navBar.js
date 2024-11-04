// src/components/NavBar.js
'use client'

import React from 'react'

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
          />
          <div className="hidden md:flex ml-10 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white">Analytics</a>
            <a href="#" className="text-gray-300 hover:text-white">Content</a>
            <a href="#" className="text-gray-300 hover:text-white">Suggestions</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V8a6 6 0 10-12 0v6a2.032 2.032 0 01-.595 1.595L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6"></path>
            </svg>
          </button>
          <div className="relative">
            <button className="flex items-center bg-gray-800 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
            {/* Placeholder for dropdown items */}
          </div>
        </div>
      </div>
    </nav>
  )
}
