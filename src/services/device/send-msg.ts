import client from "../axios";

export interface SendMsgRequest {
    dvx: string, // device vx
    msg: string, // message content
    vx: string, // user vx
}

export interface SendMsgResponse {

}

export async function SendMsg(deviceId: string, data: SendMsgRequest): Promise<SendMsgResponse> {
    const result = await client.post<SendMsgResponse>(`/employee / devices / ${deviceId}/send/msg`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
