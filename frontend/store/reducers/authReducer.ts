import { User } from '../types/models'; 

// TYPES
import {
    AuthActionTypes, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    USER_LOADED_SUCCESS, 
    USER_LOADED_FAIL, 
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAIL, 
    RESET_PASSWORD_CONFIRM_SUCCESS, 
    RESET_PASSWORD_CONFIRM_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL,
    LOGOUT, 
    GOOGLE_AUTH_SUCCESS, 
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS, 
    FACEBOOK_AUTH_FAIL,
} from '../types/authActionTypes'; 

// STATE
interface AuthState {
    access: string; 
    refresh: string;
    user: User; 
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    access: localStorage.getItem("access"), 
    refresh: localStorage.getItem("refresh"), 
    user: null, 
    isAuthenticated: null,  
}


// REDUCER
export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch(action.type) {
        case SIGNUP_SUCCESS: 
            return { ...state, isAuthenticated: false }; 
        case SIGNUP_FAIL: 
            localStorage.removeItem('access'); 
            localStorage.removeItem('refresh'); 
            return { ...state, access: null, refresh: null, user: null, isAuthenticated: false };
        case LOGIN_SUCCESS:
            localStorage.setItem('access', action.access);
            return {
                ...state,
                isAuthenticated: true,
                access: action.access,
                refresh: action.refresh,
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access'); 
            localStorage.removeItem('refresh'); 
            return { ...state, access: null, refresh: null, user: null, isAuthenticated: false };
        case USER_LOADED_SUCCESS:
            return {...state, user: action.user };
        case USER_LOADED_FAIL:
            return {...state, user: null };
        case AUTHENTICATED_SUCCESS:
            return {...state, isAuthenticated: true };
        case AUTHENTICATED_FAIL:
            return {...state, isAuthenticated: false };
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {...state}; 
        case LOGOUT: 
            localStorage.removeItem('access'); 
            localStorage.removeItem('refresh'); 
            return { ...state, access: null, refresh: null, user: null, isAuthenticated: false };
        case GOOGLE_AUTH_SUCCESS: 
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', action.access); 
            localStorage.setItem('refresh', action.refresh); 
            return {...state, isAuthenticated: true, access: action.access, refresh: action.refresh }; 
        case GOOGLE_AUTH_FAIL: 
        case FACEBOOK_AUTH_FAIL:
            localStorage.removeItem('access'); 
            localStorage.removeItem('refresh'); 
            return { ...state, access: null, refresh: null, user: null, isAuthenticated: false };
        default:
            return state;
    }
}