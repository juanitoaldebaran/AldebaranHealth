import api from "@/config/api";
import type { Conversation, ConversationRequest, ConversationResponse } from "@/types/conversation";

async function createConversation(data: ConversationRequest): Promise<ConversationResponse> {
    try {
        const response = await api.post("/conversation", data);
        console.log("Successfully create conversation ✅");
        return response.data;
    } catch (error: any) {
        console.error("Failed to create conversation ❌", error);
        throw error;
    }
}

// Fixed: Return array of conversations since UI expects multiple conversations
async function getUserConversation(): Promise<ConversationResponse[]> {
    try {
        const response = await api.get("/conversation");
        console.log("Successfully get user conversation ✅");
        
        const data = response.data;
        
        // Handle different API response formats
        if (Array.isArray(data)) {
            return data;
        }
        
        // If data has a conversations property (nested structure)
        if (data && data.conversations && Array.isArray(data.conversations)) {
            return data.conversations;
        }
        
        // If single conversation object, wrap in array
        if (data && typeof data === 'object') {
            return [data];
        }
        
        // Fallback to empty array
        return [];
    } catch (error: any) {
        console.error("Failed to get user conversation ❌", error);
        throw error;
    }
}

async function getAllConversations(): Promise<Conversation[]> {
    try {
        const response = await api.get("/admin/all");
        console.log("Successfully get all conversations ✅");
        return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
        console.error("Failed to get all conversations ❌", error);
        throw error;
    }
}

// Additional utility functions
async function getConversationById(id: number): Promise<ConversationResponse> {
    try {
        const response = await api.get(`/conversation/${id}`);
        console.log(`Successfully get conversation ${id} ✅`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to get conversation ${id} ❌`, error);
        throw error;
    }
}

async function updateConversation(id: number, data: Partial<ConversationRequest>): Promise<ConversationResponse> {
    try {
        const response = await api.put(`/conversation/${id}`, data);
        console.log(`Successfully updated conversation ${id} ✅`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to update conversation ${id} ❌`, error);
        throw error;
    }
}

async function deleteConversation(id: number): Promise<void> {
    try {
        await api.delete(`/conversation/${id}`);
        console.log(`Successfully deleted conversation ${id} ✅`);
    } catch (error: any) {
        console.error(`Failed to delete conversation ${id} ❌`, error);
        throw error;
    }
}

export default {
    createConversation,
    getUserConversation,
    getAllConversations,
    getConversationById,
    updateConversation,
    deleteConversation
}