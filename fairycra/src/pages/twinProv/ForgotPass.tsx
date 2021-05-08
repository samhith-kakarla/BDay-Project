import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useAuthContext } from '../../context/providers/authContext'; 

// TYPES
import { User } from '../../context/types'; 

const ForgotPass: React.FC = () => {
    const { setIsAuthenticated } = useAuthContext(); 

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
    
    return (
        <div>
            <h1>FORGOT PASS</h1>
        </div>
    )
}


export default ForgotPass; 