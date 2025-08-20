import { Gender } from "./contact";
import { DeviceKind, DeviceStatus } from "./device";
import { Message } from "./msg";

export interface Room {
    id: string;
    room_id: string;
    code: string;
    dvx: string;
    unread: number;
    name: string;
    pin_yin?: string;
    remark: string;
    remark_pin_yin?: string;
    avatar: string;
    summary: string;
    created_at: number;
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
    members: Member[];

    reply?: string; // 智能回复建议
}

export interface Member {
    vx: string;
    name: string;
    avatar: string;
    nickname?: string;
    state?: number;
    gender?: Gender;
}
