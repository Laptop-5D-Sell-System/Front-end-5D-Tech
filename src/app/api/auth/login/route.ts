
"use server";

import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginBodyType;
    console.log(" Đang xử lý đăng nhập...");

    const response = await authApiRequest.sLogin(body);
    console.log(" API response:", response);

    if (!response?.payload?.data?.token) {
      return new NextResponse(
        JSON.stringify({ message: "Lỗi đăng nhập: Không nhận được token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const accessToken = response.payload.data.token;
    const refreshToken = response.payload.data.refreshToken;


    const res = new NextResponse(
      JSON.stringify({ 
        message: "Đăng nhập thành công!",
        token: accessToken,
        refreshToken: refreshToken
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

    res.cookies.set("token", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60, // 1 giờ
    });

    res.cookies.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60, // 1 giờ
    });

    console.log(" Cookie đã được thiết lập:", res);

    return res;
  } catch (error) {
    console.error(" Lỗi khi đăng nhập:", error);

    return new NextResponse(
      JSON.stringify({ message: "Có lỗi xảy ra", error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
