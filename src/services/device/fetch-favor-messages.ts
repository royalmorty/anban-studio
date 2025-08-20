import { MessageFormat, MessageType } from "@/types/msg";
import client from "../axios";

interface FetchFavorMessagesRequest {
    dvx: string;
}

interface FetchFavorMessagesResponse {
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

export async function FetchFavorMessages(params: FetchFavorMessagesRequest): Promise<FetchFavorMessagesResponse> {

    const result = await client.get<FetchFavorMessagesResponse>(`/employee/chat/favor/messages`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}