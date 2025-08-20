import client from "./axios";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    token: string;
    expire: number;
}

export async function TakeAuthToken(data: Request): Promise<Response> {
    const result = await client.post<Response>(`/employee/access/token`, data, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}