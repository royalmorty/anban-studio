import client from "../axios";

export interface FavorChatMessageRequest {
    id: number;
    is_favor: boolean;
}

export interface FavorChatMessageResponse {
}

export async function FavorChatMessage(data: FavorChatMessageRequest): Promise<FavorChatMessageResponse> {
    const result = await client.post<FavorChatMessageResponse>(`/employee/chat/favor/message`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
