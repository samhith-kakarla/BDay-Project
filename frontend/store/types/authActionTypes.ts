import { User } from './models'; 

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
export const RESET_PASSWORD_CONFIRM_FAIL = 'RESET_PASSWORD_CONFIRM_FAIL'; 
export const LOGOUT = 'LOGOUT'; 
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS'; 
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL'; 
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS'; 
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL'; 
export const GOOGLE_AUTH_SUCCESS = 'GOOGLE_AUTH_SUCCESS'; 
export const GOOGLE_AUTH_FAIL = 'GOOGLE_AUTH_FAIL'; 

// AUTH REQUEST INTERFACE
interface AuthRequest {
    user: User;
    access: string; 
    refresh: string;
    isAuthenticated: boolean;
}

// AUTH INTERFACES
interface SignUpSuccess extends AuthRequest {
    type: typeof SIGNUP_SUCCESS; 
}

interface SignUpFail extends AuthRequest {
    type: typeof SIGNUP_FAIL; 
}

interface LoginSuccess extends AuthRequest {
    type: typeof LOGIN_SUCCESS; 
}

interface LoginFail extends AuthRequest {
    type: typeof LOGIN_FAIL; 
}

interface ActivationSuccess extends AuthRequest {
    type: typeof ACTIVATION_SUCCESS; 
}

interface ActivationFail extends AuthRequest {
    type: typeof ACTIVATION_FAIL; 
}

interface ResetPasswordSuccess extends AuthRequest {
    type: typeof RESET_PASSWORD_SUCCESS; 
}

interface ResetPasswordFail extends AuthRequest {
    type: typeof RESET_PASSWORD_FAIL; 
}

interface ResetPasswordConfirmSuccess extends AuthRequest {
    type: typeof RESET_PASSWORD_CONFIRM_SUCCESS; 
}

interface ResetPasswordConfirmFail extends AuthRequest {
    type: typeof RESET_PASSWORD_CONFIRM_FAIL; 
}

interface UserLoadedSuccess extends AuthRequest {
    type: typeof USER_LOADED_SUCCESS; 
}

interface UserLoadedFail extends AuthRequest {
    type: typeof USER_LOADED_FAIL; 
}

interface AuthenticatedSuccess extends AuthRequest {
    type: typeof AUTHENTICATED_SUCCESS; 
}

interface AuthenticatedFail extends AuthRequest {
    type: typeof AUTHENTICATED_FAIL; 
}

interface Logout extends AuthRequest {
    type: typeof LOGOUT; 
}

interface GoogleAuthSuccess extends AuthRequest {
    type: typeof GOOGLE_AUTH_SUCCESS; 
}

interface GoogleAuthFail extends AuthRequest {
    type: typeof GOOGLE_AUTH_FAIL; 
}


// AUTH ACTION TYPES CONTAINER
export type AuthActionTypes = 
    | SignUpSuccess 
    | SignUpFail
    | LoginSuccess
    | LoginFail 
    | ActivationSuccess 
    | ActivationFail 
    | ResetPasswordSuccess 
    | ResetPasswordFail 
    | ResetPasswordConfirmSuccess 
    | ResetPasswordConfirmFail
    | UserLoadedSuccess 
    | UserLoadedFail 
    | AuthenticatedFail
    | AuthenticatedSuccess
    | Logout
    | GoogleAuthSuccess
    | GoogleAuthFail
    ; 
