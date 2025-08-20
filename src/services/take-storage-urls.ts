import client from "./axios";

export interface Request {
    keys: string[]
}

export interface Response {
    urls: Record<string, string>;
}

export async function TakeStorageUrls(data: Request): Promise<Response> {
    const result = await client.post<Response>(`/employee/storage/url`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}