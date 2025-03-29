// import authApiRequest from "@/apiRequests/auth"
// import { LoginBodyType } from "@/schemaValidations/auth.schema";
// import { useMutation } from "@tanstack/react-query"

// // export const useLoginMuntation = ()=> {
// //     return useMutation({
// //         mutationFn: authApiRequest.login
// //     })
// // }



// export function useLoginMutation() {
//     return useMutation<LoginResponseType, Error, LoginBodyType>(
//       async (data: LoginBodyType) => {
//         const res = await fetch("/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
  
//         if (!res.ok) {
//           throw new Error("Đăng nhập thất bại");
//         }
  
//         return res.json(); // Trả về dữ liệu sau khi đăng nhập thành công
//       }
//     );
//   }
  