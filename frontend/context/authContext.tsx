import * as React from 'react'; 

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

    const checkAuthenticated = () => {
        
    }

    const loadUser = () => {

    }

    const googleAuthenticate = () => {
        
    }

    const facebookAuthenticate = () => {
        
    }

    const login = () => {
        
    }

    const signup = () => {
        
    }

    const logout = () => {
        
    }

    const verify = () => {
        
    }

    const resetPassword = () => {
        
    }

    const resetPasswordConfirm = () => {
        
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

