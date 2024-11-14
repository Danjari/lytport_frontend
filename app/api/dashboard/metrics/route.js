import { NextResponse } from "next/server";
export async function GET(request) {
    const dummy_data =  [
            {
                name: "Reach",
                value: "169,459",
                change: "+XX%"
            },
            {
                name: "Impressions",
                value: "548,105",
                change: "-XX%"
            },
            {
                name: "Posts",
                value: "444",
                change: "+XX%"
            },
            { 
                name: 'Reach', 
                value: '169,459', 
                change: '+XX%' 
            },
        ]

    return NextResponse.json(dummy_data, {status: 200});

}
