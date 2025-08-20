import { Gender } from "@/types/contact";
import client from "../axios";

interface FindContactsRequest {
    dvx?: string;
    limit: number,
    offset: number,
    query?: string,
    start?: number,
    end?: number,
    sort?: string,
    desc?: boolean,
}

interface FindContactsResponse {
    total: number;
    contacts: Contact[]
}

export interface Contact {
    id: string;
    vx: string;
    name: string;
    avatar: string;
    remark: string;
    gender: Gender;
    code: string;
    mobile: string;
    pin_yin: string;
    country: string;
    province: string;
    city: string;
    dvx: string;
    signature: string;
    remark_pin_yin: string;
    note: string;
    profile: string;
    left_at: number;
    created_at: number;
}

export async function FindContacts(params: FindContactsRequest): Promise<FindContactsResponse> {
    const result = await client.get<FindContactsResponse>(`/employee/statistics/contacts`, {
        params,
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}