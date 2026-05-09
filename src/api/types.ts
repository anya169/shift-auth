// Создание отп кода
export interface OtpRequest {
    phone: string;
}

export interface OtpResponse {
    retryDelay: number;
    success: boolean;
    reason?: string;
}

// Пользователь
export interface User {
    _id: string;
    phone: string;
    city?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
}

// Авторизация 
export interface AuthRequest {
    code: number;
    phone: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    reason?: string;
}

// Получить сессию пользователя
export interface SessionResponse {
    success: boolean;
    user: User;
    reason?: string;
}