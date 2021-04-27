import React, { FC, useState, createContext } from 'react';  
import firebase from '../../firebase/firebaseConfig';

// TYPES
import { Fairy } from '../types'; 
import { Twin } from '../types';
import { Cake } from '../types'; 
import { Order } from '../types'; 

export type FairyContextType = {
    // STATE
    fairy: Fairy | null; 
    matchedTwins: Twin[];
    selectedTwin: Twin | null; 
    matchedCakes: Cake[], 
    selectedCake: Cake | null;
    order: Order | null; 

    // ACTIONS
    becomeAFairy: (fairy: Fairy) => void;
    getMatchedTwins: (birthday: string) => void; 
    filterTwins: () => void; 
    selectATwin: (twin: Twin) => void; 
    getFilteredCakes: (tag1: string, tag2: string, tag3: string) => void; 
    selectACake: (cake: Cake) => void;
    purchaseCake: (order: Order) => void; 
}

const fairyContextDefault: FairyContextType = {
    // STATE
    fairy: null, 
    matchedTwins: [],
    selectedTwin: null,
    matchedCakes: [],
    selectedCake: null,
    order: null,

    // ACTIONS
    becomeAFairy: () => {}, 
    getMatchedTwins: () => {}, 
    filterTwins: () => {}, 
    getFilteredCakes: () => {}, 
    selectATwin: () => {}, 
    selectACake: () => {},
    purchaseCake: () => {}, 
}


export const FairyContext = createContext<FairyContextType>(fairyContextDefault); 

const FairyContextProvider: FC = ({ children }) => {
    const [fairy, setFairy] = useState(fairyContextDefault.fairy); 
    const [matchedTwins, setMatchedTwins] = useState(fairyContextDefault.matchedTwins); 
    const [selectedTwin, setSelectedTwin] = useState(fairyContextDefault.selectedTwin); 
    const [matchedCakes, setMatchedCakes] = useState(fairyContextDefault.matchedCakes); 
    const [selectedCake, setSelectedCake] = useState(fairyContextDefault.selectedCake); 
    const [order, setOrder] = useState(fairyContextDefault.order); 

    
    function becomeAFairy (fairy: Fairy) {

    }

    function getMatchedTwins (birthday: string) {
        
    }

    function filterTwins () {
        
    }

    function selectATwin (twin: Twin) {
        setSelectedTwin(twin); 
    }

    function getFilteredCakes (tag1: string, tag2: string, tag3: string) {
        
    }

    function selectACake (cake: Cake) {
        setSelectedCake(cake); 
    }

    function purchaseCake () {
        
    }


    return (
        <FairyContext.Provider value={{ 
            fairy, matchedTwins, selectedTwin, matchedCakes, selectedCake, order, 
            becomeAFairy, getMatchedTwins, filterTwins, selectATwin, getFilteredCakes, selectACake, purchaseCake 
        }}>
            { children }
        </FairyContext.Provider>
    )
}


export default FairyContextProvider; 