import z from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string()
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>


export const AccountListRes = z.object({
  accounts: z.array(
    z.object({
      id: z.number(),
      email: z.string().email(),
      created_at: z.string(),
      updated_at: z.string().nullable(),
      is_verified: z.boolean(),
      role: z.enum(['admin', 'user']),
      refresh_token_expiry: z.string(),
      id_user: z.number()
    })
  )
});

export type AccountListResType = z.TypeOf<typeof AccountListRes>;