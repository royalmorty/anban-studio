import client from "../axios";

interface StatisticsContactDateRequest {
    dvx?: string;
    start: number;
    end: number;
}

interface StatisticsContactDateResponse {
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

export async function StatisticsContactDate(params: StatisticsContactDateRequest): Promise<StatisticsContactDateResponse> {
    const result = await client.get<StatisticsContactDateResponse>(`/employee/statistics/contact/date`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}