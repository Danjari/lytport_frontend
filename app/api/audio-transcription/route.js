import OpenAI from "openai";
import fs from "fs"; // Use the standard fs module for createReadStream
import path from "path";
import { promises as fsPromises } from "fs"; // Use fs/promises for other operations

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
// Buffer the request body
async function bufferRequestBody(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
// Parse multipart/form-data manually
async function parseFormData(buffer, boundary) {
  const boundaryString = `--${boundary}`;
  const boundaryEnd = `${boundaryString}--`;
  const parts = buffer.toString("binary").split(boundaryString);
  const parsed = {};
  for (const part of parts) {
    if (part === "" || part === boundaryEnd) continue;
    const [headersPart, bodyPart] = part.split("\r\n\r\n");
    if (!headersPart || !bodyPart) continue;
    const headers = headersPart.split("\r\n").reduce((acc, headerLine) => {
      const [key, value] = headerLine.split(": ");
      if (key && value) acc[key.toLowerCase()] = value;
      return acc;
    }, {});
    const contentDisposition = headers["content-disposition"];
    if (!contentDisposition) continue;
    const match = contentDisposition.match(/name="(.+?)"(; filename="(.+?)")?/);
    if (!match) continue;
    const [, name, , filename] = match;
    const body = Buffer.from(bodyPart.trimEnd(), "binary");
    if (filename) {
      // Save the file to a temporary location
      const tempPath = path.join(process.cwd(), "temp", filename);
      await fsPromises.writeFile(tempPath, body);
      parsed[name] = { filepath: tempPath, filename };
    } else {
      parsed[name] = body.toString("utf8");
    }
  }
  return parsed;
}
export async function POST(req) {
  try {
    console.log("Buffering incoming form data...");
    // Buffer the request body
    const body = await bufferRequestBody(req);
    // Get the boundary string
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      throw new Error("Invalid content type. Expected multipart/form-data.");
    }
    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      throw new Error("Boundary not found in content type.");
    }
    // Parse the multipart/form-data body
    const parsedData = await parseFormData(body, boundary);
    console.log("Parsed data:", parsedData);
    // Get the audio file
    const audioFile = parsedData.audio;
    if (!audioFile || !audioFile.filepath) {
      return new Response(
        JSON.stringify({ error: "No audio file uploaded." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Call OpenAI Whisper API
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFile.filepath), // Use standard fs for createReadStream
      model: "whisper-1",
      response_format: "json",
    });
    console.log("Transcription Response:", response);
    // Clean up the temporary file
    await fsPromises.unlink(audioFile.filepath);
    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Something went wrong on the server",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}