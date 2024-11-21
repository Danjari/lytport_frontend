import React from 'react';
import NavBar from '@/app/components/navBar';
import Metrics from '@/app/components/metrics';
import ViewsPerDay from '@/app/components/ViewsPerDay';
import EngagementByTime from '@/app/components/EngagementByTime';
import FollowersByCountry from '@/app/components/FollowersByCountry';
import Impressions from '@/app/components/Impressions';
import PostTypes from '@/app/components/postType';
import TopPosts from '@/app/components/TopPosts';
import PostsMetrics from '@/app/components/PostsMetrics';
import PostCommentsByType from '@/app/components/PostCommentsByType';
import InboundMessages from '@/app/components/InboundMessages';
import PostImpressions from '@/app/components/PostImpressions';
import StoryMetrics from '@/app/components/StoryMetrics';



export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Metrics />
        {/* First grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PostTypes />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ViewsPerDay />
          <EngagementByTime />
        </div>
        {/* Second grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FollowersByCountry />
          <Impressions />
          <TopPosts />
          <PostCommentsByType/>
          <InboundMessages />
          <PostImpressions />
        </div>
        <div className="mt-4 max-w-7xl mx-auto p-6 space-y-6">
            <StoryMetrics />
        </div>
        <div className="min-h-screen bg-gray-100 p-6">
          <PostsMetrics />
        </div>
        
        {/* Additional component */}

      </main>
    </div>
  );
}