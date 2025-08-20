import { DeviceKind, DeviceStatus } from "@/types/device";
import client from "../axios";

interface TakeRoomDetailRequest {
    dvx: string;
    rid: string;
}

interface TakeRoomDetailResponse {
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
}

export async function TakeRoomDetail(params: TakeRoomDetailRequest): Promise<TakeRoomDetailResponse> {
    const result = await client.get<TakeRoomDetailResponse>(`/employee/chat/room/detail`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}