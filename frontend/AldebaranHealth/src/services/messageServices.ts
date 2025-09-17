import api from "@/config/api";
import type { MessageRequest, MessageResponse } from "@/types/message";

async function createMessage(conversationId: number, data: MessageRequest): Promise<MessageResponse> {
    try {
        const response = await api.post(`/conversation/${conversationId}/messages`, data);
        console.log("Successfully create a message ✅");

        return response.data;
    } catch (error: any) {
        console.log("Failed to create a message ❌");
        throw error;
    }
}

async function getConversationMessages(conversationId: number): Promise<MessageResponse> {
    try {
        const response = await api.get(`/conversation/${conversationId}/messages/all`);
        console.log("Successfully get all messages ✅");

        return response.data;
    } catch (error: any) {
        console.log("Failed to get all messages ❌");
        throw error;
    }
}

async function getAllMessages(): Promise<MessageResponse> {
    try {
        const response = await api.get(`/conversation/messages/all`);
        console.log("Successfully get all messages ✅");

        return response.data;
    } catch (error: any) {
        console.log("Failed to get all messages ❌");
        throw error;
    }
}

export default {
    createMessage,
    getConversationMessages,
    getAllMessages
}