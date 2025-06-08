import http from '@/lib/http';
import { AccountResType, UpdateMeBodyType } from '@/schemaValidations/account.schema';

const accountApiRequest = {
  me: () => http.get<AccountResType>({ url: '/accounts/me' }),
  sMe: ({ accessToken }: { accessToken: string }) => 
    http.get<AccountResType>({
      url: '/accounts/me',
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    }),
  updateMe: (body: UpdateMeBodyType) => 
    http.put<AccountResType, UpdateMeBodyType>({
      url: '/accounts/me',
      body
    }),
//   changePassword: (body: ChangePasswordBodyType) => 
//     http.put<AccountResType>('/accounts/change-password', body)
};

export default accountApiRequest;
