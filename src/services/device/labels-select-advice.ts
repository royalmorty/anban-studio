import client from "../axios";

export interface LabelsSelectAdviceRequest {
    did: string;
    requirement: string;
}

export interface LabelsSelectAdviceResponse {
    keys: string[];
}

export async function LabelsSelectAdvice(params: LabelsSelectAdviceRequest): Promise<LabelsSelectAdviceResponse> {
    const result = await client.get<LabelsSelectAdviceResponse>(`/employee/labels/select/advice`, {
        params,
        timeout: 180000,
    });

    return Promise.resolve(result.data);
}
