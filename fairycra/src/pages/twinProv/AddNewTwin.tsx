import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useTwinContext } from '../../context/providers/twinContext'; 

// TYPES
import { Twin, User } from '../../context/types'; 

const AddNewTwin: React.FC = () => {
    const { twins, setTwins } = useTwinContext(); 

    function addNewTwin (ownerID: string, twin: Twin) {
        firebase.firestore().collection('twins').add({
            owner: ownerID, 
            name: twin.name, 
            age: twin.age, 
            birthday: twin.birthday, 
            address: twin.address, 
            cake_tags: twin.cake_tags, 
            match : "", 
        }).then((doc: any) => {
            console.log(doc); 
            setTwins([...twins, doc]); 
            console.log("Twin added!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not added"); 
        }); 
    }

    return (
        <div>
            <h1>ADD NEW TWIN</h1>
        </div>
    )
}


export default AddNewTwin; 