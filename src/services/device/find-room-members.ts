import { Gender } from "@/types/contact";
import client from "../axios";

interface FindRoomMembersRequest {
    dvx?: string;
    rid?: string;
    limit: number,
    offset: number,
    query?: string,
    start?: number,
    end?: number,
    sort?: string,
    desc?: boolean,
}

interface FindRoomMembersResponse {
    total: number;
    members: RoomMember[]
}

export interface RoomMember {
    vx: string;
    rid: string;
    name: string;
    avatar: string;
    nickname: string;
    state: number;
    gender: Gender;
    code: string;
    mobile: string;
    pin_yin: string;
    remark: string;
    country: string;
    province: string;
    city: string;
    created_at: number;
    inviter?: {
        vx: string;
        name: string;
        avatar: string;
        nickname: string;
        remark: string;
    };
}

export async function FindRoomMembers(params: FindRoomMembersRequest): Promise<FindRoomMembersResponse> {
    const result = await client.get<FindRoomMembersResponse>(`/employee/statistics/room/members`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}