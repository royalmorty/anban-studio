import client from "../axios";

export interface RecommendProductsRequest {
    did: string;
    vx: string;
}

export interface RecommendProductsResponse {
    products: RecommendProduct[];
}

export interface RecommendProduct {
    title: string   // 产品标题
    id: number       // 产品消息ID
    reason: string  // 推荐原因
    score: number      // 推荐分数
    image: string   // 产品图片
}

export async function RecommendProducts(data: RecommendProductsRequest): Promise<RecommendProductsResponse> {
    const result = await client.post<RecommendProductsResponse>(`/employee/chat/products/recommend`, data, {
        timeout: 180000,
    });

    return Promise.resolve(result.data);
}
