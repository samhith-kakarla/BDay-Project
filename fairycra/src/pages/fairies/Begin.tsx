import React, { useState } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// TYPES
import { Fairy } from '../../context/types'; 

// COMPONENTS
import FairyNav from '../../components/fairies/FairyNav'; 
import FairyForm from '../../components/fairies/FairyForm';

const Begin: React.FC = () => {
    const { setFairy } = useFairyContext();  
    const [newFairy, setNewFairy] = useState<Fairy>({
        name: "", 
        email: "", 
        birthday: "", 
    }); 

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

    function setFairyName (name: string) {
        setNewFairy({ ...newFairy, name }); 
    }

    function setFairyEmail (email: string) {
        setNewFairy({ ...newFairy, email }); 
    }

    function setFairyBirthday (birthday: string) {
        setNewFairy({ ...newFairy, birthday }); 
    }

    function getStarted () {
        console.log(newFairy); 
    }

    return (
        <div>
            <FairyNav />
            <h1 className="text-6xl my-12">This is going to be some header.</h1>
            <p className="text-base">This is going to be some information related to the page.</p>
            <FairyForm 
                setName={setFairyName}
                setEmail={setFairyEmail}
                setBirthday={setFairyBirthday}
                submit={getStarted}
            />
        </div>
    )
}


export default Begin; 