import client from "./axios";

export interface QrcodeResponse {
  result: QrcodeResponseResult;
}

export interface QrcodeResponseResult {
  qrcode_base64: string; // 二维码 base64
  scene: string; // 场景
}

export async function getQrcode(): Promise<QrcodeResponse> {
  const result = await client.get<QrcodeResponse>(`/session/applets/code`, {
    timeout: 60000,
  });

  return Promise.resolve(result.data);
}

export interface AuthStatusResponse {
  /**
      * token过期时间戳
      */
  expiresIn: number;
  /**
   * 刷新token过期时间戳
   */
  refreshExpiresIn: number;
  /**
   * 刷新token
   */
  refreshToken: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 访问token
   */
  token: string;
  /**
   * 用户ID
   */
  userId: number;
}


export async function getAuthStatus(scene: string): Promise<AuthStatusResponse> {
  const result = await client.post<AuthStatusResponse>('/api/web/v1.0/qrcode/login', { scene }, { timeout: 60000 });

  return Promise.resolve(result.data);
}
