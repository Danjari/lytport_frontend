
// import OpenAI from "openai";
// import { NextResponse } from "next/server";


// const userSelection = ["Impressions","reach"]
// const UserData = `{
//     "followerDemographics": [
//         {
//             "country": "NE",
//             "count": 158
//         },
//         {
//             "country": "US",
//             "count": 40
//         },
//         {
//             "country": "MA",
//             "count": 31
//         },
//         {
//             "country": "FR",
//             "count": 19
//         },
//         {
//             "country": "AE",
//             "count": 18
//         },
//         {
//             "country": "TR",
//             "count": 12
//         },
//         {
//             "country": "TN",
//             "count": 9
//         },
//         {
//             "country": "CA",
//             "count": 8
//         },
//         {
//             "country": "SN",
//             "count": 7
//         },
//         {
//             "country": "GH",
//             "count": 6
//         },
//         {
//             "country": "NG",
//             "count": 6
//         },
//         {
//             "country": "DZ",
//             "count": 5
//         },
//         {
//             "country": "TD",
//             "count": 5
//         },
//         {
//             "country": "CD",
//             "count": 4
//         },
//         {
//             "country": "CN",
//             "count": 4
//         },
//         {
//             "country": "ML",
//             "count": 3
//         },
//         {
//             "country": "IN",
//             "count": 3
//         },
//         {
//             "country": "ZA",
//             "count": 3
//         },
//         {
//             "country": "CM",
//             "count": 3
//         },
//         {
//             "country": "TG",
//             "count": 3
//         },
//         {
//             "country": "DJ",
//             "count": 2
//         },
//         {
//             "country": "GB",
//             "count": 2
//         },
//         {
//             "country": "CI",
//             "count": 2
//         },
//         {
//             "country": "IT",
//             "count": 2
//         },
//         {
//             "country": "AR",
//             "count": 2
//         },
//         {
//             "country": "DE",
//             "count": 1
//         },
//         {
//             "country": "HK",
//             "count": 1
//         },
//         {
//             "country": "BE",
//             "count": 1
//         },
//         {
//             "country": "BF",
//             "count": 1
//         },
//         {
//             "country": "PT",
//             "count": 1
//         },
//         {
//             "country": "JP",
//             "count": 1
//         },
//         {
//             "country": "HT",
//             "count": 1
//         },
//         {
//             "country": "SE",
//             "count": 1
//         },
//         {
//             "country": "KE",
//             "count": 1
//         },
//         {
//             "country": "KM",
//             "count": 1
//         },
//         {
//             "country": "CH",
//             "count": 1
//         },
//         {
//             "country": "IR",
//             "count": 1
//         },
//         {
//             "country": "ES",
//             "count": 1
//         },
//         {
//             "country": "AU",
//             "count": 1
//         },
//         {
//             "country": "CY",
//             "count": 1
//         },
//         {
//             "country": "PK",
//             "count": 1
//         },
//         {
//             "country": "NL",
//             "count": 1
//         }
//     ],
//     "postTypes": [
//         {
//             "name": "VIDEO",
//             "value": 11
//         },
//         {
//             "name": "IMAGE",
//             "value": 10
//         },
//         {
//             "name": "CAROUSEL_ALBUM",
//             "value": 4
//         }
//     ],
//     "followers": 374,
//     "monthlyImpressions": {
//         "totalImpressions": 176,
//         "dailyImpressions": [
//             {
//                 "date": "2024-11-10",
//                 "impressions": 2
//             },
//             {
//                 "date": "2024-11-11",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-12",
//                 "impressions": 4
//             },
//             {
//                 "date": "2024-11-13",
//                 "impressions": 18
//             },
//             {
//                 "date": "2024-11-14",
//                 "impressions": 2
//             },
//             {
//                 "date": "2024-11-15",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-16",
//                 "impressions": 7
//             },
//             {
//                 "date": "2024-11-17",
//                 "impressions": 17
//             },
//             {
//                 "date": "2024-11-18",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-19",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-20",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-21",
//                 "impressions": 29
//             },
//             {
//                 "date": "2024-11-22",
//                 "impressions": 4
//             },
//             {
//                 "date": "2024-11-23",
//                 "impressions": 1
//             },
//             {
//                 "date": "2024-11-24",
//                 "impressions": 35
//             },
//             {
//                 "date": "2024-11-25",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-26",
//                 "impressions": 6
//             },
//             {
//                 "date": "2024-11-27",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-28",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-29",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-11-30",
//                 "impressions": 5
//             },
//             {
//                 "date": "2024-12-01",
//                 "impressions": 2
//             },
//             {
//                 "date": "2024-12-02",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-12-03",
//                 "impressions": 1
//             },
//             {
//                 "date": "2024-12-04",
//                 "impressions": 0
//             },
//             {
//                 "date": "2024-12-05",
//                 "impressions": 4
//             },
//             {
//                 "date": "2024-12-06",
//                 "impressions": 5
//             },
//             {
//                 "date": "2024-12-07",
//                 "impressions": 2
//             },
//             {
//                 "date": "2024-12-08",
//                 "impressions": 26
//             },
//             {
//                 "date": "2024-12-09",
//                 "impressions": 6
//             }
//         ]
//     },
//     "reach": {
//         "totalReach30Days": 29,
//         "reach7Days": [
//             {
//                 "date": "03/12/2024",
//                 "reach": 1
//             },
//             {
//                 "date": "04/12/2024",
//                 "reach": 0
//             },
//             {
//                 "date": "05/12/2024",
//                 "reach": 1
//             },
//             {
//                 "date": "06/12/2024",
//                 "reach": 1
//             },
//             {
//                 "date": "07/12/2024",
//                 "reach": 1
//             },
//             {
//                 "date": "08/12/2024",
//                 "reach": 2
//             },
//             {
//                 "date": "09/12/2024",
//                 "reach": 3
//             }
//         ]
//     }
// }`
// const systemPrompt = ` You are a top 1% expert in Data Analysis for content creation and creative idea generation.
// here are some context on what you should do 
// User selection : ${userSelection}

//    Information from user's data:
//    ${UserData}
 

//     Influencer Analysis:
//     make things up for now

//    the niche on the user is education and college student. engage them and show them the places

//     Write a 800-word report summarizing in prettier HTML format only (no MARKDOWN) <div>content<div> this html will be included in a bigger page I need it to be well formatted. START DIRECTLY WITH THE HTML.
//     Also no title needed directly start with first point:
//     1. Summary of content, Observations and trends.
//     2. Recommendations to improve social media engagement.
//     3. Actionable strategies inspired by top influencers.
//     4. Ideas for future ideas
//     5.  Conclusion
    
  
// `
// const Prompt = " Help me grow my audience"

// export async function POST(request){
//     const client = new OpenAI({
//         apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY
//     });

//     try{

//         const completion = await client.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role:"system",
//                     content: systemPrompt,
//                 },
//                 {
//                     role:"user",
//                     content: Prompt,
//                 }
//             ]
//         })
    
//         const response = completion.choices[0].message.content
//         return NextResponse.json({ data: response });
    


//     }catch(error){
//     console.error("Error:", error);
//     return new Response("An error occurred", { status: 500 });
//     }

    
// }


import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { selectedTiles, combinedMetrics } = await request.json();

    const client = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const systemPrompt = `
      You are a top 1% expert in Data Analysis for content creation and viral creative idea generation.
      you speak to the user in a simple and accessible language/tone.
      Here is some context on what you should do:
      Selected tiles to primarily focus on: ${selectedTiles.join(", ")}

      all the data in your disposal for this:
      ${JSON.stringify(combinedMetrics, null, 2)}
     you use your skills to make informed guided decision on this on the information you give your user. 
      you usually write about 500 to 800-word report summarizing in HTML format:
      1. Summary of content, observations, and trends ( include numbers and dates to help the user understand ).
      2. Actionable Recommendations to improve social media engagement.
      3. Actionable strategies inspired by top influencers.
      4. Ideas for future initiatives.

      Only output HTML <div>content</div> no need to put /n to come back to the line.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the well design HMTL report." },
      ],
    });

    const generatedReport = completion.choices[0].message.content;
    const reportHTML = `
      <html>
        <head>
            <title>Social Media Insights Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 30px;
                    line-height: 1.6;
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                h2 {
                    color: #333;
                }
                .section {
                    margin-bottom: 30px;
                }
                .graph {
                    margin-top: 20px;
                    text-align: center;
                }
                .graph img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <h1>Social Media Insights Report</h1>

            <div class="section">
                <h2>Report</h2>
                <div>${generatedReport}</div>
            </div>
        </body>
      </html>
    `;

    return NextResponse.json({ reportHTML });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
