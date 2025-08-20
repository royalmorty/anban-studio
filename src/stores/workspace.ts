import { create } from "zustand";
import { StoreKey } from "../constant";
import { ReadyState } from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Device, DeviceKind, DeviceStatus } from "@/types/device";
import { Contact } from "@/types/contact";
import { Room } from "@/types/room";

export const DEFAULT_DEVICE: Device = {
  id: "all",
  mobile: "",
  kind: DeviceKind.DeviceKindWeChat,
  avatar: "/vx.png",
  nickname: "所有设备",
  remarks: "",
  enable: false,
  vx: "",
  url: "",
  status: DeviceStatus.DeviceStatusNone,
}

export const DEFAULT_CONFIG = {
  num: 0,
  devices: {
    [DEFAULT_DEVICE.id]: DEFAULT_DEVICE,
  } as Record<string, Device>,
  rooms: {} as Record<string, Room>,
  contacts: {} as Record<string, Contact>,
  active: null as string | null, // device.id 当前选择的设备
  msgs: [] as MessageEvent<any>[],
  status: ReadyState.UNINSTANTIATED,
  sender: null as SendJsonMessage | null,
};

export type Workspace = typeof DEFAULT_CONFIG;

export type WorkspaceStore = Workspace & {
  emitEvent: (event: string, data?: any) => void;
  setSender: (sender: SendJsonMessage) => void;
  updateConnectStatus: (readyState: ReadyState) => void;
  setActiveDevice: (id: string) => void;
  init: () => void;
  reset: () => void;
  update: (updater: (state: Workspace) => void) => void;
  updateDevice: (id: string, device: Partial<Device>) => void;

  setRooms: (rooms: Record<string, Room>) => void;
  setContacts: (contacts: Record<string, Contact>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
};

export interface ActionMeta {
  action: Action,
  data: any
}

// Action 动作:服务器下发给客户端
export enum Action {
  ACTION_ALERT = "ALERT", // 弹窗
  ACTION_SET_DEVICES = "SET_DEVICES", // 下发设备列表
  ACTION_LOGIN_RESULT = 'LOGIN_RESULT',
  ACTION_LOGIN_QR_CODE = 'LOGIN_QR_CODE',
  ACTION_SET_CONTACTS = 'SET_CONTACTS', // 下发账号联系人列表
  ACTION_NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_UNSENT_MESSAGE = 'NEW_UNSENT_MESSAGE',
  MESSAGE_SEND_SUCCESS = 'MESSAGE_SEND_SUCCESS',
  ACTION_ROOM_REPLY_ADVICE = 'ROOM_REPLY_ADVICE', // 聊天群回复AI智能回复
  ACTION_CONTACT_REPLY_ADVICE = 'CONTACT_REPLY_ADVICE', // 联系人回复AI智能回复
}

export enum Event {
  EVENT_GET_DEVICES = "GET_DEVICES", // 获取设备列表
  EVENT_DEVICE_LOGIN = "DEVICE_LOGIN", // 设备登录
  EVENT_DEVICE_LOGOUT = "DEVICE_LOGOUT", // 设备登出
  // EVENT_GET_ROOM_MEMBERS = "GET_ROOM_MEMBERS", // 获取房间成员列表
  // EVENT_GET_LOGIN_RESULT = "GET_LOGIN_RESULT", // 获取登录结果
  // EVENT_UPDATE_DEVICE_OPTIONS = "UPDATE_DEVICE_OPTIONS", // 更新设备配置
  // EVENT_GET_USER_INFO = "GET_USER_INFO", // 获取用户信息
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  (set, get) => ({
    ...DEFAULT_CONFIG,

    init() {

    },

    setSender: (sender: SendJsonMessage) => {
      get().update((state) => {
        state.sender = sender;
      });
    },

    updateConnectStatus: (status: ReadyState) => {
      get().update((state) => {
        state.status = status;
      });
    },

    emitEvent: (event: string, data?: any) => {
      try {
        get().sender?.({ event, data: JSON.stringify(data) });
      } catch (error) {
        console.error('send event error: ', error);
      }
    },

    setActiveDevice: (id: string) => {
      const device = get().devices[id];

      if (!device) {
        console.warn(`device not found: ${id}`);
        return;
      }

      get().update((state) => {
        state.active = id;
      });
    },

    reset() {
      set(() => ({ ...DEFAULT_CONFIG }));
      localStorage.removeItem(StoreKey.Workspace) // 清除 localStorage
    },

    update(updater) {
      set((state) => {
        const newer = { ...state };
        updater(newer);
        return newer
      });
    },

    updateDevice: (id: string, opts: Partial<Device>) => {
      get().update((state) => {

        const devices = { ...state.devices };

        devices[id] = {
          ...devices[id],
          ...opts,
        }

        state.devices = devices;
      });
    },

    setContacts: (contacts: Record<string, Contact>) => {
      get().update((state) => {
        state.contacts = contacts;
      });
    },

    setRooms: (rooms: Record<string, Room>) => {
      get().update((state) => {
        state.rooms = rooms;
      });
    },

    updateContact: (id: string, contact: Partial<Contact>) => {

      get().update((state) => {

        const contacts = { ...state.contacts };

        contacts[id] = {
          ...contacts[id],
          ...contact,
        };

        state.contacts = contacts;
      });
    },

    updateRoom: (id: string, record: Partial<Room>) => {

      get().update((state) => {

        const rooms = { ...state.rooms };

        rooms[id] = {
          ...rooms[id],
          ...record,
        };

        state.rooms = rooms;
      });
    },
  })
);
