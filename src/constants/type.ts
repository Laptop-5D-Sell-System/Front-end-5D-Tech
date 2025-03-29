export const TokenType = {
    ForgotPasswordToken: 'ForgotPasswordToken',
    token: 'token',
    RefreshToken: 'RefreshToken',
    TableToken: 'TableToken',
  } as const;

  
  export const Role = {
    admin: 'admin',
    user: 'user',
  } as const;
  
  export const RoleValues = [Role.admin, Role.user] as const;
  
  