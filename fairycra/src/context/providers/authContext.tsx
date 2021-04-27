import React, { FC, useState, useEffect, createContext } from 'react'; 
import firebase from '../../firebase/firebaseConfig'; 


export type AuthContextType = {
    // STATE
    user: firebase.User | null; 
    isAuthenticated: boolean | null;
    loadingAuthState: boolean;
    
    // ACTIONS
    googleAuthenticate: () => void;
    login: (email: string, password: string) => void;
    signup: (
        fName: string, lName: string, email: string, pass: string, re_pass: string
    ) => void;
    logout: () => void;
    resetPassword: (email: string) => void;
    resetPasswordConfirm: (uid: string, token: string, new_password: string, re_new_password: string) => void;
}

const authContextDefault: AuthContextType = {
    // STATE
    user: null,  
    isAuthenticated: false,
    loadingAuthState: true,
    
    // ACTIONS
    googleAuthenticate: () => {}, 
    login: () => {}, 
    logout: () => {}, 
    signup: () => {}, 
    resetPassword: () => {}, 
    resetPasswordConfirm: () => {}, 
}

export const AuthContext = React.createContext<AuthContextType>(authContextDefault); 

const AuthContextProvider: FC = ({ children }) => {
    const [user, setUser] = useState(authContextDefault.user); 
    const [isAuthenticated, setIsAuthenticated] = useState(authContextDefault.isAuthenticated);
    const [loadingAuthState, setLoadingAuthState] = useState(authContextDefault.loadingAuthState); 

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
          setUser(user);
          setLoadingAuthState(false);
       });
    }, []);

    function login (email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            console.log(response); 
            setUser(response); 
            setIsAuthenticated(true); 
        }).catch((error) => {
            console.log(error); 
            setIsAuthenticated(false); 
        })
    }

    function signup (fName: string, lName: string, email: string, pass: string, re_pass: string) {

    }

    function logout () {

    }

    function googleAuthenticate () {

    }

    function resetPassword (email: string) {
        
    }

    function resetPasswordConfirm (uid: string, new_pass: string, re_new_pass: string) {
        
    }

    return (
        <AuthContext.Provider value={{ 
            user, isAuthenticated, loadingAuthState, 
            googleAuthenticate, login, signup, logout, resetPassword, resetPasswordConfirm
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

