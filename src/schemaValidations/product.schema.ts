import z from 'zod'

export const CreateProductBody = z.object({
  name: z.string().min(1).max(256),
  price: z.coerce.number().positive(),
  description: z.string().max(10000),
  image: z.string().url()
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})

export type ProductResType = z.TypeOf<typeof ProductRes>

export const ProductListRes = z.object({
  products: z.array(ProductSchema),
  message: z.string()
})

export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const UpdateProductBody = CreateProductBody
// export type UpdateProductBodyType = CreateProductBodyType
export const updateProductBody = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'), 
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'), 
  price: z.number().min(0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0'), 
  image: z.string().url('Ảnh sản phẩm phải là URL hợp lệ').optional(),
  changePrice: z.boolean().default(false), 
});

export type UpdateProductBodyType = z.infer<typeof updateProductBody>;
export const ProductParams = z.object({
  id: z.coerce.number()
})
export type ProductParamsType = z.TypeOf<typeof ProductParams>
