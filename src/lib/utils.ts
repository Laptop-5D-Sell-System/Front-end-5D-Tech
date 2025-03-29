import { clsx, type ClassValue } from "clsx"
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizePath = (path?: string) => {
  if (!path) return ""; // Nếu `path` là undefined/null thì trả về chuỗi rỗng
  return path.startsWith("/") ? path.slice(1) : path;
};

export const getAccessTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null; 
};


export const decodeToken = (token: string) => {
  // return jwt.decode(token) as TokenPayload;
}
