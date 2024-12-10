"use client";

import React from 'react';
import NavBar from '../components/navBar';
import PostCorrelation from '../components/postCorrelation';
import PostGraph from '../components/postsgraph';

export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Correlation</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* White block with shadow for PostCorrelation */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <PostCorrelation />
          </div>
          {/* White block with shadow for PostGraph */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <PostGraph />
          </div>
        </div>
      </main>
    </div>
  );
}
