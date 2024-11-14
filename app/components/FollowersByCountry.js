import React from 'react';

const followers = [
  { country: 'United Arab Emirates', count: 1400 },
  { country: 'United States', count: 1278 },
  { country: 'India', count: 500 },
  { country: 'China', count: 250 },
];

export default function FollowersByCountry() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Number of Followers by Country</h3>
      <ul>
        {followers.map((item, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span>{item.country}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}