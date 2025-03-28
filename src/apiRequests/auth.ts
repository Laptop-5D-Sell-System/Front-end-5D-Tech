import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

/**
 * authApiRequest định nghĩa các hàm gọi API liên quan đến authentication.
 *
 * - sLogin: Gọi API login của hệ thống bên ngoài (sử dụng baseUrl mặc định từ cấu hình env).
 * - login: Gọi API login của Next.js (sử dụng đường dẫn tương đối, baseUrl rỗng).
 */
const authApiRequest = {
  // Gọi API login bên ngoài, sử dụng baseUrl được lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT trong http.post.
//   sLogin: (body: LoginBodyType) => http.post('/auth/login', body),
    sLogin: (body: LoginBodyType) => http.post<LoginResType>({ url: "/auth/login", body }),
    login: (body: LoginBodyType) =>
    http.post<LoginResType>({
        url: "/api/auth/login",
        body,
        options: { baseUrl: "" },
    }),
    
  // Gọi API login của Next.js, sử dụng đường dẫn tương đối (không có baseUrl) 
  // Điều này sẽ đảm bảo request được gửi đến cùng domain với ứng dụng Next.js.

      
};

export default authApiRequest;
