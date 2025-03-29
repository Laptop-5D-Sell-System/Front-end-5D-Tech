import z from 'zod'

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password_hash: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100)
  })
  .strict()
  .superRefine(({ confirmPassword, password_hash }, ctx) => {
    if (confirmPassword !== password_hash) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string()
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8).max(100),
    data: z.object({
      token: z.string(), 
      httpStatus: z.number()
    })
  })
  .strict()

  export type LoginBodyType = z.TypeOf<typeof LoginBody>;
  

  export const LogoutBody = z.object({
    data: z.object({
      token: z.string(), 
      refreshToken: z.string(),
      httpStatus: z.number()
    })
  })
  .strict()

  export type LogoutBodyType = z.TypeOf<typeof LogoutBody>;

  export const LoginRes = z.object({
    data: z.object({
      token: z.string(), 
      httpStatus: z.number()
      
    }),
    message: z.string(),
  });

  export const LogoutRes = z.object({
    data: z.object({
      token: z.string(), 
      refreshToken: z.string(),
      httpStatus: z.number()
      
    }),
    message: z.string(),
  });

export type LogoutResType = z.TypeOf<typeof LogoutRes>;

export type LoginResType = z.TypeOf<typeof LoginRes>;


export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
