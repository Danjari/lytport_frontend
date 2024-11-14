// src/pages/dashboard.js
import React from 'react'
import NavBar from '@/app/components/navBar'
import Metrics from '@/app/components/metrics'
import PostTypes from '@/app/components/postType'
import ChatWithData from '@/app/components/chatWithData'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4" style={{ marginTop: '64px' }}>
        <Metrics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* <div className="lg:col-span-1">
            <ChatWithData />
          </div> */}
          <div className="lg:col-span-1">
            <PostTypes />
          </div>
        </div>
      </main>
    </div>
  )
}
