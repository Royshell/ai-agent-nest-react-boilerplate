export type ChatRole = 'system' | 'user' | 'assistant';

export type ChatMessageDto = {
  role: ChatRole;
  content: string;
};

export class ChatRequestDto {
  messages!: ChatMessageDto[];
}

export class ChatResponseDto {
  reply!: string;
}
