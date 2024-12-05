"use client";

import React, { useState } from "react";
import NavBar from "@/app/components/navBar";
import Metrics from "@/app/components/metrics";
import ViewsPerDay from "@/app/components/ViewsPerDay";
import EngagementByTime from "@/app/components/EngagementByTime";
import FollowersByCountry from "@/app/components/FollowersByCountry";
import Impressions from "@/app/components/Impressions";
import PostTypes from "@/app/components/postType";
import TopPosts from "@/app/components/TopPosts";
import PostsMetrics from "@/app/components/PostsMetrics";
import PostCommentsByType from "@/app/components/PostCommentsByType";
import InboundMessages from "@/app/components/InboundMessages";
import PostImpressions from "@/app/components/PostImpressions";
import StoryMetrics from "@/app/components/StoryMetrics";
import WebsiteClicks from "@/app/components/WebsiteClicks";
import FollowersOnline from "@/app/components/FollowersOnline";

export default function Dashboard() {
  const [visibleComponents, setVisibleComponents] = useState({
    Metrics: true, //change it to the way postsmetrics is 
    PostTypes: true, //change it to the way postcomments by type is
    ViewsPerDay: true, //change it to reach daily
    // EngagementByTime: true,
    FollowersByCountry: true,
    //Impressions: true,
    TopPosts: true,
    PostCommentsByType: true,
    InboundMessages: true,
    PostImpressions: true,//change it to monthly impressions
    //StoryMetrics: true,
    //WebsiteClicks: true,
    FollowersOnline: true,
    PostsMetrics: true,
  });

  // Mapping for display names
  const displayNames = {
    Metrics: "Metrics Overview",
    PostTypes: "Post Types",
    ViewsPerDay: "Views Per Day",
    // EngagementByTime: "Engagement By Time",
    FollowersByCountry: "Followers By Country",
    //Impressions: "Impressions",
    TopPosts: "Top Posts",
    PostCommentsByType: "Post Comments By Type",
    InboundMessages: "Inbound Messages",
    PostImpressions: "Post Impressions",
    //StoryMetrics: "Story Metrics",
    //WebsiteClicks: "Website Clicks",
    FollowersOnline: "Followers Online", //look into it 
    PostsMetrics: "Posts Metrics", //reform it, change it to the top and change as necessary
  };

  const toggleComponent = (component) => {
    setVisibleComponents((prev) => ({
      ...prev,
      [component]: !prev[component],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Collapsible Settings Panel */}
        <details className="bg-white p-6 rounded-lg shadow-md">
          <summary className="text-lg font-semibold cursor-pointer">
            Customize Dashboard
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {Object.keys(visibleComponents).map((component) => (
              <div
                key={component}
                className={`flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-200 ${
                  visibleComponents[component] ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <div>
                  <h3 className="font-semibold">{displayNames[component]}</h3>
                  <p className="text-sm text-gray-500">Toggle visibility</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={visibleComponents[component]}
                    onChange={() => toggleComponent(component)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-blue-500 transition"></div>
                </label>
              </div>
            ))}
          </div>
        </details>

        {/* Conditionally Rendered Components */}
        {visibleComponents.Metrics && <Metrics />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleComponents.PostTypes && <PostTypes />}
          {visibleComponents.ViewsPerDay && <ViewsPerDay />}
          {visibleComponents.EngagementByTime && <EngagementByTime />}
          {visibleComponents.FollowersByCountry && <FollowersByCountry />}
          {visibleComponents.Impressions && <Impressions />}
          {visibleComponents.TopPosts && <TopPosts />}
          {visibleComponents.PostCommentsByType && <PostCommentsByType />}
          {visibleComponents.InboundMessages && <InboundMessages />}
          {visibleComponents.PostImpressions && <PostImpressions />}
        </div>
        {visibleComponents.StoryMetrics && (
          <div className="mt-4 max-w-7xl mx-auto p-6 space-y-6">
            <StoryMetrics />
          </div>
        )}
        {visibleComponents.WebsiteClicks && (
          <div className="mt-6">
            <WebsiteClicks />
          </div>
        )}
        {visibleComponents.FollowersOnline && (
          <div className="mt-6">
            <FollowersOnline />
          </div>
        )}
        {visibleComponents.PostsMetrics && (
          <div className="min-h-screen bg-gray-100 p-6">
            <PostsMetrics />
          </div>
        )}
      </main>
    </div>
  );
}