import { IconAperture, IconAward, IconBox, IconLink, IconLivePhoto, IconLogs, IconMailSpark, IconMessage2Heart, IconRadioactive, IconReport } from "@tabler/icons-react";
import { Calendar, FolderClosed, ImageIcon, MessageCircleMore, SunDimIcon, TextIcon, VideoIcon } from "lucide-react";
import { NotifyType } from "./device";

export enum ActionType {
    SendText = 1, // 发送文本
    SendPicture = 2, // 发送图片
    SendVideo = 3, // 发送视频
    SendFile = 4, // 发送文件
    InviteToRoom = 5, // 邀请进群
    SendMiniApp = 6, // 发送小程序
    SendLink = 7, // 发送卡片
    ActionTypeAddContacts = 8, // 添加联系人
    ActionTypeAcceptFriendConfirm = 9, // 接受好友确认
    ActionTypeAddLabels = 10, // 添加标签
    PublishTextSns = 11, // 发布文本朋友圈
    PublishImageSns = 12, // 发布图片朋友圈
    PublishVideoSns = 13, // 发布视频朋友圈
    PublishLinkSns = 14, // 发布链接朋友圈
    InteractSns = 15, // 互动朋友圈
    AnalyzeSns = 16, // 智能分析朋友圈
    PublishRoomActive = 17, // 发布聊天群活动
    ActionTypeChatRoomReport = 18, // 聊天群汇总报告
    ActionTypeForwardPicture = 19, // 转发图片
    ActionTypeForwardVideo = 20, // 转发视频
    ActionTypeForwardFile = 21, // 转发文件
    ActionTypeForwardMiniApp = 22, // 转发小程序
    ActionTypeForwardLink = 23, // 转发链接
    ActionTypePublishChatChain = 25, // 发布聊天接龙
    ActionTypePublishTransaction = 26, // 发布任务
}

export enum RoomActiveType {
    None = 0, // 问答活动
    Qa = 1, // 问答活动
    Riddle = 2, // 猜图活动
}

export const RoomActiveOptions = [
    { value: RoomActiveType.Qa, label: "问答活动", disabled: false },
    { value: RoomActiveType.Riddle, label: "猜图活动", disabled: false },
];

export const ActionTypeOptions = [
    { label: '发送文本消息', action: ActionType.SendText, icon: <MessageCircleMore className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送图片消息', action: ActionType.SendPicture, icon: <ImageIcon className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送视频消息', action: ActionType.SendVideo, icon: <VideoIcon className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送文件消息', action: ActionType.SendFile, icon: <FolderClosed className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送卡片消息', action: ActionType.SendLink, icon: <IconLink className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送小程序', action: ActionType.SendMiniApp, icon: <IconBox className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发送进群邀请', action: ActionType.InviteToRoom, icon: <IconMailSpark className="text-green-500 size-4" />, sop: true, task: true },
    { label: '发布文本朋友圈', action: ActionType.PublishTextSns, icon: <TextIcon className="text-green-500 size-4" />, sop: false, task: true },
    { label: '发布图文朋友圈', action: ActionType.PublishImageSns, icon: <IconAperture className="text-green-500 size-4" />, sop: false, task: true },
    { label: '朋友圈智能互动', action: ActionType.InteractSns, icon: <IconMessage2Heart className="text-purple-500 size-4" />, sop: false, task: true },
    { label: '智能分析朋友圈', action: ActionType.AnalyzeSns, icon: <IconLivePhoto className="text-purple-500 size-4" />, sop: false, task: true },
    { label: '发布聊天群活动', action: ActionType.PublishRoomActive, icon: <IconAward className="text-purple-500 size-4" />, sop: false, task: true },
    { label: '聊天群汇总报告', action: ActionType.ActionTypeChatRoomReport, icon: <IconReport className="text-purple-500 size-4" />, sop: false, task: true },
    { label: '发布聊天接龙', action: ActionType.ActionTypePublishChatChain, icon: <IconLogs className="text-purple-500 size-4" />, sop: false, task: true },
    { label: '发布任务', action: ActionType.ActionTypePublishTransaction, icon: <IconRadioactive className="text-purple-500 size-4" />, sop: false, task: true },
]

export enum TaskStatus {
    None = 0,
    Created = 1, // 已创建
    Scheduling = 2, // 调度中
    Running = 3, // 运行中
    Finished = 4, // 已完成
    Canceled = 5, // 已取消
    Failed = 6, // 已失败
}

export const TaskOptions = [
    { value: TaskStatus.None, label: "全部", disabled: false },
    { value: TaskStatus.Created, label: "已创建", disabled: false },
    { value: TaskStatus.Scheduling, label: "调度中", disabled: false },
    { value: TaskStatus.Running, label: "运行中", disabled: false },
    { value: TaskStatus.Finished, label: "已完成", disabled: false },
    { value: TaskStatus.Canceled, label: "已取消", disabled: false },
    { value: TaskStatus.Failed, label: "已失败", disabled: false },
]

export interface ClientAction {
    idx: number;
    type: ActionType;

    notify?: {
        type: NotifyType;
        key: string;
    }

    text?: {
        content: string;
    }

    files?: {
        key: string;
        name: string;
    }[]

    room?: {
        vx: string;
        reason?: string;
        minutes?: number;
    }

    link?: {
        title: string;    // 标题，最多两行
        desc: string;   // 摘要，三行
        thumb: string; // 缩略图的链接
        url: string;      // 点击后跳转的链接
    }

    app?: {
        id: string;
        appid: string;
        title: string;
        name: string;
        path: string;
        cover: string;
    }

    active?: {
        type?: RoomActiveType // 活动类型
        industry?: string // 行业
        hint?: number         // 活动发布后多久发送提示(秒)`
        announce?: number     // 活动发布后多久揭晓答案(秒)`
        introduction?: string // 活动开始的介绍说明
        congratulation?: string  // 活动结束后对猜中成员的恭喜话术
        apology?: string  // 活动结束后没有任何成员猜中的话术
        sentences?: {
            text: string;
        }[]  // 活动结束后的固定话术
    }

    chain?: {
        title: string     // 接龙标题
        desc: string     // 接龙描述
        example?: string  // 接龙示例
        tail?: string     // 接龙尾部解释
    }

    transaction?: {
        introduction?: string // 事务开始的介绍说明
        goals: {
            text: string;
        }[] // 事务目标
        minutes: number // 事务持续时长(分钟)
        success?: string // 事务达成后的话术
        failure?: string // 事务未达成后的话术
    }
}

export function formatAction(action: ClientAction) {
    switch (action.type) {
        case ActionType.SendText:
            return action.text?.content
        case ActionType.PublishImageSns:
        case ActionType.SendPicture:
        case ActionType.SendVideo:
        case ActionType.SendFile:
            return action.files?.flatMap((file) => file.name).join("/")
        case ActionType.InviteToRoom:
            return action.room?.vx + ":" + action.room?.reason
        // case ActionType.AddToRoom:
        //     return action.room?.vx + ":" + action.room?.reason
        case ActionType.SendLink:
            return action.link?.title
        default:
            return ""
    }
}

export enum TaskCycle {
    Once = 1,
    Hourly = 2,
    Daily = 3,
    Weekly = 4,
    Monthly = 5,
}

export const TaskCycleOptions = [
    { label: '执行一次', cycle: TaskCycle.Once, icon: <TextIcon className="size-4" /> },
    { label: '每日执行', cycle: TaskCycle.Daily, icon: <SunDimIcon className="size-4" /> },
    { label: '每周执行', cycle: TaskCycle.Weekly, icon: <VideoIcon className="size-4" /> },
    { label: '每月执行', cycle: TaskCycle.Monthly, icon: <Calendar className="size-4" /> },
]

export enum TaskType {
    None = 0, // 全部
    Contact = 1, // 联系人
    Room = 2, // 聊天群
}

export const TaskTypeOptions = [
    // { label: '全部', type: TaskType.None, icon: <TextIcon className="size-4" /> },
    { label: '联系人', type: TaskType.Contact, icon: <SunDimIcon className="size-4" /> },
    { label: '聊天群', type: TaskType.Room, icon: <VideoIcon className="size-4" /> },
]
