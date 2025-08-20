export interface Device {
    id: string;
    mobile: string;
    kind: DeviceKind;
    avatar?: string;
    nickname?: string;
    remarks?: string;
    enable: boolean;
    vx: string;
    url?: string;
    status?: DeviceStatus;
}

export enum DeviceKind {
    DeviceKindNone = 0,
    DeviceKindWeChat = 1,
    DeviceKindWeWork = 2,
}

export enum DeviceStatus {
    DeviceStatusNone = 0,
    DeviceStatusInactive = 1, // 设备未激活
    DeviceStatusOffline = 2, // 设备离线
    DeviceStatusOnline = 3, // 设备在线
}

export const DeviceAllStatus = [
    { value: DeviceStatus.DeviceStatusInactive, label: "设备未激活" },
    { value: DeviceStatus.DeviceStatusOffline, label: "设备离线" },
    { value: DeviceStatus.DeviceStatusOnline, label: "设备在线" },
]

export enum NotifyType {
    NotifyTypeWeWork = 1,
    NotifyTypeWeChat = 2,
    NotifyTypeLark = 3,
    NotifyTypeDingTalk = 4,
}

// NotifyType 用作 select 的 option
export const NotifyOptions = [
    { value: NotifyType.NotifyTypeWeWork, label: "企微", disabled: false },
    { value: NotifyType.NotifyTypeWeChat, label: "个微", disabled: false },
    { value: NotifyType.NotifyTypeLark, label: "飞书", disabled: false },
    { value: NotifyType.NotifyTypeDingTalk, label: "钉钉", disabled: false },
];
