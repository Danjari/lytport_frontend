// 'use client'

// import React, { useState } from "react";
// import { Bar } from "react-chartjs-2";

// function calculatePearsonCorrelation(x, y) {
//   const n = x.length;
//   const meanX = x.reduce((a, b) => a + b, 0) / n;
//   const meanY = y.reduce((a, b) => a + b, 0) / n;

//   const numerator = x.map((xi, i) => (xi - meanX) * (y[i] - meanY)).reduce((a, b) => a + b, 0);
//   const denominator = Math.sqrt(
//     x.map((xi) => (xi - meanX) ** 2).reduce((a, b) => a + b, 0) *
//       y.map((yi) => (yi - meanY) ** 2).reduce((a, b) => a + b, 0)
//   );

//   return numerator / denominator;
// }

// export default function Correlation() {
//   const [featureX, setFeatureX] = useState("");
//   const [featureY, setFeatureY] = useState("");
//   const [correlation, setCorrelation] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCalculateCorrelation = async () => {
//     if (!featureX || !featureY) {
//       alert("Please select both features.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Fetch data from the route.js endpoint
//       const response = await fetch("/api/route"); // Replace with your actual endpoint
//       const data = await response.json();

//       if (!Array.isArray(data)) {
//         alert("Invalid data from API.");
//         return;
//       }

//       // Extract feature data
//       const featureXData = data.map((item) => item[featureX]);
//       const featureYData = data.map((item) => item[featureY]);

//       if (featureXData.length === 0 || featureYData.length === 0) {
//         alert("Selected features have no data.");
//         return;
//       }

//       // Calculate correlation
//       const correlationValue = calculatePearsonCorrelation(featureXData, featureYData);
//       setCorrelation(correlationValue);
//     } catch (error) {
//       console.error("Error calculating correlation:", error);
//       alert("Failed to calculate correlation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const featuresLeft = ["time", "day", "media_type", "caption_size"];
//   const featuresRight = ["like_count", "comments_count", "engagement"];

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Feature Correlation</h1>

//       <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//         <div>
//           {featuresLeft.map((feature) => (
//             <div key={feature}>
//               <label>
//                 <input
//                   type="radio"
//                   name="featureX"
//                   value={feature}
//                   onChange={() => setFeatureX(feature)}
//                 />
//                 {feature}
//               </label>
//             </div>
//           ))}
//         </div>

//         <div>
//           {featuresRight.map((feature) => (
//             <div key={feature}>
//               <label>
//                 <input
//                   type="radio"
//                   name="featureY"
//                   value={feature}
//                   onChange={() => setFeatureY(feature)}
//                 />
//                 {feature}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleCalculateCorrelation}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           backgroundColor: "#b2f0f0",
//           border: "none",
//           cursor: "pointer",
//         }}
//         disabled={loading}
//       >
//         {loading ? "Calculating..." : "Get Correlation"}
//       </button>

//       {correlation !== null && (
//         <div style={{ marginTop: "40px" }}>
//           <h2>
//             Correlation between <b>{featureX}</b> and <b>{featureY}</b>:{" "}
//             {correlation.toFixed(2)}
//           </h2>
//           <Bar
//             data={{
//               labels: [`${featureX} vs ${featureY}`],
//               datasets: [
//                 {
//                   label: "Correlation",
//                   data: [correlation],
//                   backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 },
//               ],
//             }}
//             options={{
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   max: 1,
//                 },
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import LoadingSpinner from "./loader";

// export default function InstagramPostTable() {
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/dashboard/instagramPosts"
//         ); // Backend endpoint to fetch Instagram posts
//         const data = await response.json();
//         setPosts(data); // Assuming the API response is an array of posts
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   if (!posts)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     );

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//       <h3 className="text-lg font-bold mb-4 text-gray-800">Instagram Posts</h3>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-200 p-2 text-left">Posting Time</th>
//             <th className="border border-gray-200 p-2 text-left">Media Type</th>
//             <th className="border border-gray-200 p-2 text-left">Likes Count</th>
//             <th className="border border-gray-200 p-2 text-left">Comments Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post.id} className="hover:bg-gray-50">
//               <td className="border border-gray-200 p-2">
//                 {new Date(post.timestamp).toLocaleString()}
//               </td>
//               <td className="border border-gray-200 p-2">{post.media_type}</td>
//               <td className="border border-gray-200 p-2">{post.like_count}</td>
//               <td className="border border-gray-200 p-2">{post.comments_count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// "use client";

// import React, { useEffect, useState } from "react";
// import LoadingSpinner from "./loader";

// export default function InstagramPostTable() {
//   const [postsDict, setPostsDict] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/dashboard/instagramPosts"
//         ); // Fetch posts from API
//         const data = await response.json();

//         // Helper function to convert categorical values to numeric
//         const mediaTypeMapping = {
//           image: 1,
//           video: 2,
//           carousel: 3,
//         };

//         const dayMapping = {
//           Monday: 1,
//           Tuesday: 2,
//           Wednesday: 3,
//           Thursday: 4,
//           Friday: 5,
//           Saturday: 6,
//           Sunday: 7,
//         };

//         // Process data and store it in a dictionary
//         const postsDictionary = data.reduce((dict, post) => {
//           const postId = post.id; // Use a unique identifier for each post

//           // Convert non-numeric values to numeric
//           const numericMediaType =
//             mediaTypeMapping[post.media_type] || 0; // Default to 0 for unknown
//           const numericDay = dayMapping[post.day] || 0; // Default to 0 for unknown
//           const numericTime = new Date(post.time).getTime(); // Convert to timestamp

//           dict[postId] = {
//             likes: post.like_count,
//             comments: post.comments_count,
//             engagement: post.like_count + post.comments_count,
//             time: numericTime,
//             day: numericDay,
//             mediaType: numericMediaType,
//             captionSize: post.caption_size,
//           };

//           return dict;
//         }, {});

//         setPostsDict(postsDictionary);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   if (!postsDict)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     );

//   // For testing, log the dictionary to console
//   console.log("Processed Posts Dictionary:", postsDict);

//   return (
//     <div>
//       <h1>Processed Instagram Posts</h1>
//       <pre>{JSON.stringify(postsDict, null, 2)}</pre>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { fetchInstagramPosts } from "./instagramPosts"; // Update with the correct relative path
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import required components
import { Scatter } from "react-chartjs-2"; // Install this library: npm install chart.js react-chartjs-2
import * as ss from "simple-statistics";

// Register required components
ChartJS.register(LinearScale, LineElement, Tooltip, Legend);

export default function Dictionary() {
  const [correlationResults, setCorrelationResults] = useState(null);
  const [scatterData, setScatterData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const dictionary = await fetchInstagramPosts();

      if (dictionary) {
        const dayMapping = {
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
          Sunday: 7,
        };

        const mediaTypeMapping = {
          IMAGE: 1,
          VIDEO: 2,
          CAROUSEL_ALBUM: 3,
        };

        const convertedDictionary = Object.entries(dictionary).reduce(
          (numericDict, [key, values]) => {
            numericDict[key] = Object.entries(values).reduce(
              (convertedValues, [field, value]) => {
                let numericValue = value;

                if (field === "day") {
                  numericValue = dayMapping[value] || 0;
                } else if (field === "mediaType") {
                  numericValue = mediaTypeMapping[value] || 0;
                } else if (field === "time") {
                  const [hours, minutes] = value.split(":").map(Number);
                  numericValue = hours + minutes / 60 || 0;
                } else if (typeof value !== "number") {
                  numericValue = Number(value);
                  if (isNaN(numericValue)) numericValue = 0;
                }

                convertedValues[field] = numericValue;
                return convertedValues;
              },
              {}
            );

            return numericDict;
          },
          {}
        );

        const fieldsToCorrelate = ["time", "day", "mediaType", "captionSize"];
        const targetFields = ["likes", "comments", "engagement"];
        const correlations = {};
        const regressionPlots = [];

        fieldsToCorrelate.forEach((fieldX) => {
          targetFields.forEach((fieldY) => {
            const xValues = Object.values(convertedDictionary).map(
              (item) => item[fieldX]
            );
            const yValues = Object.values(convertedDictionary).map(
              (item) => item[fieldY]
            );

            const correlation = ss.sampleCorrelation(xValues, yValues);
            correlations[`${fieldX} vs ${fieldY}`] = correlation;

            // Calculate regression line
            const regression = ss.linearRegression(
              xValues.map((x, i) => [x, yValues[i]])
            );
            const regressionLine = ss.linearRegressionLine(regression);

            // Prepare regression line data
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const regressionLineData = [
              { x: minX, y: regressionLine(minX) },
              { x: maxX, y: regressionLine(maxX) },
            ];

            const scatterData = {
              datasets: [
                {
                  label: `${fieldX} vs ${fieldY} (Regression Line)`,
                  data: regressionLineData,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                  pointRadius: 0, // Hide points
                  type: "line", // Render as a line
                },
              ],
            };

            regressionPlots.push({ fieldX, fieldY, scatterData });
          });
        });

        setCorrelationResults(correlations);
        setScatterData(regressionPlots);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Correlation Results:</h2>
      {correlationResults ? (
        <pre>{JSON.stringify(correlationResults, null, 2)}</pre>
      ) : (
        <p>Calculating correlations...</p>
      )}
      <h2>Regression Lines:</h2>
      {scatterData
        ? scatterData.map(({ fieldX, fieldY, scatterData }, index) => (
            <div
              key={index}
              style={{
                marginBottom: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "600px",
                height: "400px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <div>
                <h3 style={{ textAlign: "center" }}>
                  {fieldX} vs {fieldY}
                </h3>
                <Scatter
                  data={scatterData}
                  options={{
                    scales: {
                      x: { title: { display: true, text: fieldX } },
                      y: { title: { display: true, text: fieldY } },
                    },
                    plugins: {
                      legend: { display: true },
                    },
                    responsive: false,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          ))
        : "Generating regression lines..."}
    </div>
  );
}
