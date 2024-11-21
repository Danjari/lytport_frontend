// "use client";

// import React from "react";
// import { Bar, BarChart, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts";

// const followers = [
//   { country: "United Arab Emirates", count: 1400, fill: "#4A90E2" },
//   { country: "United States", count: 1278, fill: "#E94E77" },
//   { country: "India", count: 500, fill: "#50E3C2" },
//   { country: "China", count: 250, fill: "#F5A623" },
// ];

// export default function FollowersByCountry() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="mb-4">
//         <h3 className="text-lg font-medium">Number of Followers by Country</h3>
//         <p className="text-sm text-gray-500">Top follower countries</p>
//       </div>
//       <div className="flex justify-center mb-4">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={followers}
//             layout="vertical"
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Adjusted margins for better spacing
//           >
//             <YAxis
//               dataKey="country"
//               type="category"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               width={120} // Adjusted width for labels
//               tick={{ textAnchor: "end" }} // Aligned text properly
//             />
//             <XAxis dataKey="count" type="number" hide />
//             <Tooltip
//               cursor={{ fill: "transparent" }} // Transparent cursor on hover
//               contentStyle={{
//                 backgroundColor: "white",
//                 borderRadius: "8px",
//                 padding: "5px",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//               }}
//               formatter={(value) => `${value} followers`}
//               labelStyle={{ fontWeight: "bold", color: "#333" }}
//             />
//             <Bar dataKey="count" radius={[0, 10, 10, 0]}>
//               {followers.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.fill} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="text-sm text-gray-500 text-center">
//         Showing follower distribution by country
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function FollowersByCountry() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFollowersByCountry() {
      try {
        const response = await fetch("http://localhost:3000/api/insight/followersByCountry");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setFollowers(
          data
            .slice(0, 15) // Only show top 15 countries
            .map((entry, index) => ({
              ...entry,
              fill: ["#4A90E2", "#E94E77", "#50E3C2", "#F5A623"][index % 4], // Cycle through colors
            }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFollowersByCountry();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const topFifteen = followers.slice(0, 15);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Number of Followers by Country</h3>
        <p className="text-sm text-gray-500">Top 15 countries</p>
      </div>
      <div
        className="overflow-y-auto h-96 p-2 border rounded-lg shadow-inner"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #eee" }}
      >
        <ResponsiveContainer width="100%" height={followers.length * 50}>
          <BarChart
            data={followers}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150} // Adjusted width for long country names
            />
            <XAxis dataKey="count" type="number" hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
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
              {topFifteen.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 text-center mt-4">
        Showing follower distribution by country
      </div>
    </div>
  );
}