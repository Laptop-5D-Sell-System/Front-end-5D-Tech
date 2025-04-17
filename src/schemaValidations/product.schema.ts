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
  created_at: z.string(), 
  updated_at: z.string(),
  description: z.string(),
  product_image: z.string(),
  price: z.number(),
  stock_quantity: z.number(),
  category_name: z.string()
});

export const upProductBody =  z.object({
  name: z.string(),
  description: z.string(),
  product_image: z.string(),
  price: z.number(),
  stock_quantity: z.number(),
  category_id: z.string()
});


export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})



export type ProductResType = z.TypeOf<typeof ProductRes>

export const ProductListRes = z.object({
  products: z.array(ProductSchema)
});

export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const UpdateProductBody = CreateProductBody
export const updateProductBody = z.object({
  upProductBody,
});

export type UpdateProductBodyType = z.infer<typeof updateProductBody>;
export const ProductParams = z.object({
  id: z.coerce.number()
})
export type ProductParamsType = z.TypeOf<typeof ProductParams>
