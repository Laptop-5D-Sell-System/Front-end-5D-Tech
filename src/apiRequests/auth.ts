import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType, LogoutResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  
    sLogin: (body: LoginBodyType) => http.post<LoginResType>({ url: "/auth/login", body }),
    login: (body: LoginBodyType) =>
    http.post<LoginResType>({
        url: "/login",
        body,
        options: { baseUrl: "" },
    }),

    // sLogin: (body: LogoutBodyType) => http.post<LogoutResType>({ url: "/auth/logout", body }),

      
};

export default authApiRequest;
