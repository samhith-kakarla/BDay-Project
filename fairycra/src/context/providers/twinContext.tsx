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
    addNewTwin: (twin: Twin) => void; // Firestore
    updateTwinInfo: (twin: Twin) => void; // Firestore
    deleteTwin: (twin: Twin) => void; // Firestore
    updateTwinImages: (twin: Twin) => void; // Storage
    getTwinImages: (twin: Twin) => void; // Storage
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

    function getMyTwins (owner: string) {
        firebase.firestore().collection('twins').where("owner", "==", owner).get().then((query) => {
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

    function addNewTwin (twin: Twin) {

    }

    function updateTwinInfo (twin: Twin) {

    }

    function deleteTwin (twin: Twin) {

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