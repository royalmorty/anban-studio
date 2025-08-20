import { DeviceKind, DeviceStatus } from "@/types/device";
import client from "../axios";
import { LabelType } from "@/types/label";

interface TakeContactDetailRequest {
    dvx: string;
    cvx: string;
}

interface TakeContactDetailResponse {
    manually: boolean,
    profile: string,
    remark: string
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
    labels: {
        id: number,
        type: LabelType,
        name: string,
    }[];
}

export async function TakeContactDetail(params: TakeContactDetailRequest): Promise<TakeContactDetailResponse> {
    const result = await client.get<TakeContactDetailResponse>(`/employee/chat/contact/detail`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}