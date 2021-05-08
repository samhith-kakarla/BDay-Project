import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useAuthContext } from '../../context/providers/authContext'; 

// TYPES
import { User } from '../../context/types'; 

const Register: React.FC = () => {
    const { setIsAuthenticated } = useAuthContext(); 
    
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
        ).then(() => {
            firebase.auth().signInWithEmailAndPassword(email, pass).then((response) => {
                console.log(response); 
                setIsAuthenticated(true); 
            }).catch((error) => {
                console.log(error); 
                setIsAuthenticated(false); 
            }); 
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
            <h1>REGISTER</h1>
        </div>
    )
}


export default Register; 