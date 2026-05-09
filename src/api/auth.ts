import { apiClient } from './client';
import type { OtpResponse, OtpRequest, AuthResponse, AuthRequest } from './types';

export const authApi = {
  createOtp: (data: OtpRequest) => 
    apiClient<OtpResponse>('/auth/otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
    signIn: (data: AuthRequest) => 
        apiClient<AuthResponse>('/users/signin', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};