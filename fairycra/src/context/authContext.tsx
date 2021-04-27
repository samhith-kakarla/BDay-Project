import * as React from 'react'; 

// TYPES
import { User } from './types'; 

export type AuthContextType = {
    // STATE
    user: User | null; 
    isAuthenticated: boolean | null;
    
    // ACTIONS
    checkAuthenticated: () => void;
    loadUser: () => void; 
    googleAuthenticate: (state: string, code: string) => void;
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
    // STATE
    user: null,  
    isAuthenticated: false,
    
    // ACTIONS
    checkAuthenticated: () => {}, 
    loadUser: () => {}, 
    googleAuthenticate: () => {}, 
    login: () => {}, 
    logout: () => {}, 
    signup: () => {}, 
    verify: () => {}, 
    resetPassword: () => {}, 
    resetPasswordConfirm: () => {}, 
}

export const AuthContext = React.createContext<AuthContextType>(authContextDefault); 

const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User|null>(authContextDefault.user); 
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean|null>(authContextDefault.isAuthenticated);

    const checkAuthenticated = () => async () => {
        
    }

    const loadUser = () => async() => {
        
    }

    const googleAuthenticate = (state: string, code: string) => async () => {
        
    }

    const login = (email: string, password: string) => async () => {
        
    }

    const signup = (
        firstName: string, lastName: string, email: string, password: string, re_password: string
    ) => async () => {
        
    }

    const logout = () => async () => {

    }

    const verify = (uid: string, token: string) => async () => {
        
    }

    const resetPassword = (email: string) => async () => {
        
    }

    const resetPasswordConfirm = (
        uid: string, token: string, new_password: string, re_new_password: string
    ) => async () => {
        
    }

    return (
        <AuthContext.Provider value={{ 
            user, isAuthenticated,
            checkAuthenticated, loadUser, googleAuthenticate,  
            login, signup, logout, verify, resetPassword, resetPasswordConfirm
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

