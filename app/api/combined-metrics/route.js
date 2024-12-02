import { NextResponse } from "next/server";
import { fetchFollowerDemographics, fetchPostTypes, fetchWeeklyImpressions } from './helpers';

export async function GET(request) {
    const IG_PROFILE_ID = process.env.IG_PROFILE_ID;
    const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

    try {
        // Fetch all metrics concurrently
        const [followerDemographics, postTypes, weeklyImpressions] = await Promise.all([
            fetchFollowerDemographics(IG_PROFILE_ID, IG_ACCESS_TOKEN),
            fetchPostTypes(IG_PROFILE_ID, IG_ACCESS_TOKEN),
            fetchWeeklyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN),
        ]);

        // Combine results
        const combinedMetrics = {
            followerDemographics,
            postTypes,
            weeklyImpressions,
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

// Import reusable functions

