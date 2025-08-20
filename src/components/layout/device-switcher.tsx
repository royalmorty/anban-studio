import { useCallback, useEffect, useState } from "react"
import { ChevronsUpDown, QrCode } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Device, DeviceKind, DeviceStatus } from "@/types/device"
import { useWorkspaceStore } from "@/stores/workspace"
import LoginDevice from "./login-device"
import AddDevice from "./add-device"
import { IconBrandWechat } from "@tabler/icons-react"

export function DeviceSwitcher({
  active,
  devices,
  onSwitchDevice,
}: {
  active: Device | null
  devices: Record<string, Device>
  onSwitchDevice: (device: Device) => void
}) {
  const { isMobile } = useSidebar()

  const store = useWorkspaceStore()

  const [open, setOpen] = useState(false)

  // const handleSelectDevice = useCallback((device: Device) => {

  //   store.setActiveDevice(device?.id)
  //   switch (device?.status) {
  //     case DeviceStatus.DeviceStatusInactive: {  // 设备离线
  //       toast.warning("设备离线", {
  //         description: "设备已离线，请联系客服！",
  //       });
  //       break
  //     }
  //     case DeviceStatus.DeviceStatusOffline: {// 设备在线
  //       store.emitEvent(Event.EVENT_DEVICE_LOGIN, { device_id: active?.id });
  //       setOpen(true)
  //       break
  //     }

  //     case DeviceStatus.DeviceStatusOnline: {// 账号登录
  //       // store.emitEvent(Event.EVENT_GET_LOGIN_RESULT, { id: active?.id });
  //       // TODO: 打开设备设置信息
  //       break
  //     }
  //     default: {
  //       console.warn("未知设备状态: ", device)
  //     }
  //   }
  // }, [store, active])

  const [openAddDevice, setOpenAddDevice] = useState(false)
  const handleAddDevice = useCallback(() => {
    // TODO: 购买设备逻辑
    setOpenAddDevice(true)
  }, [])

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={active?.avatar || "/images/loading.gif"} className={cn("size-4 h-full w-full rounded-sm", active?.status != DeviceStatus.DeviceStatusOnline && "grayscale")} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{active ? active.nickname : "选择设备"}</span>
                  <span className="truncate text-xs"> {active?.remarks}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                可用设备 ({store.num})
              </DropdownMenuLabel>
              {Object.values(devices).map((dvc, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => onSwitchDevice(dvc)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-8 items-center justify-center rounded-xs border">
                    <img src={dvc?.avatar || "/images/loading.gif"} className={cn("size-4 shrink-0 h-full w-full rounded-sm", dvc?.status != DeviceStatus.DeviceStatusOnline && "grayscale")} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{dvc?.nickname}</span>
                    <span className="truncate text-xs"> {dvc?.remarks}</span>
                  </div>
                  <DropdownMenuShortcut>
                    {dvc?.kind === DeviceKind.DeviceKindWeChat && <IconBrandWechat className="size-4 shrink-0 text-green-500" />}
                    {dvc?.kind === DeviceKind.DeviceKindWeWork && <IconBrandWechat className="size-4 shrink-0 text-blue-500" />}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onSelect={handleAddDevice}>
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <QrCode className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">添加设备</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {active && <LoginDevice open={open} setOpen={setOpen} device={active} deviceId={active.id} />}
      <AddDevice open={openAddDevice} setOpen={setOpenAddDevice} />
    </>
  )
}
