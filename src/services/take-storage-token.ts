import client from "./axios";

export interface Response {
    token: string;
    expire: number;
    bucket: string;
}

export async function TakeStorageToken(): Promise<Response> {
    const result = await client.post<Response>(`/employee/storage/token`, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}