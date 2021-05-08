import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useAuthContext } from '../../context/providers/authContext'; 

// TYPES
import { User } from '../../context/types'; 

const Login: React.FC = () => {
    const { setIsAuthenticated } = useAuthContext(); 

    function login (email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            console.log(response); 
            setIsAuthenticated(true); 
        }).catch((error) => {
            console.log(error); 
            setIsAuthenticated(false); 
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

    return (
        <div>
            <h1>LOGIN</h1>
        </div>
    )
}


export default Login; 