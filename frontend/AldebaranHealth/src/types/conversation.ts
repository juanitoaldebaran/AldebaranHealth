import type { User } from "./auth";
import type { Message } from "./message";

export interface Conversation {
    conversationId: number;
    user: User;
    name: string;
    sessionType?: 'DOCTOR' | 'THERAPIST';
    createdAt: number;
    messageList: Message[];
}

export interface ConversationRequest {
    title: string;
}

export interface ConversationResponse {
    conversationId: number;
    name: string;
    sessionType?: 'DOCTOR' | 'THERAPIST';
    createdAt: number;
}