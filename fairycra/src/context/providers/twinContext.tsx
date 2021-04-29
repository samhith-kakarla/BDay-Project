import React, { FC, useState, createContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// TYPES
import { Twin } from '../types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    currentTwin: Twin | null;
    
    // ACTIONS
    getMyTwins: (ownerID: string) => void; // Firestore
    addNewTwin: (ownerID: string, twin: Twin) => void; // Firestore
    updateTwinInfo: (twin: Twin) => void; // Firestore
    deleteTwin: (twin: Twin) => void; // Firestore
    updateTwinImages: (twin: Twin) => void; // Storage (Images)
    getTwinImages: (twin: Twin) => void; // Storage (Images)
}

const twinContextDefault: TwinContextType = {
    // STATE
    twins: [], 
    currentTwin: null,

    // ACTIONS
    getMyTwins: () => {}, 
    addNewTwin: () => {},
    updateTwinInfo: () => {}, 
    deleteTwin: () => {},
    updateTwinImages: () => {}, 
    getTwinImages: () => {},
}


export const TwinContext = createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: FC = ({ children }) => {
    const [twins, setTwins] = useState(twinContextDefault.twins); 
    const [currentTwin, setCurrentTwin] = useState(twinContextDefault.currentTwin);

    function getMyTwins (ownerID: string) {
        firebase.firestore().collection('twins').where("owner", "==", ownerID).get().then((query) => {
            console.log(query); 
            query.docs.forEach((doc) => {
                const myTwin: Twin = {
                    id: doc.id, 
                    name: doc.data().name, 
                    age: doc.data().age, 
                    birthday: doc.data().birthday,
                    address: doc.data().address, 
                    cake_tags: doc.data().cake_tags,
                    match: doc.data().match, 
                }; 
                setTwins([...twins, myTwin]); 
            }); 
        }).then(() => {
            console.log(twins); 
            console.log("My Twins receieved!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twins not received :("); 
            setTwins([]); 
        });
    }

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

    function updateTwinInfo (twin: Twin) {

    }

    function deleteTwin (twin: Twin) {
        firebase.firestore().collection('twins').doc(twin.id).delete().then(() => {
            console.log("Twin deleted!");
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not deleted :("); 
        })
    }

    function updateTwinImages (twin: Twin) {

    }

    function getTwinImages (twin: Twin) {

    }

    return (
        <TwinContext.Provider value={{ 
            twins, currentTwin, 
            getMyTwins, addNewTwin, updateTwinInfo, deleteTwin, 
            updateTwinImages, getTwinImages
        }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 