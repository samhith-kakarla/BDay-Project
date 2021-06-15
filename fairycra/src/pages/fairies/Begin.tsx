import React from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// TYPES
import { Fairy } from '../../context/types'; 

// COMPONENTS
import FairyNav from '../../components/fairies/FairyNav'; 


const Begin: React.FC = () => {
    const { setFairy } = useFairyContext();  

    const sampleFairy: Fairy = {
        name: "Samhith Kakarla", 
        email: "samhith.kakarla@gmail.com", 
        birthday: "12-22-2003", 
    }; 

    function becomeAFairy (fairy: Fairy) {
        firebase.firestore().collection('fairys').add({
            name: fairy.name, email: fairy.email, birthday: fairy.birthday, 
        }).then((doc) => {
            console.log(doc.id); 
            const newFairy = {
                id: doc.id, name: fairy.name, email: fairy.email, birthday: fairy.birthday
            }; 
            setFairy(newFairy); 
            console.log(fairy);
        }).catch((error) => {
            console.log(error); 
            console.log("Fairy not added"); 
        });
    }

    return (
        <div>
            <FairyNav />
            <h1>HOME</h1>
            <p>{sampleFairy.name}</p>
            <p>{sampleFairy.email}</p>
            <p>{sampleFairy.birthday}</p>
            <button onClick={() => becomeAFairy(sampleFairy)} className="bg-black text-yellow-400">BECOME A FAIRY</button>
        </div>
    )
}


export default Begin; 