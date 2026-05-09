import { apiClient } from './client';
import type { SessionResponse } from './types';

export const usersApi = {
    getSession: (token: string) =>
        apiClient<SessionResponse>('/users/session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }),
};