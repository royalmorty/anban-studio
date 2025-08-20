import React, { useEffect } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Action, ActionMeta, useWorkspaceStore } from '@/stores/workspace';
import { useAuthStore } from '@/stores/auth-store';
import { Event } from '@/stores/workspace';
import { MessageFormat, MessageType } from '@/types/msg';
import { DeviceStatus } from '@/types/device';
import { toast } from 'sonner';

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = useAuthStore.getState().auth.accessToken;
  const { updateConnectStatus, setSender } = useWorkspaceStore.getState();

  const auth = useAuthStore();
  const store = useWorkspaceStore();

  // 创建WebSocket连接，包含认证token
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ActionMeta>(import.meta.env.VITE_WS_URL, {

    // protocols: ['protocol1'],
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    queryParams: {
      token: auth.auth.accessToken,
    },
    onOpen: () => {
      console.log('WebSocket连接已打开');
      // 连接成功后，可以发送认证信息或获取初始数据
      // if (accessToken) {
      //   sendJsonMessage({ event: 'AUTH', data: { token: accessToken } });
      // }
      // 获取设备列表
      // sendJsonMessage({ event: Event.EVENT_GET_DEVICES });
    },
    onClose: () => {
      console.log('WebSocket连接已关闭');
    },
    onError: (error) => {
      console.error('WebSocket错误:', error);
    },
  });

  // 更新连接状态到store
  useEffect(() => {
    updateConnectStatus(readyState);
  }, [readyState, updateConnectStatus]);

  // 设置发送消息函数到store
  useEffect(() => {
    setSender(sendJsonMessage);
  }, [sendJsonMessage, setSender]);

  // 处理接收到的消息
  useEffect(() => {

    const handleNewMessage = async () => {
      if (lastJsonMessage !== null) {
        const { action, data } = lastJsonMessage;
        switch (action) {

          case Action.ACTION_ALERT: {
            const result: any = JSON.parse(data);

            toast.warning(result?.title, {
              description: result?.description,
            })

            break;
          };

          case Action.ACTION_SET_DEVICES: {
            const result: any = JSON.parse(data);

            if (result?.num > 0) {
              store.update((state) => {
                const devices = state.devices;
                for (const item of result?.devices) {
                  devices[item.id] = item
                }

                state.num = result?.num;
                state.devices = { ...devices }
              });
            }

            break;
          };

          case Action.ACTION_LOGIN_RESULT: {
            const result: any = JSON.parse(data);
            const { status, device_id }: { status: DeviceStatus, device_id: string } = result;

            store.updateDevice(device_id, {
              url: undefined,
              status: status,
            });

            store.emitEvent(Event.EVENT_GET_DEVICES)

            break;
          };

          case Action.ACTION_LOGIN_QR_CODE: {
            const result: any = JSON.parse(data);

            store.updateDevice(result?.device_id, {
              url: result?.url,
            });

            break;
          };

          case Action.ACTION_SET_CONTACTS: {
            const result: any = JSON.parse(data);

            const contacts = store.contacts
            for (const item of result?.contacts) {
              contacts[item.id] = item
            }

            store.setContacts(contacts);
            break;
          };

          case Action.ACTION_NEW_MESSAGE: {
            const msg: { device_id: string, rid: string, id: number, sender: string, type: MessageType, content: string, avatar: string, ts: number, self: boolean, is_room: boolean, fmt?: MessageFormat } = JSON.parse(data);

            if (msg?.is_room) {
              for (const id in store.rooms) {
                let room = store.rooms[id];

                // if (!room) {
                //   await handleFetchChatRooms(msg?.rid);
                //   room = store.rooms[id];
                // }

                if (room?.device?.id === msg?.device_id && room?.room_id === msg?.rid) {
                  store.updateRoom(room?.id, { msgs: room?.msgs.concat(msg), unread: 1 + room?.unread || 0 });
                }
              }
            } else {
              for (const id in store.contacts) {

                let contact = store.contacts[id];
                // if (!contact) {
                //   await handleFetchChatContacts(msg?.rid);
                //   contact = store.contacts[id];
                // }

                if (contact?.device?.id === msg.device_id && contact?.vx === msg.rid) {
                  store.updateContact(contact?.id, { msgs: contact?.msgs.concat(msg), unread: 1 + contact?.unread || 0 });
                }
              }
            }

            break;
          };


          case Action.NEW_UNSENT_MESSAGE: {
            const msg: { device_id: string, rid: string, id: number, sender: string, type: MessageType, content: string, avatar: string, ts: number, self: boolean, is_room: boolean, fmt?: MessageFormat } = JSON.parse(data);

            if (msg?.is_room) {
              for (const id in store.rooms) {

                let room = store.rooms[id];

                // if (!room) {
                //   await handleFetchChatRooms(msg?.rid);
                //   room = store.rooms[id];
                // }

                if (room?.device?.id === msg?.device_id && room?.room_id === msg?.rid) {
                  store.updateRoom(room?.id, { msgs: room?.msgs.concat({ ...msg, unsent: true }) });
                }
              }
            } else {
              for (const id in store.contacts) {

                let contact = store.contacts[id];
                // if (!contact) {
                //   await handleFetchChatContacts(msg?.rid);
                //   contact = store.contacts[id];
                // }

                if (contact?.device?.id === msg.device_id && contact?.vx === msg.rid) {
                  store.updateContact(contact?.id, { msgs: contact?.msgs.concat({ ...msg, unsent: true }) });
                }
              }
            }

            break;
          }

          case Action.MESSAGE_SEND_SUCCESS: {
            const msg: { device_id: string, rid: string, id: number, sender: string, type: MessageType, content: string, avatar: string, ts: number, self: boolean, is_room: boolean, fmt?: MessageFormat } = JSON.parse(data);
            if (msg?.is_room) {
              for (const id in store.rooms) {

                let room = store.rooms[id];

                // if (!room) {
                //   await handleFetchChatRooms(msg?.rid);
                //   room = store.rooms[id];
                // }

                const msgs = room?.msgs || [];

                const index = msgs.findIndex((item) => item.id === msg.id);

                if (index !== -1) {
                  msgs[index] = { ...msgs[index], unsent: false, ts: msg.ts };
                  store.updateRoom(room?.id, { msgs: [...msgs] });
                }
              }
            } else {
              for (const id in store.contacts) {

                let contact = store.contacts[id];

                // if (!contact) {
                //   await handleFetchChatContacts(msg?.rid);
                //   contact = store.contacts[id];
                // }

                const msgs = contact?.msgs || [];
                const index = msgs.findIndex((item) => item.id === msg.id);

                if (index !== -1) {
                  msgs[index] = { ...msgs[index], unsent: false, ts: msg.ts };
                  store.updateContact(contact?.id, { msgs: [...msgs] });
                }
              }
            }

            break;
          }

          case Action.ACTION_ROOM_REPLY_ADVICE: {
            const result: { rid: string, msg: string } = JSON.parse(data);
            store.updateRoom(result.rid, { reply: result.msg });
            break;
          }

          case Action.ACTION_CONTACT_REPLY_ADVICE: {
            const result: { cid: string, msg: string } = JSON.parse(data);
            store.updateContact(result.cid, { reply: result.msg });
            break;
          }

          default:
            console.warn('Unknown Action: ', action);
            break;
        }
      }
    }

    handleNewMessage()
  }, [lastJsonMessage]);

  return <>{children}</>;
};

// 导出一个自定义Hook，方便组件使用WebSocket
// 但主要的连接管理是在Provider中完成的
// 组件可以通过useWorkspaceStore来获取状态和发送消息
export const useWebSocketManager = () => {
  const { emitEvent, status } = useWorkspaceStore();

  return {
    sendEvent: emitEvent,
    isConnected: status === ReadyState.OPEN,
    connectionStatus: status,
  };
};