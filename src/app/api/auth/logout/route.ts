"use server";

import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies(); // ✅ cần await ở đây

  const accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Xóa cookie
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
  } catch (error: any) {
    console.error("Lỗi khi gọi authApiRequest.sLogout:", error);

    return NextResponse.json(
      {
        message: error?.message || "Lỗi khi gọi API đến Backend",
      },
      { status: 500 }
    );
  }
}
