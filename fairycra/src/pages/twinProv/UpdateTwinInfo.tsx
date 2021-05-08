import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useTwinContext } from '../../context/providers/twinContext'; 

// TYPES
import { Twin, User } from '../../context/types'; 

const UpdateTwinInfo: React.FC = () => {
    const { twins, setTwins } = useTwinContext(); 

    function updateTwinInfo (twin: Twin) {
        firebase.firestore().collection('twins').doc(twin.id).update({ ...twin }).then(() => {
            console.log("Twin updated!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twin failed to update :(");
        });
    }
    
    return (
        <div>
            <h1>UPDATE TWIN INFO</h1>
        </div>
    )
}


export default UpdateTwinInfo; 