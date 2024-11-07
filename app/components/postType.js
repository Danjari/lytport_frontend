// src/components/PostTypes.js
import React from 'react'

const postTypes = [
  { name: 'Images', value: 140 },
  { name: 'Reels', value: 100 },
  { name: 'Carousels', value: 89 },
  { name: 'Stories', value: 189 },
]

export default function PostTypes() {
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
