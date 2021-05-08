import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useAuthContext } from '../../context/providers/authContext'; 

// TYPES
import { User } from '../../context/types'; 

const ResetPass: React.FC = () => {
    const { setIsAuthenticated } = useAuthContext(); 

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
        <div>
            <h1>RESET PASS</h1>
        </div>
    )
}


export default ResetPass; 