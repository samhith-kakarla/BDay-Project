import React, { useState, useEffect, createContext, useContext } from 'react'; 
import firebase from '../../firebase/firebaseConfig'; 


export type AuthContextType = {
    // STATE
    user: firebase.User | null; 
    isAuthenticated: boolean | null;
    loadingAuthState: boolean;
    
    // ACTIONS
    setUser: (user: firebase.User) => void; 
    setIsAuthenticated: (isAuthenticated: boolean | null) => void;
    setLoadingAuthState: (loadingAuthState: boolean) => void; 
}

export const authContextDefault: AuthContextType = {
    // STATE
    user: null,  
    isAuthenticated: false,
    loadingAuthState: true,
    
    // ACTIONS
    setUser: () => {}, 
    setIsAuthenticated: () => {}, 
    setLoadingAuthState: () => {}, 
}

export const AuthContext = createContext<AuthContextType>(authContextDefault); 
export const useAuthContext = () => useContext(AuthContext); 



const AuthContextProvider: React.FC = ({ children }) => {
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
                // Email Verification
                cred.user?.sendEmailVerification(); 
                firebase.auth().signOut(); 
                console.log("Verification Email Sent!"); 

                // Add User to DB
                firebase.firestore().collection('users').doc(cred.user!.uid).set({
                    email: email, 
                    firstName: fName, 
                    lastName: lName, 
                }).then(() => { 
                    console.log("User Created!"); 
                }).catch((error) => {
                    console.log(error.message); 
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
            setUser, setIsAuthenticated, setLoadingAuthState
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

