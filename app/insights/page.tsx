// app/insights/page.tsx
"use client";

import React from 'react';
import NavBar from '../components/navBar';
import ViewsPerDay from '../components/ViewsPerDay';
import EngagementByTime from '../components/EngagementByTime';
import FollowersByCountry from '../components/FollowersByCountry';
import Impressions from '../components/Impressions';
import Link from 'next/link';

export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    {/* Coming Soon Message */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon...</h1>
      <p className="text-gray-600 mb-8">
       We are under Construction, not ready yet. Stay tuned!
      </p>

      {/* Back to Dashboard Link */}
      <div>
        <Link
          href="/dashboard"
          className="text-gray-800 hover:text-gray-900 font-semibold underline transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  </div>
  ) }
      // {/* <NavBar />
      // <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
      //   <h1 className="text-2xl font-bold">Insights</h1>
      //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      //     <ViewsPerDay />
      //     <EngagementByTime />
      //   </div>
      //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      //     <FollowersByCountry />
      //     <Impressions />
      //   </div>
      // </main> */}
    
//   );
// }