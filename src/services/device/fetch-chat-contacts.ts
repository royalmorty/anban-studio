import { Gender } from "@/types/contact";
import client from "../axios";
import { DeviceKind, DeviceStatus } from "@/types/device";

interface FetchChatContactsRequest {
    vx?: string;
}

interface FetchChatContactsResponse {
    contacts: {
        id: string;
        vx: string;
        code: string;
        remark: string;
        unread: number;
        gender: Gender;
        name: string;
        avatar: string;
        signature: string;
        dvx: string;
        country: string;
        province: string;
        city: string;
        is_room: boolean;
        created_at: number;
        manually: boolean;
        device: {
            id: string;
            kind: DeviceKind;
            remarks: string;
            enable: boolean;
            avatar: string;
            nickname: string;
            status: DeviceStatus;
            vx: string;
            mobile: string;
        };
    }[]
}

export async function FetchChatContacts(params: FetchChatContactsRequest): Promise<FetchChatContactsResponse> {
    const result = await client.get<FetchChatContactsResponse>(`/employee/chat/contacts`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}