import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    let data = await db.query('select * from user_reels;');
    data.map((item) => {
        if (item.hashtags) {
            item.hashtags = item.hashtags.split(',');
        }
    });

    return NextResponse.json(data);
}
