import { z } from 'zod';

// =================================================================
// 1. SCHEMA LÕI (SINGLE SOURCE OF TRUTH) CHO CATEGORY
// =================================================================
// Định nghĩa một Category với cấu trúc phẳng, dễ sử dụng.
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

// Suy ra kiểu TypeScript cho một Category
export type CategoryType = z.infer<typeof CategorySchema>;


// =================================================================
// 2. SCHEMAS CHO API RESPONSE (DỮ LIỆU NHẬN VỀ)
// =================================================================

// Schema cho response khi lấy DANH SÁCH category
export const CategoryListResponseSchema = z.array(CategorySchema);

export type CategoryListResponseType = z.infer<typeof CategoryListResponseSchema>;


// Schema cho response khi lấy MỘT category (nếu API trả về cấu trúc lồng nhau)
export const CategoryResponseSchema = z.object({
  data: CategorySchema, // Vẫn có thể dùng lại schema lõi
  message: z.string().optional(),
});

export type CategoryResponseType = z.infer<typeof CategoryResponseSchema>;


// =================================================================
// 3. SCHEMAS CHO REQUEST BODY (DỮ LIỆU GỬI ĐI) - Gợi ý thêm
// =================================================================

// Schema để TẠO MỚI category
export const CreateCategorySchema = CategorySchema.omit({ id: true });
export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;

// Schema để CẬP NHẬT category (tất cả các trường đều không bắt buộc)
export const UpdateCategorySchema = CreateCategorySchema.partial();
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;