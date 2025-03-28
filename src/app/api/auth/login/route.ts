"use server"

import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LoginBodyType;
  console.log("Đang xử lý đăng nhập...");

  try {
    // Gửi yêu cầu đăng nhập đến API
    const response = await authApiRequest.sLogin(body);
    console.log("API response:", response);

    if (!response?.payload?.token) {
      throw new HttpError({
        status: 400,
        payload: { message: "Lỗi đăng nhập: Không nhận được token" },
      });
    }

    const accessToken = response.payload.token; 

    const cookieStore = await cookies(); 

  
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), 
    });

    return NextResponse.json({ message: "Đăng nhập thành công!", token: accessToken }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);

    if (error instanceof HttpError) {
      return new Response(JSON.stringify(error.payload), { status: error.status });
    }

    return new Response(JSON.stringify({ message: "Có lỗi xảy ra", error: (error as Error).message }), {
      status: 500,
    });
  }
}
