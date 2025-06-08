"use server";

import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";
import {NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies(); 

  const accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  cookieStore.delete("token");
  cookieStore.delete("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { message: "Không tìm thấy accessToken hoặc refreshToken trong cookie" },
      { status: 400 }
    );
  }

  try {
    const result = await authApiRequest.sLogout({
      refreshToken,
      token: accessToken,
    });

    console.log("Logout API result:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi khi gọi authApiRequest.sLogout:", error);

    return NextResponse.json(
      {
        // message: error?.message || "Lỗi khi gọi API đến Backend",
      },
      { status: 500 }
    );
  }
}
