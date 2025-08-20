import client from "../axios";

export interface CancelScheduleTaskRequest {
    id: number;
}

export interface CancelScheduleTaskResponse {
}

export async function CancelScheduleTask(id: string, data: CancelScheduleTaskRequest): Promise<CancelScheduleTaskResponse> {
    const result = await client.delete<CancelScheduleTaskResponse>(`/employee/devices/${id}/schedule/tasks`, {
        data,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
