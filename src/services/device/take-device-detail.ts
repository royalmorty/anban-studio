import { NotifyType } from "@/types/device";
import client from "../axios";
import { ActionType } from "@/types/task";

export interface takeDeviceDetailResponse {
    options: {
        ais: {
            notify?: {
                type: NotifyType;
                key: string;
            };
            enable: {
                room: boolean;
                contact: boolean;
                rooms: string[];
                contacts: string[];
            }
        };

        qac: {
            enable: {
                room: boolean;
                contact: boolean;
                rooms: string[];
                contacts: string[];
            }
        };

        afc: { // accept friend confirm 好友申请
            delay?: number;
            keywords?: {
                text: string
            }[];
            enable: boolean;
        };

        ntf: {
            scenarios?: {
                text: string;
            }[]; // 通知事项
            notify?: {
                type: NotifyType;
                key: string;
            };
            enable: {
                room: boolean;
                contact: boolean;
                rooms: string[];
                contacts: string[];
            }
        };

        sop: {
            ops: {
                idx: number;
                enable: boolean;
                delay: number;

                actions: {
                    idx: number;
                    type: ActionType;
                    text?: {
                        content: string;
                    }
                    file?: {
                        key: string;
                        name: string;
                    }
                    room?: {
                        vx: string;
                        reason: string;
                    },
                    link?: {
                        title: string;    // 标题，最多两行
                        desc: string;   // 摘要，三行
                        thumb: string; // 缩略图的链接
                        url: string;      // 点击后跳转的链接
                    }
                }[]

                conditions?: {
                    not_in_rooms?: string[];
                    min_reply: number;
                    has_labels?: string[];
                };
            }[]
        },

        rsm?: {
            welcome: string;
            welcomes: {
                text: string;
                rooms: string[];
            }[];
            invite: {
                scenarios: {
                    text: string;
                }[];
                enable: {
                    room: boolean;
                    rooms: string[];
                };
            };
            remove: {
                scenarios: {
                    text: string;
                }[];
                enable: {
                    room: boolean;
                    rooms: string[];
                };
            };
        }
    }
}

export async function takeDeviceDetail(id: string): Promise<takeDeviceDetailResponse> {
    const result = await client.get<takeDeviceDetailResponse>(`/employee/devices/${id}`, {
        timeout: 3000,
    });

    return Promise.resolve(result.data);
}
