import client from "../axios";
import { DeviceKind, DeviceStatus } from "@/types/device";

interface TakeCorporationDetailRequest {
}

interface TakeCorporationDetailResponse {
    max: number;
    num: number;
    name: string;
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

export async function TakeCorporationDetail(params: TakeCorporationDetailRequest): Promise<TakeCorporationDetailResponse> {

    const result = await client.get<TakeCorporationDetailResponse>(`/employee/corporation/detail`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}