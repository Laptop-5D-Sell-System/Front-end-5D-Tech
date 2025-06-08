import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType } from "@/schemaValidations/auth.schema";
// import { log } from "console";

const authApiRequest = {
  
    sLogin: (body: LoginBodyType) => 
    http.post<LoginResType, LoginBodyType>({ url: "/auth/login", body }),
    login: (body: LoginBodyType) =>
    http.post<LoginResType, LoginBodyType>({
      url: "/login", 
      body,
    }),

    sLogout: (body: LogoutBodyType & {
        token: string
      }) => http.post({
        url: "/auth/logout",
        body: { 
          token: body.token,
          refreshToken: body.refreshToken 
        },
        options: {
          headers: {
            Authorization: `Bearer ${body.token}`
          }
        }
      }),
      logout: () =>
        http.post({
            url: "/logout",
            body: null,
            options: { baseUrl: "" },
        }),
      
};

export default authApiRequest;
