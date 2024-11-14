import React from 'react';

export default function EngagementByTime() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Engagement by Time</h3>
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-2xl font-bold">40%</p>
          <p className="text-xs">Afternoon</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">32%</p>
          <p className="text-xs">Evening</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">28%</p>
          <p className="text-xs">Morning</p>
        </div>
      </div>
    </div>
  );
}