import client from "../axios";

export interface ForwardMsgRequest {
    did: string, // device id
    dvx: string, // device vx
    id: number, // message id
    vx: string, // user vx
}

export interface ForwardMsgResponse {

}

export async function ForwardMsg(data: ForwardMsgRequest): Promise<ForwardMsgResponse> {
    const result = await client.post<ForwardMsgResponse>(`/employee/chat/forward/message`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
