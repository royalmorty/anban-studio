import { DeviceKind, DeviceStatus } from "./device";
import { LabelType } from "./label";
import { Message } from "./msg";

export enum Gender {
    GenderNone = 0,
    GenderMale = 1, // 男
    GenderFemale = 2, // 女
}

export const GenderColor = {
    [Gender.GenderMale]: 'border-blue-500',
    [Gender.GenderFemale]: 'border-pink-500',
    [Gender.GenderNone]: 'border-gray-500'
}

export interface Contact {
    id: string;
    vx: string;
    unread: number;
    code: string;
    name: string;
    pin_yin?: string;
    remark: string;
    remark_pin_yin?: string;
    gender: Gender;
    country: string;
    avatar: string;
    province: string;
    city: string;
    dvx: string;
    created_at: number;
    signature: string;
    manually: boolean;
    device: {
        id: string;
        kind: DeviceKind;
        remarks: string;
        enable: boolean;
        avatar: string;
        nickname: string;
        status: DeviceStatus;
        vx: string;
        mobile: string;
    };

    msgs: Message[];
    reply?: string; // 智能回复建议
}

export interface ContactDetail {
    manually: boolean,
    profile: string,
    remark: string
    labels: {
        id: number,
        type: LabelType,
        name: string,
    }[];
}
