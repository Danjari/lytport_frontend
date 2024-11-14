// src/components/PostTypes.js
"use client";

import React from 'react'
import { useEffect, useState } from 'react';


export default function PostTypes() {
  const [postTypes, setPostTypes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('http://localhost:3000/api/dashboard/postType');
        const postTypes = await data.json();

        setPostTypes(postTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!postTypes) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Type of Posts</h3>
      <ul className="space-y-2">
        {postTypes.map((type) => (
          <li key={type.name} className="flex justify-between">
            <span>{type.name}</span>
            <span>{type.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
