async function fetchFollowerDemographics(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=follower_demographics&period=lifetime&metric_type=total_value&breakdown=country&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
        throw new Error("No follower demographic data found.");
    }

    const breakdown = data.data[0]?.total_value?.breakdowns[0];
    if (!breakdown || !breakdown.results) {
        throw new Error("Invalid response format for demographics.");
    }

    return breakdown.results
        .map((result) => ({
            country: result.dimension_values[0],
            count: result.value,
        }))
        .sort((a, b) => b.count - a.count);
}

async function fetchPostTypes(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/media?fields=id,media_type&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
        throw new Error("No media data found.");
    }

    const postTypes = data.data.reduce((acc, media) => {
        const type = media.media_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(postTypes).map(([type, count]) => ({
        name: type,
        value: count,
    }));
}

// async function fetchWeeklyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
//     const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=impressions&period=week&access_token=${IG_ACCESS_TOKEN}`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.data || data.data.length === 0) {
//         throw new Error("No impressions data found.");
//     }

//     const weeklyValues = data.data[0].values.slice(-7);
//     const weeklyImpressions = weeklyValues.map((week) => week.value);

//     const totalImpressions = weeklyImpressions.slice(0, 6).reduce((sum, value) => sum + value, 0);
//     const lastWeek = weeklyImpressions[5] || 0;
//     const previousWeek = weeklyImpressions[6] || 0;
//     const percentageChange =
//         previousWeek > 0 ? (((lastWeek - previousWeek) / previousWeek) * 100).toFixed(2) : "N/A";

//     return {
//         weeklyImpressions: weeklyImpressions.slice(0, 6),
//         totalImpressions,
//         percentageChange: percentageChange !== "N/A" ? `${percentageChange}%` : "N/A",
//     };
// }
async function fetchMonthlyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const sinceTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
    const untilTimestamp = Math.floor(now.getTime() / 1000);

    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=impressions&period=day&since=${sinceTimestamp}&until=${untilTimestamp}&access_token=${IG_ACCESS_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (!data.data || data.data.length === 0) {
        throw new Error("No impressions data found.");
    }

    const dailyImpressions = data.data[0].values.map((entry) => ({
        date: entry.end_time,
        impressions: entry.value,
    }));

    const totalImpressions = dailyImpressions.reduce((sum, entry) => sum + entry.impressions, 0);

    return {
        dailyImpressions,
        totalImpressions,
    };
}

export{fetchFollowerDemographics,fetchPostTypes,fetchMonthlyImpressions};