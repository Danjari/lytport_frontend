import { NextResponse } from "next/server";
import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";
import db from "../../../lib/db"; // Import the database module

// Define the system prompt
const systemPrompt = `
You are a Social Media Analytics Expert with deep knowledge of platform trends, content strategy, and audience engagement. Your goal is to provide personalized, data-driven insights and actionable recommendations for improving the user's social media performance.

Responsibilities:
1. Analyze metrics (likes, comments, shares, engagement rates) and compare content types (videos, images, carousels).
2. Identify trends and provide specific, actionable advice based on user data, platform benchmarks, and success cases.
3. Suggest strategies to enhance audience interaction, optimal posting times, and content formats.

Use the following data to guide your responses:
- Trends: Short-form video (+156% engagement YoY), carousel posts (+42% reach), 15-30 sec videos (89% completion rate), peak times (6-8 PM local).
- Success Stories: Duolingo (trending audio, 3-4 posts/day), Ryanair (reactive content, 92% response rate), Chipotle (behind-the-scenes, user-generated content).

Response Structure:
1. Start with a key observation from user data.
2. Highlight 2-3 improvement areas.
3. Provide actionable steps with examples.
4. Reference relevant trends or success stories.
5. End with a measurable goal.

Current User Data:
- Name: Moudjahid Moussa
- IG: Muja Online
- Followers: 369
- Monthly Impressions: 1300
- Demographics: Niger, France, US

Guidelines:
- Be specific, realistic, and data-driven.
- Reference trends and success cases.
- Maintain a professional yet encouraging tone.
- Avoid generic advice or unrealistic projections.
`;

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use the API key stored in the environment variables
  });

  try {
    // Log the request to debug incoming data
    console.log("Request received at OpenAI route");

    // Parse the incoming JSON data from the request
    const data = await request.json();
    console.log("Parsed data:", data);

    const { messages, userId } = data; // Expect userId to identify the user

    // Ensure that the messages field is an array
    if (!Array.isArray(messages)) {
      console.error("Error: Messages is not an array:", messages);
      return new NextResponse("Expected an array of messages", { status: 400 });
    }

    // Log the messages to verify content
    console.log("Messages received:", messages);

    // Create a completion stream from the OpenAI API with the given messages and system prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Specify the AI model to use
      messages: [
        {
          role: "system",
          content: systemPrompt, // Add the system prompt to the conversation context
        },
        ...messages, // Include the user-provided messages
      ],
      stream: true, // Enable streaming for real-time responses
    });

    // Save messages to the database
    for (const message of messages) {
      const { role, content } = message;
      const userId = "test-user";
    
      console.log("Saving message:", { userId, role, content }); // Debug output
    
      try {
        // Check for existing message
        const existingMessage = await db.query(
          `SELECT id FROM chat_history WHERE user_id = ? AND message_role = ? AND message_content = ?`,
          [userId, role, content]
        );
    
        if (existingMessage.length === 0) {
          // Insert only if no duplicate exists
          await db.query(
            `INSERT INTO chat_history (user_id, message_role, message_content) VALUES (?, ?, ?)`,
            [userId, role, content]
          );
          console.log("Message inserted:", { userId, role, content });
        } else {
          console.log("Duplicate message detected, skipping insertion.");
        }
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    }
    // Convert the OpenAI completion stream into a readable stream that can be sent as a response
    const stream = await OpenAIStream(completion);

    // Return the streaming response to the client
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Log errors for debugging
    console.error("Error in OpenAI Route:", error);

    // Return an error response to the client
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}