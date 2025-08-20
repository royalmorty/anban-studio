import client from "../axios";

interface SwitchRoomManuallyRequest {
    device_vx: string;
    room_id: string;
    manually: boolean;
}

interface SwitchRoomManuallyResponse {
    manually: boolean;
}

export async function SwitchRoomManually(deviceId: string, data: SwitchRoomManuallyRequest): Promise<SwitchRoomManuallyResponse> {
    const result = await client.post<SwitchRoomManuallyResponse>(`/employee/devices/${deviceId}/room/switch/manually`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}