import { NextResponse } from "next/server";
import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  //Grabbing the users input:
  const params = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: params.prompt },
    ],
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}
