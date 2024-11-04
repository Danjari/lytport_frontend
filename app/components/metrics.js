// src/components/Metrics.js
import React from 'react'

const metrics = [
  { name: 'Followers', value: '3,750', change: '+2.7%' },
  { name: 'Reach', value: '169,459', change: '+XX%' },
  { name: 'Impressions', value: '548,105', change: '-XX%' },
  { name: 'Posts', value: '444', change: '+XX%' },
]

export default function Metrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium">{metric.name}</h3>
          <div className="text-2xl font-bold">{metric.value}</div>
          <p className="text-xs text-gray-500">{metric.change} from last month</p>
        </div>
      ))}
    </div>
  )
}
