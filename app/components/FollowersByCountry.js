"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts";

const followers = [
  { country: "United Arab Emirates", count: 1400, fill: "#4A90E2" },
  { country: "United States", count: 1278, fill: "#E94E77" },
  { country: "India", count: 500, fill: "#50E3C2" },
  { country: "China", count: 250, fill: "#F5A623" },
];

export default function FollowersByCountry() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Number of Followers by Country</h3>
        <p className="text-sm text-gray-500">Top follower countries</p>
      </div>
      <div className="flex justify-center mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={followers}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Adjusted margins for better spacing
          >
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120} // Adjusted width for labels
              tick={{ textAnchor: "end" }} // Aligned text properly
            />
            <XAxis dataKey="count" type="number" hide />
            <Tooltip
              cursor={{ fill: "transparent" }} // Transparent cursor on hover
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "5px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
              formatter={(value) => `${value} followers`}
              labelStyle={{ fontWeight: "bold", color: "#333" }}
            />
            <Bar dataKey="count" radius={[0, 10, 10, 0]}>
              {followers.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 text-center">
        Showing follower distribution by country
      </div>
    </div>
  );
}