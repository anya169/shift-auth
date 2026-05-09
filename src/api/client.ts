const BASE_URL = 'https://shift-backend.onrender.com/api';

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
  
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        headers,
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`Ошибка сервера: (${response.status})`);
        }

        const data = await response.json();
        if (!data.success) {
            // Ошибка из reason
            throw new Error(data.reason || 'Произошла ошибка');
        }
        return data as T;

    } catch (error) {
        //Обрабатываем ошибки сети 
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Неизвестная ошибка при выполнении запроса');
    }
}