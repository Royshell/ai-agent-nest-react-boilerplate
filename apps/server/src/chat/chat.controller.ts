import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';

type ChatStreamBody = {
  prompt: string;
};

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('stream')
  async stream(
    @Body() body: ChatStreamBody,
    @Res() res: Response,
  ): Promise<void> {
    const prePromt = ''; // Optional preface that sets the assistant’s role/tone (e.g. "You are a technical support engineer.").
    const prompt = (body?.prompt ?? '').trim();
    if (!prompt) {
      res.status(400).json({ message: 'prompt is required' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    // Optional: helps proxies flush
    res.flushHeaders?.();

    try {
      for await (const token of this.chatService.streamText(
        prePromt + ' ' + prompt,
      )) {
        // SSE format: "data: ...\n\n"
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }

      res.end();
    } catch (error: unknown) {
      console.error(error);
      res.end();
    }
  }
}
