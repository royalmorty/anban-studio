import { MessageFormat, MessageType } from "@/types/msg";
import client from "../axios";

interface FindChatMessagesRequest {
    dvx: string;
    rid: string;
    lmt: number;
    ts?: number;
    tps: MessageType[];
}

interface FindChatMessagesResponse {
    msgs: {
        id: number;
        sender: string;
        content: string;
        ts: number;
        type: MessageType;
        self: boolean;
        fmt?: MessageFormat;
    }[]
}

export async function FindChatMessages(request: FindChatMessagesRequest): Promise<FindChatMessagesResponse> {

    let params: any = { ...request, }
    if (params.tps && params.tps.length > 0) {
        params.tps = request.tps.join(",")
    }

    const result = await client.get<FindChatMessagesResponse>(`/employee/chat/messages`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}