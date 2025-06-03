import z from 'zod'

export const CategoryRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string()
    }),
  })
  .strict()

export type CategoryResType = z.TypeOf<typeof CategoryRes>

