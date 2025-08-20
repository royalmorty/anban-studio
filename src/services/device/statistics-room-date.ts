import client from "../axios";

interface StatisticsRoomDateRequest {
    dvx?: string;
    rid?: string;
    start: number;
    end: number;
}

interface StatisticsRoomDateResponse {
    records: {
        // 日期
        date: number;
        // 活跃客户数
        active: number;
        // 新增客户
        increase: number;
        // 减少客户
        decrease: number;
        // 消息总数
        messages: number;
    }[]
}

export async function StatisticsRoomDate(params: StatisticsRoomDateRequest): Promise<StatisticsRoomDateResponse> {
    const result = await client.get<StatisticsRoomDateResponse>(`/employee/statistics/room/date`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}