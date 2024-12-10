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
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Correlation Heatmap</h2>
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
        <p>Calculating...</p>
      )}
    </div>
  );
}
