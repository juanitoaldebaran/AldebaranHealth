import type { Conversation } from "./conversation";

export interface Message {
    messageId: number;
    content: string;
    senderType?: 'AI' | 'USER';
    createdAt: number;
    conversation: Conversation;
}


export interface MessageRequest {
    content: string;
    createdAt: number;
}

export interface MessageResponse {
    content: string;
    senderType?: 'AI' | 'USER';
    createdAt: number;
}