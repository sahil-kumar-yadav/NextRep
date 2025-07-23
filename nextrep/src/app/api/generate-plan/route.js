import { auth } from "@clerk/nextjs";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { type, goals } = body;

  const prompt = `You are a professional fitness trainer. Create a personalized ${type} plan for a client with the following goals:\n\n"${goals}".\n\nReturn it in bullet points with clear structure.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const content = completion.choices[0].message.content;
    return Response.json({ content });
  } catch (err) {
    console.error("OpenAI error:", err);
    return new Response("Failed to generate plan", { status: 500 });
  }
}
