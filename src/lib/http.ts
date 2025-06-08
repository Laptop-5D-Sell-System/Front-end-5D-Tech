import envConfig from "../../config";
import { normalizePath } from "./utils";
import { redirect } from "next/navigation";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string; 
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

const createUrl = (url: string, baseUrl?: string): string => {
  const fullBaseUrl = baseUrl || envConfig.NEXT_PUBLIC_API_ENDPOINT;
  const path = normalizePath(url) || "";
  return `${fullBaseUrl}/${path}`;
};

type EntityErrorPayload = {
  message: string;
  errors: { field: string; message: string }[];
};

export class HttpError extends Error {
  status: number;
  token?: string; 

  constructor({ status, token, message = "Lỗi HTTP" }: { status: number; token?: string; message?: string }) {
    super(message);
    this.status = status;
    this.token = token;
  }
}

export class EntityError extends HttpError {
  payload: EntityErrorPayload;

  constructor({ status, payload }: { status: number; payload?: EntityErrorPayload }) {
    super({ status, message: "Lỗi thực thể" }); 
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;

const isClient = typeof window !== "undefined";

const request = async <Response>({
  method,
  url,
  options,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  options?: CustomOptions;
}) => {
  const body: FormData | string | undefined = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body);

  const baseHeaders: Record<string, string> = body instanceof FormData ? {} : { "Content-Type": "application/json" };

  if (isClient) {
    const token = localStorage.getItem("token") ?? "";
    if (token) {
      baseHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const fullUrl = createUrl(url, options?.baseUrl);

  try {
    console.log('Full URL:', fullUrl);
    const res = await fetch(fullUrl, {
      ...options,
      headers: { ...baseHeaders, ...options?.headers },
      body,
      method,
    });

    const payload = await res.json();
    const data = { status: res.status, payload };

    if (!res.ok) {
      if (res.status === ENTITY_ERROR_STATUS) {
        throw new EntityError({ status: ENTITY_ERROR_STATUS, payload: payload as EntityErrorPayload });
      } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
        if (isClient) {
          if (!clientLogoutRequest) {
            clientLogoutRequest = fetch("/api/auth/logout", {
              method: "POST",
              body: null,
              headers: {
                ...baseHeaders
              } as any
            })
            try{
              await clientLogoutRequest;
            } catch (error) {
              console.error("Logout request failed", error);
            } finally {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");

              clientLogoutRequest = null;
              // location.href = "/login";
            }
          }
        } else {
          const accessToken = (options?.headers as any)?.Authorization?.split("Bearer ")[1] ?? "";
          redirect(accessToken ? `/logout?token=${accessToken}` : "/logout");
        }
      } else {
        throw new HttpError({ status: res.status, message: payload.message });
      }
    }

    if (isClient) {
        const normalizedUrl = normalizePath(url);
        if (normalizedUrl === 'api/auth/login') {
          const loginData = payload; // Lấy phản hồi từ API
          const token = loginData?.payload?.token;
      
          if (token) {
            localStorage.setItem("token", token);
            console.log("Đăng nhập thành công!");
            
            
          } else {
            console.error("Lỗi: Không tìm thấy token trong phản hồi của API");
          }
        }
      }
      

    return data;
  } catch (error) {
    console.error("Error in HTTP request:", error);
    throw error;
  }
};

const http = {
  get<Response>({ url, options }: { url: string; options?: Omit<CustomOptions, "body"> }) {
    return request<Response>({ method: "GET", url, options });
  },

  post<Response>({ url, body, options }: { url: string; body: any; options?: CustomOptions }) {
    return request<Response>({ method: "POST", url, options: { ...options, body } });
  },

  put<Response>({ url, body, options }: { url: string; body: any; options?: CustomOptions }) {
    return request<Response>({ method: "PUT", url, options: { ...options, body } });
  },

  delete<Response>({ url, options }: { url: string; options?: Omit<CustomOptions, "body"> }) {
    return request<Response>({ method: "DELETE", url, options });
  },
};

export default http;
