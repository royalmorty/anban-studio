import client from "../axios";
import { ClientAction, TaskCycle, TaskType } from "@/types/task";

export interface CreateScheduleTaskRequest {
    type: TaskType;
    vxs?: string[];
    date: Date;
    time: string;
    cycle: TaskCycle;
    days?: number[];
    weeks?: number[];
    actions: ClientAction[];
    conditions?: {
        not_in_rooms?: string[];
        min_reply: number;
        has_labels?: string[];
    };
}

export interface CreateScheduleTaskResponse {

}

export async function CreateScheduleTask(id: string, data: CreateScheduleTaskRequest): Promise<CreateScheduleTaskResponse> {
    const result = await client.post<CreateScheduleTaskResponse>(`/employee/devices/${id}/schedule/tasks`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
