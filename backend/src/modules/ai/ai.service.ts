import { Injectable, BadRequestException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async suggest(prompt: string) {
    if (!prompt || prompt.trim().length < 2) {
      throw new BadRequestException('Prompt too short');
    }
    // Use a small prompt to get 3 concise suggestions
    const sys = "You are a helpful assistant that suggests 3 concise, practical todo tasks for the given goal.";
    const user = `Goal: ${prompt}
Return ONLY a JSON array of 3 short strings, no explanations.`;

    const resp = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user }
      ],
      temperature: 0.6,
      max_tokens: 120
    });

    const text = resp.choices[0].message.content || "[]";
    try {
      const arr = JSON.parse(text);
      if (Array.isArray(arr)) return arr.slice(0, 3);
    } catch {}
    // Fallback: try to split lines
    const lines = text.split(/\n|,|;|\-/).map(s => s.trim()).filter(Boolean);
    return lines.slice(0,3);
  }
}
