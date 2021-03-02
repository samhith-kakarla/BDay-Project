import { Dispatch } from 'redux'; 
import { rootActions } from '../types/rootActionTypes'; 
import { User } from '../types/models'; 
import axios from 'axios'; 

// TYPES
import {
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAIL, 
    RESET_PASSWORD_CONFIRM_SUCCESS, 
    RESET_PASSWORD_CONFIRM_FAIL, 
    USER_LOADED_SUCCESS, 
    USER_LOADED_FAIL, 
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL, 
    LOGOUT
} from '../types/authActionTypes'; 


// ACTIONS
export const checkAuthenticated = () => async (dispatch: Dispatch<rootActions>) => {
    if (typeof window == "undefined") {
        dispatch({
            type: AUTHENTICATED_FAIL, 
            user: null, 
            access: '', 
            refresh: '', 
            isAuthenticated: true, 
        }); 
    }
    
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                'Accept': 'application/json', 
                'Content-type': 'application/json', 
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem("access") }); 

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/auth/jwt/verify/', body, config); 
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS, 
                    user: null, 
                    access: '', 
                    refresh: '', 
                    isAuthenticated: true, 
                }); 
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL, 
                    user: null, 
                    access: '', 
                    refresh: '', 
                    isAuthenticated: true, 
                }); 
            }
        } catch (error) {
            console.log(error); 
            dispatch({
                type: AUTHENTICATED_FAIL, 
                user: null, 
                access: '', 
                refresh: '', 
                isAuthenticated: true, 
            }); 
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL, 
            user: null, 
            access: '', 
            refresh: '', 
            isAuthenticated: true, 
        }); 
    }
}