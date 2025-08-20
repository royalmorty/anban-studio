import { DeviceKind } from "@/types/device";
import client from "../axios";

export interface CreateDeviceRequest {
    mobile: string;
    remarks?: string;
    kind: DeviceKind;
    callback: string;
    base_url: string;
    region: string;
    token: string;
    wid: string;
}

export interface CreateDeviceResponse {

}

export async function CreateDevice(data: CreateDeviceRequest): Promise<CreateDeviceResponse> {
    const result = await client.post<CreateDeviceResponse>(`/employee/devices`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
