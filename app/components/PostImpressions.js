"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data for one month (e.g., November 2024)
const data = [
  { date: 'Nov 1', impressions: 500 },
  { date: 'Nov 2', impressions: 600 },
  { date: 'Nov 3', impressions: 750 },
  { date: 'Nov 4', impressions: 800 },
  { date: 'Nov 5', impressions: 650 },
  { date: 'Nov 6', impressions: 700 },
  { date: 'Nov 7', impressions: 900 },
  { date: 'Nov 8', impressions: 950 },
  { date: 'Nov 9', impressions: 850 },
  { date: 'Nov 10', impressions: 1000 },
  { date: 'Nov 11', impressions: 1200 },
  { date: 'Nov 12', impressions: 1100 },
  { date: 'Nov 13', impressions: 1150 },
  { date: 'Nov 14', impressions: 1250 },
  { date: 'Nov 15', impressions: 1300 },
  { date: 'Nov 16', impressions: 1400 },
  { date: 'Nov 17', impressions: 1350 },
  { date: 'Nov 18', impressions: 1450 },
  { date: 'Nov 19', impressions: 1500 },
  { date: 'Nov 20', impressions: 1550 },
  { date: 'Nov 21', impressions: 1600 },
  { date: 'Nov 22', impressions: 1700 },
  { date: 'Nov 23', impressions: 1750 },
  { date: 'Nov 24', impressions: 1800 },
  { date: 'Nov 25', impressions: 1850 },
  { date: 'Nov 26', impressions: 1900 },
  { date: 'Nov 27', impressions: 1950 },
  { date: 'Nov 28', impressions: 2000 },
  { date: 'Nov 29', impressions: 2100 },
  { date: 'Nov 30', impressions: 2200 },
];

export default function PostImpressions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-orange-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2 text-pink-500">📸</span> Post Impressions (November 2024)
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="hover:text-gray-600">
            <span role="img" aria-label="help">❓</span>
          </button>
          <button className="hover:text-gray-600">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: '5px',
              color: '#fff',
              padding: '10px',
            }}
            labelStyle={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}
            formatter={(value) => [`${value} impressions`, 'Post impressions']}
          />
          <Line type="monotone" dataKey="impressions" stroke="#4A90E2" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}