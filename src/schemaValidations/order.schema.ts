import { z } from "zod"

export const OrderListRes = z.object({
    orders: z.array(
    z.object({
      id: z.string(),
      user_id: z.number(),
      order_date: z.string(), 
      status: z.enum([ "Processing", "confirmed", "shipping", "delivered", "cancelled", "returned"     
      ]),
      total: z.number(),
      OrderItems: z.array(
        z.object({
          id: z.number(),
          order_id: z.number(),
          product_id: z.number(),
          quantity: z.number(),
          price: z.number()
        })
      )
    })
  )
})

export type OrderListResType = z.TypeOf<typeof OrderListRes>;
