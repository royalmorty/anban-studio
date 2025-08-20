import client from "../axios";

interface StatisticsRoomBasicRequest {
    dvx?: string;
    rid?: string;
    start: number;
    end: number;
}

interface StatisticsRoomBasicResponse {
    // 客户总数
    total: number;
    // 活跃客户数
    active: number;
    // 新增客户
    increase: number;
    // 减少客户
    decrease: number;
    // 消息总数
    messages: number;
}

export async function StatisticsRoomBasic(params: StatisticsRoomBasicRequest): Promise<StatisticsRoomBasicResponse> {
    const result = await client.get<StatisticsRoomBasicResponse>(`/employee/statistics/room/basic`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}