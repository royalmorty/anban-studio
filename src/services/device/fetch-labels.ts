import { LabelType } from "@/types/label";
import client from "../axios";

interface FetchLabelsRequest {
    device_vx: string;
}

interface FetchLabelsResponse {
    labels: {
        key: string;
        name: string;
        num: number;
        type: LabelType;
    }[]
}

export async function FetchLabels(params: FetchLabelsRequest): Promise<FetchLabelsResponse> {
    const result = await client.get<FetchLabelsResponse>(`/employee/labels`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}