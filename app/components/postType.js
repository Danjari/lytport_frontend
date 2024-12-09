// "use client";

// import React from 'react';
// import { PieChart, Pie, Cell } from 'recharts';

// const data = [
//   { name: 'Reel', value: 898, percentage: '78%', color: '#4A90E2' },
//   { name: 'Carousel album', value: 126, percentage: '11%', color: '#F5A623' },
//   { name: 'Photo post', value: 70, percentage: '6%', color: '#50E3C2' },
  
// ];

// export default function PostTypes() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold mb-4">📸 Post types</h3>
//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Donut Chart */}
//         <div className="flex-1 flex justify-center">
//           <PieChart width={200} height={200}>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={60}
//               outerRadius={80}
//               paddingAngle={5}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </div>

//         {/* Table */}
//         <div className="flex-1">
//           <table className="w-full text-left border-collapse">
//             <tbody>
//               {data.map((entry, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-50"
//                   style={{
//                     backgroundColor: entry.color,
//                     color: '#fff',
//                     borderBottom: '2px solid #fff',
//                   }}
//                 >
//                   <td className="py-2 px-4 text-sm font-bold">{entry.percentage}</td>
//                   <td className="py-2 px-4 text-sm">{entry.name}</td>
//                   <td className="py-2 px-4 text-sm font-bold">{entry.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4A90E2", "#F5A623", "#50E3C2", "#9013FE", "#B8E986"]; // Color palette for chart

export default function PostTypes() {
  const [postTypes, setPostTypes] = useState([]);

  useEffect(() => {
    async function fetchPostTypes() {
      try {
        const response = await fetch("/api/combined-metrics"); // API endpoint for combined metrics
        const data = await response.json();

        if (data && data.postTypes) {
          setPostTypes(data.postTypes); // Set the post types data from API
        }
      } catch (error) {
        console.error("Error fetching post types:", error);
      }
    }

    fetchPostTypes();
  }, []); // Fetch data once on component mount

  if (!postTypes.length) return <div>Loading...</div>; // Loading state while fetching data

  // Calculate total posts for percentage computation
  const totalPosts = postTypes.reduce((sum, post) => sum + post.value, 0);

  // Add percentages and colors to the data
  const formattedData = postTypes.map((post, index) => ({
    ...post,
    percentage: ((post.value / totalPosts) * 100).toFixed(1) + "%",
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">📸 Post types</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Donut Chart */}
        <div className="flex-1 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <tbody>
              {formattedData.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                  style={{
                    backgroundColor: entry.color,
                    color: "#fff",
                    borderBottom: "2px solid #fff",
                  }}
                >
                  <td className="py-2 px-4 text-sm font-bold">{entry.percentage}</td>
                  <td className="py-2 px-4 text-sm">{entry.name}</td>
                  <td className="py-2 px-4 text-sm font-bold">{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
