import { usersApi } from '../api/users';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';

export const useSession = () => {
    const token = useAuthStore(state => state.token);

    return useQuery({
        queryKey: ['session'],
        queryFn: () => usersApi.getSession(token!),
        enabled: !!token, 
    });
};