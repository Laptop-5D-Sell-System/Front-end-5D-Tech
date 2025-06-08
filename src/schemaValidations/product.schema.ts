import { z } from 'zod';

// =================================================================
// 1. SCHEMA LÕI: Nguồn tin cậy duy nhất cho thực thể Product
// =================================================================
// Định nghĩa tất cả các thuộc tính của một sản phẩm với kiểu cơ bản.
// Giả sử ID của bạn là string (vì category_id là string). Nếu là number, hãy đổi lại.
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  product_image: z.string().url('URL hình ảnh không hợp lệ'),
  price: z.number(),
  stock_quantity: z.number(),
  category_id: z.string(),
  category_name: z.string().optional(), // Thường category_name sẽ được join từ bảng khác
  created_at: z.coerce.date(), // Dùng coerce.date để tự động chuyển string thành Date
  updated_at: z.coerce.date(),
});

// Suy ra kiểu TypeScript cho Product từ schema lõi
export type ProductType = z.infer<typeof ProductSchema>;

// =================================================================
// 2. SCHEMAS CHO DỮ LIỆU GỬI ĐI (REQUEST BODY)
// =================================================================

// Schema để TẠO MỚI sản phẩm
// Chúng ta bỏ đi các trường do server tạo ra (id, created_at, updated_at)
// và thêm validation chi tiết cho các trường cần thiết.
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  category_name: true,
}).extend({
  name: z.string().min(1, 'Tên không được để trống'),
  price: z.coerce.number().positive('Giá phải là số dương'),
  stock_quantity: z.coerce.number().int('Số lượng phải là số nguyên').min(0),
  category_id: z.string().min(1, 'Vui lòng chọn danh mục'),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

// Schema để CẬP NHẬT sản phẩm
// Dùng .partial() để biến tất cả các trường thành không bắt buộc (optional)
// Người dùng có thể chỉ cập nhật 1 trong số các trường này.
export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;

// =================================================================
// 3. SCHEMAS CHO DỮ LIỆU NHẬN VỀ (API RESPONSE)
// =================================================================

// Schema cho response khi lấy một sản phẩm
export const ProductResponseSchema = z.object({
  product: ProductSchema,
  message: z.string(),
});

export type ProductResponseType = z.infer<typeof ProductResponseSchema>;

// Schema cho response khi lấy danh sách sản phẩm
export const ProductListResponseSchema = z.object({
  product: z.array(ProductSchema),
});

export type ProductListResponseType = z.infer<typeof ProductListResponseSchema>;


// =================================================================
// 4. SCHEMAS CHO THAM SỐ (PARAMS)
// =================================================================
export const ProductParamsSchema = z.object({
  id: z.coerce.number(), // Dùng coerce để chuyển string từ URL thành number
});

export type ProductParamsType = z.infer<typeof ProductParamsSchema>;

// Chúng ta không cần các interface Category, Product, ProductDetailRes nữa
// vì tất cả đã được định nghĩa và suy ra từ Zod