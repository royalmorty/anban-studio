import client from "../axios";

interface StatisticsContactBasicRequest {
    dvx?: string;
    start: number;
    end: number;
}

interface StatisticsContactBasicResponse {
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

export async function StatisticsContactBasic(params: StatisticsContactBasicRequest): Promise<StatisticsContactBasicResponse> {
    const result = await client.get<StatisticsContactBasicResponse>(`/employee/statistics/contact/basic`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}