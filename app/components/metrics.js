// src/components/Metrics.js
"use client";

import React from 'react';
import { useEffect, useState } from 'react';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('http://localhost:3000/api/dashboard/metrics');
        const metrics = await data.json();

        setMetrics(metrics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  
  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium">{metric.name}</h3>
          <div className="text-2xl font-bold">{metric.value}</div>
          <p className="text-xs text-gray-500">{metric.change} from last month</p>
        </div>
      ))}
    </div>
  )
}
