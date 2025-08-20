import client from "../axios";

export interface StoreChatMessageRequest {
    id: number;
    is_store: boolean;
}

export interface StoreChatMessageResponse {
}

export async function StoreChatMessage(data: StoreChatMessageRequest): Promise<StoreChatMessageResponse> {
    const result = await client.post<StoreChatMessageResponse>(`/employee/chat/store/message`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
