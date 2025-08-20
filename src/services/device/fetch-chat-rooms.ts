import { Gender } from "@/types/contact";
import client from "../axios";
import { DeviceKind, DeviceStatus } from "@/types/device";

interface FetchChatRoomsRequest {
    vx?: string;
}

interface FetchChatRoomsResponse {
    rooms: {
        id: string;
        room_id: string;
        code: string;
        remark: string;
        name: string;
        unread: number;
        avatar: string;
        summary: string;
        dvx: string;
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
        members: {
            vx: string;
            name: string;
            avatar: string;
            nickname: string;
            state: number;
            gender: Gender;
        }[];
    }[]
}

export async function FetchChatRooms(params: FetchChatRoomsRequest): Promise<FetchChatRoomsResponse> {
    const result = await client.get<FetchChatRoomsResponse>(`/employee/chat/rooms`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}