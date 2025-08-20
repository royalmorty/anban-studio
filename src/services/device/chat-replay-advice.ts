import client from "../axios";

export interface ChatReplyAdviceRequest {
    did: string;
    rid: string;
}

export interface ChatReplyAdviceResponse {
    msg: string;
}

export async function ChatReplyAdvice(data: ChatReplyAdviceRequest): Promise<ChatReplyAdviceResponse> {
    const result = await client.post<ChatReplyAdviceResponse>(`/employee/chat/reply/advice`, data, {
        timeout: 180000,
    });

    return Promise.resolve(result.data);
}
