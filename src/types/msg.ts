
export enum MessageType {
	Moments = 0,          // 朋友圈消息
	Text = 1,          // 文字
	RedEnvelopeSystem = 10000,      // 红包、系统消息
	Withdraw = 10002,      // 撤回消息
	MusicLink = 1040187441, // 音乐链接
	SogouEmoji = 1048625,    // 搜狗表情
	File = 1090519089, // 文件
	Link = 16777265,   // 链接
	Picture = 3,          // 图片
	Voice = 34,         // 语音
	FriendConfirm = 37,         // 好友确认
	PossibleFriend = 40,         // 可能是好友
	BusinessCard = 42,         // 名片
	Video = 43,         // 视频
	RedEnvelope = 436207665,  // 微信红包
	RockPaperScissorsEmoji = 47,         // 石头剪刀布 | 表情图片
	Location = 48,         // 位置
	ShareRealtimeLocation = 49,         // 共享实时位置、文件、转账、链接
	VOIPMSG = 50,         // VOIPMSG
	WeChatInit = 51,         // 微信初始化
	VOIPNOTIFY = 52,         // VOIPNOTIFY
	VOIPINVITE = 53,         // VOIPINVITE
	RedEnvelopeCover = 536936497,  // 红包封面
	SmallVideo = 62,         // 小 视频
	RedEnvelopeV2 = 66,         // 微信红包
	ChannelsVideo = 754974769,  // 视频号视频
	ChannelsCard = 771751985,  // 视频号名片
	Quote = 822083633,  // 引用消息
	Tap = 922746929,  // 拍一拍
	ChannelsLive = 973078577,  // 视频号直播
	ProductLink = 974127153,  // 商品链接
	ChannelsLiveV2 = 975175729,  // 视频 号直播
	SYSNOTIC = 9999,       // SYSNOTIC
}

export interface Message {
	id: number;
	sender: string;
	content: string;
	ts: number;
	type: MessageType;
	self: boolean;
	unsent?: boolean; // 未发送

	fmt?: MessageFormat
}

export const OssFiles = [
	MessageType.File,
	MessageType.Picture,
	MessageType.Video,
	MessageType.Voice,
]

export interface MessageFormat {
	txt?: {
		content: string;
	};
	of?: {
		key: string;
		name: string;
	};
	app?: {
		id: string;
		appid: string;
		title: string;
		name: string;
		path: string;
		cover: string;
	};
}

export function IsFile(type: MessageType): boolean {
	return [MessageType.File, MessageType.Picture, MessageType.Video].includes(type)
}