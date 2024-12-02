"use client";

import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import LoadingSpinner from './loader';

export default function PostTypes() {
  const [postTypes, setPostTypes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/combined-metrics");
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
       
        setPostTypes(data.postTypes);
      } catch (error) {
        console.error("Error fetching post types:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!postTypes)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoadingSpinner />
      </Suspense>
    );


  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold mb-6 text-gray-800">Type of Posts</h3>
      <ul className="space-y-4">
        {postTypes.map((type) => (
          <li
            key={type.name}
            className="flex justify-between items-center p-4 rounded-md border hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-gray-600">{type.name}</span>
            <span className="text-lg font-bold text-blue-600">{type.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}