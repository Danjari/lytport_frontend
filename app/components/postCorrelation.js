'use client'

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function calculatePearsonCorrelation(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.map((xi, i) => (xi - meanX) * (y[i] - meanY)).reduce((a, b) => a + b, 0);
  const denominator = Math.sqrt(
    x.map((xi) => (xi - meanX) ** 2).reduce((a, b) => a + b, 0) *
      y.map((yi) => (yi - meanY) ** 2).reduce((a, b) => a + b, 0)
  );

  return numerator / denominator;
}

export default function Correlation() {
  const [featureX, setFeatureX] = useState("");
  const [featureY, setFeatureY] = useState("");
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateCorrelation = async () => {
    if (!featureX || !featureY) {
      alert("Please select both features.");
      return;
    }

    setLoading(true);

    try {
      // Fetch data from the route.js endpoint
      const response = await fetch("/api/route"); // Replace with your actual endpoint
      const data = await response.json();

      if (!Array.isArray(data)) {
        alert("Invalid data from API.");
        return;
      }

      // Extract feature data
      const featureXData = data.map((item) => item[featureX]);
      const featureYData = data.map((item) => item[featureY]);

      if (featureXData.length === 0 || featureYData.length === 0) {
        alert("Selected features have no data.");
        return;
      }

      // Calculate correlation
      const correlationValue = calculatePearsonCorrelation(featureXData, featureYData);
      setCorrelation(correlationValue);
    } catch (error) {
      console.error("Error calculating correlation:", error);
      alert("Failed to calculate correlation.");
    } finally {
      setLoading(false);
    }
  };

  const featuresLeft = ["time", "day", "media_type", "caption_size"];
  const featuresRight = ["like_count", "comments_count", "engagement"];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Feature Correlation</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          {featuresLeft.map((feature) => (
            <div key={feature}>
              <label>
                <input
                  type="radio"
                  name="featureX"
                  value={feature}
                  onChange={() => setFeatureX(feature)}
                />
                {feature}
              </label>
            </div>
          ))}
        </div>

        <div>
          {featuresRight.map((feature) => (
            <div key={feature}>
              <label>
                <input
                  type="radio"
                  name="featureY"
                  value={feature}
                  onChange={() => setFeatureY(feature)}
                />
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleCalculateCorrelation}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#b2f0f0",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Get Correlation"}
      </button>

      {correlation !== null && (
        <div style={{ marginTop: "40px" }}>
          <h2>
            Correlation between <b>{featureX}</b> and <b>{featureY}</b>:{" "}
            {correlation.toFixed(2)}
          </h2>
          <Bar
            data={{
              labels: [`${featureX} vs ${featureY}`],
              datasets: [
                {
                  label: "Correlation",
                  data: [correlation],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}


"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "./loader";

export default function InstagramPostTable() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/instagramPosts"
        ); // Backend endpoint to fetch Instagram posts
        const data = await response.json();
        setPosts(data); // Assuming the API response is an array of posts
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (!posts)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Instagram Posts</h3>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Posting Time</th>
            <th className="border border-gray-200 p-2 text-left">Media Type</th>
            <th className="border border-gray-200 p-2 text-left">Likes Count</th>
            <th className="border border-gray-200 p-2 text-left">Comments Count</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">
                {new Date(post.timestamp).toLocaleString()}
              </td>
              <td className="border border-gray-200 p-2">{post.media_type}</td>
              <td className="border border-gray-200 p-2">{post.like_count}</td>
              <td className="border border-gray-200 p-2">{post.comments_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "./loader";

export default function InstagramPostTable() {
  const [postsDict, setPostsDict] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/instagramPosts"
        ); // Fetch posts from API
        const data = await response.json();

        // Helper function to convert categorical values to numeric
        const mediaTypeMapping = {
          image: 1,
          video: 2,
          carousel: 3,
        };

        const dayMapping = {
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
          Sunday: 7,
        };

        // Process data and store it in a dictionary
        const postsDictionary = data.reduce((dict, post) => {
          const postId = post.id; // Use a unique identifier for each post

          // Convert non-numeric values to numeric
          const numericMediaType =
            mediaTypeMapping[post.media_type] || 0; // Default to 0 for unknown
          const numericDay = dayMapping[post.day] || 0; // Default to 0 for unknown
          const numericTime = new Date(post.time).getTime(); // Convert to timestamp

          dict[postId] = {
            likes: post.like_count,
            comments: post.comments_count,
            engagement: post.like_count + post.comments_count,
            time: numericTime,
            day: numericDay,
            mediaType: numericMediaType,
            captionSize: post.caption_size,
          };

          return dict;
        }, {});

        setPostsDict(postsDictionary);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!postsDict)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  // For testing, log the dictionary to console
  console.log("Processed Posts Dictionary:", postsDict);

  return (
    <div>
      <h1>Processed Instagram Posts</h1>
      <pre>{JSON.stringify(postsDict, null, 2)}</pre>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { fetchInstagramPosts } from "./instagramPosts"; // Update with the correct relative path
import * as ss from "simple-statistics";

export default function Dictionary() {
  const [correlationResults, setCorrelationResults] = useState(null);

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
          });
        });

        setCorrelationResults(correlations);
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
    </div>
  );
}


'use client';
import React from 'react';
import styles from './styles/hitmap.module.css';

const Heatmap = () => {
  const data = [
    { label: 'Corn', values: [4, 4, 5.5, 4, 7, 12, 14, 9, 6, 5, 2, 1] },
    { label: 'Wheat', values: [8, 2, 1, 0, 0, 1, 3, 8, 12, 11, 10, 0] },
    { label: 'Rice', values: [0, 1, 2, 2, 3, 4, 3, 2, 5, 9, 6, 1] },
    { label: 'Rye', values: [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 9, 1] },
    { label: 'Oats', values: [0, 3, 2, 3, 6, 3, 4, 1, 2, 4, 8, 2] },
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Generate dynamic styles for heatmap intensity
  const getBackgroundColor = (value) => {
    if (value === 0) return '#f0f0f0';
    const intensity = Math.min(value / 14, 1); // Scale value to max of 14
    return `rgba(0, 123, 255, ${intensity})`; // Blue shade with intensity
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.cell}></div>
        {months.map((month) => (
          <div key={month} className={styles.header}>
            {month}
          </div>
        ))}
      </div>
      {data.map((item) => (
        <div key={item.label} className={styles.row}>
          <div className={styles.label}>{item.label}</div>
          {item.values.map((value, index) => (
            <div
              key={`${item.label}-${index}`}
              className={styles.cell}
              style={{ backgroundColor: getBackgroundColor(value) }}
              title={`${months[index]} | ${item.label}: ${value}`}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;



"use client";

import { useEffect, useState } from "react";
import { fetchInstagramPosts } from "./instagramPosts"; // Update with the correct relative path
import * as ss from "simple-statistics";
import styles from './styles/hitmap.module.css';

export default function Dictionary() {
  const [correlationResults, setCorrelationResults] = useState(null);
  const fieldsToCorrelate = ["time", "day", "mediaType", "captionSize"];
  const targetFields = ["likes", "comments", "engagement"];

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

        const correlations = {};

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
          });
        });

        setCorrelationResults(correlations);
      }
    }

    fetchData();
  }, []);

  // Prepare heatmap data
  const heatmapData = correlationResults
    ? fieldsToCorrelate.map((fieldX) => ({
        label: fieldX,
        values: targetFields.map(
          (fieldY) => correlationResults[`${fieldX} vs ${fieldY}`]
        ),
      }))
    : [];

  const getBackgroundColor = (value) => {
    if (value === null || isNaN(value)) return "#f0f0f0";
    const intensity = Math.abs(value); // Scale intensity by absolute correlation
    return `rgba(0, 123, 255, ${intensity})`; // Blue color scaling with intensity
  };

  return (
    <div>
      <h2>Correlation Heatmap:</h2>
      {correlationResults ? (
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.cell}></div>
            {targetFields.map((target) => (
              <div key={target} className={styles.header}>
                {target}
              </div>
            ))}
          </div>
          {heatmapData.map((row) => (
            <div key={row.label} className={styles.row}>
              <div className={styles.label}>{row.label}</div>
              {row.values.map((value, index) => (
                <div
                  key={`${row.label}-${targetFields[index]}`}
                  className={styles.cell}
                  style={{ backgroundColor: getBackgroundColor(value) }}
                  title={`${row.label} vs ${targetFields[index]}: ${value.toFixed(
                    2
                  )}`}
                >
                  {value.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Calculating correlations...</p>
      )}
    </div>
  );
}
