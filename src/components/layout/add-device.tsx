import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, Rocket } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod/v4";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner"
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { DeviceKind } from "@/types/device";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { regions } from "@/types/region";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CreateDevice } from "@/services/device/create-device";

const formSchema = zod.object({
  mobile: zod.string().length(11, { error: "请输入手机号" }),
  kind: zod.enum(DeviceKind),
  remarks: zod.string(),
  callback: zod.string(),
  base_url: zod.string(),
  region: zod.string(),
  token: zod.string(),
  wid: zod.string(),
});

export interface AddDeviceProps extends AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddDevice(props: AddDeviceProps) {

  const [loading, setLoading] = useState(false);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    progressive: true,
    defaultValues: {
      kind: DeviceKind.DeviceKindWeChat,
    },
  });

  const handleSubmit = useCallback(async (values: zod.infer<typeof formSchema>) => {

    if (loading) return;
    setLoading(true);

    try {
      props.setOpen(false)

      await CreateDevice(values)

      form.reset(); // reset form after submit success
    } catch (error) {
      console.error(error);

      toast.error("添加设备失败", {
        description: error instanceof Error ? error.message : "未知错误",
      })

    } finally {
      setLoading(false);
    }
  }, [loading])

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* <DialogTrigger asChild>{props.children}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加设备</DialogTitle>
          <DialogDescription>选购新的设备</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}
            className="grid gap-4 py-4"
          >

            {/* <FormField
              control={form.control}
              name="kind"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>类型</FormLabel>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      value={field.value.toString()}
                      onValueChange={(kind: string) => {
                        form.setValue("kind", Number(kind) as DeviceKind);
                      }}
                      className="grid grid-cols-4 gap-4"
                    >

                      <Label
                        htmlFor={DeviceKind.DeviceKindWeChat.toString()}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-500 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={DeviceKind.DeviceKindWeChat.toString()}
                          id={DeviceKind.DeviceKindWeChat.toString()}
                          className="sr-only"
                        />
                        <MessageCircle className="seize-6 text-green-300" />
                        个微
                      </Label>

                      <Label
                        htmlFor={DeviceKind.DeviceKindWeWork.toString()}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={DeviceKind.DeviceKindWeWork.toString()}
                          id={DeviceKind.DeviceKindWeWork.toString()}
                          className="sr-only"
                          disabled={true}
                        />
                        <MessageSquare className="seize-6 text-blue-300" />
                        企微
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>...</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>电话号码</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={11} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-destructive">
                    务必和设备真实绑定手机号码一致，否则无法使用！
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>地区</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? regions.find(
                              (language) => language.value === field.value
                            )?.label
                            : "请选择地区"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="搜索地区"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>没有找到相关地区</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[250px]">
                              {regions.map((region) => (
                                <CommandItem
                                  value={region.label}
                                  key={region.value}
                                  onSelect={() => {
                                    form.setValue("region", region.value)
                                  }}
                                >
                                  {region.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      region.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                              <ScrollBar orientation="vertical" />
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-destructive">
                    务必和设备真实所在地区一致，否则会影响您设备的正常使用！
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>设备备注</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="添加设备备注, 方便后续管理"
                      {...field}
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="base_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>服务地址</FormLabel>
                  <FormControl>
                    <Input placeholder="请联系客服获取"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="callback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>回调地址</FormLabel>
                  <FormControl>
                    <Input placeholder="请联系客服获取"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TOKEN</FormLabel>
                  <FormControl>
                    <Input placeholder="请联系客服获取"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>扣子工作流ID</FormLabel>
                  <FormDescription>https://www.coze.cn</FormDescription>
                  <FormControl>
                    <Input placeholder="请联系客服获取"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton loading={loading} icon={<Rocket className="size-4" />} type="submit" className="w-full">
                添加设备
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
