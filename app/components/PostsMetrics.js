"use client";

import React from 'react';

export default function PostsMetrics() {
  const metrics = [
    {
      id: 1,
      title: 'Followers',
      value: '1,131',
      description: 'followers',
      icon: '👥', // Replace with Instagram icon or an appropriate SVG
    },
    {
      id: 2,
      title: 'Post engagement rate',
      value: '6.23%',
      description: 'engagement rate',
      icon: '📊', // Replace with an engagement icon or an appropriate SVG
    },
    {
      id: 3,
      title: 'Post impressions',
      value: '426,224',
      description: 'impressions',
      icon: '👁️', // Replace with impressions icon or an appropriate SVG
    },
    {
      id: 4,
      title: 'Post Reach',
      value: '44,643',
      description: 'reach',
      icon: '📈', // Replace with engagement icon or an appropriate SVG
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start border relative hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-pink-500">{metric.icon}</span>
              <h3 className="text-sm font-semibold">{metric.title}</h3>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="text-sm">
                <span role="img" aria-label="Help">
                  ❓
                </span>
              </button>
              <button className="text-sm">
                <span role="img" aria-label="Settings">
                  ⚙️
                </span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}