"use client";

import React from 'react';

export default function TopPosts() {
  const posts = [
    {
      title: 'Post 1',
      date: 'May 09, 12:22',
      description: 'Post description here...',
    },
    {
      title: 'Post 2',
      date: 'Apr 16, 18:15',
      description: 'Another description here...',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Top Posts</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-4">
            <h4 className="text-sm font-bold">{post.title}</h4>
            <p className="text-xs text-gray-500">{post.date}</p>
            <p className="text-sm">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}