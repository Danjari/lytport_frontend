import { NextResponse } from "next/server";
import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";
import db from "../../../lib/db"; // Import your database module
import { v4 as uuidv4 } from "uuid"; // UUID generator

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
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use the API key stored in environment variables
  });

  try {
    // Log the request for debugging
    console.log("Request received at OpenAI route");

    // Parse the incoming JSON data from the request
    const data = await request.json();
    console.log("Parsed data:", data);

    const { messages, userId = "test-user" } = data;

    // Extract cookies from the request headers
    const cookies = request.headers.get('cookie') || '';
    const cookieObj = Object.fromEntries(
      cookies.split(';').map((cookie) => cookie.trim().split('=').map(decodeURIComponent))
    );

    // Check if session_id exists in cookies
    let session_id = cookieObj.session_id;

    // If session_id does not exist, generate a new one
    if (!session_id) {
      session_id = uuidv4();
    }

    // Log the session ID for debugging
    console.log("Session ID:", session_id);

    // Retrieve chat history from the database for the given user/session
    let chatHistory = [];
    try {
      chatHistory = await db.query(
        `SELECT message_role, message_content FROM chat_history WHERE user_id = ? AND session_id = ? ORDER BY created_at ASC`,
        [userId, session_id]
      );
    } catch (error) {
      console.error("Error retrieving chat history:", error);
    }

    // Summarize chat history using GPT or another summarization technique
    let chatSummary = "";
    if (chatHistory.length > 0) {
      const historyMessages = chatHistory.map(({ message_role, message_content }) => ({
        role: message_role,
        content: message_content,
      }));

      try {
        const summaryResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are an assistant summarizing past chat history. Provide a concise summary of the following chat messages, including key topics and insights. Do not include unnecessary details.`,
            },
            ...historyMessages,
          ],
        });

        chatSummary = summaryResponse.choices[0]?.message?.content || "";
      } catch (error) {
        console.error("Error summarizing chat history:", error);
      }
    }

    // Create the system prompt with the chat summary included
    const dynamicSystemPrompt = `
${systemPrompt}

Previous Conversation Summary:
${chatSummary}
`;

    // Create a completion stream from the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Specify the AI model to use
      messages: [
        {
          role: "system",
          content: dynamicSystemPrompt, // Add the system prompt with summary
        },
        ...messages, // Include the user-provided messages
      ],
      stream: true, // Enable streaming for real-time responses
    });

    // Convert the OpenAI completion stream into a readable stream
    const stream = await OpenAIStream(completion);

    // Save messages to the database
    for (const message of messages) {
      const { role, content } = message;

      console.log("Saving message:", { userId, session_id, role, content });

      try {
        // Check for existing message to avoid duplicates
        const existingMessage = await db.query(
          `SELECT id FROM chat_history WHERE user_id = ? AND session_id = ? AND message_role = ? AND message_content = ?`,
          [userId, session_id, role, content]
        );

        if (existingMessage.length === 0) {
          // Insert the message into the database
          await db.query(
            `INSERT INTO chat_history (user_id, session_id, message_role, message_content) VALUES (?, ?, ?, ?)`,
            [userId, session_id, role, content]
          );
          console.log("Message inserted:", { userId, session_id, role, content });
        } else {
          console.log("Duplicate message detected, skipping insertion.");
        }
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    }

    // Return the session ID along with the streaming response to the client
    const response = new StreamingTextResponse(stream);

    // Set the session_id as a cookie in the response headers
    response.headers.set('Set-Cookie', `session_id=${session_id}; Path=/; HttpOnly`);

    return response;
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