import client from "../axios";
import { DeviceKind, DeviceStatus } from "@/types/device";

interface TakeAuthInfoRequest {
}

interface TakeAuthInfoResponse {
    max: number;
    num: number;
    name: string;
    last_ip: string;
    company: string;
    devices: {
        id: string;
        kind: DeviceKind;
        remarks: string;
        enable: boolean;
        avatar: string;
        nickname: string;
        status: DeviceStatus;
        vx: string;
        mobile: string;
    }[];
}

export async function TakeAuthInfo(params: TakeAuthInfoRequest): Promise<TakeAuthInfoResponse> {

    const result = await client.get<TakeAuthInfoResponse>(`/employee/auth/info`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}