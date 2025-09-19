import type { Conversation } from "./conversation";

export interface Message {
    messageId: number;
    content: string;
    senderType?: 'AI' | 'USER';
    createdAt: string;
    conversation: Conversation;
}


export interface MessageRequest {
    content: string;
    createdAt: string;
}

export interface MessageResponse {
    content: string;
    senderType?: 'AI' | 'USER';
    createdAt: string;
}