import client from "../axios";
import { ClientAction, TaskCycle, TaskStatus, TaskType } from "@/types/task";

export interface FindScheduleTasksRequest {
    limit: number,
    offset: number,
    query?: string,
    start?: number,
    end?: number,
    sort?: string,
    desc?: boolean,
    status?: TaskStatus,
}

export interface FindScheduleTasksResponse {
    total: number;
    tasks: ScheduleTask[]
}

export interface ScheduleTask {
    id: number,
    task_id: string,
    status: TaskStatus,
    type: TaskType;
    vxs?: string[] | null;
    date: Date;
    time: string;
    cycle: TaskCycle;
    days?: number[];
    weeks?: number[];
    actions: ClientAction[];
    conditions?: {
        not_in_rooms?: string[];
        min_reply?: number;
        has_labels?: string[];
    };
    created_at: number,
}

export async function FindScheduleTasks(id: string, params: FindScheduleTasksRequest): Promise<FindScheduleTasksResponse> {
    const result = await client.get<FindScheduleTasksResponse>(`/employee/devices/${id}/schedule/tasks`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}