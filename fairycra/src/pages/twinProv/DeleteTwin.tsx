import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useTwinContext } from '../../context/providers/twinContext'; 

// TYPES
import { Twin, User } from '../../context/types'; 

const DeleteTwin: React.FC = () => {
    const { twins, setTwins } = useTwinContext(); 
    
    function deleteTwin (twin: Twin) {
        firebase.firestore().collection('twins').doc(twin.id).delete().then(() => {
            console.log("Twin deleted!");
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not deleted :("); 
        })
    }

    return (
        <div>
            <h1>DELETE TWIN</h1>
        </div>
    )
}


export default DeleteTwin; 