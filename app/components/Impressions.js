import React from 'react';

export default function Impressions() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Impressions</h3>
      <p className="text-2xl font-bold">548,105</p>
      <p className="text-xs text-red-500">↓ 2.1% vs last week</p>
      {/* Add a line chart or graph here for visual representation */}
      <div className="mt-4 flex space-x-2">
        {/* Dummy line chart representation */}
        <div className="h-16 w-4 bg-blue-200"></div>
        <div className="h-24 w-4 bg-blue-500"></div>
        <div className="h-20 w-4 bg-blue-400"></div>
        <div className="h-12 w-4 bg-blue-300"></div>
        <div className="h-28 w-4 bg-blue-600"></div>
        <div className="h-16 w-4 bg-blue-400"></div>
      </div>
    </div>
  );
}