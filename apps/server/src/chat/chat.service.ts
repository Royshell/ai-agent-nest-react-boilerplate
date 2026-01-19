import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class ChatService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY in environment');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  async *streamText(prompt: string): AsyncGenerator<string> {
    const model = this.configService.get<string>('GEMINI_MODEL');

    if (!model) {
      throw new Error('Missing GEMINI_MODEL in environment');
    }

    const stream = await this.ai.models.generateContentStream({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    for await (const chunk of stream) {
      const text = chunk?.text;
      if (typeof text === 'string' && text.length > 0) {
        yield text;
      }
    }
  }
}
