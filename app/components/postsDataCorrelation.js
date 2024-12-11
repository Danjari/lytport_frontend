'use client';
import { useFetchCombinedData } from "./scrapedCombinedPosts";

export function useTransformedData() {
    const { data, error, loading } = useFetchCombinedData();

    if (loading) return { loading, error: null, transformedData: null };
    if (error) return { loading: false, error, transformedData: null };

    const transformedDictionary = data.reduce((dict, item) => {
        const {
            content_id,
            likes,
            comments_count,
            engagement_ratio,
            taken_at,
            mediaType,
            captions
        } = item;

        const dateObject = new Date(taken_at * 1000);
        const time = dateObject.toLocaleTimeString('en-US', { hour12: false });
        const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

        const captionSize = captions ? captions.length : 0;

        dict[content_id] = {
            likes,
            comments: comments_count,
            engagement: engagement_ratio,
            time,
            day,
            mediaType,
            captionSize,
        };

        return dict;
    }, {});

    return { loading: false, error: null, transformedData: transformedDictionary };
}
