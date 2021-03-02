import { User } from '../types/models'; 

// ACTION TYPES
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'; 
export const SIGNUP_FAIL = 'SIGNUP_FAIL'; 
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; 
export const LOGIN_FAIL = 'LOGIN_FAIL'; 
export const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS'; 
export const ACTIVATION_FAIL = 'ACTIVATION_FAIL'; 
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'; 
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL'; 
export const RESET_PASSWORD_CONFIRM_SUCCESS = 'RESET_PASSWORD_CONFIRM_SUCCESS'; 
export const LOGOUT = 'LOGOUT'; 
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS'; 
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL'; 
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS'; 
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL'; 

// AUTH REQUEST INTERFACE

interface AuthRequest {
    loading: boolean;
    user: User;
    error: string;
}

// AUTH INTERFACES

interface SignUpSuccess extends AuthRequest {
    type: typeof SIGNUP_SUCCESS; 
}

interface SignUpFail extends AuthRequest {
    type: typeof SIGNUP_FAIL; 
}