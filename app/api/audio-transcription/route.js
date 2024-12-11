import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function bufferRequestBody(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

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
      const tempPath = path.join("/tmp", filename);
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
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    console.log("Buffering incoming form data...");
    const body = await bufferRequestBody(req);
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      throw new Error("Invalid content type. Expected multipart/form-data.");
    }
    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      throw new Error("Boundary not found in content type.");
    }

    const parsedData = await parseFormData(body, boundary);
    console.log("Parsed data:", parsedData);
    const audioFile = parsedData.audio;
    if (!audioFile || !audioFile.filepath) {
      return new Response(
        JSON.stringify({ error: "No audio file uploaded." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFile.filepath),
      model: "whisper-1",
      response_format: "json",
    });

    console.log("Transcription Response:", response);
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
