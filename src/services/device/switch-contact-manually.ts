import client from "../axios";

interface SwitchContactManuallyRequest {
    device_vx: string;
    contact_vx: string;
    manually: boolean;
}

interface SwitchContactManuallyResponse {
    manually: boolean;
}

export async function SwitchContactManually(deviceId: string, data: SwitchContactManuallyRequest): Promise<SwitchContactManuallyResponse> {
    const result = await client.post<SwitchContactManuallyResponse>(`/employee/devices/${deviceId}/contact/switch/manually`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}