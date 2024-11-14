import { NextResponse } from "next/server";
import db from '../../../../lib/db';

export async function GET(request) {
    let data = await db.query('select * from user_client');
    data = data[0];

    let arr = []
    data = Object.entries(data);
    const target_list = ['followers_count', 'following_count'];

    for (let i = 0; i < data.length; i++) {
        if (!target_list.includes(data[i][0])) continue;

        arr.push({
            name: data[i][0],
            value: data[i][1],
            change: "+3.1%"
        })
    }


    ///todo: the following are yet to be added to our database columns
    arr.push({
        name: "Views",
        value: "152,000",
        change: "+2.1%"
    })

    arr.push({
        name: "Engagements",
        value: "152,000",
        change: "+2.1%"
    })

    return NextResponse.json(arr, {status: 200});

}
