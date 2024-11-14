import React from 'react';

export default function ViewsPerDay() {
  const dummyData = [150, 200, 300, 250, 320, 180, 210]; // Example data

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Views Per Day</h3>
      <p className="text-2xl font-bold">152,000</p>
      <p className="text-xs text-green-500">↑ 2.1% vs last week</p>
      {/* Insert bar chart or mock chart here */}
      <div className="mt-4 flex space-x-2">
        {dummyData.map((value, index) => (
          <div key={index} className="h-20 w-4 bg-blue-500" style={{ height: `${value}px` }}></div>
        ))}
      </div>
    </div>
  );
}