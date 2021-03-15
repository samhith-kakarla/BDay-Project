import * as React from 'react'; 
import axios from 'axios'; 

// TYPES
import { User } from './types'; 

export type AuthContextType = {
    // STATE
    user: User; 
    access: string; 
    refresh: string; 
    isAuthenticated: boolean;
    // ACTIONS
    checkAuthenticated: () => void;
    loadUser: () => void; 
    googleAuthenticate: (state: string, code: string) => void;
    facebookAuthenticate: (state: string, code: string) => void;
    login: (email: string, password: string) => void;
    signup: (
        firstName: string, lastName: string, emaiL: string, password: string, re_password: string
    ) => void;
    logout: () => void;
    verify: (uid: string, token: string) => void;
    resetPassword: (email: string) => void;
    resetPasswordConfirm: (uid: string, token: string, new_password: string, re_new_password: string) => void;
}

const authContextDefault: AuthContextType = {
    user: null, 
    access: "", 
    refresh: "", 
    isAuthenticated: false, 
    checkAuthenticated: () => {}, 
    loadUser: () => {}, 
    googleAuthenticate: () => {}, 
    facebookAuthenticate: () => {}, 
    login: () => {}, 
    logout: () => {}, 
    signup: () => {}, 
    verify: () => {}, 
    resetPassword: () => {}, 
    resetPasswordConfirm: () => {}, 
}

export const AuthContext = React.createContext<AuthContextType>(authContextDefault); 

const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User>(authContextDefault.user); 
    const [access, setAccess] = React.useState<string>(authContextDefault.access); 
    const [refresh, setRefresh] = React.useState<string>(authContextDefault.refresh); 
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(authContextDefault.isAuthenticated);

    const checkAuthenticated = () => async () => {
        if (typeof window == "undefined") {
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        } else {
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
                        setUser(null); 
                        setAccess(""); 
                        setRefresh(""); 
                        setIsAuthenticated(true); 
                    } else {
                        setUser(null); 
                        setAccess(""); 
                        setRefresh(""); 
                        setIsAuthenticated(false); 
                    }
                } catch (error) {
                    console.log(error); 
                    setUser(null); 
                    setAccess(""); 
                    setRefresh(""); 
                    setIsAuthenticated(false); 
                }
            } else {
                setUser(null); 
                setAccess(""); 
                setRefresh(""); 
                setIsAuthenticated(false); 
            }
        }
    }

    const loadUser = () => async() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("access")) {
                const config = {
                    headers: {
                        'Accept': 'application/json', 
                        'Authorization': `JWT ${localStorage.getItem("access")}`, 
                        'Content-type': 'application/json', 
                    }
                }; 

                try {
                    const res = await axios.get('http://127.0.0.1:8000/api/auth/users/me/', config); 
                    
                    setUser(res.data); 
                    setAccess(""); 
                    setRefresh(""); 
                    setIsAuthenticated(null);   
                } catch (error) {
                    console.log(error); 
                    setUser(null); 
                    setAccess(""); 
                    setRefresh(""); 
                    setIsAuthenticated(null); 
                }
            } else {
                setUser(null); 
                setAccess(""); 
                setRefresh(""); 
                setIsAuthenticated(null); 
            }
        }
    }

    const googleAuthenticate = (state: string, code: string) => async () => {
        if (typeof window !== "undefined") {
            if (state && code && !localStorage.getItem("access")) {
                const config = {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded', 
                    }
                }; 
        
                const details = {
                    'state': state, 
                    'code': code,
                }; 
        
                const formBody = Object.keys(details).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        
                try {
                    const res = await axios.post(`http://127.0.0.1:8000/api/auth/o/google-oauth2/?${formBody}`, config); 
        
                    setUser(null); 
                    setAccess(res.data.access); 
                    setRefresh(res.data.refresh); 
                    setIsAuthenticated(true); 
        
                    loadUser(); 
                } catch (error) {
                    console.log(error); 
                    
                    setUser(null); 
                    setAccess(""); 
                    setRefresh(""); 
                    setIsAuthenticated(false); 
                }
            }
        }
    }

    const facebookAuthenticate = (state: string, code: string) => async () => {
        if (typeof window !== "undefined") {
            if (state && code && !localStorage.getItem("access")) {
                const config = {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded', 
                    }
                }; 
        
                const details = {
                    'state': state, 
                    'code': code,
                }; 
        
                const formBody = Object.keys(details).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        
                try {
                    const res = await axios.post(`http://127.0.0.1:8000/api/auth/o/facebook/?${formBody}`, config); 
        
                    setUser(null); 
                    setAccess(res.data.access); 
                    setRefresh(res.data.refresh); 
                    setIsAuthenticated(true); 
        
                    loadUser(); 
                } catch (error) {
                    console.log(error); 
                    
                    setUser(null); 
                    setAccess(""); 
                    setRefresh(""); 
                    setIsAuthenticated(false); 
                }
            }
        }
    }

    const login = (email: string, password: string) => async () => {
        const config = {
            headers: {
                'Content-type': 'application/json', 
            }
        }; 
    
        const body = JSON.stringify({ email, password }); 
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', body, config); 
    
            setUser(null); 
            setAccess(res.data.access); 
            setRefresh(res.data.refresh); 
            setIsAuthenticated(true); 
    
            loadUser(); 
        } catch (error) {
            console.log(error); 
    
            setUser(null); 
            setAccess(null); 
            setRefresh(null); 
            setIsAuthenticated(false);  
        }
    }

    const signup = (
        firstName: string, lastName: string, email: string, password: string, re_password: string
    ) => async () => {
        const config = {
            headers: {
                'Content-type': 'application/json', 
            }
        }; 
    
        const body = JSON.stringify({ firstName, lastName, email, password, re_password }); 
    
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/users/', body, config); 
    
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        } catch (error) {
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        }
    }

    const logout = () => async () => {
        setUser(null); 
        setAccess(""); 
        setRefresh(""); 
        setIsAuthenticated(false); 
    }

    const verify = (uid: string, token: string) => async () => {
        const config = {
            headers: {
                'Content-type': 'application/json', 
            }
        }; 
    
        const body = JSON.stringify({ uid, token }); 
    
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/users/activation/', body, config); 
    
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        } catch (error) {
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        }
    }

    const resetPassword = (email: string) => async () => {
        const config = {
            headers: {
                'Content-type': 'application/json', 
            }
        }; 
    
        const body = JSON.stringify({ email }); 
    
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password/', body, config); 
            
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        } catch (error) {
            console.log(error); 
    
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        }
    }

    const resetPasswordConfirm = (
        uid: string, token: string, new_password: string, re_new_password: string
    ) => async () => {
        const config = {
            headers: {
                'Content-type': 'application/json', 
            }
        }; 
    
        const body = JSON.stringify({ uid, token, new_password, re_new_password }); 
    
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/users/reset_password_confirm/', body, config); 
            
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        } catch (error) {
            console.log(error); 
    
            setUser(null); 
            setAccess(""); 
            setRefresh(""); 
            setIsAuthenticated(false); 
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, access, refresh, isAuthenticated,
            checkAuthenticated, loadUser, googleAuthenticate, facebookAuthenticate, 
            login, signup, logout, verify, resetPassword, resetPasswordConfirm
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

