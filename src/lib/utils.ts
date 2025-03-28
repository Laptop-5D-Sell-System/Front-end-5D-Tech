import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizePath = (path?: string) => {
  if (!path) return ""; // Nếu `path` là undefined/null thì trả về chuỗi rỗng
  return path.startsWith("/") ? path.slice(1) : path;
};
