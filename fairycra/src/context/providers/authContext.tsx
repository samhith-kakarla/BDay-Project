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
    signup: (fName: string, lName: string, email: string, pass: string) => void;
    logout: () => void;
    sendResetPasswordLink: (email: string) => void;
    resetPassword: (new_pass: string) => void;
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
    sendResetPasswordLink: () => {}, 
    resetPassword: () => {}, 
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
            setIsAuthenticated(true); 
        }).catch((error) => {
            console.log(error); 
            setIsAuthenticated(false); 
        })
    }

    function signup (fName: string, lName: string, email: string, pass: string) {
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(
            (cred: firebase.auth.UserCredential) => {
                // Add First Name and Last Name to DB
                firebase.firestore().collection('users').doc(cred.user!.uid).set({
                    email: email, 
                    firstName: fName, 
                    lastName: lName, 
                }).then(() => {
                    console.log("User Created!"); 
                    setIsAuthenticated(true);
                }).catch((error) => {
                    console.log(error.message); 
                    setIsAuthenticated(false); 
                }); 
            }   
        ); 
    }

    function logout () {
        firebase.auth().signOut().then((res) => {
            console.log(res); 
            console.log("User Signed Out"); 
            setIsAuthenticated(false); 
        }).catch((error) => {
            console.log(error); 
            console.log("Error Signing Out"); 
            setIsAuthenticated(true); 
        }); 
    }

    function googleAuthenticate () {
        const provider = new firebase.auth.GoogleAuthProvider(); 
        firebase.auth().signInWithPopup(provider).then((res) => {
            const cred: firebase.auth.OAuthCredential = res.credential!; 
            const accessToken = cred.accessToken;
            
            firebase.firestore().collection('users').doc(res.user?.uid).set({
                email: res.user?.email, 
                name: res.user?.displayName, 
            }).then(() => {
                console.log("User created!"); 
            }).catch((error) => {
                console.log(error); 
                console.log("User not created :("); 
            }); 

            console.log("Google Sign-In Success"); 
            setIsAuthenticated(true);  
        }).catch((error) => {
            console.log(error.message); 
            setIsAuthenticated(false); 
        });
    }

    function sendResetPasswordLink (email: string) {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            console.log("Reset Password Link Sent!"); 
            setIsAuthenticated(false); 
        }).catch((error) => {
            console.log(error); 
            console.log("Reset Password Link not Sent"); 
            setIsAuthenticated(false); 
        }); 
    }

    function resetPassword (new_pass: string) {
        const user = firebase.auth().currentUser; 

        user?.updatePassword(new_pass).then(() => {
            console.log("Password Updated!"); 
            setIsAuthenticated(false); 
        }).catch((error) => {
            console.log(error); 
            console.log("Password not reset"); 
            setIsAuthenticated(false); 
        }); 
    }

    return (
        <AuthContext.Provider value={{ 
            user, isAuthenticated, loadingAuthState, 
            googleAuthenticate, login, signup, logout, sendResetPasswordLink, resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
