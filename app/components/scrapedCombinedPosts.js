'use client';
import { useFetchPostsData } from "@/app/components/scrapedPosts";
import { useFetchReelsData } from "@/app/components/scrapedReels";

export function useFetchCombinedData() {
    const { data: postsData, error: postsError, loading: postsLoading } = useFetchPostsData();
    const { data: reelsData, error: reelsError, loading: reelsLoading } = useFetchReelsData();

    // Combine loading and error states
    const loading = postsLoading || reelsLoading;
    const error = postsError || reelsError;

    // Add mediaType property and merge datasets
    const updatedPostsData = postsData?.map((item) => ({
        ...item,
        mediaType: "Image",
    })) || [];

    const updatedReelsData = reelsData?.map((item) => ({
        ...item,
        mediaType: "Video",
    })) || [];

    const combinedData = [...updatedPostsData, ...updatedReelsData];

    return { data: combinedData, error, loading };
}
