import client from "../axios";

export interface MarkChatAsDoneRequest {
    dvx: string;
    rid: string;
}

export interface MarkChatAsDoneResponse {

}

export async function MarkChatAsDone(data: MarkChatAsDoneRequest): Promise<MarkChatAsDoneResponse> {
    const result = await client.post<MarkChatAsDoneResponse>(`/employee/chat/mark/done`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
