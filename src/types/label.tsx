import { IconAperture, IconBrandWechat, IconMessageDots, IconSettings } from "@tabler/icons-react";
import { ComponentType } from "react";


// type LabelType int8

// const (
// 	LabelTypeNone LabelType = iota
// 	LabelTypeVx             // VX原始自带的标签
// 	LabelTypeMsg            // 分析聊天记录得到的标签
// 	LabelTypeSNS            // 分析朋友圈得到的标签
// 	LabelTypeSys            // 系统标签
// )



export enum LabelType {
    LabelTypeVx = 1,// VX原始自带的标签
    LabelTypeMsg = 2,// 分析聊天记录得到的标签
    LabelTypeSNS = 3,// 分析朋友圈得到的标签
    LabelTypeSys = 4,// 系统标签
}

export const LabelTypeOptions: Record<LabelType, { label: string, action: LabelType, icon: ComponentType<{ className?: string }> }> = {
    [LabelType.LabelTypeVx]: { label: '微信标签', action: LabelType.LabelTypeVx, icon: IconBrandWechat },
    [LabelType.LabelTypeMsg]: { label: '消息标签', action: LabelType.LabelTypeMsg, icon: IconMessageDots },
    [LabelType.LabelTypeSNS]: { label: '朋友圈标签', action: LabelType.LabelTypeSNS, icon: IconAperture },
    [LabelType.LabelTypeSys]: { label: '系统标签', action: LabelType.LabelTypeSys, icon: IconSettings },
}
