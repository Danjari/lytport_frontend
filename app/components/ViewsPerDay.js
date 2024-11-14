"use client";

import React, { Suspense, useEffect, useState } from 'react';
import LoadingSpinner from './loader';

export default function ViewsPerDay() {
  const [data, setData] = useState(null);
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Labels for each day

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/insight/viewsPerDay');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!data) return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoadingSpinner />
    </Suspense>
  );

  const maxValue = Math.max(...data); // Get the maximum value for normalization

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h3 className="text-lg font-semibold mb-2">Views Per Day</h3>
      <p className="text-3xl font-bold">32,000</p>
      <p className="text-sm text-green-500 mb-4">↑ 2.1% vs last week</p>
      <div className="flex justify-between items-end h-40 bg-white-100">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Tooltip */}
            <div
              className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 transition-opacity duration-300"
              style={{ transform: 'translateY(-100%)' }}
            >
              {value}
            </div>
            {/* Bar */}
            <div
              className="bg-blue-500 w-8 rounded-t hover:bg-blue-600 cursor-pointer"
              style={{ height: `${(value / maxValue) * 120 + 20}px` }}
              onMouseEnter={(e) => e.currentTarget.previousSibling.classList.add("opacity-100")}
              onMouseLeave={(e) => e.currentTarget.previousSibling.classList.remove("opacity-100")}
            ></div>
            <span className="text-xs mt-1 text-gray-600">{labels[index]}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm flex items-center gap-2">
        <span className="text-green-500 font-semibold">Trending up by 5.2% this month</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Showing total visitors for the last 7 days</p>
    </div>
  );
}
