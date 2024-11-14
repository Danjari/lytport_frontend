import { NextResponse } from "next/server";

export async function GET(request) {
    const dummy_data =  [
            { name: 'Images', value: 140 },
            { name: 'Reels', value: 100 },
            { name: 'Carousels', value: 89 },
            { name: 'Stories', value: 189 },
          ]

    return NextResponse.json(dummy_data);

}
