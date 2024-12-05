// //api/combined-metrics
// import { NextResponse } from "next/server";
// import { fetchFollowerDemographics, fetchPostTypes, fetchMonthlyImpressions } from './helpers';

// export async function GET(request) {
//     const IG_PROFILE_ID = process.env.IG_PROFILE_ID;
//     const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

//     try {
//         // Fetch all metrics concurrently
//         const [followerDemographics, postTypes, monthlyImpressions] = await Promise.all([
//             fetchFollowerDemographics(IG_PROFILE_ID, IG_ACCESS_TOKEN),
//             fetchPostTypes(IG_PROFILE_ID, IG_ACCESS_TOKEN),
//             fetchMonthlyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN),
//         ]);

//         // Combine results
//         const combinedMetrics = {
//             followerDemographics,
//             postTypes,
//             monthlyImpressions,
//         };

//         return NextResponse.json(combinedMetrics);
//     } catch (error) {
//         console.error("Error fetching combined metrics:", error.message);
//         return NextResponse.json(
//             { error: "Failed to fetch combined metrics. Please try again later." },
//             { status: 500 }
//         );
//     }
// }

// // Import reusable functions

import { NextResponse } from "next/server";
import { fetchFollowerDemographics, fetchPostTypes, fetchMonthlyImpressions } from './helpers';

export async function GET(request) {
    const IG_PROFILE_ID = process.env.IG_PROFILE_ID;
    const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

    try {
        // Fetch all metrics concurrently
        const [followerDemographics, postTypes, monthlyImpressions] = await Promise.all([
            fetchFollowerDemographics(IG_PROFILE_ID, IG_ACCESS_TOKEN),
            fetchPostTypes(IG_PROFILE_ID, IG_ACCESS_TOKEN),
            fetchMonthlyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN),
        ]);

        // Format and calculate metrics
        const totalImpressions = monthlyImpressions.dailyImpressions.reduce(
            (sum, { impressions }) => sum + impressions,
            0
        );

        const formattedDailyImpressions = monthlyImpressions.dailyImpressions.map(({ date, impressions }) => ({
            date: new Date(date).toISOString().split("T")[0], // Format to "YYYY-MM-DD"
            impressions,
        }));

        // Placeholder for previous total (to calculate percentage change if available)
        // const previousTotal = monthlyImpressions.previousTotal || 0;
        // const percentageChange =
        //     previousTotal > 0 ? (((totalImpressions - previousTotal) / previousTotal) * 100).toFixed(2) : "N/A";

        // Combine results
        const combinedMetrics = {
            followerDemographics,
            postTypes,
            monthlyImpressions: {
                totalImpressions,
                dailyImpressions: formattedDailyImpressions,
                
            },
        };

        return NextResponse.json(combinedMetrics);
    } catch (error) {
        console.error("Error fetching combined metrics:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch combined metrics. Please try again later." },
            { status: 500 }
        );
    }
}