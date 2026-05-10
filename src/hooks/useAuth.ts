import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import type { AuthRequest, OtpRequest } from '../api/types';


export const useSendOtp = () => {
    const setDelay = useAuthStore(state => state.setDelay);
    return useMutation({
        mutationFn: (data: OtpRequest) => authApi.createOtp(data),
        onSuccess: (data) => {
            setDelay(data.retryDelay);
        }
    });
};

export const useSignIn = () => {
    const setToken = useAuthStore(state => state.setToken);
    const setUser = useAuthStore(state => state.setUser);

    return useMutation({
        mutationFn: (data: AuthRequest) => 
            authApi.signIn(data),
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
        }
    });
};

