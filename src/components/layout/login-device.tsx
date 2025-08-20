import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import QRCode from 'qrcode'
import { Device, DeviceStatus } from "@/types/device";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MobileIcon } from "@radix-ui/react-icons";
import { Bookmark, ChevronsUpDown, CircleDashed, QrCode } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Event, useWorkspaceStore } from "@/stores/workspace";
import LoadingButton from "../loading-button";

export interface LoginDeviceProps extends AlertDialogProps {
  deviceId: string;
  device: Device;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function LoginDevice(props: LoginDeviceProps) {

  const { device } = props;

  const store = useWorkspaceStore();

  // const active = useMemo(() => store.active ? store.devices[store.active] : null, [store.active, store.devices])

  useEffect(() => {
    if (device?.status === DeviceStatus.DeviceStatusOnline) {
      props.setOpen(false);
    }
  }, [device?.status]);

  const handleDeviceLogin = useCallback(() => {
    if (device) {
      store.emitEvent(Event.EVENT_DEVICE_LOGIN, { device_id: device.id });
    }
  }, [device]);

  const [qrcode, setQrcode] = useState<string | null>(null);

  // 使用 useEffect 获取二维码
  useEffect(() => {
    async function generateBarcode() {
      try {
        if (device?.url) {
          const code = await QRCode.toDataURL(device?.url, { width: 500 });
          setQrcode(code);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (device?.url) generateBarcode();
  }, [device?.url]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* <DialogTrigger asChild>{props.children}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>登录设备</DialogTitle>
          <DialogDescription>扫码登录设备</DialogDescription>
        </DialogHeader>

        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-sm">
            <AvatarImage src={device?.avatar} alt={device?.nickname} />
            <AvatarFallback className="rounded-lg text-white">AB</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{`device?.nickname`}</span>
            <span className="truncate text-xs">{`device?.remarks`}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>

        <Alert>
          <MobileIcon className="size-4" />
          <AlertTitle>电话号码</AlertTitle>
          <AlertDescription>
            {device?.mobile}
          </AlertDescription>
        </Alert>

        <Alert>
          <Bookmark className="size-4" />
          <AlertTitle>备注</AlertTitle>
          <AlertDescription>
            {device?.remarks}
          </AlertDescription>
        </Alert>

        <Alert>
          <CircleDashed className="size-4" />
          <AlertTitle>状态</AlertTitle>
          <AlertDescription>
            {device?.status} 联系客服后开通
          </AlertDescription>
        </Alert>

        <LoadingButton onClick={handleDeviceLogin} loading={false} icon={<QrCode className="size-4" />} className="w-full">
          登录设备
        </LoadingButton>
        {qrcode && <img src={qrcode} className="w-full h-full" />}
      </DialogContent>
    </Dialog>
  );
}
