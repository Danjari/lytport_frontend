'use client';
import { useTransformedData } from "@/app/components/postsDataCorrelation";

export default function Page() {
    const { loading, error, transformedData } = useTransformedData();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Transformed Data</h1>
            <pre>{JSON.stringify(transformedData, null, 2)}</pre>
        </div>
    );
}
